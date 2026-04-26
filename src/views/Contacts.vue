<template>
  <div class="contacts-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <h1>Contatti</h1>
        <p>Siamo qui per te! Contattaci per informazioni, ordini o per venirci a trovare</p>
      </div>

      <!-- Contact Grid -->
      <div class="contact-grid">
        <!-- Contact Info -->
        <div class="contact-info-section">
          <div class="info-card">
            <div class="info-icon">🚚</div>
            <h3>Mercato Itinerante</h3>
            <p>
              Mercati del territorio<br>
              Vieni a trovarci nei mercati della zona
            </p>
          </div>

          <div class="info-card">
            <div class="info-icon">📞</div>
            <h3>Telefono e WhatsApp</h3>
            <p>
              <a href="tel:+393756804525">+39 375 680 4525</a>
            </p>
          </div>

          <div class="info-card whatsapp-card">
            <div class="info-icon">
              <svg class="whatsapp-icon-large" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <h3>Messaggi WhatsApp</h3>
            <p>
              <a href="https://wa.me/393756804525" target="_blank" class="whatsapp-link-button">
                +39 375 680 4525
              </a>
            </p>
          </div>
        </div>

        <!-- Opening Hours -->
        <div class="hours-section">
          <h2>Orari di Apertura</h2>
          
          <div class="hours-list">
            <div class="hours-item closed">
              <span class="day">Lunedì</span>
              <span class="time">Chiuso</span>
            </div>
            <div class="hours-item highlight">
              <span class="day">Martedì</span>
              <span class="time">7:00 - 12:10</span>
            </div>
            <div class="hours-item highlight">
              <span class="day">Mercoledì</span>
              <span class="time">7:00 - 12:10</span>
            </div>
            <div class="hours-item highlight">
              <span class="day">Giovedì</span>
              <span class="time">7:00 - 12:10</span>
            </div>
            <div class="hours-item highlight">
              <span class="day">Venerdì</span>
              <span class="time">7:00 - 12:10</span>
            </div>
            <div class="hours-item highlight">
              <span class="day">Sabato</span>
              <span class="time">7:00 - 12:10</span>
            </div>
            <div class="hours-item closed">
              <span class="day">Domenica</span>
              <span class="time">Chiuso</span>
            </div>
          </div>

          <div class="hours-note">
            <strong>Nota:</strong> Orari soggetti a variazioni durante le festività
          </div>
        </div>
      </div>

      <!-- Contact Form Section (Preparato per futuro) -->
      <div class="form-section">
        <h2>Inviaci un Messaggio</h2>
        <p class="form-intro">
          Compila il modulo per richieste, informazioni o preventivi personalizzati
        </p>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Nome e Cognome *</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name"
                required
                placeholder="Il tuo nome"
              />
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email"
                required
                placeholder="tua@email.it"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="phone">Telefono</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="formData.phone"
                placeholder="+39 ..."
              />
            </div>

            <div class="form-group">
              <label for="subject">Oggetto</label>
              <select id="subject" v-model="formData.subject">
                <option value="">Seleziona un oggetto</option>
                <option value="info">Richiesta Informazioni</option>
                <option value="order">Ordine</option>
                <option value="quote">Preventivo</option>
                <option value="other">Altro</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="message">Messaggio *</label>
            <textarea 
              id="message" 
              v-model="formData.message"
              required
              rows="6"
              placeholder="Scrivi qui il tuo messaggio..."
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Invio in corso...' : 'Invia Messaggio' }}
            </button>
          </div>

          <p v-if="submitMessage" class="submit-message" :class="submitStatus">
            {{ submitMessage }}
          </p>
        </form>
      </div>

      <!-- Social Section -->
      <div class="social-section">
        <h2>Seguici sui Social</h2>
        <div class="social-links">
          <a href="https://www.facebook.com/fruttora" target="_blank" rel="noopener noreferrer" class="social-link facebook">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </a>
          <a href="https://www.instagram.com/ortofrutticola_ravanelli.alex?igsh=Zm5xbXdiNWdnOWNl/" target="_blank" rel="noopener noreferrer" class="social-link instagram">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span>Instagram</span>
          </a>
          <a href="https://wa.me/393756804525" target="_blank" rel="noopener noreferrer" class="social-link whatsapp">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <!-- Info Mercati -->
      <div class="markets-section">
        <h2>I Nostri Mercati</h2>
        <div class="markets-placeholder">
          <div class="market-icon">📍</div>
          <p>Siamo presenti nei principali mercati del territorio</p>
          <small>Contattaci per sapere dove trovarci</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Form state
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')

