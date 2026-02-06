<template>
  <div class="season-detail">
    <!-- Loading State -->
    <div v-if="!stagione" class="loading">
      <p>Caricamento...</p>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Hero -->
      <section class="season-hero">
        <div class="container">
          <RouterLink to="/categorie" class="back-link">
            ← Torna alle categorie
          </RouterLink>
          <div class="season-header">
            <div class="season-icon-large">{{ stagione.icon }}</div>
            <h1>{{ stagione.nome }}</h1>
            <p class="season-period">{{ stagione.mesi }}</p>
          </div>
        </div>
      </section>

      <!-- Sottocategorie (Frutta e Verdura) -->
      <section class="products-section">
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
              ✏️ Modifica Prodotti
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

          <!-- Aggiungi Prodotto (solo in admin mode e edit mode) -->
          <div v-if="isAdminMode && isEditMode" class="add-product-section">
            <div class="add-product-controls">
              <select v-model="selectedSubcategory" class="subcategory-select">
                <option value="">Seleziona sottocategoria</option>
                <option 
                  v-for="subcat in productsToShow" 
                  :key="subcat.id" 
                  :value="subcat.id"
                >
                  {{ subcat.nome }}
                </option>
              </select>
              <button 
                @click="addNewProduct" 
                class="btn btn-add"
                :disabled="!selectedSubcategory"
              >
                ➕ Aggiungi Nuovo Prodotto
              </button>
            </div>
          </div>

          <div 
            v-for="sottocategoria in productsToShow" 
            :key="sottocategoria.id"
            class="category-block"
          >
            <!-- Titolo Sottocategoria -->
            <div class="category-header">
              <h2>
                <span class="category-icon">{{ sottocategoria.icon }}</span>
                {{ sottocategoria.nome }}
              </h2>
            </div>

            <!-- Grid Prodotti con Immagini -->
            <div class="products-grid">
              <div 
                v-for="prodotto in sottocategoria.prodotti" 
                :key="prodotto.id"
                class="product-card"
                :class="{ 'unavailable': !prodotto.available }"
              >
                <div class="product-image-wrapper">
                  <img 
                    :src="prodotto.image || '/images/placeholder-product.jpg'" 
                    :alt="prodotto.name"
                    @error="handleImageError"
                  />
                  <div class="product-overlay">
                    <!-- Modalità Visualizzazione -->
                    <template v-if="!isAdminMode || !isEditMode">
                      <h3>{{ prodotto.name }}</h3>
                      <p class="description" v-if="prodotto.description">
                        {{ prodotto.description }}
                      </p>
                      <p class="origin">Provenienza: {{ prodotto.origin }}</p>
                      <div class="price-tag">
                        €{{ prodotto.price }}/{{ prodotto.unit }}
                      </div>
                      <span 
                        class="availability-badge" 
                        :class="{ 'available': prodotto.available }"
                      >
                        {{ prodotto.available ? '✓ Disponibile' : '✗ Non disponibile' }}
                      </span>
                    </template>

                  <!-- Modalità Admin Edit -->
                  <template v-else>
                    <div class="admin-edit-form">
                      <input 
                        v-model="prodotto.name" 
                        type="text"
                        class="edit-input"
                        placeholder="Nome prodotto"
                      />
                      <input 
                        v-model="prodotto.origin" 
                        type="text"
                        class="edit-input"
                        placeholder="Provenienza"
                      />
                      <div class="price-edit-group">
                        <input 
                          v-model.number="prodotto.price" 
                          type="number"
                          step="0.10"
                          class="edit-input price-input"
                          placeholder="0.00"
                        />
                        <select v-model="prodotto.unit" class="edit-select">
                          <option value="kg">kg</option>
                          <option value="pz">pz</option>
                          <option value="conf">conf</option>
                        </select>
                      </div>
                      <textarea 
                        v-model="prodotto.description" 
                        class="edit-textarea"
                        placeholder="Descrizione prodotto"
                        rows="3"
                      ></textarea>
                      <label class="checkbox-label">
                        <input 
                          type="checkbox" 
                          v-model="prodotto.available"
                          class="checkbox-input"
                        />
                        <span>{{ prodotto.available ? '✓ Disponibile' : '✗ Non disponibile' }}</span>
                      </label>
                      <button 
                        @click="removeProduct(prodotto.id, sottocategoria.id)" 
                        class="btn-delete"
                        title="Elimina prodotto"
                      >
                        🗑️ Elimina
                      </button>
                    </div>
                  </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Info Box -->
      <section class="info-section">
        <div class="container">
          <div class="info-box">
            <div class="info-icon">ℹ️</div>
            <div class="info-content">
              <h3>Prodotti di Stagione</h3>
              <p>
                I prodotti di stagione sono più freschi, saporiti e ricchi di nutrienti. 
                Inoltre, acquistare prodotti di stagione supporta l'agricoltura locale e riduce l'impatto ambientale.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/productsStore'
