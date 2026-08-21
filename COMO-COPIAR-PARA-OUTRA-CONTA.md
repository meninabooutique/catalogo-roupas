# Como copiar este projeto para outra conta do GitHub

Você já está com o projeto transformado para **Aryelli Moda Fitness** (branco e vermelho, WhatsApp 38 99152-8709).

Agora para levar para a outra conta:

## Opção 1: Pelo GitHub (mais fácil, sem terminal)

1. Logue na **outra conta** do GitHub
2. Vá em https://github.com/new
3. Nome do repositório: `catalogo-aryelli-moda-fitness` (ou outro)
4. Deixe **vazio**, sem README, sem .gitignore
5. Crie
6. Na página do repo novo, clique em `uploading an existing file` ou copie a URL do repo: `https://github.com/SUA-OUTRA-CONTA/catalogo-aryelli-moda-fitness.git`

7. No seu computador, na pasta deste projeto:
```bash
git remote -v
# vai mostrar origin = meninabooutique/catalogo-roupas

git remote rename origin old-origin
git remote add origin https://github.com/SUA-OUTRA-CONTA/catalogo-aryelli-moda-fitness.git

git add .
git commit -m "Aryelli Moda Fitness - versão inicial branco e vermelho"
git push -u origin main
# Se sua branch atual for arena/... use:
# git push -u origin HEAD:main
```

## Opção 2: Copiar pasta limpa (sem histórico)

Se quiser começar do zero, sem levar histórico da Menina Boutique:

```bash
# fora da pasta atual
mkdir catalogo-aryelli-moda-fitness
cp -r catalogo-roupas/index.html catalogo-roupas/admin.html catalogo-roupas/api catalogo-roupas/assets catalogo-roupas/package.json catalogo-roupas/vercel.json catalogo-roupas/.gitignore catalogo-aryelli-moda-fitness/

cd catalogo-aryelli-moda-fitness
# COLOQUE SUA LOGO OFICIAL AQUI como assets/logo.png

git init
git add .
git commit -m "Aryelli Moda Fitness - inicial"
git remote add origin https://github.com/SUA-OUTRA-CONTA/catalogo-aryelli-moda-fitness.git
git branch -M main
git push -u origin main
```

## Depois do push, configure:

### 1. Firebase novo (importante - loja independente)
- https://console.firebase.google.com > Add project > nome: aryelli-moda-fitness
- Firestore Database > Create > Start in test mode
- Project Settings > Your apps > Web app > copie o firebaseConfig
- Substitua em `index.html` e `admin.html`

### 2. Vercel
- https://vercel.com/new > Importe o repo `catalogo-aryelli-moda-fitness`
- Storage > Create Blob Store
- Settings > Environment Variables:
  - `BLOB_READ_WRITE_TOKEN` (auto)
  - `UPLOAD_SECRET` = `aryelli-upload-2026-secret-key`
- Deploy

### 3. Logo
- Substitua `assets/logo.png` pela sua imagem oficial (a que você anexou)
- Commit + push de novo, Vercel redeploya automaticamente

### 4. Teste
- Abra o site
- Teste adicionar produto no /admin.html (senha: 59827630)
- Teste carrinho > Finalizar pedido > deve abrir WhatsApp 5538991528709

## O que já foi alterado nesta cópia:

✅ Nome: Menina Boutique → Aryelli Moda Fitness
✅ Título das páginas
✅ Cores: preto/dourado → branco/vermelho (#E30613)
✅ WhatsApp: 5538991240933 → 5538991528709 (em todos os lugares)
✅ Package.json name
✅ LocalStorage key: carrinhoMeninaBoutique → carrinhoAryelliModaFitness
✅ Admin session key: mb_admin_ok → aryelli_admin_ok
✅ UPLOAD_SECRET: mb-upload... → aryelli-upload...
✅ README com instruções
✅ Comentários TODO para trocar Firebase

Falta só você colocar a logo.png oficial.

Qualquer dúvida me chama!
