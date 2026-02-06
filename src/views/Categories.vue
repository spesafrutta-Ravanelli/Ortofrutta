<template>
  <div class="categories-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1>Le Nostre Categorie</h1>
        <p>Scopri i nostri prodotti organizzati per stagione e disponibilità</p>
      </div>
    </section>

    <!-- Prodotti Stagionali -->
    <section class="seasonal-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">🌿 Prodotti di Stagione</h2>
          <p class="section-description">
            Frutta e verdura fresca di stagione, selezionata con cura per garantire massima freschezza e sapore
          </p>
        </div>

        <div class="seasonal-grid">
          <div 
            v-for="stagione in stagioni" 
            :key="stagione.id"
            class="season-card"
            @click="goToSeason(stagione.id)"
          >
            <div class="season-icon">{{ stagione.icon }}</div>
            <h3>{{ stagione.nome }}</h3>
            <p class="season-months">{{ stagione.mesi }}</p>
            <div class="season-categories">
              <span 
                v-for="(cat, idx) in stagione.sottocategorie" 
                :key="idx"
                class="category-badge"
              >
                {{ cat.icon }} {{ cat.nome }}
              </span>
            </div>
            <div class="season-arrow">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Prodotti Tutto l'Anno -->
    <section class="year-round-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">📦 Prodotti Tutto l'Anno</h2>
          <p class="section-description">
            Prodotti sempre disponibili per le tue esigenze quotidiane
          </p>
        </div>

        <div class="year-round-grid">
          <div 
            v-for="categoria in categorieTuttoAnno" 
            :key="categoria.id"
            class="category-card"
            @click="goToCategory(categoria.slug)"
          >
            <div class="category-icon">{{ categoria.icon }}</div>
            <h3>{{ categoria.nome }}</h3>
            <p>{{ categoria.descrizione }}</p>
            <div class="product-count">
              {{ categoria.products.length }} prodotti
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/productsStore'

const router = useRouter()
const store = useProductsStore()

const stagioni = computed(() => store.stagioni)
const categorieTuttoAnno = computed(() => store.categorieTuttoAnno)

const goToSeason = (seasonId) => {
  router.push(`/stagione/${seasonId}`)
}

const goToCategory = (slug) => {
  router.push(`/categoria/${slug}`)
}
</script>

<style scoped lang="scss">
.categories-page {
  min-height: 100vh;
}

/* Hero Section */
.page-hero {
  background: linear-gradient(135deg, #2c5f2d 0%, #4caf50 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.95;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  color: #2c5f2d;
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Seasonal Section */
.seasonal-section {
  padding: 4rem 0;
  background: white;
}

.seasonal-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.season-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #4caf50, #2c5f2d);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(76, 175, 80, 0.25);
    border-color: #4caf50;

    &::before {
      transform: scaleX(1);
    }

    .season-icon {
      transform: scale(1.2) rotate(10deg);
    }

    .season-arrow {
      opacity: 1;
      transform: translateX(10px);
    }
  }

  .season-icon {
    font-size: 5rem;
    margin-bottom: 1rem;
    display: block;
    transition: transform 0.3s ease;
  }

  h3 {
    font-size: 1.8rem;
    color: #2c5f2d;
    margin-bottom: 0.75rem;
    font-weight: 700;
  }

  .season-months {
    background: #4caf50;
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    font-size: 0.95rem;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 1.5rem;
  }

  .season-categories {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;

    .category-badge {
      background: #e8f5e9;
      color: #2c5f2d;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }
  }

  .season-arrow {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    color: #4caf50;
    opacity: 0;
    transition: all 0.3s ease;
  }
}

/* Year Round Section */
.year-round-section {
  padding: 4rem 0;
  background: #f8f9fa;
}

.year-round-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.category-card {
  background: white;
  padding: 2rem 1.5rem;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(76, 175, 80, 0.2);
    border-color: #4caf50;

    .category-icon {
      transform: scale(1.15);
    }
  }

  .category-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    display: block;
    transition: transform 0.3s ease;
  }

  h3 {
    font-size: 1.4rem;
    color: #2c5f2d;
    margin-bottom: 0.75rem;
    font-weight: 700;
  }

  p {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .product-count {
    background: #e8f5e9;
    color: #2c5f2d;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    display: inline-block;
  }
}

/* Responsive - Tablet */
@media (max-width: 1024px) and (min-width: 769px) {
  .seasonal-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .year-round-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Responsive - Mobile */
@media (max-width: 768px) {
  .page-hero {
    padding: 2rem 0;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .section-title {
    font-size: 2rem;
  }

  .seasonal-section,
  .year-round-section {
    padding: 2.5rem 0;
  }

  .seasonal-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .year-round-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .season-card {
    padding: 2rem 1.5rem;

    .season-icon {
      font-size: 3.5rem;
    }

    h3 {
      font-size: 1.5rem;
    }
  }

  .category-card {
    .category-icon {
      font-size: 3rem;
    }

    h3 {
      font-size: 1.2rem;
    }
  }
}
</style>
