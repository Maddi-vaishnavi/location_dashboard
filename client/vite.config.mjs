import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/location_dashboard/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  // Ensure proper handling of GitHub Pages routing
  preview: {
    port: 4173
  }
});

