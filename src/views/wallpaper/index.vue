<template>
    <n-layout has-sider>
        <n-layout-sider bordered content-style="padding: 24px;" :width="350">
            <n-card title="模型" style="margin-bottom: 16px">
                <n-tabs type="line" animated size="large">
                    <n-tab-pane name="移动端" tab="移动端">
                        Wonderwall
                    </n-tab-pane>
                    <n-tab-pane name="PC" tab="PC">
                        Hey Jude
                    </n-tab-pane>
                </n-tabs>
            </n-card>
            <n-card title="背景" style="margin-bottom: 16px">
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
                                <img
                                    src="https://github.com/webkubor/picx-images-hosting/raw/master/scenery/18159759251_A_laptop_with_photo_editing_software_on_the_screen__a1d46b9a-55c4-4f83-b66f-0e6f4b44bcd6.1vyojlordy.webp">
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
                                <n-button type="primary">下载样图</n-button>
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
import config from "./config.json"
console.log(config.bg);

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

.main-foter {
    width: 100%;
    text-align: center;
    font-size: 18px;
    line-height: 80px;
    width: 100%;
}
</style>