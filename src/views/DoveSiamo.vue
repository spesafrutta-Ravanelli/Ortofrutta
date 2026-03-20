<template>
  <div class="dove-siamo-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <h1>Dove Siamo</h1>
        <p class="subtitle">Vieni a trovarci nei mercati del territorio</p> 
      </div>

      <!-- Info Mercato -->
      <section class="market-info">
        <div class="info-box">
          <div class="info-icon">🚚</div>
          <h2>Mercato Itinerante</h2>
          <p>
            Siamo un mercato ortofrutticola itinerante, presente nei principali mercati 
            della zona. Ogni giorno selezioniamo per te i prodotti più freschi e di qualità.
          </p>
        </div>
      </section>

      <!-- Mercati Lista -->
      <section class="markets-section">
        <h2 class="section-title">I Nostri Mercati Settimanali</h2>
        
        <!-- Martedì - Giovedì (Per Giorno) -->
        <div class="markets-by-day">
          <!-- Martedì -->
          <div class="day-column">
            <div class="day-header">Martedì</div>
            <div class="day-markets">
              <div 
                class="market-item clickable" 
                @click="openGoogleMaps(martediMarkets[0])"
                :title="`Apri ${martediMarkets[0].luogo} su Google Maps`"
              >
                <div class="location-icon">📍</div>
                <div class="market-info">
                  <h3>{{ martediMarkets[0].luogo }}</h3>
                  <p class="address">📌 {{ martediMarkets[0].indirizzo }}</p>
                  <p class="time">🕐 {{ martediMarkets[0].orario }}</p>
                </div>
                <div class="map-icon">🗺️</div>
              </div>
              
              <div 
                class="market-item clickable" 
                @click="openGoogleMaps(martediMarkets[1])"
                :title="`Apri ${martediMarkets[1].luogo} su Google Maps`"
              >
                <div class="location-icon">📍</div>
                <div class="market-info">
                  <h3>{{ martediMarkets[1].luogo }}</h3>
                  <p class="address">📌 {{ martediMarkets[1].indirizzo }}</p>
                  <p class="time">🕐 {{ martediMarkets[1].orario }}</p>
                </div>
                <div class="map-icon">🗺️</div>
              </div>
            </div>
          </div>

          <!-- Mercoledì -->
          <div class="day-column">
            <div class="day-header">Mercoledì</div>
            <div class="day-markets">
              <div 
                class="market-item clickable" 
                @click="openGoogleMaps(mercolediMarkets[0])"
                :title="`Apri ${mercolediMarkets[0].luogo} su Google Maps`"
              >
                <div class="location-icon">📍</div>
                <div class="market-info">
                  <h3>{{ mercolediMarkets[0].luogo }}</h3>
                  <p class="address">📌 {{ mercolediMarkets[0].indirizzo }}</p>
                  <p class="time">🕐 {{ mercolediMarkets[0].orario }}</p>
                </div>
                <div class="map-icon">🗺️</div>
              </div>
              
              <div 
                class="market-item clickable" 
                @click="openGoogleMaps(mercolediMarkets[1])"
                :title="`Apri ${mercolediMarkets[1].luogo} su Google Maps`"
              >
                <div class="location-icon">📍</div>
                <div class="market-info">
                  <h3>{{ mercolediMarkets[1].luogo }}</h3>
                  <p class="address">📌 {{ mercolediMarkets[1].indirizzo }}</p>
                  <p class="time">🕐 {{ mercolediMarkets[1].orario }}</p>
                </div>
                <div class="map-icon">🗺️</div>
              </div>
            </div>
          </div>

          <!-- Giovedì -->
          <div class="day-column">
            <div class="day-header">Giovedì</div>
            <div class="day-markets">
              <div 
                class="market-item clickable" 
                @click="openGoogleMaps(giovediMarkets[0])"
                :title="`Apri ${giovediMarkets[0].luogo} su Google Maps`"
              >
                <div class="location-icon">📍</div>
                <div class="market-info">
                  <h3>{{ giovediMarkets[0].luogo }}</h3>
                  <p class="address">📌 {{ giovediMarkets[0].indirizzo }}</p>
                  <p class="time">🕐 {{ giovediMarkets[0].orario }}</p>
                </div>
                <div class="map-icon">🗺️</div>
              </div>
              
              <div 
                class="market-item clickable" 
                @click="openGoogleMaps(giovediMarkets[1])"
                :title="`Apri ${giovediMarkets[1].luogo} su Google Maps`"
              >
                <div class="location-icon">📍</div>
                <div class="market-info">
                  <h3>{{ giovediMarkets[1].luogo }}</h3>
                  <p class="address">📌 {{ giovediMarkets[1].indirizzo }}</p>
                  <p class="time">🕐 {{ giovediMarkets[1].orario }}</p>
                </div>
                <div class="map-icon">🗺️</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Venerdì e Sabato (Centrati) -->
        <div class="weekend-markets">
          <div 
            class="weekend-market-card clickable" 
            @click="openGoogleMaps(venerdiMarket)"
            :title="`Apri ${venerdiMarket.luogo} su Google Maps`"
          >
            <div class="market-day-large">Venerdì</div>
            <div class="market-location-large">
              <div class="location-icon">📍</div>
              <h3>{{ venerdiMarket.luogo }}</h3>
            </div>
            <div class="market-address">
              📌 {{ venerdiMarket.indirizzo }}
            </div>
            <div class="market-time">
              <span class="time-icon">🕐</span>
              {{ venerdiMarket.orario }}
            </div>
            <div class="map-button">
              <span class="map-icon-large">🗺️</span>
              Apri su Google Maps
            </div>
          </div>

          <div 
            class="weekend-market-card clickable" 
            @click="openGoogleMaps(sabatoMarket)"
            :title="`Apri ${sabatoMarket.luogo} su Google Maps`"
          >
            <div class="market-day-large">Sabato</div>
            <div class="market-location-large">
              <div class="location-icon">📍</div>
              <h3>{{ sabatoMarket.luogo }}</h3>
            </div>
            <div class="market-address">
              📌 {{ sabatoMarket.indirizzo }}
            </div>
            <div class="market-time">
              <span class="time-icon">🕐</span>
              {{ sabatoMarket.orario }}
            </div>
            <div class="map-button">
              <span class="map-icon-large">🗺️</span>
              Apri su Google Maps
            </div>
          </div>
        </div>
      </section>

      <!-- Info Aggiuntive -->
      <section class="additional-info">
        <div class="info-cards-grid">
          <div class="info-card">
            <div class="card-icon">⏰</div>
            <h3>Orari</h3>
            <p>Martedì - Sabato<br>7:00 - 12:10</p>
          </div>

          <div class="info-card">
            <div class="card-icon">🌱</div>
            <h3>Prodotti Freschi</h3>
            <p>Ogni giorno selezioniamo i migliori prodotti di stagione</p>
          </div>

          <div class="info-card">
            <div class="card-icon">📞</div>
            <h3>Contattaci</h3>
            <p>
              <a href="tel:+393756804525">+39 375 680 4525</a><br>
              <a href="https://wa.me/393756804525" target="_blank">WhatsApp</a>
            </p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <div class="cta-box">
          <h2>Hai domande sui nostri mercati?</h2>
          <p>Contattaci per sapere esattamente dove trovarci o per informazioni sui prodotti disponibili</p>
          <div class="cta-buttons">
            <a href="tel:+393756804525" class="btn btn-primary">
              📞 Chiamaci
            </a>
            <a href="https://wa.me/393756804525" target="_blank" class="btn btn-whatsapp">
              <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Dati mercati con coordinate GPS precise
