import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { getDocument } = require('pdfjs-dist/legacy/build/pdf.js');
import fs from 'fs';

const data = new Uint8Array(fs.readFileSync('Gowtham_GitHub_Projects.docx.pdf'));
const doc = await getDocument({ data }).promise;

let fullText = '';
for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i);
  const content = await page.getTextContent();
  const text = content.items.map(item => item.str).join(' ');
  fullText += `\n--- Page ${i} ---\n${text}`;
}
console.log(fullText);
