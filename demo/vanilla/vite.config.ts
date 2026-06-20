import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: process.env.VITE_BASE_URL ?? '/',
  resolve: {
    alias: {
      '@vates/flexi-table-core': resolve(__dirname, '../../packages/core/src'),
      '@vates/flexi-table-vanilla': resolve(__dirname, '../../packages/vanilla/src/index.ts'),
    },
  },
})
