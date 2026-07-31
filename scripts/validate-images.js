// scripts/validate-images.js
const fs = require('fs');
const path = require('path');

// Load model slugs from TypeScript data file
const modelFile = path.join(__dirname, '..', 'src', 'lib', 'data', 'bmw-models.ts');
const fileContent = fs.readFileSync(modelFile, 'utf-8');
const slugRegex = /slug:\s*"([^"]+)"/g;
let match;
const BMW_MODELS_DATA = [];
while ((match = slugRegex.exec(fileContent)) !== null) {
  BMW_MODELS_DATA.push({ slug: match[1] });
}


function fileExists(filePath) {
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
