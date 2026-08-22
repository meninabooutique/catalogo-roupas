const { put, list } = require('@vercel/blob');

const UPLOAD_SECRET = process.env.UPLOAD_SECRET;
const PRODUTOS_KEY = 'produtos.json';

async function getProdutosBlob() {
  try {
    const { blobs } = await list({ prefix: PRODUTOS_KEY });
    const found = blobs.find(b => b.pathname === PRODUTOS_KEY || b.pathname.endsWith('/' + PRODUTOS_KEY) || b.url.includes(PRODUTOS_KEY));
    return found || null;
  } catch (e) {
    console.warn('list blob error', e);
    return null;
  }
}

async function lerProdutos() {
  const blob = await getProdutosBlob();
  if (!blob) return [];
  try {
    const resp = await fetch(blob.url, { cache: 'no-store' });
    if (!resp.ok) return [];
    const data = await resp.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('lerProdutos error', e);
    return [];
  }
}

async function salvarProdutos(lista) {
  const json = JSON.stringify(lista, null, 2);
  const blob = await put(PRODUTOS_KEY, json, {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return blob;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET - público, lista produtos
  if (req.method === 'GET') {
    try {
      const produtos = await lerProdutos();
      return res.status(200).json(produtos);
    } catch (error) {
      console.error('GET produtos error', error);
      return res.status(500).json({ error: error.message || 'Falha ao ler produtos' });
    }
  }

  // POST e DELETE precisam de autenticação
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${UPLOAD_SECRET}`) {
    return res.status(401).json({ error: 'Não autorizado. Token inválido.' });
  }

  // POST - criar ou atualizar
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      // body pode ser { id, nome, categoria, ... } ou { produto: {...} }
      const incoming = body.produto || body;

      if (!incoming || !incoming.nome) {
        return res.status(400).json({ error: 'Dados do produto inválidos. Envie ao menos nome.' });
      }

      let produtos = await lerProdutos();

      if (incoming.id) {
        // Atualizar existente
        const idx = produtos.findIndex(p => p.id === incoming.id);
        if (idx >= 0) {
          produtos[idx] = {
            ...produtos[idx],
            ...incoming,
            id: incoming.id,
            atualizadoEm: new Date().toISOString(),
          };
        } else {
          // Se id não encontrado, cria novo com esse id
          produtos.push({
            ...incoming,
            id: incoming.id,
            criadoEm: incoming.criadoEm || new Date().toISOString(),
            atualizadoEm: new Date().toISOString(),
          });
        }
      } else {
        // Criar novo
        const novoId = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        produtos.push({
          ...incoming,
          id: novoId,
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
        });
      }

      await salvarProdutos(produtos);
      return res.status(200).json({ ok: true, produtos });
    } catch (error) {
      console.error('POST produtos error', error);
      return res.status(500).json({ error: error.message || 'Falha ao salvar produto' });
    }
  }

  // DELETE - ?id=xxx
  if (req.method === 'DELETE') {
    try {
      const id = req.query.id || (req.body && req.body.id);
      if (!id) return res.status(400).json({ error: 'ID do produto não informado' });

      let produtos = await lerProdutos();
      const antes = produtos.length;
      produtos = produtos.filter(p => p.id !== id);

      if (produtos.length === antes) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      await salvarProdutos(produtos);
      return res.status(200).json({ ok: true, deleted: id });
    } catch (error) {
      console.error('DELETE produtos error', error);
      return res.status(500).json({ error: error.message || 'Falha ao deletar produto' });
    }
  }

  res.setHeader('Allow', 'GET, POST, DELETE, OPTIONS');
  return res.status(405).json({ error: 'Método não permitido' });
};
