const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dcy26pw70',
  api_key: process.env.CLOUDINARY_API_KEY || '772983939396458',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'DwqGqswwcAQAniOmej7lYxgCoE4',
});

const MODELS_DIR = path.join(__dirname, '../public/images/models');
const BMW_DATA_FILE = path.join(__dirname, '../src/lib/data/bmw-models.ts');
const CLOUDINARY_FOLDER = 'motorrax/models';

async function uploadFile(filePath) {
  const relPath = path.relative(MODELS_DIR, filePath);
  // e.g. "g310gs/hero.jpg" -> public_id: "motorrax/models/g310gs/hero"
  const folderInCloudinary = `${CLOUDINARY_FOLDER}/${path.dirname(relPath)}`;
  const fileNameWithoutExt = path.parse(filePath).name;
  const publicId = `${folderInCloudinary}/${fileNameWithoutExt}`.replace(/\/+/g, '/');

  try {
    const res = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
    });
    console.log(`Uploaded ${relPath} -> ${res.secure_url}`);
    return { localRel: `/images/models/${relPath}`, cloudUrl: res.secure_url };
  } catch (err) {
    console.error(`Failed to upload ${filePath}:`, err.message);
    return null;
  }
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (/\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function main() {
  console.log(`Scanning ${MODELS_DIR}...`);
  const files = getAllFiles(MODELS_DIR);
  console.log(`Found ${files.length} images to upload to Cloudinary folder: "${CLOUDINARY_FOLDER}"`);

  const urlMap = {};

  for (const file of files) {
    const res = await uploadFile(file);
    if (res) {
      urlMap[res.localRel] = res.cloudUrl;
    }
  }

  console.log(`\nSuccessfully uploaded ${Object.keys(urlMap).length} images.`);

  if (fs.existsSync(BMW_DATA_FILE)) {
    console.log(`Updating ${BMW_DATA_FILE}...`);
    let content = fs.readFileSync(BMW_DATA_FILE, 'utf8');

    let replaceCount = 0;
    for (const [localUrl, cloudUrl] of Object.entries(urlMap)) {
      if (content.includes(localUrl)) {
        content = content.replaceAll(localUrl, cloudUrl);
        replaceCount++;
      }
    }

    fs.writeFileSync(BMW_DATA_FILE, content, 'utf8');
    console.log(`Updated ${replaceCount} image URL references in bmw-models.ts!`);
  }
}

main().catch(console.error);
