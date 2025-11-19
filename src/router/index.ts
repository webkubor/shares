import { createRouter, createWebHashHistory } from "vue-router";
const RouterMap = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name: "Home",
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/bot/kimi',
    name: "Kimi",
    component: () => import('@/views/bot/kimi.vue')
  },

  {
    path: '/show/login/3',
    name: 'Login3',
    meta: {
      title: "Login3"
    },
    component: () => import("@/views/show/login/login3.vue")
  },
  {
    path: '/show/login/5',
    name: 'Login5',
    meta: {
      title: "Login5"
    },
    component: () => import("@/views/show/login/login5.vue")
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
    component: () => import("@/views/colors/index.vue")
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
    path: '/iframe',
    name: 'Iframe',
    meta: {
      title: "Iframe"
    },
    component: () => import('@/views/iframe/index.vue')
  },
  {
    path: '/tools',
    name: 'Tools',
    meta: {
      title: "创意工具"
    },
    component: () => import('@/views/tools/index.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    meta: {
      title: "项目展示"
    },
    component: () => import('@/views/projects/index.vue')
  },
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
  scrollBehavior() {
    return { top: 0 }
  }
});


router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title ? to.meta.title + ' | webkubor' : 'webkubor | 在线工作台'
  next()
})

export default router;
