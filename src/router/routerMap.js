
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
    path: '/xbox',
    name: 'xobxCsgo',
    meta: {
      title: "xobxCsgo"
    },
    component:() => import("@/views/xbox/index.vue")
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
    path: '/loading',
    name: 'Loading',
    component:() => import("@/views/loading/index.vue")
  },
  {
    path: '/show/tabbar',
    name: 'Tabbar',
    meta: {
      title: "tabbar"
    },
    component:() => import("@/views/show/tabbar.vue")
  },
  {
    path: '/show/vertify',
    name: 'Vertify',
    meta: {
      title: "时间测试"
    },
    component:() => import("@/views/show/sliderVertify.vue")
  },
  {
    path: '/show/list',
    name: 'List',
    meta: {
      title: "列表滚动测试"
    },
    component:() => import("@/views/show/scroll.vue")
  },
  {
    path: '/show/money',
    name: 'Money',
    meta: {
      title: "利息计算"
    },
    component:() => import("@/views/show/money.vue")
  },
  {
    path: '/show/spider',
    name: 'Spider-background',
    meta: {
      title: "蜘蛛网测试"
    },
    component:() => import("@/views/show/spider.vue")
  },
  {
    path: '/show/apple',
    name: 'Apple-Page',
    meta: {
      title: "苹果官网流动"
    },
    component:() => import("@/views/show/apple.vue")
  },
  {
    path: '/show/earth',
    name: 'Earth',
    component:() => import("@/views/show/three.vue")
  },
  {
    path: '/show/fontFamily',
    name: 'fontFamily',
    component:() => import("@/views/show/fontFamily.vue")
  }
]

const routerMap = [
  ...indexMap,
]



export default routerMap

