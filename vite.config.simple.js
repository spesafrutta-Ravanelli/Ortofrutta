import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configurazione semplificata senza esbuild issues
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3002
  },
  build: {
    outDir: 'dist',
    minify: false, // Disabilita minificazione per evitare problemi esbuild
    target: 'esnext'
  },
  base: '/'
})
