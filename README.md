# 🍎 Ortofrutticola Golosello Ravanelli & Carminati - Sito Web

Sito web moderno per rivendita ortofrutticola realizzato con Vue 3, Vite, Pinia e Vue Router.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TUO-USERNAME/ortofrutta)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TUO-USERNAME/ortofrutta)

## 🚀 Stack Tecnologico

- **Vue 3** - Framework JavaScript progressivo con Composition API
- **Vite** - Build tool veloce e moderno  
- **Pinia** - State management ufficiale per Vue 3
- **Vue Router** - Router ufficiale per navigazione SPA
- **SCSS** - Preprocessore CSS per stili modulari

## ✨ Features Principali

- 🛒 **Pannello Admin** - Gestione prodotti con modalità admin/pubblica
- 📄 **Generatore Volantini A5** - Crea volantini stampabili per promozioni
- 📱 **Responsive Design** - Ottimizzato per desktop, tablet e mobile
- 🎨 **Design Moderno** - UI pulita e professionale
- ⚡ **Performance Ottimizzate** - Lazy loading, code splitting, compressione
- 🔍 **SEO Ready** - Meta tags, sitemap, structured data

## 📁 Struttura del Progetto

```
src/
├── assets/          # Immagini, font e risorse statiche
├── components/      # Componenti riutilizzabili
│   ├── layout/      # Navbar, Footer
│   ├── products/    # CategoryCard, ProductTable
│   └── common/      # ImageGallery, componenti comuni
├── views/           # Pagine/Route principali
├── stores/          # Store Pinia
├── router/          # Configurazione Vue Router
├── styles/          # Stili globali SCSS
└── main.js          # Entry point applicazione
```

## 🛠️ Setup e Installazione

### Prerequisiti
- Node.js 18+ 
- npm o yarn

### Installazione Locale

```bash
# Clona il repository
git clone https://github.com/TUO-USERNAME/ortofrutta.git
cd ortofrutta

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
# Il sito sarà disponibile su http://localhost:3002

# Build per produzione
npm run build

# Preview build di produzione  
npm run preview
```

### 🌐 Deploy Online

Vedi la guida completa in [DEPLOYMENT_COMPLETO.md](./DEPLOYMENT_COMPLETO.md)

**Quick Deploy:**
- **Vercel** (Consigliato): Connetti il repo GitHub, deploy automatico
- **Netlify**: Import da GitHub, build automatico
- **GitHub Pages**: Configurato con GitHub Actions

## 📄 Pagine e Funzionalità

### Pagine Pubbliche
- **Home** (`/`) - Presentazione attività, categorie in evidenza, prodotti di stagione
- **Categorie** (`/categorie`) - Esplora frutta e verdura per categoria
- **Dettaglio Categoria** (`/categoria/:slug`) - Prodotti specifici della categoria
- **Prodotti di Stagione** (`/stagione/:id`) - Prodotti filtrati per stagionalità
- **Listino** (`/listino`) - Tabella completa prodotti con filtri e ricerca
- **Chi Siamo** (`/chi-siamo`) - Storia e valori dell'azienda
- **Dove Siamo** (`/dove-siamo`) - Mercati e punti vendita con mappa
- **Prenota Qui** (`/prenota-qui`) - Form prenotazione prodotti
- **Contatti** (`/contatti`) - Informazioni di contatto e modulo

### Funzionalità Admin
- **Pannello Admin** (`/admin`) - Gestione prodotti con doppia modalità:
  - 👁️ Modalità Visualizzazione (preview pubblica)
  - 🔧 Modalità Admin (edit prodotti inline, aggiungi/elimina)
- **Generatore Volantini** - Crea volantini A5 stampabili con:
  - Aggiunta multipla prodotti
  - Upload immagini
  - Anteprima tempo reale
  - Stampa diretta formato A5

## 🎨 Caratteristiche Tecniche

### Frontend
- ✅ Architettura component-based scalabile
- ✅ State management centralizzato con Pinia
- ✅ Routing dinamico con Vue Router
- ✅ Design responsive mobile-first
- ✅ Lazy loading immagini e route
- ✅ Code splitting automatico
- ✅ Animazioni CSS fluide
- ✅ Form validation

### Admin Panel
- ✅ Gestione prodotti CRUD completa
- ✅ Edit inline dei prodotti
- ✅ Validazione dati
- ✅ LocalStorage per persistenza
- ✅ Modal di conferma eliminazione
- ✅ Indicatori stock (scorte basse/esaurito)
- ✅ Toggle modalità admin/visualizzazione

### Performance
- ✅ Build ottimizzato con Vite
- ✅ Compressione asset
- ✅ Tree shaking
- ✅ CSS minificato
- ✅ Immagini ottimizzate

## 📦 Gestione Dati

### Store Pinia
- `productsStore.js` - Gestione prodotti (1000+ prodotti)
  - Categorie (Frutta, Verdura, Prodotti Speciali)
  - Stagionalità
  - Prezzi e disponibilità
  - Descrizioni dettagliate

### Dati Admin
- LocalStorage per persistenza dati admin panel
- Sincronizzazione automatica
- Backup/restore incluso

## 🔧 Sviluppo

### Best Practices
- Composition API di Vue 3
- Component modulari e riutilizzabili
- Codice commentato e documentato
- Naming convention consistenti
- SCSS con variabili per temi

### Struttura Componenti
```
components/
├── layout/
│   ├── Navbar.vue
│   └── Footer.vue
├── products/
│   ├── CategoryCard.vue
│   ├── ProductTable.vue
│   └── ProductCard.vue
└── common/
    └── ImageGallery.vue
```

## 📚 Documentazione

- [DEPLOYMENT_COMPLETO.md](./DEPLOYMENT_COMPLETO.md) - Guida deployment completa
- [VOLANTINO_ADMIN_GUIDA.md](./VOLANTINO_ADMIN_GUIDA.md) - Guida pannello admin e volantini
- [LISTINO_GUIDA.md](./LISTINO_GUIDA.md) - Guida gestione listino prodotti
- [IMMAGINI_GUIDA.md](./IMMAGINI_GUIDA.md) - Guida aggiunta immagini

## 🐛 Troubleshooting

### Server non parte (EPERM Error)
```bash
# Soluzione 1: Esegui come amministratore
# Soluzione 2: Reinstalla dipendenze
Remove-Item -Recurse -Force node_modules
npm install
```

### Volantino non si apre
- Verifica che `src/stores/volantino.html` esista
- Usa il link alternativo nel pannello admin
- Controlla i popup blocker del browser

## 🤝 Contributi

Per contribuire al progetto:
1. Fork del repository
2. Crea un branch per la feature (`git checkout -b feature/nome-feature`)
3. Commit delle modifiche (`git commit -m 'Add: nuova feature'`)
4. Push al branch (`git push origin feature/nome-feature`)
5. Apri una Pull Request

## 📝 License

Questo progetto è privato e proprietario di Ortofrutticola Golosello Ravanelli & Carminati.

## 📞 Contatti

**Ortofrutticola Golosello Ravanelli & Carminati**  
📱 WhatsApp: +39 375 680 4525  
📧 Email: info@ortofruttaravanelli.it  
🌐 Web: [In arrivo]

---

Sviluppato con ❤️ per Ortofrutticola Golosello Ravanelli & Carminati  
**Versione:** 1.0.0  
**Data:** Gennaio 2026
