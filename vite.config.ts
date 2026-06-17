import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');

          if (
            normalizedId.includes('/node_modules/three/') ||
            normalizedId.includes('/node_modules/@react-three/')
          ) {
            return 'three';
          }

          if (normalizedId.includes('/node_modules/gsap/')) {
            return 'motion';
          }
        },
      },
    },
  },
});
