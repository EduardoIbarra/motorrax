#!/usr/bin/env node
/**
 * Retry failed models: resilient multi-candidate downloads + PressClub mediapool fallback.
 * Also implements Google Images-style official-domain filtering via Bing/PressClub when needed.
 */
const path = require("path");
const fs = require("fs-extra");
const https = require("https");
const http = require("http");
const { execFile } = require("child_process");
const { promisify } = require("util");
const { Client } = require("pg");
const execFileAsync = promisify(execFile);

const ROOT = path.join(__dirname, "..");
const BASE = "https://www.bmw-motorrad.com.mx";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const FAILED = [
  { slug: "s1000rr", name: "S 1000 RR", sitePath: "sport/s1000rr", pressQuery: "S 1000 RR" },
  { slug: "r12gs", name: "R 12 G/S", sitePath: "heritage/r12gs", pressQuery: "R 12 G/S" },
  { slug: "r1300rt", name: "R 1300 RT", sitePath: "tour/r1300rt", pressQuery: "R 1300 RT" },
];

function loadDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const envPath = path.join(ROOT, ".env.local");
  if (fs.existsSync(envPath)) {
    const line = fs.readFileSync(envPath, "utf8").split("\n").find((l) => l.startsWith("DATABASE_URL="));
    if (line) return line.slice("DATABASE_URL=".length).trim().replace(/^["']|["']$/g, "");
  }
  return "";
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isValidImage(buf) {
  if (!buf || buf.length < 2000) return false;
  if (buf[0] === 0xff && buf[1] === 0xd8) return true; // JPEG
  if (buf[0] === 0x89 && buf[1] === 0x50) return true; // PNG
  if (buf.length > 12 && buf.toString("ascii", 4, 8) === "ftyp") return true; // AVIF
  return false;
}

function fetchBuffer(url, headers = {}, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent": UA,
          Accept: "image/avif,image/webp,image/apng,image/jpeg,image/png,image/*,*/*;q=0.8",
          ...headers,
        },
        timeout: timeoutMs,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const next = res.headers.location.startsWith("http")
            ? res.headers.location
            : new URL(res.headers.location, url).href;
          res.resume();
          return resolve(fetchBuffer(next, headers, timeoutMs));
        }
        if (res.statusCode && res.statusCode >= 400) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      }
    );
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("timeout"));
    });
    req.on("error", reject);
  });
}

async function downloadImage(url, dest, referer) {
  const attempts = [
    async () =>
      fetchBuffer(url, {
        Referer: referer || `${BASE}/es/home.html`,
        Accept: "image/jpeg,image/jpg,image/png,image/*,*/*;q=0.8",
      }),
    async () =>
      fetchBuffer(url, {
        Referer: referer || `${BASE}/es/home.html`,
      }),
    async () => {
      // PressClub / mediapool often needs no special referer
      return fetchBuffer(url, { Referer: "https://www.press.bmwgroup.com/" });
    },
  ];
  let last;
  for (const attempt of attempts) {
    try {
      const buf = await attempt();
      if (!isValidImage(buf)) throw new Error(`bad buffer ${buf.length}`);
      await fs.ensureDir(path.dirname(dest));
      await fs.writeFile(dest, buf);
      return buf.length;
    } catch (e) {
      last = e;
      await sleep(300);
    }
  }
  throw last || new Error("download failed");
}

async function fetchHtmlViaJina(pageUrl) {
  const jina = `https://r.jina.ai/${pageUrl}`;
  const { stdout } = await execFileAsync(
    "curl",
    ["--http1.1", "--max-time", "90", "--silent", "--show-error", "-A", "Mozilla/5.0", "-H", "x-respond-with: html", jina],
    { maxBuffer: 15 * 1024 * 1024, encoding: "utf8" }
  );
  if (!stdout || stdout.length < 5000 || stdout.includes("Just a moment")) {
    throw new Error("jina html failed");
  }
  return stdout;
}

