import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 服务器配置
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 8080, // 指定端口号
    open: true, // 自动打开浏览器
    // 代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 你的实际接口地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
