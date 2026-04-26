<template>
  <div class="hero-media-admin">
    <div class="container">

      <div class="section-header">
        <h2>🎬 Contenuto Hero Homepage</h2>
        <p class="section-hint">
          Gestisci il video e l'immagine promozionale della hero.
          Se c'è un video attivo ha la priorità sull'immagine.
        </p>
      </div>

      <!-- Logica attuale -->
      <div class="current-state">
        <div class="state-badge" :class="stateClass">
          {{ stateLabel }}
        </div>
      </div>

      <div class="two-cols">

        <!-- ═══════════════════════════════════════════════════════
             COLONNA SINISTRA — VIDEO
        ═══════════════════════════════════════════════════════ -->
        <div class="col">
          <h3 class="col-title">🎥 Video Hero</h3>
          <p class="col-hint">Verticale o orizzontale — si adatta automaticamente</p>

          <!-- Upload zone video -->
          <div
            class="upload-zone"
            :class="{ 'dragging': isDraggingVideo, 'disabled': uploading }"
            @dragover.prevent="isDraggingVideo = true"
            @dragleave.prevent="isDraggingVideo = false"
            @drop.prevent="onDropVideo"
            @click="!uploading && $refs.videoInput.click()"
          >
            <input ref="videoInput" type="file" accept="video/*" class="hidden-input" @change="onVideoSelected" />

            <template v-if="!uploading">
              <div class="upload-icon">🎥</div>
              <p class="upload-label">Trascina o clicca per selezionare</p>
              <p class="upload-hint">MP4, MOV, AVI</p>
            </template>

            <template v-else>
              <div class="progress-wrapper">
                <div class="progress-step">{{ progress.step }}</div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" :style="{ width: progress.percent + '%' }" />
                </div>
                <div class="progress-percent">{{ progress.percent }}%</div>
                <p class="progress-note">⏳ Non chiudere questa scheda.</p>
              </div>
            </template>
          </div>

          <!-- Form titolo video -->
          <div v-if="selectedVideo && !uploading" class="file-form">
            <div class="file-preview">
              <span>🎞️ {{ selectedVideo.name }}</span>
              <span class="file-size">({{ formatSize(selectedVideo.size) }})</span>
              <button class="btn-clear" @click="clearVideo">✕</button>
            </div>
            <div class="title-row">
              <input v-model="videoTitle" type="text" class="title-input" placeholder="Titolo video" />
              <button class="btn btn-upload" @click="startVideoUpload">🚀 Carica</button>
            </div>
          </div>

          <div v-if="errorMsg"    class="error-banner">⚠️ {{ errorMsg }}</div>
          <div v-if="successVideo" class="success-banner">✅ {{ successVideo }}</div>

          <!-- Video caricato -->
          <div v-if="videos.length > 0" class="media-card" :class="{ 'is-active': videos[0].active }">
            <div class="media-preview">
              <video :src="videos[0].url" muted preload="metadata" class="preview-player" />
              <div v-if="videos[0].active" class="active-badge">✅ ATTIVO</div>
              <div v-if="videos[0].isVertical" class="vertical-badge">↕ Verticale</div>
            </div>
            <div class="media-info">
              <p class="media-title">{{ videos[0].title }}</p>
              <p class="media-date">{{ formatDate(videos[0].uploadedAt) }}</p>
              <div class="media-actions">
                <button v-if="!videos[0].active" class="btn btn-activate" @click="handleActivate(videos[0].id)">▶️ Attiva</button>
                <button v-else class="btn btn-deactivate-small" @click="handleDeactivateAll">⏸️ Disattiva</button>
                <button class="btn btn-delete" @click="handleDeleteVideo(videos[0])">🗑️</button>
              </div>
            </div>
          </div>
          <div v-else-if="!uploading" class="empty-media">Nessun video caricato</div>

        </div>

        <!-- ═══════════════════════════════════════════════════════
             COLONNA DESTRA — IMMAGINE PROMOZIONALE
        ═══════════════════════════════════════════════════════ -->
        <div class="col">
          <h3 class="col-title">🖼️ Immagine Promozionale</h3>
          <p class="col-hint">Mostrata quando non c'è un video attivo</p>

          <!-- Upload zone immagine -->
          <div
            class="upload-zone"
            :class="{ 'dragging': isDraggingImg, 'disabled': uploadingImg }"
            @dragover.prevent="isDraggingImg = true"
            @dragleave.prevent="isDraggingImg = false"
            @drop.prevent="onDropImg"
            @click="!uploadingImg && $refs.imgInput.click()"
          >
            <input ref="imgInput" type="file" accept="image/*" class="hidden-input" @change="onImgSelected" />

            <template v-if="!uploadingImg">
              <div class="upload-icon">🖼️</div>
              <p class="upload-label">Trascina o clicca per selezionare</p>
              <p class="upload-hint">JPG, PNG, WebP</p>
            </template>

            <template v-else>
              <div class="progress-wrapper">
                <div class="progress-step">{{ progressImg.step }}</div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" :style="{ width: progressImg.percent + '%' }" />
                </div>
                <div class="progress-percent">{{ progressImg.percent }}%</div>
                <p class="progress-note">⏳ Non chiudere questa scheda.</p>
              </div>
            </template>
          </div>

          <!-- Form titolo immagine -->
          <div v-if="selectedImg && !uploadingImg" class="file-form">
            <div class="file-preview">
              <span>🖼️ {{ selectedImg.name }}</span>
              <span class="file-size">({{ formatSize(selectedImg.size) }})</span>
              <button class="btn-clear" @click="clearImg">✕</button>
            </div>
            <div class="title-row">
              <input v-model="imgTitle" type="text" class="title-input" placeholder="Titolo immagine" />
              <button class="btn btn-upload" @click="startImgUpload">🚀 Carica</button>
            </div>
          </div>

          <div v-if="errorMsgImg"  class="error-banner">⚠️ {{ errorMsgImg }}</div>
          <div v-if="successImg"   class="success-banner">✅ {{ successImg }}</div>

          <!-- Immagine promo caricata -->
          <div v-if="promoImage" class="media-card is-active">
            <div class="media-preview img-preview">
              <img :src="promoImage.url" :alt="promoImage.title" class="preview-img" />
              <div class="active-badge">✅ ATTIVA</div>
            </div>
            <div class="media-info">
              <p class="media-title">{{ promoImage.title }}</p>
              <p class="media-date">{{ formatDate(promoImage.uploadedAt) }}</p>
              <div class="media-actions">
                <button class="btn btn-delete" @click="handleDeleteImg">🗑️ Elimina</button>
              </div>
            </div>
          </div>
          <div v-else-if="!uploadingImg" class="empty-media">
            Nessuna immagine promozionale — verrà mostrata l'immagine default
          </div>

        </div>
      </div>

    </div>

    <!-- Modal eliminazione video -->
    <div v-if="videoToDelete" class="modal-overlay" @click="videoToDelete = null">
      <div class="modal-content" @click.stop>
        <h3>🗑️ Elimina video</h3>
        <p>Eliminare <strong>{{ videoToDelete.title }}</strong>?</p>
        <p class="warning-text">La hero tornerà a mostrare l'immagine promozionale o quella default.</p>
        <div class="modal-actions">
          <button class="btn btn-confirm-delete" @click="confirmDeleteVideo">🗑️ Elimina</button>
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
  videos, promoImage,
  uploading, uploadingImg,
  progress, progressImg,
  errorMsg, errorMsgImg,
  uploadVideo, uploadPromoImage,
  setActiveVideo, deactivateAll,
  deleteVideo, deletePromoImage,
  loadAll,
} = useHeroVideoAdmin()

