<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2023-11-17 17:38:30
-->
# webkubor项目展示

#### 介绍
赶上vue3 + vite的最佳搭档,正好可以总结一下,当前在前端领域的积累

```
console.log(import.meta.env.VITE_APP_NAME, 'dev args')
console.log('%c%s', 'color: #ff0000', import.meta.env.MODE, 'mode');

console.log('%c%s', 'color: #00e600', import.meta.env.BASE_URL, "部署应用时的基本 URL");

console.log('%c%s', 'color: #00a3cc', import.meta.env.PROD, "应用是否运行在生产环境");

console.log('%c%s', 'color: #aa00ff',import.meta.env.DEV,  "应用是否运行在开发环境");
```

#### 项目架构

采用基于vue3的技术栈
路由-vue-router
项目打包,渲染更新-vite
工具函数 - lodash
UI - native UI
数据状态存储采用compotions API支持的hooks写法

加入vue单元测试 

#### 架构细节说明
基于vite的特殊性, vite在开发时期作为服务器在根目录,而不是在public文件夹里(vue2);
Vite 内置了 HMR 到 Vue 单文件组件（SFC） 和 React Fast Refresh 中。
也通过 @prefresh/vite 对 Preact 实现了官方集成



#### 一个不错的动画库

'magictime xxxx'(xxxx动画名)
···javascript
 $('.yourdiv').hover(function () {
    $(this).addClass('magictime puffIn');
});


···
https://www.minimamente.com/project/magic/

#### 集成功能

- vite构建
- pnpm新的包管理工具去除了npm，yarn的包管理
- vue3组合式PAI写法
- 常用loading页面
- threejs 3D 模型展示
- animate动画组件用法
- 国际化-i18n
- 框架组件按需加载
- 不依赖于store的hooks业务写法
- sh自定义本地部署脚本（bash）
- 自定义指令
- 动画集合（Apple，蜘蛛网效果）







