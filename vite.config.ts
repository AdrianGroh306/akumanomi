import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  // Add the server proxy configuration back for local development CORS workaround
  server: {
    proxy: {
      // Proxy /graphql requests to the target API during development
      '/graphql': {
        target: 'https://onepieceql.up.railway.app', // The actual API server
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Optional: If the target has a self-signed certificate
        // The rewrite is important if the target doesn't expect /graphql prefix
        // In this case, the target IS the /graphql endpoint, so rewrite might not be strictly needed,
        // but it was there before and doesn't hurt.
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql') 
      }
    }
  }
})
