<template>
    <n-layout has-sider>
        <n-layout-sider bordered content-style="padding: 24px;" :width="350">
            <ModeSilder/>
            <n-card title="背景" style="margin-bottom: 16px" v-if="paperState.model === modelKeyType.phone">
                <n-space>
                    <div class="bg-item" v-for="(item, index) in config.bg">
                        <span>{{ item.name }}</span>
                        <img :src="item.src" alt="">
                    </div>
                </n-space>
            </n-card>
        </n-layout-sider>
        <n-layout>
            <n-layout-header bordered>
                <div class="title">
                    壁纸样机生成器
                </div>
            </n-layout-header>
            <n-layout-content content-style="padding: 24px;">
                <div class="main-container">
                    <n-split direction="horizontal" style="height: 600px" :max="0.75" :min="0.25">
                        <template #1>
                            <n-card title="预览">
                                <div class="frame-border">
                                    <img
                                    :src="paperState.modelSrc">
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

            </n-layout-content>
            <n-layout-footer bordered class="main-foter">
                webkubor 技术团队 2024 版权所有
            </n-layout-footer>
        </n-layout>
    </n-layout>
</template>
<script setup lang="ts">
import ModeSilder from "./components/ModeSilder.vue";
import  {useWallpaper} from "./useWallpaper"
import config from "./config.json"
const {modelKeyType,paperState} = useWallpaper()
console.log(config.bg, "config.bg");
console.log(config.mobile, "config.mobile");

</script>
<style lang="scss" scoped>
.title {
    color: var(--webkubor-text-primary);
    line-height: 80px;
    font-size: 25px;
    padding-left: 20px;
}

.main-container {
    width: 100%;
    font-size: 16px;
    height: 80vh;


}



.bg-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #fffff0;
    background: #fffff0;
    color: #333333;

    img {
        width: 100px;
    }

    span {
        font-weight: 600;
        font-size: 16px;
    }
}

.frame-border {
    position: relative;
    img {
        height: 400px;
        display: block;
        margin: 0 auto;
    }
}



.main-foter {
    width: 100%;
    text-align: center;
    font-size: 18px;
    line-height: 80px;
    width: 100%;
}
</style>