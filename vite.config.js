import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    target: 'es2015'
  },
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/Pastime/' : '/',
  server: {
    port: 1000
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
