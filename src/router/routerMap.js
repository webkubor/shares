
const indexMap = [
  {
    path: '/home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/project/:id',
    component:() => import("@/views/project.vue")
  },
  {
    path: '/blog',
    component:() => import("@/views/blog.vue")
  },
  {
    path: '/spider',
    component:() => import("@/views/spider.vue")
  },
  {
    path: '/apple',
    component:() => import("@/views/apple.vue")
  },
  {
    path: '/three',
    component:() => import("@/views/three.vue")
  },
  {
    path: '/loading',
    component:() => import("@/views/loading/index.vue")
  },
  {
    path: '/fontFamily',
    component:() => import("@/views/fontFamily.vue")
  }
]

const routerMap = [
  ...indexMap,
]



export default routerMap

