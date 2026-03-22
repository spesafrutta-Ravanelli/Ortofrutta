// src/composables/useHeroVideo.js
// Recupera in tempo reale il video attivo per la hero section da Firestore.
//
// Struttura documento Firestore (collection: heroVideos):
// {
//   title:      string    — titolo descrittivo
//   url:        string    — URL Firebase Storage del video
//   path:       string    — percorso Storage per eliminazione
//   mimeType:   string    — tipo file (es. video/mp4)
//   active:     boolean   — true = visibile in hero
//   uploadedAt: Timestamp — data caricamento
// }

import { ref, onUnmounted } from 'vue'
import { db } from '@/firebase.config'
import {
  collection,
  query,
  where,
  limit,
  onSnapshot
} from 'firebase/firestore'

/** Ordina per data in memoria: evita indice composito Firestore (where + orderBy su campi diversi). */
function pickNewestActive(docs) {
  if (!docs.length) return null
  const withData = docs.map((d) => ({ id: d.id, ...d.data() }))
  withData.sort((a, b) => {
    const ta = a.uploadedAt?.seconds ?? a.uploadedAt?._seconds ?? 0
    const tb = b.uploadedAt?.seconds ?? b.uploadedAt?._seconds ?? 0
    return tb - ta
  })
  return withData[0]
}

export function useHeroVideo() {
  const heroVideo = ref(null)  // null → mostra immagine statica
  const loading   = ref(true)
  const error     = ref(null)

  const q = query(
    collection(db, 'heroVideos'),
    where('active', '==', true),
    limit(20)
  )

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      loading.value   = false
      heroVideo.value = snapshot.empty ? null : pickNewestActive(snapshot.docs)
    },
    (err) => {
      loading.value   = false
      error.value     = err
      heroVideo.value = null
      console.error('[useHeroVideo] Errore Firestore:', err)
    }
  )

  onUnmounted(() => unsubscribe())

  return { heroVideo, loading, error }
}
