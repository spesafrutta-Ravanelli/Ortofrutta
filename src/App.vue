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
  padding-top: 185px;
}

/* Tablet orizzontale */
@media (max-width: 1024px) and (min-width: 769px) {
  .main-content { padding-top: 90px; }
}

/* Tablet verticale */
@media (max-width: 768px) and (min-width: 481px) {
  .main-content { padding-top: 85px; }
}

/* Smartphone */
@media (max-width: 480px) {
  .main-content { padding-top: 75px; }
}

/* Landscape */
@media (max-width: 900px) and (orientation: landscape) {
  .main-content { padding-top: 60px; }
}
</style>