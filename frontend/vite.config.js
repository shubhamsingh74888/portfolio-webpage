// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // THIS LINE FIXES "@/api" IMPORTS FOREVER
  resolve: {
    alias: {
      '@': '/src'        // '@/' now points to src folder
    }
  },

  server: {
    port: 5173,
    host: true,
    fs: {
      allow: ['.']
    },
    proxy: {
      '^/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  envPrefix: ['VITE_', 'REACT_APP_'],
});