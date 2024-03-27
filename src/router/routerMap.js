
const indexMap = [
  {
    path: '/home',
    component: () => import('@/layouts/entry/home.vue')
  },
  {
    path: '/xbox/open',
    name: 'openBox',
    meta: {
      title: "xbox开箱"
    },
    component:() => import("@/views/xbox/openBox.vue")
  },
  {
    path: '/xbox/lucky',
    name: 'lucky',
    meta: {
      title: "幸运饰品"
    },
    component:() => import("@/views/xbox/lucky.vue")
  },
  {
    path: '/xbox/betting',
    name: 'openBox',
    meta: {
      title: "三色球"
    },
    component:() => import("@/views/xbox/betting.vue")
  },
  {
    path: '/xbox/card',
    name: 'xobxCsgo',
    meta: {
      title: "卡片交互"
    },
    component:() => import("@/views/xbox/cards.vue")
  },
  {
    path: '/xbox/battle',
    name: 'Battle',
    meta: {
      title: "对战竞技"
    },
    component:() => import("@/views/xbox/battle.vue")
  },
  {
    path: '/xbox/wings',
    name: 'Wing',
    meta: {
      title: "火焰之翼"
    },
    component:() => import("@/views/xbox/wings.vue")
  },
  {
    path: '/webgl/index',
    name: 'webGl',
    meta: {
      title: "webGL 初始化"
    },
    component:() => import("@/views/webGl/index.vue")
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
    meta: {
      title: "Loading"
    },
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
      title: "图片验证"
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
  },
  {
    path: '/transform',
    name: '视频转化',
    component:() => import("@/views/transform/index.vue")
  }
]

const routerMap = [
  ...indexMap,
]



export default routerMap

