/**
 * Utility per gestire le immagini
 * Questo file centralizza la logica per il caricamento delle immagini
 */

/**
 * Genera URL placeholder per immagini non ancora caricate
 * @param {string} text - Testo da mostrare nel placeholder
 * @param {number} width - Larghezza immagine
 * @param {number} height - Altezza immagine
 * @returns {string} URL data SVG
 */
export const generatePlaceholder = (text = 'Immagine', width = 400, height = 300) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect fill="#f0f0f0" width="${width}" height="${height}"/>
      <text 
        fill="#999" 
        font-family="Arial" 
        font-size="20" 
        x="50%" 
        y="50%" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >${text}</text>
    </svg>
  `
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

/**
 * Gestisce errori nel caricamento immagini
 * @param {Event} event - Evento error dell'immagine
 * @param {string} fallbackText - Testo per il placeholder
 */
export const handleImageError = (event, fallbackText = 'Immagine non disponibile') => {
  event.target.src = generatePlaceholder(fallbackText)
}

/**
 * Percorsi delle immagini (da aggiornare con immagini reali)
 * Le immagini possono essere caricate nella cartella public/images
 */
export const imagePaths = {
  categories: {
    frutta: '/images/categories/frutta-1.jpg',
    verdura: '/images/categories/verdura-1.jpg',
    bio: '/images/categories/bio-1.jpg',
    secca: '/images/categories/secca-1.jpg',
    agrumi: '/images/categories/agrumi-1.jpg',
    esotici: '/images/categories/esotici-1.jpg'
  },
  about: {
    negozio: '/images/about/negozio-1.jpg',
    team: '/images/about/team-1.jpg',
    prodotti: '/images/about/prodotti-1.jpg'
  },
  hero: '/images/hero-bg.jpg'
}

/**
 * Carica immagini in modo lazy
 * @param {string} src - Percorso immagine
 * @returns {Promise<string>} Promise con URL immagine
 */
export const lazyLoadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = reject
    img.src = src
  })
}

/**
 * Ottimizza URL per immagini
 * @param {string} url - URL originale
 * @param {Object} options - Opzioni di ottimizzazione
 * @returns {string} URL ottimizzato
 */
export const optimizeImageUrl = (url, options = {}) => {
  const { width, quality = 80, format = 'webp' } = options
  
  // Placeholder - in futuro può essere integrato con un servizio di ottimizzazione
  // come Cloudinary, ImgIX, etc.
  
  return url
}

export default {
  generatePlaceholder,
  handleImageError,
  imagePaths,
  lazyLoadImage,
  optimizeImageUrl
}
