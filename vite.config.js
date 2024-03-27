
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'url'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: "/webkubor-shares/",
  publicDir: "/webkubor-shares/", 
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
    brotliSize: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const moduleName = id.match(/node_modules\/([^/]+)/)[1];
            return moduleName;
          }
        }
      }
    }
  },
  plugins: [
    VueDevTools(),
    vue(),
    Components({
      resolvers: [NaiveUiResolver()]
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
