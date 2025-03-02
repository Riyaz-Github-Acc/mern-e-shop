import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    ssrInternal: true,
    // Specify the SSR entry point
    ssrEntry: 'src/entry-server.jsx',
  },
})