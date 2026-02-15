import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3002,
    open: true,
    // Disabilita cache durante lo sviluppo
    hmr: {
      overlay: true
    },
    // Headers per disabilitare completamente la cache
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
    // Forza il refresh dei moduli
    fs: {
      strict: false
    }
  },
  // Disabilita cache dei moduli pre-bundlati durante lo sviluppo
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
    exclude: [],
    // Forza il re-bundling dei moduli
    force: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia']
        }
      }
    }
  },
  // Base path - cambia se usi GitHub Pages con nome repo
  base: '/',
  // Disabilita cache completamente durante lo sviluppo
  clearScreen: true
})
