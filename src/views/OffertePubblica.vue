<template>
  <div class="offerte-page">
    <div class="page-header-mini">
      <h1>🎉 Le Nostre Offerte</h1>
      <p v-if="dataInizio && dataFine" class="subtitle">
        Dal {{ formatData(dataInizio) }} al {{ formatData(dataFine) }}
      </p>
    </div>

    <!-- DESKTOP: brochure iframe -->
    <div class="brochure-container desktop-only">
      <iframe
        ref="brochureIframe"
        :src="brochureIframeSrc"
        class="brochure-iframe"
        title="Brochure Offerte"
        frameborder="0"
        @load="scrollBrochureToFirst"
      ></iframe>
    </div>

    <!-- MOBILE: slider fullscreen -->
    <div class="slider-container mobile-only">
      <div v-if="offerte.length === 0" class="no-offerte">
        <p>🛒 Nessuna offerta disponibile al momento</p>
        <p>Torna a trovarci presto!</p>
      </div>

      <div v-else class="slider-wrap">
        <!-- Freccia sinistra -->
        <button
          class="slider-arrow slider-arrow-prev"
          :disabled="sliderIndex === 0"
          @click="sliderPrev"
          aria-label="Offerta precedente"
        >‹</button>

        <!-- Card attiva -->
        <div
          class="slider-card"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <div v-if="offerte[sliderIndex].tag" class="offerta-tag">
            {{ offerte[sliderIndex].tag }}
          </div>

          <div class="slider-img-wrap">
            <img
              v-if="offerte[sliderIndex].image"
              :src="offerte[sliderIndex].image"
              :alt="offerte[sliderIndex].title"
              class="slider-img"
              @error="handleImgError"
            />
            <div v-else class="slider-img-placeholder">🛒</div>
          </div>

          <div class="slider-info">
            <h3 class="slider-title">{{ offerte[sliderIndex].title }}</h3>
            <div class="slider-prices">
              <span class="price-badge">{{ offerte[sliderIndex].price }}</span>
              <span v-if="offerte[sliderIndex].price2" class="price-badge">{{ offerte[sliderIndex].price2 }}</span>
              <span v-if="offerte[sliderIndex].price3" class="price-badge">{{ offerte[sliderIndex].price3 }}</span>
            </div>
          </div>
        </div>

        <!-- Freccia destra -->
        <button
          class="slider-arrow slider-arrow-next"
          :disabled="sliderIndex === offerte.length - 1"
          @click="sliderNext"
          aria-label="Offerta successiva"
        >›</button>

        <!-- Dots indicatori -->
        <div class="slider-dots">
          <button
            v-for="(_, i) in offerte"
            :key="i"
            class="slider-dot"
            :class="{ active: i === sliderIndex }"
            @click="sliderIndex = i"
            :aria-label="`Offerta ${i + 1}`"
          />
        </div>

        <!-- Contatore -->
        <div class="slider-counter">{{ sliderIndex + 1 }} / {{ offerte.length }}</div>
      </div>
    </div>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-card">
        <h2>💬 Prenota le Offerte</h2>
        <p>Vuoi assicurarti i prodotti in offerta? Prenotali subito!</p>
        <RouterLink to="/prenota-qui" class="btn-cta">Prenota Ora</RouterLink>
      </div>
      <div class="cta-card">
        <h2>📍 Vieni a Trovarci</h2>
        <p>Scopri dove siamo presenti questa settimana</p>
        <RouterLink to="/dove-siamo" class="btn-cta">Dove Siamo</RouterLink>
      </div>
      <div class="cta-card">
        <h2>📞 Contattaci</h2>
        <p>Hai domande sulle offerte? Chiamaci o scrivici!</p>
        <a href="https://wa.me/393756804525" target="_blank" class="btn-cta btn-whatsapp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45zm-8.475 18.297c-1.778 0-3.524-.477-5.042-1.377l-.362-.214-3.754.982 1.005-3.645-.236-.374c-.99-1.569-1.512-3.382-1.512-5.26.003-5.45 4.455-9.886 9.932-9.886 2.652 0 5.145 1.035 7.021 2.906 1.875 1.87 2.909 4.352 2.909 6.992-.004 5.45-4.457 9.887-9.93 9.887z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
      <h2>ℹ️ Informazioni Utili</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-icon">🕐</div>
          <h3>Validità Offerte</h3>
          <p>Le offerte sono valide fino ad esaurimento scorte</p>
        </div>
        <div class="info-item">
          <div class="info-icon">📦</div>
          <h3>Disponibilità</h3>
          <p>Prodotti freschi selezionati ogni giorno</p>
        </div>
        <div class="info-item">
          <div class="info-icon">💳</div>
          <h3>Pagamento</h3>
          <p>Contanti e carte accettate</p>
        </div>
        <div class="info-item">
          <div class="info-icon">🚚</div>
          <h3>Consegna</h3>
          <p>Servizio di consegna a domicilio disponibile</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVolantino } from '@/composables/useVolantino'
import brochureHtmlUrl from '@/assets/brochure_ravanelli.html?url'

const { offerte, dataInizio, dataFine } = useVolantino()

