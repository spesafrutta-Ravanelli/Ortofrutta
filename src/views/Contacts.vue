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
          <a href="#" class="social-link facebook">
            <span class="social-icon">📘</span>
            <span>Facebook</span>
          </a>
          <a href="#" class="social-link instagram">
            <span class="social-icon">📷</span>
            <span>Instagram</span>
          </a>
          <a href="#" class="social-link whatsapp">
            <span class="social-icon">💬</span>
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

// Form submission handler (preparato per futuro backend)
const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''
  
  // Simulazione invio (sostituire con chiamata API reale)
  setTimeout(() => {
    isSubmitting.value = false
    submitStatus.value = 'success'
    submitMessage.value = 'Messaggio inviato con successo! Ti risponderemo al più presto.'
    
    // Reset form
    Object.keys(formData).forEach(key => {
      formData[key] = ''
    })

    // Clear message after 5 seconds
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  }, 1500)
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

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    &.facebook:hover {
      color: #1877f2;
    }

    &.instagram:hover {
      color: #e4405f;
    }

    &.whatsapp:hover {
      color: #25d366;
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
      font-size: 2rem;
    }
  }
}
</style>
