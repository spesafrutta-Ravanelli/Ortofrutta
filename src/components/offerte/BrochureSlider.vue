<!--
  BrochureSlider: integra brochure + card nello slider (stile Home/Chi Siamo).
  Slide: Copertina, Offerte prodotti, Card offerte ( formato .offerta-card ),
  Retro Dove Trovarci.
  Prop fullViewport: brochure occupa tutto lo spazio navbar-footer.
-->
<template>
  <section
    ref="sectionRef"
    class="brochure-slider-section brochure-unique"
    :class="{ 'full-viewport': fullViewport }"
  >
    <div class="container">
      <SliderCarousel
        :total-slides="4"
        :auto-slide-interval="5000"
        :no-clip="fullViewport"
      >
        <!-- Slide 0: Copertina brochure -->
        <template #slide-0>
          <div class="brochure-slide-wrap">
            <div class="page page-cover">
              <div class="cover-bg" :style="coverBgStyle"></div>
              <div class="cover-content">
                <div class="cover-cart">🛒</div>
                <h2 class="cover-title">Ravanelli <span class="amp">&</span> Carminati</h2>
                <div class="cover-subtitle">Frutta & Verdura · Freschissima</div>
                <p class="cover-headline">Le nostre <span class="highlight">offerte della settimana</span> direttamente dal mercato</p>
                <RouterLink to="/" class="cover-btn-web">
                  🌐 Visita il Sito
                </RouterLink>
                <a href="tel:+393756804525" class="cover-btn-phone">📞 Chiamaci</a>
              </div>
            </div>
          </div>
        </template>

        <!-- Slide 1: Offerte della settimana (prodotti da Firebase) -->
        <template #slide-1>
          <div class="brochure-slide-wrap">
            <div class="page page-products">
              <div class="products-header">
                <div class="brand-small">Ortofrutticola Ravanelli & Carminati</div>
                <h2>🌿 Offerte della Settimana</h2>
                <div class="week-label">
                  {{ dataInizio && dataFine ? `Dal ${formatDataShort(dataInizio)} al ${formatDataShort(dataFine)}` : 'Freschissimo · Direttamente dal mercato' }}
                </div>
              </div>
              <div class="products-grid">
                <template v-if="offerte.length > 0">
                  <div
                    v-for="(p, i) in offerte"
                    :key="i"
                    class="prod-card"
                  >
                    <div class="prod-img-wrap">
                      <img v-if="p.image" :src="p.image" :alt="p.title" @error="handleImageError" />
                      <div v-else class="no-img">🥦</div>
                      <div v-if="p.tag" class="prod-offer-tag">{{ p.tag }}</div>
                    </div>
                    <div class="prod-body">
                      <div class="prod-name">{{ p.title }}</div>
                      <span class="prod-price-badge">€ {{ p.price }}{{ p.price2 ? ' / ' + p.price2 : '' }}</span>
                    </div>
                  </div>
                </template>
                <div v-else class="prod-empty" style="grid-column:1/-1;">
                  <span>Torna presto per le nostre offerte!</span>
                </div>
              </div>
              <div class="footer-strip">
                <div class="footer-brand">Ravanelli & Carminati</div>
                <div class="footer-phone">
                  <span style="color:#25D366;font-size:16px;">📱</span>
                  +39 375 680 4525
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Slide 2: Card offerte (formato visivo .offerta-card, integrate nello scroll) -->
        <template #slide-2>
          <div class="brochure-slide-wrap brochure-slide-cards">
            <div class="page page-cards">
              <h2 class="cards-title">🎉 Le Nostre Offerte</h2>
              <div class="offerte-grid">
                <template v-if="offerte.length > 0">
                  <div
                    v-for="prodotto in offerte"
                    :key="prodotto.title"
                    class="offerta-card"
                  >
                    <div class="offerta-image">
                      <img
                        v-if="prodotto.image"
                        :src="prodotto.image"
                        :alt="prodotto.title"
                        @error="handleImageError"
                      />
                      <div v-else class="offerta-placeholder">🛒</div>
                    </div>
                    <div class="offerta-info">
                      <h3>{{ prodotto.title }}</h3>
                      <div class="offerta-price">
                        <span class="price-main">€ {{ prodotto.price }}</span>
                        <span v-if="prodotto.price2" class="price-secondary">/ € {{ prodotto.price2 }}</span>
                      </div>
                    </div>
                  </div>
                </template>
                <div v-else class="offerta-empty">Torna presto per le nostre offerte!</div>
              </div>
            </div>
          </div>
        </template>

        <!-- Slide 3: Retro - Dove Trovarci -->
        <template #slide-3>
          <div class="brochure-slide-wrap">
            <div class="page page-back">
              <div class="back-header">
                <h2>Ortofrutticola<br>Ravanelli & Carminati</h2>
                <div class="sub">Frutta & Verdura · Freschissima</div>
              </div>
              <div class="back-section-title">📅 Dove Trovarci</div>
              <div class="market-grid">
                <div class="market-card mar">
                  <div class="mc-day">Martedì</div><div class="mc-pin">📍</div>
                  <div class="mc-city">Asso</div>
                  <div class="mc-addr">Piazza Discacciati</div>
                  <div class="mc-time">🕐 7:00 – 12:10</div>
                </div>
                <div class="market-card mar">
                  <div class="mc-day">Martedì</div><div class="mc-pin">📍</div>
                  <div class="mc-city">Zelo Buon Persico</div>
                  <div class="mc-addr">Zona Mercato</div>
                  <div class="mc-time">🕐 7:00 – 12:10</div>
                </div>
                <div class="market-card mer">
                  <div class="mc-day">Mercoledì</div><div class="mc-pin">📍</div>
                  <div class="mc-city">Scarenna</div>
                  <div class="mc-addr">Via Alcide De Gasperi, 7</div>
                  <div class="mc-time">🕐 7:00 – 12:10</div>
                </div>
                <div class="market-card mer">
                  <div class="mc-day">Mercoledì</div><div class="mc-pin">📍</div>
                  <div class="mc-city">Agrate</div>
                  <div class="mc-addr">Zona Mercato</div>
                  <div class="mc-time">🕐 7:00 – 12:10</div>
                </div>
                <div class="market-card gio">
                  <div class="mc-day">Giovedì</div><div class="mc-pin">📍</div>
                  <div class="mc-city">Caslino D'Erba</div>
                  <div class="mc-addr">Piazza del Comune</div>
                  <div class="mc-time">🕐 7:00 – 12:10</div>
                </div>
                <div class="market-card gio">
                  <div class="mc-day">Giovedì</div><div class="mc-pin">📍</div>
                  <div class="mc-city">Bussero</div>
                  <div class="mc-addr">Zona Mercato</div>
                  <div class="mc-time">🕐 7:00 – 12:10</div>
                </div>
                <div class="market-card ven">
                  <div class="mc-day">Venerdì</div><div class="mc-pin">📍</div>
                  <div class="mc-city">Eupilio</div>
                  <div class="mc-addr">Via Emilio Scheibler</div>
                  <div class="mc-time">🕐 7:00 – 12:10</div>
                </div>
                <div class="market-card sab">
                  <div class="mc-day">Sabato</div><div class="mc-pin">📍</div>
                  <div class="mc-city">Brembate</div>
                  <div class="mc-addr">Via Vittorio Veneto, 42</div>
                  <div class="mc-time">🕐 7:00 – 12:10</div>
                </div>
              </div>
              <div class="delivery-box">
                <h3>🚚 Consegna a Domicilio</h3>
                <p>Chiamaci o scrivici su WhatsApp!</p>
              </div>
              <div class="back-contact">
                <span style="color:#25D366;font-size:22px;">📱</span>
                <a href="tel:+393756804525" class="phone-num">+39 375 680 4525</a>
              </div>
            </div>
          </div>
        </template>
      </SliderCarousel>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { RouterLink } from 'vue-router'
