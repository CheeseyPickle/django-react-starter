import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {      
      '/api': {
        target: 'http://localhost:8000',  // TODO: change to correct local host
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
