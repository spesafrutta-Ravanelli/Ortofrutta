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
              <RouterLink to="/offerte" class="btn btn-offerte">🎉 Vedi Offerte</RouterLink>
              <RouterLink to="/categorie" class="btn btn-primary">Esplora Categorie</RouterLink>
              <RouterLink to="/listino" class="btn btn-secondary">Vedi Listino</RouterLink>
            </div>
          </div>

          <!-- Hero Media -->
          <div class="hero-image">

            <!-- Skeleton -->
            <div v-if="heroVideoLoading" class="hero-media-skeleton" />

            <!-- VIDEO -->
            <template v-else-if="heroVideo">
              <video
                ref="heroVideoEl"
                class="hero-video"
                autoplay
                muted
                loop
                playsinline
                webkit-playsinline
                preload="metadata"
                :src="heroVideo.url"
                :title="heroVideo.title || 'Video Golosello'"
                @error="handleVideoError"
                @canplay="onHeroVideoReady"
                @loadeddata="onHeroVideoReady"
              />
              <!-- Pulsante Audio -->
              <button class="audio-btn" @click="toggleAudio" :title="isMuted ? 'Attiva audio' : 'Disattiva audio'">
                {{ isMuted ? '🔇' : '🔊' }}
              </button>
            </template>

            <!-- IMMAGINE fallback -->
            <img
              v-else
              :src="heroFallbackImg"
              alt="Frutta e Verdura Fresca"
              @error="handleImageError"
            />

          </div>
        </div>
      </div>
    </section>

    <!-- ▶️ Pannello Admin Video Hero (visibile solo in modalità admin) -->
    <section v-if="isAdminMode" class="admin-video-section">
      <div class="container">
        <HeroVideoAdmin />
      </div>
    </section>

    <!-- Slider Immagini Banco -->
    <section class="banco-slider-section">
      <div class="container">
        <div class="slider-wrapper">
          <div class="slider-container">
            <div
              v-for="(image, index) in heroImages"
              :key="index"
              class="slide"
              :class="{ active: currentSlide === index }"
            >
              <img :src="image.src" :alt="image.alt" @error="handleImageError" />
            </div>
            <button class="slider-btn prev" @click="prevSlide" aria-label="Immagine precedente">‹</button>
            <button class="slider-btn next" @click="nextSlide" aria-label="Immagine successiva">›</button>
            <div class="slider-dots">
              <button
                v-for="(image, index) in heroImages"
                :key="index"
                class="dot"
                :class="{ active: currentSlide === index }"
                @click="goToSlide(index)"
                :aria-label="`Vai all'immagine ${index + 1}`"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
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

    <!-- Stagioni -->
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/productsStore'
import { useAdmin } from '@/composables/useAdmin'
import { useHeroVideo } from '@/composables/useHeroVideo'
import HeroVideoAdmin from '@/components/common/HeroVideoAdmin.vue'

const router = useRouter()
const store  = useProductsStore()

const productStats = computed(() => store.productStats)

// ─── Admin mode globale ────────────────────────────────────────────────────────
const { isAdminMode } = useAdmin()

// ─── Hero Video (real-time da Firestore) ──────────────────────────────────────
const { heroVideo, loading: heroVideoLoading } = useHeroVideo()

// ─── Audio toggle ──────────────────────────────────────────────────────────────
const heroVideoEl = ref(null)   // ref al tag <video>
const isMuted     = ref(true)   // parte sempre muto (autoplay richiede muted)

const toggleAudio = () => {
  if (!heroVideoEl.value) return
  isMuted.value              = !isMuted.value
  heroVideoEl.value.muted    = isMuted.value
}

/** Safari iOS: autoplay muted richiede spesso play() dopo il load; senza resta schermo nero */
const tryPlayHeroVideo = () => {
  const el = heroVideoEl.value
  if (!el) return
  el.muted = true
  const p = el.play()
  if (p && typeof p.catch === 'function') p.catch(() => {})
}

const onHeroVideoReady = () => {
  tryPlayHeroVideo()
}

