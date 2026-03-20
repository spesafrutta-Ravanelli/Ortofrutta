<template>
  <div class="cookie-policy-page">
    <div class="container">

      <div class="page-header">
        <h1>🍪 Cookie Policy</h1>
        <p class="last-update">Ultimo aggiornamento: {{ lastUpdate }}</p>
      </div>

      <div class="policy-content">

        <section class="policy-section">
          <h2>1. Cosa sono i cookie?</h2>
          <p>
            I cookie sono piccoli file di testo che vengono salvati sul tuo dispositivo (computer, smartphone, tablet)
            quando visiti un sito web. Servono a far funzionare correttamente il sito, a ricordare le tue preferenze
            e a fornirci informazioni su come viene utilizzato il sito.
          </p>
        </section>

        <section class="policy-section">
          <h2>2. Quali cookie utilizziamo?</h2>

          <div class="cookie-table-wrapper">
            <table class="cookie-table">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Finalità</th>
                  <th>Durata</th>
                  <th>Consenso</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="badge badge-necessary">🔧 Tecnici</span></td>
                  <td>Necessari al funzionamento del sito (sessione, sicurezza, preferenze cookie)</td>
                  <td>Sessione / 1 anno</td>
                  <td><span class="badge badge-always">Sempre attivi</span></td>
                </tr>
                <tr>
                  <td><span class="badge badge-analytics">📊 Analitici</span></td>
                  <td>Statistiche anonime sull'utilizzo del sito (es. Google Analytics)</td>
                  <td>Fino a 2 anni</td>
                  <td><span class="badge badge-optional">Opzionale</span></td>
                </tr>
                <tr>
                  <td><span class="badge badge-marketing">📣 Marketing</span></td>
                  <td>Pubblicità personalizzata e remarketing (es. Meta Pixel, Google Ads)</td>
                  <td>Fino a 1 anno</td>
                  <td><span class="badge badge-optional">Opzionale</span></td>
                </tr>
                <tr>
                  <td><span class="badge badge-social">🌐 Social Media</span></td>
                  <td>Integrazione con social network (Facebook, Instagram, WhatsApp)</td>
                  <td>Fino a 1 anno</td>
                  <td><span class="badge badge-optional">Opzionale</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="policy-section">
          <h2>3. Cookie tecnici necessari</h2>
          <p>
            Questi cookie sono indispensabili per il corretto funzionamento del sito e non richiedono il tuo consenso.
            Tra questi rientra il cookie <strong>rc_cookie_consent</strong>, che salva le tue preferenze relative
            ai cookie per evitare di mostrarti il banner ad ogni visita. Ha una durata di 365 giorni.
          </p>
        </section>

        <section class="policy-section">
          <h2>4. Cookie analitici</h2>
          <p>
            Se accetti i cookie analitici, utilizziamo strumenti come Google Analytics per raccogliere dati
            aggregati e anonimi sull'utilizzo del sito: pagine visitate, tempo di permanenza, provenienza geografica.
            Questi dati ci aiutano a migliorare i contenuti e l'esperienza di navigazione.
            Non vengono raccolti dati personali identificabili.
          </p>
        </section>

        <section class="policy-section">
          <h2>5. Cookie di marketing e social media</h2>
          <p>
            I cookie di marketing (es. Meta Pixel, Google Ads) e social media (Facebook, Instagram) vengono
            attivati solo con il tuo consenso esplicito. Questi cookie possono tracciare le tue attività anche
            su altri siti web per mostrarti contenuti pubblicitari pertinenti ai tuoi interessi.
          </p>
        </section>

        <section class="policy-section">
          <h2>6. Come gestire le preferenze</h2>
          <p>
            Puoi modificare le tue preferenze cookie in qualsiasi momento cliccando sul pulsante qui sotto
            oppure attraverso le impostazioni del tuo browser.
          </p>
          <button class="btn-manage-cookies" @click="openCookieSettings">
            🍪 Gestisci le preferenze cookie
          </button>
          <p class="mt-1">
            Puoi anche disabilitare i cookie direttamente dal tuo browser. Tieni presente che disabilitare
            alcuni cookie potrebbe influire sul corretto funzionamento del sito. Per istruzioni su come
            gestire i cookie nel tuo browser consulta la guida ufficiale:
          </p>
          <ul class="browser-list">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noopener">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Microsoft Edge</a></li>
          </ul>
        </section>

        <section class="policy-section">
          <h2>7. Titolare del trattamento</h2>
          <p>
            Il titolare del trattamento dei dati personali è:<br>
            <strong>Ortofrutticola Ravanelli &amp; Carminati</strong><br>
            Per informazioni o richieste: <a href="https://wa.me/393756804525" target="_blank">+39 375 680 4525</a>
          </p>
        </section>

        <section class="policy-section">
          <h2>8. Modifiche alla Cookie Policy</h2>
          <p>
            Ci riserviamo il diritto di aggiornare questa Cookie Policy in qualsiasi momento.
            Le modifiche verranno pubblicate su questa pagina con aggiornamento della data in cima.
            Ti invitiamo a consultare periodicamente questa pagina.
          </p>
        </section>

      </div>

      <div class="back-section">
        <RouterLink to="/" class="btn-back">← Torna alla Home</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const lastUpdate = '19/03/2026'

