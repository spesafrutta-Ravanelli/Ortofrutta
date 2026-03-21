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
.main-content {
  min-height: calc(100vh - 140px);
  /* Sotto navbar fissa: si adatta a logo più basso su mobile */
  padding-top: clamp(68px, 12vw, 88px);
  padding-bottom: env(safe-area-inset-bottom, 0);
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
}

@media (max-width: 480px) {
  .main-content {
    padding-top: clamp(64px, 16vw, 76px);
  }
}
</style>
