<!-- Navbar.vue con Triplo Tap SOLO su Mobile (touch) -->
<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo con Triplo Tap solo su Mobile -->
        <router-link 
          to="/" 
          class="logo"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <span class="logo-icon">🍎</span>
          <span class="logo-text">
            Ortofrutticola<br />
            <small>Ravanelli & Carminati</small>
          </span>
        </router-link>

        <!-- Hamburger Menu (Mobile) -->
        <button 
          class="hamburger" 
          @click="toggleMenu"
          :class="{ active: isMenuOpen }"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- Navigation Links -->
        <div class="nav-links" :class="{ active: isMenuOpen }">
          <router-link to="/" @click="closeMenu">Home</router-link>
          <router-link to="/categorie" @click="closeMenu">Categorie</router-link>
          <router-link to="/listino" @click="closeMenu">Listino</router-link>
          <router-link to="/offerte" @click="closeMenu" class="highlight">🎉 Offerte</router-link>
          <router-link to="/chi-siamo" @click="closeMenu">Chi Siamo</router-link>
          <router-link to="/dove-siamo" @click="closeMenu">Dove Siamo</router-link>
          <router-link to="/prenota-qui" @click="closeMenu" class="cta">Prenota Qui</router-link>
          <router-link to="/contatti" @click="closeMenu" class="contact">Contatti</router-link>
        </div>
      </div>
    </div>

    <!-- Toast Notification per Triplo Tap -->
    <div v-if="showToast" class="toast-notification">
      {{ toastMessage }}
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAdmin } from '@/composables/useAdmin'

const admin = useAdmin()

const isMenuOpen = ref(false)
const tapCount = ref(0)
const tapTimer = ref(null)
const showToast = ref(false)
const toastMessage = ref('')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Touch handlers per mobile (triplo tap)
const handleTouchStart = (event) => {
  // Incrementa tap count solo su touch (mobile)
  tapCount.value++
  
  // Mostra feedback visivo
  if (tapCount.value === 1) {
    showToastMessage('👆 Tap 1/3')
  } else if (tapCount.value === 2) {
    showToastMessage('👆👆 Tap 2/3 - Ancora uno!')
  }
}

const handleTouchEnd = (event) => {
  if (tapCount.value >= 3) {
    // ATTIVA MODALITÀ ADMIN!
    event.preventDefault()
    
    admin.toggleAdminMode()
    tapCount.value = 0
    
    if (admin.isAdminMode.value) {
      showToastMessage('✅ Modalità Admin ATTIVATA')
    } else {
      showToastMessage('❌ Modalità Admin DISATTIVATA')
    }
    
    return
  }
  
  // Reset dopo 1 secondo
  clearTimeout(tapTimer.value)
  tapTimer.value = setTimeout(() => {
    tapCount.value = 0
  }, 1000)
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  
  setTimeout(() => {
    showToast.value = false
  }, 1500)
}
</script>

<style scoped lang="scss">
.navbar {
  background: linear-gradient(135deg, #2c5f2d 0%, #4caf50 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: white;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.95);
  }

  .logo-icon {
    font-size: 3rem;
    line-height: 1;
  }

  .logo-text {
    font-size: 1.2rem;
    line-height: 1.3;

    small {
      font-size: 0.8rem;
      font-weight: 400;
      opacity: 0.9;
    }
  }
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  span {
    width: 25px;
    height: 3px;
    background: white;
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  &.active {
    span:nth-child(1) {
      transform: rotate(45deg) translate(7px, 7px);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }
  }
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.router-link-active {
      background: rgba(255, 255, 255, 0.2);
      font-weight: 600;
    }

    &.highlight {
      background: #ff9800;
      font-weight: 600;

      &:hover {
        background: #f57c00;
      }
    }

    &.cta {
      background: #ff5722;
      font-weight: 600;

      &:hover {
        background: #e64a19;
      }
    }

    &.contact {
      background: #2196f3;
      font-weight: 600;

      &:hover {
        background: #1976d2;
      }
    }
  }
}

/* Toast Notification */
.toast-notification {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  z-index: 9999;
  animation: slideUp 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: #2c5f2d;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    a {
      width: 100%;
      text-align: center;
      padding: 1rem;
      font-size: 1.1rem;
    }
  }

  .logo {
    .logo-icon {
      font-size: 2.5rem;
    }

    .logo-text {
      font-size: 1rem;

      small {
        font-size: 0.7rem;
      }
    }
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .logo {
    .logo-icon {
      font-size: 2rem;
    }

    .logo-text {
      font-size: 0.9rem;
    }
  }
}
</style>
