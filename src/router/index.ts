import { createRouter, createWebHashHistory } from "vue-router";
const RouterMap = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name:"Home",
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/bot/kimi',
    name:"Kimi",
    component: () => import('@/views/bot/kimi.vue')
  },
  {
    path: '/music',
    name:"MusicEdit",
    component: () => import('@/views/music/index.vue')
  },
  {
    path: '/show/ocr',
    name: 'Ocr',
    meta: {
      title: "Ocr"
    },
    component: () => import("@/views/ocr/index.vue")
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
    path: '/wallpaper',
    name: 'Wallpaper',
    meta: {
      title: "壁纸样机生成器"
    },
    component: () => import("@/views/wallpaper/index.vue")
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
    path: '/book/share',
    name: 'BookShare',
    meta: {
      title: "书面摘录分享"
    },
    component: () => import("@/views/book/index.vue")
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
    path: '/public/apple',
    name: 'Apple-Page',
    meta: {
      title: "苹果官网流动"
    },
    component: () => import("@/views/public/apple.vue")
  },
  {
    path: '/public/poster',
    name: 'Poster-Scroll',
    meta: {
      title: "海报"
    },
    component: () => import("@/views/public/poster/index.vue")
  },
  {
    path: '/public/wall',
    name: 'Poster-Page',
    meta: {
      title: "图片轮播"
    },
    component: () => import("@/views/public/wall/index.vue")
  }
 
]
const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: 'Home',
    component: () => import('@/views/notFound.vue')
  },
  ...RouterMap
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title ?  to.meta.title + ' | webkubor': 'webkubor | 在线工作台'
  next()
})

export default router;
