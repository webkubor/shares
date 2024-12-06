import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/plugins/i18n'
import copy from "@/directives/copy";
import ripple from "@/directives/ripple/index";
import "@/utils/rem"

createApp(App)
.use(copy)
.use(i18n)
.use(ripple)
.use(router)
.mount('#app')
