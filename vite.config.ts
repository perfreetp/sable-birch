import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 5173,
    host: '127.0.0.1',
    watch: {
      // 测试产物（截图/下载）不参与 HMR 监听，Windows 下锁定文件会导致 watcher 崩溃
      ignored: ['**/test/**', '**/dist/**']
    }
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1500
  }
});
