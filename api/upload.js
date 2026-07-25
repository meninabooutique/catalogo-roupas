const { put, del } = require('@vercel/blob');

// Token secreto para proteger o endpoint de uploads não autorizados
const UPLOAD_SECRET = process.env.UPLOAD_SECRET;

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  // Validação do token secreto
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${UPLOAD_SECRET}`) {
    return res.status(401).json({ error: 'Não autorizado. Token de upload inválido.' });
  }

  try {
    const { dataUrl } = req.body || {};

    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'Dados da imagem não enviados. Envie o campo "dataUrl" com o conteúdo em base64.' });
    }

    // Parse the data URL: data:image/jpeg;base64,/9j/4AAQ...
    const match = dataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({ error: 'Formato de imagem inválido. Esperado: data:image/...;base64,...' });
    }

    const mimeType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Determine file extension from MIME type
    const ext = mimeType === 'image/png' ? 'png'
              : mimeType === 'image/webp' ? 'webp'
              : 'jpg';

    // Generate unique key
    const key = `produtos/${Date.now()}_${Math.random().toString(36).slice(2, 9)}.${ext}`;

    const blob = await put(key, buffer, {
      access: 'public',
      contentType: mimeType,
    });

    return res.status(200).json({ url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);

    // Friendly message if the Blob Store isn't configured yet
    if (
      error.message &&
      (error.message.includes('BLOB_READ_WRITE_TOKEN') ||
       error.message.includes('token') ||
       error.message.includes('store'))
    ) {
      return res.status(500).json({
        error: 'Upload não configurado. Solicite ao administrador configurar o Vercel Blob (BLOB_READ_WRITE_TOKEN).'
      });
    }

    return res.status(500).json({ error: error.message || 'Falha ao processar upload da imagem.' });
  }
};
