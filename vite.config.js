import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Pinterest',
        short_name: 'Pinterest',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/loo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
});
