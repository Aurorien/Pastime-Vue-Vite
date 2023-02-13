import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    target: 'es2015'
  },
  plugins: [vue()],
  server: {
    port: 242
  },

  // ref: https://stackoverflow.com/a/70849876
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/assets/main.scss" as *;`
      }
    }
  }
})
