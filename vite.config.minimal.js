import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configurazione minima - per risolvere problemi EPERM
export default defineConfig({
  plugins: [vue()],
  base: '/'
})
