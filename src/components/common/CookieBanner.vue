<template>
  <!-- Banner -->
  <Transition name="slide-up">
    <div v-if="showBanner" id="rc-cookie-banner">
      <div class="rc-banner-inner">
        <div class="rc-banner-text">
          <p>
            🍪 Utilizziamo i cookie per migliorare la tua esperienza, analizzare il traffico e personalizzare i contenuti.
            Per maggiori informazioni consulta la nostra
            <RouterLink to="/cookie-policy">Cookie Policy</RouterLink>.
          </p>
        </div>
        <div class="rc-banner-actions">
          <button class="rc-btn rc-btn-reject" @click="rejectAll">Rifiuta tutti</button>
          <button class="rc-btn rc-btn-manage" @click="showModal = true">Gestisci cookie</button>
          <button class="rc-btn rc-btn-accept" @click="acceptAll">✔ Accetta tutti</button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Modal -->
  <Transition name="fade">
    <div v-if="showModal" id="rc-cookie-modal" @click.self="showModal = false">
      <div class="rc-modal-box" role="dialog" aria-modal="true">
        <div class="rc-modal-header">
          <h2>🍪 Gestisci le preferenze cookie</h2>
          <button class="rc-modal-close" @click="showModal = false" aria-label="Chiudi">✕</button>
        </div>
        <div class="rc-modal-body">
          <p>Puoi scegliere quali categorie di cookie abilitare. I cookie tecnici sono sempre attivi perché necessari al funzionamento del sito.</p>

          <!-- Tecnici -->
          <div class="rc-cookie-type">
            <div class="rc-cookie-type-header">
              <span class="rc-cookie-type-title">
                🔧 Cookie Tecnici / Necessari
                <span class="rc-badge-required">Sempre attivi</span>
              </span>
              <label class="rc-toggle">
                <input type="checkbox" checked disabled />
                <span class="rc-toggle-slider"></span>
              </label>
            </div>
            <div class="rc-cookie-type-body">Essenziali per il funzionamento del sito: gestione della sessione, sicurezza e preferenze di base. Non richiedono consenso.</div>
          </div>

          <!-- Analitici -->
          <div class="rc-cookie-type">
            <div class="rc-cookie-type-header">
              <span class="rc-cookie-type-title">📊 Cookie Analitici</span>
              <label class="rc-toggle">
                <input type="checkbox" v-model="preferences.analytics" />
                <span class="rc-toggle-slider"></span>
              </label>
            </div>
            <div class="rc-cookie-type-body">Ci aiutano a capire come i visitatori usano il sito (pagine visitate, durata, provenienza). I dati sono aggregati e anonimi.</div>
          </div>

          <!-- Marketing -->
          <div class="rc-cookie-type">
            <div class="rc-cookie-type-header">
              <span class="rc-cookie-type-title">📣 Cookie di Marketing</span>
              <label class="rc-toggle">
                <input type="checkbox" v-model="preferences.marketing" />
                <span class="rc-toggle-slider"></span>
              </label>
            </div>
            <div class="rc-cookie-type-body">Utilizzati per mostrare contenuti e annunci pertinenti ai tuoi interessi su questo e altri siti.</div>
          </div>

          <!-- Social -->
          <div class="rc-cookie-type">
            <div class="rc-cookie-type-header">
              <span class="rc-cookie-type-title">🌐 Cookie Social Media</span>
              <label class="rc-toggle">
                <input type="checkbox" v-model="preferences.social" />
                <span class="rc-toggle-slider"></span>
              </label>
            </div>
            <div class="rc-cookie-type-body">Permettono l'integrazione con i social network (Facebook, Instagram, WhatsApp). Possono tracciare le tue attività anche fuori dal nostro sito.</div>
          </div>
        </div>
        <div class="rc-modal-footer">
          <button class="rc-btn rc-btn-reject" @click="rejectAll">Rifiuta tutti</button>
          <button class="rc-btn rc-btn-manage" @click="savePreferences">Salva preferenze</button>
          <button class="rc-btn rc-btn-accept" @click="acceptAll">✔ Accetta tutti</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const COOKIE_KEY  = 'rc_cookie_consent'
const COOKIE_DAYS = 365

const showBanner = ref(false)
const showModal  = ref(false)

const preferences = reactive({
  analytics: false,
  marketing: false,
  social:    false
})

/* ── Cookie helpers ─────────────────────────────────────── */
const saveConsent = (data) => {
  const expires = new Date()
  expires.setDate(expires.getDate() + COOKIE_DAYS)
  document.cookie = COOKIE_KEY + '=' + JSON.stringify(data) +
    '; expires=' + expires.toUTCString() + '; path=/; SameSite=Lax'
}

const getConsent = () => {
  const match = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_KEY + '=([^;]*)'))
  if (!match) return null
  try { return JSON.parse(decodeURIComponent(match[1])) } catch { return null }
}

/* ── Azioni ─────────────────────────────────────────────── */
const acceptAll = () => {
  saveConsent({ necessary: true, analytics: true, marketing: true, social: true })
  showBanner.value = false
  showModal.value  = false
}

const rejectAll = () => {
  saveConsent({ necessary: true, analytics: false, marketing: false, social: false })
  showBanner.value = false
  showModal.value  = false
}

