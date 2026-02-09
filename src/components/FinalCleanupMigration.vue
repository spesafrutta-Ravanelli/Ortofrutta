<template>
  <div class="cleanup-container">
    <h1>🔥 Pulizia Totale + Migrazione Definitiva</h1>
    
    <div class="warning-box">
      <h2>⚠️ ATTENZIONE</h2>
      <p>Questo script:</p>
      <ul>
        <li>✅ Cancella TUTTI i prodotti da Firebase</li>
        <li>✅ Carica prodotti da productsStore.js</li>
        <li>✅ De-duplica (stesso nome = 1 sola volta)</li>
        <li>✅ Ordine alfabetico</li>
      </ul>
      <p><strong>Questa è l'ULTIMA migrazione!</strong></p>
    </div>

    <div class="status-box">
      <h2>Stato</h2>
      <p v-if="!started">Pronto per iniziare</p>
      <p v-if="cleaning" class="progress">🧹 Pulizia in corso...</p>
      <p v-if="migrating" class="progress">🔥 Migrazione in corso: {{ progress }}%</p>
      <p v-if="completed" class="success">✅ Completato!</p>
      <p v-if="error" class="error">❌ {{ error }}</p>
    </div>

    <div class="stats" v-if="stats.total > 0 || stats.cleaned > 0">
      <h3>📊 Statistiche</h3>
      <p v-if="stats.cleaned > 0"><strong>Prodotti rimossi:</strong> {{ stats.cleaned }}</p>
      <p v-if="stats.original > 0"><strong>Prodotti originali trovati:</strong> {{ stats.original }}</p>
      <p v-if="stats.deduplicated > 0"><strong>Dopo de-duplicazione:</strong> {{ stats.deduplicated }}</p>
      <p v-if="stats.uploaded > 0"><strong>Prodotti caricati su Firebase:</strong> {{ stats.uploaded }}</p>
    </div>

    <div class="actions">
      <button 
        @click="startCleanupAndMigration" 
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
const cleaning = ref(false)
const migrating = ref(false)
const completed = ref(false)
const error = ref('')
const progress = ref(0)
const logs = ref([])

const stats = ref({
  cleaned: 0,
  original: 0,
  deduplicated: 0,
  uploaded: 0,
  total: 0
})

const getButtonText = computed(() => {
  if (completed.value) return '✅ Completato!'
  if (migrating.value) return '⏳ Migrazione in corso...'
  if (cleaning.value) return '🧹 Pulizia in corso...'
  return '🚀 AVVIA PULIZIA E MIGRAZIONE DEFINITIVA'
})

const addLog = (message) => {
  console.log(message)
  logs.value.push(`${new Date().toLocaleTimeString()} - ${message}`)
}

