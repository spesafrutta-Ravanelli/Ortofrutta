# 🖼️ Guida Immagini - Come Usare le Tue Foto

## 📸 Hai già 95 immagini bellissime!

Ho visto che nella cartella `immagini nuovo sito` hai foto fantastiche di:
- Banchi del negozio
- Frutta e verdura
- Prodotti specifici

## 🎯 Immagini Consigliate per la Home

### Per la **Hero Section** (immagine affiancata al testo):
Le foto dei banchi sono perfette! Ti consiglio:
- `banco.jpg` 
- `banco1.jpg`
- `banco2.jpg`
- `banco3.jpg`
- `Foto banchi.jpg`

### Per la **Sezione Immagine Centrata** (grande al centro):
Le foto panoramiche tipo:
- `foto banco.jpg`
- `foto banco1.jpg`
- `foto banco2.jpg`
- `foto banco3.jpg`

## 📂 Come Aggiungere le Immagini

### METODO 1: Copia Manualmente (Più Semplice)

1. **Apri due cartelle:**
   - Cartella A: `C:\Users\camer\Desktop\nuovo sito ortofrutta\immagini nuovo sito`
   - Cartella B: `C:\Users\camer\Desktop\nuovo sito ortofrutta\public\images`

2. **Copia le immagini che vuoi usare** dalla Cartella A alla Cartella B

3. **Rinomina per facilitare l'uso:**
   - `banco.jpg` → `hero-image.jpg` (per la hero)
   - `foto banco1.jpg` → `featured-ortofrutta.jpg` (per sezione centrata)

### METODO 2: Copia Tutte le Immagini

Copia TUTTE le immagini dalla cartella `immagini nuovo sito` a `public/images`:

**Da Esplora File:**
1. Seleziona tutte le immagini (CTRL+A)
2. Copia (CTRL+C)
3. Vai in `public/images`
4. Incolla (CTRL+V)

**Da PowerShell:**
```powershell
Copy-Item "immagini nuovo sito\*" -Destination "public\images\" -Force
```

## 🎨 Immagini da Usare

Dopo aver copiato le immagini, modifica i nomi nel codice:

### Per la Hero (file: src/views/Home.vue, linea ~29)
```vue
<img 
  src="/images/banco.jpg"  <!-- 👈 Cambia qui con il nome della tua foto -->
  alt="Frutta e Verdura Fresca"
/>
```

### Per la Sezione Centrata (file: src/views/Home.vue, linea ~38)
```vue
<img 
  src="/images/foto banco1.jpg"  <!-- 👈 Cambia qui -->
  alt="La nostra selezione di prodotti freschi"
/>
```

## ✨ Suggerimenti per Immagini Specifiche

### 🏠 HOME PAGE
- **Hero image**: `banco.jpg` o `banco2.jpg` (mostrano il negozio)
- **Featured**: `foto banco1.jpg` (panoramica bella)

### 📦 CATEGORIE (future)
Organizza così:
```
public/images/categories/
├── frutta/
│   ├── banane.jpg
│   ├── mele.jpg
│   ├── kiwi-verdi.jpg
│   └── ...
├── verdura/
│   ├── pomodorini.jpg
│   ├── zucchine.jpg
│   └── ...
└── agrumi/
    ├── limoni.jpg
    ├── mandarini.jpg
    └── ...
```

## 🔧 Ottimizzazione Immagini (Opzionale)

Per migliorare le performance:

1. **Ridimensiona** le immagini troppo grandi:
   - Hero: max 1200px larghezza
   - Featured: max 1600px larghezza
   - Prodotti: max 800px larghezza

2. **Comprimi** usando tool online:
   - [TinyPNG](https://tinypng.com/) - Gratuito
   - [Squoosh](https://squoosh.app/) - Google

3. **Converti in WebP** (formato moderno, più leggero)

## 🎯 Quick Start - 3 Passi Veloci

1. **Copia 2 immagini:**
   ```
   banco.jpg → public/images/hero-image.jpg
   foto banco1.jpg → public/images/featured-ortofrutta.jpg
   ```

2. **Modifica Home.vue** (linee 29 e 38):
   ```vue
   src="/images/hero-image.jpg"
   src="/images/featured-ortofrutta.jpg"
   ```

3. **Ricarica la pagina** - Fatto! 🎉

## 🎨 Personalizzazioni Avanzate

### Vuoi SOLO l'immagine centrata senza quella nella hero?

**Opzione 1: Nascondi l'immagine hero**
In `src/views/Home.vue`, cerca e **cancella** questa sezione (circa linea 27-35):
```vue
<!-- Immagine Hero -->
<div class="hero-image">
  <img ... />
</div>
```

**Opzione 2: Torna al layout centrato precedente**
Modifica lo stile (linea ~162) da:
```scss
.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;  // 👈 Cambia questa riga
  gap: 3rem;
  align-items: center;
}
```

A:
```scss
.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
```

### Vuoi cambiare il testo sull'immagine centrata?

In `src/views/Home.vue`, cerca (linea ~42):
```vue
<div class="image-overlay">
  <h3>Prodotti Freschi Ogni Giorno</h3>  <!-- 👈 Cambia qui -->
  <p>Dalla terra alla tua tavola</p>      <!-- 👈 E qui -->
</div>
```

## 📞 Problemi?

### L'immagine non si vede
- ✅ Controlla che il file sia in `public/images/`
- ✅ Verifica il nome del file (maiuscole/minuscole contano!)
- ✅ Riavvia il server dev (`CTRL+C` poi `npm run dev`)

### L'immagine è troppo grande
- Ridimensionala con Paint, Photoshop, o online

### Voglio usare uno sfondo invece di un'immagine
Posso aiutarti a implementarlo!

---

## 🎉 Risultato

Dopo aver aggiunto le immagini, la tua home avrà:
- ✅ Immagine bellissima nella hero (affiancata o sopra il testo)
- ✅ Sezione immagine grande centrata con overlay
- ✅ Design professionale e moderno
- ✅ Completamente responsive

**Le tue foto dei banchi renderanno il sito bellissimo!** 🍎🥕🍊

---

*Hai bisogno di aiuto? Dimmi quale immagine vuoi usare e ti aiuto a configurarla!*
