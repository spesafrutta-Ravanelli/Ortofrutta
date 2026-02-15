<template>
  <div class="products-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1>📋 Listino Prezzi</h1>
        <p>I nostri prodotti freschi e di qualità</p>
      </div>
    </section>

    <!-- Loading -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">⏳ Caricamento prodotti...</div>
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

        <!-- Info Prodotti -->
        <div class="products-info">
          <p>📦 Prodotti visualizzati: <strong>{{ filteredProducts.length }}</strong></p>
          <p class="sort-info">🔤 Ordinati alfabeticamente</p>
        </div>

        <!-- Tabella Prodotti -->
        <div class="products-table-wrapper">
          <table class="products-table">
            <thead>
              <tr>
                <th v-if="isAdminMode && isEditMode">Immagine</th>
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
                <!-- Immagine (solo in edit mode) -->
                <td v-if="isAdminMode && isEditMode">
                  <div class="image-cell">
                    <img 
                      :src="product.image || '/images/placeholder-product.jpg'" 
                      :alt="product.name"
                      class="product-image-preview"
                      @error="handleImageError"
                    />
                    <div class="image-upload-options">
                      <input 
                        type="file"
                        accept="image/*"
                        @change="(e) => handleImageUpload(e, index)"
                        class="file-input"
                        :id="'file-' + index"
                      />
                      <label :for="'file-' + index" class="file-label">
                        📁 Carica
                      </label>
                      <span class="separator">o</span>
                      <input 
                        v-model="product.image" 
                        type="text"
                        placeholder="URL immagine..."
                        class="edit-input image-url-input"
                      />
                    </div>
                    <div v-if="uploadProgress[index]" class="upload-progress">
                      Caricamento: {{ uploadProgress[index] }}%
                    </div>
                  </div>
                </td>

                <!-- Nome -->
                <td>
                  <input 
                    v-if="isAdminMode && isEditMode" 
                    v-model="product.name" 
                    type="text"
                    class="edit-input"
                  />
                  <span v-else class="product-name">{{ product.name }}</span>
                </td>

                <!-- Provenienza -->
                <td>
                  <input 
                    v-if="isAdminMode && isEditMode" 
                    v-model="product.origin" 
                    type="text"
                    class="edit-input"
                  />
                  <span v-else class="product-origin">{{ product.origin }}</span>
                </td>

                <!-- Prezzo -->
                <td>
                  <input 
                    v-if="isAdminMode && isEditMode" 
                    v-model.number="product.price" 
                    type="number"
                    step="0.10"
                    class="edit-input price-input"
                  />
                  <span v-else class="product-price">{{ formatPrice(product.price) }}</span>
                </td>

                <!-- Unità -->
                <td>
                  <select 
                    v-if="isAdminMode && isEditMode" 
                    v-model="product.unit"
                    class="edit-select"
                  >
                    <option value="kg">kg</option>
                    <option value="pz">pz</option>
                    <option value="conf">conf</option>
                  </select>
                  <span v-else class="product-unit">{{ product.unit }}</span>
                </td>

                <!-- Disponibile -->
                <td>
                  <label v-if="isAdminMode && isEditMode" class="checkbox-label">
                    <input 
                      type="checkbox" 
                      v-model="product.available"
                      class="checkbox-input"
                    />
                  </label>
                  <span 
                    v-else 
                    class="availability-badge"
                    :class="{ 'available': product.available }"
                  >
                    {{ product.available ? '✓' : '✗' }}
                  </span>
                </td>

                <!-- Azioni -->
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
        </div>

        <!-- Aggiungi Prodotto (solo in edit mode) -->
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
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const admin = useAdmin()

// State
const isAdminMode = computed(() => admin.isAdminMode.value)
const isEditMode = ref(false)
const showSuccessMessage = ref(false)
const selectedCategory = ref('')
const searchQuery = ref('')
const editableProducts = ref([])
const isLoading = ref(true)
const uploadProgress = ref({})

