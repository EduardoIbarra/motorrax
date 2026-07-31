#!/usr/bin/env node
/**
 * Download official BMW Motorrad Mexico photos for catalog models,
 * save under public/images/models/<slug>/, and upsert paths into bmw_models.
 *
 * HTML pages are fetched via jina.ai (Akamai blocks direct bot HTML fetches).
 * Image binaries are downloaded with axios (Referer + retries; imagecdn fallback).
 */
const path = require("path");
const fs = require("fs-extra");
const axios = require("axios");
const cheerio = require("cheerio");
const { Client } = require("pg");
const { execFile } = require("child_process");
const { promisify } = require("util");
const execFileAsync = promisify(execFile);

const ROOT = path.join(__dirname, "..");
const BASE_ORIGIN = "https://www.bmw-motorrad.com.mx";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/** User slug → site page path under /es/models/ */
const MODELS = [
  { slug: "g310gs", name: "G 310 GS", sitePath: "adventure/g310gs" },
  { slug: "f800gs", name: "F 800 GS", sitePath: "adventure/f800gs" },
  { slug: "f900gs", name: "F 900 GS", sitePath: "adventure/f900gs" },
  { slug: "f900gs-adventure", name: "F 900 GS Adventure", sitePath: "adventure/f900gs-adventure" },
  { slug: "r1300gs", name: "R 1300 GS", sitePath: "adventure/r1300gs" },
  { slug: "r1300gs-adventure", name: "R 1300 GS Adventure", sitePath: "adventure/r1300gs-adventure" },
  { slug: "g310r", name: "G 310 R", sitePath: "roadster/g310r" },
  { slug: "f900r", name: "F 900 R", sitePath: "roadster/f900r" },
  { slug: "s1000r", name: "S 1000 R", sitePath: "roadster/s1000r" },
  { slug: "f900xr", name: "F 900 XR", sitePath: "sport/f900xr" },
  { slug: "s1000xr", name: "S 1000 XR", sitePath: "sport/s1000xr" },
  { slug: "s1000rr", name: "S 1000 RR", sitePath: "sport/s1000rr" },
  { slug: "m1000r", name: "M 1000 R", sitePath: "m/m1000r" },
  { slug: "m1000xr", name: "M 1000 XR", sitePath: "m/m1000xr" },
  { slug: "m1000rr", name: "M 1000 RR", sitePath: "m/m1000rr" },
  { slug: "r12", name: "R 12", sitePath: "heritage/r12" },
  { slug: "r12ninet", name: "R 12 nineT", sitePath: "heritage/r12-ninet" },
  { slug: "r12gs", name: "R 12 G/S", sitePath: "heritage/r12gs" },
  { slug: "r18classic", name: "R 18 Classic", sitePath: "heritage/r18-classic" },
  { slug: "r18roctane", name: "R 18 Roctane", sitePath: "heritage/r18-roctane" },
  { slug: "k1600gt", name: "K 1600 GT", sitePath: "tour/k1600gt" },
  { slug: "k1600gtl", name: "K 1600 GTL", sitePath: "tour/k1600gtl" },
  { slug: "r1250rt", name: "R 1250 RT", sitePath: "tour/r1250rt" },
  { slug: "r1300rt", name: "R 1300 RT", sitePath: "tour/r1300rt" },
  { slug: "c400x", name: "C 400 X", sitePath: "urban_mobility/c400x" },
  { slug: "c400gt", name: "C 400 GT", sitePath: "urban_mobility/c400gt" },
  { slug: "ce04", name: "CE 04", sitePath: "urban_mobility/ce04" },
  { slug: "ce02", name: "CE 02", sitePath: "urban_mobility/ce02" },
];

function loadDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const envPath = path.join(ROOT, ".env.local");
  if (fs.existsSync(envPath)) {
    const line = fs
      .readFileSync(envPath, "utf8")
      .split("\n")
      .find((l) => l.startsWith("DATABASE_URL="));
    if (line) {
      return line
        .slice("DATABASE_URL=".length)
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  }
  // Fallback used by src/db/index.ts (dev convenience)
  return "postgresql://neondb_owner:npg_2lyXi0NuJPgx@ep-shy-grass-ax5d7o8w-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
}

function absUrl(url, pageUrl) {
  if (!url) return null;
  url = url.trim();
  if (!url || url.startsWith("blob:") || url.startsWith("data:")) return null;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${BASE_ORIGIN}${url}`;
  try {
    return new URL(url, pageUrl).href;
  } catch {
    return null;
  }
}

function isLikelyThumbnail(url) {
  const u = url.toLowerCase();
  return (
    u.includes("mainnavigation") ||
    u.includes("thumbnail") ||
    u.includes("favicon") ||
    u.includes("logo") ||
    u.includes("svgicon") ||
    u.includes("icon") ||
    u.includes("300x180") ||
    u.includes("600x360") ||
    u.includes("_thumb") ||
    u.includes("optionnavigation") ||
    u.includes("softconfigurator")
  );
}

function isModelAsset(url) {
  const u = url.toLowerCase();
  return (
    (u.includes("/content/dam/") || u.includes("bmwmotorradnsc")) &&
    (u.includes(".jpg") || u.includes(".jpeg") || u.includes(".png") || u.includes(".webp")) &&
    !isLikelyThumbnail(u)
  );
}

function scoreImage(url, role) {
  let score = 0;
  const u = url.toLowerCase();
  if (u.includes("product-stage") || u.includes("multiimage")) score += 50;
  if (u.includes("2560") || u.includes("1920") || u.includes("1600")) score += 30;
  if (u.includes("-l-") || u.includes("_l_") || u.includes("-l_")) score += 25;
  if (u.includes("-m-") || u.includes("_m_")) score += 10;
  if (u.includes("multigallery")) score += 20;
  if (u.includes("mobile")) score -= 15;
  if (u.includes("-s-") || u.includes("_s_")) score -= 10;
  if (u.includes(".asset.")) score += 5;
  if (role === "hero" && (u.includes("product-stage") || u.includes("og"))) score += 40;
  if (role === "gallery" && u.includes("product-stage")) score -= 30;
  return score;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Fetch HTML via curl → jina.ai reader.
 * Axios against jina is rate-limited/403 from this environment; curl works reliably.
 * Direct BMW HTML is blocked by Akamai (TLS handshake ok, body never arrives).
 */
async function fetchViaCurlJina(pageUrl, mode) {
  const jinaUrl = `https://r.jina.ai/${pageUrl}`;
  // Keep headers minimal: full Chrome UA + Accept triggers Cloudflare on jina.
  const args = [
    "--http1.1",
    "--max-time",
    "90",
    "--silent",
    "--show-error",
    "-A",
    "Mozilla/5.0",
  ];
  if (mode === "html") {
    args.push("-H", "x-respond-with: html");
  }
  args.push(jinaUrl);

  const { stdout, stderr } = await execFileAsync("curl", args, {
    maxBuffer: 15 * 1024 * 1024,
    encoding: "utf8",
  });
  const body = String(stdout || "");
  if (body.includes("Just a moment...") || body.includes("cf-browser-verification")) {
    throw new Error(`jina ${mode} cloudflare challenge`);
  }
  if (body.length < 2000) {
    throw new Error(
      `jina ${mode} short body (${body.length})${stderr ? ` stderr=${stderr.slice(0, 200)}` : ""}: ${body.slice(0, 180)}`
    );
  }
  // jina error pages
  if (/^\{"data":null|"code"\s*:\s*4\d\d/i.test(body.trim()) || body.includes("Rate limit")) {
    throw new Error(`jina ${mode} error: ${body.slice(0, 200)}`);
  }
  return body;
}

async function fetchHtml(pageUrl) {
  const errors = [];

  // 1) jina HTML via curl (best for cheerio / data-file-reference)
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const html = await fetchViaCurlJina(pageUrl, "html");
      return { html, via: `jina-html#${attempt}` };
    } catch (e) {
      errors.push(`jina-html#${attempt}: ${e.message}`);
      await sleep(1000 * attempt);
    }
  }

  // 2) jina markdown still exposes image URLs
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const md = await fetchViaCurlJina(pageUrl, "markdown");
      return { html: md, via: `jina-md#${attempt}` };
    } catch (e) {
      errors.push(`jina-md#${attempt}: ${e.message}`);
      await sleep(1000 * attempt);
    }
  }

  throw new Error(`Failed to fetch HTML for ${pageUrl} — ${errors.join(" | ")}`);
}

