import axios from 'axios';
import FormData from 'form-data';

export async function uploadBufferToCdn(buffer, filename = 'document.pdf') {
  const cdnUrl = process.env.VITE_CDN_URL;
  const cdnKey = process.env.CDN_API_KEY;

  if (!cdnUrl) throw new Error('VITE_CDN_URL is not configured in environment');

  const form = new FormData();
  form.append('file', buffer, { filename, contentType: 'application/pdf' });

  const headers = form.getHeaders();
  if (cdnKey) headers['Authorization'] = `Bearer ${cdnKey}`;

  const response = await axios.post(cdnUrl, form, { headers });

  if (response && response.data) {
    // assume response.data.url contains the uploaded file URL
    if (response.data.url) return response.data.url;
    if (response.data.data && response.data.data.url) return response.data.data.url;
  }

  throw new Error('Unexpected CDN response: ' + JSON.stringify(response.data));
}

export default { uploadBufferToCdn };
