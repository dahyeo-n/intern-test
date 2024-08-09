import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Vite 설정
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // production에서도 Sourcemap 활성화
  },
});
