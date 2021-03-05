import { defineConfig } from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'
import {viteMockServe}from 'vite-plugin-mock'

// https://vitejs.dev/config/
// defineConfig有代码提示
export default defineConfig({
  css:{

  },
  // 打包配置
  esbuild:{

  },
  // 别名
  resolve: {
    alias:{
      '@': resolve(__dirname, "src"),
      'comps': resolve(__dirname, "src/components"),
      'api': resolve(__dirname, "src/api"),
      'views': resolve(__dirname, "src/views"),
      'utils': resolve(__dirname, "src/utils"),
      'styles': resolve(__dirname, "src/styles"),
      'plugins': resolve(__dirname, "src/plugins") 
    }
  },
  plugins: [vue(), viteMockServe({supportTs: false })]
})
