import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@vates/flexi-table-core': resolve(__dirname, '../../packages/core/src'),
      '@vates/flexi-table-vue': resolve(__dirname, '../../packages/vue/src/index.ts'),
    },
  },
})
