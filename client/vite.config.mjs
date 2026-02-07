import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  // Use base path only for production (GitHub Pages). Local dev runs at /
  base: mode === 'production' ? '/location_dashboard/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  preview: {
    port: 4173
  }
}));