// ─── Stato attuale hero ────────────────────────────────────────────────────────
const stateLabel = computed(() => {
  if (videos.value.some(v => v.active)) return '▶️ Video attivo nella hero'
  if (promoImage.value)                  return '🖼️ Immagine promozionale nella hero'
  return '📷 Immagine default nella hero'
})

const stateClass = computed(() => {
  if (videos.value.some(v => v.active)) return 'state-video'
  if (promoImage.value)                  return 'state-image'
  return 'state-default'
})

// ─── Video ─────────────────────────────────────────────────────────────────────
const videoInput    = ref(null)
const isDraggingVideo = ref(false)
const selectedVideo = ref(null)
const videoTitle    = ref('')
const successVideo  = ref('')
const videoToDelete = ref(null)

const onVideoSelected = (e) => { const f = e.target.files[0]; if (f) pickVideo(f) }
const onDropVideo = (e) => {
  isDraggingVideo.value = false
  const f = e.dataTransfer.files[0]
  if (f?.type.startsWith('video/')) pickVideo(f)
}
const pickVideo  = (f) => { selectedVideo.value = f; videoTitle.value = f.name.replace(/\.[^.]+$/, '') }
const clearVideo = () => { selectedVideo.value = null; videoTitle.value = ''; if (videoInput.value) videoInput.value.value = '' }

