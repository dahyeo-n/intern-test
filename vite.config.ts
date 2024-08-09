import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// Vite 설정
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // production에서도 Sourcemap 활성화
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        preserveModules: true,
        entryFileNames: '[name].js',
        dir: 'dist',
      },
    },
  },
});