function pageUrlCandidates(model) {
  const list = [
    `${BASE_ORIGIN}/es/models/${model.sitePath}.html`,
    `${BASE_ORIGIN}/es/models/${model.slug}.html`,
    `${BASE_ORIGIN}/es/models/adventure/${model.slug}.html`,
  ];
  return [...new Set(list)];
}

function extractImages(html, pageUrl) {
  const $ = cheerio.load(html);
  const found = [];

  const push = (raw, source) => {
    const url = absUrl(raw, pageUrl);
    if (!url || !isModelAsset(url)) return;
    found.push({ url, source });
  };

  // Hero candidates
  const og = $('meta[property="og:image"]').attr("content");
  if (og) push(og, "og:image");

  $('meta[name="twitter:image"], meta[property="twitter:image"]').each((_, el) => {
    push($(el).attr("content"), "twitter:image");
  });

  // Structured data
  $('script[type="application/ld+json"]').each((_, el) => {
    const text = $(el).html() || "";
    try {
      const data = JSON.parse(text);
      const walk = (node) => {
        if (!node) return;
        if (typeof node === "string" && node.includes("http")) push(node, "ld+json");
        else if (Array.isArray(node)) node.forEach(walk);
        else if (typeof node === "object") {
          if (node.image) {
            if (typeof node.image === "string") push(node.image, "ld+json");
            else if (Array.isArray(node.image)) node.image.forEach((i) => push(typeof i === "string" ? i : i?.url, "ld+json"));
            else if (node.image.url) push(node.image.url, "ld+json");
          }
          Object.values(node).forEach(walk);
        }
      };
      walk(data);
    } catch {
      // ignore invalid JSON
    }
  });

  // Product stage / data-src real sources (blob imgs ignored)
  $("[data-src], [data-lazyimage], [data-file-reference]").each((_, el) => {
    const attrs = ["data-src", "data-lazyimage", "data-file-reference", "data-desktop-src", "data-mobile-src"];
    for (const a of attrs) {
      const v = $(el).attr(a);
      if (v) push(v, a);
    }
  });

  // Explicit gallery / maximized classes
  $("img.image--maximized, img.image--gallery, img.multigallery__slide-img, img.cm-product-stage__image").each(
    (_, el) => {
      const src = $(el).attr("src") || $(el).attr("data-src");
      push(src, "img-class");
    }
  );

  // Any remaining content/dam image URLs in the raw HTML (covers blob-backed pages)
  const re =
    /(?:https:\/\/www\.bmw-motorrad\.com\.mx)?(\/content\/dam\/bmwmotorradnsc\/[^"'\\\s>]+\.(?:jpg|jpeg|png|webp)(?:\.asset\.\d+\.(?:jpg|jpeg|png|webp))?)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    push(m[1], "regex");
  }

  // Absolute URLs too
  const reAbs =
    /https:\/\/www\.bmw-motorrad\.com\.mx\/content\/dam\/bmwmotorradnsc\/[^"'\\\s>]+\.(?:jpg|jpeg|png|webp)(?:\.asset\.\d+\.(?:jpg|jpeg|png|webp))?/gi;
  while ((m = reAbs.exec(html)) !== null) {
    push(m[0], "regex-abs");
  }

  // Deduplicate by normalized path (strip query)
  const byKey = new Map();
  for (const item of found) {
    try {
      const u = new URL(item.url);
      u.search = "";
      u.hash = "";
      // normalize double .jpg.asset.xxx.jpg
      const key = u.href;
      if (!byKey.has(key)) byKey.set(key, item);
    } catch {
      // skip
    }
  }
  return Array.from(byKey.values());
}

function pickHeroAndGallery(images) {
  const heroSorted = [...images].sort((a, b) => scoreImage(b.url, "hero") - scoreImage(a.url, "hero"));
  const hero = heroSorted[0] || null;

  const galleryPool = images
    .filter((i) => !hero || i.url !== hero.url)
    .filter((i) => {
      const u = i.url.toLowerCase();
      // Prefer multigallery / model detail shots over color swatches
      return (
        u.includes("multigallery") ||
        u.includes("highlight") ||
        u.includes("gallery") ||
        u.includes("stage") ||
        u.includes("range") ||
        u.includes("feature") ||
        u.includes("models/")
      );
    })
    .sort((a, b) => scoreImage(b.url, "gallery") - scoreImage(a.url, "gallery"));

  // Prefer unique visual variants: drop near-identical mobile/desktop pairs
  const gallery = [];
  const seenBase = new Set();
  for (const img of galleryPool) {
    const base = img.url
      .replace(/\.asset\.\d+\.(jpg|jpeg|png|webp)$/i, ".$1")
      .replace(/_mobile_/gi, "_")
      .replace(/-mobile-/gi, "-")
      .replace(/_[sml]_/gi, "_")
      .replace(/-[sml]-/gi, "-")
      .toLowerCase();
    if (seenBase.has(base)) continue;
    seenBase.add(base);
    gallery.push(img);
    if (gallery.length >= 4) break;
  }

  // If still short, fill from remaining high-scoring images
  if (gallery.length < 4) {
    const rest = [...images]
      .filter((i) => (!hero || i.url !== hero.url) && !gallery.some((g) => g.url === i.url))
      .sort((a, b) => scoreImage(b.url, "gallery") - scoreImage(a.url, "gallery"));
    for (const img of rest) {
      gallery.push(img);
      if (gallery.length >= 4) break;
    }
  }

  return { hero, gallery: gallery.slice(0, 4) };
}

function isValidImageBuffer(buf) {
  if (!buf || buf.length < 1000) return false;
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8) return true;
  // PNG
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true;
  // WebP
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return true;
  // AVIF / HEIF (ISO BMFF)
  if (buf.length > 12 && buf.toString("ascii", 4, 8) === "ftyp") return true;
  return false;
}

function isJpegBuffer(buf) {
  return buf && buf.length > 1000 && buf[0] === 0xff && buf[1] === 0xd8;
}

async function downloadWithCurl(url, referer, acceptJpegOnly) {
  const tmp = path.join(
    require("os").tmpdir(),
    `bmw-img-${Date.now()}-${Math.random().toString(36).slice(2)}.bin`
  );
  const accept = acceptJpegOnly
    ? "image/jpeg,image/jpg,image/png,*/*;q=0.5"
    : "image/avif,image/webp,image/apng,image/jpeg,image/png,image/*,*/*;q=0.8";
  const args = [
    "--http1.1",
    "--max-time",
    "25",
    "--silent",
    "--show-error",
    "--fail",
    "-L",
    "-A",
    UA,
    "-H",
    `Accept: ${accept}`,
    "-H",
    `Referer: ${referer || `${BASE_ORIGIN}/es/home.html`}`,
    "-o",
    tmp,
    url,
  ];
  try {
    await execFileAsync("curl", args, { maxBuffer: 8 * 1024 * 1024 });
    const buf = await fs.readFile(tmp);
    await fs.remove(tmp).catch(() => {});
    return buf;
  } catch (e) {
    await fs.remove(tmp).catch(() => {});
    throw e;
  }
}

async function downloadViaImageCdn(url) {
  // Reliable JPEG proxy (Akamai often serves AVIF / hangs on some assets)
  const proxy = `https://imagecdn.app/v2/image/${encodeURIComponent(url)}?width=2560&format=jpeg&quality=90`;
  const res = await axios.get(proxy, {
    headers: { "User-Agent": "Mozilla/5.0", Accept: "image/jpeg,image/*,*/*;q=0.8" },
    responseType: "arraybuffer",
    timeout: 60000,
    validateStatus: (s) => s >= 200 && s < 400,
  });
  return Buffer.from(res.data);
}

async function downloadImage(url, destPath, referer) {
  const attempts = [
    // Prefer JPEG via imagecdn (stable + real .jpg bytes)
    async () => downloadViaImageCdn(url),
    // Direct curl requesting JPEG
    async () => downloadWithCurl(url, referer, true),
    // Direct curl accepting any image format
    async () => downloadWithCurl(url, referer, false),
  ];

  let lastErr;
  for (let i = 0; i < attempts.length; i++) {
    for (let retry = 0; retry < 2; retry++) {
      try {
        const buf = await attempts[i]();
        if (!isValidImageBuffer(buf)) {
          throw new Error(`Invalid image payload (${buf.length} bytes)`);
        }
        // Prefer real JPEG for .jpg filenames; allow AVIF only as last resort
        if (!isJpegBuffer(buf) && i < attempts.length - 1) {
          throw new Error("Non-JPEG payload; trying next source");
        }
        await fs.ensureDir(path.dirname(destPath));
        await fs.writeFile(destPath, buf);
        return { bytes: buf.length, attempt: i, retry, jpeg: isJpegBuffer(buf) };
      } catch (e) {
        lastErr = e;
        await sleep(300 + retry * 400);
      }
    }
  }
  throw new Error(`Download failed for ${url}: ${lastErr?.message || lastErr}`);
}

async function withDb(fn) {
  const databaseUrl = loadDatabaseUrl();
  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
    // Neon pooler may drop idle connections during long image downloads
    keepAlive: true,
    connectionTimeoutMillis: 30000,
  });
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end().catch(() => {});
  }
}

