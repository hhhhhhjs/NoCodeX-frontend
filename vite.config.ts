import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 9888,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:1218', // 连接后端地址
        changeOrigin: true,
      },
    },
  }
})
