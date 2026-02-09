import { ref, computed, onMounted, onUnmounted } from 'vue'
import { db } from '@/firebase.config'
import { 
  collection, 
  doc, 
  setDoc,
  deleteDoc, 
  getDocs 
} from 'firebase/firestore'

const isAdminMode = ref(false)
const products = ref([])

export function useAdmin() {
  
  // Toggle modalità admin
  const toggleAdminMode = () => {
    isAdminMode.value = !isAdminMode.value
    if (isAdminMode.value) {
      console.log('✅ Modalità Admin ATTIVATA')
    } else {
      console.log('❌ Modalità Admin DISATTIVATA')
    }
  }
  
  // Listener per la scorciatoia Ctrl+Shift+A
  const handleKeyPress = (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'A') {
      event.preventDefault()
      toggleAdminMode()
    }
  }
  
  // Setup listener tastiera
  onMounted(() => {
    window.addEventListener('keydown', handleKeyPress)
    console.log('🔑 Scorciatoia Admin attivata: Ctrl+Shift+A')
  })
  
  // Cleanup listener
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
  
  // Carica prodotti da Firebase
  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'))
      products.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      console.log(`✅ Caricati ${products.value.length} prodotti da Firebase`)
    } catch (error) {
      console.error('❌ Errore caricamento prodotti:', error)
      products.value = []
    }
  }
  
  // Salva/Aggiorna prodotto (usa setDoc con merge)
  const updateProduct = async (productId, productData) => {
    try {
      const productRef = doc(db, 'products', productId)
      await setDoc(productRef, productData, { merge: true })
      return true
    } catch (error) {
      console.error(`❌ Errore update prodotto ${productId}:`, error)
      throw error
    }
  }
  
  // Elimina prodotto
  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId))
      await loadProducts()
      return true
    } catch (error) {
      console.error('❌ Errore eliminazione prodotto:', error)
      throw error
    }
  }
  
  return {
    isAdminMode: computed(() => isAdminMode.value),
    products: computed(() => products.value),
    toggleAdminMode,
    loadProducts,
    updateProduct,
    deleteProduct
  }
}
