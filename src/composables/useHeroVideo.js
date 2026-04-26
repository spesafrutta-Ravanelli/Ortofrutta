// src/composables/useHeroVideo.js
//
// Legge in tempo reale da Firestore:
// - heroVideos  → video attivo (se presente)
// - heroImages  → immagine promozionale attiva (fallback se non c'è video)
//
// Logica pubblica:
//   video attivo   → mostra video
//   solo immagine  → mostra immagine promozionale
//   niente         → mostra immagine statica default

import { ref, onUnmounted } from 'vue'
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot
} from 'firebase/firestore'

export function useHeroVideo() {
  const heroVideo = ref(null)   // null → nessun video attivo
  const heroImage = ref(null)   // null → nessun'immagine promo attiva
  const loading   = ref(true)

  const db = getFirestore()
  let loadedCount = 0

  const checkDone = () => {
    loadedCount++
    if (loadedCount >= 2) loading.value = false
  }

  // ── Video attivo ───────────────────────────────────────────────────────────
  const qVideo = query(
    collection(db, 'heroVideos'),
    where('active', '==', true),
    orderBy('uploadedAt', 'desc'),
    limit(1)
  )

  const unsubVideo = onSnapshot(qVideo, (snap) => {
    heroVideo.value = snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() }
    checkDone()
  }, (err) => {
    console.error('[useHeroVideo] Errore video:', err)
    heroVideo.value = null
    checkDone()
  })

  // ── Immagine promo attiva ──────────────────────────────────────────────────
  const qImage = query(
    collection(db, 'heroImages'),
    where('active', '==', true),
    orderBy('uploadedAt', 'desc'),
    limit(1)
  )

  const unsubImage = onSnapshot(qImage, (snap) => {
    heroImage.value = snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() }
    checkDone()
  }, (err) => {
    console.error('[useHeroVideo] Errore immagine:', err)
    heroImage.value = null
    checkDone()
  })

  onUnmounted(() => {
    unsubVideo()
    unsubImage()
  })

  return { heroVideo, heroImage, loading }
}
