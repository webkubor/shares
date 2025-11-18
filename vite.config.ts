
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'url'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";\n@import "@/styles/index.scss";`
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500
  },
  plugins: [
    vue(
      {
        ...templateCompilerOptions
      }
    ),
  ],
  server: {
    cors: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://api.captcha.tianai.cloud/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
