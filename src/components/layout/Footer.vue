<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>🍎 Ortofrutticola Golosello S.N.C. di Ravanelli Alex & Carminati Giovanni</h4>
          <p>Partita IVA: 04324410168</p>
          
        </div>

        <div class="footer-section">
          <h4>Link Rapidi</h4>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/categorie">Categorie</RouterLink></li>
            <li><RouterLink to="/listino">Listino</RouterLink></li>
            <li><RouterLink to="/chi-siamo">Chi Siamo</RouterLink></li>
            <li><RouterLink to="/dove-siamo">Dove Siamo</RouterLink></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Contatti</h4>
          <ul class="contact-info">
            <li>📞 <a href="tel:+393756804525">+39 375 680 4525</a></li>
            <li class="whatsapp-link">
              <a href="https://wa.me/393756804525" target="_blank">
                <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp: +39 375 680 4525
              </a>
            </li>
            <li>✉️ <a href="mailto:spesafrutta@gmail.com">spesafrutta@gmail.com</a></li>
            
          </ul>
        </div>

        <div class="footer-section">
          <h4>Orari di Apertura</h4>
          <ul class="opening-hours">
            <li>Martedì - Sabato</li>
            <li>7:00 - 12:10</li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Metodo di Pagamento</h4>
          <ul class="payment-methods">
            <li><span class="payment-emoji" aria-hidden="true">💵</span> Contanti</li>
            <li><span class="payment-emoji" aria-hidden="true">💳</span> Bancomat</li>
          </ul>
        </div>
      </div>

      
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped lang="scss">
.footer {
  background: #1a1a1a;
  color: #fff;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}

.footer-section {
  min-width: 0;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: #4caf50;
  }

  h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #4caf50;
  }

  p {
    color: #ccc;
    margin-bottom: 0.5rem;
    line-height: 1.5;
    font-size: 0.9rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      color: #ccc;

      a {
        color: #ccc;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #4caf50;
        }
      }
    }
  }

  .contact-info li,
  .opening-hours li,
  .payment-methods li {
    line-height: 1.6;
    margin-bottom: 0.35rem;
  }

  .contact-info a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #4caf50;
    }
  }

  .whatsapp-link a {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: #25D366;

      .whatsapp-icon {
        color: #25D366;
      }
    }
  }

  .whatsapp-icon {
    width: 20px;
    height: 20px;
    color: #25D366;
    transition: color 0.3s ease;
  }

  .payment-methods {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      color: #ccc;
      font-size: 0.9rem;
    }
  }

  .payment-emoji {
    font-size: 1.1rem;
    line-height: 1;
  }
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    font-size: 1.5rem;
    text-decoration: none;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
}

.footer-bottom {
  border-top: 1px solid #333;
  padding-top: 1.5rem;
  text-align: center;

  p {
    color: #999;
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }

  .credits {
    font-size: 0.85rem;
  }
}

@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (max-width: 576px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
