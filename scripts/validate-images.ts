// scripts/validate-images.ts
import * as fs from 'fs';
import * as path from 'path';
import { BMW_MODELS_DATA } from '../src/lib/data/bmw-models';

function fileExists(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

let hasError = false;

for (const model of BMW_MODELS_DATA) {
  const baseDir = path.join('public', 'images', 'models', model.slug);
  const heroPath = path.join(baseDir, 'hero.jpg');
  if (!fileExists(heroPath)) {
    console.error(`Missing hero image for ${model.slug}: ${heroPath}`);
    hasError = true;
  }
  // Check at least one gallery image
  const gallery1 = path.join(baseDir, 'gallery-1.jpg');
  if (!fileExists(gallery1)) {
    console.error(`Missing gallery-1 image for ${model.slug}: ${gallery1}`);
    hasError = true;
  }
}

if (hasError) {
  console.error('Validation failed.');
  process.exit(1);
} else {
  console.log('All images are present.');
  process.exit(0);
}
