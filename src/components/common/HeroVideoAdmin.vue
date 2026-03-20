<template>
  <div class="hero-video-admin">
    <div class="container">

      <div class="section-header">
        <h2>🎬 Video Hero Homepage</h2>
        <p class="section-hint">
          Carica qualsiasi video (MP4, MOV…): sostituisce automaticamente il precedente
          su Cloudinary. Funziona anche da smartphone.
        </p>
      </div>

      <!-- Upload zone -->
      <div
        class="upload-zone"
        :class="{ 'dragging': isDragging, 'disabled': uploading }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
        @click="!uploading && $refs.fileInput.click()"
      >
        <input
          ref="fileInput"
          type="file"
          accept="video/*"
          class="hidden-input"
          @change="onFileSelected"
        />

        <template v-if="!uploading">
          <div class="upload-icon">🎥</div>
          <p class="upload-label">Trascina il video oppure clicca per selezionarlo</p>
          <p class="upload-hint">MP4, MOV, AVI — il vecchio video verrà sostituito automaticamente</p>
        </template>

        <template v-else>
          <div class="progress-wrapper">
            <div class="progress-step">{{ progress.step }}</div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill" :style="{ width: progress.percent + '%' }" />
            </div>
            <div class="progress-percent">{{ progress.percent }}%</div>
            <p class="progress-note">⏳ Non chiudere questa scheda durante il caricamento.</p>
          </div>
        </template>
      </div>

      <!-- Form titolo -->
      <div v-if="selectedFile && !uploading" class="title-form">
        <div class="file-preview">
          <span class="file-icon">🎞️</span>
          <span class="file-name">{{ selectedFile.name }}</span>
          <span class="file-size">({{ formatSize(selectedFile.size) }})</span>
          <button class="btn-clear" @click="clearSelection">✕</button>
        </div>
        <div class="title-row">
          <input
            v-model="videoTitle"
            type="text"
            class="title-input"
            placeholder="Titolo video (es. Offerte settimana 20)"
          />
          <button class="btn btn-upload" @click="startUpload">🚀 Carica</button>
        </div>
      </div>

      <!-- Errore / Successo -->
      <div v-if="errorMsg"  class="error-banner">⚠️ {{ errorMsg }}</div>
      <div v-if="successMsg" class="success-banner">✅ {{ successMsg }}</div>

      <!-- Video corrente -->
      <div v-if="videos.length > 0" class="video-list">
        <div class="list-header">
          <h3>📋 Video caricato</h3>
          <button v-if="hasActiveVideo" class="btn btn-deactivate" @click="handleDeactivateAll">
            🖼️ Mostra immagine statica
          </button>
        </div>

        <div
          v-for="video in videos"
          :key="video.id"
          class="video-card"
          :class="{ 'is-active': video.active }"
        >
          <div class="video-preview">
            <video :src="video.url" muted preload="metadata" class="preview-player" />
            <div v-if="video.active" class="active-badge">✅ ATTIVO</div>
          </div>

          <div class="video-info">
            <p class="video-title">{{ video.title }}</p>
            <p class="video-date">{{ formatDate(video.uploadedAt) }}</p>
            <p v-if="video.format" class="video-format">{{ video.format.toUpperCase() }}</p>

            <div class="video-actions">
              <button v-if="!video.active" class="btn btn-activate" @click="handleActivate(video.id)">
                ▶️ Attiva in Hero
              </button>
              <button v-else class="btn btn-deactivate-small" @click="handleDeactivateAll">
                ⏸️ Disattiva
              </button>
              <button class="btn btn-delete" @click="handleDelete(video)">
                🗑️ Elimina
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!uploading" class="empty-list">
        <p>Nessun video caricato. Usa la zona sopra per aggiungerne uno.</p>
      </div>

    </div>

    <!-- Modal conferma eliminazione -->
    <div v-if="videoToDelete" class="modal-overlay" @click="videoToDelete = null">
      <div class="modal-content" @click.stop>
        <h3>🗑️ Conferma eliminazione</h3>
        <p>Eliminare il video <strong>{{ videoToDelete.title }}</strong>?</p>
        <p class="warning-text">La hero tornerà a mostrare l'immagine statica.</p>
        <div class="modal-actions">
          <button class="btn btn-confirm-delete" @click="confirmDelete">🗑️ Elimina</button>
          <button class="btn btn-cancel" @click="videoToDelete = null">Annulla</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHeroVideoAdmin } from '@/composables/useHeroVideoAdmin'

