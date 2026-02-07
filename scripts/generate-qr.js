// Simple QR code generator script
// Uses qrcode library to generate QR code for the WhomIfastfor page

import QRCode from 'qrcode';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = 'https://whom.clothing/WhomIfastfor';
const outputPath = join(__dirname, '..', 'public', 'qr-whom-ifastfor.png');

QRCode.toFile(outputPath, url, {
  errorCorrectionLevel: 'H',
  type: 'png',
  width: 500,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
}, function (err) {
  if (err) {
    console.error('Error generating QR code:', err);
    process.exit(1);
  }
  console.log('QR code generated successfully at:', outputPath);
  console.log('URL encoded:', url);
});
