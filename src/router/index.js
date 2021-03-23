import {createRouter, createWebHashHistory} from 'vue-router'

const routes =[
  {
    path: '/',
    component: () => import('views/home.vue')
  }
]

// 第一步抽离router

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export  default router