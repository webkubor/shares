/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2022-09-05 11:35:57
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/plugins/i18n'
import copy from "@/directivies/copy";
import 'animate.css';
import '@/styles/index.scss'


createApp(App)
.use(copy)
.use(i18n)
.use(router)
.mount('#app')
