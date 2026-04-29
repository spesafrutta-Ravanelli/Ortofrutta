<template>
  <div class="eventi-page">

    <!-- ── Hero Header ─────────────────────────────────────────────── -->
    <section class="eventi-hero">
      <div class="container">
        <h1 class="eventi-title">📅 I Nostri Eventi</h1>
        <p class="eventi-subtitle">
          Sagre, mercati, promozioni speciali e novità del negozio
        </p>
      </div>
    </section>

    <!-- ── Form Aggiungi Evento (solo Admin Mode) ──────────────────── -->
    <section v-if="isAdminMode" class="admin-upload-section">
      <div class="container">
        <div class="upload-card">
          <h2>➕ Aggiungi Evento</h2>

          <div class="upload-area" @click="triggerFileInput" :class="{ 'has-preview': previewUrl }">
            <img v-if="previewUrl" :src="previewUrl" alt="Anteprima" class="preview-img" />
            <div v-else class="upload-placeholder">
              <span class="upload-icon">📸</span>
              <p>Tocca per scegliere una foto</p>
              <p class="upload-hint">Galleria o fotocamera</p>
            </div>
          </div>

          <input ref="fileInputRef" type="file" accept="image/*" class="file-input-hidden" @change="onFileSelected" />

          <div class="camera-buttons">
            <button class="btn-camera" @click="triggerFileInput">🖼️ Galleria</button>
            <button class="btn-camera" @click="triggerCamera">📷 Fotocamera</button>
          </div>
          <input ref="cameraInputRef" type="file" accept="image/*" capture="environment" class="file-input-hidden" @change="onFileSelected" />

          <div class="form-fields">
            <div class="form-group">
              <label>Titolo *</label>
              <input v-model="form.titolo" type="text" placeholder="Es: Sagra della frutta" class="form-input" maxlength="80" />
            </div>
            <div class="form-group">
              <label>Data *</label>
              <input v-model="form.data" type="date" class="form-input" />
            </div>
            <div class="form-group">
              <label>Descrizione</label>
              <textarea v-model="form.descrizione" placeholder="Descrivi l'evento..." class="form-textarea" rows="3" maxlength="300"></textarea>
            </div>
          </div>

          <div v-if="uploading" class="progress-bar-wrapper">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
            <span class="progress-label">{{ progress < 100 ? `Caricamento ${progress}%` : '✅ Salvato!' }}</span>
          </div>

          <p v-if="errorMsg" class="error-msg">⚠️ {{ errorMsg }}</p>

          <button class="btn-salva" @click="salvaEvento" :disabled="uploading || !form.titolo || !selectedFile">
            <span v-if="uploading">⏳ Caricamento...</span>
            <span v-else>💾 Pubblica Evento</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ── Lista eventi ─────────────────────────────────────────────── -->
    <section class="eventi-lista">
      <div class="container">

        <div v-if="loading" class="eventi-grid">
          <div v-for="n in 3" :key="n" class="evento-card skeleton">
            <div class="skeleton-img"></div>
            <div class="skeleton-text">
              <div class="skeleton-line"></div>
              <div class="skeleton-line short"></div>
            </div>
          </div>
        </div>

        <div v-else-if="eventi.length > 0" class="eventi-grid">
          <div
            v-for="evento in eventi"
            :key="evento.id"
            class="evento-card"
            @click="apriLightbox(evento)"
          >
            <div class="evento-img-wrapper">
              <img :src="evento.imageUrl" :alt="evento.titolo" class="evento-img" loading="lazy" @error="handleImgError" />
              <div class="evento-data-badge">{{ formatData(evento.data) }}</div>
              <div class="zoom-hint">🔍 Clicca per ingrandire</div>
              <button v-if="isAdminMode" class="btn-elimina" @click.stop="confermaElimina(evento)" title="Elimina evento">🗑️</button>
            </div>
            <div class="evento-info">
              <h3 class="evento-titolo">{{ evento.titolo }}</h3>
              <p v-if="evento.descrizione" class="evento-descrizione">{{ evento.descrizione }}</p>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <span class="empty-icon">📅</span>
          <p>Nessun evento in programma al momento.</p>
          <p v-if="isAdminMode" class="empty-hint">Usa il pannello sopra per aggiungere il primo evento!</p>
        </div>

      </div>
    </section>

    <!-- ── LIGHTBOX ──────────────────────────────────────────────────── -->
    <Teleport to="body">
      <div v-if="lightboxEvento" class="lightbox-overlay" @click="chiudiLightbox">

        <button class="lightbox-close" @click="chiudiLightbox">✕</button>
        <button v-if="hasPrev" class="lightbox-nav lightbox-prev" @click.stop="prevEvento">‹</button>

        <div class="lightbox-content" @click.stop>
          <img :src="lightboxEvento.imageUrl" :alt="lightboxEvento.titolo" class="lightbox-img" @error="handleImgError" />
          <div class="lightbox-info">
            <span class="lightbox-data">📅 {{ formatData(lightboxEvento.data) }}</span>
            <h2 class="lightbox-titolo">{{ lightboxEvento.titolo }}</h2>
            <p v-if="lightboxEvento.descrizione" class="lightbox-descrizione">{{ lightboxEvento.descrizione }}</p>
            <span class="lightbox-counter">{{ lightboxIndex + 1 }} / {{ eventi.length }}</span>
          </div>
        </div>

        <button v-if="hasNext" class="lightbox-nav lightbox-next" @click.stop="nextEvento">›</button>
      </div>
    </Teleport>

    <!-- ── Modal conferma eliminazione ──────────────────────────────── -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="annullaElimina">
      <div class="modal-content" @click.stop>
        <h3>⚠️ Elimina Evento</h3>
        <p>Vuoi eliminare <strong>{{ eventoToDelete?.titolo }}</strong>?</p>
        <p class="modal-warning">Questa azione non può essere annullata.</p>
        <div class="modal-actions">
          <button class="btn-confirm-delete" @click="eseguiElimina">🗑️ Elimina</button>
          <button class="btn-cancel" @click="annullaElimina">Annulla</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAdmin }       from '@/composables/useAdmin'
