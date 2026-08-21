# Aryelli Moda Fitness - Catálogo

**Tudo que você precisa em um só lugar!**

Instagram: [@aryellimodafitness](https://instagram.com/aryellimodafitness)
WhatsApp: +55 38 99152-8709

Catálogo online de moda fitness - cópia adaptada do projeto Menina Boutique, com identidade visual branco e vermelho.

## Cores
- Vermelho principal: #E30613
- Branco: #FFFFFF
- Fundo claro: #f8f8f8

## Como copiar para outra conta do GitHub

### 1. Criar repositório novo na outra conta
- Vá em github.com logado na outra conta
- New repository > Nome: `catalogo-aryelli-moda-fitness`
- Deixe vazio (sem README)

### 2. Enviar este código para lá
```bash
# na pasta do projeto
git remote rename origin old-origin
git remote add origin https://github.com/SUA-NOVA-CONTA/catalogo-aryelli-moda-fitness.git
git push -u origin main
# ou se estiver na branch arena:
git push -u origin arena/01a02676-catalogo-roupas:main
```

### 3. Configurar Firebase novo (recomendado)
1. Crie um projeto em https://console.firebase.google.com
2. Ative Firestore
3. Copie as credenciais e substitua em `index.html` e `admin.html` na const `firebaseConfig`
4. Regras do Firestore (para teste):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /produtos/{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

### 4. Configurar Vercel + Blob
1. Importe o novo repo na Vercel
2. Crie um Blob Store na Vercel
3. Adicione as Env Vars:
   - `BLOB_READ_WRITE_TOKEN` (gerado automaticamente)
   - `UPLOAD_SECRET` = `aryelli-upload-2026-secret-key` (ou outro seguro)
4. Atualize o `UPLOAD_SECRET` em `api/upload.js`, `api/cleanup.js`, `admin.html`

### 5. Logo
- Substitua `assets/logo.png` pela logo oficial que você tem (a imagem com o círculo vermelho e letra A)
- O arquivo deve se chamar exatamente `logo.png`

## Estrutura
- `index.html` - Catálogo público
- `admin.html` - Painel admin (senha padrão: 59827630 - troque!)
- `api/upload.js` - Upload de imagens para Vercel Blob
- `api/cleanup.js` - Limpeza de imagens
- `assets/logo.png` - Logo (você vai colocar a oficial)

## WhatsApp configurado
+55 38 99152-8709

Todos os botões de "Tenho interesse" e "Finalizar pedido" já enviam para esse número.
