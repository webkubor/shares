import { reactive } from "vue"
const basePath = "/src/views/wallpaper/assets"

const imagePaths = import.meta.glob('/src/views/wallpaper/assets/*.png', { eager: true });

function getImageUrl(path) {
 return imagePaths[path]?.default;
}

const paperState = reactive({
    bgColor: "#ffffff", //背景
    fontColor: "#000000", //字体颜色
    modelSrc: getImageUrl(basePath+ '/phone-frame.png'), //终端边框
    waterMarkName: '司南烛', //水印名称
    interfaceKey: 1, // 0桌面 1锁屏
    proportion: 2, // 导出比例 1(1:1) 2(3:4) 3(4:3)
    interface: '', //图标界面
    wallpaper: '' //壁纸
})


export function useWallpaper() {
    function setBgColor(color) {
        paperState.bgColor = color
        window.$toast?.success("背景设置成功")
    }

    function setModelSrc(modelSrc: string | null) {
        paperState.modelSrc = modelSrc
        window.$toast?.success("手机模型设置成功")
        console.log("setModelSrc", paperState.modelSrc);
    }


    function onSetFace(item:{name:string,value:number}) {
        if (item.name === "桌面") {
            paperState.interface = getImageUrl(basePath+ '/phone-table.png')
            paperState.interfaceKey = item.value
        } else {
            paperState.interfaceKey =  item.value
            paperState.interface = ''
        }
    }

    // 导出比例 1(1:1) 2(3:4) 3(4:3)
    function transExportSize() {
        if (paperState.proportion === 1) {
            return {
                width: 800,
                height: 800
            }
        } else if (paperState.proportion === 2) {
            return {
                width: 600,
                height: 800
            }
        } else if (paperState.proportion === 3) {
            return {
                width: 800,
                height: 600
            }
        }
        
    }


    return {
        paperState,
        setModelSrc,
        onSetFace,
        transExportSize,
        setBgColor
    }

}