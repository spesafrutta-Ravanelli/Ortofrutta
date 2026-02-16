<template>
  <div class="offerte-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <h1>🎉 Le Nostre Offerte</h1>
        <p class="subtitle">Scopri le promozioni della settimana</p>
      </div>

      <!-- Indicatore Admin Mode (visibile solo se attivo) -->
      <div v-if="isAdminMode" class="admin-indicator">
        👨‍💼 Modalità Admin Attiva
        <button @click="disableAdminMode" class="btn-disable-admin">
          Disattiva
        </button>
      </div>

      <!-- Volantino Embedded -->
      <div class="volantino-container">
        <div class="volantino-wrapper">
          <iframe 
            :src="iframeSrc" 
            class="volantino-iframe"
            title="Volantino Offerte"
            frameborder="0"
          ></iframe>
        </div>
      </div>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-card">
          <h2>💬 Prenota le Offerte</h2>
          <p>Vuoi assicurarti i prodotti in offerta? Prenotali subito!</p>
          <RouterLink to="/prenota-qui" class="btn-cta">
            Prenota Ora
          </RouterLink>
        </div>

        <div class="cta-card">
          <h2>📍 Vieni a Trovarci</h2>
          <p>Scopri dove siamo presenti questa settimana</p>
          <RouterLink to="/dove-siamo" class="btn-cta">
            Dove Siamo
          </RouterLink>
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
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useAdmin } from '@/composables/useAdmin'

const admin = useAdmin()
const { isAdminMode, disableAdminMode } = admin

// Cambia iframe source in base a modalità admin
const iframeSrc = computed(() => {
  return isAdminMode.value 
    ? '/src/stores/volantino-editor.html'
    : '/src/stores/volantino.html'
})

// Log per debug
watch(isAdminMode, (newVal) => {
  console.log('Admin mode changed:', newVal)
  console.log('Iframe src:', iframeSrc.value)
})
</script>

<style scoped lang="scss">
.offerte-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
  padding: 2rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;

  h1 {
    font-size: 3rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-weight: 800;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #666;
    margin-bottom: 1rem;
  }
}

/* Admin Indicator */
.admin-indicator {
  position: fixed;
  top: 90px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  z-index: 999;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-disable-admin {
  background: white;
  color: #10b981;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
  }
}

/* Volantino Container */
.volantino-container {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

.volantino-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  height: 850px;
}

.volantino-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* CTA Section */
.cta-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.cta-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }

  h2 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
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

  &:hover {
    background: #45a049;
    transform: scale(1.05);
  }

  &.btn-whatsapp {
    background: #25D366;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background: #20BA5A;
    }
  }
}

/* Info Section */
.info-section {
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 2rem;
  }
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .info-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
}

/* RESPONSIVE - MOBILE */
@media (max-width: 1200px) {
  .cta-section {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .page-header {
    padding: 1rem 0;
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  /* Admin indicator responsive */
  .admin-indicator {
    top: 70px;
    right: 10px;
    left: 10px;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-disable-admin {
    width: 100%;
  }

  /* Volantino responsive */
  .volantino-wrapper {
    height: 600px;
    max-width: 100%;
  }

  /* CTA cards stack */
  .cta-section {
    gap: 1.5rem;
  }

  .cta-card {
    padding: 1.5rem;

    h2 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.95rem;
    }
  }

  /* Info grid single column */
  .info-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .info-item {
    padding: 1.5rem;
  }
}

/* RESPONSIVE - SMALL MOBILE */
@media (max-width: 480px) {
  .page-header h1 {
    font-size: 1.5rem;
  }

  .volantino-wrapper {
    height: 500px;
  }

  .cta-card {
    padding: 1rem;

    h2 {
      font-size: 1.2rem;
    }
  }
}

/* Impedisci stampa nella modalità pubblica */
@media print {
  .offerte-page {
    display: none !important;
  }
  
  body {
    display: none !important;
  }
}
</style>