const startVideoUpload = async () => {
  if (!selectedVideo.value) return
  successVideo.value = ''
  await uploadVideo(selectedVideo.value, videoTitle.value.trim() || selectedVideo.value.name)
  if (!errorMsg.value) {
    successVideo.value = 'Video caricato! Clicca "Attiva" per mostrarlo.'
    clearVideo()
    setTimeout(() => { successVideo.value = '' }, 6000)
  }
}

const handleActivate     = async (id) => { await setActiveVideo(id) }
const handleDeactivateAll = async ()  => { await deactivateAll() }
const handleDeleteVideo  = (v)        => { videoToDelete.value = v }
const confirmDeleteVideo = async ()   => {
  await deleteVideo(videoToDelete.value)
  videoToDelete.value = null
}

// ─── Immagine promo ────────────────────────────────────────────────────────────
const imgInput      = ref(null)
const isDraggingImg = ref(false)
const selectedImg   = ref(null)
const imgTitle      = ref('')
const successImg    = ref('')

const onImgSelected = (e) => { const f = e.target.files[0]; if (f) pickImg(f) }
const onDropImg = (e) => {
  isDraggingImg.value = false
  const f = e.dataTransfer.files[0]
  if (f?.type.startsWith('image/')) pickImg(f)
}
const pickImg  = (f) => { selectedImg.value = f; imgTitle.value = f.name.replace(/\.[^.]+$/, '') }
const clearImg = () => { selectedImg.value = null; imgTitle.value = ''; if (imgInput.value) imgInput.value.value = '' }

const startImgUpload = async () => {
  if (!selectedImg.value) return
  successImg.value = ''
  await uploadPromoImage(selectedImg.value, imgTitle.value.trim() || selectedImg.value.name)
  if (!errorMsgImg.value) {
    successImg.value = 'Immagine caricata e attiva nella hero!'
    clearImg()
    setTimeout(() => { successImg.value = '' }, 6000)
  }
}

const handleDeleteImg = async () => {
  await deletePromoImage()
}

