import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import copy from "@/directives/copy";
import ripple from "@/directives/ripple/index";
import InputHistory from "@/directives/inputHistory";
import globalComponents from "@/components";
import "@/utils/rem"
import 'core-js/stable';
import "@/styles/index.scss";
import { setupWebMCP } from "@/utils/webmcpTools";

// 启动 WebMCP AI 工具链
setupWebMCP({ enabled: true });

createApp(App)

.use(copy)
.use(ripple)
.use(InputHistory)
.use(router)
.use(globalComponents)
.mount('#app')
