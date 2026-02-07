<template>
  <div class="products-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1>📋 Listino Prezzi</h1>
        <p>Gestisci facilmente prodotti e prezzi</p>
      </div>
    </section>

    <!-- Loading -->
    <div v-if="admin.isLoading.value" class="loading-overlay">
      <div class="loading-spinner">⏳ Caricamento prodotti da Firebase...</div>
    </div>

    <!-- Lista Prodotti -->
    <section v-else class="main-content">
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
              <option v-for="cat in uniqueCategories" :key="cat" :value="cat">
                {{ cat }}
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
                <th v-if="isAdminMode && isEditMode">Azioni</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in filteredProducts" :key="product.id || index">
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
                  <span v-else class="price">€{{ Number(product.price).toFixed(2) }}</span>
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
          <div v-if="filteredProducts.length === 0" class="no-results">
            <p>🔍 Nessun prodotto trovato</p>
            <p v-if="searchQuery || selectedCategory">Prova a modificare i criteri di ricerca</p>
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
import { ref, computed, onMounted } from 'vue'
import { useAdmin } from '@/composables/useAdmin'

const admin = useAdmin()

// State reattivo
const isAdminMode = computed(() => admin.isAdminMode.value)
const isEditMode = ref(false)
const showSuccessMessage = ref(false)
const selectedCategory = ref('')
const searchQuery = ref('')
const editableProducts = ref([])

// Prodotti da Firebase
const firebaseProducts = computed(() => admin.products.value || [])

// Categorie uniche
const uniqueCategories = computed(() => {
  const cats = new Set()
  firebaseProducts.value.forEach(p => {
    if (p.categoryName) cats.add(p.categoryName)
  })
  return Array.from(cats).sort()
})

// Prodotti filtrati
const filteredProducts = computed(() => {
  let products = isEditMode.value ? editableProducts.value : firebaseProducts.value
  
  // Filtro categoria
  if (selectedCategory.value) {
    products = products.filter(p => p.categoryName === selectedCategory.value)
  }
  
  // Filtro ricerca
  if (searchQuery.value && searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    products = products.filter(p => {
      const name = (p.name || '').toLowerCase()
      const origin = (p.origin || '').toLowerCase()
      const description = (p.description || '').toLowerCase()
      return name.includes(query) || origin.includes(query) || description.includes(query)
    })
  }
  
  return products
})

// Funzioni
const clearSearch = () => {
  searchQuery.value = ''
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
}

const enterEditMode = () => {
  editableProducts.value = JSON.parse(JSON.stringify(firebaseProducts.value))
  isEditMode.value = true
}

const cancelEdit = () => {
  if (confirm('Annullare le modifiche?')) {
    isEditMode.value = false
    editableProducts.value = []
  }
}

const saveChanges = async () => {
  if (!confirm('Salvare le modifiche su Firebase?')) return
  
  console.log('💾 Salvataggio su Firebase...')
  
  try {
    // Salva ogni prodotto modificato
    for (const product of editableProducts.value) {
      await admin.updateProduct(product.id, {
        name: product.name,
        origin: product.origin,
        price: Number(product.price),
        unit: product.unit,
        available: product.available,
        description: product.description || ''
      })
    }
    
    // Ricarica i prodotti da Firebase
    await admin.loadProducts()
    
    isEditMode.value = false
    showSuccessMessage.value = true
    
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
    
  } catch (error) {
    console.error('❌ Errore salvataggio:', error)
    alert('Errore nel salvataggio. Riprova.')
  }
}

const removeProduct = async (index) => {
  if (!confirm('Eliminare questo prodotto?')) return
  
  try {
    const product = editableProducts.value[index]
    await admin.deleteProduct(product.id)
    editableProducts.value.splice(index, 1)
  } catch (error) {
    console.error('❌ Errore eliminazione:', error)
    alert('Errore nell\'eliminazione.')
  }
}

const addNewProduct = () => {
  const newProduct = {
    id: `new_${Date.now()}`,
    name: '',
    origin: 'Italia',
    price: 0,
    unit: 'kg',
    available: true,
    description: '',
    category: 'unknown',
    categoryName: 'Nuovo Prodotto',
    type: 'year-round'
  }
  
  editableProducts.value.push(newProduct)
}

// Carica prodotti all'avvio
onMounted(async () => {
  console.log('📦 Caricamento prodotti da Firebase...')
  await admin.loadProducts()
  console.log(`✅ ${firebaseProducts.value.length} prodotti caricati`)
})
</script>

<!-- Mantieni tutto lo stesso CSS -->
<style scoped lang="scss">
/* STESSO CSS DI PRIMA - Lo copio identico */
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

.products-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  font-size: 2rem;
  font-weight: 600;
  color: $primary-color;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ... RESTO DEL CSS UGUALE ... */
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

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.main-content {
  padding: 2rem 0 4rem 0;
}

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
}

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
    }
  }

  .btn-edit, .btn-save {
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
}

.success-message {
  background: $primary-light;
  color: $secondary-color;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 2rem;
}

.search-and-filters {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
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

    &:focus {
      outline: none;
      border-color: $primary-color;
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

    &:hover {
      background: $danger-dark;
    }
  }
}

.filters {
  display: flex;
  align-items: center;
  gap: 1rem;

  .category-filter {
    padding: 1rem 2rem;
    border: 2px solid $border-color;
    border-radius: 12px;
    min-width: 200px;

    &:focus {
      outline: none;
      border-color: $primary-color;
    }
  }
}

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
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #f0f0f0;

      &:hover {
        background-color: #f8f9fa;
      }
    }

    td {
      padding: 1.5rem 1rem;

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

  &.available {
    background: $primary-light;
    color: $secondary-color;
  }

  &:not(.available) {
    background: $danger-light;
    color: #c62828;
  }
}

.edit-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid $border-color;
  border-radius: 8px;

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

.edit-select {
  padding: 0.75rem;
  border: 2px solid $border-color;
  border-radius: 8px;
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
  }
}

.btn-delete {
  background: $danger-color;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: $danger-dark;
  }
}

.no-results {
  text-align: center;
  padding: 3rem 2rem;
  color: $text-light;

  .btn-clear-filters {
    background: $primary-color;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1rem;

    &:hover {
      background: $primary-dark;
    }
  }
}

.add-product-section {
  text-align: center;
  margin-top: 2rem;
}

.btn-add {
  background: $primary-color;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: $primary-dark;
  }
}

@media (max-width: 768px) {
  .products-table-wrapper {
    overflow-x: auto;
  }
  
  .products-table {
    min-width: 600px;
  }
}
</style>
