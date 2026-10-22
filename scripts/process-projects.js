const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = 'C:\\Users\\bhave\\.gemini\\antigravity-ide\\brain\\7e3d38d9-ecca-44f1-9925-f590f0b07107';
const outputDir = path.join(__dirname, '../public/projects');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = [
  { src: 'elysium_architecture_1791805643534.jpg', dest: 'elysium_architecture.webp', width: 1400 },
  { src: 'cake_shop_showcase_1791805677868.jpg', dest: 'cake_shop_showcase.webp', width: 1200 },
  { src: 'lumora_beauty_salon_1791805718842.jpg', dest: 'lumora_beauty_salon.webp', width: 1400 },
  { src: 'candle_lifestyle_study_1791805754798.jpg', dest: 'candle_lifestyle_study.webp', width: 1200 },
  { src: 'branding_stationery_set_1791805795080.jpg', dest: 'branding_stationery_set.webp', width: 1400 },
  { src: 'motion_reel_1791805841950.jpg', dest: 'motion_reel.webp', width: 1400 },
];

async function run() {
  for (const item of files) {
    const inputPath = path.join(brainDir, item.src);
    const outputPath = path.join(outputDir, item.dest);
    if (fs.existsSync(inputPath)) {
      await sharp(inputPath)
        .resize({ width: item.width, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log(`Processed: ${item.dest}`);
    } else {
      console.warn(`File not found: ${inputPath}`);
    }
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
