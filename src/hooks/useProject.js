/*
 * @Date: 2021-10-13 14:46:53
 * @LastEditTime: 2021-10-15 11:38:08
 */
import {reactive} from "vue"


const projects = reactive({
    list: [
     {
         title: "工作文档总结",
         pic: "https://gitee.com/web-kubor/oss/raw/master/uPic/OmZXlC.png",
         descrition: "desc",
         tags:['vuepress', "gitee托管部署", "自动生成目录", "persnal"],
         time: "2019"
     },
     {
        title: "test",
        pic: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        descrition: "desc",
        tags: ["persnal"],
        time: "2018-2020"
    },
    {
        title: "test",
        pic: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        descrition: "desc",
        tags: ["persnal"],
        time: "2018-2020"
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