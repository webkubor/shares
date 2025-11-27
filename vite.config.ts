
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'url'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/styles/variables.scss" as *;`
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
