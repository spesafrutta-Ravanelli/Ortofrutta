<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink 
          to="/" 
          class="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          @click="handleLogoClick"
        >
          <img src="/logo.png" alt="Logo" class="h-10 w-10" />
          <span class="text-xl font-bold text-gray-800">Ortofrutta</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            class="text-gray-700 hover:text-primary transition-colors"
          >
            {{ item.name }}
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const router = useRouter()
const adminStore = useAdminStore()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Prodotti', to: '/prodotti' },
  { name: 'Chi Siamo', to: '/chi-siamo' },
  { name: 'Contatti', to: '/contatti' },
]

// Touch detection for mobile admin mode
let touchCount = 0
let touchTimer: ReturnType<typeof setTimeout> | null = null

const handleLogoClick = (event: Event) => {
  // Check if it's a touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  if (isTouchDevice) {
    touchCount++
    
    // If it's the third touch within the time window, activate admin mode
    if (touchCount === 3) {
      event.preventDefault() // Prevent navigation only on third touch
      adminStore.toggleAdminMode()
      touchCount = 0
      if (touchTimer) clearTimeout(touchTimer)
      return
    }
    
    // Reset counter after 800ms if not enough touches
    if (touchTimer) clearTimeout(touchTimer)
    touchTimer = setTimeout(() => {
      touchCount = 0
    }, 800)
    
    // For 1-2 touches, let the RouterLink navigate normally (don't prevent default)
  }
  // On desktop, let RouterLink handle navigation normally
}

// Desktop keyboard shortcut (Ctrl+Shift+A)
const handleKeyPress = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.shiftKey && event.key === 'A') {
    event.preventDefault()
    adminStore.toggleAdminMode()
  }
}

// Add keyboard listener only on mount
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>
