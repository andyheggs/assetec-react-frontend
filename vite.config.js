import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'https://assetec-15d8b96cc456.herokuapp.com',
    },
  },
});