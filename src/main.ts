import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/plugins/i18n'
import copy from "@/directives/copy";
import ripple from "@/directives/ripple/index";
import "@/utils/rem"
import {prettyLog} from "@/utils/log";

window.$logger = prettyLog();

window.$logger?.success('当前环境', import.meta.env.MODE)




createApp(App)
.use(copy)
.use(i18n)
.use(ripple)
.use(router)
.mount('#app')
