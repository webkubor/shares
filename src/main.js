/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-10-11 16:25:42
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import nativeUI from 'plugins/nativeUI'

// gloabal
import 'styles/index.scss'

import copy from "./directivies/copy";


console.log(import.meta.env.VITE_APP_NAME, 'dev args')

createApp(App)
.use(copy)
.use(router)
.use(nativeUI)
.mount('#app')
