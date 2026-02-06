<template>
  <div class="products-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1>📋 Listino Prezzi</h1>
        <p>Gestisci facilmente prodotti e prezzi</p>
      </div>
    </section>

    <!-- Lista Prodotti -->
    <section class="main-content">
      <div class="container">
        <!-- Indicatore Admin -->
        <div v-if="isAdminMode" class="admin-indicator">
          👨‍💼 Modalità Admin Attiva
        </div>

        <!-- Pulsante Modifica (solo in admin mode) -->
        <div v-if="isAdminMode" class="action-bar">
          <button 
            v-if="!isEditMode" 
            @click="enterEditMode" 
            class="btn btn-edit"
          >
            ✏️ Modifica Prezzi
          </button>
          <div v-else class="edit-actions">
            <button @click="saveChanges" class="btn btn-save">
              💾 Salva Modifiche
            </button>
            <button @click="cancelEdit" class="btn btn-cancel">
              ❌ Annulla
            </button>
          </div>
        </div>

        <!-- Messaggio di Successo -->
        <div v-if="showSuccessMessage" class="success-message">
          ✅ Modifiche salvate con successo!
        </div>

        <!-- Barra di Ricerca e Filtri -->
        <div class="search-and-filters">
          <!-- Barra di Ricerca -->
          <div class="search-bar">
            <input 
              type="text" 
              v-model="searchQuery"
              @input="onSearchInput"
              @keyup="onSearchInput"
              placeholder="🔍 Cerca prodotto per nome o provenienza..."
              class="search-input"
            />
            <button 
              v-if="searchQuery" 
              @click="clearSearch" 
              class="clear-search-btn"
              title="Cancella ricerca"
            >
              ✕
            </button>
          </div>

          <!-- Filtri Categoria -->
          <div class="filters">
            <label>Filtra per categoria:</label>
            <select v-model="selectedCategory" class="category-filter">
              <option value="">Tutte le categorie</option>
              <option v-for="cat in allCategories" :key="cat.id" :value="cat.id">
                {{ cat.nome }}
              </option>
            </select>
          </div>
        </div>

        <!-- Tabella Prodotti -->
        <div class="products-table-wrapper">
          <table class="products-table">
            <thead>
              <tr>
                <th>Nome Prodotto</th>
                <th>Provenienza</th>
                <th>Prezzo (€)</th>
                <th>Unità</th>
                <th>Disponibile</th>
                <th v-if="isAdminMode && isEditMode">Descrizione</th>
                <th v-if="isAdminMode && isEditMode">Azioni</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in deduplicatedProducts" :key="index">
                <!-- Nome -->
                <td>
                  <input 
                    v-if="isAdminMode && isEditMode" 
                    v-model="product.name" 
                    type="text"
                    class="edit-input"
                    placeholder="Nome prodotto"
                  />
                  <strong v-else>{{ product.name }}</strong>
                </td>

                <!-- Provenienza -->
                <td>
                  <input 
                    v-if="isAdminMode && isEditMode" 
                    v-model="product.origin" 
                    type="text"
                    class="edit-input"
                    placeholder="Provenienza"
                  />
                  <span v-else>{{ product.origin }}</span>
                </td>

                <!-- Prezzo -->
                <td>
                  <input 
                    v-if="isAdminMode && isEditMode" 
                    v-model.number="product.price" 
                    type="number"
                    step="0.10"
                    class="edit-input price-input"
                    placeholder="0.00"
                  />
                  <span v-else class="price">€{{ product.price }}</span>
                </td>

                <!-- Unità -->
                <td>
                  <select v-if="isAdminMode && isEditMode" v-model="product.unit" class="edit-select">
                    <option value="kg">kg</option>
                    <option value="pz">pz</option>
                    <option value="conf">conf</option>
                  </select>
                  <span v-else>/{{ product.unit }}</span>
                </td>

                <!-- Disponibilità -->
                <td>
                  <label v-if="isAdminMode && isEditMode" class="checkbox-label">
                    <input 
                      type="checkbox" 
                      v-model="product.available"
                      class="checkbox-input"
                    />
                    <span>{{ product.available ? '✓ Sì' : '✗ No' }}</span>
                  </label>
                  <span 
                    v-else 
                    class="availability-badge"
                    :class="{ 'available': product.available }"
                  >
                    {{ product.available ? '✓ Disponibile' : '✗ Non disponibile' }}
                  </span>
                </td>

                <!-- Descrizione (solo in admin mode e edit mode) -->
                <td v-if="isAdminMode && isEditMode">
                  <textarea 
                    v-model="product.description" 
                    class="edit-textarea"
                    placeholder="Descrizione prodotto"
                    rows="2"
                  ></textarea>
                </td>

                <!-- Azioni (solo in admin mode e edit mode) -->
                <td v-if="isAdminMode && isEditMode">
                  <button 
                    @click="removeProduct(index)" 
                    class="btn-delete"
                    title="Elimina prodotto"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Messaggio se nessun risultato -->
          <div v-if="deduplicatedProducts.length === 0" class="no-results">
            <p>🔍 Nessun prodotto trovato</p>
            <p v-if="searchQuery">Prova a modificare i criteri di ricerca</p>
            <button v-if="searchQuery || selectedCategory" @click="clearAllFilters" class="btn btn-clear-filters">
              🔄 Rimuovi tutti i filtri
            </button>
          </div>
        </div>

        <!-- Aggiungi Prodotto (solo in admin mode e edit mode) -->
        <div v-if="isAdminMode && isEditMode" class="add-product-section">
          <button @click="addNewProduct" class="btn btn-add">
            ➕ Aggiungi Nuovo Prodotto
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useProductsStore } from '@/stores/productsStore'
import { useAdmin } from '@/composables/useAdmin'

