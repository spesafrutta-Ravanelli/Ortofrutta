<template>
  <div class="admin-panel">
    <!-- Header con Toggle Admin Mode -->
    <div class="admin-header">
      <div class="container">
        <div class="header-content">
          <div class="header-left">
            <h1>🛒 Pannello Admin E-commerce</h1>
            <div class="keyboard-hint">
              <span class="hint-text">💡 Premi</span>
              <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd>
              <span class="hint-text">per attivare/disattivare Admin</span>
            </div>
          </div>
          <div class="mode-toggle">
            <span class="mode-label">{{ isAdminMode ? '🔧 Modalità Admin' : '👁️ Visualizzazione Pubblica' }}</span>
            <button 
              @click="toggleAdminMode" 
              class="toggle-btn"
              :class="{ 'active': isAdminMode }"
              title="Oppure premi Ctrl+Shift+A"
            >
              <span class="toggle-slider"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Messaggi di Successo/Errore -->
    <div v-if="message.text" class="message" :class="message.type">
      {{ message.text }}
    </div>

    <!-- Bottone Volantino (solo in Admin Mode) -->
      <div v-if="isAdminMode" class="volantino-section">
        <div class="container">
          <button @click="openVolantino" class="btn-volantino-large">
            📄 Apri Editor Volantini
          </button>
          <p class="volantino-hint">
            oppure <a href="/src/stores/volantino-editor.html" target="_blank" class="volantino-link">clicca qui per aprire direttamente</a>
          </p>
        </div>
      </div>

    <!-- Form Aggiungi Prodotto (solo in Admin Mode) -->
    <div v-if="isAdminMode" class="add-product-form">
      <div class="container">
        <h2>➕ Aggiungi Nuovo Prodotto</h2>
        <div class="form-grid">
          <div class="form-group">
            <label>Nome Prodotto *</label>
            <input 
              type="text" 
              v-model="newProduct.name"
              placeholder="Es: Mela Golden"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>Prezzo (€) *</label>
            <input 
              type="number" 
              v-model.number="newProduct.price"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>Quantità in Stock *</label>
            <input 
              type="number" 
              v-model.number="newProduct.stock"
              min="0"
              placeholder="0"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>Categoria *</label>
            <input 
              type="text" 
              v-model="newProduct.category"
              placeholder="Es: Frutta"
              class="form-input"
            />
          </div>
          
          <div class="form-group full-width">
            <label>Descrizione</label>
            <textarea 
              v-model="newProduct.description"
              placeholder="Descrizione del prodotto..."
              class="form-textarea"
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-group full-width">
            <label>URL Immagine</label>
            <input 
              type="text" 
              v-model="newProduct.imageUrl"
              placeholder="/images/products/prodotto.jpg"
              class="form-input"
            />
          </div>
        </div>
        
        <div class="form-actions">
          <button @click="addProduct" class="btn btn-add">
            ➕ Aggiungi Prodotto
          </button>
          <button @click="resetForm" class="btn btn-reset">
            🔄 Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Lista Prodotti -->
    <div class="products-section">
      <div class="container">
        <div class="section-header">
          <h2>📦 Prodotti ({{ products.length }})</h2>
          <div v-if="isAdminMode" class="admin-badge">
            🔧 Modalità Admin Attiva
          </div>
        </div>

        <!-- Grid Prodotti -->
        <div class="products-grid">
          <div 
            v-for="(product, index) in products" 
            :key="product.id"
            class="product-card"
            :class="{ 'low-stock': product.stock <= 5 && product.stock > 0, 'out-of-stock': product.stock === 0 }"
          >
            <!-- Immagine Prodotto -->
            <div class="product-image">
              <img 
                :src="product.imageUrl || '/images/products/default.jpg'" 
                :alt="product.name"
                @error="handleImageError"
              />
              <div v-if="product.stock <= 5 && product.stock > 0" class="stock-badge low">
                ⚠️ Scorte Basse
              </div>
              <div v-if="product.stock === 0" class="stock-badge out">
                ❌ Esaurito
              </div>
            </div>

            <!-- Contenuto Card -->
            <div class="product-content">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-category">📁 {{ product.category }}</p>
              
              <!-- Visualizzazione Pubblica -->
              <template v-if="!isAdminMode">
                <p class="product-description">{{ product.description || 'Nessuna descrizione disponibile' }}</p>
                <div class="product-footer">
                  <span class="product-price">€{{ formatPrice(product.price) }}</span>
                  <span class="product-stock">📦 Stock: {{ product.stock }}</span>
                </div>
              </template>

              <!-- Modalità Admin - Editing Inline -->
              <template v-else>
                <div class="admin-edit-form">
                  <div class="edit-group">
                    <label>Nome:</label>
                    <input 
                      type="text" 
                      v-model="product.name"
                      class="edit-input"
                    />
                  </div>
                  
                  <div class="edit-group">
                    <label>Prezzo (€):</label>
                    <input 
                      type="number" 
                      v-model.number="product.price"
                      step="0.01"
                      min="0"
                      class="edit-input"
                    />
                  </div>
                  
                  <div class="edit-group">
                    <label>Stock:</label>
                    <input 
                      type="number" 
                      v-model.number="product.stock"
                      min="0"
                      class="edit-input"
                    />
                  </div>
                  
                  <div class="edit-group">
                    <label>Categoria:</label>
                    <input 
                      type="text" 
                      v-model="product.category"
                      class="edit-input"
                    />
                  </div>
                  
                  <div class="edit-group full-width">
                    <label>Descrizione:</label>
                    <textarea 
                      v-model="product.description"
                      class="edit-textarea"
                      rows="2"
                    ></textarea>
                  </div>
                  
                  <div class="edit-group full-width">
                    <label>URL Immagine:</label>
                    <input 
                      type="text" 
                      v-model="product.imageUrl"
                      class="edit-input"
                    />
                  </div>
                </div>

                <div class="product-actions">
                  <button @click="saveProduct(index)" class="btn-action btn-save" title="Salva modifiche">
                    💾 Salva
                  </button>
                  <button @click="deleteProduct(index)" class="btn-action btn-delete" title="Elimina prodotto">
                    🗑️ Elimina
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Messaggio se nessun prodotto -->
        <div v-if="products.length === 0" class="empty-state">
          <p>📭 Nessun prodotto disponibile</p>
          <p v-if="isAdminMode">Aggiungi il primo prodotto usando il form sopra!</p>
        </div>
      </div>
    </div>

    <!-- Modal Conferma Eliminazione -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="cancelDelete">
      <div class="modal-content" @click.stop>
        <h3>⚠️ Conferma Eliminazione</h3>
        <p>Sei sicuro di voler eliminare il prodotto <strong>{{ productToDelete?.name }}</strong>?</p>
        <p class="warning">Questa azione non può essere annullata.</p>
        <div class="modal-actions">
          <button @click="confirmDelete" class="btn btn-delete-modal">
            🗑️ Elimina
          </button>
          <button @click="cancelDelete" class="btn btn-cancel-modal">
            ❌ Annulla
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Stato
const isAdminMode = ref(false)
const products = ref([])
const showDeleteModal = ref(false)
const productToDelete = ref(null)
const deleteIndex = ref(-1)

