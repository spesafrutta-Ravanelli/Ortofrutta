// src/composables/useEventi.js
//
// Lettura in tempo reale degli eventi da Firestore.
// Ogni evento ha: titolo, descrizione, data, imageUrl, publicId, createdAt

import { ref, onUnmounted } from 'vue'
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore'

export function useEventi() {
  const eventi  = ref([])
  const loading = ref(true)
  const error   = ref(null)

  const db = getFirestore()

  const q = query(
    collection(db, 'eventi'),
    orderBy('data', 'desc')
  )

  const unsub = onSnapshot(q, (snap) => {
    eventi.value  = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    loading.value = false
  }, (err) => {
    console.error('[useEventi] Errore lettura eventi:', err)
    error.value   = 'Impossibile caricare gli eventi'
    loading.value = false
  })

  onUnmounted(() => unsub())

  return { eventi, loading, error }
}
