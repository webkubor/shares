/*
 * @Date: 2021-10-13 14:46:53
 * @LastEditTime: 2021-10-21 11:50:57
 */
import {reactive} from "vue"
const projects = reactive({
    list: [
     {
         title: "工作文档总结",
         pic: "https://gitee.com/web-kubor/oss/raw/master/uPic/OmZXlC.png",
         descrition: "基于vuePress和rollup打包搭建的静态工作博客,采用继承于Vue的风格,目录自动生成,markdown语法记录博客内容",
         tags:['vuepress', "gitee托管部署", "自动生成目录", "persnal"],
         source: "https://gitee.com/web-kubor/vue-blog"
     },
     {
        title: "在线简历项目(支持下载PDF)",
        pic: "https://gitee.com/web-kubor/oss/raw/master/uPic/msqgcK.png",
        descrition: "简约大气风格的在线简历,支持自定义样式修改以及PDF导出功能,响应式布局做了PC和移动端的适配, 内部集成了puppeteer无头浏览器支持长图快照等功能",
        tags: ["persnal", "screenshot", "puppeteer", "webpack"],
        source: "https://gitee.com/web-kubor/resume"
    },
    {
        title: "blibli桌面客户端(Windows/Mac OS)",
        pic: "https://gitee.com/web-kubor/oss/raw/master/uPic/V7dZbd.png",
        descrition: "基于Electron开发, 结合其强大的Native API和引擎, 开发的可在MAC OS和windows上的客户端应用",
        tags: ["persnal","persnal", "Electron", "APP"],
        source: "https://gitee.com/web-kubor/blibli-desktop-app"
    },
    {
        title: "美控家",
        pic: "https://gitee.com/web-kubor/oss/raw/master/uPic/aBIlDP.png",
        descrition: "基于vue2的最简全家桶模板开发的商业性官网",
        tags: ["business", "vue-cli","template"],
        source: "https://gitee.com/web-kubor/mycon-show"
    },
    {
        title: "工业可视化页面总结",
        pic: "https://gitee.com/web-kubor/oss/raw/master/uPic/XlqADr.png",
        descrition: "当前工业可视化在前端的解决方案落地, 不同尺寸超大屏适配等功能,图表可视化",
        tags: ["persnal", "工业可视化的探索", "echarts"],
        source: "https://web-kubor.gitee.io/vue-echarts"
    },
    {
        title: "原生TS开发的音视频组件",
        pic: "https://gitee.com/web-kubor/oss/raw/master/uPic/IIUHZq.png",
        descrition: "基于webpack构建的 ,使用ts开发的视频组件",
        tags: ["persnal", "TS", "video"],
        source: "https://web-kubor.gitee.io/ts-mi-video/"
    },
     {
         title: "3D渲染入门到渐入佳境",
        pic: "https://gitee.com/web-kubor/oss/raw/master/uPic/fBXktq.png",
        tags: ["babylon", "canvas", "HTML5"],
        descrition: "Babylon.JS是一种使用HTML5 canvas元素在Web上对3D环境进行编码的好方法",
        source: "https://web-kubor.gitee.io/babylon-3d"
     },
     {
         title: "美控家小程序",
         pic: "https://gitee.com/web-kubor/oss/raw/master/uPic/15501634788295_.pic.jpg",
         tags: ["mpvue", "fltio", "vue", "vant", "微信小程序"],
         descrition: "基于最初小程序混合框架Mpvue的精简构建版, 已经在线上运营2年多的电商小程序",
         source: "微信小程序搜:美控星选"
     }
    ],
    detail: null

})


export function  useProject() {
    function initDetail() {
        projects.detail = null
        
    }

    return {
        initDetail,
        projects
    }
    
}