const startCleanupAndMigration = async () => {
  if (started.value && !completed.value) return
  
  if (!confirm('⚠️ ATTENZIONE!\n\nQuesto cancellerà TUTTI i prodotti da Firebase e ripartirà da zero.\n\nSei sicuro/a?')) {
    return
  }
  
  started.value = true
  completed.value = false
  cleaning.value = true
  error.value = ''
  progress.value = 0
  logs.value = []
  stats.value = { cleaned: 0, original: 0, deduplicated: 0, uploaded: 0, total: 0 }
  
  try {
    addLog('🚀 Inizio pulizia e migrazione definitiva')
    
    // FASE 1: PULIZIA TOTALE
    addLog('🧹 FASE 1: Cancellazione TOTALE da Firebase...')
    
    await admin.loadProducts()
    const allProducts = admin.products.value
    
    addLog(`Trovati ${allProducts.length} prodotti da rimuovere`)
    
    for (const product of allProducts) {
      try {
        await admin.deleteProduct(product.id)
        stats.value.cleaned++
      } catch (err) {
        addLog(`⚠️ Errore rimozione ${product.name}: ${err.message}`)
      }
    }
    
    addLog(`✅ Pulizia completata: ${stats.value.cleaned} prodotti rimossi`)
    cleaning.value = false
    migrating.value = true
    
    // FASE 2: MIGRAZIONE DEFINITIVA
    addLog('🔥 FASE 2: Migrazione definitiva da productsStore.js...')
    
    const productsMap = new Map()
    
    // Raccogli TUTTI i prodotti da productsStore.js
    addLog('📦 Raccolta prodotti da file locale...')
    
    // Prodotti stagionali
    store.stagioni.forEach(stagione => {
      stagione.sottocategorie.forEach(sottocat => {
        const nomeLower = sottocat.nome.toLowerCase()
        const isFrutta = nomeLower.includes('frutta')
        const subcategorySlug = isFrutta ? 'frutta' : 'verdura'
        const subcategoryName = isFrutta ? 'Frutta' : 'Verdura'
        
        sottocat.prodotti.forEach(prod => {
          const key = prod.name.toLowerCase().trim()
          
          // Se non esiste già, aggiungilo
          if (!productsMap.has(key)) {
            productsMap.set(key, {
              id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              name: prod.name,
              origin: prod.origin || 'Italia',
              price: parseFloat(prod.price) || 0,
              unit: prod.unit || 'kg',
              available: prod.available !== false,
              image: prod.image || '/images/placeholder-product.jpg',
              description: prod.description || '',
              type: 'product'
            })
          }
        })
      })
    })
    
    // Prodotti categorie tutto anno
    store.categorieTuttoAnno.forEach(categoria => {
      categoria.products.forEach(prod => {
        const key = prod.name.toLowerCase().trim()
        
        if (!productsMap.has(key)) {
          productsMap.set(key, {
            id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: prod.name,
            origin: prod.origin || 'Italia',
            price: parseFloat(prod.price) || 0,
            unit: prod.unit || 'kg',
            available: prod.available !== false,
            image: prod.image || '/images/placeholder-product.jpg',
            description: prod.description || '',
            type: 'product'
          })
        }
      })
    })
    
    stats.value.original = productsMap.size
    addLog(`✅ Trovati ${stats.value.original} prodotti unici (de-duplicati)`)
    
    // Converti in array e ordina alfabeticamente
    const productsToUpload = Array.from(productsMap.values()).sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    })
    
    stats.value.deduplicated = productsToUpload.length
    stats.value.total = productsToUpload.length
    
    addLog(`🔥 Inizio caricamento ${stats.value.total} prodotti su Firebase...`)
    
    const total = productsToUpload.length
    let uploaded = 0
    
    for (const product of productsToUpload) {
      try {
        await admin.updateProduct(product.id, product)
        uploaded++
        stats.value.uploaded = uploaded
        progress.value = Math.round((uploaded / total) * 100)
        
        if (uploaded % 20 === 0) {
          addLog(`  ⏳ Caricati ${uploaded}/${total} prodotti...`)
        }
      } catch (err) {
        addLog(`  ❌ Errore caricamento ${product.name}: ${err.message}`)
      }
    }
    
    addLog(`✅ Migrazione completata: ${uploaded}/${total} prodotti caricati`)
    
    // Verifica finale
    await admin.loadProducts()
    const finalCount = admin.products.value.length
    
    addLog(`✅ Verifica finale: ${finalCount} prodotti su Firebase`)
    addLog(``)
    addLog(`🎉 MIGRAZIONE DEFINITIVA COMPLETATA!`)
    addLog(`📦 Prodotti unici: ${finalCount}`)
    addLog(`🔤 Ordinati alfabeticamente`)
    addLog(`✅ Nessun duplicato`)
    addLog(``)
    addLog(`⚠️ IMPORTANTE: NON fare più migrazioni!`)
    addLog(`Il proprietario può modificare i prezzi da admin mode.`)
    
    completed.value = true
    migrating.value = false
    
  } catch (err) {
    error.value = err.message
    addLog(`❌ ERRORE: ${err.message}`)
    cleaning.value = false
    migrating.value = false
  }
}
</script>

<style scoped>
.cleanup-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  color: #f44336;
  text-align: center;
  margin-bottom: 2rem;
}

.warning-box {
  background: #fff3cd;
  border: 2px solid #ffc107;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.warning-box h2 {
  color: #f44336;
  margin-top: 0;
}

.warning-box ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.warning-box li {
  margin: 0.5rem 0;
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
  background: #f44336;
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 400px;
}

.btn-start:hover:not(:disabled) {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.3);
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
