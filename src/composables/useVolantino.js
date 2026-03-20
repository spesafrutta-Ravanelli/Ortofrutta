/**
 * Composable useVolantino: connessione Firebase per offerte/volantino.
 * Ascolta in tempo reale il documento settings/volantino (prodotti, date).
 * Usato da OffertePubblica, OfferteAdmin e BrochureSlider.
 */
import { ref, onMounted, onUnmounted } from 'vue'
import { db } from '@/firebase.config'
import { doc, onSnapshot } from 'firebase/firestore'

const VOLANTINO_DOC = { collection: 'settings', id: 'volantino' }

export function useVolantino() {
  const offerte = ref([])
  const dataInizio = ref('')
  const dataFine = ref('')
  let unsubscribe = null

  const setupListener = () => {
    unsubscribe = onSnapshot(
      doc(db, VOLANTINO_DOC.collection, VOLANTINO_DOC.id),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data()
          offerte.value = data.products?.length > 0 ? data.products : []
          dataInizio.value = data.dataInizio || ''
          dataFine.value = data.dataFine || ''
        } else {
          offerte.value = []
          dataInizio.value = ''
          dataFine.value = ''
        }
      },
      (err) => {
        console.error('Firebase volantino:', err)
        offerte.value = []
      }
    )
  }

  const stopListener = () => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }

  onMounted(() => {
    setupListener()
  })

  onUnmounted(() => {
    stopListener()
  })

  return {
    offerte,
    dataInizio,
    dataFine
  }
}
