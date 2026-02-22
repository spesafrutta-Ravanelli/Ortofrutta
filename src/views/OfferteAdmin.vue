<!--
  OfferteAdmin: editor integrato + anteprima live.
  - Editor a sinistra (desktop) / sopra (tablet) / tab (mobile)
  - Anteprima = OffertePubblica (BrochureSlider)
  - Stessa UI e logica del Volantino Editor originale
  - Salvataggio Firebase settings/volantino (invariato)
-->
<template>
  <div class="offerte-admin-page">
    <!-- Toggle Admin: ben visibile -->
    <div class="admin-toolbar">
      <span class="admin-badge">🔧 Modalità Admin</span>
      <button class="btn-toggle-preview" @click="toggleView" v-if="isMobileTab">
        {{ activeTab === 'editor' ? '👁️ Anteprima' : '✏️ Editor' }}
      </button>
      <button class="btn-exit-admin" @click="exitAdminMode">👁️ Vedi come utente</button>
      <RouterLink to="/admin" class="btn-back-admin">← Pannello Admin</RouterLink>
    </div>

    <!-- Layout split: Editor | Anteprima -->
    <div class="admin-layout" :class="layoutClass">
      <!-- Pannello Editor (identico al Volantino Editor) -->
      <aside class="editor-panel" :class="{ hidden: isMobileTab && activeTab === 'preview' }">
        <div class="editor-section">
          <h2>🥬 Editor Offerte</h2>

          <!-- Periodo Offerte -->
          <div class="editor-block">
            <h3>📅 Periodo Offerte</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Data inizio</label>
                <input type="date" v-model="dataInizio" />
              </div>
              <div class="form-group">
                <label>Data fine</label>
                <input type="date" v-model="dataFine" />
              </div>
            </div>
            <button class="btn-save-date" @click="saveDates">
              💾 Salva Date
            </button>
            <span v-if="dateSavedMsg" class="save-msg">✅ Date salvate!</span>
          </div>

          <!-- Form Aggiungi Prodotto -->
          <div class="editor-block">
            <h3>➕ Aggiungi Prodotto</h3>
            <div class="form-group">
              <label>Nome Prodotto</label>
              <input v-model="form.title" placeholder="Nome prodotto" />
            </div>
            <div class="form-group">
              <label>Immagine Prodotto</label>
              <div
                class="image-upload-btn"
                @click="triggerImageInput"
              >
                <span class="upload-icon">📷</span>
                <span class="upload-label">{{ imagePreview ? '✅ Foto caricata' : 'Tocca per aggiungere foto' }}</span>
                <span class="upload-hint">Galleria o Fotocamera</span>
              </div>
              <input
                ref="imageInputRef"
                type="file"
                accept="image/*"
                capture="environment"
                class="hidden-input"
                @change="onImageSelect"
              />
              <div v-if="imagePreview" class="image-preview-wrap">
                <img :src="imagePreview" alt="Anteprima" />
                <button type="button" class="btn-remove-img" @click="clearImage">🗑️ Rimuovi foto</button>
              </div>
            </div>
            <div class="form-group">
              <label>Prezzo (€)</label>
              <input v-model="form.price" placeholder="9,90" />
            </div>
            <div class="form-group">
              <label>Secondo Prezzo (€) - opzionale</label>
              <input v-model="form.price2" placeholder="es. 15,90 (opzionale)" />
            </div>
            <button class="btn-add-product" @click="addOrUpdateProduct">
              {{ editIndex >= 0 ? '💾 Salva Modifica' : '➕ Aggiungi Prodotto' }}
            </button>
          </div>

          <!-- Lista prodotti (modifica/elimina) -->
          <div v-if="products.length > 0" class="products-list">
            <h3>📋 Prodotti inseriti ({{ products.length }})</h3>
            <div
              v-for="(p, index) in products"
              :key="index"
              class="product-list-item"
            >
              <span class="pi-name">{{ p.title }}</span>
              <span class="pi-price">€ {{ p.price }}{{ p.price2 ? ' / ' + p.price2 : '' }}</span>
              <div class="pi-actions">
                <button class="btn-edit" @click="editProduct(index)">✏️</button>
                <button class="btn-delete" @click="deleteProduct(index)">🗑️</button>
              </div>
            </div>
          </div>

          <!-- Azioni -->
          <div class="action-buttons">
            <button class="btn-action" @click="saveToFirebase">
              💾 Salva su Firebase
            </button>
            <button class="btn-action" @click="downloadVolantinoJson">
              📥 Scarica JSON
            </button>
            <button class="btn-action btn-print" @click="doPrint">
              🖨️ Stampa
            </button>
            <button class="btn-action btn-load" @click="triggerLoadFile">
              📂 Carica JSON
            </button>
            <input
              ref="loadFileRef"
              type="file"
              accept=".json"
              class="hidden-input"
              @change="loadFromFile"
            />
          </div>
        </div>
      </aside>

      <!-- Anteprima live (= OffertePubblica) -->
      <main class="preview-panel" :class="{ hidden: isMobileTab && activeTab === 'editor' }">
        <div class="preview-header">
          <h2>🎉 Le Nostre Offerte</h2>
          <p v-if="dataInizio && dataFine" class="subtitle">
            Dal {{ formatData(dataInizio) }} al {{ formatData(dataFine) }}
          </p>
        </div>
        <div class="preview-content">
        <BrochureSlider
          :offerte="products"
          :data-inizio="dataInizio"
          :data-fine="dataFine"
          :full-viewport="true"
        />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { db } from '@/firebase.config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import BrochureSlider from '@/components/offerte/BrochureSlider.vue'

