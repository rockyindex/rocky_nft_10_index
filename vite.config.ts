import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  server: {
    proxy: {
      '/projects': {
        target: 'https://api-bff.nftpricefloor.com',
        changeOrigin: true,
      },
       '/projects/azuki/charts/2h': {
        target: 'https://api-bff.nftpricefloor.com',
        changeOrigin: true,
      },
    }
  }
})
