import { defineConfig, preview } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ include: "**/*.tsx"})],
  base: './',
  server: {
    port: 3000,
    host: true,
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
})
