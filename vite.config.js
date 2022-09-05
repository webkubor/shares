/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2022-09-05 11:07:29
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import I18n from "@intlify/vite-plugin-vue-i18n";
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "path";
const pathSrc = path.resolve(__dirname, "src");

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
    assetsDir: "assets/img/",
    // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
    brotliSize: false,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
   
  },
 
  plugins: [
    vue(),
    vueJsx(),
    	// i18n 国际化支持
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
    host: "0.0.0.0",
    port: 9999,
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