const message = ref({ text: '', type: '' })

// Stato per combinazione tasti
const keysPressed = ref({
  ctrl: false,
  shift: false,
  a: false
})

// Form nuovo prodotto
const newProduct = ref({
  name: '',
  price: 0,
  description: '',
  imageUrl: '',
  stock: 0,
  category: ''
})

// Prodotti demo iniziali
const demoProducts = [
  {
    id: 1,
    name: 'Mela Golden Delicious',
    price: 2.40,
    description: 'Mela dolce e croccante, perfetta per ogni occasione',
    imageUrl: '/images/products/melinda-golden.jpg',
    stock: 50,
    category: 'Frutta'
  },
  {
    id: 2,
    name: 'Pomodoro San Marzano',
    price: 3.50,
    description: 'Pomodoro italiano DOP, ideale per sughi e conserve',
    imageUrl: '/images/products/pomodoro-marinda.jpg',
    stock: 3,
    category: 'Verdura'
  },
  {
    id: 3,
    name: 'Insalata Lattuga',
    price: 1.80,
    description: 'Insalata fresca e croccante, raccolta giornalmente',
    imageUrl: '/images/products/iceberg.jpg',
    stock: 20,
    category: 'Verdura'
  }
]

// Carica prodotti da localStorage
const loadProducts = () => {
  try {
    const saved = localStorage.getItem('adminProducts')
    if (saved) {
      products.value = JSON.parse(saved)
    } else {
      // Inizializza con prodotti demo
      products.value = JSON.parse(JSON.stringify(demoProducts))
      saveProducts()
    }
  } catch (error) {
    showMessage('Errore nel caricamento dei prodotti', 'error')
    products.value = JSON.parse(JSON.stringify(demoProducts))
  }
}

