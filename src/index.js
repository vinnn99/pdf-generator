import 'dotenv/config';
import http from 'http';
import { URL } from 'url';
import { generatePdfBuffer } from './pdfService.js';

const PORT = process.env.PORT || 3333;
const HOST = 'localhost';

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // PDF generation endpoint
  if (url.pathname === '/api/v1/doc_agreement/generate' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const rawData = JSON.parse(body);
        // Handle nested data structure
        const formData = rawData.data || rawData;
        
        console.log(`[${new Date().toISOString()}] Generating PDF for: ${formData.nama}`);
        
        const buffer = await generatePdfBuffer(
          formData,
          formData.signature || null,
          formData.imageHeader || null
        );

        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Length': buffer.length,
          'Content-Disposition': `inline; filename="doc_agreement_${Date.now()}.pdf"`
        });
        res.end(buffer);
        
        console.log(`[${new Date().toISOString()}] ✓ PDF sent: ${buffer.length} bytes`);
      } catch (err) {
        console.error(`[ERROR] ${err.message}`);
        console.error(err.stack);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Health check endpoint
  if (url.pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, HOST, () => {
  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║   PDF GENERATOR SERVER RUNNING                            ║`);
  console.log(`╠════════════════════════════════════════════════════════════╣`);
  console.log(`║   🚀 Server: http://${HOST}:${PORT}`);
  console.log(`║   📝 Endpoint: POST /api/v1/doc_agreement/generate         ║`);
  console.log(`║   ❤️  Health: GET /health                                  ║`);
  console.log(`║                                                            ║`);
  console.log(`║   Test dengan cURL:                                        ║`);
  console.log(`║   curl -X POST http://localhost:${PORT}/api/v1/doc_agreement/generate \\`);
  console.log(`║     -H "Content-Type: application/json" \\`);
  console.log(`║     -d '{"nama":"Test","judul":"Sample",...}'             ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} sudah digunakan! Gunakan port lain:`);
    console.error(`   PORT=3334 npm start`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
