import { number } from "echarts"
import { reactive } from "vue"


enum modelKeyType {
    "phone" = 1, //手机
    "pc" = 2, //电脑
    "remix" = 3, //混合
}

const paperState = reactive({
    bg:null,
    model:1,
    modelSrc:"",
})

export function useWallpaper() {



    function setBg(src) {
        paperState.bg = src
    }

    function setModel(model:modelKeyType|null) {
        paperState.model =  Number(model) 
        console.log("setModel",  paperState.model);
    }
    function setModelSrc(modelSrc:string|null) {
        paperState.modelSrc = modelSrc
        console.log("setModelSrc",paperState.modelSrc);
    }



    return {
        paperState,
        setModelSrc,
        modelKeyType,
        setModel,
        setBg
    }
    
}