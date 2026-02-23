<!--
  Offerte: wrapper che mostra OffertePubblica (utenti) o OfferteAdmin (admin)
  in base a useAdmin().isAdminMode (Ctrl+Shift+A).
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
