# 🚀 Guida al Deployment - Sito Ortofrutta

Questa guida fornisce istruzioni dettagliate per il deployment del sito su diverse piattaforme.

---

## 📋 Pre-Deployment Checklist

Prima di effettuare il deploy, assicurati di:

- [ ] Testare il sito in locale (`npm run dev`)
- [ ] Verificare la build di produzione (`npm run build`)
- [ ] Testare la preview (`npm run preview`)
- [ ] Verificare che tutte le immagini siano caricate
- [ ] Controllare che non ci siano errori nella console
- [ ] Verificare la responsività su diversi dispositivi
- [ ] Aggiornare le informazioni di contatto
- [ ] Personalizzare i contenuti (testi, prodotti)
- [ ] Configurare le variabili d'ambiente

---

## 🌐 Opzioni di Hosting

### 1️⃣ Netlify (Consigliato - Gratuito)

#### Via Interfaccia Web

1. **Crea account** su [netlify.com](https://netlify.com)
2. **Connetti repository** GitHub/GitLab
3. **Configura build:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 o superiore
4. **Deploy automatico** ad ogni push

#### Via Netlify CLI

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Build del progetto
npm run build

# Deploy
netlify deploy --prod
```

#### File di Configurazione

Crea `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

### 2️⃣ Vercel (Consigliato - Gratuito)

#### Via Interfaccia Web

1. **Crea account** su [vercel.com](https://vercel.com)
2. **Import progetto** da GitHub
3. **Framework preset:** Vite
4. **Deploy automatico**

#### Via Vercel CLI

```bash
# Installa Vercel CLI
npm install -g vercel

# Build
npm run build

# Deploy
vercel --prod
```

#### File di Configurazione

Crea `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### 3️⃣ GitHub Pages (Gratuito)

#### Configurazione

1. **Modifica `vite.config.js`:**

```javascript
export default defineConfig({
  plugins: [vue()],
  base: '/nome-repository/',  // Aggiungi questa riga
  // ... resto config
})
```

2. **Crea workflow GitHub Actions**

File `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. **Abilita GitHub Pages** nelle impostazioni del repository

---

### 4️⃣ Hosting Tradizionale (cPanel, FTP)

#### Build Locale

```bash
npm run build
```

#### Upload FTP

1. Carica tutti i file dalla cartella `dist/` sul server
2. Puntali alla root del dominio o una sottocartella

#### Configurazione Apache

Crea `.htaccess` nella root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Abilita compressione GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache browser
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

#### Configurazione Nginx

```nginx
server {
  listen 80;
  server_name tuodominio.it;
  root /path/to/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache statica
  location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Compressione GZIP
  gzip on;
  gzip_types text/css application/javascript image/svg+xml;
  gzip_comp_level 6;
}
```

---

### 5️⃣ Cloudflare Pages (Gratuito)

1. **Connetti repository** su Cloudflare Pages
2. **Configura build:**
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Deploy automatico**

---

### 6️⃣ AWS S3 + CloudFront

#### Setup S3

```bash
# Build
npm run build

# Installa AWS CLI
# Carica su S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Configura bucket per website hosting
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html
```

#### CloudFront per CDN

1. Crea distribuzione CloudFront
2. Origine: bucket S3
3. Comportamento: redirect errori a `/index.html`

---

## 🔧 Ottimizzazioni Pre-Deploy

### Compressione Immagini

```bash
# Installa imagemin
npm install -g imagemin-cli imagemin-webp

# Converti immagini in WebP
imagemin public/images/*.jpg --out-dir=public/images --plugin=webp
```

### Analisi Bundle

```bash
# Installa analyzer
npm install -D rollup-plugin-visualizer

# Aggiungi a vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({ open: true })
  ]
})

# Build e visualizza
npm run build
```

### Minificazione

Vite minifica automaticamente in produzione, ma puoi personalizzare:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Rimuovi console.log
        drop_debugger: true
      }
    }
  }
})
```

---

## 🔒 Sicurezza

### Headers di Sicurezza

Aggiungi in `.htaccess` (Apache) o configurazione server:

```apache
# Previeni clickjacking
Header always append X-Frame-Options SAMEORIGIN

