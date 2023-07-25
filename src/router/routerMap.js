
const indexMap = [
  {
    path: '/home',
    component: () => import('@/views/base/home.vue')
  },
  {
    path: '/project/:id',
    name: 'Project',
    component:() => import("@/views/project.vue")
  },
  {
    path: '/blog',
    name: 'Blog',
    component:() => import("@/views/blog.vue")
  },
  {
    path: '/spider',
    name: 'Spider-background',
    component:() => import("@/views/spider.vue")
  },
  {
    path: '/apple',
    name: 'Apple-Page',
    component:() => import("@/views/apple.vue")
  },
  {
    path: '/three',
    name: 'three-Page',
    component:() => import("@/views/three.vue")
  },
  {
    path: '/loading',
    name: 'Loading',
    component:() => import("@/views/loading/index.vue")
  },
  {
    path: '/fontFamily',
    name: 'fontFamily',
    component:() => import("@/views/fontFamily.vue")
  }
]

const routerMap = [
  ...indexMap,
]



export default routerMap