const store = useProductsStore()
const admin = useAdmin()

// Assicurati che isAdminMode sia reattivo
const isAdminMode = computed(() => admin.isAdminMode.value)

const isEditMode = ref(false)
const showSuccessMessage = ref(false)
const selectedCategory = ref('')
const searchQuery = ref('')
const editableProducts = ref([])

// Raccogli tutte le categorie
const allCategories = computed(() => {
  const cats = []
  
  // Prodotti stagionali
  store.stagioni.forEach(stagione => {
    stagione.sottocategorie.forEach(sottoCat => {
      cats.push({
        id: sottoCat.id,
        nome: `${stagione.nome} - ${sottoCat.nome}`,
        type: 'seasonal',
        seasonId: stagione.id,
        subCatId: sottoCat.id
      })
    })
  })
  
  // Prodotti tutto l'anno
  store.categorieTuttoAnno.forEach(cat => {
    cats.push({
      id: cat.id,
      nome: cat.nome,
      type: 'yearRound',
      catId: cat.id
    })
  })
  
  return cats
})

// Raccogli tutti i prodotti (CON DUPLICATI - stesso ID in più categorie)
const allProducts = computed(() => {
  const products = []
  
  // Prodotti stagionali
  store.stagioni.forEach(stagione => {
    stagione.sottocategorie.forEach(sottoCat => {
      sottoCat.prodotti.forEach(prod => {
        products.push({
          ...prod,
          categoryId: sottoCat.id,
          categoryName: `${stagione.nome} - ${sottoCat.nome}`,
          type: 'seasonal'
        })
      })
    })
  })
  
  // Prodotti tutto l'anno
  store.categorieTuttoAnno.forEach(cat => {
    cat.products.forEach(prod => {
      products.push({
        ...prod,
        categoryId: cat.id,
        categoryName: cat.nome,
        type: 'yearRound'
      })
    })
  })
  
  return products
})

