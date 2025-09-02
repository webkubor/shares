<template>
    <div class="layout-paper">
        <ColorBorder class="left-view">
                <WallpaperView id="wallpaper-view" v-if="paperState.wallpaperView" />
                <div  v-else id="phone-view"  class="bg-view"
                :style="{ background: paperState.perspective ? `url(${paperState.wallpaper}) no-repeat center/cover` : `${paperState.bgColor}`, width: `${phoneSize?.width}`, height: `${phoneSize?.height}`}"
                :class="{ perspective: paperState.perspective }">
                <n-space :size="[60, 30]">
                    <PhoneView />
                </n-space>
                <div class="water-mark" :style="{ fontFamily: paperState.waterFontFiamily, color: paperState.waterColor, opacity: paperState.watermarkOpacity}">
                    <img v-if="paperState.waterMarkImage" :src="paperState.waterMarkImage">
                    {{ paperState.waterMarkName }}
                </div>
            </div>
          
            <div class="preview-list" v-if="paperState.previews.length">
                <img :src="item.src" :class="{
                    active: paperState.wallpaper === item.src
                }" v-for="(item,index) in paperState.previews" @click="onChoose(item)">
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
}


</script>
<style lang="scss" scoped>
.layout-paper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
        padding-top: 20px;
    justify-content: center;

    .left-view {
        display: flex;
        justify-content: center;

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
            height: 100px;
            margin-top: 10px;
            img {
            height: 100px;
                width: auto;
                margin-right: 10px;
                border-radius: 8px;
            }
            .active {
                border: 2px solid orangered;
            }
        }
    }

    .right-view {
        flex: 1;
    }
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