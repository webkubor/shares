import { reactive } from "vue"
const basePath = "/src/views/wallpaper/assets"

const imagePaths = import.meta.glob('/src/views/wallpaper/assets/*.png', { eager: true });

function getImageUrl(path) {
    return imagePaths[path]?.default;
}

// 定义预览图片类型
interface PreviewImage {
    name: string;
    src: string;
}

// 定义paperState的类型
interface PaperState {
    bgColor: string; //背景
    perspective: boolean;
    fontColor: string; //字体颜色
    waterColor: string; //水印颜色
    titleColor: string; //标题颜色
    watermarkOpacity: number; //水印透明度
    modelSrc: string; //终端边框
    waterMarkName: string; //水印名称
    wallpaperView: boolean; //壁纸预览
    interfaceKey: number; // 0桌面 1锁屏
    proportion: number; // 导出比例 1(1:1) 2(3:4) 3(4:3)
    interface: string; //图标界面
    wallpaper: string; //壁纸
    waterFontFiamily: string; //字体
    previews: PreviewImage[]; //预览图片
    backgroundPositon: {
        x: string;
        y: string;
    };
    waterMarkImage: string; //水印图片
    titleVertical: string; //标题方向，horizontal为横排，vertical为竖排
    enableCrop: boolean; //是否裁剪
    customTitle: string;
    titleFontSize: number;
}

const paperState = reactive<PaperState>({
    bgColor: "#ffffff", //背景
    perspective: false,
    fontColor: "#000000", //字体颜色
    waterColor: '#000000', //水印颜色
    titleColor: '#3366cc', //标题颜色，默认与水印颜色不同
    watermarkOpacity: 0.8, //水印透明度，默认值0.8
    modelSrc: getImageUrl(basePath + '/phone-frame.png'), //终端边框
    waterMarkName: 'Design by 司南烛', //水印名称
    wallpaperView: true, //壁纸预览
    interfaceKey: 1, // 0桌面 1锁屏
    proportion: 1, // 导出比例 1(1:1) 2(3:4) 3(4:3)
    interface: '', //图标界面
    wallpaper: '', //壁纸
    waterFontFiamily: 'Chinese3', //字体
    previews: [], //预览图片
    backgroundPositon: {
        x: "center",
        y: "center"
    },
    waterMarkImage: '', //水印图片
    titleVertical: 'horizontal', //标题方向，horizontal为横排，vertical为竖排
    enableCrop: false, //是否裁剪
    customTitle: '',
    titleFontSize: 24,
})


export function useWallpaper() {

    function setConfigHistory() {
        let params = {
            bgColor: paperState.bgColor,
            perspective: paperState.perspective,
            interface: paperState.interface,
            wallpaperView: paperState.wallpaperView,
            interfaceKey: paperState.interfaceKey,
            proportion: paperState.proportion,
            waterMarkName: paperState.waterMarkName,
            waterFontFiamily:paperState.waterFontFiamily,
            waterColor: paperState.waterColor,
            titleColor: paperState.titleColor,
            watermarkOpacity: paperState.watermarkOpacity,
            waterMarkImage: paperState.waterMarkImage,
            previews: paperState.previews,
            backgroundPositon: paperState.backgroundPositon
        }
        window.$message?.success("配置已保存")
        localStorage.setItem("paperConfig", JSON.stringify(params))
    }

    function getConfigHistory() {
        let params = localStorage.getItem("paperConfig")
        if (params) {
            let config = JSON.parse(params)
            window.$message?.success("配置读取成功")
            Object.assign(paperState, config) // Simplified assignment
            console.log(config, "config");
        }
    }

    function setBgColor(color) {
        paperState.bgColor = color
        window.$message?.success("背景设置成功")
    }

    function setModelSrc(modelSrc: string | null) {
        paperState.modelSrc = modelSrc || ''; // 确保不为null
        window.$message?.success("手机模型设置成功")
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
    { label: '宋体', value: '"Songti SC", "SimSun", "STSong", "serif"' },
    { label: '楷体', value: '"Kaiti SC", "KaiTi", "STKaiti", "serif"' },
    { label: '华文行楷', value: '"STXingkai", "华文行楷", "HanWangXingKai", "cursive"' },
    { label: '仿宋', value: '"FangSong SC", "FangSong", "STFangsong", "serif"' },
    { label: 'Arial', value: 'Arial' },
    { label: 'monospace', value: 'monospace' },
    { label: '方圆体', value: 'AlimamaFangYuanTiVF-Thin' },
    { label: '那么热爱细雨体', value: 'drizzle' },
    { label: '那么热爱卡哇伊', value: 'cute' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Helvetica', value: 'Helvetica' },
    { label: 'vampire-wars', value: 'vampire-wars' },
    { label: 'AI书面-粗', value: 'AiChinese02' },
    { label: '艺术手写体', value: 'Chinese3' }
  ];


  const ChineseFont = [
    { label: '宋体', value: '"Songti SC", "SimSun", "STSong", "serif"' },
    { label: '楷体', value: '"Kaiti SC", "KaiTi", "STKaiti", "serif"' },
    { label: '华文行楷', value: '"STXingkai", "华文行楷", "HanWangXingKai", "cursive"' },
    { label: '方圆体', value: 'AlimamaFangYuanTiVF-Thin' },
    { label: '那么热爱细雨体', value: 'drizzle' },
    { label: '那么热爱卡哇伊', value: 'cute' },
    { label: 'AI书面-粗', value: 'AiChinese02' },
    { label: '艺术手写体', value: 'Chinese3' }
  ]

  const backgroundPositonXOptions = [
    {
        label: '图左',
        value: 'left'
    },
    {
        label: '图中',
        value: 'center'
    },
    {
        label: '图右',
        value: 'right'
    }
]

const backgroundPositonYOptions = [
    {
        label: '上',
        value: 'top'
    },
    {
        label: '中',
        value: 'center'
    },
    {
        label: '下',
        value: 'bottom'
    }
]

    return {
        paperState,
        setModelSrc,
        onSetFace,
        backgroundPositonYOptions,
        backgroundPositonXOptions,
        fontOptions,
        ChineseFont,
        transExportSize,
        setBgColor,
        getConfigHistory,
        setConfigHistory
    }

}