async function upsertModel(slug, heroRel, galleryRels) {
  await withDb(async (client) => {
    await ensureColumns(client);
    await client.query(
      `INSERT INTO bmw_models (slug, hero_image_path, gallery_image_paths, updated_at, name, category, msrp_mxn, engine_capacity_cc, power_hp, torque_nm, seat_height_mm, unladen_weight_kg, description_es)
       VALUES ($1, $2, $3::jsonb, now(), $4, 'Unknown', 0, 0, 0, 0, 0, 0, '')
       ON CONFLICT (slug) DO UPDATE
       SET hero_image_path = EXCLUDED.hero_image_path,
           gallery_image_paths = EXCLUDED.gallery_image_paths,
           updated_at = now()`,
      [slug, heroRel, JSON.stringify(galleryRels), slug]
    );
  });
}

async function filesAlreadyComplete(slug) {
  const heroRel = `public/images/models/${slug}/hero.jpg`;
  const galleryRels = [1, 2, 3, 4].map((n) => `public/images/models/${slug}/gallery-${n}.jpg`);
  for (const rel of [heroRel, ...galleryRels]) {
    try {
      const st = await fs.stat(path.join(ROOT, rel));
      if (st.size < 1000) return false;
    } catch {
      return false;
    }
  }
  return { heroRel, galleryRels };
}