function extractMxUrls(html) {
  const urls = [];
  const reAbs =
    /https:\/\/www\.bmw-motorrad\.com\.mx\/content\/dam\/bmwmotorradnsc\/[^"'\\\s>]+\.(?:jpg|jpeg)(?:\.asset\.\d+\.jpg)?/gi;
  const reRel =
    /(\/content\/dam\/bmwmotorradnsc\/[^"'\\\s>]+\.(?:jpg|jpeg)(?:\.asset\.\d+\.jpg)?)/gi;
  let m;
  while ((m = reAbs.exec(html))) urls.push(m[0]);
  while ((m = reRel.exec(html))) urls.push(`${BASE}${m[1]}`);
  const out = [];
  const seen = new Set();
  for (let u of urls) {
    const low = u.toLowerCase();
    if (low.includes("mainnavigation") || low.includes("logo") || low.includes("300x180") || low.includes("600x360"))
      continue;
    if (seen.has(u)) continue;
    seen.add(u);
    out.push(u);
  }
  // Prefer product-stage / multiimage / multigallery / introduction / media-desktop
  out.sort((a, b) => score(b) - score(a));
  return out;
}

function score(u) {
  const x = u.toLowerCase();
  let s = 0;
  if (x.includes("productstage") || x.includes("product-stage") || x.includes("multiimage")) s += 50;
  if (x.includes("2560")) s += 30;
  if (x.includes("multigallery")) s += 25;
  if (x.includes("-l-") || x.includes("_l_")) s += 20;
  if (x.includes("introduction")) s += 15;
  if (x.includes("media-desktop") || x.includes("media_desktop")) s += 15;
  if (x.includes("accordion")) s += 10;
  if (x.includes("softconfigurator") && !x.includes("thumbnail")) s += 8;
  if (x.includes("mobile") || x.includes("thumbnail")) s -= 20;
  if (x.includes("youtube")) s -= 5;
  return s;
}

async function fetchPressClubUrls(modelName) {
  // BMW Motorrad photo topic list; filter client-side by model tokens
  const listUrl = "https://www.press.bmwgroup.com/global/photo/list/6629";
  const { stdout: html } = await execFileAsync(
    "curl",
    ["--http1.1", "--max-time", "40", "--silent", "--show-error", "-A", "Mozilla/5.0", "-H", "X-Requested-With: XMLHttpRequest", listUrl],
    { maxBuffer: 10 * 1024 * 1024, encoding: "utf8" }
  );

  const tokens = modelName
    .toLowerCase()
    .replace(/\//g, " ")
    .split(/\s+/)
    .filter((t) => t && t !== "bmw");

  // Collect mediapool cache URLs whose path mentions model tokens
  const all = [...html.matchAll(/https:\/\/mediapool\.bmwgroup\.com\/cache\/[^"'\\\s]+/g)].map((m) => m[0]);
  const matched = all.filter((u) => {
    const pathPart = u.toLowerCase();
    // require most significant tokens (numbers + letters)
    return tokens.every((t) => {
      const norm = t.replace(/[^a-z0-9]/g, "");
      if (!norm) return true;
      return pathPart.includes(norm) || pathPart.includes(t.replace(/\s+/g, "-"));
    });
  });

  // Upgrade thumbs to high-res
  const hi = matched.map((u) =>
    u.replace(/-\d{2,4}px\.jpg/i, "-2250px.jpg").replace(/-\d{2,4}px\.jpeg/i, "-2250px.jpeg")
  );

  // Also attachment downloads from data-detail-url dokNo
  const doks = [...html.matchAll(/dokNo=(P\d+)/g)].map((m) => m[1]);
  const attachments = [...new Set(doks)].slice(0, 20).map(
    (d) => `https://mediapool.bmwgroup.com/download/edown/pressclub/publicq?dokNo=${d}&attachment=1&actEvent=image`
  );

  // For r12 g/s special slug patterns in filenames
  const alt = all.filter((u) => {
    const p = u.toLowerCase();
    if (modelName.includes("G/S") || modelName.includes("12")) {
      return p.includes("r-12-g") || p.includes("r12") || p.includes("r-12-gs");
    }
    return false;
  }).map((u) => u.replace(/-\d{2,4}px\.jpg/i, "-2250px.jpg"));

  return [...new Set([...hi, ...alt, ...attachments])];
}

/**
 * Google Images is blocked from this environment (consent / bot walls).
 * Bing Images often works; we filter to official BMW domains only.
 */
async function fetchBingOfficialImages(modelName) {
  const q = encodeURIComponent(`BMW ${modelName} Motorrad`);
  const url = `https://www.bing.com/images/search?q=${q}&qft=+filterui:imagesize-large&form=IRFLTR&first=1`;
  const { stdout: html } = await execFileAsync(
    "curl",
    ["--http1.1", "--max-time", "30", "--silent", "--show-error", "-A", UA, url],
    { maxBuffer: 8 * 1024 * 1024, encoding: "utf8" }
  );
  const murls = [];
  const re1 = /murl&quot;:&quot;(https?:\/\/[^&]+?)&quot;/g;
  const re2 = /"murl":"(https?:\/\/[^"]+)"/g;
  let m;
  while ((m = re1.exec(html))) murls.push(m[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/"));
  while ((m = re2.exec(html))) murls.push(m[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/"));

  const official = [
    "mediapool.bmwgroup.com",
    "press.bmwgroup.com",
    "bmw-motorrad.com",
    "bmw-motorrad.com.mx",
    "bmwmotorcycles.com",
  ];
  return [...new Set(murls)].filter((u) => official.some((d) => u.toLowerCase().includes(d)));
}

async function upsert(slug, heroRel, galleryRels) {
  const client = new Client({
    connectionString: loadDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(
      `UPDATE bmw_models
       SET hero_image_path = $2,
           gallery_image_paths = $3::jsonb,
           updated_at = now()
       WHERE slug = $1`,
      [slug, heroRel, JSON.stringify(galleryRels)]
    );
  } finally {
    await client.end().catch(() => {});
  }
}

async function processOne(model) {
  const outDir = path.join(ROOT, "public", "images", "models", model.slug);
  await fs.ensureDir(outDir);
  const pageUrl = `${BASE}/es/models/${model.sitePath}.html`;

  let candidates = [];
  try {
    const html = await fetchHtmlViaJina(pageUrl);
    candidates = extractMxUrls(html);
    console.log(`  MX candidates: ${candidates.length}`);
  } catch (e) {
    console.log(`  MX HTML failed: ${e.message}`);
  }

  try {
    const press = await fetchPressClubUrls(model.name);
    console.log(`  PressClub candidates: ${press.length}`);
    candidates = [...candidates, ...press];
  } catch (e) {
    console.log(`  PressClub failed: ${e.message}`);
  }

  try {
    const bing = await fetchBingOfficialImages(model.name);
    console.log(`  Bing official candidates: ${bing.length}`);
    candidates = [...candidates, ...bing];
  } catch (e) {
    console.log(`  Bing failed: ${e.message}`);
  }

  // Dedup
  candidates = [...new Set(candidates)];
  if (candidates.length < 5) {
    throw new Error(`Only ${candidates.length} total candidates`);
  }

  const saved = [];
  for (const url of candidates) {
    if (saved.length >= 5) break;
    const idx = saved.length;
    const destName = idx === 0 ? "hero.jpg" : `gallery-${idx}.jpg`;
    const dest = path.join(outDir, destName);
    // Keep existing valid hero if present and we're on first slot
    if (idx === 0 && (await fs.pathExists(dest))) {
      const st = await fs.stat(dest);
      if (st.size > 2000) {
        saved.push(dest);
        continue;
      }
    }
    try {
      const bytes = await downloadImage(url, dest, pageUrl);
      console.log(`  saved ${destName} (${bytes} bytes) from ${url.slice(0, 90)}...`);
      saved.push(dest);
      await sleep(200);
    } catch (e) {
      // try next candidate
    }
  }

  if (saved.length < 5) {
    throw new Error(`Only downloaded ${saved.length}/5 images`);
  }

  const heroRel = `public/images/models/${model.slug}/hero.jpg`;
  const galleryRels = [1, 2, 3, 4].map((n) => `public/images/models/${model.slug}/gallery-${n}.jpg`);
  await upsert(model.slug, heroRel, galleryRels);
}

async function main() {
  const ok = [];
  const bad = [];
  for (const model of FAILED) {
    try {
      console.log(`→ ${model.slug}`);
      await processOne(model);
      console.log(`✅ ${model.slug} – 5 images saved, DB row upserted.`);
      ok.push(model.slug);
    } catch (e) {
      console.error(`❌ ${model.slug} – ${e.message}`);
      bad.push({ slug: model.slug, reason: e.message });
    }
  }
  console.log("\n========== RETRY SUMMARY ==========");
  console.log(`OK: ${ok.join(", ") || "none"}`);
  if (bad.length) {
    for (const b of bad) console.log(`FAIL ${b.slug}: ${b.reason}`);
    process.exit(1);
  }
  console.log("✅ All previously failed models recovered");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
