<template>
  <nav class="navbar">
    <div class="container">
      <div 
        class="logo"
        @click="handleLogoClick"
        role="link"
        tabindex="0"
        @keydown.enter="handleLogoClick"
      >
        <img
          src="/images/logo.webp"
          alt="Ortofrutticola Ravanelli & Carminati"
          class="logo-img"
        />
      </div>

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
          <RouterLink to="/eventi" @click="closeMobileMenu" class="btn-eventi">📅 Eventi</RouterLink>
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

    <!-- Badge admin: nascosto se siamo dentro un iframe (es. preview brochure) -->
    <div v-if="admin.isAdminMode.value && !isInIframe" class="admin-badge">
      🔐 Admin Mode
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdmin } from '@/composables/useAdmin'

const route = useRoute()
const router = useRouter()
const mobileMenuOpen = ref(false)
const admin = useAdmin()

// ✅ FIX: se siamo dentro un iframe (es. preview brochure offerte)
// non mostriamo il badge Admin Mode per evitare il doppio badge su mobile
const isInIframe = window.self !== window.top

// =========================================================
// TRIPLE-TAP LOGO
// =========================================================
const clickCount = ref(0)
let clickTimer = null

const handleLogoClick = () => {
  clickCount.value++

  if (clickCount.value === 1) {
    clickTimer = setTimeout(() => {
      if (clickCount.value < 3) {
        router.push('/')
      }
      clickCount.value = 0
    }, 500)
  }

  if (clickCount.value === 3) {
    clearTimeout(clickTimer)
    clickCount.value = 0
    admin.toggleAdminMode()
    console.log('🍎 Triple-tap: Admin mode', admin.isAdminMode.value ? 'ATTIVATO' : 'DISATTIVATO')
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

watch(() => route.path, () => { closeMobileMenu() })

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && mobileMenuOpen.value) closeMobileMenu()
}

const handleClickOutside = (e) => {
  const navbar = document.querySelector('.navbar')
  if (!navbar?.contains(e.target) && mobileMenuOpen.value) closeMobileMenu()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('click', handleClickOutside)
  document.body.style.overflow = ''
  if (clickTimer) clearTimeout(clickTimer)
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
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:hover { transform: scale(1.02); }

  .logo-img {
    height: 150px;
    width: auto;
    object-fit: contain;
  }
}

.admin-badge {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #e53935;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.75rem;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(229, 57, 53, 0.4);
  white-space: nowrap;
  z-index: 999;
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
    span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
  }
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1rem;
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
      &::after { width: 100%; }
    }

    &.router-link-active {
      color: #4caf50;
      &::after { width: 100%; }
    }

    &.btn-offerte {
      background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
      &::after { display: none; }
      &:hover { background: linear-gradient(135deg, #ffb300 0%, #f57c00 100%); color: white; transform: translateY(-2px); }
    }

    &.btn-prenota {
      background: #ff9800;
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      &::after { display: none; }
      &:hover { background: #f57c00; color: white; }
    }

    &.btn-contact {
      background: #4caf50;
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      &::after { display: none; }
      &:hover { background: #45a049; color: white; }
    }

    &.btn-eventi {
      background: #4caf50;
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      &::after { display: none; }
      &:hover { background: #45a049; color: white; }
    }
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .logo .logo-img { height: 65px; }
  .nav-links { gap: 1rem; li a { font-size: 0.9rem; padding: 0.4rem 1rem; } }
}

@media (max-width: 768px) {
  .navbar { padding: 0.75rem 0; }
  .container { padding: 0 1rem; }
  .logo .logo-img { height: 55px; }

  .mobile-toggle {
    display: flex;
    min-width: 44px;
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

    &.active { right: 0; }

    li { width: 100%; }

    li a {
      font-size: 1.1rem;
      display: block;
      padding: 0.875rem 1rem;
      min-height: 44px;
      border-radius: 8px;
      transition: background 0.3s ease;

      &:hover, &:active { background: #f5f5f5; }

      &.btn-prenota, &.btn-contact {
        text-align: center;
        margin-top: 0.5rem;
      }
    }
  }
}

@media (max-width: 480px) {
  .logo .logo-img { height: 48px; }
  .nav-links { width: 85%; padding: 4rem 1.5rem 2rem; }
}
</style>