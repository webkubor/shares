import { reactive } from "vue";
const projects = reactive({
  list: [
    {
      pic:"https://github.com/webkubor/picx-images-hosting/raw/master/github/image.1vyo7wn7p9.png",
      title: "Nex-lib",
      descrition: "nex-lib 是一个前端工具库，包含了一些常用的工具函数和类，旨在提高你的开发效率。这个库提供了实用的功能，如时间格式化、URL 处理等。",
      tags: ["npm库", "nex-lib", "前端工具链", "工具函数", "JS", "Node"],
      source: "webkubor.github.io/nex-lib/",
    },
    {
      pic:"https://github.com/webkubor/picx-images-hosting/raw/master/blog/FigmaCover040bef78cc67e2feef02a5fee6a9ea4c.6m3ulu5n58.webp",
      title: "XBox CsGo 皮肤",
      descrition: "高爆率 Csgo 开箱网站(开箱玩法,无限欧皇,开箱神器)",
      tags: ["开箱盲盒", "游戏", "开箱", "盲盒", "Csgo", "Vue3", "vant", "element-plus"],
      source: "https://csgo-api.tpservice.ai/#/p/home",
    },
    {
      title: "midjourney 教程",
      pic: "https://github.com/webkubor/picx-images-hosting/raw/master/blog/image.pf9qhnl1w.webp",
      descrition:
        "AIGC 教程文档,基于 vitepress",
      tags: ["vitepress", "AIGC", "midjourney", "persnal"],
      source: "https://webkubor.github.io/midjourney/",
    },
    {
      title: "工作文档总结",
      pic: "https://webkubor.github.io/picx-images-hosting/github/下载-(10).7ax49qdkri.jpeg",
      descrition:
        "基于vuePress和rollup打包搭建的静态工作博客,采用继承于Vue的风格,目录自动生成,markdown语法记录博客内容",
      tags: ["vuepress", "自动生成目录", "persnal"],
      source: "https://gitee.com/webkubor/vue-blog",
    },
    {
      title: "在线简历项目(支持下载PDF)",
      pic: "https://webkubor.github.io/picx-images-hosting/github/下载-(6).1e8k2px1sm.jpeg",
      descrition:
        "简约大气风格的在线简历,支持自定义样式修改以及PDF导出功能,响应式布局做了PC和移动端的适配, 内部集成了puppeteer无头浏览器支持长图快照等功能",
      tags: ["persnal", "screenshot", "puppeteer", "webpack"],
      source: "https://webkubor.github.io/resume",
    },
    {
      title: "blibli桌面客户端(Windows/Mac OS)",
      pic: "https://webkubor.github.io/picx-images-hosting/github/CDXUijOr7H92kBW.pfaip7h8l.png",
      descrition:
        "基于Electron开发, 结合其强大的Native API和引擎, 开发的可在MAC OS和windows上的客户端应用",
      tags: ["persnal", "persnal", "Electron", "APP"],
      source: "https://gitee.com/webkubor/blibli-desktop-app",
    },
    {
      title: "工业可视化页面总结",
      pic: "https://webkubor.github.io/picx-images-hosting/github/下载-(9).67xeyuhqvx.jpeg",
      descrition:
        "当前工业可视化在前端的解决方案落地, 不同尺寸超大屏适配等功能,图表可视化",
      tags: ["persnal", "工业可视化的探索", "echarts"],
      source: "https://webkubor.gitee.io/vue-echarts",
    },
    {
      title: "原生TS开发的音视频组件",
      pic: "https://webkubor.github.io/picx-images-hosting/github/下载-(5).54xpnyngz6.jpeg",
      descrition: "基于webpack构建的 ,使用ts开发的视频组件",
      tags: ["persnal", "TS", "video"],
      source: "https://github.com/webkubor/ts-mi-video",
    },
    {
      title: "美控家小程序",
      pic: "https://webkubor.github.io/picx-images-hosting/github/下载-(12).4g4g3xzxys.jpeg",
      tags: ["mpvue", "flyio", "vue", "vant", "weapp", "business"],
      descrition:
        "基于最初小程序混合框架Mpvue的精简构建版, 已经在线上运营2年多的电商小程序",
      source: "微信小程序搜:美控星选",
    },
    {
      title: "原:海马体士多(海马体商城)小程序",
      pic: "https://webkubor.github.io/picx-images-hosting/github/下载-(1).13lq9kjdm7.jpeg",
      tags: ["wepy", "fly", "原生开发", "weapp", "business"],
      descrition:
        "基于微信官方框架wepy开发的微信小程序, 已经在线上运营3年多的电商小程序",
      source: "微信小程序搜:海马体商城",
    },
    {
      title: "eomai-工业可视化",
      pic: "https://webkubor.github.io/picx-images-hosting/github/下载-(7).73twearfbs.jpeg",
      tags: ["wepy", "fly", "原生开发", "weapp", "business"],
      descrition:
        "优麦是一款部署在优海云工业互联网平台上的——基于TOC及JIT、TQM等精益管理理论，将优海信息20多年的软件技术封装成适用于中小微型企业应用的工业APP, 是通过不断追求在制品的“快速流动、均衡生产、产能满负荷、质量可追溯性”，达到提高生产效率的目的。",
    },
    {
      title: "Shorter",
      pic: "https://webkubor.github.io/picx-images-hosting/github/下载-(3).5c0xje9meo.jpeg",
      tags: ["区块链", "web3", "以太坊", "metamsk", "wallect"],
      descrition:
        "Shorter Finance is a 100% on-chain infrastructure comprising venues for 2,000+ altcoin single-sided farming and customized derivatives trading.",
      source: "https://shorter.finance/",
    },
    {
      title: "Shorter Docs",
      pic: "https://webkubor.github.io/picx-images-hosting/github/下载-(4).1e8k2pylrl.jpeg",
      tags: ["Shorter", "vite-press", "vite", "blog"],
      descrition: "document for Shorter",
      source: "https://docs.shorter.finance/",
    },
    {
      title: "Defipay",
      pic: "https://webkubor.github.io/picx-images-hosting/github/image.3uushnf3wg.png",
      tags: ["区块链", "Defipay", "ethers", "web3", "usdt"],
      descrition: "处理全球支付问题",
      source: "https://www.defipay.biz/#/",
    },
    {
      title: "Tarspay",
      pic: "https://webkubor.github.io/picx-images-hosting/github/image.9rjf5774jq.png",
      tags: ["美元", "一站式", "支付", "web3"],
      descrition: "国际专业系统服务商",
      source: "https://tarspay.com/#/home",
    },
    {
      title: "Ricohuaso",
      pic: "https://github.com/webkubor/picx-images-hosting/raw/master/blog/image.1lbr5xu3ax.webp",
      tags: ["音视频", "流量变现", "分销", "电商"],
      descrition: "智利-看视频流量变现",
      // source: "https://www.ricohuaso.com/",
    },
  ],
  detail: null,
});

export function useProject() {
  function initDetail() {
    projects.detail = null;
  }

  return {
    initDetail,
    projects,
  };
}
