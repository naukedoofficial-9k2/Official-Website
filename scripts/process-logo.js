const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processLogo() {
  const inputPath = path.join(__dirname, '../public/brand/nau-k-do-logo.png');
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Background red color: R ~ 209, G ~ 7, B ~ 4
  // Target white: R ~ 255, G ~ 255, B ~ 255
  
  // Create transparent white wordmark
  const whiteOutput = Buffer.alloc(width * height * 4);
  const darkOutput = Buffer.alloc(width * height * 4);

  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * channels;
      const dstIdx = (y * width + x) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      // Whiteness calculation: how close is it to white vs red?
      // In red areas: r ~ 209, g ~ 7, b ~ 4. (g and b are very low)
      // In white areas: r ~ 255, g ~ 255, b ~ 255. (g and b are very high)
      // Use (g + b) / 2 to determine the white opacity
      const greenBlueAvg = (g + b) / 2;
      
      // Map greenBlueAvg from [20, 220] to [0, 255]
      let alpha = 0;
      if (greenBlueAvg > 20) {
        alpha = Math.min(255, Math.max(0, Math.round(((greenBlueAvg - 20) / (220 - 20)) * 255)));
      }

      if (alpha > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }

      // White wordmark
      whiteOutput[dstIdx] = 255;
      whiteOutput[dstIdx + 1] = 255;
      whiteOutput[dstIdx + 2] = 255;
      whiteOutput[dstIdx + 3] = alpha;

      // Dark ink wordmark: #281E1C -> (40, 30, 28)
      darkOutput[dstIdx] = 40;
      darkOutput[dstIdx + 1] = 30;
      darkOutput[dstIdx + 2] = 28;
      darkOutput[dstIdx + 3] = alpha;
    }
  }

  const padding = 20;
  const cropLeft = Math.max(0, minX - padding);
  const cropTop = Math.max(0, minY - padding);
  const cropWidth = Math.min(width - cropLeft, (maxX - minX) + padding * 2);
  const cropHeight = Math.min(height - cropTop, (maxY - minY) + padding * 2);

  // Save white transparent wordmark
  await sharp(whiteOutput, { raw: { width, height, channels: 4 } })
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png()
    .toFile(path.join(__dirname, '../public/brand/nau-k-do-wordmark-white.png'));

  // Save dark transparent wordmark
  await sharp(darkOutput, { raw: { width, height, channels: 4 } })
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png()
    .toFile(path.join(__dirname, '../public/brand/nau-k-do-wordmark-dark.png'));

  // Also save a cropped square badge
  await sharp(inputPath)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../public/brand/nau-k-do-badge.png'));

  console.log('Successfully generated transparent brand assets:', {
    cropLeft, cropTop, cropWidth, cropHeight
  });
}

processLogo().catch(err => {
  console.error(err);
  process.exit(1);
});
