<template>
  <div class="migrate-complete-container">
    <h1>🔥 Migrazione COMPLETA - Stagionali + Categorie</h1>
    
    <div class="status-box">
      <h2>Stato</h2>
      <p v-if="!started">Pronto per migrare TUTTO</p>
      <p v-if="migrating" class="progress">🔥 Migrazione in corso: {{ progress }}%</p>
      <p v-if="completed" class="success">✅ Completato!</p>
      <p v-if="error" class="error">❌ {{ error }}</p>
    </div>

    <div class="stats" v-if="stats.total > 0">
      <h3>📊 Statistiche</h3>
      <p><strong>Prodotti Stagionali:</strong> {{ stats.seasonal }}</p>
      <p><strong>Prodotti Categorie:</strong> {{ stats.category }}</p>
      <p><strong>Totale da migrare:</strong> {{ stats.total }}</p>
      <p v-if="stats.uploaded > 0"><strong>Prodotti caricati:</strong> {{ stats.uploaded }}</p>
    </div>

    <div class="actions">
      <button 
        @click="startCompleteMigration" 
        :disabled="started && !completed"
        class="btn-start"
      >
        {{ getButtonText }}
      </button>
    </div>

    <div class="log" v-if="logs.length > 0">
      <h3>📋 Log Dettagliato</h3>
      <div class="log-entry" v-for="(log, index) in logs" :key="index">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from '@/stores/productsStore'
import { useAdmin } from '@/composables/useAdmin'

const store = useProductsStore()
const admin = useAdmin()

const started = ref(false)
const migrating = ref(false)
const completed = ref(false)
const error = ref('')
const progress = ref(0)
const logs = ref([])

const stats = ref({
  seasonal: 0,
  category: 0,
  total: 0,
  uploaded: 0
})

const getButtonText = computed(() => {
  if (completed.value) return '✅ Completato!'
  if (migrating.value) return '⏳ Migrazione in corso...'
  return '🚀 Avvia Migrazione COMPLETA'
})

// Mapping categorie
const categoryMapping = {
  'salami': 'salumi',
  'formaggi': 'formaggi',
  'latticini': 'latticini',
  'uova': 'uova',
  'frutta': 'frutta',
  'verdura': 'verdura',
  'Frutta-Esotica': 'frutta-esotica',
  'frutta-secca': 'frutta-secca',
  'prodotti-forno': 'prodotti-forno'
}

const categoryNames = {
  'salumi': 'Salumi e Affettati',
  'formaggi': 'Formaggi',
  'latticini': 'Latticini',
  'uova': 'Uova',
  'frutta': 'Frutta',
  'verdura': 'Verdura',
  'frutta-esotica': 'Frutta Esotica',
  'frutta-secca': 'Frutta Secca',
  'prodotti-forno': 'Prodotti da Forno'
}

const addLog = (message) => {
  console.log(message)
  logs.value.push(`${new Date().toLocaleTimeString()} - ${message}`)
}

