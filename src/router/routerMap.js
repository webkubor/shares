/*
 * @Author: 王恩博 
 * @Date: 2021-04-01 11:32:00 
 * @Last Modified by: 王恩博
 * @Last Modified time: 2021-04-01 11:32:46
 * @懒加载 + 相对路劲的快捷访问配置
 */

const indexMap = [
  {
    path: '/home',
    component: () => import('views/home.vue')
  },
  {
    path: '/user',
    component: () => import('views/user.vue')
  },
  {
    path: '/test',
    component: () => import('views/test.vue')
  },
  {
    path: '/center',
    component: () => import('views/center.vue')
  }
]

const routerMap = [
  ...indexMap,
]



export default routerMap

