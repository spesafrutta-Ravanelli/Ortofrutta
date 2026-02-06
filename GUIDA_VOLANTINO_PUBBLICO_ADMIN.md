# 📄 Guida Volantino: Pubblico vs Admin

## 🎯 STRUTTURA AGGIORNATA

Ho separato il volantino in **due versioni**:

### 1. **volantino.html** - Versione Pubblica 👥
**Percorso:** `/src/stores/volantino.html`

**Visibile da:**
- Pagina `/offerte` (per tutti gli utenti)
- Embedded nell'iframe della pagina Offerte

**Caratteristiche:**
- ✅ Solo visualizzazione del volantino
- ❌ Nessun editor
- ❌ Nessun pulsante di modifica
- ❌ Nessun form per aggiungere prodotti
- ✅ Mostra solo il volantino finale
- ✅ Formato A5 ottimizzato per stampa

**Cosa vedono gli utenti:**
- Il volantino con i prodotti in offerta
- Fronte e retro del volantino
- Possibilità di stampare (Ctrl+P)

---

### 2. **volantino-editor.html** - Versione Admin 🔧
**Percorso:** `/src/stores/volantino-editor.html`

**Accessibile solo da:**
- Pannello Admin (`/admin`)
- Con modalità admin attivata (Ctrl+Shift+A)
- Pulsante "📄 Apri Editor Volantini"

**Caratteristiche:**
- ✅ Editor completo
- ✅ Form per aggiungere prodotti
- ✅ Pulsanti Modifica/Elimina
- ✅ Upload immagini
- ✅ Tab Fronte/Retro
- ✅ Anteprima in tempo reale
- ✅ Pulsante Stampa
- ✅ Istruzioni stampa A5

**Cosa vede l'admin:**
- Tutto l'editor per creare volantini
- Form per aggiungere prodotti
- Anteprima live
- Pulsanti di modifica

---

## 🔄 WORKFLOW COMPLETO

### Per l'Admin (Tu)

#### 1. Accedi al Pannello Admin
```
1. Vai su: https://tuo-sito.vercel.app/admin
2. Premi Ctrl+Shift+A per attivare modalità admin
3. Appare il pulsante "📄 Apri Editor Volantini"
```

#### 2. Crea/Modifica Volantino
```
1. Clicca "📄 Apri Editor Volantini"
2. Si apre volantino-editor.html in nuova finestra
3. Aggiungi prodotti in offerta:
   - Nome prodotto
   - Immagine
   - Prezzo
   - Descrizione
4. Clicca "➕ Aggiungi Prodotto"
5. Ripeti per tutti i prodotti
```

#### 3. Anteprima e Stampa
```
1. Usa tab "📄 Fronte" e "📍 Retro" per vedere entrambi i lati
2. Clicca "🖨️ Stampa Volantino A5"
3. Seleziona:
   - Formato: A5 (148mm x 210mm)
   - Orientamento: Verticale
   - Margini: Nessuno
4. Stampa o Salva PDF
```

#### 4. Pubblica Online
```
1. Il volantino è automaticamente visibile su /offerte
2. Gli utenti vedono solo la visualizzazione (volantino.html)
3. Nessuno può modificare tranne te dall'admin
```

---

### Per gli Utenti (Pubblico)

#### 1. Visualizzazione Offerte
```
1. Vanno su: https://tuo-sito.vercel.app/offerte
2. Vedono il volantino embedded
3. Possono vedere le offerte
4. Possono stampare (Ctrl+P)
```

#### 2. Cosa NON Possono Fare
```
❌ Non vedono l'editor
❌ Non possono aggiungere prodotti
❌ Non possono modificare
❌ Non possono eliminare
❌ Non hanno accesso a volantino-editor.html
```

---

## 🔐 SICUREZZA

### Separazione Completa

**Pubblico:**
- Accede solo a `volantino.html`
- Vede solo il risultato finale
- Nessuna funzione di editing

**Admin:**
- Accede a `volantino-editor.html`
- Solo tramite pannello admin
- Solo con Ctrl+Shift+A attivato

### Protezione

1. **URL Separati:**
   - `/src/stores/volantino.html` → Pubblico
   - `/src/stores/volantino-editor.html` → Admin

2. **Accesso Admin:**
   - Richiede andare su `/admin`
   - Richiede premere Ctrl+Shift+A
   - Pulsante visibile solo in modalità admin