const startCompleteMigration = async () => {
  if (started.value && !completed.value) return
  
  started.value = true
  completed.value = false
  migrating.value = true
  error.value = ''
  progress.value = 0
  logs.value = []
  stats.value = { seasonal: 0, category: 0, total: 0, uploaded: 0 }
  
  try {
    addLog('🚀 Inizio migrazione COMPLETA')
    
    const productsToMigrate = []
    
    // PARTE 1: Prodotti Stagionali
    addLog('📦 PARTE 1: Raccolta prodotti stagionali...')
    
    store.stagioni.forEach(stagione => {
      addLog(`  ❄️ Stagione: ${stagione.nome}`)
      
      stagione.sottocategorie.forEach(sottocat => {
        const nomeLower = sottocat.nome.toLowerCase()
        const isFrutta = nomeLower.includes('frutta')
        const subcategorySlug = isFrutta ? 'frutta' : 'verdura'
        const subcategoryName = isFrutta ? 'Frutta' : 'Verdura'
        
        addLog(`    ${isFrutta ? '🍎' : '🥬'} ${sottocat.nome}: ${sottocat.prodotti.length} prodotti`)
        
        sottocat.prodotti.forEach(prod => {
          const uniqueId = `seasonal_${stagione.id}_${subcategorySlug}_${prod.id}`
          
          productsToMigrate.push({
            id: uniqueId,
            name: prod.name,
            origin: prod.origin || 'Italia',
            price: parseFloat(prod.price) || 0,
            unit: prod.unit || 'kg',
            available: prod.available !== false,
            image: prod.image || '/images/placeholder-product.jpg',
            description: prod.description || '',
            season: stagione.id,
            seasonName: stagione.nome,
            subcategory: subcategorySlug,
            subcategoryName: subcategoryName,
            type: 'seasonal'
          })
        })
      })
    })
    
    stats.value.seasonal = productsToMigrate.length
    addLog(`✅ Trovati ${stats.value.seasonal} prodotti stagionali`)
    
    // PARTE 2: Prodotti Categorie
    addLog('📦 PARTE 2: Raccolta prodotti categorie...')
    
    store.categorieTuttoAnno.forEach(categoria => {
      const categorySlug = categoryMapping[categoria.id] || categoria.slug || categoria.id
      const categoryName = categoryNames[categorySlug] || categoria.nome
      
      addLog(`  🏷️ Categoria: ${categoryName} (${categoria.products.length} prodotti)`)
      
      categoria.products.forEach(prod => {
        const uniqueId = `category_${categorySlug}_${prod.id}`
        
        productsToMigrate.push({
          id: uniqueId,
          name: prod.name,
          origin: prod.origin || 'Italia',
          price: parseFloat(prod.price) || 0,
          unit: prod.unit || 'kg',
          available: prod.available !== false,
          image: prod.image || '/images/placeholder-product.jpg',
          description: prod.description || '',
          category: categorySlug,
          categoryName: categoryName,
          type: 'year-round'
        })
      })
    })
    
    stats.value.category = productsToMigrate.length - stats.value.seasonal
    stats.value.total = productsToMigrate.length
    
    addLog(`✅ Trovati ${stats.value.category} prodotti categorie`)
    addLog(`✅ TOTALE: ${stats.value.total} prodotti da caricare`)
    
    // PARTE 3: Caricamento su Firebase
    addLog(`🔥 Inizio caricamento su Firebase...`)
    
    const total = productsToMigrate.length
    let uploaded = 0
    
    for (const product of productsToMigrate) {
      try {
        await admin.updateProduct(product.id, product)
        uploaded++
        stats.value.uploaded = uploaded
        progress.value = Math.round((uploaded / total) * 100)
        
        if (uploaded % 50 === 0) {
          addLog(`  ⏳ Caricati ${uploaded}/${total} prodotti...`)
        }
      } catch (err) {
        addLog(`  ❌ Errore caricamento ${product.name}: ${err.message}`)
      }
    }
    
    addLog(`✅ Migrazione completata: ${uploaded}/${total} prodotti caricati`)
    
    // Ricarica e verifica
    await admin.loadProducts()
    const seasonalCount = admin.products.value.filter(p => p.type === 'seasonal').length
    const categoryCount = admin.products.value.filter(p => p.type === 'year-round').length
    
    addLog(`✅ Verifica Firebase:`)
    addLog(`  - Prodotti stagionali: ${seasonalCount}`)
    addLog(`  - Prodotti categorie: ${categoryCount}`)
    addLog(`  - TOTALE: ${admin.products.value.length}`)
    
    completed.value = true
    migrating.value = false
    
  } catch (err) {
    error.value = err.message
    addLog(`❌ ERRORE: ${err.message}`)
    migrating.value = false
  }
}
</script>

<style scoped>
.migrate-complete-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  color: #2c5f2d;
  text-align: center;
  margin-bottom: 2rem;
}

.status-box {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 2px solid #e0e0e0;
}

.status-box h2 {
  margin-top: 0;
  color: #2c5f2d;
}

.status-box p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.progress {
  color: #ff9800;
  font-weight: 600;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.success {
  color: #4caf50;
  font-weight: 600;
}

.error {
  color: #f44336;
  font-weight: 600;
}

.stats {
  background: #e8f5e9;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 2px solid #4caf50;
}

.stats h3 {
  margin-top: 0;
  color: #2c5f2d;
}

.stats p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.actions {
  text-align: center;
  margin-bottom: 2rem;
}

.btn-start {
  background: #4caf50;
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 350px;
}

.btn-start:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
}

.btn-start:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.log {
  background: #1e1e1e;
  color: #00ff00;
  padding: 1.5rem;
  border-radius: 12px;
  max-height: 500px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
}

.log h3 {
  margin-top: 0;
  color: #fff;
  font-family: Arial, sans-serif;
}

.log-entry {
  padding: 0.25rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.log::-webkit-scrollbar {
  width: 10px;
}

.log::-webkit-scrollbar-track {
  background: #2a2a2a;
}

.log::-webkit-scrollbar-thumb {
  background: #4caf50;
  border-radius: 5px;
}
</style>
