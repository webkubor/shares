// 在路由配置中懒加载一个组件
import { defineAsyncComponent } from 'vue';



const indexMap = [
  {
    path: '/home',
    component: () => import('@/layouts/entry/home.vue')
  },
  {
    path: '/chat/room',
    name: 'ChatRoom',
    meta: {
      title: "聊天室测试"
    },
    component: () => import("@/views/chatRoom/index.vue")
  },
  {
    path: '/show/login',
    name: 'Login',
    meta: {
      title: "Login"
    },
    component: () => import("@/views/show/login/index.vue")
  },
  {
    path: '/rtc/index',
    name: 'Rtc',
    meta: {
      title: "WebRTC"
    },
    component: () => import("@/views/rtc/index.vue")
  },
  {
    path: '/rtc/webWork',
    name: 'Worker',
    meta: {
      title: "Web Worker"
    },
    component: () => import("@/views/rtc/webWork.vue")
  },
 
  {
    path: '/xbox/betting',
    name: 'betting',
    meta: {
      title: "三色球"
    },
    component: () => import("@/views/xbox/betting.vue")
  },
  {
    path: '/xbox/card',
    name: 'xobxCsgo',
    meta: {
      title: "卡片交互"
    },
    component: () => import("@/views/xbox/cards.vue")
  },
  {
    path: '/xbox/battle',
    name: 'Battle',
    meta: {
      title: "对战竞技"
    },
    component: () => import("@/views/xbox/battle.vue")
  },
  {
    path: '/animation/index',
    name: 'Animation',
    meta: {
      title: "Animation"
    },
    component: () => import("@/views/animation/index.vue")
  },

  {
    path: '/vertify/google',
    name: 'google',
    meta: {
      title: "Google"
    },
    component: () => import("@/views/vertify/google.vue")
  },
  {
    path: '/vertify/cloudflare',
    name: 'Cloudflare',
    meta: {
      title: "Cloudflare"
    },
    component: () => import("@/views/vertify/cloudflare.vue")
  },

  {
    path: '/barrage',
    name: 'Barrage',
    meta: {
      title: "弹幕测试"
    },
    component: () => import("@/views/barrage/index.vue")
  },
  {
    path: '/show/watermark',
    name: 'UI',
    meta: {
      title: "图片水印添加"
    },
    component: () => import("@/views/show/watermark/index.vue")
  },
  {
    path: '/show/buttons',
    name: 'Button',
    meta: {
      title: "Button"
    },
    component: () => import("@/views/show/btns.vue")
  },
  {
    path: '/show/font',
    name: 'Font',
    meta: {
      title: "Font"
    },
    component: () => import("@/views/show/font.vue")
  },
  {
    path: '/show/colors',
    name: 'Colors',
    meta: {
      title: "Colors"
    },
    component: () => import("@/views/show/colors.vue")
  },
  {
    path: '/loading',
    name: 'Loading',
    meta: {
      title: "Loading"
    },
    component: () => import("@/views/loading/index.vue")
  },
  {
    path: '/chart',
    name: 'chartLine',
    meta: {
      title: "chartLine"
    },
    component: () => import("@/views/chart/index.vue")
  },
  {
    path: '/show/tabbar',
    name: 'Tabbar',
    meta: {
      title: "tabbar"
    },
    component: () => import("@/views/show/tabbar.vue")
  },
  {
    path: '/show/list',
    name: 'List',
    meta: {
      title: "列表滚动测试"
    },
    component: () => import("@/views/show/scroll.vue")
  },
  {
    path: '/show/money',
    name: 'Money',
    meta: {
      title: "利息计算"
    },
    component: () => import("@/views/show/money.vue")
  },
  {
    path: '/show/apple',
    name: 'Apple-Page',
    meta: {
      title: "苹果官网流动"
    },
    component: () => import("@/views/show/apple.vue")
  }
 
]

const routerMap = [
  ...indexMap,
]



export default routerMap

