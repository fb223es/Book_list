import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // Full path till backend mapp
        target: 'http://localhost:8443/Book_list/backend/public',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