import { useAdmin } from '@/composables/useAdmin'

const route = useRoute()
const store = useProductsStore()
const admin = useAdmin()

const isAdminMode = computed(() => admin.isAdminMode.value)
const isEditMode = ref(false)
const showSuccessMessage = ref(false)
const editableSubcategories = ref([])
const selectedSubcategory = ref('')

const stagione = computed(() => {
  const seasonId = route.params.seasonId
  return store.getSeasonById(seasonId)
})

const enterEditMode = () => {
  if (stagione.value) {
    editableSubcategories.value = JSON.parse(JSON.stringify(stagione.value.sottocategorie))
    isEditMode.value = true
  }
}

const cancelEdit = () => {
  if (confirm('Annullare le modifiche? Le modifiche non salvate verranno perse.')) {
    isEditMode.value = false
    editableSubcategories.value = []
  }
}

const saveChanges = () => {
  if (!confirm('Salvare le modifiche ai prodotti?')) {
    return
  }
  
  if (stagione.value && editableSubcategories.value.length > 0) {
    // Raccogli tutti i prodotti dalle sottocategorie
    const allProducts = []
    editableSubcategories.value.forEach(sottoCat => {
      sottoCat.prodotti.forEach(prod => {
        allProducts.push({
          ...prod,
          categoryId: sottoCat.id
        })
      })
    })
    
    // Aggiorna le sottocategorie nella stagione locale
    stagione.value.sottocategorie = JSON.parse(JSON.stringify(editableSubcategories.value))
    
    // Aggiorna lo store
    store.updateProductsFromListino(allProducts)
    
    isEditMode.value = false
    showSuccessMessage.value = true
    
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  }
}

// Usa editableSubcategories quando in edit mode
const productsToShow = computed(() => {
  if (isAdminMode.value && isEditMode.value && editableSubcategories.value.length > 0) {
    return editableSubcategories.value
  }
  return stagione.value?.sottocategorie || []
})

const addNewProduct = () => {
  if (!selectedSubcategory.value) {
    alert('Seleziona una sottocategoria prima di aggiungere un prodotto')
    return
  }
  
  const subcategory = editableSubcategories.value.find(sub => sub.id === selectedSubcategory.value)
  if (subcategory) {
    const newProduct = {
      id: Date.now(),
      name: 'Nuovo Prodotto',
      origin: 'Italia',
      price: '0.00',
      unit: 'kg',
      available: true,
      image: '/images/placeholder-product.jpg',
      description: ''
    }
    
    subcategory.prodotti.push(newProduct)
    selectedSubcategory.value = '' // Reset selezione
  }
}

const removeProduct = (productId, subcategoryId) => {
  if (confirm('Eliminare questo prodotto?')) {
    const subcategory = editableSubcategories.value.find(sub => sub.id === subcategoryId)
    if (subcategory) {
      const index = subcategory.prodotti.findIndex(p => p.id === productId)
      if (index !== -1) {
        subcategory.prodotti.splice(index, 1)
      }
    }
  }
}

const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23f0f0f0" width="300" height="300"/%3E%3Ctext fill="%234caf50" font-family="Arial" font-size="60" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E🍎%3C/text%3E%3C/svg%3E'
}
</script>

<style scoped lang="scss">
.season-detail {
  min-height: 100vh;
}