// Salva prodotti in localStorage
const saveProducts = () => {
  try {
    localStorage.setItem('adminProducts', JSON.stringify(products.value))
  } catch (error) {
    showMessage('Errore nel salvataggio dei prodotti', 'error')
  }
}

// Toggle modalità admin
const toggleAdminMode = () => {
  isAdminMode.value = !isAdminMode.value
  showMessage(
    isAdminMode.value ? 'Modalità Admin attivata' : 'Visualizzazione pubblica attivata',
    'success'
  )
}

// Mostra messaggio
const showMessage = (text, type = 'success') => {
  message.value = { text, type }
  setTimeout(() => {
    message.value = { text: '', type: '' }
  }, 3000)
}

// Formattazione prezzo
const formatPrice = (price) => {
  return parseFloat(price).toFixed(2)
}

// Validazione prodotto
const validateProduct = (product) => {
  if (!product.name || product.name.trim() === '') {
    return 'Il nome del prodotto è obbligatorio'
  }
  if (product.price === null || product.price === undefined || product.price < 0) {
    return 'Il prezzo deve essere un numero positivo'
  }
  if (product.stock === null || product.stock === undefined || product.stock < 0) {
    return 'Lo stock deve essere un numero positivo'
  }
  if (!product.category || product.category.trim() === '') {
    return 'La categoria è obbligatoria'
  }
  return null
}

// Aggiungi nuovo prodotto
const addProduct = () => {
  const validationError = validateProduct(newProduct.value)
  if (validationError) {
    showMessage(validationError, 'error')
    return
  }

  const product = {
    id: Date.now(),
    name: newProduct.value.name.trim(),
    price: parseFloat(newProduct.value.price),
    description: newProduct.value.description.trim(),
    imageUrl: newProduct.value.imageUrl.trim() || '/images/products/default.jpg',
    stock: parseInt(newProduct.value.stock),
    category: newProduct.value.category.trim()
  }

  products.value.push(product)
  saveProducts()
  resetForm()
  showMessage('Prodotto aggiunto con successo!', 'success')
}

// Reset form
const resetForm = () => {
  newProduct.value = {
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    stock: 0,
    category: ''
  }
}

// Salva modifiche prodotto
const saveProduct = (index) => {
  const product = products.value[index]
  const validationError = validateProduct(product)
  if (validationError) {
    showMessage(validationError, 'error')
    return
  }

  // Normalizza i dati
  product.price = parseFloat(product.price)
  product.stock = parseInt(product.stock)
  product.name = product.name.trim()
  product.category = product.category.trim()
  product.description = product.description.trim()

  saveProducts()
  showMessage('Prodotto salvato con successo!', 'success')
}

// Elimina prodotto
const deleteProduct = (index) => {
  productToDelete.value = products.value[index]
  deleteIndex.value = index
  showDeleteModal.value = true
}

