import { ref, computed } from 'vue'
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

// Listener tastiera a livello di modulo — registrato una volta sola
const handleKeyPress = (event) => {
  if (event.ctrlKey && event.shiftKey && (event.key === 'A' || event.key === 'a')) {
    event.preventDefault()
    isAdminMode.value = !isAdminMode.value
    console.log(isAdminMode.value ? '✅ Modalità Admin ATTIVATA' : '❌ Modalità Admin DISATTIVATA')
  }
}
window.addEventListener('keydown', handleKeyPress)

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
