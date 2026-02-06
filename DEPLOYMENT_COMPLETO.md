# 🚀 Guida Completa al Deployment del Sito Ortofrutta

## 📋 Preparazione File

Ho creato tutti i file necessari per mettere online il sito su diverse piattaforme:

### File Creati:
- ✅ `vercel.json` - Configurazione Vercel
- ✅ `netlify.toml` - Configurazione Netlify  
- ✅ `.github/workflows/deploy.yml` - Deploy automatico GitHub Pages
- ✅ `.gitattributes` - Gestione corretta dei file
- ✅ `copy-volantino.js` - Script per copiare volantino.html nel build
- ✅ `vite.config.js` - Aggiornato per ottimizzare il build

---

## 🌐 Opzioni di Hosting (Gratis)

### Opzione 1: Vercel (CONSIGLIATA ⭐)

**Vantaggi:**
- ✅ Deployment automatico da GitHub
- ✅ HTTPS gratuito
- ✅ CDN globale velocissimo
- ✅ Dominio personalizzato gratuito
- ✅ Preview automatiche per ogni commit

**Passaggi:**

1. **Crea repository GitHub:**
   ```bash
   # Nella cartella del progetto
   git init
   git add .
   git commit -m "Initial commit - Sito Ortofrutta"
   
   # Crea un nuovo repository su github.com e poi:
   git remote add origin https://github.com/TUO-USERNAME/ortofrutta.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy su Vercel:**
   - Vai su [vercel.com](https://vercel.com)
   - Clicca "Sign up" e accedi con GitHub
   - Clicca "New Project"
   - Importa il repository `ortofrutta`
   - Vercel rileverà automaticamente Vue.js
   - Clicca "Deploy"
   - ✅ Fatto! Il sito sarà online in ~1 minuto

3. **URL finale:**
   - Riceverai un URL tipo: `https://ortofrutta.vercel.app`
   - Puoi aggiungere un dominio personalizzato gratis

---

### Opzione 2: Netlify

**Vantaggi:**
- ✅ Deployment automatico
- ✅ HTTPS gratuito
- ✅ Form handling integrato
- ✅ Ottimo per SPA

**Passaggi:**

1. **Crea repository GitHub** (come sopra)

