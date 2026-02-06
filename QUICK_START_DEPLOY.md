# ⚡ Quick Start - Metti Online il Sito in 5 Minuti

## 🎯 Opzione Più Veloce: Vercel

### 1️⃣ Crea Account GitHub (se non ce l'hai)
- Vai su [github.com](https://github.com)
- Clicca "Sign up"
- Completa la registrazione (GRATIS)

### 2️⃣ Carica il Progetto su GitHub

**Opzione A - Da Terminale (Raccomandato):**

```bash
# Apri PowerShell nella cartella del progetto
cd "C:\Users\siott\OneDrive\Desktop\nuovo sito ortofrutta"

# Inizializza git (se non già fatto)
git init

# Aggiungi tutti i file
git add .

# Primo commit
git commit -m "Sito Ortofrutta - Ready for deployment"

# Vai su github.com e crea un nuovo repository chiamato "ortofrutta"
# Poi esegui questi comandi (sostituisci TUO-USERNAME):

git remote add origin https://github.com/TUO-USERNAME/ortofrutta.git
git branch -M main
git push -u origin main
```

**Opzione B - Da GitHub Desktop (Più Facile):**

1. Scarica e installa [GitHub Desktop](https://desktop.github.com)
2. Apri GitHub Desktop
3. File → Add Local Repository
4. Seleziona la cartella del progetto
5. Clicca "Publish repository"
6. Scegli il nome "ortofrutta" e clicca "Publish"

### 3️⃣ Deploy su Vercel (2 Minuti!)

1. **Vai su [vercel.com](https://vercel.com)**

2. **Clicca "Sign Up" e scegli "Continue with GitHub"**
   - Autorizza Vercel ad accedere al tuo GitHub

3. **Clicca "New Project"**

4. **Importa il repository "ortofrutta"**
   - Cerca "ortofrutta" nella lista
   - Clicca "Import"

5. **Configura il progetto:**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
   (Vercel dovrebbe rilevare tutto automaticamente)

6. **Clicca "Deploy"**

7. **✅ FATTO!** In 1-2 minuti il sito sarà online!

### 4️⃣ Ottieni il Link

Vercel ti darà un URL tipo:
```
https://ortofrutta-ravanelli.vercel.app
```

Puoi condividerlo subito!

---

## 🔄 Aggiornare il Sito (Dopo Modifiche)

Semplicissimo! Ogni volta che fai modifiche:

```bash
# Salva le modifiche
git add .
git commit -m "Descrizione modifiche"
git push

# Vercel ribuilderà automaticamente il sito!
# In 1-2 minuti le modifiche saranno online
```

---

## 🌐 Dominio Personalizzato (Opzionale)

### Aggiungi un dominio tipo "ortofruttaravanelli.it"

1. **Su Vercel:**
   - Vai su Project → Settings → Domains
   - Clicca "Add Domain"
   - Inserisci il tuo dominio (es. `ortofruttaravanelli.it`)

2. **Configura i DNS:**
   - Vercel ti mostrerà i DNS da configurare
   - Vai sul tuo provider di dominio (Aruba, Register.it, etc.)
   - Aggiungi i record DNS indicati da Vercel

3. **Attendi 24-48h** per propagazione DNS

**Costo dominio .it:** ~10-20€/anno

---

## 📱 Testa il Sito

Dopo il deploy, verifica:

- [ ] Tutte le pagine funzionano
- [ ] Immagini si caricano correttamente
- [ ] Pannello admin funziona (`/admin`)
- [ ] Volantino si apre (`/admin` → clicca bottone verde)
- [ ] Sito è responsive su mobile
- [ ] Link WhatsApp funziona

**Testa su mobile:**
```
- Apri il link sul telefono
- Verifica velocità caricamento
- Testa navigazione touch
- Prova form contatti
```

---

## 🆘 Problemi Comuni

### "Build failed" su Vercel

**Soluzione:**
```bash
# Testa il build in locale prima
npm run build

# Se ci sono errori, correggili
# Poi fai push di nuovo
git add .
git commit -m "Fix build errors"
git push
```

### "404 Not Found" sulle route

✅ **Già risolto!** Il file `vercel.json` gestisce il routing SPA.

### Immagini non si caricano

Verifica che le immagini siano nella cartella `public/images/`

### Volantino non funziona

✅ **Già risolto!** Lo script `copy-volantino.js` copia il file nel build.

---

## 💡 Tips

### 1. Preview Automatiche
Ogni push su GitHub crea una preview URL separato. Ottimo per testare!

### 2. Rollback Facile
Su Vercel puoi tornare a versioni precedenti con 1 click.

### 3. Analytics Gratis
Vercel offre analytics integrate. Attivale in Settings → Analytics.

### 4. Environment Variables
Per API keys o configurazioni:
- Vercel → Settings → Environment Variables
- Aggiungi variabili tipo `VITE_API_KEY`

---

## ✅ Checklist Finale

Prima di condividere il link:

- [ ] Ho testato tutte le pagine
- [ ] Le immagini si vedono bene
- [ ] Il pannello admin funziona
- [ ] I dati di contatto sono corretti
- [ ] Ho testato su mobile
- [ ] Ho condiviso il link su WhatsApp Business
- [ ] Ho aggiunto il link su biglietti da visita
- [ ] Ho aggiunto il link su vetrina negozio (QR Code)

---

## 🎉 Congratulazioni!

Il tuo sito è online! 🚀

**Prossimi Passi:**
1. Condividi il link su social media
2. Aggiungi il link a Google My Business
3. Stampa QR code per i mercati
4. Raccogli feedback dai clienti
5. Aggiorna contenuti regolarmente

---

**Tempo totale:** ~5-10 minuti  
**Costo:** GRATIS (+ dominio opzionale)  
**Difficoltà:** ⭐⭐☆☆☆ (Facile)

Buona fortuna! 🍎🥬
