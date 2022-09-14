/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2022-09-14 13:33:46
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/plugins/i18n'
import copy from "@/directives/copy";
import PhosphorVue from "phosphor-vue";
import ripple from "@/directives/ripple/index";

import 'animate.css';
import '@/styles/index.scss'


createApp(App)
.use(copy)
.use(i18n)
.use(ripple)
.use(PhosphorVue)
.use(router)
.mount('#app')