2. **Deploy su Netlify:**
   - Vai su [netlify.com](https://netlify.com)
   - Clicca "Sign up" con GitHub
   - Clicca "Add new site" → "Import an existing project"
   - Seleziona il repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Clicca "Deploy"

3. **URL finale:**
   - Riceverai un URL tipo: `https://ortofrutta.netlify.app`

---

### Opzione 3: GitHub Pages

**Vantaggi:**
- ✅ Totalmente gratuito
- ✅ Integrato con GitHub
- ✅ Deploy automatico configurato

**Passaggi:**

1. **Crea repository GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TUO-USERNAME/ortofrutta.git
   git branch -M main
   git push -u origin main
   ```

2. **Abilita GitHub Pages:**
   - Vai su GitHub repository → Settings → Pages
   - Source: "GitHub Actions"
   - Il workflow è già configurato in `.github/workflows/deploy.yml`
   - Al prossimo push, il sito verrà deployato automaticamente

3. **Aggiorna vite.config.js:**
   - Se il repository si chiama "ortofrutta", modifica:
   ```javascript
   base: '/ortofrutta/'
   ```

4. **URL finale:**
   - `https://TUO-USERNAME.github.io/ortofrutta/`

---

## 🔧 Build Locale (per Test)

Prima di pubblicare, testa il build in locale:

```bash
# Build del progetto
npm run build

# Preview del build
npm run preview
```

Il sito sarà disponibile su `http://localhost:4173`

---

## 📝 Checklist Pre-Deployment

Prima di mettere online il sito, verifica:

- [ ] Tutte le immagini sono nella cartella `public/`
- [ ] Il file `volantino.html` è in `src/stores/`
- [ ] I link interni funzionano correttamente
- [ ] Il sito funziona in modalità build (`npm run preview`)
- [ ] Non ci sono errori nella console del browser
- [ ] Il sito è responsive (testa su mobile)
- [ ] I dati di contatto sono corretti (telefono, email, indirizzi)

---

## 🎯 Procedura Raccomandata (Passo-Passo)

### Step 1: Risolvi il problema del server locale

Prima di tutto, dobbiamo far funzionare `npm run dev`. Prova:

```powershell
# Opzione A: Esegui come Amministratore
# Apri PowerShell come Amministratore e poi:
cd "C:\Users\siott\OneDrive\Desktop\nuovo sito ortofrutta"
npm run dev

# Opzione B: Pulisci e reinstalla (se A non funziona)
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

### Step 2: Testa il build locale

```bash
npm run build
npm run preview
```

Apri `http://localhost:4173` e verifica che tutto funzioni.

### Step 3: Crea repository GitHub

```bash
# Se non hai già inizializzato git
git init

# Aggiungi tutti i file
git add .

# Primo commit
git commit -m "Sito Ortofrutta - Prima versione"

# Crea repository su github.com e poi:
git remote add origin https://github.com/TUO-USERNAME/ortofrutta.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy su Vercel (FACILE!)

1. Vai su [vercel.com](https://vercel.com)
2. Sign up con GitHub
3. Click "New Project"
4. Importa `ortofrutta`
5. Click "Deploy"
6. ✅ FATTO! Sito online in 1 minuto

---

## 🔄 Aggiornamenti Futuri

Dopo il primo deploy, per aggiornare il sito:

```bash
# Fai le tue modifiche, poi:
git add .
git commit -m "Descrizione modifiche"
git push

# Vercel/Netlify/GitHub Pages ribuilderanno automaticamente!
```

---

## 🌍 Dominio Personalizzato (Opzionale)

### Su Vercel:
1. Vai su Project Settings → Domains
2. Aggiungi il tuo dominio (es. `ortofrutta-ravanelli.it`)
3. Segui le istruzioni per configurare i DNS

### Su Netlify:
1. Vai su Domain Settings
2. Add custom domain
3. Configura i DNS come indicato

**Nota:** Un dominio `.it` costa circa 10-20€/anno (es. su Aruba, Register.it)

---

## 📊 Performance e SEO

Il sito è già ottimizzato con:
- ✅ Lazy loading immagini
- ✅ Code splitting automatico
- ✅ Compressione asset
- ✅ Meta tags SEO
- ✅ Sitemap generata automaticamente

### Per migliorare ulteriormente:

1. **Comprimi le immagini:**
   - Usa [TinyPNG](https://tinypng.com) o [Squoosh](https://squoosh.app)
   - Riduci dimensioni immagini prodotti a max 800x800px

2. **Aggiungi Google Analytics:**
   - Crea account su [analytics.google.com](https://analytics.google.com)
   - Aggiungi tracking code in `index.html`

3. **Test performance:**
   - [PageSpeed Insights](https://pagespeed.web.dev)
   - [GTmetrix](https://gtmetrix.com)

---

## 🆘 Troubleshooting

### Problema: "Build failed"
```bash
# Soluzione:
npm run build --verbose
# Leggi gli errori e correggili
```

### Problema: "404 su route Vue"
- ✅ Già risolto con `vercel.json` e `netlify.toml`
- Le SPA Vue richiedono rewrite delle route

### Problema: "Volantino.html non trovato"
- ✅ Già risolto con `copy-volantino.js`
- Il file viene copiato automaticamente durante il build

### Problema: "Immagini non si caricano"
- Verifica che siano in `public/images/`
- Controlla i percorsi nei componenti Vue

---

## 📞 Supporto

Se hai problemi durante il deployment:

1. **Controlla i log di build** su Vercel/Netlify
2. **Verifica la console del browser** (F12) per errori JavaScript
3. **Testa in locale** con `npm run build && npm run preview`
4. **Chiedi aiuto** con screenshot degli errori

---

## ✅ Checklist Finale

Quando il sito è online:

- [ ] Testa tutte le pagine (Home, Categorie, Listino, Chi Siamo, etc.)
- [ ] Verifica il pannello admin funzioni
- [ ] Controlla che il volantino si apra correttamente
- [ ] Testa su mobile (Chrome DevTools → Device Mode)
- [ ] Verifica i dati di contatto (telefono, WhatsApp)
- [ ] Condividi il link e chiedi feedback!

---

## 🎉 Congratulazioni!

Una volta completati questi passaggi, il tuo sito sarà:
- ✅ Online e accessibile 24/7
- ✅ Veloce e ottimizzato
- ✅ Con HTTPS sicuro
- ✅ Aggiornabile facilmente con git push

**URL suggeriti per condividere:**
- WhatsApp Business
- Facebook
- Instagram
- Google My Business
- Biglietti da visita con QR Code

---

**Data:** 29 Gennaio 2026  
**Versione:** 1.0.0  
**Pronto per il deployment:** ✅ SÌ!
