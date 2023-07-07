
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
    path: '/apple',
    component:() => import("@/views/apple.vue")
  },
  {
    path: '/three',
    component:() => import("@/views/three.vue")
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

