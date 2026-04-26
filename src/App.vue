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

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    padding-top: 120x;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding-top: 75px;
  }
}
</style>