import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Add the allowed hosts configuration
    host: true,
    strictPort: true
  },
  // Add this section to allow your render.com domain
  preview: {
    port: 3000,
    host: true,
    strictPort: true
  },
  // Add the allowed hosts configuration
  allowedHosts: ['vimji-project.onrender.com', 'localhost']
})
