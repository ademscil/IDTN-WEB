import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/IDTN-WEB/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: process.env.VITE_OUT_DIR || 'docs',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: false,
  },
});
