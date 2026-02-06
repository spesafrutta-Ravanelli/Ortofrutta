<template>
  <div class="category-card" @click="goToCategory">
    <div class="card-icon">{{ category.icon }}</div>
    <div class="card-content">
      <h3>{{ category.nome }}</h3>
      <p>{{ category.descrizione }}</p>
      <div class="card-footer">
        <span class="product-count">{{ productCount }} prodotti</span>
        <span class="arrow">→</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/productsStore'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const store = useProductsStore()

const productCount = computed(() => {
  return store.getProductsByCategory(props.category.id).length
})

const goToCategory = () => {
  router.push(`/categorie/${props.category.id}`)
}
</script>

<style scoped lang="scss">
.category-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(76, 175, 80, 0.2);
    border-color: #4caf50;

    .arrow {
      transform: translateX(5px);
    }
  }
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
}

.card-content {
  h3 {
    font-size: 1.3rem;
    color: #2c5f2d;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;

  .product-count {
    color: #4caf50;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .arrow {
    font-size: 1.5rem;
    color: #4caf50;
    transition: transform 0.3s ease;
  }
}
</style>
