import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/plugins/i18n'
import copy from "@/directives/copy";
import ripple from "@/directives/ripple/index";
import globalComponents from "@/components";

createApp(App)
.use(copy)
.use(i18n)
.use(ripple)
.use(router)
.use(globalComponents)
.mount('#app')
