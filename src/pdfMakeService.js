// Server-side pdfMake PDF generator service (ESM)
import pdfMake from 'pdfmake/build/pdfmake.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define font paths (TTF)
const fontsDir = path.join(__dirname, '../fonts');
const fontDefinitions = {
  'Roboto': {
    normal: 'Roboto_Condensed-Regular.ttf',
    bold: 'Roboto_Condensed-Bold.ttf',
    italics: 'Roboto_Condensed-Italic.ttf',
    bolditalics: 'Roboto_Condensed-BoldItalic.ttf'
  }
};

// Load and configure TTF fonts as buffers
function configureCustomFonts() {
  const fonts = {};
  
  Object.entries(fontDefinitions).forEach(([fontFamily, fontFiles]) => {
    fonts[fontFamily] = {};
    
    Object.entries(fontFiles).forEach(([style, fileName]) => {
      const filePath = path.join(fontsDir, fileName);
      
      if (fs.existsSync(filePath)) {
        fonts[fontFamily][style] = fs.readFileSync(filePath);
      } else {
        console.warn(`[TTF Font] Not found: ${filePath}`);
      }
    });
  });
  
  pdfMake.fonts = fonts;
}

// Configure fonts on module load
configureCustomFonts();

async function generatePdfBufferPdfMake(formData = {}, signatureBase64 = '', imageHeaderBase64 = '') {
  let docDefinition = null;
  
  // Capture docDefinition from template
  let captured = null;
  const fakePdfMake = {
    createPdf: (dd) => {
      captured = dd;
      return {
        getBuffer(cb) { cb(Buffer.from('')); },
        getBlob(cb) { cb(null); },
      };
    },
  };

  // Import dan jalankan template
  try {
    const templateModule = await import('./templates/pdfGenerator.js');
    const generateFn = templateModule.generatePdfBlob;
    
    if (typeof generateFn === 'function') {
      // Pass hanya non-null images
      const signatureArg = signatureBase64 ? `data:image/png;base64,${signatureBase64}` : null;
      const headerArg = imageHeaderBase64 ? `data:image/png;base64,${imageHeaderBase64}` : null;
      
      await generateFn(fakePdfMake, formData, signatureArg, headerArg).catch(e => {
        console.log('[Template] Capture warning:', e.message);
      });
    }
  } catch (err) {
    console.log('[Template] Import error:', err.message);
  }

  docDefinition = captured;

  if (!docDefinition) {
    throw new Error('Failed to obtain docDefinition from template');
  }

  // Sanitize docDefinition - remove undefined values but preserve structure
  function sanitizeValue(val) {
    if (val === null || val === undefined) return undefined;
    if (typeof val === 'string') return val;
    if (typeof val === 'number' || typeof val === 'boolean') return val;
    if (Array.isArray(val)) {
      return val.map(v => sanitizeValue(v)).filter(v => v !== undefined);
    }
    if (typeof val === 'object') {
      const result = {};
      for (const [k, v] of Object.entries(val)) {
        const clean = sanitizeValue(v);
        if (clean !== undefined) {
          result[k] = clean;
        }
      }
      return Object.keys(result).length > 0 ? result : undefined;
    }
    return undefined;
  }

  docDefinition = sanitizeValue(docDefinition);

  // Ensure fonts configured
  configureCustomFonts();

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  // first generation
  const firstBuffer = await new Promise((resolve, reject) => {
    try {
      pdfDocGenerator.getBuffer((buffer) => {
        const out = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
        resolve(out);
      });
    } catch (err) {
      reject(err);
    }
  });

  // quick page-count heuristic: count occurrences of '/Type /Page'
  const pdfText = firstBuffer.toString('latin1');
  const matches = pdfText.match(/\/Type\s*\/Page/g) || [];
  const pageCount = matches.length;

  if (pageCount >= 10) return firstBuffer;

  // append blank pages to reach exactly 10 pages
  const needed = 10 - pageCount;
  for (let i = 0; i < needed - 1; i++) {
    docDefinition.content.push({ text: '', pageBreak: 'after' });
  }
  // final blank page without pageBreak after
  docDefinition.content.push({ text: '' });

  const finalPdf = pdfMake.createPdf(docDefinition);
  const finalBuffer = await new Promise((resolve, reject) => {
    try {
      finalPdf.getBuffer((buffer) => {
        const out = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
        resolve(out);
      });
    } catch (err) {
      reject(err);
    }
  });

  return finalBuffer;
}

export { generatePdfBufferPdfMake };
