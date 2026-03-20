<template>
  <div class="prenota-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <h1>🛒 Prenota Qui</h1>
        <p class="subtitle">Compila il form e prenota la tua spesa. Sarà pronta per te al mercato!</p>
      </div>

      <!-- Info Box -->
      <div class="info-banner">
        <div class="info-icon">📋</div>
        <div class="info-content">
          <h3>Come funziona?</h3>
          <p>
            <strong>1.</strong> Compila il modulo con i prodotti desiderati<br>
            <strong>2.</strong> Clicca "Invia Prenotazione"<br>
            <strong>3.</strong> Si aprirà WhatsApp con il messaggio precompilato<br>
            <strong>4.</strong> Invia il messaggio per confermare la prenotazione
          </p>
        </div>
      </div>

      <!-- Form Prenotazione -->
      <form class="prenota-form" @submit.prevent="handleSubmit">
        <!-- Dati Cliente -->
        <div class="form-section">
          <h2>📝 I Tuoi Dati</h2>
          
          <div class="form-row">
            <div class="form-group">
              <label for="nome">Nome (sul citofono) *</label>
              <input 
                type="text" 
                id="nome" 
                v-model="formData.nome"
                required
                placeholder="Es: Mario Rossi"
              />
            </div>

          <div class="form-row">
          <div class="form-group">
            <label for="Via">Via e numero civico *</label>
            <input 
              type="text" 
              id="Via" 
              v-model="formData.Via"
              required
              placeholder="Es: Via Roma, 10"
            />
          </div>

          <div class="form-group">
            <label for="Paese">Paese (nazione) *</label>
            <input 
              type="text" 
              id="Paese" 
              v-model="formData.Paese"
              required
              placeholder="Es: Milano"
            />
          </div>
        </div>

            <div class="form-group">
              <label for="telefono">Telefono / WhatsApp *</label>
              <input 
                type="tel" 
                id="telefono" 
                v-model="formData.telefono"
                required
                placeholder="+39 ..."
              />
            </div>
          </div>

          <div class="form-group">
            <label for="mercato">Mercato di Ritiro *</label>
            <select id="mercato" v-model="formData.mercato" required>
              <option value="">Seleziona il mercato...</option>
              <option value="Martedì - Asso">Martedì - Asso</option>
              <option value="Martedì - Zelo Buon Persico">Martedì - Zelo Buon Persico</option>
              <option value="Mercoledì - Scarenna">Mercoledì - Scarenna</option>
              <option value="Mercoledì - Agrate">Mercoledì - Agrate</option>
              <option value="Giovedì - Caslino D'Erba">Giovedì - Caslino D'Erba</option>
              <option value="Giovedì - Bussero">Giovedì - Bussero</option>
              <option value="Venerdì - Eupilio">Venerdì - Eupilio</option>
              <option value="Sabato - Brembate">Sabato - Brembate</option>
            </select>
          </div>
        </div>

        <!-- Prodotti -->
        <div class="form-section">
          <h2>🛒 I Tuoi Prodotti</h2>
          
          <div 
            v-for="(prodotto, index) in formData.prodotti" 
            :key="index"
            class="prodotto-item"
          >
            <div class="prodotto-header">
              <h3>Prodotto {{ index + 1 }}</h3>
              <button 
                v-if="formData.prodotti.length > 1"
                type="button" 
                class="btn-remove"
                @click="rimuoviProdotto(index)"
              >
                ✕
              </button>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Categoria *</label>
                <select v-model="prodotto.categoria" required>
                  <option value="">Seleziona categoria...</option>
                  <option value="Frutta Fresca">Frutta Fresca</option>
                  <option value="Verdura Fresca">Verdura Fresca</option>
                  <option value="Prodotti Biologici">Prodotti Biologici</option>
                  <option value="Frutta Secca">Frutta Secca</option>
                  <option value="Agrumi">Agrumi</option>
                  <option value="Prodotti Esotici">Prodotti Esotici</option>
                </select>
              </div>

              <div class="form-group">
                <label>Nome Prodotto *</label>
                <input 
                  type="text" 
                  v-model="prodotto.nome"
                  required
                  placeholder="Es: Mele Golden"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Quantità (Kg)</label>
                <input 
                  type="number" 
                  v-model.number="prodotto.quantitaKg"
                  step="0.1"
                  min="0"
                  placeholder="0.0"
                />
              </div>

              <div class="form-group">
                <label>Quantità (Pezzi)</label>
                <input 
                  type="number" 
                  v-model.number="prodotto.quantitaPezzi"
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Note (opzionale)</label>
              <input 
                type="text" 
                v-model="prodotto.note"
                placeholder="Es: Ben mature, biologiche..."
              />
            </div>
          </div>

          <button type="button" class="btn btn-add-product" @click="aggiungiProdotto">
            + Aggiungi Altro Prodotto
          </button>
        </div>

        <!-- Note Finali -->
        <div class="form-section">
          <h2>💬 Note Aggiuntive</h2>
          <div class="form-group">
            <label for="note">Altre richieste o preferenze (opzionale)</label>
            <textarea 
              id="note" 
              v-model="formData.noteAggiuntive"
              rows="4"
              placeholder="Scrivi qui eventuali richieste particolari..."
            ></textarea>
          </div>
        </div>

        <!-- Privacy -->
        <div class="form-section">
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.privacy" required />
              <span>Accetto il trattamento dei dati personali per la gestione della prenotazione *</span>
            </label>
          </div>
        </div>

        <!-- Submit -->
        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-large" :disabled="isSubmitting">
            {{ isSubmitting ? 'Preparazione in corso...' : '💬 Invia su WhatsApp' }}
          </button>
          <p class="submit-info">
            Cliccando il pulsante si aprirà WhatsApp con il tuo ordine precompilato
          </p>
        </div>

        <!-- Messaggio Conferma -->
        <div v-if="submitMessage" class="submit-message" :class="submitStatus">
          {{ submitMessage }}
        </div>
      </form>

      <!-- Sezione Admin (nascosta per utenti normali) -->
      <div v-if="isAdmin" class="admin-section">
        <h2>👨‍💼 Area Amministrazione</h2>
        <div class="admin-actions">
          <button @click="scaricaListaSpesa" class="btn btn-admin">
            📥 Scarica Lista Spesa Giornaliera (CSV)
          </button>
          <button @click="visualizzaPrenotazioni" class="btn btn-admin-secondary">
            📋 Visualizza Prenotazioni ({{ prenotazioniCount }})
          </button>
          <button @click="cancellaPrenotazioni" class="btn btn-admin-danger">
            🗑️ Cancella Tutte le Prenotazioni
          </button>
        </div>

        <!-- Lista Prenotazioni -->
        <div v-if="mostraPrenotazioni && prenotazioni.length > 0" class="prenotazioni-list">
          <h3>Prenotazioni del Giorno</h3>
          <div v-for="(prenotazione, index) in prenotazioni" :key="index" class="prenotazione-card">
            <div class="prenotazione-header">
              <strong>{{ prenotazione.nome }}</strong>
              <span class="data">{{ formatData(prenotazione.data) }}</span>
            </div>
            <p><strong>Tel:</strong> {{ prenotazione.telefono }}</p>
            <p><strong>Mercato:</strong> {{ prenotazione.mercato }}</p>
            <div class="prodotti-list">
              <strong>Prodotti:</strong>
              <ul>
                <li v-for="(prod, i) in prenotazione.prodotti" :key="i">
                  {{ prod.categoria }} - {{ prod.nome }}
                  <span v-if="prod.quantitaKg">({{ prod.quantitaKg }} kg)</span>
                  <span v-if="prod.quantitaPezzi">({{ prod.quantitaPezzi }} pz)</span>
                  <span v-if="prod.note" class="note-prod">- {{ prod.note }}</span>
                </li>
              </ul>
            </div>
            <p v-if="prenotazione.noteAggiuntive"><strong>Note:</strong> {{ prenotazione.noteAggiuntive }}</p>
          </div>
        </div>
      </div>

      <!-- Info Contatto -->
      <div class="contact-cta">
        <h3>Hai bisogno di aiuto?</h3>
        <p>Contattaci su WhatsApp per qualsiasi dubbio sulla prenotazione</p>
        <a href="https://wa.me/393756804525" target="_blank" class="btn btn-whatsapp">
          💬 Scrivici su WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State
