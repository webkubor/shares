<template>
    <div class="layout-paper">
        <ColorBorder class="left-view">
                <WallpaperView id="wallpaper-view" v-if="paperState.wallpaperView" />
                <div  v-else id="phone-view"  class="bg-view"
                :style="{ background: paperState.perspective ? `url(${paperState.wallpaper}) no-repeat center/cover` : `${paperState.bgColor}`, width: `${phoneSize?.width}`, height: `${phoneSize?.height}`}"
                :class="{ perspective: paperState.perspective }">
                <div class="space-vertical">
                    <PhoneView />
                </div>
                <div class="water-mark" :style="{ fontFamily: paperState.waterFontFiamily, color: paperState.waterColor, opacity: paperState.watermarkOpacity}">
                    <img v-if="paperState.waterMarkImage" :src="paperState.waterMarkImage">
                    {{ paperState.waterMarkName }}
                </div>
            </div>
          
            <div class="preview-list" v-if="paperState.previews.length">
                <div class="preview-item" v-for="(item,index) in paperState.previews" @click="onChoose(item)">
                    <img :src="item.src" :class="{
                        active: paperState.wallpaper === item.src
                    }">
                    <div class="preview-name">{{ item.name }}</div>
                </div>
            </div>
        </ColorBorder>
        <RightView class="right-view" v-if="appConfig.isPcModel" />
    </div>

</template>
<script setup lang="ts">
import { useGlobal } from "@/hooks/useGlobal";
import { useWallpaper } from "@/hooks/useWallpaper"
import RightView from "./RightView.vue";
import PhoneView from './phoneView.vue'
import WallpaperView from "./wallpaperView.vue";
import { computed } from "vue";
const { appConfig } = useGlobal()
const { paperState, transExportSize } = useWallpaper()
const phoneSize = computed(() => {
    if (appConfig.isPcModel) {
        return transExportSize(250)
    } else {
        return {
            width: '100%',
            height: '80vh'
        }
    }
})


function onChoose(wallpaper) {
    paperState.wallpaper = wallpaper.src
    // 显示当前选中图片的文件名
    window.$message?.success(`已选择图片: ${wallpaper.name}`)
    // 设置标题内容默认为选择图片的名字
    paperState.customTitle = wallpaper.name.split('.')[0] // 去掉文件后缀名
}


</script>
<style lang="scss" scoped>
.layout-paper {
    position: relative;
    width: 100%;
    min-height: 100%;
    display: flex;
    padding-top: 20px;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    flex-wrap: nowrap;

    .left-view {
        display: flex;
        justify-content: center;
        flex: 1 1 auto;
        min-width: 0;

        .perspective {
            &::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.05);
                backdrop-filter: blur(10px);
                z-index: 1;
            }
        }

        .bg-view {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            border-radius: 20px;
            background: var(--bg-elevated);
            border: 1px solid var(--border-color);
            box-shadow: 0 8px 24px var(--shadow-light);

            .water-mark {
                position: absolute;
                bottom: 40px;
                left: 50%;
                font-weight: 500;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                z-index: 50;

                img {
                    height: 30px;
                    margin: 10px;
                }
            }
        }

        .preview-list {
            display: flex;
            margin-top: 10px;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 6px;
            gap: 12px;
            border-top: 1px solid var(--border-color);
            padding-top: 10px;

            .preview-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-right: 10px;
                cursor: pointer;
                
                img {
                    height: 100px;
                    border-radius: 8px;
                    transition: all 0.3s;
                    box-shadow: 0 4px 12px var(--shadow-color);

                    &.active {
                        outline: 2px solid var(--color-primary);
                        box-shadow: 0 6px 16px var(--shadow-hover);
                    }
                }
                
                .preview-name {
                    font-size: 12px;
                    margin-top: 6px;
                    width: 110px;
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: var(--text-secondary);
                }
            }
        }
    }

.right-view {
    flex: 0 0 380px;
    width: 380px;
}

.space-vertical { display: flex; flex-direction: column; gap: 30px; }
}




@media screen and (max-width: 400px) {
    .layout-paper {
        flex-direction: column;
        .left-view {
            width: 100%;
            .bg-view {
                .water-mark {
                    font-size: 12px;
                    bottom: 20px;
                }
            }
        }
        .right-view {
            display: none;
        }
    }

 

}


.overlay {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  z-index: 1;
  pointer-events: none; /* 确保不阻挡鼠标事件 */
}
</style>