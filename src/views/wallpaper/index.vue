<template>
        <n-layout>
            <n-layout-header bordered>
                <div class="title">
                    壁纸样机生成器
                </div>
            </n-layout-header>
            <n-layout-content content-style="padding: 24px;">
               <div class="main-container">
                <Table/>
                </div>
            </n-layout-content>
            <n-layout-footer bordered class="main-footer">
                webkubor 技术团队 2024 版权所有
            </n-layout-footer>
        </n-layout>
</template>
<script setup lang="ts">
import  {useWallpaper} from "./useWallpaper"
import Table from "./components/Table.vue";
import bottomView from "./components/svg/bottomView.svg";
const {paperState} = useWallpaper()

</script>
<style lang="scss" scoped>
.title {
    color: var(--webkubor-text-primary);
    line-height: 80px;
    font-size: 25px;
    padding-left: 20px;
}
.main-footer {
    width: 100%;
    text-align: center;
    font-size: 18px;
    line-height: 60px;
    width: 100%;
}
.main-container {
    width: 100%;
    font-size: 16px;
    height: 80vh;
}
</style>