const openCookieSettings = () => {
  if (window.RC_Cookies) {
    window.RC_Cookies.openSettings()
  }
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped lang="scss">
.cookie-policy-page {
  padding: 2rem 0 4rem;
  min-height: calc(100vh - 140px);
  background: #f8f9fa;
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
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #2c5f2d 0%, #4caf50 100%);
  border-radius: 20px;
  color: white;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: .5rem;
    font-family: 'Georgia', serif;
  }

  .last-update {
    opacity: .85;
    font-size: .95rem;
  }
}

/* Sezioni */
.policy-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,.08);
  padding: 2.5rem;
  margin-bottom: 2rem;
}

.policy-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  h2 {
    font-size: 1.4rem;
    color: #2c5f2d;
    font-weight: 700;
    margin-bottom: 1rem;
    font-family: 'Georgia', serif;
  }

  p {
    color: #555;
    line-height: 1.8;
    margin-bottom: 1rem;

    &:last-child { margin-bottom: 0; }

    a {
      color: #4caf50;
      text-decoration: underline;
      &:hover { color: #2c5f2d; }
    }

    strong { color: #333; }
  }
}

/* Tabella cookie */
.cookie-table-wrapper {
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}

.cookie-table {
  width: 100%;
  border-collapse: collapse;
  font-size: .9rem;

  thead {
    background: linear-gradient(135deg, #2c5f2d, #4caf50);
    color: white;

    th {
      padding: .85rem 1rem;
      text-align: left;
      font-weight: 600;
    }
  }

  tbody tr {
    border-bottom: 1px solid #f0f0f0;
    transition: background .2s;

    &:hover { background: #f9fdf9; }
    &:last-child { border-bottom: none; }

    td {
      padding: .85rem 1rem;
      color: #555;
      vertical-align: middle;
    }
  }
}

/* Badge */
.badge {
  display: inline-block;
  padding: .3rem .75rem;
  border-radius: 20px;
  font-size: .8rem;
  font-weight: 600;
  white-space: nowrap;
}

.badge-necessary { background: #e8f5e9; color: #2c5f2d; }
.badge-analytics  { background: #e3f2fd; color: #1565c0; }
.badge-marketing  { background: #fff3e0; color: #e65100; }
.badge-social     { background: #f3e5f5; color: #6a1b9a; }
.badge-always     { background: #e8f5e9; color: #2c5f2d; }
.badge-optional   { background: #fff8e1; color: #f57f17; }

/* Bottone gestisci */
.btn-manage-cookies {
  display: inline-block;
  margin: 1rem 0;
  padding: .75rem 2rem;
  background: linear-gradient(135deg, #4caf50, #2c5f2d);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76,175,80,.35);
  }
}

.mt-1 { margin-top: 1rem !important; }

/* Lista browser */
.browser-list {
  margin: .75rem 0 0 1.5rem;
  color: #555;
  line-height: 2;

  a {
    color: #4caf50;
    text-decoration: underline;
    &:hover { color: #2c5f2d; }
  }
}

/* Back */
.back-section { text-align: center; }

.btn-back {
  display: inline-block;
  padding: .75rem 2rem;
  background: white;
  color: #2c5f2d;
  border: 2px solid #2c5f2d;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all .3s ease;

  &:hover {
    background: #2c5f2d;
    color: white;
    transform: translateY(-2px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 { font-size: 2rem; }
  .policy-content { padding: 1.5rem; }
  .cookie-table { font-size: .8rem; }
}

@media (max-width: 480px) {
  .page-header { padding: 2rem 1rem; }
  .page-header h1 { font-size: 1.6rem; }
}
</style>
