const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = 'C:\\Users\\bhave\\.gemini\\antigravity-ide\\brain\\9a386889-3c89-4949-8c78-8bc8d3a4a1e9';
const outputDir = path.join(__dirname, '../public/projects');

const files = [
  { src: 'wedding_still_1791897740749.jpg', dest: 'wedding_cinematic_still.webp', width: 1400 },
  { src: 'fitness_still_1791897778528.jpg', dest: 'fitness_kinetic_still.webp', width: 1400 },
  { src: 'event_still_1791897798550.jpg', dest: 'event_live_still.webp', width: 1400 },
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
