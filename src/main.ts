import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/plugins/i18n'
import copy from "@/directives/copy";
import ripple from "@/directives/ripple/index";
import InputHistory from "@/directives/inputHistory";
import globalComponents from "@/components";
import "@/utils/rem"
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';


createApp(App)
.use(PrimeVue, {
    theme: {
        preset: Aura
    }})
.use(copy)
.use(i18n)
.use(ripple)
.use(InputHistory)
.use(router)
.use(globalComponents)
.mount('#app')
