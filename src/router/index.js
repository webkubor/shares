import { createRouter, createWebHashHistory } from "vue-router";
import RouterMap from "./routerMap";

const routes = [
  {
    path: "/*/",
    meta: {
      auth: "all",
    },
    redirect: "/",
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
  history: createWebHashHistory(import.meta.env.BASE_URL + "webkubor-shares"),
  routes,
});

export default router;