const formData = ref({
  nome: '',
  Via:'',
  Paese:'',
  telefono: '',
  mercato: '',
  prodotti: [
    { categoria: '', nome: '', quantitaKg: null, quantitaPezzi: null, note: '' }
  ],
  noteAggiuntive: '',
  privacy: false
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')

// Admin
const isAdmin = ref(false) // Cambia in true per accedere all'area admin
const mostraPrenotazioni = ref(false)
const prenotazioni = ref([])

// Computed
const prenotazioniCount = computed(() => prenotazioni.value.length)

// Metodi Form
const aggiungiProdotto = () => {
  formData.value.prodotti.push({
    categoria: '',
    nome: '',
    quantitaKg: null,
    quantitaPezzi: null,
    note: ''
  })
}

const rimuoviProdotto = (index) => {
  formData.value.prodotti.splice(index, 1)
}

const handleSubmit = () => {
  isSubmitting.value = true
  submitMessage.value = ''
  
  // Crea oggetto prenotazione
  const prenotazione = {
    ...formData.value,
    data: new Date().toISOString(),
    id: Date.now()
  }
  
  // Salva in localStorage
  const prenotazioniSalvate = JSON.parse(localStorage.getItem('prenotazioni') || '[]')
  prenotazioniSalvate.push(prenotazione)
  localStorage.setItem('prenotazioni', JSON.stringify(prenotazioniSalvate))
  
  // Prepara messaggio WhatsApp
  let messaggioWhatsApp = `🛒 *NUOVA PRENOTAZIONE*\n\n`
  messaggioWhatsApp += `👤 *Nome:* ${formData.value.nome}\n`
  messaggioWhatsApp += `📞 *Telefono:* ${formData.value.telefono}\n`
  messaggioWhatsApp += `📍 *Mercato:* ${formData.value.mercato}\n\n`
  messaggioWhatsApp += `*PRODOTTI:*\n`
  
  formData.value.prodotti.forEach((prod, index) => {
    messaggioWhatsApp += `\n${index + 1}. ${prod.categoria} - ${prod.nome}\n`
    if (prod.quantitaKg) messaggioWhatsApp += `   • Kg: ${prod.quantitaKg}\n`
    if (prod.quantitaPezzi) messaggioWhatsApp += `   • Pezzi: ${prod.quantitaPezzi}\n`
    if (prod.note) messaggioWhatsApp += `   • Note: ${prod.note}\n`
  })
  
  if (formData.value.noteAggiuntive) {
    messaggioWhatsApp += `\n💬 *Note aggiuntive:*\n${formData.value.noteAggiuntive}`
  }
  
  // Codifica il messaggio per URL
  const messaggioCodificato = encodeURIComponent(messaggioWhatsApp)
  const numeroWhatsApp = '393756804525'
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${messaggioCodificato}`
  
  // Simulazione breve poi apri WhatsApp
  setTimeout(() => {
    isSubmitting.value = false
    submitStatus.value = 'success'
    submitMessage.value = '✅ Prenotazione salvata! Ti stiamo reindirizzando a WhatsApp per confermare...'
    
    // Apri WhatsApp dopo 2 secondi
    setTimeout(() => {
      window.open(urlWhatsApp, '_blank')
      
      // Reset form dopo apertura WhatsApp
      formData.value = {
        nome: '',
        telefono: '',
        mercato: '',
        prodotti: [{ categoria: '', nome: '', quantitaKg: null, quantitaPezzi: null, note: '' }],
        noteAggiuntive: '',
        privacy: false
      }
      
      // Ricarica prenotazioni
      caricaPrenotazioni()
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      // Update message
      submitMessage.value = '✅ Prenotazione inviata! Completa la conferma su WhatsApp per finalizzare.'
      
      // Clear message after 15 seconds
      setTimeout(() => {
        submitMessage.value = ''
      }, 15000)
    }, 2000)
  }, 500)
}

// Metodi Admin
const caricaPrenotazioni = () => {
  prenotazioni.value = JSON.parse(localStorage.getItem('prenotazioni') || '[]')
}

const visualizzaPrenotazioni = () => {
  caricaPrenotazioni()
  mostraPrenotazioni.value = !mostraPrenotazioni.value
}

const scaricaListaSpesa = () => {
  caricaPrenotazioni()
  
  if (prenotazioni.value.length === 0) {
    alert('Nessuna prenotazione da scaricare')
    return
  }
  
  // Genera CSV
  let csv = 'Data,Nome (Citofono),Telefono,Mercato,Categoria,Prodotto,Kg,Pezzi,Note Prodotto,Note Aggiuntive\n'
  
  prenotazioni.value.forEach(p => {
    const dataFormatted = new Date(p.data).toLocaleDateString('it-IT')
    p.prodotti.forEach(prod => {
      csv += `"${dataFormatted}","${p.nome}","${p.telefono}","${p.mercato}","${prod.categoria}","${prod.nome}","${prod.quantitaKg || ''}","${prod.quantitaPezzi || ''}","${prod.note || ''}","${p.noteAggiuntive || ''}"\n`
    })
  })
  
  // Download file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  const dataOggi = new Date().toISOString().split('T')[0]
  link.setAttribute('href', url)
  link.setAttribute('download', `lista-spesa-${dataOggi}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const cancellaPrenotazioni = () => {
  if (confirm('Sei sicuro di voler cancellare TUTTE le prenotazioni?')) {
    localStorage.removeItem('prenotazioni')
    prenotazioni.value = []
    mostraPrenotazioni.value = false
    alert('Tutte le prenotazioni sono state cancellate')
  }
}

const formatData = (dataISO) => {
  return new Date(dataISO).toLocaleString('it-IT')
}

// Lifecycle
onMounted(() => {
  caricaPrenotazioni()
  // Per attivare area admin, aggiungi ?admin=true nell'URL
  if (window.location.search.includes('admin=true')) {
    isAdmin.value = true
  }
})
</script>

<style scoped lang="scss">
.prenota-page {
  padding: 2rem 0;
  min-height: calc(100vh - 140px);
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header */
.page-header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    color: #2c5f2d;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #666;
  }
}

/* Info Banner */
.info-banner {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 3rem;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);

  .info-icon {
    font-size: 3rem;
    flex-shrink: 0;
  }

  .info-content {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
      color: white;
    }

    p {
      opacity: 0.95;
      line-height: 1.8;

      strong {
        color: #fff3cd;
        font-weight: 700;
      }
    }
  }
}

