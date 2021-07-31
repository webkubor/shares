/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-07-31 18:37:46
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import element from 'plugins/element3'
// 全局样式
import 'styles/index.scss'

// console.log(import.meta.env.VITE_APP_ASSETS, import.meta.env.VITE_APP_CONTEXT, '.env') // 打印出 VITE_APP_ASSETS
// console.log(import.meta.env.VITE_APP_AGE, 'dev.local') // 打印出 dev.local
// console.log(import.meta.env.VITE_APP_NAME, 'dev') // 打印出 dev

createApp(App)
.use(router)
.mount('#app')
