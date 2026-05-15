import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*.png'],
      workbox: {
        navigateFallback: null,
        navigateFallbackDenylist: [/brochure/]
      },
      manifest: {
        name: 'Ortofrutticola Ravanelli & Carminati',
        short_name: 'Ortofrutta',
        description: 'Prodotti freschi di qualità dal campo alla tua tavola',
        theme_color: '#2d6a2d',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
          { src: 'icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
          { src: 'icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
          { src: 'icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
          { src: 'icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
          { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
          { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
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
