<template>
  <div class="about-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <h1>Chi Siamo</h1>
        <p class="subtitle">La nostra storia di passione per la qualità</p>
      </div>

      <!-- Story Section -->
      <section class="story-section">
        <div class="content-wrapper-full">
          <div class="text-content">
            <h2>La Nostra Storia</h2>
            <p>
              L'<strong>Ortofrutticola Ravanelli</strong> è una realtà a conduzione familiare che opera nel settore ortofrutticolo da oltre 70 anni, unendo tradizione, esperienza e attenzione costante alla qualità. La nostra storia ha inizio negli <strong>anni '50</strong>, quando <strong>Oreste Ravanelli</strong> avvia l'attività con l'obiettivo di portare sui mercati prodotti freschi, selezionati e genuini, costruendo nel tempo un rapporto di fiducia con la clientela.
            </p>
            <p>
              Tra la fine degli anni '60 e l'inizio degli anni '70, l'ingresso di <strong>Maurizio Ravanelli</strong> segna una fase di crescita e consolidamento. Grazie a un lavoro quotidiano serio e costante, l'azienda rafforza la propria presenza sui mercati, distinguendosi per professionalità, conoscenza del prodotto e attenzione alle esigenze dei clienti.
            </p>
            <p>
              Sul finire degli anni '90 entra in azienda la terza generazione, con <strong>Alex Ravanelli</strong>, che inizia il proprio percorso affiancando i genitori. L'esperienza maturata sul campo permette di integrare i valori storici dell'azienda con un approccio più moderno, orientato alla selezione accurata dei fornitori e a un servizio sempre più efficiente.
            </p>
            <p>
              Intorno al 2010 si aggiunge anche <strong>Christian Ravanelli</strong>, contribuendo allo sviluppo dell'attività e alla scelta strategica di ampliare l'offerta, affiancando ai mercati tradizionali anche la gestione di punti vendita. Questa evoluzione consente all'azienda di garantire una presenza più capillare e un servizio continuativo.
            </p>
            <p>
              Nel tempo, le attività si specializzano: <strong>Christian Ravanelli</strong> segue il negozio di Presezzo, mentre <strong>Alex Ravanelli</strong> fonda e guida <strong>Ravanelli & Carminati</strong>, che prosegue tutt'oggi l'attività sui mercati, mantenendo gli standard di qualità che da sempre contraddistinguono il nome Ravanelli.
            </p>
            <p>
              Oggi <strong>Ravanelli & Carminati</strong> è sinonimo di esperienza, affidabilità e freschezza. Ogni giorno selezioniamo con cura frutta e verdura, privilegiando prodotti di stagione e garantendo un rapporto diretto e trasparente con il cliente. La nostra forza è unire la tradizione di famiglia a una visione orientata al presente, per offrire un servizio serio, puntuale e di qualità.
            </p>
          </div>
          <div class="image-placeholder">
            <ImageGallery 
              :images="aboutImages"
              title="La nostra attività"
            />
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="values-section">
        <h2>Perché Scegliere Noi</h2>
        <p class="values-intro">
          Scegliere <strong>Ravanelli & Carminati</strong> significa affidarsi a un'azienda che mette il cliente al centro del proprio lavoro, con la garanzia di un'esperienza costruita in oltre sette decenni di attività.
        </p>
        
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">📚</div>
            <h3>Esperienza consolidata</h3>
            <p>
              Oltre 70 anni di presenza sui mercati ci permettono di conoscere a fondo i prodotti e le esigenze dei clienti.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">🌱</div>
            <h3>Qualità e freschezza</h3>
            <p>
              Selezioniamo quotidianamente frutta e verdura, privilegiando stagionalità e fornitori affidabili.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">🤝</div>
            <h3>Rapporto diretto e fiducia</h3>
            <p>
              Crediamo nel contatto umano, nella trasparenza e nel consiglio giusto al momento giusto.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">👨‍👩‍👦</div>
            <h3>Tradizione e continuità</h3>
            <p>
              Una storia di famiglia che si tramanda di generazione in generazione, mantenendo gli stessi valori nel tempo.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">⭐</div>
            <h3>Professionalità e servizio</h3>
            <p>
              Puntualità, serietà e attenzione ai dettagli sono ciò che ci distingue ogni giorno.
            </p>
          </div>
        </div>

        <div class="values-footer">
          <p>
            Con <strong>Ravanelli & Carminati</strong>, scegli la sicurezza di un nome storico e la passione di chi lavora con impegno per offrirti sempre il meglio.
          </p>
        </div>
      </section>

      <!-- Team Section -->
      <section class="team-section">
        <h2>Il Nostro Team</h2>
        <div class="team-content">
          <p>
            Il nostro team è composto da professionisti esperti e appassionati, 
            che ogni giorno lavorano con dedizione per offrire ai clienti 
            prodotti di eccellenza e un servizio impeccabile.
          </p>
          <p>
            La nostra esperienza, unita alla conoscenza approfondita del settore 
            ortofrutticolo, ci permette di consigliare al meglio i nostri clienti, 
            suggerendo i prodotti più adatti alle loro esigenze.
          </p>
        </div>
      </section>

      <!-- Numbers Section -->
      <section class="numbers-section">
        <h2>I Numeri che ci Rappresentano</h2>
        
        <div class="numbers-grid">
          <div class="number-card">
            <div class="number">75+</div>
            <div class="label">Anni di Esperienza</div>
          </div>

          <div class="number-card">
            <div class="number">{{ productStats.categories }}</div>
            <div class="label">Categorie di Prodotti</div>
          </div>

          <div class="number-card">
            <div class="number">{{ productStats.total }}+</div>
            <div class="label">Prodotti Disponibili</div>
          </div>

          <div class="number-card">
            <div class="number">1000+</div>
            <div class="label">Clienti Soddisfatti</div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <h2>Vuoi saperne di più?</h2>
        <p>Vieni a trovarci o contattaci per scoprire tutti i nostri servizi</p>
        <div class="cta-buttons">
          <RouterLink to="/contatti" class="btn btn-primary">
            Contattaci
          </RouterLink>
          <RouterLink to="/listino" class="btn btn-secondary">
            Vedi i Prodotti
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductsStore } from '@/stores/productsStore'
import ImageGallery from '@/components/common/ImageGallery.vue'