import { useEventi }      from '@/composables/useEventi'
import { useEventiAdmin } from '@/composables/useEventiAdmin'

const { isAdminMode } = useAdmin()
const { eventi, loading } = useEventi()
const { uploading, progress, errorMsg, aggiungiEvento, eliminaEvento } = useEventiAdmin()

// ── Form ──────────────────────────────────────────────────────────────────
const form = ref({ titolo: '', data: new Date().toISOString().split('T')[0], descrizione: '' })
const selectedFile   = ref(null)
const previewUrl     = ref(null)
const fileInputRef   = ref(null)
const cameraInputRef = ref(null)

const triggerFileInput = () => fileInputRef.value?.click()
const triggerCamera    = () => cameraInputRef.value?.click()

const onFileSelected = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  selectedFile.value = file
  previewUrl.value   = URL.createObjectURL(file)
}

const salvaEvento = async () => {
  if (!form.value.titolo || !selectedFile.value) return
  const ok = await aggiungiEvento({
    file: selectedFile.value,
    titolo: form.value.titolo,
    descrizione: form.value.descrizione,
    data: form.value.data,
  })
  if (ok) {
    form.value = { titolo: '', data: new Date().toISOString().split('T')[0], descrizione: '' }
    selectedFile.value = null
    previewUrl.value   = null
    if (fileInputRef.value)   fileInputRef.value.value  = ''
    if (cameraInputRef.value) cameraInputRef.value.value = ''
  }
}

// ── Lightbox ───────────────────────────────────────────────────────────────
const lightboxEvento = ref(null)
const lightboxIndex  = ref(0)

const hasPrev = computed(() => lightboxIndex.value > 0)
const hasNext = computed(() => lightboxIndex.value < eventi.value.length - 1)

const apriLightbox = (evento) => {
  lightboxIndex.value  = eventi.value.findIndex(e => e.id === evento.id)
  lightboxEvento.value = evento
  document.body.style.overflow = 'hidden'
}

const chiudiLightbox = () => {
  lightboxEvento.value = null
  document.body.style.overflow = ''
}

const prevEvento = () => {
  if (!hasPrev.value) return
  lightboxIndex.value--
  lightboxEvento.value = eventi.value[lightboxIndex.value]
}

const nextEvento = () => {
  if (!hasNext.value) return
  lightboxIndex.value++
  lightboxEvento.value = eventi.value[lightboxIndex.value]
}

const onKeydown = (e) => {
  if (!lightboxEvento.value) return
  if (e.key === 'Escape')     chiudiLightbox()
  if (e.key === 'ArrowLeft')  prevEvento()
  if (e.key === 'ArrowRight') nextEvento()
}