import SliderCarousel from '@/components/common/SliderCarousel.vue'

// Ref per scroll-to-top e fix prima/ultima pagina
const sectionRef = ref(null)

const props = defineProps({
  /** Prodotti da Firebase settings/volantino (via useVolantino) */
  offerte: {
    type: Array,
    default: () => []
  },
  dataInizio: {
    type: String,
    default: ''
  },
  dataFine: {
    type: String,
    default: ''
  },
  /** Brochure occupa tutto lo spazio tra navbar e footer (height calc) */
  fullViewport: {
    type: Boolean,
    default: false
  }
})

// Stile background copertina (verde scuro, opzionale con immagine)
const coverBgStyle = computed(() => ({
  backgroundColor: '#1a2a1a'
}))

const formatDataShort = (dateStr) => {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}`
}

const handleImageError = (e) => {
  e.target.style.display = 'none'
}

// STEP 8 FIX: scroll contenitore brochure a 0 al mount (prima pagina visibile)
const scrollBrochureToTop = () => {
  nextTick(() => {
    if (!sectionRef.value) return
    sectionRef.value.querySelectorAll('.brochure-slide-wrap').forEach(el => {
      el.scrollTop = 0
    })
    sectionRef.value.scrollTop = 0
    const container = sectionRef.value.querySelector('.container')
    if (container) container.scrollTop = 0
    // Secondo tick per layout flex che si stabilizza
    nextTick(() => {
      sectionRef.value?.querySelectorAll('.brochure-slide-wrap').forEach(el => {
        el.scrollTop = 0
      })
    })
  })
}

onMounted(() => {
  scrollBrochureToTop()
  // Fallback dopo layout completo (font, immagini)
  setTimeout(scrollBrochureToTop, 100)
})
</script>

<style scoped lang="scss">
/* STEP 1 valori: navbar ~100px, footer ~260px, max-width 1200px */
$navbar-height: 100px;
$footer-height: 260px;
$container-max: 1200px;

/* Layout sezione brochure */
.brochure-slider-section {
  padding: 0 0 2rem;
  margin-bottom: 1rem;

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Full viewport: brochure occupa tutto lo spazio navbar-footer */
  &.full-viewport {
    padding: 0;
    margin: 0;
    flex: 1;
    display: flex;
    min-height: 0;
    /* STEP 8: nessun padding-top che spinga prima pagina fuori vista */
    overflow: visible;

    .container {
      max-width: $container-max;
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      /* Prima pagina: no margin-top */
    }

    /* STEP 8: overflow-y auto (non hidden) per evitare taglio ultima pagina */
    :deep(.slider-carousel) {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      overflow: visible;
    }

    :deep(.slider-wrapper) {
      flex: 1;
      min-height: 0;
      display: flex;
      max-width: 100%;
      overflow: visible;
    }

    :deep(.slider-container) {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      /* overflow gestito da noClip prop su SliderCarousel */
    }

    :deep(.slide) {
      flex: 1;
      min-height: 0;
      overflow: hidden; /* Solo il wrap scrolla, evita doppia scrollbar */
      display: flex;
      flex-direction: column;

      &.active {
        display: flex;
      }
    }

    /* STEP 8: wrap scrollabile con padding-bottom per ultima pagina non tagliata */
    .brochure-slide-wrap {
      flex: 1;
      min-height: 0;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      padding-bottom: 3rem; /* Spazio per non tagliare fondo (≈ footer) */
      -webkit-overflow-scrolling: touch;
    }
  }
}

/* Full viewport: flex 1 per riempire spazio parent (height da OffertePubblica) */

/* Wrapper per adattare le pagine allo slider - STEP 8: no padding-top sul primo */
.brochure-slide-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 340px;
  background: #e8e8e8;
  padding-top: 0;
  margin-top: 0;
}

/* Slide card: overflow auto per scroll interno */
.brochure-slide-cards {
  overflow-y: auto;
  padding: 1rem;
}

/* Variabili brochure (da brochure_ravanelli.html) */
.page {
  --green-dark: #1a5c1a;
  --green-main: #2e7d32;
  --green-light: #4caf50;
  --green-pale: #c8e6c9;
  --accent-yellow: #ffd600;
  --accent-orange: #ff6f00;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 210 / 148;
  position: relative;
  overflow: hidden;
  background: white;
  box-shadow: 0 6px 30px rgba(0,0,0,.2);
}

/* Copertina */
.page-cover {
  background: #1a2a1a;
}

.cover-bg {
  position: absolute;
  inset: 0;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #1a2a1a;
}

/* STEP 8: z-index sopra cover-bg per prima pagina visibile */
.cover-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
  gap: 6px;
}

.cover-cart {
  font-size: 32px;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,.5));
}

.cover-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 900;
  color: white;
  line-height: 1.1;
  text-shadow: 2px 3px 8px rgba(0,0,0,.7);
}

.cover-title .amp {
  color: var(--green-light);
  font-style: italic;
}

.cover-subtitle {
  font-size: 0.5rem;
  color: rgba(255,255,255,.75);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 600;
}

.cover-headline {
  font-size: 0.65rem;
  color: white;
  font-weight: 700;
  line-height: 1.4;
}

.cover-headline .highlight {
  color: var(--accent-yellow);
  font-style: italic;
}

.cover-btn-web,
.cover-btn-phone {
  text-decoration: none;
  color: white;
  border-radius: 30px;
  padding: 6px 18px;
  font-size: 0.55rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}

.cover-btn-web {
  background: var(--green-light);
  box-shadow: 0 4px 14px rgba(0,0,0,.4);
}

.cover-btn-phone {
  background: rgba(255,255,255,.15);
  border: 2px solid rgba(255,255,255,.5);
}

/* Pagina prodotti */
.page-products {
  display: flex;
  flex-direction: column;
}

.products-header {
  background: white;
  padding: 10px 12px 8px;
  text-align: center;
  border-bottom: 3px solid var(--green-light);
}

.products-header h2 {
  font-size: 0.95rem;
  font-weight: bold;
  background: linear-gradient(180deg, #c62828 0%, #e53935 30%, #ff5722 70%, #ff9800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.week-label {
  color: var(--green-main);
  font-size: 0.45rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.brand-small {
  font-size: 0.4rem;
  color: #888;
}

.products-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  padding: 12px 10px 8px;
  align-content: start;
  min-height: 120px;
}

.prod-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,.08);
  border: 1.5px solid #e8f5e9;
}

.prod-img-wrap {
  height: 40px;
  overflow: hidden;
  background: #f1f8e9;
  position: relative;
}

.prod-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
}

.prod-offer-tag {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #e53935;
  color: white;
  font-size: 0.35rem;
  font-weight: 900;
  padding: 2px 4px;
  border-radius: 4px;
}

.prod-body {
  padding: 4px 6px 5px;
}

.prod-name {
  font-size: 0.45rem;
  font-weight: 700;
  color: var(--green-main);
  margin-bottom: 2px;
}

.prod-price-badge {
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-yellow));
  color: white;
  font-size: 0.5rem;
  font-weight: 900;
  padding: 2px 6px;
  border-radius: 12px;
}

.prod-empty {
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 0.5rem;
}

.footer-strip {
  background: var(--green-dark);
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.45rem;
}

.footer-brand {
  color: white;
  font-weight: 700;
}

.footer-phone {
  color: var(--accent-yellow);
  font-weight: 800;
}

/* Retro brochure */
.page-back {
  display: flex;
  flex-direction: column;
}

.back-header {
  background: linear-gradient(135deg, var(--green-dark), var(--green-main));
  padding: 12px;
  text-align: center;
}

.back-header h2 {
  font-family: 'Playfair Display', Georgia, serif;
  color: white;
  font-size: 0.85rem;
}

.back-header .sub {
  color: var(--green-pale);
  font-size: 0.4rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.back-section-title {
  text-align: center;
  font-size: 0.5rem;
  font-weight: 800;
  color: var(--green-dark);
  text-transform: uppercase;
  padding: 8px 0 4px;
}

.market-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  padding: 0 10px;
}

.market-card {
  border-radius: 6px;
  padding: 4px 5px;
  color: white;
  text-align: center;
  font-size: 0.4rem;
}

.market-card.mar { background: linear-gradient(135deg, #ef5350, #e53935); }
.market-card.mer { background: linear-gradient(135deg, #42a5f5, #1e88e5); }
.market-card.gio { background: linear-gradient(135deg, #ab47bc, #8e24aa); }
.market-card.ven { background: linear-gradient(135deg, #ffa726, #fb8c00); }
.market-card.sab { background: linear-gradient(135deg, #4caf50, #388e3c); }

.mc-day { font-weight: 900; text-transform: uppercase; opacity: .9; }
.mc-pin { font-size: 8px; margin: 1px 0; }
.mc-city { font-weight: 800; }
.mc-addr { opacity: .85; font-size: 0.35rem; }
.mc-time { font-weight: 700; margin-top: 2px; background: rgba(0,0,0,.15); border-radius: 4px; padding: 1px 4px; display: inline-block; }

.delivery-box {
  margin: 6px 10px;
  background: var(--green-pale);
  border: 2px solid var(--green-light);
  border-radius: 6px;
  padding: 5px 8px;
  text-align: center;
}

.delivery-box h3 { color: var(--green-dark); font-size: 0.5rem; }
.delivery-box p { font-size: 0.35rem; color: #333; }

/* STEP 8: ultimo elemento visibile fino in fondo - no clippo */
.back-contact {
  margin-top: auto;
  margin-bottom: 0;
  background: var(--green-dark);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.back-contact .phone-num {
  color: var(--accent-yellow);
  font-size: 0.75rem;
  font-weight: 900;
  text-decoration: none;
}

/* Slide 2: Card offerte - formato identico a .offerta-card originale */
.page-cards {
  max-width: 100% !important;
  aspect-ratio: unset !important;
  padding: 1rem;
}

.cards-title {
  text-align: center;
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.offerte-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.offerta-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.2);
  }
}

.offerta-image {
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.offerta-placeholder {
  font-size: 4rem;
}

.offerta-info {
  padding: 1rem;

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
}

.offerta-price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;

  .price-main {
    font-size: 1.3rem;
    font-weight: 800;
    color: #4caf50;
  }

  .price-secondary {
    font-size: 0.9rem;
    color: #666;
  }
}

.offerta-empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #999;
}

/* Responsive brochure */
@media (max-width: 1024px) {
  .offerte-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .brochure-slide-wrap {
    min-height: 280px;
  }

  .page {
    max-width: 100%;
  }

  /* Tablet: card a due colonne */
  .offerte-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .brochure-slide-wrap {
    min-height: 240px;
  }

  .products-grid {
    gap: 4px;
    padding: 8px 6px;
  }

  .prod-img-wrap {
    height: 32px;
  }

  /* Smartphone: card in colonna singola */
  .offerte-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