.loading {
  text-align: center;
  padding: 4rem 0;
  font-size: 1.2rem;
  color: #666;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Season Hero */
.season-hero {
  background: linear-gradient(135deg, #2c5f2d 0%, #4caf50 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
  position: relative;

  .back-link {
    display: inline-block;
    color: white;
    text-decoration: none;
    margin-bottom: 1.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
    opacity: 0.9;

    &:hover {
      opacity: 1;
      transform: translateX(-5px);
    }
  }

  .season-header {
    text-align: center;

    .season-icon-large {
      font-size: 6rem;
      margin-bottom: 1rem;
      animation: float 3s ease-in-out infinite;
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .season-period {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.75rem 2rem;
      border-radius: 30px;
      display: inline-block;
      font-size: 1.1rem;
      font-weight: 600;
      backdrop-filter: blur(10px);
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Products Section */
.products-section {
  padding: 4rem 0;
  background: white;
}

.category-block {
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.category-header {
  margin-bottom: 2rem;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: #2c5f2d;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .category-icon {
      font-size: 3rem;
    }
  }
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
}

.product-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(76, 175, 80, 0.3);

    .product-overlay {
      opacity: 1;
    }
  }

  &.unavailable {
    opacity: 0.6;
    filter: grayscale(50%);

    .product-overlay {
      background: linear-gradient(to top, rgba(200, 0, 0, 0.95), rgba(200, 0, 0, 0.7));
    }
  }
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%; /* Aspect ratio 1:1 */
  overflow: hidden;
  background: #f5f5f5;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem 1.5rem;
  opacity: 0;
  transition: opacity 0.4s ease;
  color: white;
  text-align: center;
  overflow-y: auto;
  overflow-x: hidden;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  .description {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    text-align: justify;
    max-height: none;
    overflow-wrap: break-word;
  }

  .origin {
    font-size: 0.95rem;
    opacity: 0.85;
    margin-bottom: 1.2rem;
    font-style: italic;
  }

  .price-tag {
    background: white;
    color: #2c5f2d;
    padding: 0.6rem 1.8rem;
    border-radius: 25px;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .availability-badge {
    padding: 0.5rem 1.2rem;
    border-radius: 20px;
    font-size: 0.95rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid white;

    &.available {
      background: rgba(76, 175, 80, 0.95);
      border-color: rgba(76, 175, 80, 0.95);
    }
  }
}

/* Info Section */
.info-section {
  padding: 3rem 0 4rem;
  background: #f8f9fa;
}

.info-box {
  background: linear-gradient(135deg, #4caf50, #2c5f2d);
  color: white;
  padding: 2.5rem 3rem;
  border-radius: 20px;
  display: flex;
  gap: 2rem;
  align-items: center;
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.3);

  .info-icon {
    font-size: 4rem;
    flex-shrink: 0;
  }

  .info-content {
    h3 {
      font-size: 1.8rem;
      margin-bottom: 0.75rem;
      font-weight: 700;
    }

    p {
      font-size: 1rem;
      line-height: 1.7;
      opacity: 0.95;
    }
  }
}

/* Admin Indicator */
.admin-indicator {
  position: fixed;
  top: 90px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  z-index: 999;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  .edit-actions {
    display: flex;
    gap: 1rem;
  }
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;

  &.btn-edit {
    background: #4caf50;
    color: white;
    font-size: 1.3rem;
    padding: 1.2rem 3rem;

    &:hover {
      background: #45a049;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
    }
  }

  &.btn-save {
    background: #2196F3;
    color: white;
    font-size: 1.2rem;

    &:hover {
      background: #1976D2;
      transform: scale(1.05);
    }
  }

  &.btn-cancel {
    background: #f44336;
    color: white;

    &:hover {
      background: #d32f2f;
    }
  }
}

/* Success Message */
.success-message {
  background: #4caf50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
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

/* Admin Edit Form */
.admin-edit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .edit-input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    background: rgba(255, 255, 255, 0.95);
    color: #333;

    &:focus {
      outline: none;
      border-color: #4caf50;
    }

    &.price-input {
      width: 100px;
      font-weight: 700;
      color: #4caf50;
    }
  }

  .edit-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    resize: vertical;
    font-family: inherit;
    min-height: 80px;

    &:focus {
      outline: none;
      border-color: #4caf50;
    }
  }

  .price-edit-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .edit-select {
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.95);
    color: #333;

    &:focus {
      outline: none;
      border-color: #4caf50;
    }
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: white;

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
    background: #f44336;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    margin-top: 0.5rem;

    &:hover {
      background: #d32f2f;
      transform: scale(1.05);
    }
  }
}

/* Add Product Section */
.add-product-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;

  .add-product-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    .subcategory-select {
      padding: 0.75rem 1.5rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      min-width: 250px;

      &:focus {
        outline: none;
        border-color: #4caf50;
      }
    }
  }

  .btn-add {
    background: #FF9800;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: #F57C00;
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

/* Responsive */
@media (max-width: 768px) {
  .season-hero {
    padding: 2rem 0;

    .season-header {
      .season-icon-large {
        font-size: 4rem;
      }

      h1 {
        font-size: 2.5rem;
      }

      .season-period {
        font-size: 0.95rem;
        padding: 0.5rem 1.5rem;
      }
    }
  }

  .products-section {
    padding: 2.5rem 0;
  }

  .category-header {
    h2 {
      font-size: 1.8rem;
      flex-direction: column;
      gap: 0.5rem;

      .category-icon {
        font-size: 2.5rem;
      }
    }
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .product-overlay {
    h3 {
      font-size: 1.2rem;
    }

    .origin {
      font-size: 0.85rem;
    }

    .price-tag {
      font-size: 1rem;
      padding: 0.4rem 1rem;
    }
  }

  .info-box {
    flex-direction: column;
    padding: 2rem 1.5rem;
    text-align: center;

    .info-icon {
      font-size: 3rem;
    }

    .info-content h3 {
      font-size: 1.5rem;
    }
  }
}
</style>
