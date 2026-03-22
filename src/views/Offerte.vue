<!--
  Offerte: wrapper che mostra OffertePubblica (utenti) o OfferteAdmin (admin)
  in base a useAdmin().isAdminMode (Ctrl+Shift+A).
-->
<template>
  <OffertePubblica v-if="!isAdminMode" />
  <Suspense v-else>
    <OfferteAdmin />
    <template #fallback>
      <div class="offerte-admin-loading" role="status">Caricamento editor…</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import OffertePubblica from '@/views/OffertePubblica.vue'

const OfferteAdmin = defineAsyncComponent(() => import('@/views/OfferteAdmin.vue'))

const { isAdminMode } = useAdmin()
</script>

<style scoped>
.offerte-admin-loading {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c5f2d;
  font-weight: 600;
}
</style>
