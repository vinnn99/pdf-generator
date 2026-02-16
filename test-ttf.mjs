import { generatePdfBuffer } from './src/pdfService.js';
import fs from 'fs';

const testData = {
  nama: 'Test User',
  judul: 'Sample Agreement',
  nik: '1234567890',
  address: 'Jl. Test No. 1',
  pt: 'PT Company',
  video: 'https://youtube.com/test',
  pencipta: 'Test Creator',
  asNama: 'AS Name',
  bankName: 'Bank Test',
  npwp: '1234567890123',
  imail: 'test@example.com',
  phone: '08123456789',
  norek: '1234567890'
};

try {
  console.log('[Test] Starting PDF generation with TTF fonts...');
  const buf = await generatePdfBuffer(testData);
  fs.writeFileSync('outputs/test-pdfmake-ttf.pdf', buf);
  console.log(`✓ PDF generated: outputs/test-pdfmake-ttf.pdf (${buf.length} bytes)`);
} catch (err) {
  console.error('✗ Error:', err.message);
  console.error(err.stack);
  process.exit(1);
}