/* Form */
.prenota-form {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;

  &:last-of-type {
    border-bottom: none;
  }

  h2 {
    font-size: 1.8rem;
    color: #2c5f2d;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }

  input, select, textarea {
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #ff9800;
    }
  }

  textarea {
    resize: vertical;
  }
}

.checkbox-group {
  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;

    input[type="checkbox"] {
      margin-top: 0.25rem;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    span {
      font-weight: normal;
      line-height: 1.6;
    }
  }
}

/* Prodotto Item */
.prodotto-item {
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #ff9800;

  .prodotto-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-size: 1.2rem;
      color: #ff9800;
      margin: 0;
    }

    .btn-remove {
      background: #f44336;
      color: white;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        background: #d32f2f;
        transform: rotate(90deg);
      }
    }
  }
}

.btn-add-product {
  background: #4caf50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }
}

/* Actions */
.form-actions {
  text-align: center;
  margin-top: 2rem;

  .submit-info {
    margin-top: 1rem;
    color: #666;
    font-size: 0.95rem;
    font-style: italic;
  }

  .btn-large {
    padding: 1rem 3rem;
    font-size: 1.2rem;
    background: #ff9800;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 700;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: #f57c00;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(255, 152, 0, 0.4);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

.submit-message {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
  font-size: 1.1rem;

  &.success {
    background: #e8f5e9;
    color: #2e7d32;
    border: 2px solid #4caf50;
  }
}

/* Admin Section */
.admin-section {
  background: #fff3cd;
  padding: 2rem;
  border-radius: 16px;
  margin: 3rem 0;
  border: 3px solid #ffc107;

  h2 {
    color: #856404;
    margin-bottom: 1.5rem;
  }

  .admin-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .btn-admin, .btn-admin-secondary, .btn-admin-danger {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-admin {
    background: #4caf50;
    color: white;

    &:hover {
      background: #45a049;
    }
  }

  .btn-admin-secondary {
    background: #2196f3;
    color: white;

    &:hover {
      background: #1976d2;
    }
  }

  .btn-admin-danger {
    background: #f44336;
    color: white;

    &:hover {
      background: #d32f2f;
    }
  }
}

.prenotazioni-list {
  margin-top: 2rem;

  h3 {
    color: #856404;
    margin-bottom: 1rem;
  }

  .prenotazione-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .prenotazione-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #f0f0f0;

      strong {
        font-size: 1.2rem;
        color: #2c5f2d;
      }

      .data {
        color: #666;
        font-size: 0.9rem;
      }
    }

    p {
      margin: 0.5rem 0;
      color: #555;
    }

    .prodotti-list {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #f0f0f0;

      ul {
        margin-top: 0.5rem;
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.5rem;
          color: #555;

          .note-prod {
            font-style: italic;
            color: #888;
          }
        }
      }
    }
  }
}

/* Contact CTA */
.contact-cta {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  margin-top: 3rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.8rem;
    color: #2c5f2d;
    margin-bottom: 0.75rem;
  }

  p {
    color: #666;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  .btn-whatsapp {
    display: inline-block;
    background: #25D366;
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: #128C7E;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4);
    }
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.2rem;
  }

  .info-banner {
    flex-direction: column;
    text-align: center;
  }

  .prenota-form {
    padding: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .admin-actions {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
}
</style>
