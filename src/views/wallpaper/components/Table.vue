<template>
    <div class="layout-paper">
        <ColorBorder class="left-view">
            <div id="phone-view" class="bg-view"
                :style="{ background: paperState.perspective ? `url(${paperState.wallpaper}) no-repeat center/cover` : `${paperState.bgColor}`, width: `${phoneSize?.width}`, height: `${phoneSize?.height}`, }"
                :class="{ help: paperState.help, perspective: paperState.perspective }">
                <!-- <div class="overlay"></div> -->
                <n-space :size="[60, 30]">
                    <PhoneView />
                </n-space>
                <div class="water-mark" :style="{ color: paperState.waterColor }">
                    <img v-if="paperState.waterMarkImage" :src="paperState.waterMarkImage" alt="" srcset="">
                    {{ paperState.waterMarkName }}
                </div>
            </div>
        </ColorBorder>
        <RightView class="right-view" v-if="appConfig.isPcModel" />
    </div>

</template>
<script setup lang="ts">
import { useGlobal } from "@/hooks/useGlobal";
import { useWallpaper } from "../useWallpaper"
import RightView from "./RightView.vue";
import PhoneView from './phoneView.vue'
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



</script>
<style lang="scss" scoped>
.layout-paper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;

    .left-view {
        flex: 1;
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

        .help {
            border: 1px dotted #333333;
        }
    }

    .right-view {
        width: 30%;
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