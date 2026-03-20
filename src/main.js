/**
 * Entry point dell'applicazione Vue 3
 * Configurazione di Vue, Pinia, Vue Router e stili globali
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
