# Catálogo de Roupas - Menina Boutique

Site de catálogo de produtos com painel administrativo, integração com Firebase Firestore e Vercel Blob para armazenamento de imagens.

##  Deploy na Vercel

### Variáveis de Ambiente Necessárias

Antes de deployar, configure estas variáveis no painel da Vercel (**Settings → Environment Variables**):

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `BLOB_READ_WRITE_TOKEN` | (automático) | Criado automaticamente ao conectar o Blob Store |
| `BLOB_STORE_ID` | (automático) | Criado automaticamente ao conectar o Blob Store |
| `BLOB_WEBHOOK_PUBLIC_KEY` | (automático) | Criado automaticamente ao conectar o Blob Store |
| `UPLOAD_SECRET` | `mb-upload-2026-secret-key` | Token secreto para proteger o endpoint de upload |

### Setup do Vercel Blob

1. No painel da Vercel, vá em **Storage**
2. Clique em **Create Database** → **Blob**
3. Nome: `menina-boutique-blob`
4. Região: **São Paulo, Brazil (East) – gru1**
5. Access: **Public**
6. Marque: **Add a read-write token env var**
7. Clique em **Create**

As 3 variáveis `BLOB_*` serão criadas automaticamente. Adicione manualmente a variável `UPLOAD_SECRET`.

### Deploy

```bash
git push origin main
```

A Vercel detecta o push e faz o deploy automaticamente.

---

## 🔐 Segurança

- Painel admin protegido por senha (hardcoded no `admin.html`)
- Endpoint `/api/upload` protegido por token `UPLOAD_SECRET`
- Endpoint `/api/cleanup` protegido pelo mesmo token
- Firebase Firestore com regras de segurança configuradas separadamente

---

## 📝 Funcionalidades

### Catálogo (`index.html`)
- Listagem de produtos com filtros e busca
- Galeria de imagens com zoom e swipe
- Seleção de variações (tamanho/cor)
- Carrinho de compras
- Envio de pedido via WhatsApp com mensagem formatada
- Confirmação de pedido e opção de empréstimo

### Admin (`admin.html`)
- Cadastro de produtos com variações
- Upload de imagens via Vercel Blob
- Drag & drop de fotos
- Edição e duplicação de produtos
- Estatísticas de estoque
- Busca e filtros

---

## 🛠️ Stack

- **Frontend:** HTML, CSS, JavaScript vanilla
- **Database:** Firebase Firestore
- **Storage:** Vercel Blob
- **Deploy:** Vercel (serverless functions)
teste apenas
