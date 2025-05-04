const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../src/assets');
const outputFormats = ['webp', 'avif'];

if (!fs.existsSync(assetsDir)) {
  console.error('src/assets Verzeichnis nicht gefunden');
  process.exit(1);
}

fs.readdirSync(assetsDir).forEach(file => {
  if (file.endsWith('.png')) {
    const inputPath = path.join(assetsDir, file);
    outputFormats.forEach(fmt => {
      const outFile = file.replace(/\.png$/, `.${fmt}`);
      const outputPath = path.join(assetsDir, outFile);
      sharp(inputPath)
        .toFormat(fmt, fmt === 'webp' ? { quality: 80 } : { quality: 50 })
        .toFile(outputPath)
        .then(() => console.log(`✔ konvertiert: ${outFile}`))
        .catch(err => console.error(`✖ Fehler bei ${outFile}:`, err));
    });
  }
});