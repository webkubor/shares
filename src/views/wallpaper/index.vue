<template>
    <n-layout>
        <n-layout-header bordered>
            <ColorBorder class="title" v-if="appConfig.isPcModel">
                壁纸样机生成器
            </ColorBorder>
        </n-layout-header>
        <n-layout-content>
            <Table />
        </n-layout-content>
    </n-layout>
</template>
<script setup lang="ts">
import { useWallpaper } from "./useWallpaper"
import Table from "./components/Table.vue";
import { useGlobal } from "@/hooks/useGlobal";
const { paperState } = useWallpaper()
const { appConfig } = useGlobal()

</script>
<style lang="scss" scoped>
.title {
    color: var(--webkubor-text-primary);
    line-height: 80px;
    font-size: 25px;
    text-align: center;
    letter-spacing: 4px;
    font-weight: 800;
    cursor: pointer;

    &:hover {
        color: $default-primary;
        filter: drop-shadow(0 0 10px $default-primary);
    }
}


@media screen and (max-width: 500px) {
    .main-container {
        min-height: 100vh;
        padding: 0;
    }
}
</style>