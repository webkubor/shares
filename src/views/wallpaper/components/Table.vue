<template>
    <div class="layout-paper">
        <ColorBorder class="left-view">
            <div id="phone-view" class="bg-view"
                :style="{ background: paperState.perspective ? `url(${paperState.wallpaper}) no-repeat center/cover` : `${paperState.bgColor}`, width: `${phoneSize?.width}px`, height: `${phoneSize?.height}px`, }"
                :class="{ help: paperState.help, perspective: paperState.perspective }">
                <n-space :size="[60, 30]">
                    <PhoneView />
                </n-space>
                <div class="waterMark" :style="{ color: paperState.waterColor }">
                    <img v-if="paperState.waterMarkImage" :src="paperState.waterMarkImage" alt="" srcset="">
                    {{ paperState.waterMarkName }}
                </div>
            </div>
        </ColorBorder>
        <RightView  class="right-view"/>
    </div>

</template>
<script setup lang="ts">
import { useWallpaper } from "../useWallpaper"
import RightView from "./RightView.vue";
import PhoneView from './phoneView.vue'
import { computed } from "vue";

const { paperState, transExportSize } = useWallpaper()
const phoneSize = computed(() => {
    return transExportSize(250)
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
    }
    .right-view {
        width: 30%;
    }
}

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
    .waterMark {
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
</style>