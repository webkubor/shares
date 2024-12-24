## 个人博客

域名配置:http://webkubor.online/#/home


netify托管:https://share-webkubor.netlify.app/#/home

### Title

- 数据状态存储采用compotions API支持的hooks写法
- 集成了国际化方案
- 集成了多个图标库
- pnpm新的包管理工具去除了npm，yarn的包管理
- vue3组合式PAI写法
- 国际化-i18n
- 框架组件按需加载
- 不依赖于store的hooks业务写法
- sh自定义本地部署脚本（bash）


  
### Intro


- 人机验证(google无感知登录, Cloudflare无感知登录)
- 小说封面,图片水印添加
- 视频弹幕弹幕功能（弹幕，字幕，弹幕云）
- 动画集合（Apple，蜘蛛网效果）
- 房贷利率计算等额本息，等额本金，
- 图表
- Loading 集合
- 下注玩法
- workder 集合
-  WebRTC API 实现视频通话



## vite5

```js
// 以前的使用方法
 const routesModules = import.meta.globEager('../views/**/router/*.js');
// 现在的使用方法
 const routesModules = import.meta.glob('../views/**/router/*.js', {eager: true});
```
### import.meta.glob是为了解决什么问题

import.meta.glob是一个标准的 ES 模块语法，在现代浏览器和支持 ES 模块的构建工具中都可以使用。这使得代码更加具有可移植性和兼容性
- 动态导入模块,import.meta.glob允许在运行时根据需要加载模块


