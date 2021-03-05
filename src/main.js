import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import 'styles/index.scss'

createApp(App)
.use(router)
.use(store)
.mount('#app')
