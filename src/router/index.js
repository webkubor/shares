import {createRouter, createWebHashHistory} from 'vue-router'

const routes =[
  {
    path: '/',
    component: () => import('views/home.vue')
  },
  {
    path: '/layout',
    component: () => import('layouts/index.vue')
  },
  {
    path: '/user',
    component: () => import('views/user.vue')
  },
  {
    path: '/test',
    component: () => import('views/test.vue')
  },
  {
    path: '/center',
    component: () => import('views/center.vue')
  }
]

// 第一步抽离router

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export  default router