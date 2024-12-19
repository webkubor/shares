
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import {PrimeVueResolver} from '@primevue/auto-import-resolver';
import { fileURLToPath, URL } from 'url'

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
        additionalData: `@import "@/styles/index.scss";`
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500
  },
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver(), PrimeVueResolver()],
      directoryAsNamespace: true
    })
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
