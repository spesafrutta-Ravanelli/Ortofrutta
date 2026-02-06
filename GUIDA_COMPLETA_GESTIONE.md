# 📚 GUIDA COMPLETA: Gestione Sito Ortofrutta

## 🎯 INDICE

1. [Mettere Online il Sito](#1-mettere-online-il-sito)
2. [Modificare Descrizioni e Prezzi](#2-modificare-descrizioni-e-prezzi)
3. [Gestire le Offerte](#3-gestire-le-offerte)
4. [Aggiornare il Sito](#4-aggiornare-il-sito)

---

## 1️⃣ METTERE ONLINE IL SITO

### Step 1: Crea Account GitHub

1. Vai su [github.com](https://github.com)
2. Clicca "Sign up"
3. Registrati con email e password
4. ✅ Account creato!

### Step 2: Carica Progetto

**Metodo Facile - GitHub Desktop:**

1. Scarica [GitHub Desktop](https://desktop.github.com)
2. Installa e accedi
3. File → Add Local Repository
4. Seleziona cartella: `C:\Users\siott\OneDrive\Desktop\nuovo sito ortofrutta`
5. Clicca "Publish repository"
6. Nome: `ortofrutta-golosello`
7. Clicca "Publish"

### Step 3: Deploy su Vercel

1. Vai su [vercel.com](https://vercel.com)
2. "Sign Up" con GitHub
3. "New Project"
4. Import "ortofrutta-golosello"
5. Clicca "Deploy"
6. ✅ Sito online in 2 minuti!

**Link finale:** `https://ortofrutta-golosello.vercel.app`

---

## 2️⃣ MODIFICARE DESCRIZIONI E PREZZI

### Opzione A: Pannello Admin (FACILE) ⭐

**🆕 SCORCIATOIA VELOCE: Premi `Ctrl+Shift+A` per attivare/disattivare la modalità admin!**

**Per modificare prodotti esistenti:**

1. **Vai sul sito:** `https://tuo-sito.vercel.app/admin`

2. **Attiva Modalità Admin:**
   
   **Metodo 1 - Scorciatoia (VELOCE):**
   - Premi **Ctrl+Shift+A** sulla tastiera
   - La modalità admin si attiva istantaneamente!
   
   **Metodo 2 - Toggle:**
   - Clicca sul toggle in alto a destra
   - Da "👁️ Visualizzazione Pubblica" → "🔧 Modalità Admin"

3. **Modifica Prodotto:**
   - Ogni prodotto ha campi modificabili
   - Cambia: Nome, Prezzo, Stock, Categoria, Descrizione
   - Clicca "💾 Salva" per salvare

4. **Aggiungi Nuovo Prodotto:**
   - Compila il form in alto
   - Nome, Prezzo, Stock, Categoria (obbligatori)
   - Descrizione e Immagine (opzionali)
   - Clicca "➕ Aggiungi Prodotto"

5. **Elimina Prodotto:**
   - Clicca "🗑️ Elimina"
   - Conferma eliminazione

**NOTA:** I dati sono salvati nel browser (localStorage). Per modifiche permanenti, vedi Opzione B.

---

### Opzione B: Modificare File Sorgente (PERMANENTE)

**Per modificare il database prodotti:**

1. **Apri il file:**
   ```
   src/stores/productsStore.js
   ```

2. **Trova il prodotto da modificare:**
   ```javascript
   {
     id: 1,
     name: 'Mela Golden',
     price: '2.40',
     description: 'Mela dolce e croccante...',
     // ...
   }
   ```

3. **Modifica i campi:**
   ```javascript
   {
     id: 1,
     name: 'Mela Golden Delicious',  // ← Cambia nome
     price: '2.80',                   // ← Cambia prezzo
     description: 'Nuova descrizione...', // ← Cambia descrizione
     // ...
   }
   ```

4. **Salva il file** (Ctrl+S)

5. **Aggiorna online:**
   ```bash
   git add .
   git commit -m "Aggiornati prezzi e descrizioni"
   git push
   ```

6. **Vercel rebuilderà automaticamente!**

---

### Struttura Prodotto Completa

```javascript
{
  id: 1,                    // ID univoco (non modificare)
  name: 'Nome Prodotto',    // Nome visualizzato
  origin: 'Italia',         // Origine
  price: '2.40',           // Prezzo (formato stringa con decimali)
  unit: 'kg',              // Unità di misura
  available: true,         // Disponibilità (true/false)
  image: '/images/products/nome.jpg', // Percorso immagine
  description: 'Descrizione completa del prodotto...', // Descrizione
  category: 'Frutta',      // Categoria
  season: ['Primavera', 'Estate'], // Stagioni
  featured: false          // In evidenza (true/false)
}
```

---

### Aggiungere Nuovo Prodotto nel Codice

1. **Apri:** `src/stores/productsStore.js`

2. **Trova l'array `products`**

3. **Aggiungi nuovo prodotto:**
   ```javascript
   {
     id: 999,  // Usa ID univoco
     name: 'Nuovo Prodotto',
     origin: 'Italia',
     price: '3.50',
     unit: 'kg',
     available: true,
     image: '/images/products/nuovo.jpg',
     description: 'Descrizione del nuovo prodotto',
     category: 'Frutta',  // o 'Verdura'
     season: ['Primavera'],
     featured: false
   },
   ```

4. **Salva e push:**
   ```bash
   git add .
   git commit -m "Aggiunto nuovo prodotto"
   git push
   ```

---

## 3️⃣ GESTIRE LE OFFERTE

### Pagina "Le Nostre Offerte"

**Nuova pagina creata:** `/offerte`

**Accesso:**
- Navbar: Clicca "🎉 Offerte"
- Home: Clicca "🎉 Vedi Offerte"
- URL diretto: `https://tuo-sito.vercel.app/offerte`

### Modificare il Volantino

1. **Vai su:** `https://tuo-sito.vercel.app/offerte`

2. **Il volantino è integrato nella pagina**

3. **Per modificare il volantino:**
   - Accedi a: `https://tuo-sito.vercel.app/admin`
   - Attiva modalità admin
   - Clicca "📄 Apri Generatore Volantini"
   - Aggiungi prodotti in offerta
   - Stampa o salva PDF

### Aggiornare Volantino Settimanale

**Metodo 1 - Direttamente Online:**
1. Vai su `/admin`
2. Clicca "📄 Apri Generatore Volantini"
3. Crea nuovo volantino
4. Stampa/Salva

**Metodo 2 - Modifica File:**
1. Apri: `src/stores/volantino.html`
2. Modifica prodotti predefiniti
3. Salva e push su GitHub

---

## 4️⃣ AGGIORNARE IL SITO

### Ogni volta che fai modifiche:

```bash
# 1. Salva le modifiche nei file

# 2. Apri PowerShell nella cartella progetto
cd "C:\Users\siott\OneDrive\Desktop\nuovo sito ortofrutta"

# 3. Aggiungi modifiche
git add .

# 4. Commit con messaggio
git commit -m "Descrizione modifiche (es: Aggiornati prezzi)"

# 5. Push su GitHub
git push

# 6. Vercel rebuilderà automaticamente in 1-2 minuti!
```

### Con GitHub Desktop (PIÙ FACILE):

1. Apri GitHub Desktop
2. Vedrai le modifiche nella colonna sinistra
3. Scrivi messaggio commit (es: "Aggiornati prezzi")
4. Clicca "Commit to main"
5. Clicca "Push origin"
6. ✅ Fatto! Vercel rebuilderà automaticamente

---

## 📊 MODIFICHE COMUNI

### Cambiare Prezzo Prodotto

**File:** `src/stores/productsStore.js`

```javascript
// PRIMA
{ id: 1, name: 'Mela', price: '2.40', ... }

// DOPO
{ id: 1, name: 'Mela', price: '2.80', ... }
```

### Cambiare Descrizione

```javascript
// PRIMA
description: 'Vecchia descrizione'

// DOPO
description: 'Nuova descrizione aggiornata con più dettagli'
```

### Aggiungere Immagine Prodotto

1. **Aggiungi immagine in:** `public/images/products/`
2. **Nome file:** `nome-prodotto.jpg`
3. **Nel codice:**
   ```javascript
   image: '/images/products/nome-prodotto.jpg'
   ```

### Modificare Informazioni Contatto

**File:** `src/components/layout/Footer.vue`

```vue
<li>📞 <a href="tel:+393756804525">+39 375 680 4525</a></li>
```

Cambia il numero di telefono qui.

---

## 🆘 PROBLEMI COMUNI

### "Non vedo le modifiche online"

**Soluzione:**
1. Controlla che hai fatto `git push`
2. Vai su Vercel Dashboard
3. Verifica che il build sia completato
4. Attendi 1-2 minuti
5. Ricarica pagina con Ctrl+F5

### "Immagine non si vede"

**Soluzione:**
1. Verifica che l'immagine sia in `public/images/products/`
2. Controlla il nome file (case-sensitive!)
3. Verifica percorso: `/images/products/nome.jpg`

### "Build failed su Vercel"

**Soluzione:**
1. Controlla i log su Vercel
2. Verifica sintassi JavaScript (virgole, parentesi)
3. Testa in locale: `npm run build`

---

## ✅ CHECKLIST MODIFICHE

Prima di fare push:

- [ ] Ho salvato tutti i file modificati
- [ ] Ho testato in locale (opzionale)
- [ ] Ho scritto messaggio commit chiaro
- [ ] Ho fatto git push
- [ ] Ho verificato su Vercel che il build sia OK
- [ ] Ho testato il sito online

---

## 📞 SUPPORTO

### Link Utili

- **Sito:** `https://tuo-sito.vercel.app`
- **Admin:** `https://tuo-sito.vercel.app/admin`
- **Offerte:** `https://tuo-sito.vercel.app/offerte`
- **Vercel Dashboard:** `https://vercel.com/dashboard`
- **GitHub Repo:** `https://github.com/TUO-USERNAME/ortofrutta-golosello`

### File Importanti

| File | Scopo |
|------|-------|
| `src/stores/productsStore.js` | Database prodotti |
| `src/views/AdminPanel.vue` | Pannello admin |
| `src/stores/volantino.html` | Generatore volantini |
| `src/views/Offerte.vue` | Pagina offerte |
| `src/components/layout/Footer.vue` | Footer con contatti |

---

## 🎉 RIEPILOGO

### Modifiche Rapide (Pannello Admin):
1. Vai su `/admin`
2. Attiva modalità admin
3. Modifica prodotti
4. Salva

### Modifiche Permanenti (Codice):
1. Modifica `productsStore.js`
2. Salva file
3. `git push`
4. Vercel rebuilda

### Gestione Offerte:
1. Vai su `/offerte`
2. Usa generatore volantini
3. Aggiorna settimanalmente

---

**Data:** Gennaio 2026  
**Versione:** 1.0.0  
**Progetto:** Ortofrutticola Golosello Ravanelli & Carminati

✅ **TUTTO PRONTO PER LA GESTIONE DEL SITO!**
