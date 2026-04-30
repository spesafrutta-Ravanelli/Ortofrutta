// src/composables/useEventiAdmin.js

import { ref } from 'vue'
import { db } from '@/firebase.config'
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'

const CLOUD_NAME    = 'dxejinitp'
const UPLOAD_PRESET = 'eventi-preset'
const UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

export function useEventiAdmin() {
  const uploading      = ref(false)
  const progress       = ref(0)
  const errorMsg       = ref(null)
  const modificaSaving = ref(false)

  // ── Upload immagine su Cloudinary ──────────────────────────────────────────
  const _uploadImmagine = (file, onProgress) => {
    const formData = new FormData()
    formData.append('file',          file)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('public_id',     `eventi/evento-${Date.now()}`)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 90))
      })
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) resolve(JSON.parse(xhr.responseText))
        else reject(new Error(`Cloudinary error: ${xhr.status} — ${xhr.responseText}`))
      })
      xhr.addEventListener('error', () => reject(new Error('Errore di rete')))
      xhr.open('POST', UPLOAD_URL)
      xhr.send(formData)
    })
  }

  // ── Aggiungi evento ────────────────────────────────────────────────────────
  const aggiungiEvento = async ({ file, titolo, descrizione, data }) => {
    uploading.value = true
    errorMsg.value  = null
    progress.value  = 0
    try {
      const result = await _uploadImmagine(file, (pct) => { progress.value = pct })
      progress.value = 95
      await addDoc(collection(db, 'eventi'), {
        titolo:      titolo || 'Evento',
        descrizione: descrizione || '',
        data:        data || new Date().toISOString().split('T')[0],
        imageUrl:    result.secure_url,
        publicId:    result.public_id,
        width:       result.width,
        height:      result.height,
        createdAt:   serverTimestamp(),
      })
      progress.value = 100
      return true
    } catch (err) {
      errorMsg.value = err.message || 'Errore durante il caricamento'
      console.error('[useEventiAdmin] Errore aggiungi:', err)
      return false
    } finally {
      uploading.value = false
    }
  }

  // ── Modifica evento (testi + immagine opzionale) ───────────────────────────
  const modificaEvento = async (eventoId, { titolo, descrizione, data, nuovaImmagine }) => {
    modificaSaving.value = true
    try {
      const aggiornamenti = { titolo, descrizione: descrizione || '', data }

      // Se è stata scelta una nuova immagine, caricala su Cloudinary
      if (nuovaImmagine) {
        const result = await _uploadImmagine(nuovaImmagine, null)
        aggiornamenti.imageUrl  = result.secure_url
        aggiornamenti.publicId  = result.public_id
        aggiornamenti.width     = result.width
        aggiornamenti.height    = result.height
      }

      await updateDoc(doc(db, 'eventi', eventoId), aggiornamenti)
      return true
    } catch (err) {
      console.error('[useEventiAdmin] Errore modifica:', err)
      throw err
    } finally {
      modificaSaving.value = false
    }
  }

  // ── Elimina evento ─────────────────────────────────────────────────────────
  const eliminaEvento = async (eventoId) => {
    try {
      await deleteDoc(doc(db, 'eventi', eventoId))
      return true
    } catch (err) {
      console.error('[useEventiAdmin] Errore eliminazione:', err)
      throw err
    }
  }

  return {
    uploading,
    progress,
    errorMsg,
    modificaSaving,
    aggiungiEvento,
    modificaEvento,
    eliminaEvento,
  }
}