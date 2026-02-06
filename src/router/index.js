/**
 * Configurazione Vue Router
 * Define tutte le route dell'applicazione
 */

import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading delle views per ottimizzazione bundle
const Home = () => import('../views/Home.vue')
const Categories = () => import('../views/Categories.vue')
const CategoryDetail = () => import('../views/CategoryDetail.vue')
const SeasonDetail = () => import('../views/SeasonDetail.vue')
const Products = () => import('../views/Products.vue')
const About = () => import('../views/About.vue')
const DoveSiamo = () => import('../views/DoveSiamo.vue')
const PrenotaQui = () => import('../views/PrenotaQui.vue')
const Contacts = () => import('../views/Contacts.vue')
const AdminPanel = () => import('../views/AdminPanel.vue')
const Offerte = () => import('../views/Offerte.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - Ortofrutta'
    }
  },
  {
    path: '/categorie',
    name: 'Categories',
    component: Categories,
    meta: {
      title: 'Categorie - Ortofrutta'
    }
  },
  {
    path: '/stagione/:seasonId',
    name: 'SeasonDetail',
    component: SeasonDetail,
    meta: {
      title: 'Prodotti di Stagione - Ortofrutta'
    }
  },
  {
    path: '/categoria/:slug',
    name: 'CategoryDetail',
    component: CategoryDetail,
    meta: {
      title: 'Dettaglio Categoria - Ortofrutta'
    }
  },
  {
    path: '/listino',
    name: 'Products',
    component: Products,
    meta: {
      title: 'Listino Prodotti - Ortofrutta'
    }
  },
  {
    path: '/chi-siamo',
    name: 'About',
    component: About,
    meta: {
      title: 'Chi Siamo - Ortofrutta'
    }
  },
  {
    path: '/dove-siamo',
    name: 'DoveSiamo',
    component: DoveSiamo,
    meta: {
      title: 'Dove Siamo - Ortofrutta'
    }
  },
  {
    path: '/prenota-qui',
    name: 'PrenotaQui',
    component: PrenotaQui,
    meta: {
      title: 'Prenota Qui - Ortofrutticola Golosello Ravanelli & Carminati'
    }
  },
  {
    path: '/offerte',
    name: 'Offerte',
    component: Offerte,
    meta: {
      title: 'Le Nostre Offerte - Ortofrutticola Golosello'
    }
  },
  {
    path: '/contatti',
    name: 'Contacts',
    component: Contacts,
    meta: {
      title: 'Contatti - Ortofrutta'
    }
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: {
      title: 'Pannello Admin - Ortofrutta'
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

// Navigation guard per aggiornare il titolo della pagina
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Ortofrutta'
  next()
})

export default router