// Form submission handler — apre WhatsApp con messaggio precompilato
const handleSubmit = () => {
  isSubmitting.value = true
  submitMessage.value = ''

  const oggettoLabel = {
    info: 'Richiesta Informazioni',
    order: 'Ordine',
    quote: 'Preventivo',
    other: 'Altro'
  }

  let messaggio = `📬 *NUOVO MESSAGGIO DAL SITO*\n\n`
  messaggio += `👤 *Nome:* ${formData.name}\n`
  messaggio += `📧 *Email:* ${formData.email}\n`
  if (formData.phone) messaggio += `📞 *Telefono:* ${formData.phone}\n`
  if (formData.subject) messaggio += `📋 *Oggetto:* ${oggettoLabel[formData.subject] || formData.subject}\n`
  messaggio += `\n💬 *Messaggio:*\n${formData.message}`

  const urlWhatsApp = `https://wa.me/393756804525?text=${encodeURIComponent(messaggio)}`

  isSubmitting.value = false
  submitStatus.value = 'success'
  submitMessage.value = '✅ Apertura WhatsApp in corso...'

  window.open(urlWhatsApp, '_blank')

  // Reset form
  Object.keys(formData).forEach(key => { formData[key] = '' })

  setTimeout(() => { submitMessage.value = '' }, 5000)
}
</script>

<style scoped lang="scss">
.contacts-page {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 2.5rem;
    color: #2c5f2d;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.contact-info-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  .info-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(76, 175, 80, 0.15);
    }

    .info-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.3rem;
      color: #2c5f2d;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    p {
      color: #666;
      line-height: 1.8;

      a {
        color: #4caf50;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #2c5f2d;
          text-decoration: underline;
        }
      }
    }

    &.whatsapp-card {
      .info-icon {
        display: flex;
        justify-content: center;
      }

      .whatsapp-icon-large {
        width: 60px;
        height: 60px;
        color: #25D366;
      }

      &:hover {
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.25);

        .whatsapp-icon-large {
          animation: whatsappPulse 0.6s ease;
        }
      }
    }

    .whatsapp-link-button {
      color: #25D366 !important;
      font-weight: 600;
      font-size: 1.1rem;

      &:hover {
        color: #128C7E !important;
      }
    }
  }

  @keyframes whatsappPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
}

.hours-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.8rem;
    color: #2c5f2d;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  .hours-list {
    margin-bottom: 1.5rem;
  }

  .hours-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f0f0f0;

    &.highlight {
      background: #f8f8f8;
      border-radius: 6px;
      margin-bottom: 0.25rem;
      font-weight: 600;
      color: #4caf50;
    }

    &.closed {
      opacity: 0.5;

      .time {
        color: #999;
        font-style: italic;
      }
    }

    .day {
      font-weight: 500;
    }

    .time {
      color: #666;
    }
  }

  .hours-note {
    background: #fff3cd;
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #856404;
    border: 1px solid #ffc107;

    strong {
      font-weight: 600;
    }
  }
}

/* Form Section */
.form-section {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 4rem;

  h2 {
    font-size: 2rem;
    color: #2c5f2d;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .form-intro {
    color: #666;
    margin-bottom: 2rem;
  }
}

.contact-form {
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

    input,
    select,
    textarea {
      padding: 0.75rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: #4caf50;
      }
    }

    textarea {
      resize: vertical;
    }
  }

  .form-actions {
    margin-top: 2rem;

    .btn {
      background: #4caf50;
      color: white;
      padding: 0.75rem 2.5rem;
      border: none;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background: #45a049;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  .submit-message {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    font-weight: 500;

    &.success {
      background: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #4caf50;
    }

    &.error {
      background: #ffebee;
      color: #c62828;
      border: 1px solid #f44336;
    }
  }
}

/* Social Section */
.social-section {
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-size: 2rem;
    color: #2c5f2d;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .social-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem 2rem;
    background: white;
    border-radius: 12px;
    text-decoration: none;
    color: #333;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 150px;

    .social-icon {
      font-size: 2.5rem;
    }

    &.facebook .social-icon { color: #1877f2; }
    &.instagram .social-icon { color: #e4405f; }
    &.whatsapp .social-icon { color: #25d366; }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    &.facebook:hover {
      color: #1877f2;
      .social-icon { color: #1877f2; }
    }

    &.instagram:hover {
      color: #e4405f;
      .social-icon { color: #e4405f; }
    }

    &.whatsapp:hover {
      color: #25d366;
      .social-icon { color: #25d366; }
    }
  }
}

/* Markets Section */
.markets-section {
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    color: #2c5f2d;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .markets-placeholder {
    background: linear-gradient(135deg, #4caf50 0%, #2c5f2d 100%);
    border-radius: 12px;
    padding: 4rem 2rem;
    text-align: center;
    color: white;

    .market-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    small {
      opacity: 0.9;
      font-size: 1rem;
    }
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .form-section {
    padding: 2rem 1.5rem;
  }

  .contact-form .form-row {
    grid-template-columns: 1fr;
  }

  .social-links {
    gap: 1rem;
  }

  .social-link {
    min-width: 120px;
    padding: 1.25rem 1.5rem;

    .social-icon {
      font-size: 2.25rem;
    }
  }
}
</style>
