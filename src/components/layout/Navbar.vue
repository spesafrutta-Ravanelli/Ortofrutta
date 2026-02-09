<template>
  <nav class="navbar">
    <div class="container">
      <RouterLink 
        to="/" 
        class="logo"
        @click="handleLogoClick"
      >
        <span class="logo-icon">🍎</span>
        <span class="logo-text">
          Ortofrutticola<br />
          Ravanelli & Carminati
        </span>
      </RouterLink>

      <button 
        class="mobile-toggle" 
        @click="toggleMobileMenu"
        :class="{ active: mobileMenuOpen }"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="nav-links" :class="{ active: mobileMenuOpen }">
        <li>
          <RouterLink to="/" @click="closeMobileMenu">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/categorie" @click="closeMobileMenu">Categorie</RouterLink>
        </li>
        <li>
          <RouterLink to="/listino" @click="closeMobileMenu">Listino</RouterLink>
        </li>
        <li>
          <RouterLink to="/offerte" @click="closeMobileMenu" class="btn-offerte">🎉 Offerte</RouterLink>
        </li>
        <li>
          <RouterLink to="/chi-siamo" @click="closeMobileMenu">Chi Siamo</RouterLink>
        </li>
        <li>
          <RouterLink to="/dove-siamo" @click="closeMobileMenu">Dove Siamo</RouterLink>
        </li>
        <li>
          <RouterLink to="/prenota-qui" @click="closeMobileMenu" class="btn-prenota">Prenota Qui</RouterLink>
        </li>
        <li>
          <RouterLink to="/contatti" @click="closeMobileMenu" class="btn-contact">Contatti</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAdmin } from '@/composables/useAdmin'

const route = useRoute()
const mobileMenuOpen = ref(false)
const admin = useAdmin()

// Triple-tap per admin mode
const clickCount = ref(0)
let clickTimer = null

const handleLogoClick = (e) => {
  clickCount.value++
  
  if (clickCount.value === 1) {
    clickTimer = setTimeout(() => {
      clickCount.value = 0
    }, 500) // Reset dopo 500ms
  }
  
  if (clickCount.value === 3) {
    e.preventDefault()
    clearTimeout(clickTimer)
    clickCount.value = 0
    admin.toggleAdminMode()
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  
  // Previeni lo scroll quando il menu è aperto su mobile
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// Chiudi il menu mobile quando cambia la route
watch(() => route.path, () => {
  closeMobileMenu()
})

// Gestione eventi tastiera (ESC per chiudere)
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && mobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Chiudi il menu se si clicca fuori
const handleClickOutside = (e) => {
  const navbar = document.querySelector('.navbar')
  const isClickInside = navbar?.contains(e.target)
  
  if (!isClickInside && mobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('click', handleClickOutside)
  document.body.style.overflow = '' // Ripristina lo scroll
})
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1.25rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c5f2d;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  .logo-icon {
    font-size: 2rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .logo-text {
    font-family: 'Georgia', serif;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;

  span {
    width: 25px;
    height: 3px;
    background: #2c5f2d;
    transition: all 0.3s ease;
  }

  &.active {
    span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  align-items: center;

  li {
    display: flex;
    align-items: center;
  }

  li a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.3s ease;
    position: relative;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: #4caf50;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #4caf50;

      &::after {
        width: 100%;
      }
    }

    &.router-link-active {
      color: #4caf50;

      &::after {
        width: 100%;
      }
    }

    &.btn-offerte {
      background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
      
      &::after {
        display: none;
      }

      &:hover {
        background: linear-gradient(135deg, #ffb300 0%, #f57c00 100%);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 152, 0, 0.4);
      }
    }

    &.btn-prenota {
      background: #ff9800;
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      
      &::after {
        display: none;
      }

      &:hover {
        background: #f57c00;
        color: white;
      }
    }

    &.btn-contact {
      background: #4caf50;
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      
      &::after {
        display: none;
      }

      &:hover {
        background: #45a049;
        color: white;
      }
    }
  }
}

/* Responsive - Tablet */
@media (max-width: 1024px) and (min-width: 769px) {
  .logo {
    font-size: 1rem;
    
    .logo-icon {
      font-size: 1.75rem;
    }
    
    .logo-text {
      font-size: 0.95rem;
      line-height: 1.3;
    }
  }

  .nav-links {
    gap: 1rem;

    li a {
      font-size: 0.9rem;
      padding: 0.4rem 1rem;
    }
  }
}

/* Responsive - Mobile */
@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .logo {
    font-size: 0.95rem;

    .logo-icon {
      font-size: 1.5rem;
    }

    .logo-text {
      font-size: 0.85rem;
      line-height: 1.3;
    }
  }

  .mobile-toggle {
    display: flex;
    min-width: 44px; // Touch target minimo
    min-height: 44px;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 75%;
    max-width: 320px;
    height: 100vh;
    background: white;
    flex-direction: column;
    padding: 5rem 2rem 2rem;
    gap: 1rem;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    overflow-y: auto;

    &.active {
      right: 0;
    }

    li {
      width: 100%;
    }

    li a {
      font-size: 1.1rem;
      display: block;
      padding: 0.875rem 1rem;
      min-height: 44px; // Touch target minimo
      border-radius: 8px;
      transition: background 0.3s ease;

      &:hover,
      &:active {
        background: #f5f5f5;
      }

      &.btn-prenota,
      &.btn-contact {
        text-align: center;
        margin-top: 0.5rem;
      }
    }
  }
}

/* Responsive - Mobile molto piccolo */
@media (max-width: 480px) {
  .logo {
    .logo-icon {
      font-size: 1.3rem;
    }
    
    .logo-text {
      font-size: 0.75rem;
      line-height: 1.2;
    }
  }

  .nav-links {
    width: 85%;
    padding: 4rem 1.5rem 2rem;
  }
}
</style>
