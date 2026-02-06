# 📋 Guida Listino e Prodotti

## 🎯 Panoramica

Il sito ora ha **due visualizzazioni diverse** per i prodotti:

### 1. **Pagine Categorie** (Vista Clienti)
- Mostra i prodotti con **immagini grandi**
- Passando il mouse sopra l'immagine appare: **nome, provenienza e prezzo**
- Design moderno e accattivante per i clienti

### 2. **Pagina Listino** (Gestione Prezzi)
- Interfaccia **semplice e intuitiva** per modificare prezzi
- Pensata per chi non è esperto di PC
- Modifiche salvate automaticamente nel browser

---

## 📸 Come Gestire le Immagini dei Prodotti

### Aggiungere Immagini

1. **Dove mettere le immagini**:
   - Creare una cartella `public/images/products/`
   - Salvare le foto dei prodotti lì dentro

2. **Nome dei file**:
   - Usare nomi semplici e chiari
   - Esempio: `arance.jpg`, `mele-golden.jpg`, `pomodori.jpg`

3. **Formato**:
   - JPG o PNG
   - Dimensione consigliata: 800x800 pixel (quadrate)

### Collegare le Immagini ai Prodotti

Per ora le immagini usano un **placeholder** (immagine di default con 🍎).

Se vuoi collegare immagini reali, aggiungi il campo `image` ai prodotti nello store:

```javascript
{ 
  id: 1, 
  name: 'Arance', 
  origin: 'Sicilia', 
  price: '2.50', 
  unit: 'kg', 
  available: true,
  image: '/images/products/arance.jpg'  // ← Aggiungi questo
}
```

---

## 💰 Come Modificare i Prezzi (Listino)

### Passo 1: Accedi al Listino
1. Vai sulla pagina **"Listino"** dal menu
2. Clicca il pulsante verde grande: **"✏️ Modifica Prezzi"**

### Passo 2: Modifica i Dati
Ora puoi modificare:
- ✅ **Nome prodotto**
- ✅ **Provenienza**
- ✅ **Prezzo** (in euro)
- ✅ **Unità** (kg, pz, conf)
- ✅ **Disponibilità** (spunta = disponibile)

### Passo 3: Salva le Modifiche
1. Clicca il pulsante blu grande: **"💾 Salva Modifiche"**
2. Conferma cliccando "OK"
3. Appare il messaggio: **"✅ Modifiche salvate con successo!"**

### Annullare le Modifiche
- Clicca **"❌ Annulla"** se vuoi scartare le modifiche

---

## ➕ Aggiungere/Rimuovere Prodotti

### Aggiungere un Nuovo Prodotto
1. Entra in modalità modifica
2. Scorri in fondo alla pagina
3. Clicca: **"➕ Aggiungi Nuovo Prodotto"**
4. Compila i campi del nuovo prodotto
5. Salva le modifiche

### Rimuovere un Prodotto
1. Entra in modalità modifica
2. Clicca il pulsante **🗑️** accanto al prodotto
3. Conferma cliccando "OK"
4. Salva le modifiche

---

## 🔍 Filtrare i Prodotti

Usa il menu a tendina **"Filtra per categoria"** per vedere solo:
- Prodotti Invernali
- Prodotti Primaverili
- Prodotti Estivi
- Prodotti Autunnali
- Frutta tutto l'anno
- Verdura tutto l'anno
- Formaggi, Salami, ecc.

---

## 💾 Dove Vengono Salvate le Modifiche?

Le modifiche vengono salvate nel **browser** (localStorage).

### ⚠️ IMPORTANTE:
- Le modifiche sono **locali** al computer dove le fai
- Se usi un altro computer, non vedrai le modifiche
- Se cancelli i dati del browser, le modifiche vanno perse

### Soluzione Futura:
Per rendere le modifiche permanenti su tutti i dispositivi, serve un **database online**.

---

## 🎨 Come Appare ai Clienti

Quando i clienti visitano le pagine:
- **Home** → Cliccano su "I Nostri Prodotti"
- **Categorie** → Vedono le 4 stagioni + prodotti tutto l'anno
- **Dettaglio** → Vedono le **card con immagini** dei prodotti
  - Passano il mouse → Vedono nome, provenienza e prezzo

---

## 🆘 Risoluzione Problemi

### Le modifiche non si salvano?
- Controlla di aver cliccato **"💾 Salva Modifiche"**
- Controlla che il browser accetti i cookie

### Le immagini non si vedono?
- Verifica che le immagini siano nella cartella `public/images/products/`
- Controlla che il nome del file sia corretto

### Il prezzo non si aggiorna?
- Usa il punto (.) non la virgola (,) per i decimali
- Esempio: `2.50` ✅ non `2,50` ❌

---

## 📞 Servizio Clienti

Per qualsiasi problema o domanda, contatta il supporto tecnico.

**Email**: [inserire email supporto]  
**Telefono**: [inserire numero]