watch(
  () => heroVideo.value?.url,
  async () => {
    await nextTick()
    tryPlayHeroVideo()
  }
)

// ─── Fallback immagine ────────────────────────────────────────────────────────
const heroFallbackImg = '/images/products/foto-banchi.webp'

// ─── Stagioni ──────────────────────────────────────────────────────────────────
const seasons = ref([
  { id: 1, nome: 'Prodotti Invernali',   icon: '❄️', descrizione: 'Arance, mandarini, cavolfiori, broccoli e tutta la freschezza dell\'inverno', mesi: 'Dicembre - Febbraio',   slug: 'inverno'   },
  { id: 2, nome: 'Prodotti Primaverili', icon: '🌸', descrizione: 'Fragole, asparagi, piselli, fave e i primi sapori della primavera',            mesi: 'Marzo - Maggio',       slug: 'primavera' },
  { id: 3, nome: 'Prodotti Estivi',      icon: '☀️', descrizione: 'Pomodori, peperoni, meloni, angurie e tutta la varietà dell\'estate',           mesi: 'Giugno - Agosto',      slug: 'estate'    },
  { id: 4, nome: 'Prodotti Autunnali',   icon: '🍂', descrizione: 'Uva, funghi, zucche, castagne e i colori caldi dell\'autunno',                  mesi: 'Settembre - Novembre', slug: 'autunno'   },
])

const goToSeason = (season) => router.push(`/stagione/${season.slug}`)

// ─── Slider ────────────────────────────────────────────────────────────────────
const heroImages = ref([
  { src: '/images/slider-banco1.webp',        alt: 'Banco Ortofrutta - Foto Banco 1'   },
  { src: '/images/featured-ortofrutta.webp',  alt: 'Banco Scarenna - Prodotti Freschi' },
])

const currentSlide  = ref(0)
let   slideInterval = null

const nextSlide      = () => { currentSlide.value = (currentSlide.value + 1) % heroImages.value.length }
const prevSlide      = () => { currentSlide.value = currentSlide.value === 0 ? heroImages.value.length - 1 : currentSlide.value - 1 }
const goToSlide      = (i) => { currentSlide.value = i }
const startAutoSlide = () => { slideInterval = setInterval(nextSlide, 5000) }
const stopAutoSlide  = () => { if (slideInterval) clearInterval(slideInterval) }

onMounted(()   => startAutoSlide())
onUnmounted(() => stopAutoSlide())

// ─── Error handlers ────────────────────────────────────────────────────────────
const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23f0f0f0" width="800" height="600"/%3E%3Ctext fill="%234caf50" font-family="Arial" font-size="40" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E🍎 Immagine in arrivo%3C/text%3E%3C/svg%3E'
}