// ═══════════════════════════════════════════════════════════════
// COMPUTED FILTRATA - CON FILTRI FUNZIONANTI E DEDUPLICAZIONE
// ═══════════════════════════════════════════════════════════════
const filteredProducts = computed(() => {
  // Usa editableProducts se in modalità edit, altrimenti allProducts
  let filtered = isEditMode.value ? [...editableProducts.value] : [...allProducts.value]

  const hasSearch = searchQuery.value && searchQuery.value.trim() !== ''
  const hasCategory = selectedCategory.value && selectedCategory.value !== ''

  // ═══════════════════════════════════════════════════════════════
  // FILTRO 1: CATEGORIA
  // ═══════════════════════════════════════════════════════════════
  if (hasCategory) {
    const selectedCat = selectedCategory.value
    
    filtered = filtered.filter(p => {
      // Confronto robusto che funziona con string e number
      // Usa == (loose equality) per ignorare differenze di tipo
      const match = p.categoryId == selectedCat ||
                    String(p.categoryId) === String(selectedCat) ||
                    Number(p.categoryId) === Number(selectedCat)
      
      return match
    })
  }

  // ═══════════════════════════════════════════════════════════════
  // FILTRO 2: RICERCA - VERSIONE ULTRA ROBUSTA
  // ═══════════════════════════════════════════════════════════════
  if (hasSearch) {
    const query = searchQuery.value.toLowerCase().trim()
    
    console.log('━━━ RICERCA ATTIVA ━━━')
    console.log('Query:', query)
    console.log('Prodotti prima del filtro:', filtered.length)
    
    filtered = filtered.filter(p => {
      // Normalizza tutti i campi (rimuove accenti, spazi multipli, etc)
      const normalizeString = (str) => {
        return String(str || '')
          .toLowerCase()
          .normalize("NFD")  // Decompose accents
          .replace(/[\u0300-\u036f]/g, "")  // Remove accents
          .replace(/\s+/g, ' ')  // Spazi multipli → singolo spazio
          .trim()
      }
      
      const name = normalizeString(p.name)
      const origin = normalizeString(p.origin)
      const description = normalizeString(p.description)
      const categoryName = normalizeString(p.categoryName)
      
      // Normalizza anche la query
      const normalizedQuery = normalizeString(query)
      
      // Cerca in tutti i campi
      const nameMatch = name.includes(normalizedQuery)
      const originMatch = origin.includes(normalizedQuery)
      const descMatch = description.includes(normalizedQuery)
      const categoryMatch = categoryName.includes(normalizedQuery)
      
      const isMatch = nameMatch || originMatch || descMatch || categoryMatch
      
      if (isMatch) {
        console.log('  ✓ Match:', p.name)
      }
      
      return isMatch
    })
    
    console.log('Prodotti dopo ricerca:', filtered.length)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━')
  }

  return filtered
})

// ═══════════════════════════════════════════════════════════════
// PRODOTTI DEDUPLICATI - Mostra solo UNO per ID
// ═══════════════════════════════════════════════════════════════
const deduplicatedProducts = computed(() => {
  const products = filteredProducts.value
  const seen = new Map()
  const unique = []
  
  console.log('🔄 Deduplicazione prodotti...')
  console.log('Totale prodotti filtrati:', products.length)
  
  for (const product of products) {
    // Usa l'ID originale per deduplicare
    const originalId = product.id
    
    if (!seen.has(originalId)) {
      seen.set(originalId, true)
      unique.push(product)
      console.log('  ✓ Unico:', product.name, '(id:', originalId, ')')
    } else {
      console.log('  ⏭️ Skip:', product.name, '(id:', originalId, ') - duplicato')
    }
  }
  
  console.log('📊 Risultato: ', unique.length, 'prodotti unici su', products.length, 'totali')
  return unique
})

// ═══════════════════════════════════════════════════════════════
// WATCHERS PER FORZARE IL RICALCOLO
// ═══════════════════════════════════════════════════════════════
watch(searchQuery, (newVal, oldVal) => {
  console.log('🔍 Ricerca cambiata:', oldVal, '→', newVal)
  if (newVal !== oldVal) {
    nextTick(() => {
      console.log('Prodotti filtrati:', filteredProducts.value.length)
    })
  }
})

watch(selectedCategory, (newVal, oldVal) => {
  console.log('📁 Categoria cambiata:', oldVal, '→', newVal)
})

// ═══════════════════════════════════════════════════════════════
// WATCHER: Sincronizza duplicati in TEMPO REALE durante l'editing
// ═══════════════════════════════════════════════════════════════
watch(editableProducts, (newProducts) => {
  if (!isEditMode.value) return
  
  // Raggruppa prodotti per ID
  const productsByIdMap = new Map()
  newProducts.forEach(product => {
    if (!productsByIdMap.has(product.id)) {
      productsByIdMap.set(product.id, [])
    }
    productsByIdMap.get(product.id).push(product)
  })
  
  // Sincronizza duplicati (il primo è il "master")
  productsByIdMap.forEach((products, id) => {
    if (products.length > 1) {
      const master = products[0]
      
      for (let i = 1; i < products.length; i++) {
        // Solo se i valori sono diversi, sincronizza
        if (products[i].price !== master.price ||
            products[i].name !== master.name ||
            products[i].origin !== master.origin ||
            products[i].available !== master.available) {
          
          products[i].name = master.name
          products[i].origin = master.origin
          products[i].price = master.price
          products[i].unit = master.unit
          products[i].available = master.available
          products[i].description = master.description
          
          console.log(`🔄 Auto-sync: "${master.name}" duplicato ${i + 1}`)
        }
      }
    }
  })
}, { deep: true })

