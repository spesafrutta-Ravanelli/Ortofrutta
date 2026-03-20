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
  const heroVideo = ref(null)  // null → mostra immagine statica
  const loading   = ref(true)
  const error     = ref(null)

  const db = getFirestore()

  const q = query(
    collection(db, 'heroVideos'),
    where('active', '==', true),
    orderBy('uploadedAt', 'desc'),
    limit(1)
  )

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      loading.value   = false
      heroVideo.value = snapshot.empty
        ? null
        : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
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
