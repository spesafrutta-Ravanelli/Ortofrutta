/**
 * Aggiorna URL immagini locali da jpg/jpeg/png a webp (dopo migrazione file in public/).
 * Usato al caricamento da localStorage / Firebase così i dati vecchi continuano a funzionare.
 */
export function migrateRasterPathToWebp(url) {
  if (typeof url !== 'string') return url
  if (!url.startsWith('/images/') && !url.startsWith('/prima-pagina')) return url
  if (!/\.(jpe?g|png)$/i.test(url)) return url
  return url.replace(/\.(jpe?g|png)$/i, '.webp')
}

function migrateValue(key, val) {
  if ((key === 'image' || key === 'imageUrl' || key === 'img') && typeof val === 'string') {
    return migrateRasterPathToWebp(val)
  }
  return deepMigrate(val)
}

export function deepMigrateImageUrls(val) {
  return deepMigrate(val)
}

function deepMigrate(val) {
  if (Array.isArray(val)) return val.map((item) => deepMigrate(item))
  if (val && typeof val === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(val)) {
      out[k] = migrateValue(k, v)
    }
    return out
  }
  return val
}
