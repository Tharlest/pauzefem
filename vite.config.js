import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base '/' = raiz do domínio (correto para Vercel e qualquer host na raiz).
  base: '/',
  server: {
    host: true,
    port: 5173,
    open: true,
  },
})
