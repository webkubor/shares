<template>
        <n-layout>
            <n-layout-header bordered>
                <div class="title"  v-if="appConfig.isPcModel">
                    壁纸样机生成器
                </div>
            </n-layout-header>
            <n-layout-content>
               <div class="main-container">
                <Table/>
                </div>
            </n-layout-content>
        </n-layout>
</template>
<script setup lang="ts">
import  {useWallpaper} from "./useWallpaper"
import Table from "./components/Table.vue";
import { useGlobal } from "@/hooks/useGlobal";
const {paperState} = useWallpaper()
const { appConfig } = useGlobal()

</script>
<style lang="scss" scoped>
.title {
    color: var(--webkubor-text-primary);
    line-height: 80px;
    font-size: 25px;
    text-align: center;
    letter-spacing: 4px;
    cursor: pointer;
}

.main-container {
    width: 100%;
    font-size: 16px;
    padding-bottom: 10vh;
    padding-top: 5vh;
}

@media screen and (max-width: 500px) {
    .main-container  {
        min-height: 100vh;
        padding: 0;
    }
}
</style>