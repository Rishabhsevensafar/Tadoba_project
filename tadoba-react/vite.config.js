// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist/client',
    rollupOptions: {
      input: 'index.html', // for client build
    },
  },
  ssr: {
    noExternal: ['react-router-dom', 'react-helmet'],
  },
});
