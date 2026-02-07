// useAdmin.js - Versione con Firebase Firestore e listener globale
import { ref, computed } from 'vue';
import { firestoreService } from '../firestore.service.js';

const isAdminMode = ref(false);
const products = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Variabile per tracciare se il listener è già stato registrato
let listenerRegistered = false;

export function useAdmin() {
  // Carica i prodotti da Firestore
  const loadProducts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      products.value = await firestoreService.getAllProducts();
      console.log('Prodotti caricati da Firestore:', products.value.length);
    } catch (err) {
      error.value = 'Errore nel caricamento dei prodotti';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  // Toggle modalità admin
  const toggleAdminMode = () => {
    isAdminMode.value = !isAdminMode.value;
    if (isAdminMode.value) {
      console.log('✅ Modalità Admin ATTIVATA');
      loadProducts(); // Carica i prodotti quando si entra in modalità admin
    } else {
      console.log('❌ Modalità Admin DISATTIVATA');
    }
  };

  // Listener per la scorciatoia da tastiera Ctrl+Shift+A
  const handleKeyPress = (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'A') {
      event.preventDefault();
      toggleAdminMode();
    }
  };

  // Registra il listener GLOBALMENTE una sola volta
  if (!listenerRegistered) {
    window.addEventListener('keydown', handleKeyPress);
    listenerRegistered = true;
    console.log('🔑 Scorciatoia Admin attivata GLOBALMENTE: Ctrl+Shift+A');
  }

  // Salva un prodotto (crea o aggiorna)
  const saveProduct = async (product) => {
    isLoading.value = true;
    error.value = null;
    try {
      const savedProduct = await firestoreService.saveProduct(product);
      
      // Aggiorna la lista locale
      const index = products.value.findIndex(p => p.id === savedProduct.id);
      if (index !== -1) {
        products.value[index] = savedProduct;
      } else {
        products.value.push(savedProduct);
      }
      
      console.log('✅ Prodotto salvato su Firebase:', savedProduct);
      return savedProduct;
    } catch (err) {
      error.value = 'Errore nel salvataggio del prodotto';
      console.error('❌ Errore salvataggio:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Aggiorna un prodotto esistente
  const updateProduct = async (productId, updates) => {
    isLoading.value = true;
    error.value = null;
    try {
      await firestoreService.updateProduct(productId, updates);
      
      // Aggiorna la lista locale
      const index = products.value.findIndex(p => p.id === productId);
      if (index !== -1) {
        products.value[index] = { ...products.value[index], ...updates };
      }
      
      console.log('✅ Prodotto aggiornato su Firebase:', productId);
      return true;
    } catch (err) {
      error.value = 'Errore nell\'aggiornamento del prodotto';
      console.error('❌ Errore aggiornamento:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Elimina un prodotto
  const deleteProduct = async (productId) => {
    isLoading.value = true;
    error.value = null;
    try {
      await firestoreService.deleteProduct(productId);
      
      // Rimuovi dalla lista locale
      products.value = products.value.filter(p => p.id !== productId);
      
      console.log('✅ Prodotto eliminato da Firebase:', productId);
      return true;
    } catch (err) {
      error.value = 'Errore nell\'eliminazione del prodotto';
      console.error('❌ Errore eliminazione:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Ottieni prodotti per categoria
  const getProductsByCategory = async (category) => {
    isLoading.value = true;
    error.value = null;
    try {
      const categoryProducts = await firestoreService.getProductsByCategory(category);
      console.log(`📦 Prodotti della categoria ${category}:`, categoryProducts.length);
      return categoryProducts;
    } catch (err) {
      error.value = 'Errore nel caricamento dei prodotti per categoria';
      console.error(err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // Migrazione da localStorage (da usare una sola volta)
  const migrateFromLocalStorage = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      await firestoreService.migrateFromLocalStorage();
      await loadProducts(); // Ricarica i prodotti dopo la migrazione
      alert('✅ Migrazione completata! I dati sono ora su Firebase.');
    } catch (err) {
      error.value = 'Errore nella migrazione dei dati';
      console.error(err);
      alert('❌ Errore nella migrazione. Controlla la console.');
    } finally {
      isLoading.value = false;
    }
  };

  // Computed
  const adminProducts = computed(() => products.value);
  const hasProducts = computed(() => products.value.length > 0);

  return {
    isAdminMode,
    isLoading,
    error,
    products: adminProducts,
    hasProducts,
    toggleAdminMode,
    loadProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    migrateFromLocalStorage
  };
}