const handleVideoError = (e) => {
  console.warn('[Hero] Errore caricamento video:', e)
  e.target.style.display = 'none'
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Banner: contenitore blocca larghezza intrinseca del testo ripetuto (evita scroll orizzontale pagina) */
.scrolling-banner {
  width: 100%;
  max-width: 100%;
  background: linear-gradient(90deg, #4caf50, #2c5f2d, #4caf50);
  color: white;
  padding: 0.65rem 0;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  contain: content;

  .banner-content {
    display: flex;
    width: max-content;
    white-space: nowrap;
    animation: scroll 30s linear infinite;
    will-change: transform;
  }

  .banner-text {
    flex-shrink: 0;
    padding: 0 clamp(0.75rem, 4vw, 2rem);
    font-size: clamp(0.75rem, 3.2vw, 1.1rem);
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  @keyframes scroll {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
  }

  &:hover .banner-content { animation-play-state: paused; }
}

/* Hero */
.hero {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background: linear-gradient(135deg, #2c5f2d 0%, #4caf50 100%);
  color: white;
  padding: clamp(1.5rem, 5vw, 4rem) 0;
  margin-bottom: 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(0.65rem, 4vw, 2rem);
    width: 100%;
    box-sizing: border-box;
  }

  .hero-content {
    display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1.5rem, 4vw, 3rem); align-items: center;
  }

  .hero-text {
    text-align: left;
    min-width: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .hero-title {
    font-size: clamp(1.35rem, 5.5vw, 3rem);
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.15;
    .accent {
      display: block;
      font-size: clamp(2rem, 10vw, 4rem);
      margin-bottom: 0.35rem;
      line-height: 1;
    }
    .highlight { color: #fff3cd; display: inline-block; }
  }

  .hero-description { font-size: clamp(1rem, 2vw, 1.2rem); line-height: 1.8; margin-bottom: 2rem; opacity: 0.95; }
  .hero-buttons     { display: flex; gap: 0.75rem 1rem; flex-wrap: wrap; }

  .hero-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    min-width: 0;

    img,
    .hero-video {
      width: 100%;
      max-width: min(500px, 100%);
      height: auto;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      transition: transform 0.3s ease;
      object-fit: cover;
      display: block;
      &:hover { transform: scale(1.02); }
    }

    .hero-video { height: auto; aspect-ratio: 16 / 9; background: #000; }

    /* Pulsante Audio — sovrapposto in basso a destra */
    .audio-btn {
      position: absolute;
      bottom: 14px;
      right: 14px;
      width: 42px; height: 42px;
      background: rgba(0,0,0,0.55);
      border: none; border-radius: 50%;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(4px);
      transition: background 0.25s, transform 0.2s;
      z-index: 10;
      &:hover { background: rgba(0,0,0,0.8); transform: scale(1.1); }
    }

    .hero-media-skeleton {
      width: 100%; max-width: 500px; aspect-ratio: 16 / 9; border-radius: 20px;
      background: linear-gradient(90deg, rgba(255,255,255,0.10) 25%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.10) 75%);
      background-size: 200% 100%; animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  }
}

/* Admin video section */
.admin-video-section {
  background: #f0f7f0; border-top: 3px solid #4caf50; border-bottom: 3px solid #4caf50;
  padding: 2rem 0; margin-bottom: 3rem;
  .container { max-width: 1200px; margin: 0 auto; padding: 0 clamp(0.75rem, 3vw, 2rem); }
}

/* Slider */
.banco-slider-section {
  padding: 0 0 3rem; margin-bottom: 2rem;
  .container      { max-width: 1200px; margin: 0 auto; padding: 0 clamp(0.75rem, 3vw, 2rem); }
  .slider-wrapper { max-width: 1000px; margin: 0 auto; }
  .slider-container { position: relative; width: 100%; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); background: #f5f5f5; aspect-ratio: 16 / 9; }
  .slide { position: absolute; inset: 0; opacity: 0; transition: opacity 0.8s ease-in-out; &.active { opacity: 1; } img { width: 100%; height: 100%; object-fit: cover; } }
  .slider-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 55px; height: 55px; font-size: 2rem; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: all 0.3s ease; color: #2c5f2d; &:hover { background: white; transform: translateY(-50%) scale(1.1); } &.prev { left: 20px; } &.next { right: 20px; } }
  .slider-dots { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; z-index: 10; .dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.6); border: none; cursor: pointer; transition: all 0.3s ease; &.active { background: white; transform: scale(1.3); } } }
}

/* Stats */
.stats {
  padding: 3rem 0; background: linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%);
  .container  { max-width: 1200px; margin: 0 auto; padding: 0 clamp(0.75rem, 3vw, 2rem); }
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(1rem, 3vw, 2rem); }
}

