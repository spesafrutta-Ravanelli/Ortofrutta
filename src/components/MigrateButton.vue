<!-- MigrateButton.vue - Importa prodotti da productsStore.js a Firebase (FIXED) -->
<template>
  <div v-if="showButton" class="migrate-button-container">
    <button @click="migrate" class="migrate-btn" :disabled="isLoading">
      {{ isLoading ? `Migrazione... ${progress}` : '🔄 Importa Prodotti su Firebase' }}
    </button>
    <button @click="closeButton" class="close-btn">✕</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useProductsStore } from '../stores/productsStore';
import { firestoreService } from '../firestore.service';

const showButton = ref(true);
const isLoading = ref(false);
const progress = ref('');

const migrate = async () => {
  isLoading.value = true;
  progress.value = '0%';
  
  try {
    const productsStore = useProductsStore();
    let totalProducts = 0;
    let imported = 0;
    
    // Conta totale prodotti
    productsStore.stagioni.forEach(stagione => {
      stagione.sottocategorie.forEach(cat => {
        totalProducts += cat.prodotti.length;
      });
    });
    productsStore.categorieTuttoAnno.forEach(cat => {
      totalProducts += cat.products.length;
    });

    console.log(`📦 Totale prodotti da importare: ${totalProducts}`);

    // Importa prodotti stagionali
    for (const stagione of productsStore.stagioni) {
      for (const sottoCat of stagione.sottocategorie) {
        for (const prodotto of sottoCat.prodotti) {
          // Crea oggetto pulito senza campi undefined
          const firebaseProduct = {
            id: `prod_${prodotto.id}`,
            name: prodotto.name || 'Senza nome',
            origin: prodotto.origin || 'Italia',
            price: parseFloat(prodotto.price) || 0,
            unit: prodotto.unit || 'kg',
            available: prodotto.available !== false,
            image: prodotto.image || '/images/placeholder-product.jpg',
            description: prodotto.description || '',
            category: sottoCat.id || 'unknown',
            categoryName: sottoCat.nome || 'Categoria',
            season: stagione.id || 'unknown',
            seasonName: stagione.nome || 'Stagione',
            type: 'seasonal'
          };

          await firestoreService.saveProduct(firebaseProduct);
          imported++;
          progress.value = `${Math.round((imported / totalProducts) * 100)}%`;
          
          if (imported % 50 === 0) {
            console.log(`📦 Importati ${imported}/${totalProducts} prodotti...`);
          }
        }
      }
    }

    // Importa prodotti tutto l'anno
    for (const categoria of productsStore.categorieTuttoAnno) {
      for (const prodotto of categoria.products) {
        // Crea oggetto pulito senza campi undefined
        const firebaseProduct = {
          id: `prod_${prodotto.id}`,
          name: prodotto.name || 'Senza nome',
          origin: prodotto.origin || 'Italia',
          price: parseFloat(prodotto.price) || 0,
          unit: prodotto.unit || 'kg',
          available: prodotto.available !== false,
          image: prodotto.image || '/images/placeholder-product.jpg',
          description: prodotto.description || '',
          category: categoria.id || 'unknown',
          categoryName: categoria.name || 'Categoria',
          type: 'year-round'
        };

        await firestoreService.saveProduct(firebaseProduct);
        imported++;
        progress.value = `${Math.round((imported / totalProducts) * 100)}%`;
        
        if (imported % 50 === 0) {
          console.log(`📦 Importati ${imported}/${totalProducts} prodotti...`);
        }
      }
    }

    console.log(`✅ Importazione completata! ${totalProducts} prodotti su Firebase.`);
    alert(`✅ Importazione completata!\n\n${totalProducts} prodotti sono ora su Firebase!`);
    showButton.value = false;
    
  } catch (error) {
    console.error('❌ Errore durante l\'importazione:', error);
    alert(`❌ Errore: ${error.message}\n\nControlla la console per dettagli.`);
  } finally {
    isLoading.value = false;
    progress.value = '';
  }
};

const closeButton = () => {
  if (confirm('Sei sicuro? Non hai ancora importato tutti i prodotti su Firebase.')) {
    showButton.value = false;
  }
};
</script>

<style scoped>
.migrate-button-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  gap: 10px;
  align-items: center;
}

.migrate-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  transition: all 0.3s;
  min-width: 250px;
}

.migrate-btn:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0,0,0,0.3);
}

.migrate-btn:disabled {
  opacity: 0.8;
  cursor: wait;
}

.close-btn {
  background: #f44336;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #d32f2f;
}
</style>
