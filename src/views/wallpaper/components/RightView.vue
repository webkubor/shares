<template>
    <n-card title="界面切换">
        <n-space>
            <n-button :color="getRandomColor()" ghost v-for="(item, index) in config.mobile.interfaces" @click="onSetFace(item)">
                {{ item.name }}
            </n-button>
        </n-space>

    </n-card>
</template>
<script setup lang="ts">
import { useWallpaper } from "../useWallpaper"
import config from "../config.json"
import { getRandomColor } from "@/utils/random";

const { paperState, onSetFace } = useWallpaper()

</script>
<style lang="scss" scoped></style>