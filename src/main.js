/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-10-13 15:12:11
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import nativeUI from 'plugins/nativeUI'
import "plugins/dayjs"

// gloabal
import 'styles/index.scss'

import copy from "./directivies/copy";


console.log('%c%s', 'color: #ff0000', import.meta.env.MODE, 'mode');

console.log('%c%s', 'color: #00e600', import.meta.env.BASE_URL, "部署应用时的基本 URL");

console.log('%c%s', 'color: #00a3cc', import.meta.env.PROD, "应用是否运行在生产环境");

console.log('%c%s', 'color: #aa00ff',import.meta.env.DEV,  "应用是否运行在开发环境");
console.log(import.meta.env.VITE_APP_NAME, 'dev args')

createApp(App)
.use(copy)
.use(router)
.use(nativeUI)
.mount('#app')