// Conferma eliminazione
const confirmDelete = () => {
  if (deleteIndex.value >= 0) {
    products.value.splice(deleteIndex.value, 1)
    saveProducts()
    showMessage('Prodotto eliminato con successo!', 'success')
  }
  cancelDelete()
}

// Annulla eliminazione
const cancelDelete = () => {
  showDeleteModal.value = false
  productToDelete.value = null
  deleteIndex.value = -1
}

// Gestione errore immagine
const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%234caf50" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E🛒 Immagine non disponibile%3C/text%3E%3C/svg%3E'
}

// Apri pagina volantino editor (solo admin)
const openVolantino = () => {
  // Costruisci il percorso assoluto del volantino editor
  const baseUrl = window.location.origin
  const volantinoPath = `${baseUrl}/src/stores/volantino-editor.html`
  
  // Apri in una nuova finestra
  const newWindow = window.open(volantinoPath, '_blank', 'width=1200,height=900')
  
  // Se il popup è bloccato, mostra un messaggio
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    showMessage('⚠️ Sblocca i popup per aprire l\'editor, oppure vai direttamente su: /src/stores/volantino-editor.html', 'error')
  } else {
    showMessage('✅ Editor Volantino aperto in una nuova finestra!', 'success')
  }
}

// Gestione combinazione tasti Ctrl+Shift+A
const handleKeyDown = (event) => {
  if (event.ctrlKey) keysPressed.value.ctrl = true
  if (event.shiftKey) keysPressed.value.shift = true
  if (event.key.toLowerCase() === 'a') keysPressed.value.a = true

  // Controlla se tutti i tasti sono premuti
  if (keysPressed.value.ctrl && keysPressed.value.shift && keysPressed.value.a) {
    event.preventDefault() // Previeni il comportamento default (seleziona tutto)
    toggleAdminMode()
    // Reset stato tasti
    resetKeys()
  }
}

const handleKeyUp = (event) => {
  if (event.key === 'Control') keysPressed.value.ctrl = false
  if (event.key === 'Shift') keysPressed.value.shift = false
  if (event.key.toLowerCase() === 'a') keysPressed.value.a = false
}

const resetKeys = () => {
  keysPressed.value = {
    ctrl: false,
    shift: false,
    a: false
  }
}

// Carica prodotti all'avvio
onMounted(() => {
  loadProducts()
  
  // Aggiungi listener per combinazione tasti
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  
  // Mostra suggerimento all'avvio
  setTimeout(() => {
    showMessage('💡 Suggerimento: Premi Ctrl+Shift+A per attivare/disattivare la modalità Admin', 'success')
  }, 1000)
})

// Rimuovi listener quando il componente viene distrutto
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>

<style scoped lang="scss">
.admin-panel {
  min-height: 100vh;
  background: #f5f5f5;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.admin-header {
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  color: white;
  padding: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0;
    }
  }

  .keyboard-hint {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.9;

    .hint-text {
      font-size: 0.85rem;
    }

    kbd {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      font-weight: 600;
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
}

/* Sezione Volantino */
.volantino-section {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  padding: 2rem 0;
  margin: 0;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.btn-volantino-large {
  background: white;
  color: #4caf50;
  padding: 1.5rem 3rem;
  border: none;
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
    background: #f0f0f0;
  }

  &:active {
    transform: translateY(-1px);
  }
}

.volantino-hint {
  color: white;
  margin-top: 1rem;
  font-size: 0.95rem;
  
  .volantino-link {
    color: white;
    text-decoration: underline;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      color: #ffeb3b;
      text-decoration: none;
    }
  }
}

