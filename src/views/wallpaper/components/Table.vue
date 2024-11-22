<template>

    <div class="main-container">
        <n-split direction="horizontal" style="height: 600px" :max="0.75" :min="0.25">
            <template #1>
                <n-card title="预览">
                    <div class="frame-border">
                        <img :src="paperState.modelSrc">
                    </div>
                </n-card>
            </template>
            <template #2>
                <n-card title="操作">
                    <n-tabs type="segment" animated size="large">
                        <n-tab-pane name="1" tab="锁屏">
                            锁屏
                        </n-tab-pane>
                        <n-tab-pane name="2" tab="桌面">
                            桌面
                        </n-tab-pane>
                    </n-tabs>
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
import config from "../config.json"
const { modelKeyType, paperState } = useWallpaper()

</script>
<style lang="scss" scoped>
.main-container {
    width: 100%;
    font-size: 16px;
    height: 80vh;

    .frame-border {
        position: relative;

        img {
            height: 400px;
            display: block;
            margin: 0 auto;
        }
    }

}
</style>