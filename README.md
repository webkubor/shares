<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2022-01-11 15:14:55
-->
# webkubor项目展示

#### 介绍
赶上vue3 + vite的最佳搭档,正好可以总结一下,当前在前端领域的积累



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


### 关于测试
参考文档: https://vue-test-utils.vuejs.org/

主流的 JavaScript 测试运行器有很多，但 Vue Test Utils 都能够支持。它是与测试运行器无关的
Vue Test Utils 依赖浏览器环境。技术上讲你可以将其运行在一个真实的浏览器，但是我们并不推荐，因为在不同的平台上都启动真实的浏览器是很复杂的。我们推荐取而代之的是用 JSDOM 在 Node 虚拟浏览器环境运行测试。

Jest 测试运行器自动设置了 JSDOM。对于其它测试运行器来说，你可以在你的测试入口处使用 jsdom-global 手动设置 JSDOM。

```
npm install --save-dev jsdom jsdom-global
```

```js
// 在测试的设置 / 入口中
require('jsdom-global')()

```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
