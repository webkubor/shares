<template>
    <n-card title="界面切换">
        <div class="interface-item" v-for="(item, index) in config.mobile.interfaces" @click="onSetFace(item)">
            <img :src="item" alt="" srcset="">
        </div>
    </n-card>
</template>
<script setup lang="ts">
import { useWallpaper } from "../useWallpaper"
import config from "../config.json"
const { paperState ,onSetFace} = useWallpaper()
</script>
<style lang="scss" scoped>

.interface-item {
    width: 100px;
    img {
        width: 100%;
        border: 1px solid;
    }
}

</style>