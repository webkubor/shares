
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'url'
import vueTools from "vite-plugin-vue-devtools"


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
        chunkFileNames: 'chunks/[name]-[hash].js', //设置非入口 chunk 的文件名格式。这里表示将非入口chunk的JS文件输出到chunks目录下，文件名由[name]（chunk的名字）和[hash]（哈希值）组成，这样可以保证每次修改内容后输出的文件名带有不同的哈希值，有利于浏览器缓存更新
        assetFileNames: 'assets/[name]-[hash][extname]', //置非JavaScript和CSS的其他静态资源（如图片、字体等）的输出路径和文件名格式，同样带有[name]和[hash]，以及原始资源的扩展名[extname]。
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const moduleName = id.match(/node_modules\/([^/]+)/)[1];
            // 将所有来自node_modules的模块放入一个名为vendor的chunk中
           return moduleName;
          }
        }
      }
    }
  },
  plugins: [
    vueTools(),
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
