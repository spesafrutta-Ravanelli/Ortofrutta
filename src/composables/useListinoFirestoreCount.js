/**
 * Conteggio prodotti nel listino (collection Firestore `products`),
 * allineato a ciò che legge la pagina Listino (useAdmin → products).
 * Listener in tempo reale: si aggiorna quando cambiano i documenti.
 */
import { ref, onUnmounted } from 'vue'
import { db } from '@/firebase.config'
import { collection, onSnapshot } from 'firebase/firestore'

/** Stessa collection di useAdmin.js e firestore.service.js */
export const LISTINO_PRODUCTS_COLLECTION = 'products'

export function useListinoFirestoreCount() {
  const count = ref(null)
  const loading = ref(true)
  const error = ref(false)

  const col = collection(db, LISTINO_PRODUCTS_COLLECTION)

  const unsubscribe = onSnapshot(
    col,
    (snapshot) => {
      count.value = snapshot.size
      loading.value = false
      error.value = false
    },
    (err) => {
      console.error('[useListinoFirestoreCount]', err)
      error.value = true
      loading.value = false
      count.value = null
    }
  )

  onUnmounted(() => unsubscribe())

  return { count, loading, error }
}