const savePreferences = () => {
  saveConsent({ necessary: true, ...preferences })
  showBanner.value = false
  showModal.value  = false
}

/* ── Init ───────────────────────────────────────────────── */
onMounted(() => {
  const saved = getConsent()
  if (!saved) {
    showBanner.value = true
  } else {
    preferences.analytics = saved.analytics
    preferences.marketing = saved.marketing
    preferences.social    = saved.social
  }
})

/* Espone API globale: RC_Cookies.openSettings() dal footer o da altri componenti */
window.RC_Cookies = {
  openSettings: () => { showModal.value = true },
  getConsent
}
</script>

<style scoped lang="scss">
/* ── Banner ─────────────────────────────────────────────── */
#rc-cookie-banner {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: #1a1a1a;
  color: #f5f5f5;
  z-index: 99999;
  box-shadow: 0 -4px 24px rgba(0,0,0,.35);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.rc-banner-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.rc-banner-text {
  flex: 1 1 300px;

  p {
    margin: 0;
    font-size: .93rem;
    line-height: 1.6;
    color: #ddd;
  }

  a {
    color: #4caf50;
    text-decoration: underline;
    &:hover { color: #81c784; }
  }
}

.rc-banner-actions {
  display: flex;
  gap: .75rem;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
}

/* ── Bottoni ────────────────────────────────────────────── */
.rc-btn {
  display: inline-block;
  padding: .6rem 1.4rem;
  border-radius: 25px;
  font-size: .9rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all .25s;
  white-space: nowrap;
  font-family: inherit;
}

.rc-btn-accept {
  background: linear-gradient(135deg, #4caf50, #2c5f2d);
  color: #fff;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(76,175,80,.45);
  }
}

.rc-btn-reject {
  background: transparent;
  color: #bbb;
  border-color: #555;

  &:hover { border-color: #bbb; color: #fff; }
}

.rc-btn-manage {
  background: transparent;
  color: #4caf50;
  border-color: #4caf50;

  &:hover { background: #4caf50; color: #fff; }
}

/* ── Modal ──────────────────────────────────────────────── */
#rc-cookie-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.55);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.rc-modal-box {
  background: #fff;
  border-radius: 16px;
  max-width: 580px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,.3);
}

.rc-modal-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 1.3rem;
    color: #2c5f2d;
    margin: 0;
  }
}

.rc-modal-close {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #666;
  &:hover { color: #333; }
}

.rc-modal-body {
  padding: 1.25rem 1.5rem;

  p {
    font-size: .9rem;
    color: #555;
    margin-bottom: 1.25rem;
    line-height: 1.6;
  }
}

/* ── Tipo cookie ────────────────────────────────────────── */
.rc-cookie-type {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: .85rem;
  overflow: hidden;
}

.rc-cookie-type-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .85rem 1rem;
  background: #f9f9f9;
}

.rc-cookie-type-title {
  font-weight: 600;
  font-size: .95rem;
  color: #222;
  display: flex;
  align-items: center;
  gap: .5rem;
}

.rc-badge-required {
  background: #e8f5e9;
  color: #2c5f2d;
  font-size: .72rem;
  padding: .18rem .55rem;
  border-radius: 20px;
  font-weight: 600;
}

.rc-cookie-type-body {
  padding: .75rem 1rem;
  font-size: .85rem;
  color: #555;
  line-height: 1.6;
  border-top: 1px solid #e0e0e0;
}

/* ── Toggle ─────────────────────────────────────────────── */
.rc-toggle {
  position: relative;
  width: 44px;
  height: 24px;
  flex-shrink: 0;

  input { opacity: 0; width: 0; height: 0; }
}

.rc-toggle-slider {
  position: absolute;
  inset: 0;
  background: #ccc;
  border-radius: 24px;
  cursor: pointer;
  transition: .3s;

  &::before {
    content: '';
    position: absolute;
    width: 18px; height: 18px;
    left: 3px; top: 3px;
    background: #fff;
    border-radius: 50%;
    transition: .3s;
  }
}

.rc-toggle input:checked + .rc-toggle-slider { background: #4caf50; }
.rc-toggle input:checked + .rc-toggle-slider::before { transform: translateX(20px); }
.rc-toggle input:disabled + .rc-toggle-slider { opacity: .6; cursor: not-allowed; }

/* ── Footer modal ───────────────────────────────────────── */
.rc-modal-footer {
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  gap: .75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  border-top: 1px solid #eee;
}

/* ── Transizioni Vue ────────────────────────────────────── */
.slide-up-enter-active { animation: rcSlideUp .4s ease; }
.slide-up-leave-active { animation: rcSlideUp .3s ease reverse; }
@keyframes rcSlideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

.fade-enter-active, .fade-leave-active { transition: opacity .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 600px) {
  .rc-banner-inner {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 1rem;
  }

  .rc-banner-actions {
    width: 100%;
    justify-content: stretch;
  }

  .rc-btn {
    flex: 1;
    text-align: center;
    padding: .65rem .75rem;
    font-size: .85rem;
  }

  .rc-modal-footer {
    justify-content: stretch;

    .rc-btn { flex: 1; text-align: center; }
  }
}
</style>