/* Toggle Switch */
.mode-toggle {
  display: flex;
  align-items: center;
  gap: 1rem;

  .mode-label {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .toggle-btn {
    position: relative;
    width: 60px;
    height: 30px;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;

    &.active {
      background: #4caf50;
    }

    .toggle-slider {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 24px;
      height: 24px;
      background: white;
      border-radius: 50%;
      transition: transform 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    &.active .toggle-slider {
      transform: translateX(30px);
    }
  }
}

/* Messaggi */
.message {
  margin: 1rem auto;
  max-width: 1400px;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  animation: slideDown 0.3s ease;

  &.success {
    background: #4caf50;
    color: white;
  }

  &.error {
    background: #f44336;
    color: white;
  }
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

/* Form Aggiungi Prodotto */
.add-product-form {
  background: white;
  padding: 2rem 0;
  margin: 2rem auto;
  max-width: 1400px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h2 {
    color: #2196F3;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    .form-group {
      &.full-width {
        grid-column: 1 / -1;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #333;
      }

      .form-input,
      .form-textarea {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;

        &:focus {
          outline: none;
          border-color: #2196F3;
        }
      }

      .form-textarea {
        resize: vertical;
        font-family: inherit;
      }
    }
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
}

/* Sezione Prodotti */
.products-section {
  padding: 2rem 0;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h2 {
      font-size: 2rem;
      color: #333;
    }

    .admin-badge {
      background: #2196F3;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
    }
  }
}

/* Grid Prodotti */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

/* Card Prodotto */
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &.low-stock {
    border: 2px solid #FF9800;
  }

  &.out-of-stock {
    border: 2px solid #f44336;
    opacity: 0.8;
  }

  .product-image {
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
    background: #f0f0f0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.1);
    }

    .stock-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.85rem;

      &.low {
        background: #FF9800;
        color: white;
      }

      &.out {
        background: #f44336;
        color: white;
      }
    }
  }

  .product-content {
    padding: 1.5rem;

    .product-name {
      font-size: 1.4rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .product-category {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .product-description {
      color: #555;
      line-height: 1.6;
      margin-bottom: 1rem;
      min-height: 3rem;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;

      .product-price {
        font-size: 1.5rem;
        font-weight: 700;
        color: #4caf50;
      }

      .product-stock {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }
}

/* Form Editing Inline */
.admin-edit-form {
  margin: 1rem 0;

  .edit-group {
    margin-bottom: 1rem;

    &.full-width {
      grid-column: 1 / -1;
    }

    label {
      display: block;
      margin-bottom: 0.25rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: #666;
    }

    .edit-input,
    .edit-textarea {
      width: 100%;
      padding: 0.5rem;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 0.9rem;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: #2196F3;
      }
    }

    .edit-textarea {
      resize: vertical;
      font-family: inherit;
    }
  }
}

.product-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

/* Bottoni */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.btn-add {
    background: #4caf50;
    color: white;

    &:hover {
      background: #45a049;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
  }

  &.btn-reset {
    background: #9e9e9e;
    color: white;

    &:hover {
      background: #757575;
    }
  }

  &.btn-action {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    flex: 1;

    &.btn-save {
      background: #2196F3;
      color: white;

      &:hover {
        background: #1976D2;
      }
    }

    &.btn-delete {
      background: #f44336;
      color: white;

      &:hover {
        background: #d32f2f;
      }
    }
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #999;

  p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;

  h3 {
    margin-top: 0;
    color: #333;
  }

  p {
    margin: 1rem 0;
    color: #666;
  }

  .warning {
    color: #f44336;
    font-weight: 600;
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1.5rem;

    .btn {
      &.btn-delete-modal {
        background: #f44336;
        color: white;

        &:hover {
          background: #d32f2f;
        }
      }

      &.btn-cancel-modal {
        background: #9e9e9e;
        color: white;

        &:hover {
          background: #757575;
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .admin-header .header-content {
    flex-direction: column;
    text-align: center;
  }

  .admin-header .header-left {
    align-items: center;
    text-align: center;

    h1 {
      font-size: 2rem;
    }
  }

  .keyboard-hint {
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.8rem;

    kbd {
      font-size: 0.75rem;
      padding: 0.2rem 0.4rem;
    }
  }

  .btn-volantino-large {
    font-size: 1.2rem;
    padding: 1.2rem 2rem;
  }

  .mode-toggle .mode-label {
    font-size: 0.95rem;
  }

  .add-product-form .form-grid {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
