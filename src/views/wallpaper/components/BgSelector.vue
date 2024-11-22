<template>
    <n-card title="背景" style="margin-bottom: 16px">
        <n-space>
            <div class="bg-item" v-for="(item, index) in config.bg" @click="setBg(item.src)">
                <span>{{ item.name }}</span>
                <img :src="item.src" alt="">
            </div>
        </n-space>
    </n-card>
</template>
<script setup lang="ts">
import { useWallpaper } from "../useWallpaper"
import config from "../config.json"
const { modelKeyType, setBg } = useWallpaper()

</script>
<style lang="scss" scoped>


.bg-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $default-primary;

    img {
        width: 100px;
    }

    span {
        font-weight: 600;
        font-size: 16px;
    }
    &:hover {
    border: 1px solid  $default-primary;
    filter: drop-shadow(0 0 20px $default-primary);
    }
}



</style>