// ═══════════════════════════════════════════════════════════════
// HANDLER INPUT RICERCA (forza update)
// ═══════════════════════════════════════════════════════════════
const onSearchInput = (event) => {
  const value = event.target.value
  console.log('⌨️ Input ricerca:', value)
  
  // Forza l'aggiornamento
  searchQuery.value = value.trim()
  
  // Forza Vue a ricalcolare
  nextTick(() => {
    console.log('Filtrati:', filteredProducts.value.length)
  })
}

const clearSearch = () => {
  searchQuery.value = ''
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
}

const enterEditMode = () => {
  // Crea una copia dei prodotti per editing
  editableProducts.value = JSON.parse(JSON.stringify(allProducts.value))
  isEditMode.value = true
}

const cancelEdit = () => {
  if (confirm('Annullare le modifiche? Le modifiche non salvate verranno perse.')) {
    isEditMode.value = false
    editableProducts.value = []
  }
}

const saveChanges = () => {
  if (!confirm('Salvare le modifiche al listino?')) {
    return
  }
  
  console.log('💾 Salvataggio modifiche...')
  
  // ═══════════════════════════════════════════════════════════════
  // SINCRONIZZA I DUPLICATI: Se hai modificato un prodotto,
  // applica le modifiche a TUTTE le sue copie (stesso ID)
  // ═══════════════════════════════════════════════════════════════
  const productsByIdMap = new Map()
  
  // Prima passata: raggruppa prodotti per ID
  editableProducts.value.forEach(product => {
    if (!productsByIdMap.has(product.id)) {
      productsByIdMap.set(product.id, [])
    }
    productsByIdMap.get(product.id).push(product)
  })
  
  // Seconda passata: sincronizza duplicati
  productsByIdMap.forEach((products, id) => {
    if (products.length > 1) {
      console.log(`🔄 Sincronizzazione ${products.length} duplicati di "${products[0].name}" (id: ${id})`)
      
      // Usa il primo prodotto come "master"
      const master = products[0]
      
      // Applica i valori del master a tutti gli altri
      for (let i = 1; i < products.length; i++) {
        products[i].name = master.name
        products[i].origin = master.origin
        products[i].price = master.price
        products[i].unit = master.unit
        products[i].available = master.available
        products[i].description = master.description
        
        console.log(`  ✓ Sincronizzato duplicato ${i + 1}`)
      }
    }
  })
  
  console.log('✅ Sincronizzazione duplicati completata')
  
  // Aggiorna lo store Pinia (questo aggiornerà automaticamente tutte le pagine)
  store.updateProductsFromListino(editableProducts.value)
  
  isEditMode.value = false
  showSuccessMessage.value = true
  
  // Ricarica i dati aggiornati
  editableProducts.value = JSON.parse(JSON.stringify(allProducts.value))
  
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)
}

const removeProduct = (index) => {
  if (confirm('Eliminare questo prodotto?')) {
    editableProducts.value.splice(index, 1)
  }
}

const addNewProduct = () => {
  const newProduct = {
    id: `new-${Date.now()}`,
    name: '',
    origin: '',
    price: 0,
    unit: 'kg',
    available: true,
    description: '',
    categoryId: '',
    categoryName: '',
    type: 'yearRound'
  }
  
  editableProducts.value.push(newProduct)
  
  // Scroll alla fine della tabella
  setTimeout(() => {
    const table = document.querySelector('.products-table-wrapper')
    if (table) {
      table.scrollTop = table.scrollHeight
    }
  }, 100)
}