// Stato locale per editing (non useVolantino - qui scriviamo)
const products = ref([])
const dataInizio = ref('')
const dataFine = ref('')

// Form
const form = ref({ title: '', price: '', price2: '', image: null })
const imagePreview = ref(null)
const imageInputRef = ref(null)
const loadFileRef = ref(null)
const editIndex = ref(-1)
const dateSavedMsg = ref(false)

// Tab mobile
const activeTab = ref('editor')
const { toggleAdminMode } = useAdmin()
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const exitAdminMode = () => toggleAdminMode()

const isMobileTab = computed(() => windowWidth.value < 768)
const layoutClass = computed(() => ({
  'layout-desktop': windowWidth.value >= 1024,
  'layout-tablet': windowWidth.value >= 768 && windowWidth.value < 1024,
  'layout-mobile': windowWidth.value < 768
}))

const formatData = (dateStr) => {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

// Resize
const onResize = () => {
  windowWidth.value = window.innerWidth
}

// Carica da Firebase
const loadFromFirebase = async () => {
  try {
    const docSnap = await getDoc(doc(db, 'settings', 'volantino'))
    if (docSnap.exists()) {
      const data = docSnap.data()
      if (data.products?.length > 0) products.value = data.products
      if (data.dataInizio) dataInizio.value = data.dataInizio
      if (data.dataFine) dataFine.value = data.dataFine
    }
  } catch (e) {
    console.error('Errore caricamento Firebase:', e)
  }
}

// Salva date su Firebase
const saveDates = async () => {
  if (!dataInizio.value || !dataFine.value) {
    alert('Compila entrambe le date!')
    return
  }
  try {
    await setDoc(doc(db, 'settings', 'volantino'), {
      products: products.value,
      dataInizio: dataInizio.value,
      dataFine: dataFine.value,
      updatedAt: new Date().toISOString()
    }, { merge: true })
    dateSavedMsg.value = true
    setTimeout(() => { dateSavedMsg.value = false }, 2000)
  } catch (e) {
    alert('Errore salvataggio date!')
  }
}

// Salva prodotti su Firebase
const saveToFirebase = async () => {
  try {
    await setDoc(doc(db, 'settings', 'volantino'), {
      products: products.value,
      dataInizio: dataInizio.value,
      dataFine: dataFine.value,
      updatedAt: new Date().toISOString()
    }, { merge: true })
    alert('✅ Salvato su Firebase!')
  } catch (e) {
    console.error('Errore Firebase:', e)
    alert('Errore salvataggio Firebase!')
  }
}

// Immagine: ridimensiona e comprimi (come volantino-editor)
const processImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const maxW = 600, maxH = 600
        let w = img.width, h = img.height
        if (w > h && w > maxW) { h = h * (maxW / w); w = maxW }
        else if (h > maxH) { w = w * (maxH / h); h = maxH }
        canvas.width = w
        canvas.height = h
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.7))
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const triggerImageInput = () => imageInputRef.value?.click()
const onImageSelect = async (e) => {
  const file = e.target.files?.[0]
  if (!file?.type.startsWith('image/')) {
    alert('Seleziona un file immagine!')
    return
  }
  try {
    form.value.image = await processImage(file)
    imagePreview.value = form.value.image
  } catch (err) {
    alert('Errore elaborazione immagine')
  }
  e.target.value = ''
}
const clearImage = () => {
  form.value.image = null
  imagePreview.value = null
}

