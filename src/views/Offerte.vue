<template>
  <div class="offerte-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1>🎉 Offerte della Settimana</h1>
        <p>Scopri le nostre promozioni!</p>
      </div>
    </section>

    <!-- Loading -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">⏳ Caricamento...</div>
    </div>

    <!-- Content -->
    <section v-else class="main-content">
      <div class="container">
        <!-- Indicatore Admin -->
        <div v-if="isAdminMode" class="admin-indicator">
          👨‍💼 Modalità Admin Attiva
        </div>

        <!-- Pulsante Modifica (solo admin) -->
        <div v-if="isAdminMode" class="action-bar">
          <button 
            v-if="!isEditMode" 
            @click="enterEditMode" 
            class="btn btn-edit"
          >
            ✏️ Modifica Offerte
          </button>
          <div v-else class="edit-actions">
            <button @click="saveChanges" class="btn btn-save">
              💾 Salva Modifiche
            </button>
            <button @click="cancelEdit" class="btn btn-cancel">
              ❌ Annulla
            </button>
          </div>
        </div>

        <!-- Messaggio Successo -->
        <div v-if="showSuccessMessage" class="success-message">
          ✅ Modifiche salvate con successo!
        </div>

        <!-- Nessuna Offerta Attiva -->
        <div v-if="!offerData && !isEditMode" class="no-offers">
          <div class="no-offers-icon">📭</div>
          <h2>Nessuna Offerta Attiva</h2>
          <p>Al momento non ci sono offerte disponibili. Torna presto!</p>
        </div>

        <!-- Modalità Visualizzazione -->
        <div v-else-if="!isEditMode && offerData" class="offer-display">
          <div class="offer-card">
            <div class="offer-header">
              <h2>{{ offerData.title }}</h2>
              <div class="offer-validity" v-if="offerData.validUntil">
                ⏰ Valido fino al: {{ formatDate(offerData.validUntil) }}
              </div>
            </div>

            <div class="offer-image-container" v-if="offerData.image">
              <img 
                :src="offerData.image" 
                :alt="offerData.title"
                class="offer-image"
                @error="handleImageError"
              />
            </div>

            <div class="offer-description" v-if="offerData.description">
              <p>{{ offerData.description }}</p>
            </div>
          </div>
        </div>

        <!-- Modalità Edit (solo admin) -->
        <div v-else-if="isEditMode" class="offer-edit">
          <div class="edit-form">
            <h3>✏️ Modifica Volantino Offerte</h3>

            <!-- Upload Immagine Volantino -->
            <div class="form-group">
              <label>Immagine Volantino</label>
              <div class="image-upload-section">
                <div v-if="editData.image" class="image-preview-container">
                  <img 
                    :src="editData.image" 
                    alt="Preview"
                    class="image-preview"
                    @error="handleImageError"
                  />
                </div>
                <div class="upload-options">
                  <input 
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="file-input"
                    id="file-upload"
                  />
                  <label for="file-upload" class="file-label">
                    📁 Carica Volantino
                  </label>
                  <span class="separator">oppure URL:</span>
                  <input 
                    v-model="editData.image" 
                    type="text"
                    placeholder="URL immagine volantino..."
                    class="edit-input"
                  />
                </div>
                <div v-if="uploadProgress" class="upload-progress">
                  Caricamento: {{ uploadProgress }}%
                </div>
              </div>
            </div>

            <!-- Titolo -->
            <div class="form-group">
              <label>Titolo Offerta</label>
              <input 
                v-model="editData.title" 
                type="text"
                placeholder="Es: Offerte della Settimana"
                class="edit-input"
              />
            </div>

            <!-- Descrizione -->
            <div class="form-group">
              <label>Descrizione</label>
              <textarea 
                v-model="editData.description" 
                placeholder="Descrivi le offerte..."
                class="edit-textarea"
                rows="4"
              ></textarea>
            </div>

            <!-- Validità -->
            <div class="form-group">
              <label>Valido Fino Al</label>
              <input 
                v-model="editData.validUntil" 
                type="date"
                class="edit-input"
              />
            </div>

            <!-- Attiva/Disattiva -->
            <div class="form-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="editData.active"
                  class="checkbox-input"
                />
                <span>{{ editData.active ? '✓ Offerta Attiva (visibile al pubblico)' : '✗ Offerta Non Attiva (nascosta al pubblico)' }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { db } from '@/firebase.config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const admin = useAdmin()

const isAdminMode = computed(() => admin.isAdminMode.value)
const isEditMode = ref(false)
const showSuccessMessage = ref(false)
const isLoading = ref(true)
const offerData = ref(null)
const editData = ref({
  title: 'Offerte della Settimana',
  description: '',
  image: '',
  validUntil: '',
  active: true
})
const uploadProgress = ref(0)

// Carica offerte da Firebase
const loadOffers = async () => {
  try {
    const docRef = doc(db, 'settings', 'offerte')
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      // Mostra solo se attiva (per il pubblico)
      if (data.active || isAdminMode.value) {
        offerData.value = data
      }
    }
  } catch (error) {
    console.error('Errore caricamento offerte:', error)
  } finally {
    isLoading.value = false
  }
}

