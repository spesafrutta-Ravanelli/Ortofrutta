/**
 * Composable per gestire la modalità admin persistente
 * Attivabile con Ctrl+Shift+A
 * Stato salvato in localStorage
 */

import { ref, onMounted, onUnmounted } from 'vue'

// Stato globale singleton
const isAdminMode = ref(false)
const listeners = new Set()

// Chiave localStorage
const STORAGE_KEY = 'adminMode'

/**
 * Carica lo stato admin da localStorage
 */
function loadAdminState() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'true') {
        isAdminMode.value = true
      }
    }
  } catch (error) {
    console.warn('Errore nel caricamento dello stato admin:', error)
  }
}

/**
 * Salva lo stato admin in localStorage
 */
function saveAdminState() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, isAdminMode.value.toString())
    }
  } catch (error) {
    console.warn('Errore nel salvataggio dello stato admin:', error)
  }
}

/**
 * Mostra una notifica toast
 */
function showNotification(message, type = 'success') {
  // Rimuovi notifiche esistenti
  const existing = document.querySelectorAll('.admin-notification')
  existing.forEach(el => el.remove())

  // Crea elemento notifica
  const notification = document.createElement('div')
  notification.className = 'admin-notification'
  notification.textContent = message

  // Stili in base al tipo
  const styles = {
    success: {
      background: '#10b981',
      color: 'white'
    },
    info: {
      background: '#3b82f6',
      color: 'white'
    }
  }

  const style = styles[type] || styles.success

  // Applica stili
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1rem',
    zIndex: '9999',
    background: style.background,
    color: style.color,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: 'slideInRight 0.3s ease',
    maxWidth: '400px',
    wordWrap: 'break-word'
  })

  // Aggiungi animazione CSS se non esiste
  if (!document.getElementById('admin-notification-styles')) {
    const styleSheet = document.createElement('style')
    styleSheet.id = 'admin-notification-styles'
    styleSheet.textContent = `
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
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(styleSheet)
  }

  // Aggiungi al DOM
  document.body.appendChild(notification)

  // Rimuovi dopo 2 secondi con animazione
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease'
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 2000)
}

/**
 * Gestisce il toggle della modalità admin
 */
function toggleAdmin() {
  const newValue = !isAdminMode.value
  isAdminMode.value = newValue
  saveAdminState()
  
  console.log('🔄 Admin mode cambiato a:', newValue)

  if (isAdminMode.value) {
    showNotification('✅ Modalità Admin Attivata', 'success')
  } else {
    showNotification('ℹ️ Modalità Admin Disattivata', 'info')
  }
}

/**
 * Handler per la combinazione di tasti Ctrl+Shift+A
 */
function handleKeyDown(event) {
  // Ctrl+Shift+A
  if (event.ctrlKey && event.shiftKey && event.key === 'A') {
    event.preventDefault()
    event.stopPropagation()
    console.log('🔑 Ctrl+Shift+A premuto, toggle admin mode')
    toggleAdmin()
    return false
  }
}

/**
 * Inizializza il listener per i tasti
 */
function initKeyListener() {
  if (typeof window === 'undefined') return

  // Assicurati che il DOM sia pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.addEventListener('keydown', handleKeyDown)
    })
  } else {
    window.addEventListener('keydown', handleKeyDown)
  }
}

/**
 * Rimuove il listener per i tasti
 */
function removeKeyListener() {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
  }
}

// Carica lo stato all'inizializzazione del modulo
if (typeof window !== 'undefined') {
  // Aspetta che il DOM sia pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAdminState)
  } else {
    loadAdminState()
  }
  
  // Inizializza il listener
  initKeyListener()
}

/**
 * Composable useAdmin
 * Usa questo composable nei componenti per accedere allo stato admin
 */
export function useAdmin() {
  // Inizializza il listener se non è già attivo
  onMounted(() => {
    initKeyListener()
  })

  onUnmounted(() => {
    // Non rimuovere il listener globale, è condiviso
  })

  return {
    isAdminMode, // Esposto direttamente come ref per reattività nei template
    toggleAdmin,
    showNotification
  }
}
