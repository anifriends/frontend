import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/utils/test/setupTests.ts',
  },
}));
