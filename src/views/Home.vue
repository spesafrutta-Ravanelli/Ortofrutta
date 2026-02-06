<template>
  <div class="home">
    <!-- Banner Scorrevole -->
    <div class="scrolling-banner">
      <div class="banner-content">
        <span v-for="n in 10" :key="n" class="banner-text">
          🚚 Consegna a domicilio 🚚 Consegna a domicilio
        </span>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="accent">🍎</span>
              Freschezza e Qualità
              <span class="highlight">dall'inizio anni '50</span>
            </h1>
            <p class="hero-description">
              Scopri la nostra selezione di frutta e verdura fresca, prodotti biologici 
              e specialità ortofrutticole. Qualità garantita ogni giorno.
            </p>
            <div class="hero-buttons">
              <RouterLink to="/offerte" class="btn btn-offerte">
                🎉 Vedi Offerte
              </RouterLink>
              <RouterLink to="/categorie" class="btn btn-primary">
                Esplora Categorie
              </RouterLink>
              <RouterLink to="/listino" class="btn btn-secondary">
                Vedi Listino
              </RouterLink>
            </div>
          </div>
          
          <!-- Immagine Hero -->
          <div class="hero-image">
            <img 
              src="/images/products/foto-banchi.jpg"
              alt="Frutta e Verdura Fresca"
              @error="handleImageError"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Slider Immagini Banco - Sezione Bianca -->
    <section class="banco-slider-section">
      <div class="container">
        <div class="slider-wrapper">
          <div class="slider-container">
            <!-- Immagini -->
            <div 
              v-for="(image, index) in heroImages" 
              :key="index"
              class="slide"
              :class="{ active: currentSlide === index }"
            >
              <img 
                :src="image.src"
                :alt="image.alt"
                @error="handleImageError"
              />
            </div>
            
            <!-- Controlli Navigazione -->
            <button class="slider-btn prev" @click="prevSlide" aria-label="Immagine precedente">
              ‹
            </button>
            <button class="slider-btn next" @click="nextSlide" aria-label="Immagine successiva">
              ›
            </button>
            
            <!-- Indicatori -->
            <div class="slider-dots">
              <button 
                v-for="(image, index) in heroImages" 
                :key="index"
                class="dot"
                :class="{ active: currentSlide === index }"
                @click="goToSlide(index)"
                :aria-label="`Vai all'immagine ${index + 1}`"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">{{ productStats.categories }}</div>
            <div class="stat-label">Categorie</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ productStats.total }}</div>
            <div class="stat-label">Prodotti</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ productStats.available }}</div>
            <div class="stat-label">Disponibili</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">75+</div>
            <div class="stat-label">Anni di Esperienza</div>
          </div>
        </div>
      </div>
    </section>

    <!-- I Nostri Prodotti - Stagionalità -->
    <section class="seasonal-products">
      <div class="container">
        <h2 class="section-title">I Nostri Prodotti</h2>
        <p class="section-description">
          Selezioniamo i migliori prodotti di stagione per garantirti freschezza e qualità
        </p>

        <div class="seasonal-grid">
          <div 
            v-for="season in seasons" 
            :key="season.id"
            class="season-card"
            @click="goToSeason(season)"
          >
            <div class="season-icon">{{ season.icon }}</div>
            <h3>{{ season.nome }}</h3>
            <p>{{ season.descrizione }}</p>
            <div class="season-months">{{ season.mesi }}</div>
            <span class="season-arrow">→</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/productsStore'

const router = useRouter()
const store = useProductsStore()

const productStats = computed(() => store.productStats)

// Stagioni - I Nostri Prodotti
const seasons = ref([
  {
    id: 1,
    nome: 'Prodotti Invernali',
    icon: '❄️',
    descrizione: 'Arance, mandarini, cavolfiori, broccoli e tutta la freschezza dell\'inverno',
    mesi: 'Dicembre - Febbraio',
    slug: 'inverno'
  },
  {
    id: 2,
    nome: 'Prodotti Primaverili',
    icon: '🌸',
    descrizione: 'Fragole, asparagi, piselli, fave e i primi sapori della primavera',
    mesi: 'Marzo - Maggio',
    slug: 'primavera'
  },
  {
    id: 3,
    nome: 'Prodotti Estivi',
    icon: '☀️',
    descrizione: 'Pomodori, peperoni, meloni, angurie e tutta la varietà dell\'estate',
    mesi: 'Giugno - Agosto',
    slug: 'estate'
  },
  {
    id: 4,
    nome: 'Prodotti Autunnali',
    icon: '🍂',
    descrizione: 'Uva, funghi, zucche, castagne e i colori caldi dell\'autunno',
    mesi: 'Settembre - Novembre',
    slug: 'autunno'
  }
])

