<template>
  <div class="image-gallery">
    <div v-if="images.length > 0" class="gallery-container">
      <!-- Immagine principale -->
      <div class="main-image">
        <img 
          :src="images[currentIndex]" 
          :alt="`${title} - Immagine ${currentIndex + 1}`"
          @error="handleImageError"
        />
      </div>

      <!-- Thumbnails -->
      <div v-if="images.length > 1" class="thumbnails">
        <button
          v-for="(image, index) in images"
          :key="index"
          class="thumbnail"
          :class="{ active: index === currentIndex }"
          @click="currentIndex = index"
        >
          <img :src="image" :alt="`Thumbnail ${index + 1}`" />
        </button>
      </div>

      <!-- Controlli navigazione -->
      <div v-if="images.length > 1" class="navigation-controls">
        <button 
          class="nav-btn prev" 
          @click="prevImage"
          :disabled="currentIndex === 0"
        >
          ‹
        </button>
        <span class="image-counter">{{ currentIndex + 1 }} / {{ images.length }}</span>
        <button 
          class="nav-btn next" 
          @click="nextImage"
          :disabled="currentIndex === images.length - 1"
        >
          ›
        </button>
      </div>
    </div>

    <!-- Placeholder se non ci sono immagini -->
    <div v-else class="placeholder">
      <div class="placeholder-icon">🖼️</div>
      <p>Immagini in arrivo</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'Galleria'
  }
})

const currentIndex = ref(0)

const nextImage = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  }
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const handleImageError = (e) => {
  // Fallback image in caso di errore
  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImmagine non disponibile%3C/text%3E%3C/svg%3E'
}
</script>

<style scoped lang="scss">
.image-gallery {
  width: 100%;
}

.gallery-container {
  position: relative;
}

.main-image {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4caf50;
    border-radius: 10px;
  }
}

.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border: 3px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f5f5f5;
  padding: 0;

  &:hover {
    border-color: #4caf50;
    transform: scale(1.05);
  }

  &.active {
    border-color: #4caf50;
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.navigation-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #4caf50;
  background: white;
  color: #4caf50;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #4caf50;
    color: white;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.image-counter {
  color: #666;
  font-weight: 600;
  min-width: 60px;
  text-align: center;
}

.placeholder {
  width: 100%;
  height: 400px;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ddd;

  .placeholder-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  p {
    color: #999;
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .main-image {
    height: 300px;
  }

  .thumbnail {
    width: 60px;
    height: 60px;
  }
}
</style>
