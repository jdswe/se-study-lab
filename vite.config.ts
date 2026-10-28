import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works on GitHub Pages under any repository name.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { target: 'es2020', sourcemap: false },
  test: { environment: 'node', include: ['src/**/*.test.ts'] },
});
