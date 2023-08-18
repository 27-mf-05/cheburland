import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import * as path from 'path'
import { defineConfig } from 'vite'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 9000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      app: path.resolve(__dirname, '.src/app'),
      components: path.resolve(__dirname, '.src/components'),
      assets: path.resolve(__dirname, '.src/assets'),
      hooks: path.resolve(__dirname, '.src/hooks'),
      layout: path.resolve(__dirname, '.src/layout'),
      pages: path.resolve(__dirname, '.src/pages'),
      shared: path.resolve(__dirname, '.src/shared'),
      core: path.resolve(__dirname, '.src/core'),
    },
  },
})
