import { createRouter, createWebHashHistory } from "vue-router";
import RouterMap from "./routerMap";

const routes = [
  {
    path: '/:pathMatch(.*)*',
    meta: {
      auth: 'all' // 统用权限
    },
    redirect: "/home",
  },
  {
    path: "/",
    component: () => import("@/layouts/index.vue"),
    children: RouterMap, //所有的主要组件内容
    redirect: "/home", //layout布局下的默认首页
  },
];

// 第一步抽离router

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL + "shares"),
  routes,
});


router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title ?? 'webkubor'
  next()
})

export default router;