const martediMarkets = ref([
  {
    id: 1,
    giorno: 'Martedì',
    luogo: 'Asso',
    indirizzo: 'Piazza Discacciati, Asso (CO)',
    orario: '7:00 - 12:10',
    lat: 45.8667,
    lng: 9.2667,
    googleMapsUrl: 'https://www.google.com/maps/place/45%C2%B051\'49.4%22N+9%C2%B016\'14.7%22E/@45.8637085,9.2681828,17z/data=!3m1!4b1!4m4!3m3!8m2!3d45.8637085!4d9.2707577?hl=it&entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: 2,
    giorno: 'Martedì',
    luogo: 'Zelo Buon Persico',
    indirizzo: 'Zona Mercato, Zelo Buon Persico (LO)',
    orario: '7:00 - 12:10',
    lat: 45.4333,
    lng: 9.4667,
    googleMapsUrl: 'https://www.google.com/maps/place/45%C2%B024\'35.5%22N+9%C2%B026\'02.1%22E/@45.4098648,9.4313418,17z/data=!3m1!4b1!4m4!3m3!8m2!3d45.4098611!4d9.4339167?hl=it&entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoASAFQAw%3D%3D'
  }
])

const mercolediMarkets = ref([
  {
    id: 3,
    giorno: 'Mercoledì',
    luogo: 'Scarenna',
    indirizzo: 'Via Alcide De Gasperi, 7, Scarenna (CO)',
    orario: '7:00 - 12:10',
    lat: 45.8833,
    lng: 9.25,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Alcide+De+Gasperi+7+Scarenna+CO'
  },
  {
    id: 4,
    giorno: 'Mercoledì',
    luogo: 'Agrate Brianza',
    indirizzo: 'Zona Mercato, Agrate Brianza (MB)',
    orario: '7:00 - 12:10',
    lat: 45.5833,
    lng: 9.35,
    googleMapsUrl: 'https://www.google.com/maps/place/Via+Santa+Maria,+8%2F6,+20864+Agrate+Brianza+MB/@45.5739852,9.3512133,18.75z/data=!4m5!3m4!1s0x4786b719434c05ff:0x8c379d7360bc02a2!8m2!3d45.5736644!4d9.3526024!17m2!4m1!1e3!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoASAFQAw%3D%3D'
  }
])