// Prodotti da Firebase DE-DUPLICATI e ORDINATI ALFABETICAMENTE
const firebaseProducts = computed(() => {
  const products = admin.products.value || []
  
  // De-duplicazione per NOME
  const uniqueProducts = new Map()
  products.forEach(product => {
    const key = product.name.toLowerCase().trim()
    if (!uniqueProducts.has(key)) {
      uniqueProducts.set(key, product)
    }
  })
  
  // Converti Map in array e ordina alfabeticamente
  return Array.from(uniqueProducts.values()).sort((a, b) => {
    const nameA = (a.name || '').toLowerCase()
    const nameB = (b.name || '').toLowerCase()
    return nameA.localeCompare(nameB)
  })
})

// Categorie uniche per il filtro
const uniqueCategories = computed(() => {
  const cats = new Set()
  firebaseProducts.value.forEach(p => {
    if (p.categoryName) cats.add(p.categoryName)
  })
  return Array.from(cats).sort()
})

// Prodotti filtrati con ricerca e categoria
const filteredProducts = computed(() => {
  let products = isEditMode.value ? editableProducts.value : firebaseProducts.value
  
  // Filtra solo disponibili per il pubblico
  if (!isAdminMode.value) {
    products = products.filter(p => p.available !== false)
  }
  
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
const formatPrice = (price) => {
  return typeof price === 'number' ? price.toFixed(2) : parseFloat(price || 0).toFixed(2)
}

const clearSearch = () => {
  searchQuery.value = ''
}

const enterEditMode = () => {
  editableProducts.value = JSON.parse(JSON.stringify(firebaseProducts.value))
  isEditMode.value = true
}

const cancelEdit = () => {
  if (confirm('Annullare le modifiche? Le modifiche non salvate verranno perse.')) {
    isEditMode.value = false
    editableProducts.value = []
    uploadProgress.value = {}
  }
}

const handleImageUpload = async (event, index) => {
  const file = event.target.files[0]
  if (!file) return
  
  // Valida tipo file
  if (!file.type.startsWith('image/')) {
    alert('Per favore seleziona un file immagine!')
    return
  }
  
  // Valida dimensione (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('L\'immagine è troppo grande! Massimo 5MB.')
    return
  }
  
  try {
    const storage = getStorage()
    const fileName = `products/${Date.now()}_${file.name}`
    const imageRef = storageRef(storage, fileName)
    
    const uploadTask = uploadBytesResumable(imageRef, file)
    
    uploadTask.on('state_changed',
      (snapshot) => {
        // Progress
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        uploadProgress.value[index] = progress
      },
      (error) => {
        console.error('Upload error:', error)
        alert('Errore durante il caricamento dell\'immagine!')
        delete uploadProgress.value[index]
      },
      async () => {
        // Complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        editableProducts.value[index].image = downloadURL
        delete uploadProgress.value[index]
      }
    )
  } catch (error) {
    console.error('Error uploading image:', error)
    alert('Errore durante il caricamento!')
  }
}

const handleImageError = (event) => {
  event.target.src = '/images/placeholder-product.jpg'
}

const saveChanges = async () => {
  if (!confirm('Salvare le modifiche su Firebase?')) return
  
  try {
    for (const product of editableProducts.value) {
      // Prepara i dati rimuovendo campi undefined
      const productData = {
        name: product.name || '',
        origin: product.origin || 'Italia',
        price: Number(product.price) || 0,
        unit: product.unit || 'kg',
        available: product.available !== false,
        description: product.description || '',
        image: product.image || '/images/placeholder-product.jpg',
        type: product.type || 'product'
      }
      
      // Aggiungi campi opzionali solo se esistono
      if (product.category) productData.category = product.category
      if (product.categoryName) productData.categoryName = product.categoryName
      if (product.season) productData.season = product.season
      if (product.seasonName) productData.seasonName = product.seasonName
      if (product.subcategory) productData.subcategory = product.subcategory
      if (product.subcategoryName) productData.subcategoryName = product.subcategoryName
      
      await admin.updateProduct(product.id, productData)
    }
    
    await admin.loadProducts()
    
    isEditMode.value = false
    showSuccessMessage.value = true
    
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
    
  } catch (error) {
    console.error('Errore salvataggio:', error)
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
    console.error('Errore eliminazione:', error)
    alert('Errore nell\'eliminazione.')
  }
}

const addNewProduct = () => {
  const newProduct = {
    id: `new_${Date.now()}`,
    name: 'Nuovo Prodotto',
    origin: 'Italia',
    price: 0,
    unit: 'kg',
    available: true,
    description: '',
    image: '/images/placeholder-product.jpg',
    type: 'product'
  }
  
  editableProducts.value.push(newProduct)
}

// Carica prodotti
onMounted(async () => {
  await admin.loadProducts()
  isLoading.value = false
})
</script>

<style scoped>
.products-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-hero {
  background: linear-gradient(135deg, #2c5f2d 0%, #4caf50 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.page-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-hero p {
  font-size: 1.1rem;
  opacity: 0.95;
}

.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.loading-spinner {
  font-size: 1.5rem;
  color: #4caf50;
}

.main-content {
  padding: 2rem 0;
}

.admin-indicator {
  position: fixed;
  top: 90px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  z-index: 999;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.action-bar {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
}

.edit-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-edit {
  background: #4caf50;
  color: white;
}

.btn-edit:hover {
  background: #45a049;
}

.btn-save {
  background: #2196F3;
  color: white;
}

.btn-save:hover {
  background: #1976D2;
}

.btn-cancel {
  background: #f44336;
  color: white;
}

.btn-cancel:hover {
  background: #d32f2f;
}

.btn-add {
  background: #FF9800;
  color: white;
  font-size: 1.1rem;
  padding: 1rem 2rem;
}

.btn-add:hover {
  background: #F57C00;
}

.success-message {
  background: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.search-and-filters {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.search-bar {
  flex: 1;
  min-width: 300px;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #4caf50;
}

.clear-search-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: #f44336;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-search-btn:hover {
  background: #d32f2f;
}

.filters {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filters label {
  font-weight: 600;
  color: #666;
}

.category-filter {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 200px;
}

.category-filter:focus {
  outline: none;
  border-color: #4caf50;
}

.products-info {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.products-info p {
  margin: 0;
  color: #666;
}

.sort-info {
  font-style: italic;
  color: #4caf50;
}

.products-table-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  margin-bottom: 2rem;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table thead {
  background: #4caf50;
  color: white;
}

.products-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

.products-table td {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.products-table tbody tr:hover {
  background: #f5f5f5;
}

.product-name {
  font-weight: 600;
  color: #2c5f2d;
}

.product-origin {
  color: #666;
}

.product-price {
  font-weight: 700;
  color: #4caf50;
  font-size: 1.1rem;
}

.product-unit {
  color: #666;
  font-size: 0.9rem;
}

.availability-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 600;
  background: #f44336;
  color: white;
  font-size: 0.9rem;
}

.availability-badge.available {
  background: #4caf50;
}

.edit-input {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.95rem;
}

.edit-input:focus {
  outline: none;
  border-color: #4caf50;
}

.price-input {
  width: 100px;
}

.edit-select {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.95rem;
}

.edit-select:focus {
  outline: none;
  border-color: #4caf50;
}

.checkbox-label {
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.btn-delete {
  background: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
}

.btn-delete:hover {
  background: #d32f2f;
}

.add-product-section {
  text-align: center;
  padding: 2rem 0;
}

.image-cell {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  min-width: 200px;
}

.product-image-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

.image-upload-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
}

.file-input {
  display: none;
}

.file-label {
  background: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;
}

.file-label:hover {
  background: #45a049;
}

.separator {
  font-size: 0.85rem;
  color: #999;
}

.image-url-input {
  font-size: 0.85rem;
  padding: 0.4rem;
}

.upload-progress {
  font-size: 0.85rem;
  color: #4caf50;
  font-weight: 600;
}

@media (max-width: 768px) {
  .page-hero h1 {
    font-size: 2rem;
  }

  .search-and-filters {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar {
    min-width: 100%;
  }

  .filters {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .category-filter {
    width: 100%;
  }

  .products-table-wrapper {
    overflow-x: auto;
  }

  .products-table {
    min-width: 1000px;
  }

  .products-info {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
