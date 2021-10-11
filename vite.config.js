/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-10-11 15:58:13
 */
import { defineConfig } from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// defineConfig有代码提示
export default defineConfig({
  css:{},
  base: '/webkubor-shares/', // assets
  publicDir: '/webkubor-shares/', //js和静态文件同样的前缀
  // 打包配置
  esbuild:{},
  // 别名
  resolve: {
    alias:{
      '@': resolve(__dirname, "src"),
      'comps': resolve(__dirname, "src/components"),
      'api': resolve(__dirname, "src/api"),
      'layouts': resolve(__dirname, "src/layouts"),
      'views': resolve(__dirname, "src/views"),
      'utils': resolve(__dirname, "src/utils"),
      'styles': resolve(__dirname, "src/styles"),
      'plugins': resolve(__dirname, "src/plugins"),
      'directives': resolve(__dirname, "src/directives")
    }
  },
  plugins: [vue()]
})
