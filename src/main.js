import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'plugins/element3'
// import Web3 from 'web3'
// 全局样式
import 'styles/index.scss'

// Vue.prototype.Web3 = Web3
console.log(import.meta.env.VITE_APP_ASSETS, import.meta.env.VITE_APP_CONTEXT, '.env') // 打印出 VITE_APP_ASSETS
console.log(import.meta.env.VITE_APP_AGE, 'dev.local') // 打印出 dev.local
console.log(import.meta.env.VITE_APP_NAME, 'dev') // 打印出 dev

createApp(App)
.use(router)
.use(store)
.use(element)
.mount('#app')
