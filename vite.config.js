
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import I18n from "@intlify/vite-plugin-vue-i18n";
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import path from "path";
const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  css: {},
  base: "/webkubor-shares/", // assets
  publicDir: "/webkubor-shares/", //js和静态文件同样的前缀
  // 预构建这一步由 esbuild 执行，这使得 Vite 的冷启动时间比任何基于 JavaScript 的打包器都要快得多。
  resolve: {
    alias: {
      "@/": `${pathSrc}/`,
    },
  },
  // 自定义构建配置
  build: {
    brotliSize: false,
  },
  //tree-shaking
  optimizeDeps:{
    include:[        "vue",
    "phosphor-vue",
    "naive-ui",
    "vue-i18n",
    "vue-i18n",
    "vue-router"]
  },
  plugins: [
    vue(),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
		I18n({
			runtimeOnly: true,
			compositionOnly: true,
			include: [path.resolve(__dirname, '../locales/**')]
		})
  ],
  // 本地运行配置，及反向代理配置
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      "/api": {
        target: "https://api.66mz8.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
