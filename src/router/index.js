/**
 * Configurazione Vue Router
 * Define tutte le route dell'applicazione
 */

import { createRouter, createWebHistory } from 'vue-router'
import { applyPageMeta, HOME_DESCRIPTION, SEO_KEYWORDS } from '@/utils/pageMeta'

const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')
const Categories = () => import('../views/Categories.vue')
const Contacts = () => import('../views/Contacts.vue')
const CategoryDetail = () => import('../views/CategoryDetail.vue')
const SeasonDetail = () => import('../views/SeasonDetail.vue')
const Products = () => import('../views/Products.vue')
const DoveSiamo = () => import('../views/DoveSiamo.vue')
const PrenotaQui = () => import('../views/PrenotaQui.vue')
const AdminPanel = () => import('../views/AdminPanel.vue')
const Offerte = () => import('../views/Offerte.vue')
const CookiePolicy = () => import('../views/CookiePolicy.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      seo: {
        isHome: true,
        description: HOME_DESCRIPTION,
        keywords: SEO_KEYWORDS
      }
    }
  },
  {
    path: '/categorie',
    name: 'Categories',
    component: Categories,
    meta: {
      seo: {
        title: 'Categorie prodotti',
        description:
          'Categorie frutta e verdura fresca, biologico e di stagione. Servizio a Brembate, Agrate Brianza, Eupilio, Vimercate, Gorgonzola, Bussero, Asso e dintorni.',
        keywords: SEO_KEYWORDS
      }
    }
  },
  {
    path: '/stagione/:seasonId',
    name: 'SeasonDetail',
    component: SeasonDetail,
    meta: {
      seo: {
        title: 'Prodotti di stagione',
        description:
          'Prodotti stagionali freschi a Brembate, Vimercate, Gorgonzola, Trezzo sull’Adda e Brianza. Ortofrutticola Ravanelli & Carminati.',
        keywords: SEO_KEYWORDS
      }
    }
  },
  {
    path: '/categoria/:slug',
    name: 'CategoryDetail',
    component: CategoryDetail,
    meta: {
      seo: {
        title: 'Categoria',
        description:
          'Frutta e verdura per categoria: qualità a Brembate, Agrate, Eupilio, Asso, Scarenna, Zelo Buon Persico, Vimercate e dintorni.',
        keywords: SEO_KEYWORDS
      }
    }
  },
  {
    path: '/listino',
    name: 'Products',
    component: Products,
    meta: {
      seo: {
        title: 'Listino prodotti',
        description:
          'Listino frutta e verdura fresca e biologica. Consegna a Brembate, Bussero, Scarenna, Trezzo sull’Adda, Vaprio d’Adda, Gorgonzola, Vimercate, Inzago e Brianza.',
        keywords: SEO_KEYWORDS
      }
    }
  },
  {
    path: '/chi-siamo',
    name: 'About',
    component: About,
    meta: {
      seo: {
        title: 'Chi siamo',
        description:
          'Storia dell’ortofrutticola Ravanelli & Carminati a Brembate. Qualità e servizio a Eupilio, Agrate, Zelo Buon Persico, Asso, Scarenna e comuni limitrofi.',
        keywords: SEO_KEYWORDS
      }
    }
  },
  {
    path: '/dove-siamo',
    name: 'DoveSiamo',
    component: DoveSiamo,
    meta: {
      seo: {
        title: 'Dove siamo',
        description:
          'Via Enrico Fermi, Brembate (BG). Raggiungibili da Agrate, Vimercate, Gorgonzola, Trezzo sull’Adda, Cassano d’Adda, Inzago e Brianza.',
        keywords: SEO_KEYWORDS
      }
    }
  },
  {
    path: '/prenota-qui',
    name: 'PrenotaQui',
    component: PrenotaQui,
    meta: {
      seo: {
        title: 'Prenota la spesa',
        description:
          'Prenota frutta e verdura online. Ritiro o consegna a Brembate, Eupilio, Zelo Buon Persico, Asso, Scarenna, Agrate Brianza e dintorni.',
        keywords: SEO_KEYWORDS
      }
    }
  },
  {
    path: '/offerte',
    name: 'Offerte',
    component: Offerte,
    meta: {
      seo: {
        title: 'Offerte',
        description:
          'Offerte settimanali frutta e verdura fresca e biologica. Ortofrutticola Golosello a Brembate e servizio in zona Bergamo e Brianza.',
        keywords: SEO_KEYWORDS
      }
    }
  },
  {
    path: '/contatti',
    name: 'Contacts',
    component: Contacts,
    meta: {
      seo: {
        title: 'Contatti',
        description:
          'Contatti ortofrutticola Brembate: telefono, WhatsApp, email. Consegna a Agrate, Gorgonzola, Bussero, Caslino d’Erba, Asso, Scarenna, Eupilio e Vimercate.',
        keywords: SEO_KEYWORDS
      }
    }
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: {
      seo: {
        title: 'Pannello admin',
        description: 'Area riservata amministrazione sito Ortofrutticola Ravanelli & Carminati.',
        keywords: SEO_KEYWORDS,
        robots: 'noindex, nofollow'
      }
    }
  },
  {
    path: '/cookie-policy',
    name: 'CookiePolicy',
    component: CookiePolicy,
    meta: {
      seo: {
        title: 'Cookie policy',
        description:
          'Cookie policy e privacy per ortofruttaravanellicarminati.it. Frutta e verdura fresca a Brembate e consegna in Brianza.',
        keywords: SEO_KEYWORDS
      }
    }
  },
  {
    // 404 - Pagina non trovata
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Se c'è una posizione salvata (es. torna indietro)
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition)
        }, 100)
      })
    }
    
    // Se c'è un hash (anchor link)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Offset per la navbar fissa
      }
    }
    
    // Altrimenti scroll to top
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, behavior: 'smooth' })
      }, 100)
    })
  }
})

// SEO: title, description, keywords, og, canonical
router.beforeEach((to, from, next) => {
  const seo = to.meta.seo
  if (seo) {
    applyPageMeta({ ...seo, path: to.path })
  }
  next()
})

export default router
