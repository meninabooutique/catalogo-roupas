# Aryelli Moda Fitness - Catálogo (Vercel Blob Only)

**Tudo que você precisa em um só lugar!**

Instagram: [@aryellimodafitness](https://instagram.com/aryellimodafitness)
WhatsApp: +55 38 99152-8709

Catálogo online 100% Vercel - **SEM Firebase**. Produtos e imagens ficam no Vercel Blob Storage.

## Cores
- Vermelho principal: #E30613
- Branco: #FFFFFF
- Fundo claro: #f8f8f8

## Arquitetura atual (sem Firebase)

- `index.html` - Catálogo público - busca produtos via `GET /api/produtos`
- `admin.html` - Painel admin - cria/edita/deleta via `POST /api/produtos` e `DELETE /api/produtos?id=`
- `api/produtos.js` - API que lê/escreve `produtos.json` no Vercel Blob
- `api/upload.js` - Upload de imagens para Vercel Blob
- `api/cleanup.js` - Deleta imagens do Blob quando produto é apagado
- `assets/logo.png` - Logo oficial (coloque a imagem com círculo vermelho A)

## Como rodar local
```bash
npm install -g vercel
vercel dev
# precisa de .env com BLOB_READ_WRITE_TOKEN e UPLOAD_SECRET
```

## Como copiar para outra conta do GitHub (SEM terminal)

1. Baixe o ZIP deste repo no GitHub: Code > Download ZIP
2. Descompacte e coloque sua logo oficial como `assets/logo.png`
3. Na outra conta: github.com/new > cria repo vazio `catalogo-aryelli-moda-fitness`
4. No repo novo: "uploading an existing file" > arrasta todos os arquivos > Commit

## Configurar Vercel (outra conta)

1. vercel.com/new > Importa o repo `catalogo-aryelli-moda-fitness`
2. Deploy (primeiro deploy vai sem produtos)
3. Storage > Create > Blob Store > Create
4. Settings > Environment Variables:
   - `BLOB_READ_WRITE_TOKEN` - já vem preenchido quando cria Blob
   - `UPLOAD_SECRET` = `aryelli-upload-2026-secret-key`
5. Deployments > ... > Redeploy

Pronto! Acesse `/admin.html` (senha: 59827630) e cadastre produtos. Eles vão para `produtos.json` no Blob.

## WhatsApp
+55 38 99152-8709 - já configurado em todos os botões.

## Migração do antigo (Firebase)
O código antigo usava Firebase Firestore para produtos. Agora foi removido.
Se ainda tem produtos no Firebase antigo, exporte e importe manualmente via admin.
