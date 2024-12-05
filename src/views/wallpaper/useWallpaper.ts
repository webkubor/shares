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
    modelSrc: config.mobile.frame, //终端边框
    interfaceKey: 0, // 0桌面 1锁屏
    interface: '', //图标界面
    wallpaper: config.wallpapers[0].src //壁纸
})

export function useWallpaper() {
    function setBg(src) {
        paperState.bg = src
        window.$toast?.success("背景设置成功")
    }

    function setModelSrc(modelSrc: string | null) {
        paperState.modelSrc = modelSrc
        window.$toast?.success("手机模型设置成功")
        console.log("setModelSrc", paperState.modelSrc);
    }


    function onSetFace(item:string) {
        if (item.name === "桌面") {
            paperState.interface = item.src
            paperState.interfaceKey = 0
            window.$toast?.success("桌面设置成功")
        } else {
            paperState.interfaceKey = 1
            paperState.interface = ''
            window.$toast?.success("锁屏设置成功")
        }
     
    }


    return {
        paperState,
        setModelSrc,
        onSetFace,
        modelKeyType,
        setBg
    }

}