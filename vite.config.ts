import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodeResolve } from '@rollup/plugin-node-resolve'; // Importa el plugin node-resolve
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    nodeResolve(), // Agrega el plugin node-resolve a tus plugins de Vite
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'public/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Define el alias para 'src'
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});






