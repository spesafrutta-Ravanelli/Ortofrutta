import { ref, onMounted, onUnmounted } from 'vue'

// Stato globale condiviso tra tutti i componenti
const isAdminMode = ref(false)
const isInitialized = ref(false)

export function useAdmin() {
  // Carica stato da localStorage all'inizializzazione
  const loadAdminState = () => {
    if (isInitialized.value) return
    
    const saved = localStorage.getItem('adminMode')
    if (saved === 'true') {
      isAdminMode.value = true
    }
    isInitialized.value = true
  }

  // Salva stato in localStorage
  const saveAdminState = () => {
    localStorage.setItem('adminMode', isAdminMode.value.toString())
  }

  // Toggle admin mode
  const toggleAdminMode = () => {
    isAdminMode.value = !isAdminMode.value
    saveAdminState()
    
    // Feedback visivo
    if (isAdminMode.value) {
      console.log('🔓 Modalità Admin ATTIVATA')
      // Mostra notifica temporanea
      showAdminNotification('Modalità Admin ATTIVATA ✓')
    } else {
      console.log('🔒 Modalità Admin DISATTIVATA')
      showAdminNotification('Modalità Admin DISATTIVATA')
    }
  }

  // Attiva admin mode
  const enableAdminMode = () => {
    if (!isAdminMode.value) {
      isAdminMode.value = true
      saveAdminState()
      showAdminNotification('Modalità Admin ATTIVATA ✓')
    }
  }

  // Disattiva admin mode
  const disableAdminMode = () => {
    if (isAdminMode.value) {
      isAdminMode.value = false
      saveAdminState()
      showAdminNotification('Modalità Admin DISATTIVATA')
    }
  }

  // Mostra notifica temporanea
  const showAdminNotification = (message) => {
    // Rimuovi notifica precedente se esiste
    const existing = document.getElementById('admin-notification')
    if (existing) existing.remove()

    // Crea notifica
    const notification = document.createElement('div')
    notification.id = 'admin-notification'
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${isAdminMode.value ? '#10b981' : '#6b7280'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    `

    // Aggiungi animazione
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
    document.body.appendChild(notification)

    // Rimuovi dopo 3 secondi
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out'
      setTimeout(() => notification.remove(), 300)
    }, 3000)
  }

  // Stato per combinazione tasti
  const keysPressed = ref({
    ctrl: false,
    shift: false,
    a: false
  })

  // Handler tasti
  const handleKeyDown = (event) => {
    if (event.ctrlKey) keysPressed.value.ctrl = true
    if (event.shiftKey) keysPressed.value.shift = true
    if (event.key.toLowerCase() === 'a') keysPressed.value.a = true

    // Controlla se tutti i tasti sono premuti
    if (keysPressed.value.ctrl && keysPressed.value.shift && keysPressed.value.a) {
      event.preventDefault()
      toggleAdminMode()
      resetKeys()
    }
  }

  const handleKeyUp = (event) => {
    if (event.key === 'Control') keysPressed.value.ctrl = false
    if (event.key === 'Shift') keysPressed.value.shift = false
    if (event.key.toLowerCase() === 'a') keysPressed.value.a = false
  }

  const resetKeys = () => {
    keysPressed.value = {
      ctrl: false,
      shift: false,
      a: false
    }
  }

  // Setup listeners
  onMounted(() => {
    loadAdminState()
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
  })

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
  })

  return {
    isAdminMode,
    toggleAdminMode,
    enableAdminMode,
    disableAdminMode
  }
}