onMounted(() => {
  console.log('🚀 Products component montato')
  console.log('Prodotti totali:', allProducts.value.length)
  console.log('Categorie disponibili:', allCategories.value.length)
  
  // ═══════════════════════════════════════════════════════════════
  // DEBUG: Cerca tutti i prodotti che contengono "salame"
  // ═══════════════════════════════════════════════════════════════
  const salami = allProducts.value.filter(p => 
    String(p.name || '').toLowerCase().includes('salame')
  )
  
  console.log('\n📦 DEBUG: Prodotti con "salame":', salami.length)
  salami.forEach(s => {
    console.log('  -', s.name, '| id:', s.id, '| categoria:', s.categoryName)
  })
  
  // ═══════════════════════════════════════════════════════════════
  // DEBUG: Cerca "nostrano"
  // ═══════════════════════════════════════════════════════════════
  const nostrani = allProducts.value.filter(p => 
    String(p.name || '').toLowerCase().includes('nostrano')
  )
  
  console.log('\n📦 DEBUG: Prodotti con "nostrano":', nostrani.length)
  nostrani.forEach(n => {
    console.log('  -', n.name, '| id:', n.id, '| categoria:', n.categoryName)
  })
  
  // ═══════════════════════════════════════════════════════════════
  // DEBUG: Cerca "salame nostrano" (insieme)
  // ═══════════════════════════════════════════════════════════════
  const salameNostrano = allProducts.value.filter(p => {
    const name = String(p.name || '').toLowerCase()
    return name.includes('salame') && name.includes('nostrano')
  })
  
  console.log('\n📦 DEBUG: Prodotti "salame nostrano":', salameNostrano.length)
  salameNostrano.forEach(sn => {
    console.log('  -', sn.name, '| id:', sn.id, '| categoria:', sn.categoryName)
  })
  
  console.log('\n═══════════════════════════════════════════════════')
})
</script>

<style scoped lang="scss">
/* Variabili colori */
$primary-color: #4caf50;
$primary-dark: #45a049;
$primary-light: #e8f5e9;
$secondary-color: #2c5f2d;
$danger-color: #f44336;
$danger-dark: #d32f2f;
$danger-light: #ffebee;
$text-color: #333;
$text-light: #666;
$border-color: #e0e0e0;
$bg-light: #f8f9fa;

/* Layout base */
.products-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* Hero Section */
.page-hero {
  background: linear-gradient(135deg, $primary-color 0%, #66bb6a 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin: 0 0 1rem 0;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    margin: 0;
    opacity: 0.95;
  }
}

/* Container */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Main Content */
.main-content {
  padding: 2rem 0 4rem 0;
  position: relative;
}

/* Admin Indicator */
.admin-indicator {
  position: fixed;
  top: 100px;
  right: 20px;
  background: #ff9800;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Action Bar */
.action-bar {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  .btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .btn-edit {
    background: $primary-color;
    color: white;

    &:hover {
      background: $primary-dark;
    }
  }

  .btn-save {
    background: $primary-color;
    color: white;

    &:hover {
      background: $primary-dark;
    }
  }

  .btn-cancel {
    background: #757575;
    color: white;

    &:hover {
      background: #616161;
    }
  }

  .edit-actions {
    display: flex;
    gap: 1rem;
  }
}

/* Success Message */
.success-message {
  background: $primary-light;
  color: $secondary-color;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  border: 2px solid $primary-color;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Search and Filters */
.search-and-filters {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: flex-end;
}

.search-bar {
  flex: 1;
  min-width: 300px;
  position: relative;

  .search-input {
    width: 100%;
    padding: 1rem 3rem 1rem 1rem;
    border: 2px solid $border-color;
    border-radius: 12px;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 4px 8px rgba(76, 175, 80, 0.2);
    }

    &::placeholder {
      color: #999;
    }
  }

  .clear-search-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: $danger-color;
    color: white;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background: $danger-dark;
      transform: translateY(-50%) scale(1.1);
    }
  }
}

.filters {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 0 0 auto;

  label {
    font-weight: 600;
    color: $text-color;
    white-space: nowrap;
  }

  .category-filter {
    padding: 1rem 2rem;
    border: 2px solid $border-color;
    border-radius: 12px;
    font-size: 1rem;
    cursor: pointer;
    background: white;
    min-width: 200px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 4px 8px rgba(76, 175, 80, 0.2);
    }
  }
}

/* Products Table */
.products-table-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.products-table {
  width: 100%;
  border-collapse: collapse;

  thead {
    background: linear-gradient(135deg, $primary-color 0%, #66bb6a 100%);
    color: white;

    th {
      padding: 1.5rem 1rem;
      text-align: left;
      font-weight: 600;
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #f0f0f0;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f8f9fa;
      }

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 1.5rem 1rem;
      vertical-align: middle;

      strong {
        color: $secondary-color;
        font-size: 1.1rem;
      }

      .price {
        color: $primary-color;
        font-weight: 700;
        font-size: 1.2rem;
      }
    }
  }
}

