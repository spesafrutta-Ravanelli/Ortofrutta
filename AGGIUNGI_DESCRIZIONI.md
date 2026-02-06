# 📝 Come Aggiungere Descrizioni ai Prodotti

## 🎯 Come Funziona

Quando passi il mouse sopra l'immagine del prodotto, appare:
- **Nome prodotto** (grande, in alto)
- **Descrizione completa** (scrollabile se lunga)
- **Provenienza**
- **Prezzo**
- **Disponibilità**

**Sfondo nero** con testo bianco, proprio come nell'esempio delle mele! 🍋

---

## ✏️ Come Aggiungere una Descrizione

### Passo 1: Apri il file dello Store
Vai in: `src/stores/productsStore.js`

### Passo 2: Trova il prodotto
Cerca il prodotto a cui vuoi aggiungere la descrizione.

### Passo 3: Aggiungi il campo `description`

**Prima** (senza descrizione):
```javascript
{ 
  id: 1, 
  name: 'Arance', 
  origin: 'Sicilia', 
  price: '2.50', 
  unit: 'kg', 
  available: true 
}
```

**Dopo** (con descrizione):
```javascript
{ 
  id: 1, 
  name: 'Arance', 
  origin: 'Sicilia', 
  price: '2.50', 
  unit: 'kg', 
  available: true,
  description: 'Arance siciliane succose e dolci, ricche di vitamina C. Perfette per spremute fresche o da gustare al naturale. Il loro sapore intenso e la polpa succosa le rendono ideali per iniziare la giornata con energia.'
}
```

---

## 📐 Lunghezza Descrizione

### ✅ Descrizione Corta (senza scroll)
2-3 righe, circa 150-200 caratteri:
```javascript
description: 'Mele Golden croccanti e dolci, perfette da gustare al naturale o per dolci casalinghi.'
```

### ✅ Descrizione Media 
3-5 righe, circa 200-350 caratteri:
```javascript
description: 'Fragole italiane profumate e dolcissime. Il loro colore rosso brillante le rende irresistibili. Perfette da gustare fresche, con panna, o per preparare dolci e macedonie.'
```

### ✅ Descrizione Lunga (con scroll)
Più di 5 righe, oltre 350 caratteri:
```javascript
description: 'Val di Sole, nasce in un ambiente montano ideale che ne esalta qualità e sapore. Si presenta con una buccia giallo dorata, talvolta leggermente rosata, e una polpa croccante, succosa e profumata. Il sapore è dolce con una delicata nota acidula, perfetto per soddisfare ogni palato. Ideale da gustare al naturale, la mela Golden è perfetta anche per dolci.'
```

**Il testo diventa scrollabile automaticamente!** 📜

---

## 🎨 Consigli per Scrivere Descrizioni

### ✅ Cosa Includere:
- **Origine e qualità**: "Arance siciliane di prima scelta"
- **Caratteristiche**: "Buccia sottile, polpa succosa"
- **Sapore**: "Dolce con nota acidula"
- **Utilizzi**: "Perfette per spremute o macedonie"
- **Benefici**: "Ricche di vitamina C"

### ❌ Cosa Evitare:
- Descrizioni troppo tecniche
- Informazioni già presenti (prezzo, origine)
- Testo troppo breve (meno di 100 caratteri)

---

## 📋 Template da Copiare

### Frutta:
```javascript
description: '[Nome frutto] [origine] dal sapore [caratteristiche]. La [parte] [colore] racchiude una polpa [consistenza] e [sapore]. [Utilizzi suggeriti]. [Benefici nutrizionali].'
```

**Esempio**:
```javascript
description: 'Mele Golden del Trentino dal sapore dolce e aromatico. La buccia giallo dorata racchiude una polpa croccante e succosa. Perfette per essere gustate al naturale, in insalate o per preparare dolci casalinghi. Ricche di fibre e vitamine.'
```

### Verdura:
```javascript
description: '[Nome verdura] [origine] [caratteristiche]. [Consistenza e sapore]. [Utilizzi in cucina]. [Benefici].'
```

**Esempio**:
```javascript
description: 'Pomodori pachino di Sicilia, piccoli e dolcissimi. La polpa soda e il sapore intenso li rendono perfetti per insalate fresche, bruschette o sughi veloci. Ricchi di licopene e antiossidanti.'
```

---

## 🔄 Aggiornare le Descrizioni

### Nel Listino:
Attualmente il Listino gestisce solo:
- Nome
- Provenienza
- Prezzo
- Unità
- Disponibilità

**Le descrizioni vanno modificate manualmente nel file dello store.**

**Futura implementazione**: Aggiungeremo un campo per le descrizioni anche nel Listino! 🚀

---

## 💡 Esempi Già Pronti

Ho già aggiunto descrizioni a questi prodotti:
- ✅ Arance (Inverno)
- ✅ Mandarini (Inverno)
- ✅ Clementine (Inverno)
- ✅ Pompelmi (Inverno)
- ✅ Kiwi (Inverno)
- ✅ Mele Golden (Inverno)
- ✅ Pere (Inverno)
- ✅ Fragole (Primavera)
- ✅ Ciliegie (Primavera)
- ✅ Nespole (Primavera)
- ✅ Albicocche (Primavera)

Puoi copiarle come esempio per gli altri prodotti!

---

## 🎬 Risultato Finale

Quando il cliente:
1. Va sulla pagina Categorie
2. Clicca su una stagione (es: Inverno)
3. Passa il mouse su un prodotto

**Appare**:
- Sfondo nero trasparente
- Nome grande centrato
- Descrizione completa (scrollabile)
- Provenienza in italico
- Prezzo su bottone bianco
- Badge disponibilità verde/rosso

Proprio come nell'esempio delle mele! 🍋✨
