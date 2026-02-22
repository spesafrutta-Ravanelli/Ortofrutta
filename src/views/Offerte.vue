<!--
  STEP 1 – MISURA SPAZI (valori usati per layout brochure full-viewport):
  - Navbar height: ~100px (padding 1.25rem*2 + min-height 60px; App usa 80px offset)
  - Footer height: ~260px (padding 3rem+1rem + contenuto grid; variabile)
  - Max-width contenitore: 1200px (Navbar/Footer/Offerte .container)
  - Brochure attuale: max-width 420px (page), container 800px, min-height 340px
  =============================================================================
  Offerte: wrapper che mostra OffertePubblica (utenti) o OfferteAdmin (admin)
  in base alla modalità. Volantino Editor e Volantino iframe rimossi.
-->
<template>
  <OffertePubblica v-if="!isAdminMode" />
  <OfferteAdmin v-else />
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
import OffertePubblica from '@/views/OffertePubblica.vue'
import OfferteAdmin from '@/views/OfferteAdmin.vue'

const { isAdminMode } = useAdmin()
</script>
