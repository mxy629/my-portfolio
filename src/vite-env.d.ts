/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 联系邮箱。**不要**写进源码或提交到仓库。
   * 本地：写在 `.env.local`（已被 .gitignore 忽略）
   * 线上：由 GitHub Actions 从仓库 Secret 注入
   */
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
