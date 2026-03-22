/**
 * SEO meta per SPA Vue: aggiorna title, description, keywords, Open Graph e Twitter.
 * Allineato al dominio canonico www.
 */

export const SITE_URL = 'https://www.ortofruttaravanellicarminati.it'

export const TITLE_SUFFIX =
  ' | Ortofrutticola Ravanelli & Carminati – Brembate e dintorni (BG)'

/** Title home (formato richiesto, senza suffisso aggiuntivo) */
export const HOME_TITLE =
  'Frutta e Verdura Fresca | Ortofrutticola Ravanelli & Carminati – Brembate e dintorni (BG)'

export const SEO_KEYWORDS =
  'frutta fresca, verdura, ortofrutta, consegna a domicilio, Brembate, Bergamo, Eupilio, Agrate Brianza, Bussero, Caslino d\'Erba, Asso, Scarenna, Zelo Buon Persico, Trezzo sull\'Adda, Vaprio d\'Adda, Gorgonzola, Vimercate, biologico, frutta di stagione'

export const HOME_DESCRIPTION =
  'Frutta e verdura fresca a Brembate, Agrate, Eupilio, Bussero, Asso e dintorni. Consegna a domicilio e prodotti biologici di stagione.'

function setMeta(attrName, attrValue, content) {
  if (content == null || content === '') return
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * @param {object} opts
 * @param {boolean} [opts.isHome] — usa HOME_TITLE senza suffisso
 * @param {string} [opts.title] — titolo breve pagina (con suffisso se non isHome)
 * @param {string} [opts.fullTitle] — titolo completo (override)
 * @param {string} [opts.description]
 * @param {string} [opts.keywords]
 * @param {string} [opts.ogTitle] — default: stesso di title visibile
 * @param {string} [opts.ogDescription]
 * @param {string} [opts.path] — path per og:url e canonical (es. "/contatti")
 * @param {string} [opts.robots]
 */
export function applyPageMeta(opts = {}) {
  if (!opts || typeof document === 'undefined') return

  let docTitle = document.title
  if (opts.fullTitle) {
    docTitle = opts.fullTitle
  } else if (opts.isHome) {
    docTitle = HOME_TITLE
  } else if (opts.title) {
    docTitle = `${opts.title}${TITLE_SUFFIX}`
  }
  document.title = docTitle

  const desc = opts.description
  const kw = opts.keywords ?? SEO_KEYWORDS
  if (desc) setMeta('name', 'description', desc)
  setMeta('name', 'keywords', kw)

  const ogTitle = opts.ogTitle ?? (opts.isHome ? HOME_TITLE : opts.title ? docTitle : HOME_TITLE)
  const ogDesc = opts.ogDescription ?? desc ?? HOME_DESCRIPTION
  setMeta('property', 'og:title', ogTitle)
  setMeta('property', 'og:description', ogDesc)
  setMeta('name', 'twitter:title', ogTitle)
  setMeta('name', 'twitter:description', ogDesc)

  const path = opts.path ?? '/'
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
  setMeta('property', 'og:url', url)

  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) canonical.setAttribute('href', url)

  if (opts.robots) {
    setMeta('name', 'robots', opts.robots)
  } else {
    setMeta(
      'name',
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    )
  }
}