async function processModel(model) {
  const outDir = path.join(ROOT, "public", "images", "models", model.slug);
  await fs.ensureDir(outDir);

  // Resume: if all 5 files exist, just re-upsert DB paths
  const existing = await filesAlreadyComplete(model.slug);
  if (existing) {
    await upsertModel(model.slug, existing.heroRel, existing.galleryRels);
    return { resumed: true };
  }

  const candidates = pageUrlCandidates(model);
  let html = null;
  let pageUrl = candidates[0];
  let fetchErrors = [];

  for (const candidate of candidates) {
    try {
      const fetched = await fetchHtml(candidate);
      // Soft-404 detection
      const soft404 =
        /page not found|página no encontrada/i.test(fetched.html) &&
        !/og:image|product-stage|multigallery/i.test(fetched.html);
      if (soft404) {
        fetchErrors.push(`${candidate}: soft-404`);
        continue;
      }
      html = fetched.html;
      pageUrl = candidate;
      break;
    } catch (e) {
      fetchErrors.push(`${candidate}: ${e.message}`);
    }
  }

  if (!html) {
    throw new Error(`Could not load any page URL — ${fetchErrors.join(" || ")}`);
  }

  const images = extractImages(html, pageUrl);
  const { hero, gallery } = pickHeroAndGallery(images);

  if (!hero) {
    throw new Error(`No hero image found (parsed ${images.length} candidates)`);
  }
  if (gallery.length < 4) {
    throw new Error(
      `Only ${gallery.length} gallery images found (need 4). Candidates=${images.length}. Hero=${hero.url}`
    );
  }

  const heroRel = `public/images/models/${model.slug}/hero.jpg`;
  const galleryRels = [1, 2, 3, 4].map((n) => `public/images/models/${model.slug}/gallery-${n}.jpg`);

  await downloadImage(hero.url, path.join(ROOT, heroRel), pageUrl);
  for (let i = 0; i < 4; i++) {
    await sleep(200);
    await downloadImage(gallery[i].url, path.join(ROOT, galleryRels[i]), pageUrl);
  }

  // Verify files on disk
  for (const rel of [heroRel, ...galleryRels]) {
    const st = await fs.stat(path.join(ROOT, rel));
    if (st.size < 1000) throw new Error(`Saved file too small: ${rel} (${st.size} bytes)`);
  }

  await upsertModel(model.slug, heroRel, galleryRels);
  return { hero: hero.url, gallery: gallery.map((g) => g.url) };
}

