import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'plugins/element3'

// 全局样式
import 'styles/index.scss'

createApp(App)
.use(router)
.use(store)
.use(element)
.mount('#app')
