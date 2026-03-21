<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
    <CookieBanner />
  </div>
</template>

<script setup>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import CookieBanner from './components/common/CookieBanner.vue'
import { useAdmin } from './composables/useAdmin'

// Inizializza admin mode (Ctrl+Shift+A o triple-tap logo)
const admin = useAdmin()
</script>

<style scoped>
/* NO max-width:100vw — su mobile può superare la larghezza utile e creare overflow */
.main-content {
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - 140px);
  min-height: calc(100dvh - 140px);
  padding-top: clamp(68px, 12vw, 88px);
  padding-bottom: env(safe-area-inset-bottom, 0);
  box-sizing: border-box;
}

@media (max-width: 480px) {
  .main-content {
    padding-top: clamp(64px, 16vw, 76px);
  }
}
</style>
