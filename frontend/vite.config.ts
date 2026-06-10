import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:8443/Book_list/backend/public',
        changeOrigin: true,
        secure: false, // 👈 viktigt för self-signed cert
      },
    },
  },
})