# XSS Protection
Header set X-XSS-Protection "1; mode=block"

# Previeni MIME type sniffing
Header set X-Content-Type-Options nosniff

# Referrer policy
Header set Referrer-Policy "strict-origin-when-cross-origin"
```

### HTTPS

- Usa **Let's Encrypt** per certificati SSL gratuiti
- La maggior parte degli hosting moderni (Netlify, Vercel) fornisce HTTPS automatico

---

## 📊 Analytics e Monitoraggio

### Google Analytics

```javascript
// src/main.js
import VueGtag from 'vue-gtag'

app.use(VueGtag, {
  config: { 
    id: 'G-XXXXXXXXXX',
    params: {
      send_page_view: true
    }
  }
}, router)
```

### Google Search Console

1. Verifica proprietà del sito
2. Invia sitemap: `https://tuosito.it/sitemap.xml`

### Sentry (Error Tracking)

```bash
npm install @sentry/vue
```

```javascript
// src/main.js
import * as Sentry from '@sentry/vue'

Sentry.init({
  app,
  dsn: 'YOUR_SENTRY_DSN',
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router)
    })
  ]
})
```

---

## 🎯 SEO

### Meta Tags

Aggiorna `index.html`:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Base -->
  <title>Ortofrutta - Prodotti Freschi di Qualità | Roma</title>
  <meta name="description" content="Rivendita ortofrutticola a Roma. Frutta e verdura fresca, prodotti biologici e specialità dal 1985. Qualità garantita." />
  <meta name="keywords" content="ortofrutta, frutta fresca, verdura, bio, Roma" />
  
  <!-- Open Graph (Facebook) -->
  <meta property="og:title" content="Ortofrutta - Prodotti Freschi di Qualità" />
  <meta property="og:description" content="La tua rivendita di fiducia dal 1985" />
  <meta property="og:image" content="/og-image.jpg" />
  <meta property="og:url" content="https://tuosito.it" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Ortofrutta - Prodotti Freschi" />
  <meta name="twitter:description" content="La tua rivendita di fiducia dal 1985" />
  <meta name="twitter:image" content="/og-image.jpg" />
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>
```

### Sitemap

Crea `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tuosito.it/</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://tuosito.it/categorie</loc>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://tuosito.it/listino</loc>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
  <!-- Aggiungi altre pagine -->
</urlset>
```

### robots.txt

Crea `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://tuosito.it/sitemap.xml
```

---

## 🐛 Troubleshooting

### Errore 404 su route dirette

**Causa:** Server non configurato per SPA  
**Soluzione:** Configura rewrites (vedi sezioni Apache/Nginx)

### Immagini non caricate

**Causa:** Percorsi relativi errati  
**Soluzione:** Usa percorsi assoluti da `/public` (es: `/images/foto.jpg`)

### Build fallisce

**Causa:** Errori nel codice o dipendenze  
**Soluzione:** 
```bash
# Pulisci cache
rm -rf node_modules dist
npm install
npm run build
```

### Bianco dopo deploy

**Causa:** Base URL errato (GitHub Pages)  
**Soluzione:** Verifica `base` in `vite.config.js`

---

## 📞 Checklist Post-Deploy

- [ ] Sito accessibile all'URL corretto
- [ ] Tutte le route funzionanti
- [ ] Immagini caricate correttamente
- [ ] Responsive su mobile
- [ ] Performance (Lighthouse > 90)
- [ ] HTTPS attivo
- [ ] Meta tags corretti
- [ ] Analytics configurato
- [ ] Form di contatto funzionante
- [ ] Backup configurato

---

## 🎉 Conclusione

Il tuo sito è ora online! 

**Risorse utili:**
- [Vue 3 Docs](https://vuejs.org/)
- [Vite Docs](https://vitejs.dev/)
- [Web.dev Performance](https://web.dev/measure/)

Per assistenza, consulta la GUIDE.md o la documentazione ufficiale delle piattaforme.

Buon deploy! 🚀
