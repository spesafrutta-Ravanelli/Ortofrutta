import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Crea la cartella icons se non esiste
const iconsDir = resolve(__dirname, 'public/icons');
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = resolve(__dirname, 'public/images/logo.webp');

console.log('Generazione icone PWA...');

for (const size of sizes) {
  await sharp(inputFile)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png()
    .toFile(resolve(iconsDir, `icon-${size}x${size}.png`));
  
  console.log(`✅ Creata icona ${size}x${size}`);
}

console.log('🎉 Tutte le icone generate in public/icons/');
