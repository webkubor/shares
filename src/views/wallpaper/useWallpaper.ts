import { reactive } from "vue"
import config from "./config.json"
enum modelKeyType {
    "phone" = 1, //手机
    "ipad" = 2, //ipad
    "remix" = 3, //混合
}

const paperState = reactive({
    bg: config.bg[0].src, //背景
    model: modelKeyType.phone, // 1手机 2ipad 3混合
    modelSrc: config.mobile.frame, //终端图片
    interface: config.mobile.interfaces[0], //图标界面
    wallpaper: config.wallpapers[0] //壁纸
})

export function useWallpaper() {
    function setBg(src) {
        paperState.bg = src
        console.log("setBg", src);
        window.$toast?.success("setBg success")
    }

    function setModelSrc(modelSrc: string | null) {
        paperState.modelSrc = modelSrc
        window.$toast?.success("setModelSrc Success")
        console.log("setModelSrc", paperState.modelSrc);
    }


    function onSetFace(face:string) {
        paperState.interface = face
        window.$toast?.success("onSetFace Success")
    }


    return {
        paperState,
        setModelSrc,
        onSetFace,
        modelKeyType,
        setBg
    }

}