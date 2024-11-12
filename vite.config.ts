
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'url'
import vueTools from "vite-plugin-vue-devtools"
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // base: "/shares/",
  // publicDir: "/shares/",
  base: "./",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import './src/styles/index.scss';`,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500
  },
  plugins: [
    vueTools(),
    vue(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        // 如果想在`vite dev`命令下调试PWA, 必须启用它
        enabled: true,
        // Vite在dev模式下会使用浏览器原生的ESModule，将type设置为`"module"`与原先的保持一致
        type: "module"
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}'], //缓存相关静态资源
      },
      manifest: {
        "name": 'webkubor Share',
        "description": "webkubor Share",
        "theme_color": "#242424",
        "start_url": "/",
        "background_color": "#242424",
        icons: [
          {
            "src": "/logo.svg",
            "sizes": "192x192",
            "type": "image/svg+xml",
            purpose: 'any maskable'
          },
          {
            "src": "/logo.svg",
            "sizes": "512x512",
            "type": "image/svg+xml",
            purpose: 'any maskable'
          }
        ]
      }
    }
    ),
    Components({
      resolvers: [NaiveUiResolver()],
      // 关键配置
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