onMounted(()  => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

// ── Eliminazione ──────────────────────────────────────────────────────────
const showDeleteModal = ref(false)
const eventoToDelete  = ref(null)

const confermaElimina = (evento) => { eventoToDelete.value = evento; showDeleteModal.value = true }
const annullaElimina  = () => { showDeleteModal.value = false; eventoToDelete.value = null }
const eseguiElimina   = async () => {
  if (!eventoToDelete.value) return
  await eliminaEvento(eventoToDelete.value.id)
  annullaElimina()
}

// ── Utils ──────────────────────────────────────────────────────────────────
const formatData = (dataStr) => {
  if (!dataStr) return ''
  return new Date(dataStr + 'T12:00:00').toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
}

const handleImgError = (e) => { e.target.src = '/images/products/default.webp' }
</script>

<style scoped lang="scss">
.eventi-page { min-height: 100vh; }

.eventi-hero {
  background: linear-gradient(135deg, #2c5f2d 0%, #4caf50 100%);
  padding: 3rem 0 2.5rem; text-align: center; color: white;
  .eventi-title    { font-size: 2.5rem; font-weight: 800; margin: 0 0 0.75rem; }
  .eventi-subtitle { font-size: 1.1rem; opacity: 0.9; margin: 0; }
}

.admin-upload-section { background: #f0f7f0; border-bottom: 3px solid #4caf50; padding: 2rem 0; }

.upload-card {
  background: white; border-radius: 16px; padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08); max-width: 600px; margin: 0 auto;
  h2 { font-size: 1.4rem; color: #2c5f2d; margin: 0 0 1.25rem; }
}

.upload-area {
  width: 100%; aspect-ratio: 16 / 9; border: 2.5px dashed #4caf50; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  overflow: hidden; background: #f8faf8; transition: border-color 0.2s, background 0.2s; margin-bottom: 0.75rem;
  &:active      { border-color: #2c5f2d; background: #edf7ed; }
  &.has-preview { border-style: solid; }
}
.preview-img { width: 100%; height: 100%; object-fit: cover; }
.upload-placeholder {
  text-align: center; color: #4caf50;
  .upload-icon { font-size: 2.5rem; display: block; margin-bottom: 0.5rem; }
  p            { margin: 0.25rem 0; font-size: 1rem; font-weight: 600; color: #333; }
  .upload-hint { font-size: 0.85rem !important; color: #888 !important; font-weight: 400 !important; }
}
.file-input-hidden { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }

.camera-buttons { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; }
.btn-camera {
  flex: 1; padding: 0.75rem; border: 2px solid #4caf50; background: white; color: #2c5f2d;
  border-radius: 10px; font-size: 0.95rem; font-weight: 600; cursor: pointer; min-height: 44px; transition: all 0.2s;
  &:active { background: #4caf50; color: white; }
}

.form-fields { margin-bottom: 1.25rem; }
.form-group {
  margin-bottom: 1rem;
  label { display: block; font-weight: 600; color: #333; margin-bottom: 0.35rem; font-size: 0.9rem; }
}
.form-input, .form-textarea {
  width: 100%; padding: 0.75rem 1rem; border: 2px solid #e0e0e0; border-radius: 10px;
  font-size: 1rem; font-family: inherit; transition: border-color 0.2s; box-sizing: border-box;
  &:focus { outline: none; border-color: #4caf50; }
}
.form-textarea { resize: vertical; }

.progress-bar-wrapper { position: relative; background: #e8f5e9; border-radius: 999px; height: 28px; overflow: hidden; margin-bottom: 1rem; }
.progress-bar { height: 100%; background: linear-gradient(90deg, #4caf50, #2c5f2d); border-radius: 999px; transition: width 0.3s ease; }
.progress-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; color: #2c5f2d; }

.error-msg { background: #fdecea; color: #c62828; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.9rem; margin-bottom: 1rem; }

.btn-salva {
  width: 100%; padding: 1rem; background: linear-gradient(135deg, #4caf50, #2c5f2d);
  color: white; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 700;
  cursor: pointer; min-height: 54px; transition: opacity 0.2s, transform 0.2s;
  &:disabled           { opacity: 0.5; cursor: not-allowed; }
  &:not(:disabled):active { transform: scale(0.98); }
}

.eventi-lista { padding: 3rem 0; }
.eventi-grid  { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.75rem; }

.evento-card {
  background: white; border-radius: 16px; overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;
  &:hover {
    transform: translateY(-4px); box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    .zoom-hint  { opacity: 1; }
    .evento-img { transform: scale(1.04); }
  }
}
.evento-img-wrapper { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: #f0f0f0; }
.evento-img         { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }

.zoom-hint {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.35); color: white; font-size: 0.9rem; font-weight: 600;
  opacity: 0; transition: opacity 0.3s;
}
.evento-data-badge {
  position: absolute; bottom: 10px; left: 10px; background: rgba(44,95,45,0.92); color: white;
  padding: 0.3rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; backdrop-filter: blur(4px);
}
.btn-elimina {
  position: absolute; top: 8px; right: 8px; width: 36px; height: 36px;
  background: rgba(244,67,54,0.85); color: white; border: none; border-radius: 50%; cursor: pointer;
  font-size: 1rem; display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(4px); transition: background 0.2s, transform 0.2s;
  &:hover { background: #f44336; transform: scale(1.1); }
}
.evento-info        { padding: 1.1rem 1.25rem 1.25rem; }
.evento-titolo      { font-size: 1.15rem; font-weight: 700; color: #2c5f2d; margin: 0 0 0.5rem; line-height: 1.3; }
.evento-descrizione { font-size: 0.9rem; color: #666; line-height: 1.5; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

.evento-card.skeleton {
  pointer-events: none;
  .skeleton-img  { aspect-ratio: 16 / 9; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
  .skeleton-text { padding: 1.1rem 1.25rem 1.25rem; }
  .skeleton-line { height: 16px; border-radius: 8px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; margin-bottom: 0.75rem; &.short { width: 60%; } }
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-state {
  text-align: center; padding: 5rem 2rem; color: #999;
  .empty-icon { font-size: 4rem; display: block; margin-bottom: 1rem; }
  p           { font-size: 1.1rem; margin: 0.5rem 0; }
  .empty-hint { color: #4caf50; font-weight: 600; }
}

/* ── LIGHTBOX ── */
.lightbox-overlay {
  position: fixed; inset: 0; z-index: 3000;
  background: rgba(0,0,0,0.93);
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn 0.2s ease; padding: 1rem;
}
.lightbox-content {
  display: flex; flex-direction: column; max-width: 900px; width: 100%; max-height: 90vh;
  background: #1a1a1a; border-radius: 16px; overflow: hidden; animation: scaleIn 0.25s ease;
}
.lightbox-img    { width: 100%; max-height: 65vh; object-fit: contain; background: #000; }
.lightbox-info   { padding: 1.25rem 1.5rem; background: #1a1a1a; color: white; }
.lightbox-data   { font-size: 0.85rem; color: #4caf50; font-weight: 600; display: block; margin-bottom: 0.5rem; }
.lightbox-titolo { font-size: 1.4rem; font-weight: 700; margin: 0 0 0.5rem; color: white; }
.lightbox-descrizione { font-size: 0.95rem; color: #bbb; line-height: 1.6; margin: 0 0 0.75rem; }
.lightbox-counter     { font-size: 0.8rem; color: #555; }

.lightbox-close {
  position: fixed; top: 1rem; right: 1rem; width: 44px; height: 44px;
  background: rgba(255,255,255,0.15); border: none; border-radius: 50%;
  color: white; font-size: 1.2rem; cursor: pointer; z-index: 3001;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px); transition: background 0.2s, transform 0.2s;
  &:hover { background: rgba(255,255,255,0.3); transform: scale(1.1); }
}
.lightbox-nav {
  position: fixed; top: 50%; transform: translateY(-50%);
  width: 50px; height: 50px; background: rgba(255,255,255,0.15);
  border: none; border-radius: 50%; color: white; font-size: 2rem; cursor: pointer; z-index: 3001;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px); transition: background 0.2s;
  &:hover { background: rgba(255,255,255,0.3); }
}
.lightbox-prev { left: 1rem; }
.lightbox-next { right: 1rem; }

@keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 1rem; }
.modal-content {
  background: white; border-radius: 16px; padding: 2rem; max-width: 420px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.25);
  h3 { margin: 0 0 1rem; color: #333; }
  p  { color: #555; margin: 0.5rem 0; }
  .modal-warning { color: #f44336; font-weight: 600; font-size: 0.9rem; }
}
.modal-actions      { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
.btn-confirm-delete { flex: 1; padding: 0.875rem; background: #f44336; color: white; border: none; border-radius: 10px; font-weight: 700; font-size: 1rem; cursor: pointer; min-height: 44px; }
.btn-cancel         { flex: 1; padding: 0.875rem; background: #f5f5f5; color: #333;   border: none; border-radius: 10px; font-weight: 600; font-size: 1rem; cursor: pointer; min-height: 44px; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

@media (max-width: 768px) {
  .eventi-hero { padding: 2rem 0 1.75rem; .eventi-title { font-size: 1.8rem; } .eventi-subtitle { font-size: 0.95rem; } }
  .eventi-grid { grid-template-columns: 1fr; gap: 1.25rem; }
  .upload-card { padding: 1.25rem; border-radius: 12px; }
  .btn-salva   { font-size: 1rem; }
  .lightbox-content { border-radius: 12px; }
  .lightbox-img     { max-height: 50vh; }
  .lightbox-info    { padding: 1rem; }
  .lightbox-titolo  { font-size: 1.1rem; }
  .lightbox-nav     { width: 40px; height: 40px; font-size: 1.5rem; }
  .lightbox-prev    { left: 0.25rem; }
  .lightbox-next    { right: 0.25rem; }
}

@media (max-width: 480px) {
  .eventi-hero .eventi-title { font-size: 1.5rem; }
  .container { padding: 0 1rem; }
}
</style>