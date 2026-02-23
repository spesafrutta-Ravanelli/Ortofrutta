<!--
  OfferteAdmin: iframe brochure_ravanelli.html (editor).
  Stessa logica del Volantino: editor in iframe, Firebase settings/volantino.
-->
<template>
  <div class="offerte-admin-page">
    <div class="admin-toolbar">
      <span class="admin-badge">🔧 Modalità Admin</span>
      <button class="btn-exit-admin" @click="exitAdminMode">👁️ Vedi come utente</button>
      <RouterLink to="/admin" class="btn-back-admin">← Pannello Admin</RouterLink>
    </div>
    <div class="brochure-container">
      <iframe
        :src="`/src/stores/brochure_ravanelli.html?v=${brochureVersion}`"
        class="brochure-iframe"
        title="Editor Brochure"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAdmin } from '@/composables/useAdmin'

const { toggleAdminMode } = useAdmin()
const brochureVersion = 5 // Incrementare per bypassare cache iframe
const exitAdminMode = () => toggleAdminMode()

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped lang="scss">
.offerte-admin-page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 360px);
  background: #f5f5f5;
}

.admin-toolbar {
  flex-shrink: 0;
  background: linear-gradient(135deg, #2c5f2d, #4caf50);
  color: white;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.admin-badge { font-weight: 700; }
.btn-exit-admin {
  background: rgba(255, 255, 255, 0.9);
  color: #2c5f2d;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.btn-back-admin { color: white; text-decoration: none; }

.brochure-container {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 1rem;
  -webkit-overflow-scrolling: touch;
}

.brochure-iframe {
  width: 100%;
  min-height: 600px;
  height: min(800px, calc(100vh - 180px));
  max-width: 100%;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;
  display: block;
}

@media (max-width: 768px) {
  .offerte-admin-page {
    min-height: 50vh;
  }

  .brochure-container {
    padding: 0.5rem;
  }

  .brochure-iframe {
    min-height: 450px;
    height: min(650px, calc(100vh - 150px));
  }
}

@media (max-width: 480px) {
  .admin-toolbar {
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
  }

  .brochure-iframe {
    min-height: 400px;
    height: min(500px, calc(100vh - 140px));
    border-radius: 8px;
  }
}
</style>
