<!--
  SliderCarousel: componente riutilizzabile per slider con frecce e dots.
  Stesso pattern usato nella Home per le foto dei banchi e in Chi Siamo.
  Supporta contenuti custom tramite slot (non solo immagini).
-->
<template>
  <div class="slider-carousel" :class="{ 'brochure-mode': noClip }">
    <div class="slider-wrapper">
      <div class="slider-container">
        <!-- Slide (contenuto passato via slot) -->
        <div
          v-for="(slot, index) in totalSlides"
          :key="index"
          class="slide"
          :class="{ active: currentSlide === index }"
        >
          <slot :name="`slide-${index}`" :index="index" />
        </div>

        <!-- Controlli navigazione - solo se più di una slide -->
        <template v-if="totalSlides > 1">
          <button
            class="slider-btn prev"
            @click="prevSlide"
            aria-label="Slide precedente"
          >
            ‹
          </button>
          <button
            class="slider-btn next"
            @click="nextSlide"
            aria-label="Slide successiva"
          >
            ›
          </button>

          <!-- Indicatori dots -->
          <div class="slider-dots">
            <button
              v-for="(_, index) in totalSlides"
              :key="index"
              class="dot"
              :class="{ active: currentSlide === index }"
              @click="goToSlide(index)"
              :aria-label="`Vai alla slide ${index + 1}`"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  /** Numero di slide */
  totalSlides: {
    type: Number,
    default: 1
  },
  /** Auto-scroll ogni N secondi (0 = disabilitato) */
  autoSlideInterval: {
    type: Number,
    default: 0
  },
  /** STEP 8: true = overflow visible (brochure), evita taglio prima/ultima pagina */
  noClip: {
    type: Boolean,
    default: false
  }
})

const currentSlide = ref(0)
let slideInterval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.totalSlides
}

const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? props.totalSlides - 1 : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoSlide = () => {
  if (props.autoSlideInterval > 0 && props.totalSlides > 1) {
    slideInterval = setInterval(nextSlide, props.autoSlideInterval)
  }
}

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped lang="scss">
/* Stili identici a Home.vue banco-slider-section */
.slider-carousel {
  width: 100%;
}

.slider-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.slider-container {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

/* STEP 8: brochure mode - non clipare ultima pagina */
.slider-carousel.brochure-mode .slider-container {
  overflow: visible !important;
}

.slide {
  display: none;
  width: 100%;

  &.active {
    display: block;
    animation: fadeIn 0.8s ease-in-out;
  }

  /* Le immagini o il contenuto custom dentro lo slot */
  :deep(img) {
    width: 100%;
    height: auto;
    max-height: 600px;
    object-fit: cover;
    display: block;
  }
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  color: #2c5f2d;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
}

.slider-dots {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;

  .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid white;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

    &:hover {
      background: rgba(255, 255, 255, 0.8);
      transform: scale(1.2);
    }

    &.active {
      background: white;
      transform: scale(1.4);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
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

/* Responsive */
@media (max-width: 768px) {
  .slider-btn {
    width: 45px;
    height: 45px;
    font-size: 1.8rem;

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }

  .slider-dots {
    bottom: 15px;
    gap: 8px;

    .dot {
      width: 10px;
      height: 10px;
    }
  }

  .slide :deep(img) {
    max-height: 400px;
  }
}

@media (max-width: 480px) {
  .slider-btn {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
}
</style>
