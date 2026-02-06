<template>
  <div class="product-table-container">
    <!-- Filtri e Ricerca -->
    <div class="table-controls">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cerca prodotto..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>

      <div class="filter-controls">
        <label>
          <input 
            v-model="showOnlyAvailable" 
            type="checkbox"
          />
          Solo disponibili
        </label>
        
        <select v-model="sortOrder" class="sort-select">
          <option value="">Ordina per...</option>
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
          <option value="price-asc">Prezzo (crescente)</option>
          <option value="price-desc">Prezzo (decrescente)</option>
        </select>
      </div>
    </div>

    <!-- Tabella -->
    <div class="table-wrapper">
      <table class="product-table">
        <thead>
          <tr>
            <th>Prodotto</th>
            <th>Descrizione</th>
            <th>Provenienza</th>
            <th>Stagionalità</th>
            <th>Prezzo/Kg</th>
            <th>Disponibilità</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="product in filteredAndSortedProducts" 
            :key="product.id"
            :class="{ 'unavailable': !product.disponibile }"
          >
            <td class="product-name">
              <strong>{{ product.nome }}</strong>
            </td>
            <td>{{ product.provenienza }}</td>
            <td>{{ product.stagionalita }}</td>
            <td class="price">€ {{ product.prezzoKg.toFixed(2) }}</td>
            <td>
              <span 
                class="status-badge" 
                :class="product.disponibile ? 'available' : 'unavailable'"
              >
                {{ product.disponibile ? '✓ Disponibile' : '✗ Non disponibile' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredAndSortedProducts.length === 0" class="no-results">
        <p>Nessun prodotto trovato</p>
      </div>
    </div>

    <!-- Info footer -->
    <div class="table-footer">
      <p>Mostrando {{ filteredAndSortedProducts.length }} di {{ products.length }} prodotti</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})

// State per filtri e ordinamento
const searchQuery = ref('')
const showOnlyAvailable = ref(false)
const sortOrder = ref('')

// Computed per filtrare e ordinare i prodotti
const filteredAndSortedProducts = computed(() => {
  let result = [...props.products]

  // Filtro per ricerca
  if (searchQuery.value) {
    result = result.filter(product => 
      product.nome.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.provenienza.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filtro per disponibilità
  if (showOnlyAvailable.value) {
    result = result.filter(product => product.disponibile)
  }

  // Ordinamento
  if (sortOrder.value) {
    switch (sortOrder.value) {
      case 'name-asc':
        result.sort((a, b) => a.nome.localeCompare(b.nome))
        break
      case 'name-desc':
        result.sort((a, b) => b.nome.localeCompare(a.nome))
        break
      case 'price-asc':
        result.sort((a, b) => a.prezzoKg - b.prezzoKg)
        break
      case 'price-desc':
        result.sort((a, b) => b.prezzoKg - a.prezzoKg)
        break
    }
  }

  return result
})
</script>

<style scoped lang="scss">
.product-table-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 250px;

  .search-input {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #4caf50;
    }
  }

  .search-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
  }
}

.filter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    white-space: nowrap;

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }

  .sort-select {
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    background: white;

    &:focus {
      outline: none;
      border-color: #4caf50;
    }
  }
}

.table-wrapper {
  overflow-x: auto;
  margin-bottom: 1rem;
}

.product-table {
  width: 100%;
  border-collapse: collapse;

  thead {
    background: #f5f5f5;

    th {
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #4caf50;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #e0e0e0;
      transition: background-color 0.2s ease;

      &:hover {
        background: #f9f9f9;
      }

      &.unavailable {
        opacity: 0.6;
      }

      td {
        padding: 1rem;
        color: #555;

        &.product-name {
          strong {
            color: #2c5f2d;
          }
        }

        &.price {
          font-weight: 600;
          color: #4caf50;
          font-size: 1.1rem;
        }
      }
    }
  }
}

.status-badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;

  &.available {
    background: #e8f5e9;
    color: #2e7d32;
  }

  &.unavailable {
    background: #ffebee;
    color: #c62828;
  }
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #999;

  p {
    font-size: 1.1rem;
  }
}

.table-footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
  color: #666;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .table-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    min-width: 100%;
  }

  .filter-controls {
    flex-direction: column;
    align-items: stretch;
    
    label, .sort-select {
      width: 100%;
    }
  }

  .product-table {
    font-size: 0.9rem;

    thead th,
    tbody td {
      padding: 0.75rem 0.5rem;
    }
  }
}
</style>