const giovediMarkets = ref([
  {
    id: 5,
    giorno: 'Giovedì',
    luogo: "Caslino D'Erba",
    indirizzo: "Piazza del Comune, Caslino D'Erba (CO)",
    orario: '7:00 - 12:10',
    lat: 45.8167,
    lng: 9.2833,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Piazza+del+Comune+Caslino+D%27Erba+CO'
  },
  {
    id: 6,
    giorno: 'Giovedì',
    luogo: 'Bussero',
    indirizzo: 'Zona Mercato, Bussero (MI)',
    orario: '7:00 - 12:10',
    lat: 45.5333,
    lng: 9.3667,
    googleMapsUrl: 'https://www.google.com/maps/place/45%C2%B032\'06.7%22N+9%C2%B022\'12.1%22E/@45.535191,9.3674622,17z/data=!3m1!4b1!4m4!3m3!8m2!3d45.535191!4d9.3700371?hl=it&entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoASAFQAw%3D%3D'
  }
])

const venerdiMarket = ref({
  id: 7,
  giorno: 'Venerdì',
  luogo: 'Eupilio',
  indirizzo: 'Via Emilio Scheibler, Eupilio (CO)',
  orario: '7:00 - 12:10',
  lat: 45.8333,
  lng: 9.2667,
  googleMapsUrl: 'https://www.google.com/maps/place/45%C2%B049\'08.2%22N+9%C2%B015\'45.1%22E/@45.8189446,9.2576541,17z/data=!3m1!4b1!4m13!1m8!3m7!1s0x4786a08de3dbc4b9:0x63ce996bfa5c3e54!2sVia+E.+Scheibler,+26,+22030+Eupilio+CO!3b1!8m2!3d45.818928!4d9.2628117!16s%2Fg%2F11c2962p4w!3m3!8m2!3d45.818941!4d9.262525?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoASAFQAw%3D%3D'
})

const sabatoMarket = ref({
  id: 8,
  giorno: 'Sabato',
  luogo: 'Brembate',
  indirizzo: 'Via Vittorio Veneto, 42, Brembate (BG)',
  orario: '7:00 - 12:10',
  lat: 45.6,
  lng: 9.5833,
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Vittorio+Veneto+42+Brembate+BG'
})

// Funzione per aprire Google Maps
const openGoogleMaps = (market) => {
  // Usa l'URL preimpostato o crea uno dinamico con le coordinate
  const mapsUrl = market.googleMapsUrl || 
    `https://www.google.com/maps/search/?api=1&query=${market.lat},${market.lng}`
  
  // Apri in una nuova finestra
  window.open(mapsUrl, '_blank')
}
</script>

