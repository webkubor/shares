<template>

    <div class="main-container">
        <n-split direction="horizontal" :max="0.85" :min="0.25">
            <template #1>
                <n-card title="预览">
                    <!-- 背景素材 -->
                    <div class="bg-view" :style="{ background: `url(${paperState.bg}) no-repeat center/cover` }">
                        <div class="frame-border" :style="{ background: `url(${paperState.modelSrc}) no-repeat center/cover` }">
                            <img v-if="paperState.interface" :src="paperState.interface" alt="" srcset="">
                        </div>
                    </div>
                </n-card>
            </template>
            <template #2>

                <RightView />
                <n-card title="操作栏">
                    <n-space>
                        <n-button type="primary">下载样图</n-button>
                        <n-button type="primary">添加水印</n-button>
                        <n-button type="primary">添加标题</n-button>
                    </n-space>
                </n-card>

            </template>
        </n-split>
    </div>
</template>
<script setup lang="ts">
import { useWallpaper } from "../useWallpaper"
import RightView from "./RightView.vue";
const { paperState } = useWallpaper()

</script>
<style lang="scss" scoped>
.main-container {
    width: 100%;
    font-size: 16px;
    height: 80vh;

    .bg-view {
        position: relative;
        border: 2px solid $default-primary;
        height: 700px;
        display: flex;
        justify-content: center;
        align-items: center;
        .frame-border {
            height: 400px;
            width: 200px;
            display: block;
            img {
                width: 90%;
            }
        }
    }

}
</style>