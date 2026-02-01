// Generate QR code using online API
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = 'https://whom.clothing/WhomIfastfor';
// Using qr-server.com API
const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(url)}`;
const outputPath = join(__dirname, '..', 'public', 'qr-whom-ifastfor.png');

https.get(qrApiUrl, (response) => {
  const chunks = [];
  
  response.on('data', (chunk) => {
    chunks.push(chunk);
  });
  
  response.on('end', () => {
    const buffer = Buffer.concat(chunks);
    writeFileSync(outputPath, buffer);
    console.log('QR code generated successfully at:', outputPath);
    console.log('URL encoded:', url);
  });
}).on('error', (err) => {
  console.error('Error generating QR code:', err);
  process.exit(1);
});
