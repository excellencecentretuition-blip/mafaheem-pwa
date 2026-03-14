/**
 * Generates icon-192.png and icon-512.png for PWA.
 * Run: node generate-icons.js
 * Requires: npm install pngjs
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const dir = path.join(__dirname, 'icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const primary = [44, 62, 80];   // #2c3e50
const accent = [39, 174, 96];   // #27ae60
const white = [255, 255, 255];

function createPng(size) {
  const png = new PNG({ width: size, height: size });
  const cx = size / 2, cy = size / 2, r = size / 2 - 8;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;
      const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
      const inCircle = dist < r;
      const [r0, g, b] = inCircle ? primary : white;
      png.data[idx] = r0;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = 255;
    }
  }

  return PNG.sync.write(png);
}

try {
  fs.writeFileSync(path.join(dir, 'icon-192.png'), createPng(192));
  fs.writeFileSync(path.join(dir, 'icon-512.png'), createPng(512));
  console.log('Generated icon-192.png and icon-512.png');
} catch (e) {
  console.error('Icon generation failed:', e.message);
}
