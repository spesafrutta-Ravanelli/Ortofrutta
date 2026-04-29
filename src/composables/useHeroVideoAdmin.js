// src/composables/useHeroVideoAdmin.js
//
// Gestisce upload video E immagine promozionale su Cloudinary.
// Metadati salvati su Firestore:
//   heroVideos → video hero
//   heroImages → immagine promozionale hero

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

const CLOUD_NAME          = 'dxejinitp'
const UPLOAD_PRESET_VIDEO = 'hero-video-preset'
// ✅ FIX: preset separato per immagini
// → Su Cloudinary: Settings > Upload Presets > "Aggiungi preset"
//   Nome: hero-image-preset | Resource type: Image | Signing mode: Unsigned
const UPLOAD_PRESET_IMAGE = 'hero-image-preset'
const UPLOAD_URL          = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`

export function useHeroVideoAdmin() {
  const videos       = ref([])
  const promoImage   = ref(null)
  const uploading    = ref(false)
  const uploadingImg = ref(false)
  const progress     = ref({ step: '', percent: 0 })
  const progressImg  = ref({ step: '', percent: 0 })
  const errorMsg     = ref(null)
  const errorMsgImg  = ref(null)

  // ── Upload generico su Cloudinary ─────────────────────────────────────────
  const _upload = async (file, folder, type, onProgress) => {
    const isVideo = file.type.startsWith('video/')
    // ✅ FIX: usa il preset corretto in base al tipo di file
    const preset  = isVideo ? UPLOAD_PRESET_VIDEO : UPLOAD_PRESET_IMAGE

    const formData = new FormData()
    formData.append('file',          file)
    formData.append('upload_preset', preset)
    formData.append('public_id',     `${folder}/${type}-${Date.now()}`)

    const url = `${UPLOAD_URL}/${isVideo ? 'video' : 'image'}/upload`

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 90)
          onProgress(pct)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) resolve(JSON.parse(xhr.responseText))
        else reject(new Error(`Cloudinary error: ${xhr.status} — ${xhr.responseText}`))
      })

      xhr.addEventListener('error', () => reject(new Error('Errore di rete')))
      xhr.open('POST', url)
      xhr.send(formData)
    })
  }

  // ── Upload VIDEO ───────────────────────────────────────────────────────────
  const uploadVideo = async (file, title) => {
    uploading.value = true
    errorMsg.value  = null
    progress.value  = { step: '☁️ Caricamento video su Cloudinary...', percent: 0 }

    try {
      const result = await _upload(file, 'heroVideos', 'hero', (pct) => {
        progress.value = { step: '☁️ Caricamento video su Cloudinary...', percent: pct }
      })

      progress.value = { step: '🗑️ Pulizia vecchi record...', percent: 92 }
      const existing = await getDocs(collection(db, 'heroVideos'))
      const batch    = writeBatch(db)
      existing.docs.forEach(d => batch.delete(doc(db, 'heroVideos', d.id)))
      await batch.commit()

      progress.value = { step: '💾 Salvataggio metadati...', percent: 96 }
      await addDoc(collection(db, 'heroVideos'), {
        title:      title || file.name,
        url:        result.secure_url,
        publicId:   result.public_id,
        format:     result.format,
        width:      result.width,
        height:     result.height,
        isVertical: result.height > result.width,
        duration:   result.duration ?? null,
        active:     false,
        uploadedAt: serverTimestamp(),
      })

      progress.value = { step: '✅ Completato!', percent: 100 }
      await loadVideos()

    } catch (err) {
      errorMsg.value = err.message || 'Errore durante il caricamento'
      console.error('[useHeroVideoAdmin] Errore upload video:', err)
    } finally {
      uploading.value = false
    }
  }

  // ── Upload IMMAGINE PROMOZIONALE ───────────────────────────────────────────
  const uploadPromoImage = async (file, title) => {
    uploadingImg.value = true
    errorMsgImg.value  = null
    progressImg.value  = { step: '☁️ Caricamento immagine su Cloudinary...', percent: 0 }

    try {
      const result = await _upload(file, 'heroImages', 'promo', (pct) => {
        progressImg.value = { step: '☁️ Caricamento immagine su Cloudinary...', percent: pct }
      })

      progressImg.value = { step: '🗑️ Pulizia vecchi record...', percent: 92 }
      const existing = await getDocs(collection(db, 'heroImages'))
      const batch    = writeBatch(db)
      existing.docs.forEach(d => batch.delete(doc(db, 'heroImages', d.id)))
      await batch.commit()

      progressImg.value = { step: '💾 Salvataggio metadati...', percent: 96 }
      await addDoc(collection(db, 'heroImages'), {
        title:      title || file.name,
        url:        result.secure_url,
        publicId:   result.public_id,
        active:     true,
        uploadedAt: serverTimestamp(),
      })

      progressImg.value = { step: '✅ Completato!', percent: 100 }
      await loadPromoImage()

    } catch (err) {
      errorMsgImg.value = err.message || 'Errore durante il caricamento'
      console.error('[useHeroVideoAdmin] Errore upload immagine:', err)
    } finally {
      uploadingImg.value = false
    }
  }

  // ── Attiva video ───────────────────────────────────────────────────────────
  const setActiveVideo = async (docId) => {
    const snapshot = await getDocs(collection(db, 'heroVideos'))
    const batch    = writeBatch(db)
    snapshot.docs.forEach(d => {
      batch.update(doc(db, 'heroVideos', d.id), { active: d.id === docId })
    })
    await batch.commit()
    await loadVideos()
  }

  // ── Disattiva video ────────────────────────────────────────────────────────
  const deactivateAll = async () => {
    const snapshot = await getDocs(collection(db, 'heroVideos'))
    const batch    = writeBatch(db)
    snapshot.docs.forEach(d => {
      batch.update(doc(db, 'heroVideos', d.id), { active: false })
    })
    await batch.commit()
    await loadVideos()
  }

  // ── Elimina video ──────────────────────────────────────────────────────────
  const deleteVideo = async (video) => {
    await deleteDoc(doc(db, 'heroVideos', video.id))
    await loadVideos()
  }

  // ── Elimina immagine promo ─────────────────────────────────────────────────
  const deletePromoImage = async () => {
    if (!promoImage.value) return
    await deleteDoc(doc(db, 'heroImages', promoImage.value.id))
    promoImage.value = null
  }

  // ── Carica lista video ─────────────────────────────────────────────────────
  const loadVideos = async () => {
    const snapshot = await getDocs(collection(db, 'heroVideos'))
    videos.value = snapshot.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.uploadedAt?.seconds ?? 0) - (a.uploadedAt?.seconds ?? 0))
  }

  // ── Carica immagine promo ──────────────────────────────────────────────────
  const loadPromoImage = async () => {
    const snapshot = await getDocs(collection(db, 'heroImages'))
    const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    promoImage.value = docs.length > 0 ? docs[0] : null
  }

  // ── Carica tutto ───────────────────────────────────────────────────────────
  const loadAll = async () => {
    await Promise.all([loadVideos(), loadPromoImage()])
  }

  return {
    videos,
    promoImage,
    uploading,
    uploadingImg,
    progress,
    progressImg,
    errorMsg,
    errorMsgImg,
    uploadVideo,
    uploadPromoImage,
    setActiveVideo,
    deactivateAll,
    deleteVideo,
    deletePromoImage,
    loadAll,
  }
}