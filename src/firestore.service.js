// Firestore Service - Gestione prodotti nel database cloud
import { db } from './firebase.config.js';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where
} from 'firebase/firestore';

const PRODUCTS_COLLECTION = 'products';

export const firestoreService = {
  // Ottieni tutti i prodotti
  async getAllProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return products;
    } catch (error) {
      console.error('Errore nel recupero prodotti:', error);
      throw error;
    }
  },

  // Ottieni un singolo prodotto
  async getProduct(productId) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, productId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Errore nel recupero prodotto:', error);
      throw error;
    }
  },

  // Salva o aggiorna un prodotto
  async saveProduct(product) {
    try {
      const productId = product.id || `prod_${Date.now()}`;
      const docRef = doc(db, PRODUCTS_COLLECTION, productId);
      
      await setDoc(docRef, {
        ...product,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      return { id: productId, ...product };
    } catch (error) {
      console.error('Errore nel salvataggio prodotto:', error);
      throw error;
    }
  },

  // Aggiorna un prodotto
  async updateProduct(productId, updates) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, productId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Errore nell\'aggiornamento prodotto:', error);
      throw error;
    }
  },

  // Elimina un prodotto
  async deleteProduct(productId) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, productId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Errore nell\'eliminazione prodotto:', error);
      throw error;
    }
  },

  // Ottieni prodotti per categoria
  async getProductsByCategory(category) {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION),
        where('category', '==', category)
      );
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return products;
    } catch (error) {
      console.error('Errore nel recupero prodotti per categoria:', error);
      throw error;
    }
  },

  // Migrazione da localStorage a Firestore (da eseguire una volta)
  async migrateFromLocalStorage() {
    try {
      // Prendi i dati da localStorage se esistono
      const localData = localStorage.getItem('products');
      if (!localData) {
        console.log('Nessun dato da migrare da localStorage');
        return;
      }

      const products = JSON.parse(localData);
      console.log(`Migrazione di ${products.length} prodotti...`);

      // Salva ogni prodotto su Firestore
      for (const product of products) {
        await this.saveProduct(product);
      }

      console.log('Migrazione completata!');
      
      // Opzionale: rimuovi i dati locali dopo la migrazione
      // localStorage.removeItem('products');
      
      return true;
    } catch (error) {
      console.error('Errore nella migrazione:', error);
      throw error;
    }
  }
};
