/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-10-11 16:23:32
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import nativeUI from 'plugins/nativeUI'

// 全局样式
import 'styles/index.scss'

//自定义指令
import copy from "./directivies/copy";

// console.log(import.meta.env.VITE_APP_ASSETS, import.meta.env.VITE_APP_CONTEXT, '.env') // 打印出 VITE_APP_ASSETS
// console.log(import.meta.env.VITE_APP_AGE, 'dev.local') // 打印出 dev.local
// console.log(import.meta.env.VITE_APP_NAME, 'dev') // 打印出 dev

createApp(App)
.use(copy)
.use(router)
.use(nativeUI)
.mount('#app')