// Aggiungi / Modifica prodotto
const addOrUpdateProduct = () => {
  const { title, price, price2, image } = form.value
  if (!title?.trim() || !price?.trim()) {
    alert('Compila almeno Nome e Prezzo!')
    return
  }
  const prod = {
    title: title.trim(),
    price: price.trim(),
    price2: price2?.trim() || '',
    image: image || null
  }
  if (editIndex.value >= 0) {
    products.value[editIndex.value] = prod
    editIndex.value = -1
  } else {
    products.value.push(prod)
  }
  resetForm()
  saveToFirebase() // Sync come nel volantino-editor
}

const resetForm = () => {
  form.value = { title: '', price: '', price2: '', image: null }
  imagePreview.value = null
  editIndex.value = -1
}

const editProduct = (index) => {
  const p = products.value[index]
  form.value = {
    title: p.title,
    price: p.price,
    price2: p.price2 || '',
    image: p.image || null
  }
  imagePreview.value = p.image || null
  editIndex.value = index
}

const deleteProduct = (index) => {
  if (confirm('Rimuovere prodotto?')) {
    products.value.splice(index, 1)
    saveToFirebase()
  }
}

// Carica da file JSON
const triggerLoadFile = () => loadFileRef.value?.click()
const loadFromFile = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    try {
      const data = JSON.parse(ev.target.result)
      if (!data.products || !Array.isArray(data.products)) throw new Error('Formato non valido')
      products.value = data.products
      alert(`✅ ${products.value.length} prodotti caricati!`)
      saveToFirebase()
    } catch (err) {
      alert('Errore: ' + err.message)
    }
    e.target.value = ''
  }
  reader.readAsText(file)
}

const toggleView = () => {
  activeTab.value = activeTab.value === 'editor' ? 'preview' : 'editor'
}

const doPrint = () => {
  window.print()
}

