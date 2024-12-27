<template>
    <div class="wallpaper-box" :style="{ width: `${phoneSize?.width}`, height: `${phoneSize?.height}` }">
        <img v-if="paperState.wallpaper" :src="paperState.wallpaper" alt="wallpaper" />
        <span v-else>请上传图片</span>
        <div class="water-mark" :style="{ color: paperState.waterColor, fontFamily: paperState.waterFontFiamily }">
            <img v-if="paperState.waterMarkImage" :src="paperState.waterMarkImage" alt="" srcset="">
            {{ paperState.waterMarkName }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { useWallpaper } from "../useWallpaper"
import { useGlobal } from "@/hooks/useGlobal";
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
.wallpaper-box {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333333;
    position: relative;

    img {
        width: 100%;
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
    }

    .water-mark {
        position: absolute;
        bottom: 60px;
        left: 50%;
        font-weight: 800;
        font-size: clamp(16px, 1.5vw, 20px); // 动态字体大小
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); // 添加阴影
        z-index: 50;

        img {
            height: 30px;
            margin: 10px;
        }
    }
}


@media screen and (max-width: 400px) {
    .wallpaper-box {
        .water-mark {
            font-size: 12px;
            bottom: 20px;
        }
    }
}
</style>