import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    ssr: true,
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'dist-ssr',
      },
    },
  },
  ssr: {
    format: 'cjs',
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
