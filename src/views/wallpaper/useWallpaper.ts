import { reactive } from "vue"
const basePath = "/src/views/wallpaper/assets"

const imagePaths = import.meta.glob('/src/views/wallpaper/assets/*.png', { eager: true });

function getImageUrl(path) {
    return imagePaths[path]?.default;
}

const paperState = reactive({
    bgColor: "#ffffff", //背景
    perspective: false,
    fontColor: "#000000", //字体颜色
    waterColor: '#000000', //水印颜色
    modelSrc: getImageUrl(basePath + '/phone-frame.png'), //终端边框
    waterMarkName: 'Design by 司南烛', //水印名称
    wallpaperView: false, //壁纸预览
    interfaceKey: 1, // 0桌面 1锁屏
    proportion: 1, // 导出比例 1(1:1) 2(3:4) 3(4:3)
    interface: '', //图标界面
    wallpaper: '', //壁纸
    previews: [], //预览图片
    backgroundPositon: {
        x: "center",
        y: "center"
    },
    waterMarkImage: '' //水印图片
})


export function useWallpaper() {

    function setConfigHistory() {
        let params = {
            bgColor: paperState.bgColor,
            waterColor: paperState.waterColor,
            perspective: paperState.perspective,
            interface: paperState.interface,
            wallpaperView: paperState.wallpaperView,
            interfaceKey: paperState.interfaceKey,
            proportion: paperState.proportion,
            waterMarkName: paperState.waterMarkName,
            waterMarkImage: paperState.waterMarkImage,
            previews: paperState.previews,
            backgroundPositon: paperState.backgroundPositon
        }
        window.$toast?.success("配置已保存")
        localStorage.setItem("paperConfig", JSON.stringify(params))
    }

    function getConfigHistory() {
        let params = localStorage.getItem("paperConfig")
        if (params) {
            let config = JSON.parse(params)
            window.$toast?.success("配置读取成功")
            Object.assign(paperState, config) // Simplified assignment
            console.log(config, "config");
        }
    }

    function setBgColor(color) {
        paperState.bgColor = color
        window.$toast?.success("背景设置成功")
    }

    function setModelSrc(modelSrc: string | null) {
        paperState.modelSrc = modelSrc
        window.$toast?.success("手机模型设置成功")
        console.log("setModelSrc", paperState.modelSrc);
    }


    function onSetFace(item: { name: string, value: number }) {
        if (item.name === "桌面") {
            paperState.interface = getImageUrl(basePath + '/phone-table.png')
            paperState.interfaceKey = item.value
        } else {
            paperState.interfaceKey = item.value
            paperState.interface = ''
        }
    }

    // 导出比例 1(1:1) 2(3:4) 3(4:3)
    function transExportSize(base = 180) {
        if (paperState.proportion === 1) {
            return {
                width: base * 3 + "px",
                height: base * 3 + "px"
            }
        } else if (paperState.proportion === 2) {
            return {
                width: base * 3 + "px",
                height: base * 4 + "px"
            }
        } else if (paperState.proportion === 3) {
            return {
                width: base * 4 + "px",
                height: base * 3 + "px"
            }
        }

    }
// 自定义字体选项与前面定义的字体整合
const fontOptions = [
    { label: '宋体', value:'simSun' },
    { label: '黑体', value: 'SimHei' },
    { label: '楷体', value: 'KaiTi' },
    { label: '华文行楷', value: 'STXingkai' },
    { label: '幼圆', value: 'YouYuan' },
    { label: '隶书', value: 'LiSu' },
    { label: '仿宋', value: 'FangSong' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Helvetica', value: 'Helvetica' },
    { label: 'AiChinese01', value: 'AiChinese01' },
    { label: 'AiChinese02', value: 'AiChinese02' },
    { label: 'Chinese3', value: 'Chinese3' }
  ];

    return {
        paperState,
        setModelSrc,
        onSetFace,
        fontOptions,
        transExportSize,
        setBgColor,
        getConfigHistory,
        setConfigHistory
    }

}