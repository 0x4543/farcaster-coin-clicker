import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          ethers: ['ethers'],
          farcaster: ['@farcaster/miniapp-sdk'],
          privy: ['@privy-io/react-auth'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