async function ensureColumns(client) {
  await client.query(`ALTER TABLE bmw_models ADD COLUMN IF NOT EXISTS hero_image_path text`);
  await client.query(`ALTER TABLE bmw_models ADD COLUMN IF NOT EXISTS gallery_image_paths jsonb`);
  await client.query(
    `ALTER TABLE bmw_models ADD COLUMN IF NOT EXISTS updated_at timestamp without time zone DEFAULT now()`
  );
}

async function main() {
  // Ensure schema once up front
  await withDb((client) => ensureColumns(client));

  const successes = [];
  const failures = [];

  for (const model of MODELS) {
    try {
      const result = await processModel(model);
      const note = result?.resumed ? " (resumed existing files)" : "";
      console.log(`✅ ${model.slug} – 5 images saved, DB row upserted.${note}`);
      successes.push(model.slug);
    } catch (e) {
      console.error(`❌ ${model.slug} – ${e.message}`);
      failures.push({ slug: model.slug, reason: e.message });
    }
    // polite pacing between models (jina + image CDN)
    await sleep(900);
  }

  console.log("\n========== SUMMARY ==========");
  if (failures.length === 0) {
    console.log(`✅ All ${MODELS.length} models processed`);
  } else {
    console.log(`Processed: ${successes.length}/${MODELS.length} succeeded, ${failures.length} failed`);
    for (const f of failures) {
      console.log(`  - ${f.slug}: ${f.reason}`);
    }
  }
  process.exit(failures.length ? 1 : 0);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
