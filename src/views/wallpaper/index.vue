<template>
    <n-layout has-sider>
        <n-layout-sider bordered content-style="padding: 24px;" :width="350">
            <ModeSilder/>
            <BgSelector v-if="paperState.model === modelKeyType.phone"/>
        </n-layout-sider>
        <n-layout>
            <n-layout-header bordered>
                <div class="title">
                    壁纸样机生成器
                </div>
            </n-layout-header>
            <n-layout-content content-style="padding: 24px;">
                <Table/>
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
import BgSelector from "./components/BgSelector.vue";
import Table from "./components/Table.vue";
const {modelKeyType,paperState} = useWallpaper()

</script>
<style lang="scss" scoped>
.title {
    color: var(--webkubor-text-primary);
    line-height: 80px;
    font-size: 25px;
    padding-left: 20px;
}
.main-foter {
    width: 100%;
    text-align: center;
    font-size: 18px;
    line-height: 80px;
    width: 100%;
}
</style>