<style scoped lang="scss">
.dove-siamo-page {
  padding: 2rem 0;
  min-height: calc(100vh - 140px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Page Header */
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
    margin-bottom: 0.5rem;
  }

  .click-hint {
    font-size: 1rem;
    color: #4caf50;
    font-weight: 600;
    background: #e8f5e9;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    display: inline-block;
    margin-top: 1rem;
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Market Info */
.market-info {
  margin-bottom: 4rem;

  .info-box {
    background: linear-gradient(135deg, #4caf50 0%, #2c5f2d 100%);
    color: white;
    padding: 3rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(76, 175, 80, 0.2);

    .info-icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
    }

    h2 {
      font-size: 2.2rem;
      margin-bottom: 1rem;
      color: white;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.8;
      max-width: 800px;
      margin: 0 auto;
      opacity: 0.95;
    }
  }
}

/* Markets Section */
.markets-section {
  margin-bottom: 4rem;

  .section-title {
    font-size: 2.2rem;
    color: #2c5f2d;
    text-align: center;
    margin-bottom: 3rem;
    font-weight: 700;
  }

  /* Mercati Per Giorno */
  .markets-by-day {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .day-column {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

    .day-header {
      font-size: 1.6rem;
      color: #2c5f2d;
      font-weight: 700;
      text-align: center;
      padding: 1rem;
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
      border-radius: 12px;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .day-markets {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  /* Market Item - CLICCABILE */
  .market-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 12px;
    background: #f8f8f8;
    transition: all 0.3s ease;
    position: relative;

    &.clickable {
      cursor: pointer;
      
      &:hover {
        background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
        transform: translateX(8px) scale(1.02);
        box-shadow: 0 6px 20px rgba(76, 175, 80, 0.2);

        .map-icon {
          transform: scale(1.2) rotate(5deg);
          opacity: 1;
        }
      }

      &:active {
        transform: translateX(8px) scale(0.98);
      }
    }

    .location-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .market-info {
      flex: 1;

      h3 {
        font-size: 1.4rem;
        color: #2c5f2d;
        margin: 0 0 0.5rem 0;
        font-weight: 700;
      }

      .address {
        color: #4caf50;
        font-size: 0.95rem;
        margin: 0 0 0.5rem 0;
        font-weight: 600;
      }

      .time {
        color: #666;
        font-size: 1rem;
        margin: 0;
        font-weight: 500;
      }
    }

    .map-icon {
      font-size: 1.8rem;
      opacity: 0.6;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }
  }

  /* Mercati Weekend - CLICCABILI */
  .weekend-markets {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .weekend-market-card {
    background: linear-gradient(135deg, #4caf50 0%, #2c5f2d 100%);
    color: white;
    padding: 3rem 4rem;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
    transition: all 0.3s ease;
    min-width: 300px;
    position: relative;
    overflow: hidden;

    &.clickable {
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.1);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover {
        transform: translateY(-12px) scale(1.03);
        box-shadow: 0 15px 45px rgba(76, 175, 80, 0.5);

        &::before {
          opacity: 1;
        }

        .map-button {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }
      }

      &:active {
        transform: translateY(-10px) scale(1.01);
      }
    }

    .market-day-large {
      font-size: 1.8rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 1.5rem;
      color: #fff3cd;
    }

    .market-location-large {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;

      .location-icon {
        font-size: 3rem;
      }

      h3 {
        font-size: 2.2rem;
        color: white;
        margin: 0;
        font-weight: 700;
      }
    }

    .market-address {
      color: #fff3cd;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      font-weight: 600;
      opacity: 0.95;
    }

    .market-time {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: white;
      font-size: 1.2rem;
      opacity: 0.95;
      margin-bottom: 1.5rem;

      .time-icon {
        font-size: 1.5rem;
      }
    }

    .map-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.2);
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-weight: 700;
      font-size: 1rem;
      transition: all 0.3s ease;
      margin-top: 1rem;

      .map-icon-large {
        font-size: 1.5rem;
      }
    }
  }
}

/* Additional Info */
.additional-info {
  margin-bottom: 4rem;

  .info-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .info-card {
    background: #f8f8f8;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      background: white;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transform: translateY(-3px);
    }

    .card-icon {
      font-size: 3rem;
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
      line-height: 1.6;

      a {
        color: #4caf50;
        text-decoration: none;
        font-weight: 600;

        &:hover {
          color: #2c5f2d;
          text-decoration: underline;
        }
      }
    }
  }
}

/* CTA Section */
.cta-section {
  margin-bottom: 2rem;

  .cta-box {
    background: white;
    padding: 3rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 2rem;
      color: #2c5f2d;
      margin-bottom: 1rem;
    }

    p {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 2rem;
      line-height: 1.6;
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
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border: none;
      cursor: pointer;

      &.btn-primary {
        background: #4caf50;
        color: white;

        &:hover {
          background: #45a049;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }
      }

      &.btn-whatsapp {
        background: #25D366;
        color: white;

        .whatsapp-icon {
          width: 20px;
          height: 20px;
        }

        &:hover {
          background: #128C7E;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        }
      }
    }
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.2rem;
  }

  .page-header .click-hint {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }

  .market-info .info-box {
    padding: 2rem 1.5rem;

    .info-icon {
      font-size: 3rem;
    }

    h2 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .markets-by-day {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .weekend-markets {
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .weekend-market-card {
      width: 100%;
      max-width: 400px;
      padding: 2.5rem 2rem;
      min-width: auto;

      .market-day-large {
        font-size: 1.5rem;
      }

      .market-location-large {
        .location-icon {
          font-size: 2.5rem;
        }

        h3 {
          font-size: 1.8rem;
        }
      }

      .market-time {
        font-size: 1.1rem;
      }
    }
  }

  .info-cards-grid {
    grid-template-columns: 1fr;
  }

  .cta-section .cta-box {
    padding: 2rem 1.5rem;

    h2 {
      font-size: 1.6rem;
    }

    .cta-buttons {
      flex-direction: column;

      .btn {
        width: 100%;
      }
    }
  }
}
</style>
