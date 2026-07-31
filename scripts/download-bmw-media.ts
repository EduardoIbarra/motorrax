// scripts/download-bmw-media.ts
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { BMW_MODELS_DATA } from '../src/lib/data/bmw-models';

// Helper to fetch a URL and return the response body as string
function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 400) {
        reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Helper to download a binary file
function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 400) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function processModel(model: { slug: string }) {
  const slug = model.slug;
  const targetDir = path.join('public', 'images', 'models', slug);
  fs.mkdirSync(targetDir, { recursive: true });

  // Attempt to locate images from the official press page
  const pressUrl = `https://www.press.bmwgroup.com/global/photo?search=${slug}`;
  let html: string;
  try {
    html = await fetchUrl(pressUrl);
  } catch (e) {
    console.error(`Could not fetch press page for ${slug}:`, e);
    return;
  }

  // Find image URLs (jpg or webp) that contain the slug
  const regex = new RegExp(`https?://[^"'\\s]*${slug}[^"'\\s]*\\.(?:jpe?g|webp)`, 'gi');
  const matches = Array.from(html.matchAll(regex)).map((m) => m[0]);
  if (matches.length === 0) {
    console.warn(`No images found for ${slug}`);
    return;
  }

  // First match is hero image, next few are gallery
  const heroUrl = matches[0];
  const galleryUrls = matches.slice(1, 5); // up to 4 gallery images

  try {
    await downloadFile(heroUrl, path.join(targetDir, 'hero.jpg'));
    console.log(`Downloaded hero for ${slug}`);
    for (let i = 0; i < galleryUrls.length; i++) {
      const dest = path.join(targetDir, `gallery-${i + 1}.jpg`);
      await downloadFile(galleryUrls[i], dest);
    }
    console.log(`Downloaded ${galleryUrls.length} gallery images for ${slug}`);
  } catch (e) {
    console.error(`Error downloading images for ${slug}:`, e);
  }
}

async function main() {
  for (const model of BMW_MODELS_DATA) {
    await processModel(model);
  }
  console.log('All models processed');
}

main().catch((e) => console.error('Unexpected error', e));
