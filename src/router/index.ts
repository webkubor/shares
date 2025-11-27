import { createRouter, createWebHistory } from "vue-router";
const RouterMap = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name: "Home",
    meta: {
      title: '首页',
      description: 'webkubor 的个人主页，项目与工具导航，技术与设计作品集'
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/bot/kimi',
    name: "Kimi",
    meta: {
      title: 'Kimi',
      description: 'Kimi Bot 功能与交互演示'
    },
    component: () => import('@/views/bot/kimi.vue')
  },

  {
    path: '/login/3',
    name: 'Login3',
    meta: {
      title: "Login3"
    },
    component: () => import("@/views/login/login3.vue")
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
    path: '/colors',
    name: 'Colors',
    meta: {
      title: "Colors",
      description: '颜色系统与配色工具，预览与复制颜色代码'
    },
    component: () => import("@/views/colors/index.vue")
  },
  {
    path: '/list',
    name: 'List',
    meta: {
      title: "列表滚动测试"
    },
    component: () => import("@/views/list/scroll.vue")
  },
  {
    path: '/money',
    name: 'Money',
    meta: {
      title: "利息计算",
      description: '本息利息计算工具，支持多种利率与周期'
    },
    component: () => import("@/views/money.vue")
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
      title: "创意工具",
      description: '创意工作台与工具集合：壁纸样机生成器、海报等'
    },
    component: () => import('@/views/tools/index.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    meta: {
      title: "项目展示",
      description: 'webkubor 的项目展示与作品集'
    },
    component: () => import('@/views/projects/index.vue')
  },
  {
    path: '/siri',
    name: 'Siri',
    meta: {
      title: "Siri 光带效果",
      description: 'Apple Intelligence Siri 风格的彩虹光带动画效果'
    },
    component: () => import('@/views/siri/index.vue')
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
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
});


const SITE_URL = 'https://webkubor.online'

router.beforeEach(async (to, from, next) => {
  const defaultTitle = 'webkubor | 在线工作台'
  const defaultDesc = 'Webkubor 的个人站，项目展示、创意工具与技术分享'

  document.title = to.meta.title ? to.meta.title + ' | webkubor' : defaultTitle

  const canonicalHref = SITE_URL + to.fullPath
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', canonicalHref)

  let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.setAttribute('name', 'description')
    document.head.appendChild(metaDesc)
  }
  metaDesc.setAttribute('content', (to.meta as any)?.description || defaultDesc)

  let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null
  if (!ogUrl) {
    ogUrl = document.createElement('meta')
    ogUrl.setAttribute('property', 'og:url')
    document.head.appendChild(ogUrl)
  }
  ogUrl.setAttribute('content', canonicalHref)

  next()
})

export default router;