// Scarica volantino come JSON (come volantino-editor)
const downloadVolantinoJson = () => {
  if (products.value.length === 0) {
    alert('Non ci sono prodotti da salvare!')
    return
  }
  const data = {
    version: '1.0',
    date: new Date().toISOString(),
    products: products.value
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const now = new Date()
  const dateStr = now.toISOString().split('T')[0]
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-')
  a.download = `volantino_${dateStr}_${timeStr}.json`
  a.click()
  URL.revokeObjectURL(url)
  alert('✅ Volantino scaricato!')
}

onMounted(async () => {
  window.scrollTo(0, 0)
  window.addEventListener('resize', onResize)
  await loadFromFirebase()
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped lang="scss">
$primary: #4caf50;
$primary-light: #d9f0d9;
$accent: #ffc107;
$secondary: #ff9800;

.offerte-admin-page {
  min-height: calc(100vh - 100px - 260px);
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.admin-toolbar {
  flex-shrink: 0;
  background: linear-gradient(135deg, #2c5f2d, #4caf50);
  color: white;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.admin-badge { font-weight: 700; }
.btn-exit-admin {
  background: rgba(255,255,255,0.9);
  color: #2c5f2d;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.btn-toggle-preview {
  background: rgba(255,255,255,0.9);
  color: #2c5f2d;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.btn-back-admin { color: white; text-decoration: none; }

/* Layout */
.admin-layout {
  flex: 1;
  display: flex;
  min-height: 0;
  overflow: hidden;
}

/* Desktop: 40% editor | 60% preview */
.layout-desktop {
  flex-direction: row;

  .editor-panel { width: 40%; min-width: 320px; }
  .preview-panel { flex: 1; min-width: 0; }
}

/* Tablet: editor sopra, preview sotto */
.layout-tablet {
  flex-direction: column;

  .editor-panel {
    flex-shrink: 0;
    max-height: 45%;
    overflow-y: auto;
  }
  .preview-panel { flex: 1; min-height: 0; }
}

/* Mobile: tab Editor / Anteprima */
.layout-mobile {
  flex-direction: column;

  .editor-panel, .preview-panel {
    flex: 1;
    overflow-y: auto;
  }
  .editor-panel.hidden,
  .preview-panel.hidden {
    display: none !important;
  }
}

/* Editor panel - stile Volantino Editor */
.editor-panel {
  background: white;
  box-shadow: 2px 0 10px rgba(0,0,0,0.08);
  overflow-y: auto;
}

.editor-section {
  padding: 1.25rem;
  max-width: 480px;
}

.editor-section h2 {
  color: $primary;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.editor-block {
  margin-bottom: 1.5rem;
}

.editor-block h3 {
  color: $primary;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.form-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 120px;
  margin-bottom: 0.75rem;
}

.form-group label {
  display: block;
  font-weight: 700;
  margin-bottom: 0.35rem;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
}

.image-upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px dashed $primary;
  border-radius: 12px;
  background: #f9fff9;
  cursor: pointer;
  min-height: 80px;
}
.upload-icon { font-size: 1.5rem; }
.upload-label { color: $primary; font-weight: 700; }
.upload-hint { color: #999; font-size: 0.8rem; }

.hidden-input { display: none; }

.image-preview-wrap {
  margin-top: 0.5rem;
  text-align: center;
}
.image-preview-wrap img {
  max-width: 100%;
  max-height: 120px;
  border-radius: 8px;
  object-fit: cover;
}
.btn-remove-img {
  display: block;
  margin: 0.5rem auto 0;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-save-date, .btn-add-product {
  background: $primary;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.95rem;
}
.save-msg { margin-left: 0.5rem; color: $primary; font-weight: 700; font-size: 0.9rem; }

.products-list {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}
.products-list h3 { font-size: 0.95rem; margin-bottom: 0.5rem; }

.product-list-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f0f0f0;
}
.pi-name { flex: 1; font-weight: 600; }
.pi-price { color: $primary; font-weight: 700; font-size: 0.9rem; }
.pi-actions { display: flex; gap: 0.25rem; }
.btn-edit, .btn-delete {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}
.btn-edit { background: $primary; color: white; }
.btn-delete { background: #f44336; color: white; }

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
.btn-action {
  flex: 1;
  min-width: 120px;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  background: $primary;
  color: white;
}
.btn-print { background: $accent; color: #333; }
.btn-load { background: $secondary; color: white; }

/* Preview panel */
.preview-panel {
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: #f8f9fa;
}

.preview-header {
  flex-shrink: 0;
  text-align: center;
  padding: 0.5rem 1rem;
}

.preview-content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.preview-header h2 { font-size: 1.25rem; color: #2c3e50; margin: 0; }
.preview-header .subtitle { font-size: 0.9rem; color: #666; margin: 0.25rem 0 0; }

@media (max-width: 768px) {
  .editor-section { padding: 1rem; }
}

/* Stampa: nascondi editor, mostra solo anteprima */
@media print {
  .admin-toolbar,
  .editor-panel,
  .btn-toggle-preview {
    display: none !important;
  }
  .preview-panel {
    display: block !important;
  }
}
</style>
