
const indexMap = [
  {
    path: '/home',
    component: () => import('@/views/index/home.vue')
  },
  {
    path: '/project/:id',
    name: 'Project',
    component:() => import("@/views/index/project.vue")
  },
  {
    path: '/blog',
    name: 'Blog',
    component:() => import("@/views/show/blog.vue")
  },
  {
    path: '/spider',
    name: 'Spider-background',
    component:() => import("@/views/show/spider.vue")
  },
  {
    path: '/apple',
    name: 'Apple-Page',
    component:() => import("@/views/show/apple.vue")
  },
  {
    path: '/three',
    name: 'three-Page',
    component:() => import("@/views/show/three.vue")
  },
  {
    path: '/loading',
    name: 'Loading',
    component:() => import("@/views/loading/index.vue")
  },
  {
    path: '/fontFamily',
    name: 'fontFamily',
    component:() => import("@/views/show/fontFamily.vue")
  }
]

const routerMap = [
  ...indexMap,
]



export default routerMap