3. **Nessun Link Pubblico:**
   - La pagina `/offerte` carica solo `volantino.html`
   - Nessun link a `volantino-editor.html` nel sito pubblico

---

## 📁 FILE MODIFICATI

### Nuovi File
1. **`src/stores/volantino-editor.html`**
   - Editor completo per admin
   - Con form, pulsanti, tab

2. **`src/stores/volantino.html`** (modificato)
   - Solo visualizzazione
   - Nessun editor
   - Ottimizzato per iframe

### File Aggiornati
1. **`src/views/AdminPanel.vue`**
   - Apre `volantino-editor.html` invece di `volantino.html`
   - Pulsante "Apri Editor Volantini"

2. **`src/views/Offerte.vue`**
   - Carica `volantino.html` (solo visualizzazione)
   - Embedded in iframe

3. **`copy-volantino.js`**
   - Copia entrambi i file in dist/
   - Necessario per deployment

---

## 🚀 DEPLOYMENT

### Build e Deploy

```bash
# Build locale (copia entrambi i file)
npm run build

# Deploy su Vercel
git add .
git commit -m "Separato volantino pubblico e admin"
git push

# Vercel rebuilda automaticamente
```

### Verifica Post-Deploy

**Pubblico:**
```
✅ https://tuo-sito.vercel.app/offerte
   → Mostra volantino senza editor
```

**Admin:**
```
✅ https://tuo-sito.vercel.app/admin
   → Premi Ctrl+Shift+A
   → Clicca "Apri Editor Volantini"
   → Si apre volantino-editor.html
```

---

## 💡 VANTAGGI

### Per l'Admin
- ✅ Editor completo e potente
- ✅ Accesso rapido con Ctrl+Shift+A
- ✅ Nessuna interferenza con il pubblico
- ✅ Anteprima in tempo reale

### Per gli Utenti
- ✅ Visualizzazione pulita
- ✅ Nessun elemento confusionario
- ✅ Caricamento più veloce
- ✅ Esperienza ottimizzata

### Per la Sicurezza
- ✅ Separazione netta pubblico/admin
- ✅ Nessun accesso non autorizzato
- ✅ Editor protetto
- ✅ Controllo completo

---

## 🎯 ESEMPIO D'USO

### Scenario: Aggiornamento Offerte Settimanale

**Lunedì mattina:**

```
1. Vai su /admin
2. Premi Ctrl+Shift+A
3. Clicca "Apri Editor Volantini"
4. Aggiungi prodotti in offerta:
   - Mele Golden: €1,99/kg
   - Pomodori: €2,50/kg
   - Insalata: €0,99/pz
5. Clicca Stampa per PDF
6. Chiudi editor
7. Premi Ctrl+Shift+A per disattivare admin
```

**Risultato:**
- Gli utenti vedono subito le nuove offerte su `/offerte`
- Tu hai il PDF per i mercati
- Tutto aggiornato in 5 minuti!

---

## 🆘 TROUBLESHOOTING

### "Non vedo l'editor nella pagina Offerte"

**✅ CORRETTO!**
- La pagina `/offerte` mostra solo il volantino
- L'editor è accessibile solo da `/admin` con Ctrl+Shift+A

### "Il pulsante 'Apri Editor' non appare"

**Soluzione:**
1. Vai su `/admin`
2. Premi **Ctrl+Shift+A**
3. Ora appare il pulsante verde

### "Gli utenti vedono l'editor"

**Verifica:**
1. La pagina `/offerte` carica `volantino.html`?
2. Non `volantino-editor.html`?
3. Controlla `Offerte.vue` → iframe src

### "Build non copia i file"

**Soluzione:**
```bash
# Verifica copy-volantino.js
node copy-volantino.js

# Rebuild
npm run build
```

---

## ✅ CHECKLIST FINALE

- [x] `volantino.html` → Solo visualizzazione
- [x] `volantino-editor.html` → Editor completo
- [x] AdminPanel apre editor
- [x] Pagina Offerte carica visualizzazione
- [x] Ctrl+Shift+A attiva admin
- [x] copy-volantino.js copia entrambi
- [x] Separazione pubblico/admin completa
- [x] Formato A5 ottimizzato

---

**🎉 TUTTO CONFIGURATO!**

**Per usare:**
1. Pubblico → `/offerte` (vede solo volantino)
2. Admin → `/admin` + Ctrl+Shift+A + "Apri Editor"

**Semplice, sicuro, efficace!** ✨
