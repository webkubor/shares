
const indexMap = [
  {
    path: '/home',
    component: () => import('views/home.vue')
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

const routerMap = [
  ...indexMap,
]



export default routerMap

