import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  /**
   * GitHub Pages 会把站点放在 `https://<用户>.github.io/<仓库名>/` 这样的**子路径**下。
   * 默认的绝对 base `/` 会让浏览器去根域名找 `/assets/...`，结果 404、整页白屏。
   *
   * 构建时改用相对路径 `./`，这样无论部署在根域名还是任意子路径都能正确解析，
   * 也就不用把仓库名写死在这里。开发时仍用 `/`，否则 dev server 的资源路径会错乱。
   */
  base: command === 'build' ? './' : '/',
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
}));
