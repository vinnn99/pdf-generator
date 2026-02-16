/*
  Example Adonis controller (JS) that uses the module services.
  Place this file under your Adonis project: app/Controllers/Http/PdfController.js
  Example usage in Adonis route: Route.post('/generate-pdf', 'PdfController.generate')
*/

const pdfService = require('../../../src/pdfService').default;
const cdnService = require('../../../src/cdnService');

class PdfController {
  async generate({ request, response }) {
    try {
      // Expect JSON: { template: '...', data: {...}, signatureBase64: '...', headerImageBase64: '...' }
      const { data, signatureBase64, headerImageBase64 } = request.post();

      // generate buffer
      const buffer = await pdfService.generatePdfBuffer(data, signatureBase64, headerImageBase64);

      // upload to CDN
      const url = await cdnService.uploadBufferToCdn(buffer, `document-${Date.now()}.pdf`);

      // Optionally save to DB using Lucid here

      return response.status(200).send({ url });
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }
}

module.exports = new PdfController();
