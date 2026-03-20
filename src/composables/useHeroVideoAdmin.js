// src/composables/useHeroVideoAdmin.js
//
// Upload video su Cloudinary con sovrascrittura automatica:
// viene sempre usato lo stesso public_id "hero-main" → Cloudinary
// sovrascrive il file vecchio con il nuovo, occupando sempre ~1 slot.
// Metadati (URL, titolo, active) salvati su Firestore come sempre.

import { ref } from 'vue'
import { db } from '@/firebase.config'
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore'

// ─── Configurazione Cloudinary ────────────────────────────────────────────────
const CLOUD_NAME    = 'dxejinitp'
const UPLOAD_PRESET = 'hero-video-preset'
const UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`

export function useHeroVideoAdmin() {
  const videos    = ref([])
  const uploading = ref(false)
  const progress  = ref({ step: '', percent: 0 })
  const errorMsg  = ref(null)

  // ── Upload su Cloudinary (sovrascrive sempre hero-main) ────────────────────
  const uploadVideo = async (file, title) => {
    uploading.value = true
    errorMsg.value  = null
    progress.value  = { step: '☁️ Caricamento su Cloudinary...', percent: 0 }

    try {
      const formData = new FormData()
      formData.append('file',           file)
      formData.append('upload_preset',  UPLOAD_PRESET)
      formData.append('public_id', `heroVideos/hero-${Date.now()}`)

      // XMLHttpRequest per progress tracking
      const result = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const pct = Math.round((e.loaded / e.total) * 90)
            progress.value = { step: '☁️ Caricamento su Cloudinary...', percent: pct }
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            reject(new Error(`Cloudinary error: ${xhr.status} — ${xhr.responseText}`))
          }
        })

        xhr.addEventListener('error', () => reject(new Error('Errore di rete')))
        xhr.open('POST', UPLOAD_URL)
        xhr.send(formData)
      })

      // Elimina tutti i vecchi documenti Firestore heroVideos prima di aggiungerne uno nuovo
      progress.value = { step: '🗑️ Pulizia vecchi record...', percent: 92 }
      const existing = await getDocs(collection(db, 'heroVideos'))
      const batch    = writeBatch(db)
      existing.docs.forEach(d => batch.delete(doc(db, 'heroVideos', d.id)))
      await batch.commit()

      // Salva nuovo documento Firestore
      progress.value = { step: '💾 Salvataggio metadati...', percent: 96 }
      await addDoc(collection(db, 'heroVideos'), {
        title:      title || file.name,
        url:        result.secure_url,
        publicId:   result.public_id,
        format:     result.format,
        duration:   result.duration ?? null,
        active:     false,
        uploadedAt: serverTimestamp(),
      })

      progress.value = { step: '✅ Completato!', percent: 100 }
      await loadVideos()

    } catch (err) {
      errorMsg.value = err.message || 'Errore durante il caricamento'
      console.error('[useHeroVideoAdmin] Errore upload:', err)
    } finally {
      uploading.value = false
    }
  }

  // ── Attiva il video ────────────────────────────────────────────────────────
  const setActiveVideo = async (docId) => {
    const snapshot = await getDocs(collection(db, 'heroVideos'))
    const batch    = writeBatch(db)
    snapshot.docs.forEach(d => {
      batch.update(doc(db, 'heroVideos', d.id), { active: d.id === docId })
    })
    await batch.commit()
    await loadVideos()
  }

  // ── Disattiva (torna all'immagine statica) ─────────────────────────────────
  const deactivateAll = async () => {
    const snapshot = await getDocs(collection(db, 'heroVideos'))
    const batch    = writeBatch(db)
    snapshot.docs.forEach(d => {
      batch.update(doc(db, 'heroVideos', d.id), { active: false })
    })
    await batch.commit()
    await loadVideos()
  }

  // ── Elimina documento Firestore ────────────────────────────────────────────
  const deleteVideo = async (video) => {
    await deleteDoc(doc(db, 'heroVideos', video.id))
    await loadVideos()
  }

  // ── Carica lista video ─────────────────────────────────────────────────────
  const loadVideos = async () => {
    const snapshot = await getDocs(collection(db, 'heroVideos'))
    videos.value = snapshot.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.uploadedAt?.seconds ?? 0) - (a.uploadedAt?.seconds ?? 0))
  }

  return {
    videos,
    uploading,
    progress,
    errorMsg,
    uploadVideo,
    setActiveVideo,
    deactivateAll,
    deleteVideo,
    loadVideos,
  }
}