const formatData = (dateStr) => {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

const brochureVersion = 8

const brochureIframeSrc = computed(() => {
  const base = brochureHtmlUrl
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}public=1&v=${brochureVersion}`
})

const scrollBrochureToFirst = () => { window.scrollTo(0, 0) }

const handleImgError = (e) => {
  e.target.style.display = 'none'
  e.target.nextElementSibling && (e.target.nextElementSibling.style.display = 'flex')
}

// ── Slider mobile ──
const sliderIndex = ref(0)

const sliderPrev = () => { if (sliderIndex.value > 0) sliderIndex.value-- }
const sliderNext = () => { if (sliderIndex.value < offerte.value.length - 1) sliderIndex.value++ }

// Swipe touch
let touchStartX = 0
const onTouchStart = (e) => { touchStartX = e.touches[0].clientX }
const onTouchEnd = (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (diff > 50) sliderNext()
  else if (diff < -50) sliderPrev()
}

onMounted(() => { window.scrollTo(0, 0) })
</script>

<style scoped lang="scss">
.offerte-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 0 3rem;
  background: #fff;
}

.page-header-mini {
  text-align: center;
  padding: 0.5rem 1rem;
  background: #4caf50;

  h1 { font-size: 1.5rem; color: white; margin: 0; margin-top: 1cm; font-weight: 800; }
  .subtitle { font-size: 0.9rem; color: rgba(255,255,255,.9); margin: 0.25rem 0 0; }
}

/* ── Brochure (solo desktop) ── */
.desktop-only { display: block; }
.mobile-only  { display: none; }

.brochure-container {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  width: 100%;
}

.brochure-iframe {
  width: 100%;
  max-width: 100%;
  min-height: 580px;
  height: min(600px, calc(100vh - 200px));
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  display: block;
}

/* ── Slider mobile ── */
.slider-container {
  position: relative;
  background: #f8f9fa;
}

.slider-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0 0.5rem;
  height: calc(100dvh - 120px);
}

.slider-card {
  width: 100%;
  height: 100%;
  flex: 1;
  background: white;
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  user-select: none;
}

.slider-img-wrap {
  flex: 1;
  min-height: 0;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.slider-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slider-img-placeholder {
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.slider-info {
  padding: 1rem 1.25rem 1.25rem;
  flex-shrink: 0;
  background: white;
}

.slider-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2c5f2d;
  margin-bottom: 0.6rem;
  line-height: 1.3;
}

.slider-prices {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.price-badge {
  font-size: 1rem;
  font-weight: 800;
  color: white;
  background: linear-gradient(135deg, #ff6f00, #ffd600);
  padding: 6px 16px;
  border-radius: 20px;
  white-space: nowrap;
}

.offerta-tag {
  position: absolute;
  top: 10px; left: 10px;
  background: #ff9800;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  z-index: 1;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

/* Frecce navigazione */
.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(46,125,50,0.9);
  color: white;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: background 0.2s, transform 0.2s;
  line-height: 1;
  &:disabled { opacity: 0.25; cursor: default; }
  &:not(:disabled):active { transform: translateY(-50%) scale(0.93); }
}
.slider-arrow-prev { left: 4px; }
.slider-arrow-next { right: 4px; }

/* Dots */
.slider-dots {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 1rem;
}

.slider-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #2e7d32;
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
  &.active {
    background: #2e7d32;
    transform: scale(1.25);
  }
}

.slider-counter {
  font-size: 0.8rem;
  color: #888;
  font-weight: 700;
  margin-top: 0.4rem;
}

.no-offerte {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  p { font-size: 1.1rem; margin-bottom: 0.5rem; }
}

/* CTA Section */
.cta-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto 3rem;
  padding: 0 1rem;
}

.cta-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover { transform: translateY(-5px); box-shadow: 0 6px 25px rgba(0,0,0,0.15); }
  h2 { font-size: 1.5rem; color: #2c3e50; margin-bottom: 1rem; }
  p  { color: #666; margin-bottom: 1.5rem; line-height: 1.6; }
}

.btn-cta {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover { background: #45a049; transform: scale(1.05); }
  &.btn-whatsapp {
    background: #25D366;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    &:hover { background: #20BA5A; }
  }
}

/* Info Section */
.info-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  h2 { text-align: center; font-size: 2rem; color: #2c3e50; margin-bottom: 2rem; }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.info-item {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
  &:hover { transform: translateY(-5px); }
  .info-icon { font-size: 3rem; margin-bottom: 1rem; }
  h3 { font-size: 1.2rem; color: #2c3e50; margin-bottom: 0.5rem; }
  p  { color: #666; line-height: 1.6; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  /* Mostra card, nascondi brochure */
  .desktop-only { display: none; }
  .mobile-only  { display: block; }

  .page-header-mini h1 { font-size: 1.3rem; }
  .cta-section  { grid-template-columns: 1fr; }
  .info-grid    { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .page-header-mini h1 { font-size: 1.2rem; }
  .slider-title { font-size: 1.2rem; }
  .price-badge  { font-size: 1rem; padding: 3px 10px; }
  .cta-section  { padding: 0 0.75rem; }
  .cta-card     { padding: 1.25rem; }
  .info-grid    { grid-template-columns: 1fr; }
}
</style>