.stat-card {
  background: white; padding: 2rem; border-radius: 16px; text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-top: 4px solid #4caf50; transition: transform 0.3s ease;
  &:hover      { transform: translateY(-5px); }
  .stat-number { font-size: 3rem; font-weight: 700; color: #2c5f2d; margin-bottom: 0.5rem; }
  .stat-label  { color: #666; font-size: 1rem; font-weight: 500; }
}

/* Stagioni */
.seasonal-products {
  padding: 3rem 0; margin-bottom: 3rem; background: white;
  .container { max-width: 1200px; margin: 0 auto; padding: 0 clamp(0.75rem, 3vw, 2rem); }
  .seasonal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: clamp(1rem, 3vw, 2rem); margin-top: 2rem; }
  .season-card {
    background: linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%); padding: 2.5rem 2rem;
    border-radius: 16px; text-align: center; cursor: pointer; transition: all 0.3s ease;
    border: 2px solid transparent; position: relative; overflow: hidden;
    &::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #4caf50, #2c5f2d); transform: scaleX(0); transition: transform 0.3s ease; }
    &:hover { transform: translateY(-8px); box-shadow: 0 12px 30px rgba(76,175,80,0.2); border-color: #4caf50; &::before { transform: scaleX(1); } .season-icon { transform: scale(1.2) rotate(10deg); } .season-arrow { transform: translateX(5px); opacity: 1; } }
    .season-icon   { font-size: 4rem; margin-bottom: 1rem; display: block; transition: transform 0.3s ease; }
    h3             { font-size: 1.4rem; color: #2c5f2d; margin-bottom: 0.75rem; font-weight: 700; }
    p              { color: #666; line-height: 1.6; margin-bottom: 1rem; font-size: 0.95rem; }
    .season-months { background: #4caf50; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; display: inline-block; margin-top: 0.5rem; }
    .season-arrow  { position: absolute; bottom: 1.5rem; right: 1.5rem; font-size: 1.5rem; color: #4caf50; opacity: 0; transition: all 0.3s ease; }
  }
}

/* Common */
.section-title       { font-size: 2.5rem; color: #2c5f2d; text-align: center; margin-bottom: 1rem; font-weight: 700; }
.section-description { text-align: center; color: #666; font-size: 1.1rem; margin-bottom: 3rem; }

/* Buttons */
.btn {
  display: inline-block; padding: 0.75rem 2rem; border-radius: 25px; text-decoration: none;
  font-weight: 600; transition: all 0.3s ease; border: 2px solid transparent; cursor: pointer;
  &.btn-offerte   { background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%); color: white; box-shadow: 0 4px 15px rgba(255,152,0,0.3); animation: pulse 2s infinite; &:hover { transform: translateY(-3px) scale(1.05); } }
  &.btn-primary   { background: #4caf50; color: white; &:hover { background: #45a049; transform: translateY(-2px); } }
  &.btn-secondary { background: white; color: #4caf50; border-color: white; &:hover { background: transparent; color: white; } }
}

@keyframes pulse { 0%, 100% { box-shadow: 0 4px 15px rgba(255,152,0,0.3); } 50% { box-shadow: 0 4px 20px rgba(255,152,0,0.5); } }

/* Responsive */
@media (max-width: 1024px) {
  .hero {
    padding: clamp(2rem, 5vw, 3.5rem) 0;
    .hero-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .hero-text { text-align: center; }
  }
  .seasonal-grid { grid-template-columns: repeat(2, 1fr); }
  .stats-grid    { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .hero {
    .hero-buttons     { flex-direction: column; align-items: stretch; .btn { width: 100%; max-width: 320px; margin-left: auto; margin-right: auto; } }
    .hero-image       { img, .hero-video { max-width: 100%; } }
  }
  .banco-slider-section { .slider-btn { width: 44px; height: 44px; font-size: 1.6rem; &.prev { left: 8px; } &.next { right: 8px; } } .slider-dots { bottom: 12px; gap: 8px; .dot { width: 10px; height: 10px; } } }
  .section-title { font-size: clamp(1.5rem, 5vw, 2rem); }
  .stat-card     { padding: 1.5rem 1rem; .stat-number { font-size: clamp(2rem, 8vw, 2.5rem); } .stat-label { font-size: 0.9rem; } }
  .seasonal-products { .seasonal-grid { grid-template-columns: 1fr; gap: 1.5rem; } .season-card { padding: 2rem 1.5rem; .season-icon { font-size: 3rem; } h3 { font-size: 1.2rem; } } }
}

@media (max-width: 480px) {
  .stats-grid    { grid-template-columns: 1fr; }
  .section-title { font-size: 1.65rem; }
  .hero .hero-buttons .btn { min-height: 44px; font-size: 1rem; }
}
</style>
