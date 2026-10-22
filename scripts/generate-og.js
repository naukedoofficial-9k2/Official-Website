const sharp = require('sharp');
const fs = require('fs');

async function generateOg() {
  const svgLogo = fs.readFileSync('b:/NauKeDO/public/brand/logo-white.svg', 'utf8');
  const pathMatch = svgLogo.match(/<path[^>]*\/>/);
  const pathTag = pathMatch ? pathMatch[0] : '';

  const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#D70406"/>
  <!-- Decorative subtle circle -->
  <circle cx="1200" cy="0" r="400" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  <circle cx="0" cy="630" r="300" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  <!-- Centered Logo -->
  <g transform="translate(425, 170) scale(0.46)">
    ${pathTag}
  </g>
  <text x="600" y="400" font-family="Poppins, Arial, sans-serif" font-size="54" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="-1">
    Loud, on purpose.
  </text>
  <text x="600" y="455" font-family="Poppins, Arial, sans-serif" font-size="22" font-weight="600" fill="rgba(255,255,255,0.85)" text-anchor="middle">
    Social-First Creative Agency • India &amp; Western Markets
  </text>
</svg>
`;

  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile('b:/NauKeDO/public/brand/og-image.png');

  console.log('Successfully generated public/brand/og-image.png');
}

generateOg().catch(console.error);