// ─── Utils ─────────────────────────────────────────────────────────────────────
const formatSize = (b) => b < 1024 * 1024 ? (b / 1024).toFixed(0) + ' KB' : (b / (1024 * 1024)).toFixed(1) + ' MB'
const formatDate = (ts) => {
  if (!ts) return '—'
  const d = ts.toDate ? ts.toDate() : new Date(ts.seconds * 1000)
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

onMounted(() => loadAll())
</script>

<style scoped lang="scss">
.hero-media-admin {
  background: #fff; border-radius: 16px; padding: 2rem 0; border: 2px solid #e8f5e9;
  .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
}

.section-header {
  margin-bottom: 1rem;
  h2 { font-size: 1.6rem; color: #2c5f2d; margin-bottom: 0.5rem; font-weight: 700; }
  .section-hint { color: #666; font-size: 0.95rem; }
}

/* Stato attuale */
.current-state { margin-bottom: 1.5rem; }
.state-badge {
  display: inline-block; padding: 0.5rem 1.2rem; border-radius: 20px; font-weight: 700; font-size: 0.95rem;
  &.state-video   { background: #e8f5e9; color: #2e7d32; border: 2px solid #4caf50; }
  &.state-image   { background: #e3f2fd; color: #1565c0; border: 2px solid #2196f3; }
  &.state-default { background: #f5f5f5; color: #555;    border: 2px solid #ccc; }
}

/* Layout due colonne */
.two-cols {
  display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
}

.col {
  .col-title { font-size: 1.1rem; color: #2c5f2d; font-weight: 700; margin-bottom: 0.25rem; }
  .col-hint  { font-size: 0.85rem; color: #888; margin-bottom: 1rem; }
}

/* Upload zone */
.upload-zone {
  border: 2px dashed #4caf50; border-radius: 12px; padding: 1.5rem 1rem;
  text-align: center; cursor: pointer; transition: all 0.3s ease; background: #f9fbe7;
  min-height: 130px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.4rem;
  &:hover:not(.disabled) { background: #f1f8e9; border-color: #2c5f2d; }
  &.dragging { background: #e8f5e9; border-color: #1a472a; transform: scale(1.01); }
  &.disabled { cursor: default; border-style: solid; }
  .hidden-input { display: none; }
  .upload-icon  { font-size: 2.5rem; }
  .upload-label { font-size: 0.95rem; font-weight: 600; color: #2c5f2d; margin: 0; }
  .upload-hint  { font-size: 0.8rem; color: #888; margin: 0; }
}

.progress-wrapper {
  width: 100%; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  .progress-step      { font-size: 0.85rem; font-weight: 600; color: #2c5f2d; }
  .progress-bar-track { width: 100%; height: 8px; background: #c8e6c9; border-radius: 10px; overflow: hidden; }
  .progress-bar-fill  { height: 100%; background: linear-gradient(90deg, #4caf50, #2c5f2d); border-radius: 10px; transition: width 0.4s ease; }
  .progress-percent   { font-size: 0.85rem; color: #555; font-weight: 600; }
  .progress-note      { font-size: 0.75rem; color: #888; margin: 0; }
}

/* File form */
.file-form {
  margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;

  .file-preview {
    display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
    background: #f5f5f5; padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.85rem;
    .file-size { color: #888; font-size: 0.78rem; }
    .btn-clear { margin-left: auto; background: none; border: none; color: #999; cursor: pointer; &:hover { color: #333; } }
  }

  .title-row {
    display: flex; gap: 0.5rem;
    .title-input { flex: 1; padding: 0.6rem 0.8rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 0.9rem; &:focus { outline: none; border-color: #4caf50; } }
  }
}

/* Banners */
.error-banner   { margin-top: 0.75rem; padding: 0.75rem; background: #ffebee; color: #c62828; border-radius: 8px; font-size: 0.85rem; border-left: 4px solid #f44336; }
.success-banner { margin-top: 0.75rem; padding: 0.75rem; background: #e8f5e9; color: #2e7d32; border-radius: 8px; font-size: 0.85rem; border-left: 4px solid #4caf50; animation: fadeIn 0.3s ease; }

/* Media card */
.media-card {
  display: flex; gap: 1rem; padding: 1rem; margin-top: 1rem;
  border: 2px solid #e0e0e0; border-radius: 12px; background: #fafafa;
  transition: border-color 0.3s ease;
  &.is-active { border-color: #4caf50; background: #f1f8e9; }

  .media-preview {
    position: relative; width: 120px; flex-shrink: 0; border-radius: 8px; overflow: hidden; background: #000;

    .preview-player { width: 100%; height: 80px; object-fit: cover; display: block; }

    &.img-preview { background: #f5f5f5; }
    .preview-img  { width: 100%; height: 80px; object-fit: cover; display: block; }

    .active-badge   { position: absolute; top: 4px; left: 4px; background: #4caf50; color: white; font-size: 0.65rem; font-weight: 700; padding: 2px 6px; border-radius: 20px; }
    .vertical-badge { position: absolute; top: 4px; right: 4px; background: #ff9800; color: white; font-size: 0.65rem; font-weight: 700; padding: 2px 6px; border-radius: 20px; }
  }

  .media-info {
    flex: 1; display: flex; flex-direction: column; gap: 0.3rem;
    .media-title   { font-size: 0.9rem; font-weight: 700; color: #333; margin: 0; }
    .media-date    { font-size: 0.75rem; color: #888; margin: 0; }
    .media-actions { display: flex; gap: 0.4rem; margin-top: auto; flex-wrap: wrap; }
  }
}

.empty-media { margin-top: 1rem; padding: 1rem; text-align: center; color: #999; font-size: 0.85rem; background: #f9f9f9; border-radius: 8px; border: 1px dashed #ddd; }

/* Buttons */
.btn {
  padding: 0.45rem 0.9rem; border: none; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; white-space: nowrap;
  &.btn-upload          { background: #2c5f2d; color: white; padding: 0.6rem 1.2rem; &:hover { background: #1a472a; } }
  &.btn-activate        { background: #4caf50; color: white; &:hover { background: #388e3c; } }
  &.btn-deactivate-small{ background: #f5f5f5; color: #555; border: 1px solid #ddd; &:hover { background: #e0e0e0; } }
  &.btn-delete          { background: #fff3f3; color: #c62828; border: 1px solid #ffcdd2; &:hover { background: #ffebee; } }
  &.btn-confirm-delete  { background: #f44336; color: white; &:hover { background: #d32f2f; } }
  &.btn-cancel          { background: #9e9e9e; color: white; &:hover { background: #757575; } }
}

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; animation: fadeIn 0.2s ease; }
.modal-content {
  background: white; padding: 2rem; border-radius: 12px; max-width: 420px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  h3 { margin-top: 0; color: #333; } p { color: #666; }
  .warning-text { color: #e65100; font-size: 0.88rem; }
  .modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; }
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>
