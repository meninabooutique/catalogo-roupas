const { del, list } = require('@vercel/blob');

const UPLOAD_SECRET = process.env.UPLOAD_SECRET;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${UPLOAD_SECRET}`) {
    return res.status(401).json({ error: 'Não autorizado.' });
  }

  try {
    const { urls } = req.body || {};

    if (!Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: 'Envie um array de URLs para deletar.' });
    }

    // Extrai o pathname de cada URL do Vercel Blob
    // URL format: https://{store}.public.blob.vercel-storage.com/{pathname}
    const pathnames = urls
      .filter(url => typeof url === 'string' && url.includes('blob.vercel-storage.com'))
      .map(url => {
        const match = url.match(/vercel-storage\.com\/(.+)$/);
        return match ? decodeURIComponent(match[1]) : null;
      })
      .filter(Boolean);

    if (pathnames.length === 0) {
      return res.status(200).json({ deleted: 0, message: 'Nenhuma URL válida para deletar.' });
    }

    // Deleta cada imagem
    const results = await Promise.allSettled(
      pathnames.map(pathname => del(pathname))
    );

    const deleted = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    return res.status(200).json({
      deleted,
      failed,
      total: pathnames.length,
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return res.status(500).json({ error: error.message || 'Falha ao limpar imagens.' });
  }
};