const store = useProductsStore()

const productStats = computed(() => store.productStats)

// Placeholder per immagini future
const aboutImages = [
  '/images/Ravanelli Family.jpeg',
  '/images/foto banco vecchia 1.jpeg',
  '/images/foto banco vecchia 2.jpeg', 
  '/images/Foto banchi.jpg',
]
</script>

<style scoped lang="scss">
.about-page {
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
    font-size: 3rem;
    color: #2c5f2d;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #666;
    font-style: italic;
  }
}

/* Story Section */
.story-section {
  margin-bottom: 5rem;

  .content-wrapper-full {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .text-content {
    h2 {
      font-size: 2.5rem;
      color: #2c5f2d;
      margin-bottom: 2rem;
      font-weight: 700;
      text-align: center;
    }

    p {
      font-size: 1.1rem;
      line-height: 2;
      color: #555;
      margin-bottom: 1.5rem;
      text-align: justify;

      strong {
        color: #2c5f2d;
        font-weight: 700;
      }
    }
  }

  .image-placeholder {
    background: #f5f5f5;
    border-radius: 12px;
    overflow: hidden;
    max-width: 1000px;
    margin: 0 auto;
  }
}

/* Values Section */
.values-section {
  margin-bottom: 5rem;
  background: white;
  padding: 4rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  h2 {
    font-size: 2.5rem;
    color: #2c5f2d;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 700;
  }

  .values-intro {
    text-align: center;
    font-size: 1.15rem;
    line-height: 1.8;
    color: #666;
    max-width: 900px;
    margin: 0 auto 3rem;

    strong {
      color: #2c5f2d;
      font-weight: 700;
    }
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem;
    margin-bottom: 3rem;
  }

  .values-footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid #e0e0e0;

    p {
      font-size: 1.2rem;
      line-height: 1.8;
      color: #555;
      max-width: 800px;
      margin: 0 auto;

      strong {
        color: #2c5f2d;
        font-weight: 700;
      }
    }
  }

  .value-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(76, 175, 80, 0.15);
    }

    .value-icon {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.5rem;
      color: #2c5f2d;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    p {
      color: #666;
      line-height: 1.6;
    }
  }
}

/* Team Section */
.team-section {
  margin-bottom: 5rem;
  padding: 3rem;
  background: #f8f8f8;
  border-radius: 12px;

  h2 {
    font-size: 2.2rem;
    color: #2c5f2d;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 700;
  }

  .team-content {
    max-width: 800px;
    margin: 0 auto;

    p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #555;
      margin-bottom: 1.5rem;
      text-align: center;
    }
  }
}

/* Numbers Section */
.numbers-section {
  margin-bottom: 5rem;

  h2 {
    font-size: 2.2rem;
    color: #2c5f2d;
    text-align: center;
    margin-bottom: 3rem;
    font-weight: 700;
  }

  .numbers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .number-card {
    background: linear-gradient(135deg, #4caf50 0%, #2c5f2d 100%);
    color: white;
    padding: 2.5rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.2);

    .number {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .label {
      font-size: 1rem;
      opacity: 0.95;
    }
  }
}

/* CTA Section */
.cta-section {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2.2rem;
    color: #2c5f2d;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.75rem 2rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-block;

    &.btn-primary {
      background: #4caf50;
      color: white;

      &:hover {
        background: #45a049;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
      }
    }

    &.btn-secondary {
      background: transparent;
      color: #4caf50;
      border: 2px solid #4caf50;

      &:hover {
        background: #4caf50;
        color: white;
      }
    }
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.2rem;
  }

  .story-section {
    .text-content {
      h2 {
        font-size: 2rem;
      }

      p {
        font-size: 1rem;
        text-align: left;
      }
    }
  }

  .values-section {
    padding: 3rem 1.5rem;

    h2 {
      font-size: 2rem;
    }

    .values-intro {
      font-size: 1rem;
    }

    .values-footer p {
      font-size: 1.05rem;
    }
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .numbers-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;

    .btn {
      width: 100%;
      max-width: 300px;
    }
  }
}
</style>
