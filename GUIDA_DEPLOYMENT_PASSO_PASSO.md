# 🚀 Guida Passo-Passo: Metti Online il Sito

## PARTE 1: DEPLOYMENT SU VERCEL (5 minuti)

### Step 1: Crea Account GitHub

1. **Vai su [github.com](https://github.com)**
2. Clicca "Sign up" (in alto a destra)
3. Inserisci:
   - Email: la tua email
   - Password: scegli una password sicura
   - Username: scegli un nome utente
4. Verifica email
5. ✅ Account creato!

---

### Step 2: Carica il Progetto su GitHub

**Opzione A - Da Terminale (Raccomandato):**

```bash
# 1. Apri PowerShell nella cartella del progetto
cd "C:\Users\siott\OneDrive\Desktop\nuovo sito ortofrutta"

# 2. Inizializza git
git init

# 3. Aggiungi tutti i file
git add .

# 4. Primo commit
git commit -m "Sito Ortofrutticola Golosello - Prima versione"

# 5. Vai su github.com e clicca "New repository"
#    - Nome: ortofrutta-golosello
#    - Descrizione: Sito web Ortofrutticola Golosello Ravanelli & Carminati
#    - Pubblico o Privato: Scegli tu
#    - NON aggiungere README, .gitignore, license
#    - Clicca "Create repository"

# 6. Copia questi comandi (sostituisci TUO-USERNAME con il tuo username GitHub):
git remote add origin https://github.com/TUO-USERNAME/ortofrutta-golosello.git
git branch -M main
git push -u origin main
```

**Opzione B - GitHub Desktop (Più Facile):**

1. Scarica [GitHub Desktop](https://desktop.github.com)
2. Installa e accedi con il tuo account GitHub
3. File → Add Local Repository
4. Seleziona: `C:\Users\siott\OneDrive\Desktop\nuovo sito ortofrutta`
5. Clicca "Publish repository"
6. Nome: `ortofrutta-golosello`
7. Clicca "Publish repository"
8. ✅ Codice caricato su GitHub!

---

### Step 3: Deploy su Vercel

1. **Vai su [vercel.com](https://vercel.com)**

2. **Clicca "Sign Up"**
   - Scegli "Continue with GitHub"
   - Autorizza Vercel

3. **Clicca "New Project"** (o "Add New..." → "Project")

4. **Import Repository:**
   - Cerca "ortofrutta-golosello"
   - Clicca "Import"

5. **Configurazione Progetto:**
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
   (Vercel dovrebbe rilevare tutto automaticamente)

6. **Environment Variables (opzionale):**
   - Lascia vuoto per ora

7. **Clicca "Deploy"**

8. **Attendi 1-2 minuti...**
   - Vercel builderà il progetto
   - Vedrai una schermata di successo! 🎉

9. **Ottieni il Link:**
   ```
   https://ortofrutta-golosello.vercel.app
   ```
   oppure
   ```
   https://ortofrutta-golosello-tuo-username.vercel.app
   ```

10. **✅ SITO ONLINE!**

---

### Step 4: Testa il Sito

1. Apri il link che Vercel ti ha dato
2. Verifica che tutto funzioni:
   - [ ] Home page si carica
   - [ ] Navigazione tra pagine
   - [ ] Immagini visibili
   - [ ] Pannello admin accessibile (`/admin`)
   - [ ] Responsive su mobile

---

### Step 5: Dominio Personalizzato (Opzionale)

**Se vuoi un dominio tipo `www.ortofruttagolosello.it`:**

1. **Acquista dominio:**
   - [Aruba.it](https://www.aruba.it) - ~10-15€/anno
   - [Register.it](https://www.register.it) - ~10-15€/anno
   - [GoDaddy](https://www.godaddy.com) - ~12€/anno

2. **Configura su Vercel:**
   - Dashboard Vercel → Progetto → Settings → Domains
   - Clicca "Add Domain"
   - Inserisci: `ortofruttagolosello.it`
   - Vercel ti darà i DNS da configurare

3. **Configura DNS sul provider:**
   - Accedi al pannello del tuo provider
   - Vai su DNS/Nameservers
   - Aggiungi i record che Vercel ti ha indicato:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

4. **Attendi 24-48h** per propagazione DNS

5. **✅ Dominio attivo!**

---

## 🔄 AGGIORNAMENTI FUTURI

Ogni volta che modifichi il sito:

```bash
# 1. Salva le modifiche
git add .
git commit -m "Descrizione modifiche"
git push

# 2. Vercel rebuilderà automaticamente!
# In 1-2 minuti le modifiche saranno online
```

---

## 🆘 Problemi Comuni

### "Build failed" su Vercel

**Soluzione:**
- Vercel usa Linux, NON avrà l'errore EPERM
- Se fallisce, controlla i log su Vercel
- Probabilmente manca una dipendenza

### "404 Not Found" sulle route

✅ **Già risolto!** Il file `vercel.json` gestisce il routing.

### Volantino non si carica

✅ **Già risolto!** Lo script `copy-volantino.js` lo copia nel build.

---

## ✅ Checklist Deployment

- [ ] Account GitHub creato
- [ ] Codice pushato su GitHub
- [ ] Account Vercel creato
- [ ] Progetto importato su Vercel
- [ ] Build completato con successo
- [ ] Sito online e funzionante
- [ ] Link condiviso con clienti
- [ ] (Opzionale) Dominio personalizzato configurato

---

**Tempo totale:** 5-10 minuti  
**Costo:** GRATIS (+ dominio opzionale ~10-15€/anno)  
**Difficoltà:** ⭐⭐☆☆☆

---

**Prossimo Step:** Rendere modificabili descrizioni e prezzi
