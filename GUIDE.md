# 📖 Guida Completa - Sito Ortofrutta Vue 3

## 📋 Indice
- [Introduzione](#introduzione)
- [Struttura del Progetto](#struttura-del-progetto)
- [Setup Iniziale](#setup-iniziale)
- [Architettura](#architettura)
- [Componenti](#componenti)
- [Store Pinia](#store-pinia)
- [Routing](#routing)
- [Gestione Immagini](#gestione-immagini)
- [Personalizzazione](#personalizzazione)
- [Deployment](#deployment)
- [FAQ](#faq)

---

## 🎯 Introduzione

Questo progetto è un sito web moderno per una rivendita ortofrutticola, costruito con:
- **Vue 3** (Composition API)
- **Vite** (Build tool)
- **Pinia** (State management)
- **Vue Router** (Routing)
- **SCSS** (Styling)

### Caratteristiche Principali
✅ Design responsive e mobile-first  
✅ Navigazione fluida con Vue Router  
✅ Gestione stato centralizzata con Pinia  
✅ Componenti riutilizzabili e scalabili  
✅ Tabelle filtrabili e ordinabili  
✅ Gallerie immagini con navigazione  
✅ Dati mock pronti per integrazione backend  

---

## 📁 Struttura del Progetto

```
nuovo-sito-ortofrutta/
├── public/                    # File statici
│   └── favicon.ico
│
├── src/
│   ├── assets/               # Risorse (immagini, font)
│   │
│   ├── components/           # Componenti riutilizzabili
│   │   ├── common/          # Componenti comuni
│   │   │   └── ImageGallery.vue
│   │   ├── layout/          # Layout (navbar, footer)
│   │   │   ├── Navbar.vue
│   │   │   └── Footer.vue
│   │   └── products/        # Componenti prodotti
│   │       ├── CategoryCard.vue
│   │       └── ProductTable.vue
│   │
│   ├── views/               # Pagine/Route
│   │   ├── Home.vue
│   │   ├── Categories.vue
│   │   ├── CategoryDetail.vue
│   │   ├── Products.vue
│   │   ├── About.vue
│   │   └── Contacts.vue
│   │
│   ├── stores/              # Store Pinia
│   │   └── productsStore.js
│   │
│   ├── router/              # Configurazione routing
│   │   └── index.js
│   │
│   ├── styles/              # Stili globali
│   │   └── main.scss
│   │
│   ├── utils/               # Utility functions
│   │   └── imageHelper.js
│   │
│   ├── App.vue              # Componente root
│   └── main.js              # Entry point
│
├── index.html               # HTML template
├── package.json             # Dipendenze
├── vite.config.js           # Configurazione Vite
└── README.md                # Documentazione

```

---

## 🚀 Setup Iniziale

### 1. Installazione Dipendenze

```bash
npm install
```

### 2. Avvio Server di Sviluppo

```bash
npm run dev
```

Il sito sarà disponibile su `http://localhost:3000`

### 3. Build per Produzione

```bash
npm run build
```

I file ottimizzati saranno generati nella cartella `dist/`

### 4. Preview Build di Produzione

```bash
npm run preview
```

---

## 🏗️ Architettura

### Composition API

Il progetto utilizza la **Composition API** di Vue 3 per una migliore organizzazione del codice:

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
</script>
```

### Component-Based Architecture

Ogni componente è auto-contenuto e riutilizzabile:

```
View (Pagina)
  └── Layout Components (Navbar, Footer)
  └── Feature Components (CategoryCard, ProductTable)
      └── Common Components (ImageGallery)
```

---

## 🧩 Componenti

### Layout Components

#### **Navbar.vue**
Navigazione principale con:
- Logo cliccabile
- Menu responsive
- Hamburger menu per mobile
- Link attivi evidenziati

#### **Footer.vue**
Footer con:
- Informazioni contatto
- Orari apertura
- Link rapidi
- Social media

### Product Components

#### **CategoryCard.vue**
Card per visualizzare categorie:
```vue
<CategoryCard :category="category" />
```

Props:
- `category`: Object con id, nome, descrizione, icon, images

#### **ProductTable.vue**
Tabella prodotti con funzionalità:
- Ricerca full-text
- Filtro disponibilità
- Ordinamento multiplo
- Responsive

```vue
<ProductTable :products="products" />
```

Props:
- `products`: Array di prodotti

#### **ImageGallery.vue**
Galleria immagini con:
- Immagine principale
- Thumbnails cliccabili
- Navigazione prev/next
- Placeholder automatici

```vue
<ImageGallery 
  :images="['img1.jpg', 'img2.jpg']"
  title="Galleria"
/>
```

---

## 🗃️ Store Pinia

### productsStore.js

Store centralizzato per categorie e prodotti.

#### State
```javascript
const categories = ref([...])  // Lista categorie
const products = ref([...])    // Lista prodotti
```

#### Getters
```javascript
allCategories          // Tutte le categorie
allProducts           // Tutti i prodotti
getCategoryById       // Categoria per ID
getProductsByCategory // Prodotti per categoria
availableProducts     // Solo prodotti disponibili
productStats          // Statistiche (count, etc)
```

#### Actions
```javascript
filterProductsByName(searchTerm)  // Filtra per nome
sortProductsByPrice(ascending)    // Ordina per prezzo
```

### Utilizzo nello Store

```vue
<script setup>
import { useProductsStore } from '@/stores/productsStore'

const store = useProductsStore()
const categories = store.allCategories
const products = store.getProductsByCategory(1)
</script>
```

---

## 🗺️ Routing

### Route Disponibili

| Path | Component | Descrizione |
|------|-----------|-------------|
| `/` | Home.vue | Homepage |
| `/categorie` | Categories.vue | Lista categorie |
| `/categorie/:id` | CategoryDetail.vue | Dettaglio categoria |
| `/listino` | Products.vue | Listino completo |
| `/chi-siamo` | About.vue | Chi siamo |
| `/contatti` | Contacts.vue | Contatti |

### Navigazione Programmatica

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToCategory = (id) => {
  router.push(`/categorie/${id}`)
}
</script>
```

### Route Params

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const categoryId = route.params.id
</script>
```

---

## 🖼️ Gestione Immagini

### Struttura Immagini

Organizza le immagini in `public/images/`:

```
public/
└── images/
    ├── categories/
    │   ├── frutta-1.jpg
    │   ├── verdura-1.jpg
    │   └── ...
    ├── about/
    │   ├── negozio-1.jpg
    │   └── ...
    └── hero-bg.jpg
```

### Utilizzo nel Codice

#### 1. Percorso Diretto
```vue
<img src="/images/categories/frutta-1.jpg" alt="Frutta">
```

#### 2. Tramite Store
```javascript
// In productsStore.js
{
  id: 1,
  nome: 'Frutta',
  images: [
    '/images/categories/frutta-1.jpg',
    '/images/categories/frutta-2.jpg'
  ]
}
```

#### 3. Placeholder Automatici
Le immagini mancanti mostrano automaticamente un placeholder SVG.

### Ottimizzazione Immagini

Per immagini web:
- **Formato**: WebP o JPEG
- **Dimensioni**: Max 1920px larghezza
- **Compressione**: 70-85% qualità
- **Nome**: descrittivo (es. `mele-golden-fresco.jpg`)

---

## 🎨 Personalizzazione

### Colori e Temi

Modifica le variabili SCSS in `src/styles/main.scss`:

```scss
$primary-color: #4caf50;      // Verde principale
$primary-dark: #2c5f2d;       // Verde scuro
$secondary-color: #ff9800;    // Arancione
```

### Logo

Sostituisci l'emoji nel Navbar con un'immagine:

```vue
<!-- In Navbar.vue -->
<RouterLink to="/" class="logo">
  <img src="/logo.png" alt="Logo" class="logo-image" />
  <span class="logo-text">Ortofrutta</span>
</RouterLink>
```

### Dati

#### Aggiungere una Categoria

In `src/stores/productsStore.js`:

```javascript
categories.value.push({
  id: 7,
  nome: 'Nuova Categoria',
  slug: 'nuova-categoria',
  descrizione: 'Descrizione...',
  icon: '🥬',
  images: ['/images/...']
})
```

#### Aggiungere un Prodotto

```javascript
products.value.push({
  id: 37,
  categoryId: 1,
  nome: 'Nuovo Prodotto',
  provenienza: 'Italia',
  stagionalita: 'Tutto l\'anno',
  prezzoKg: 3.50,
  disponibile: true
})
```

### Contatti

Modifica le informazioni in `src/views/Contacts.vue`:

```vue
<p>
  Via della Frutta, 123<br>
  00100 Roma (RM)<br>
  Italia
</p>
```

---

## 🚀 Deployment

### Netlify

1. Connetti il repository GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Vercel

```bash
npm install -g vercel
vercel
```

### Hosting Tradizionale (cPanel, etc)

1. Build: `npm run build`
2. Carica la cartella `dist/` via FTP
3. Configura il server per SPA (redirect a index.html)

#### Configurazione .htaccess (Apache)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔌 Integrazione Backend

### API REST

Esempio integrazione con backend:

```javascript
// src/services/api.js
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

// Funzioni API
export const fetchCategories = () => api.get('/categories')
export const fetchProducts = () => api.get('/products')
export const submitContactForm = (data) => api.post('/contact', data)
```

Modifica lo store per usare l'API:

```javascript
// In productsStore.js
import { fetchCategories, fetchProducts } from '@/services/api'

export const useProductsStore = defineStore('products', () => {
  const categories = ref([])
  const products = ref([])
  const loading = ref(false)
  
  const loadCategories = async () => {
    loading.value = true
    try {
      const response = await fetchCategories()
      categories.value = response.data
    } catch (error) {
      console.error('Errore caricamento categorie:', error)
    } finally {
      loading.value = false
    }
  }
  
  return { categories, products, loading, loadCategories }
})
```

---

## ❓ FAQ

### Come aggiungo nuove pagine?

1. Crea il componente in `src/views/NuovaPagina.vue`
2. Aggiungi la route in `src/router/index.js`
3. Aggiungi il link nel Navbar

### Come cambio i colori del sito?

Modifica le variabili in `src/styles/main.scss`

### Posso usare TypeScript?

Sì! Rinomina i file `.js` in `.ts` e installa:
```bash
npm install -D typescript @types/node
```

### Come aggiungo Google Analytics?

```javascript
// In main.js
import VueGtag from 'vue-gtag'

app.use(VueGtag, {
  config: { id: 'GA_MEASUREMENT_ID' }
})
```

### Come gestisco i form di contatto?

Puoi usare:
- **Formspree** (semplice, no backend)
- **Netlify Forms** (se su Netlify)
- **EmailJS** (invio email frontend)
- **Backend custom** (Node.js, PHP, etc)

### Performance - Best Practices

- ✅ Lazy loading delle route (già implementato)
- ✅ Componenti on-demand
- ✅ Immagini ottimizzate (WebP, compresse)
- ✅ Code splitting automatico di Vite
- ✅ Minification in produzione

---

## 📞 Supporto

Per domande o problemi:
- Consulta la [documentazione Vue 3](https://vuejs.org/)
- Consulta la [documentazione Vite](https://vitejs.dev/)
- Consulta la [documentazione Pinia](https://pinia.vuejs.org/)

---

## 📝 Note Finali

Questo progetto è completamente funzionale e pronto per essere personalizzato. I dati mock possono essere facilmente sostituiti con chiamate API reali.

**Prossimi Passi Consigliati:**
1. Sostituire i placeholder con immagini reali
2. Personalizzare colori e branding
3. Aggiungere contenuti reali (testi, prodotti)
4. Integrare con backend (se necessario)
5. Configurare analytics e SEO
6. Testing su dispositivi reali
7. Deploy su hosting

Buon sviluppo! 🚀
