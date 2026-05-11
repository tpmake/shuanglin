import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // 重要：添加这一行，替换为你的仓库名
  base: '/shuanglin/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true, // 允许外部访问
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