const {
  videos, uploading, progress, errorMsg,
  uploadVideo, setActiveVideo, deactivateAll, deleteVideo, loadVideos,
} = useHeroVideoAdmin()

const fileInput     = ref(null)
const isDragging    = ref(false)
const selectedFile  = ref(null)
const videoTitle    = ref('')
const successMsg    = ref('')
const videoToDelete = ref(null)

const hasActiveVideo = computed(() => videos.value.some(v => v.active))

onMounted(() => loadVideos())

const onFileSelected = (e) => { const f = e.target.files[0]; if (f) pickFile(f) }
const onDrop = (e) => {
  isDragging.value = false
  const f = e.dataTransfer.files[0]
  if (f && f.type.startsWith('video/')) pickFile(f)
}
const pickFile = (f) => {
  selectedFile.value = f
  videoTitle.value   = f.name.replace(/\.[^.]+$/, '')
}
const clearSelection = () => {
  selectedFile.value = null
  videoTitle.value   = ''
  if (fileInput.value) fileInput.value.value = ''
}

const startUpload = async () => {
  if (!selectedFile.value) return
  successMsg.value = ''
  await uploadVideo(selectedFile.value, videoTitle.value.trim() || selectedFile.value.name)
  if (!errorMsg.value) {
    successMsg.value = 'Video caricato! Clicca "Attiva in Hero" per mostrarlo.'
    clearSelection()
    setTimeout(() => { successMsg.value = '' }, 6000)
  }
}

const handleActivate = async (docId) => {
  await setActiveVideo(docId)
  successMsg.value = 'Video attivato nella hero!'
  setTimeout(() => { successMsg.value = '' }, 4000)
}

const handleDeactivateAll = async () => {
  await deactivateAll()
  successMsg.value = "Video disattivato. La hero mostra l'immagine statica."
  setTimeout(() => { successMsg.value = '' }, 4000)
}

const handleDelete = (video) => { videoToDelete.value = video }
const confirmDelete = async () => {
  await deleteVideo(videoToDelete.value)
  videoToDelete.value = null
  successMsg.value = 'Video eliminato.'
  setTimeout(() => { successMsg.value = '' }, 3000)
}

const formatSize = (b) => b < 1024 * 1024
  ? (b / 1024).toFixed(0) + ' KB'
  : (b / (1024 * 1024)).toFixed(1) + ' MB'