.availability-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;

  &.available {
    background: $primary-light;
    color: $secondary-color;
  }

  &:not(.available) {
    background: $danger-light;
    color: #c62828;
  }
}

/* Edit Inputs */
.edit-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid $border-color;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: $primary-color;
  }

  &.price-input {
    width: 100px;
    font-weight: 700;
    color: $primary-color;
  }
}

.edit-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid $border-color;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  resize: vertical;
  font-family: inherit;
  min-height: 60px;

  &:focus {
    outline: none;
    border-color: $primary-color;
  }
}

.edit-select {
  padding: 0.75rem;
  border: 2px solid $border-color;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: $primary-color;
  }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  .checkbox-input {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  span {
    font-size: 1rem;
  }
}

.btn-delete {
  background: $danger-color;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: $danger-dark;
    transform: scale(1.1);
  }
}

/* No Results */
.no-results {
  text-align: center;
  padding: 3rem 2rem;
  color: $text-light;

  p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  .btn-clear-filters {
    margin-top: 1rem;
    background: $primary-color;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: $primary-dark;
      transform: translateY(-2px);
    }
  }
}

/* Add Product Section */
.add-product-section {
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  background: $bg-light;
  border-radius: 12px;
}

.btn-add {
  background: $primary-color;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: $primary-dark;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
}

/* Responsive - Tablet */
@media (max-width: 1024px) and (min-width: 769px) {
  .products-table {
    font-size: 0.95rem;

    thead th,
    tbody td {
      padding: 1.2rem 0.75rem;
    }
  }

  .search-bar .search-input {
    font-size: 1.05rem;
  }
}

/* Responsive - Mobile */
@media (max-width: 768px) {
  .admin-indicator {
    top: 80px;
    right: 10px;
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    flex-direction: column;
    gap: 0.25rem;
    max-width: 200px;
  }

  .action-bar {
    margin-bottom: 1.5rem;

    .edit-actions {
      flex-direction: column;
      width: 100%;
      gap: 0.75rem;

      button {
        width: 100%;
      }
    }

    button {
      padding: 0.875rem 1.5rem;
      min-height: 44px;
      font-size: 1rem;
    }
  }

  .page-hero {
    padding: 2rem 0;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .search-and-filters {
    gap: 1rem;
  }

  .search-bar {
    .search-input {
      font-size: 1rem;
      padding: 0.875rem 2.5rem 0.875rem 1rem;
      min-height: 44px;
    }

    .clear-search-btn {
      width: 32px;
      height: 32px;
      min-width: 32px;
      min-height: 32px;
    }
  }

  .filters {
    flex-direction: column;
    align-items: stretch;

    label {
      margin-bottom: 0.5rem;
    }

    .category-filter {
      padding: 0.875rem 1.5rem;
      min-height: 44px;
      font-size: 1rem;
    }
  }

  .products-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 -1rem;
    padding: 0 1rem;
  }

  .products-table {
    font-size: 0.85rem;
    min-width: 600px;

    thead th {
      padding: 1rem 0.5rem;
      font-size: 0.9rem;
      white-space: nowrap;
    }

    tbody td {
      padding: 0.875rem 0.5rem;
    }

    @media (max-width: 480px) {
      th:nth-child(2),
      td:nth-child(2) {
        display: none;
      }
    }
  }

  .edit-input {
    min-height: 40px;
    font-size: 1rem;

    &.price-input {
      width: 100%;
      max-width: 100px;
    }
  }

  .edit-select {
    min-height: 40px;
    font-size: 1rem;
  }

  .checkbox-label {
    min-height: 44px;
    padding: 0.5rem 0;

    .checkbox-input {
      width: 28px;
      height: 28px;
      min-width: 28px;
      min-height: 28px;
    }
  }

  .btn-delete {
    min-width: 44px;
    min-height: 44px;
    padding: 0.75rem;
  }

  .no-results {
    padding: 2rem 1rem;

    p {
      font-size: 1.1rem;
    }

    .btn-clear-filters {
      min-height: 44px;
      width: 100%;
      max-width: 300px;
    }
  }
}

/* Responsive - Mobile molto piccolo */
@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .page-hero {
    padding: 1.5rem 0;

    h1 {
      font-size: 1.75rem;
    }
  }

  .search-bar .search-input {
    font-size: 16px;
  }
}
</style>