import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/location_dashboard/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});