const formatDate = (ts) => {
  if (!ts) return '—'
  const d = ts.toDate ? ts.toDate() : new Date(ts.seconds * 1000)
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped lang="scss">
.hero-video-admin {
  background: #fff; border-radius: 16px; padding: 2rem 0; border: 2px solid #e8f5e9;
  .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
}

.section-header {
  margin-bottom: 1.5rem;
  h2 { font-size: 1.6rem; color: #2c5f2d; margin-bottom: 0.5rem; font-weight: 700; }
  .section-hint { color: #666; font-size: 0.95rem; line-height: 1.6; }
}

.upload-zone {
  border: 2px dashed #4caf50; border-radius: 12px; padding: 2.5rem 2rem;
  text-align: center; cursor: pointer; transition: all 0.3s ease; background: #f9fbe7;
  min-height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;
  &:hover:not(.disabled) { background: #f1f8e9; border-color: #2c5f2d; }
  &.dragging { background: #e8f5e9; border-color: #1a472a; transform: scale(1.01); }
  &.disabled { cursor: default; border-style: solid; }
  .hidden-input { display: none; }
  .upload-icon  { font-size: 3rem; }
  .upload-label { font-size: 1.05rem; font-weight: 600; color: #2c5f2d; margin: 0; }
  .upload-hint  { font-size: 0.85rem; color: #888; margin: 0; }
}

.progress-wrapper {
  width: 100%; max-width: 480px; display: flex; flex-direction: column; align-items: center; gap: 0.6rem;
  .progress-step      { font-size: 0.95rem; font-weight: 600; color: #2c5f2d; }
  .progress-bar-track { width: 100%; height: 10px; background: #c8e6c9; border-radius: 10px; overflow: hidden; }
  .progress-bar-fill  { height: 100%; background: linear-gradient(90deg, #4caf50, #2c5f2d); border-radius: 10px; transition: width 0.4s ease; }
  .progress-percent   { font-size: 0.9rem; color: #555; font-weight: 600; }
  .progress-note      { font-size: 0.8rem; color: #888; margin: 0; text-align: center; }
}

.title-form {
  margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;
  .file-preview {
    display: flex; align-items: center; gap: 0.5rem;
    background: #f5f5f5; padding: 0.6rem 1rem; border-radius: 8px; font-size: 0.9rem;
    .file-name { font-weight: 600; color: #333; }
    .file-size { color: #888; font-size: 0.82rem; }
    .btn-clear { margin-left: auto; background: none; border: none; color: #999; cursor: pointer; font-size: 1rem; padding: 0.2rem 0.4rem; border-radius: 4px; &:hover { background: #e0e0e0; color: #333; } }
  }
  .title-row {
    display: flex; gap: 0.75rem;
    .title-input { flex: 1; padding: 0.75rem 1rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 0.95rem; &:focus { outline: none; border-color: #4caf50; } }
  }
}

.error-banner   { margin-top: 1rem; padding: 1rem; background: #ffebee; color: #c62828; border-radius: 8px; font-size: 0.9rem; border-left: 4px solid #f44336; }
.success-banner { margin-top: 1rem; padding: 1rem; background: #e8f5e9; color: #2e7d32; border-radius: 8px; font-size: 0.9rem; border-left: 4px solid #4caf50; animation: fadeIn 0.3s ease; }

.video-list {
  margin-top: 2rem;
  .list-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem; h3 { font-size: 1.1rem; color: #2c5f2d; margin: 0; } }
}

.video-card {
  display: flex; gap: 1.5rem; padding: 1.25rem;
  border: 2px solid #e0e0e0; border-radius: 12px; margin-bottom: 1rem;
  transition: border-color 0.3s ease; background: #fafafa;
  &.is-active { border-color: #4caf50; background: #f1f8e9; }

  .video-preview {
    position: relative; width: 160px; flex-shrink: 0; border-radius: 8px; overflow: hidden; background: #000;
    .preview-player { width: 100%; height: 90px; object-fit: cover; display: block; }
    .active-badge { position: absolute; top: 6px; left: 6px; background: #4caf50; color: white; font-size: 0.7rem; font-weight: 700; padding: 2px 7px; border-radius: 20px; }
  }

  .video-info {
    flex: 1; display: flex; flex-direction: column; gap: 0.4rem;
    .video-title  { font-size: 1rem; font-weight: 700; color: #333; margin: 0; }
    .video-date   { font-size: 0.8rem; color: #888; margin: 0; }
    .video-format { font-size: 0.75rem; color: #fff; background: #4caf50; display: inline-block; padding: 2px 8px; border-radius: 12px; font-weight: 700; margin: 0; align-self: flex-start; }
    .video-actions { display: flex; gap: 0.5rem; margin-top: 0.25rem; flex-wrap: wrap; }
  }
}

.empty-list { margin-top: 1.5rem; text-align: center; color: #999; font-size: 0.95rem; }

.btn {
  padding: 0.55rem 1.1rem; border: none; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; white-space: nowrap;
  &.btn-upload          { background: #2c5f2d; color: white; padding: 0.75rem 1.5rem; &:hover { background: #1a472a; } }
  &.btn-activate        { background: #4caf50; color: white; &:hover { background: #388e3c; transform: translateY(-1px); } }
  &.btn-deactivate,
  &.btn-deactivate-small{ background: #f5f5f5; color: #555; border: 1px solid #ddd; &:hover { background: #e0e0e0; } }
  &.btn-delete          { background: #fff3f3; color: #c62828; border: 1px solid #ffcdd2; &:hover { background: #ffebee; } }
  &.btn-confirm-delete  { background: #f44336; color: white; &:hover { background: #d32f2f; } }
  &.btn-cancel          { background: #9e9e9e; color: white; &:hover { background: #757575; } }
}

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; animation: fadeIn 0.2s ease; }
.modal-content {
  background: white; padding: 2rem; border-radius: 12px; max-width: 440px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  h3 { margin-top: 0; color: #333; } p { color: #666; }
  .warning-text { color: #e65100; font-size: 0.88rem; }
  .modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; }
}

@media (max-width: 640px) {
  .video-card { flex-direction: column; .video-preview { width: 100%; .preview-player { height: 160px; } } }
  .title-form .title-row { flex-direction: column; }
  .list-header { flex-direction: column; align-items: flex-start; }
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>
