
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
    path: '/list',
    name: 'List',
    meta: {
      title: "列表滚动测试"
    },
    component:() => import("@/views/show/scroll.vue")
  },
  {
    path: '/google',
    name: 'google',
    meta: {
      title: "google"
    },
    component:() => import("@/views/google.vue")
  },
  {
    path: '/barrage',
    name: 'Barrage',
    meta: {
      title: "弹幕测试"
    },
    component:() => import("@/views/barrage/index.vue")
  },
  {
    path: '/money',
    name: 'Money',
    meta: {
      title: "利息计算"
    },
    component:() => import("@/views/show/money.vue")
  },
  {
    path: '/spider',
    name: 'Spider-background',
    meta: {
      title: "蜘蛛网测试"
    },
    component:() => import("@/views/show/spider.vue")
  },
  {
    path: '/apple',
    name: 'Apple-Page',
    meta: {
      title: "苹果官网流动"
    },
    component:() => import("@/views/show/apple.vue")
  },
  {
    path: '/earth',
    name: 'Earth',
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

