/*
 * @Date: 2021-10-13 14:46:53
 * @LastEditTime: 2021-10-13 14:56:45
 */
import {reactive} from "vue"


const projects = reactive({
    list: [
     {
         title: "test",
         pic: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
         descrition: "desc",
         time: "2018-2020"
     },
     {
        title: "test",
        pic: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        descrition: "desc",
        time: "2018-2020"
    },
    {
        title: "test",
        pic: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        descrition: "desc",
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