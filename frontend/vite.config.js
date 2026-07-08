import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/familias': 'http://localhost:3000',
      '/voluntarios': 'http://localhost:3000',
      '/proyectos': 'http://localhost:3000',
      '/cuadrillas': 'http://localhost:3000',
      '/cuadrilla-voluntarios': 'http://localhost:3000',
    },
  },
});