const goToSeason = (season) => {
  // Vai alla pagina della stagione specifica
  router.push(`/stagione/${season.slug}`)
}

// Slider Hero Images
const heroImages = ref([
  { src: '/images/slider-banco1.jpg', alt: 'Banco Ortofrutta - Foto Banco 1' },
  { src: '/images/featured-ortofrutta.jpg.jpeg', alt: 'Banco Scarenna - Prodotti Freschi' }
])

const currentSlide = ref(0)
let slideInterval = null

// Funzioni Slider
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % heroImages.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 
    ? heroImages.value.length - 1 
    : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

// Auto-scroll ogni 5 secondi
const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    nextSlide()
  }, 5000) // Cambia ogni 5 secondi
}

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
}

// Lifecycle hooks
onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})

// Handler per errori immagini
const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23f0f0f0" width="800" height="600"/%3E%3Ctext fill="%234caf50" font-family="Arial" font-size="40" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E🍎 Immagine in arrivo%3C/text%3E%3C/svg%3E'
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
}

/* Banner Scorrevole */
.scrolling-banner {
  background: linear-gradient(90deg, #4caf50, #2c5f2d, #4caf50);
  color: white;
  padding: 1rem 0;
  overflow: hidden;
  position: relative;
  margin-bottom: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  .banner-content {
    display: flex;
    white-space: nowrap;
    animation: scroll 30s linear infinite;
  }

  .banner-text {
    padding: 0 2rem;
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  &:hover .banner-content {
    animation-play-state: paused;
  }
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #2c5f2d 0%, #4caf50 100%);
  color: white;
  padding: 4rem 0;
  margin-bottom: 3rem;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .hero-text {
    text-align: left;
  }

  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;

    .accent {
      display: block;
      font-size: 4rem;
      margin-bottom: 0.5rem;
    }

    .highlight {
      color: #fff3cd;
    }
  }

  .hero-description {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    opacity: 0.95;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .hero-image {
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
      width: 100%;
      height: auto;
      max-width: 500px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease;
      object-fit: cover;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

/* Slider Banco - Sezione Bianca */
.banco-slider-section {
  padding: 0 0 3rem;
  margin-bottom: 2rem;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .slider-wrapper {
    max-width: 1000px;
    margin: 0 auto;
  }

  .slider-container {
    position: relative;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }

  .slide {
    display: none;
    width: 100%;
    
    &.active {
      display: block;
      animation: fadeIn 0.8s ease-in-out;
    }

    img {
      width: 100%;
      height: auto;
      max-height: 600px;
      object-fit: cover;
      display: block;
    }
  }

  .slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    color: #2c5f2d;
    border: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 2.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    &:hover {
      background: white;
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    &.prev {
      left: 20px;
    }

    &.next {
      right: 20px;
    }
  }

  .slider-dots {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    z-index: 10;

    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      border: 2px solid white;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

      &:hover {
        background: rgba(255, 255, 255, 0.8);
        transform: scale(1.2);
      }

      &.active {
        background: white;
        transform: scale(1.4);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

/* Stats Section */
.stats {
  padding: 2rem 0;
  margin-bottom: 3rem;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .stat-card {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      color: #4caf50;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #666;
      font-size: 1rem;
      font-weight: 500;
    }
  }
}

/* Sezione Prodotti Stagionali */
.seasonal-products {
  padding: 3rem 0;
  margin-bottom: 3rem;
  background: white;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .seasonal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .season-card {
    background: linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%);
    padding: 2.5rem 2rem;
    border-radius: 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #4caf50, #2c5f2d);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(76, 175, 80, 0.2);
      border-color: #4caf50;

      &::before {
        transform: scaleX(1);
      }

      .season-icon {
        transform: scale(1.2) rotate(10deg);
      }

      .season-arrow {
        transform: translateX(5px);
        opacity: 1;
      }
    }

    .season-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      display: block;
      transition: transform 0.3s ease;
    }

    h3 {
      font-size: 1.4rem;
      color: #2c5f2d;
      margin-bottom: 0.75rem;
      font-weight: 700;
    }

    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }

    .season-months {
      background: #4caf50;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      display: inline-block;
      margin-top: 0.5rem;
    }

    .season-arrow {
      position: absolute;
      bottom: 1.5rem;
      right: 1.5rem;
      font-size: 1.5rem;
      color: #4caf50;
      opacity: 0;
      transition: all 0.3s ease;
    }
  }
}


/* Common Styles */
.section-title {
  font-size: 2.5rem;
  color: #2c5f2d;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-description {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.text-center {
  text-align: center;
  margin-top: 2rem;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;

  &.btn-offerte {
    background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
    animation: pulse 2s infinite;

    &:hover {
      background: linear-gradient(135deg, #ffb300 0%, #f57c00 100%);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 6px 20px rgba(255, 152, 0, 0.5);
    }
  }

  &.btn-primary {
    background: #4caf50;
    color: white;

    &:hover {
      background: #45a049;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
  }

  &.btn-secondary {
    background: white;
    color: #4caf50;
    border-color: white;

    &:hover {
      background: transparent;
      color: white;
    }
  }

  &.btn-outline {
    background: transparent;
    color: #4caf50;
    border-color: #4caf50;

    &:hover {
      background: #4caf50;
      color: white;
    }
  }

  &.btn-large {
    padding: 1rem 3rem;
    font-size: 1.1rem;
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(255, 152, 0, 0.5);
  }
}

/* Responsive - Tablet */
@media (max-width: 1024px) and (min-width: 769px) {
  .hero {
    padding: 3.5rem 0;

    .hero-content {
      gap: 2.5rem;
    }

    .hero-title {
      font-size: 2.5rem;
    }
  }

  .seasonal-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Responsive - Mobile */
@media (max-width: 768px) {
  .scrolling-banner {
    padding: 0.75rem 0;

    .banner-text {
      font-size: 1rem;
      padding: 0 1.5rem;
    }
  }

  .hero {
    padding: 3rem 0;

    .hero-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .hero-text {
      text-align: center;
    }

    .hero-title {
      font-size: 2rem;

      .accent {
        font-size: 3rem;
      }
    }

    .hero-description {
      font-size: 1rem;
    }

    .hero-buttons {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .btn {
        width: 100%;
        max-width: 300px;
      }
    }

    .hero-image {
      img {
        max-width: 100%;
      }
    }
  }

  .banco-slider-section {
    .slider-btn {
      width: 45px;
      height: 45px;
      font-size: 1.8rem;

      &.prev {
        left: 10px;
      }

      &.next {
        right: 10px;
      }
    }

    .slider-dots {
      bottom: 15px;
      gap: 8px;

      .dot {
        width: 10px;
        height: 10px;
      }
    }
  }

  .section-title {
    font-size: 2rem;
  }

  .seasonal-products {
    .seasonal-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .season-card {
      padding: 2rem 1.5rem;

      .season-icon {
        font-size: 3rem;
      }

      h3 {
        font-size: 1.2rem;
      }
    }
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-card {
    padding: 1.5rem 1rem;

    .stat-number {
      font-size: 2.5rem;
    }

    .stat-label {
      font-size: 0.9rem;
    }
  }
}

/* Responsive - Mobile molto piccolo */
@media (max-width: 480px) {
  .scrolling-banner {
    .banner-text {
      font-size: 0.9rem;
      padding: 0 1rem;
    }
  }

  .hero {
    padding: 2rem 0;

    .hero-title {
      font-size: 1.75rem;

      .accent {
        font-size: 2.5rem;
      }
    }

    .hero-description {
      font-size: 0.95rem;
    }

    .hero-buttons {
      .btn {
        width: 100%;
        min-height: 44px; // Touch target minimo
        font-size: 1rem;
      }
    }
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.75rem;
  }
}
</style>
