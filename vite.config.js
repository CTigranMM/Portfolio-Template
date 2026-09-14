import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: [
        /[\\/]public[\\/]assets[\\/]/,
        /[\\/]src[\\/]assets[\\/]/,
        /\.(gif|mp4|tex|pdf|png|jpg|jpeg)$/i,
        /[\\/]node_modules[\\/]/
      ]
    }
  }
})