const enterEditMode = () => {
  if (offerData.value) {
    editData.value = JSON.parse(JSON.stringify(offerData.value))
  }
  isEditMode.value = true
}

const cancelEdit = () => {
  if (confirm('Annullare le modifiche?')) {
    isEditMode.value = false
    uploadProgress.value = 0
  }
}

const saveChanges = async () => {
  if (!confirm('Salvare le modifiche? Saranno visibili a tutti gli utenti.')) return
  
  try {
    const docRef = doc(db, 'settings', 'offerte')
    await setDoc(docRef, {
      ...editData.value,
      updatedAt: new Date().toISOString()
    })
    
    await loadOffers()
    
    isEditMode.value = false
    showSuccessMessage.value = true
    
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  } catch (error) {
    console.error('Errore salvataggio:', error)
    alert('Errore nel salvataggio. Riprova.')
  }
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  if (!file.type.startsWith('image/')) {
    alert('Per favore seleziona un file immagine!')
    return
  }
  
  if (file.size > 10 * 1024 * 1024) {
    alert('L\'immagine è troppo grande! Massimo 10MB.')
    return
  }
  
  try {
    const storage = getStorage()
    const fileName = `offerte/${Date.now()}_${file.name}`
    const imageRef = storageRef(storage, fileName)
    
    const uploadTask = uploadBytesResumable(imageRef, file)
    
    uploadTask.on('state_changed',
      (snapshot) => {
        uploadProgress.value = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      },
      (error) => {
        console.error('Upload error:', error)
        alert('Errore durante il caricamento!')
        uploadProgress.value = 0
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        editData.value.image = downloadURL
        uploadProgress.value = 0
      }
    )
  } catch (error) {
    console.error('Error uploading:', error)
    alert('Errore durante il caricamento!')
  }
}

const handleImageError = (e) => {
  e.target.src = '/images/placeholder-product.jpg'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('it-IT', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

onMounted(() => {
  loadOffers()
})
</script>

<style scoped>
.offerte-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-hero {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.page-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-hero p {
  font-size: 1.1rem;
  opacity: 0.95;
}

.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.loading-spinner {
  font-size: 1.5rem;
  color: #ff6b6b;
}

.main-content {
  padding: 2rem 0;
}

.admin-indicator {
  position: fixed;
  top: 90px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  z-index: 999;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.action-bar {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
}

.edit-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-edit {
  background: #ff6b6b;
  color: white;
}

.btn-edit:hover {
  background: #ff5252;
}

.btn-save {
  background: #2196F3;
  color: white;
}

.btn-save:hover {
  background: #1976D2;
}

.btn-cancel {
  background: #f44336;
  color: white;
}

.btn-cancel:hover {
  background: #d32f2f;
}

.success-message {
  background: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.no-offers {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.no-offers-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.no-offers h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.no-offers p {
  font-size: 1.1rem;
  color: #666;
}

.offer-display {
  max-width: 900px;
  margin: 0 auto;
}

.offer-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.offer-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.offer-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.offer-validity {
  font-size: 1rem;
  opacity: 0.95;
}

.offer-image-container {
  padding: 2rem;
  background: #f8f9fa;
}

.offer-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.offer-description {
  padding: 2rem;
}

.offer-description p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
}

.offer-edit {
  max-width: 800px;
  margin: 0 auto;
}

.edit-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.edit-form h3 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.edit-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.edit-input:focus {
  outline: none;
  border-color: #ff6b6b;
}

.edit-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  font-family: inherit;
  resize: vertical;
}

.edit-textarea:focus {
  outline: none;
  border-color: #ff6b6b;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.checkbox-input {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.checkbox-label span {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.image-upload-section {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #e0e0e0;
}

.image-preview-container {
  text-align: center;
  margin-bottom: 1rem;
}

.image-preview {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.upload-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: stretch;
}

.file-input {
  display: none;
}

.file-label {
  background: #ff6b6b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
}

.file-label:hover {
  background: #ff5252;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.separator {
  text-align: center;
  color: #999;
  font-size: 0.9rem;
  font-style: italic;
}

.upload-progress {
  text-align: center;
  font-weight: 600;
  color: #ff6b6b;
  padding: 0.5rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 6px;
}

@media (max-width: 768px) {
  .page-hero h1 {
    font-size: 2rem;
  }

  .offer-header h2 {
    font-size: 1.5rem;
  }

  .offer-image-container {
    padding: 1rem;
  }

  .edit-form {
    padding: 1.5rem;
  }
}
</style>
