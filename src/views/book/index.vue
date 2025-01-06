<template>
    <div class="book-view"
        :style="{ fontFamily: config.fontFiamily, background: config.bgColor, color: config.fontColor }">
        <div class="main">
            {{ bookState.content }}
        </div>
        <div class="more" v-if="bookState.more">
            {{ bookState.more }}
        </div>
    </div>

    <div class="actions-view">
        <n-form-item label="文案内容" label-placement="left">
            <n-input v-model:value="bookState.content" placeholder="请输入文案内容" type="textarea" autosize show-count
                clearable />
        </n-form-item>
        <n-form-item label="引用来源" label-placement="left">
            <n-input type="text" v-model:value="bookState.more" placeholder="引用来源(可不填)" show-count clearable />
        </n-form-item>

        <n-card title="操作">
            <n-form-item label="底部背景" label-placement="left">
                <n-color-picker v-model:value="config.bgColor" style="width: 150px;" :show-alpha="true"
                    :actions="['clear']" :swatches="['#fddde6', '#f2b5d4', '#faf3e0', '#a3d9a5', '#f5f5dc']" />
            </n-form-item>
            <n-form-item label="字体选择" label-placement="left">
                <n-select v-model:value="config.fontFiamily" placeholder="请选择字体" :options="fontOptions"
                    style="width: 200px;" />
            </n-form-item>
            <n-form-item label="字体颜色" label-placement="left">
                <n-color-picker v-model:value="config.fontColor" style="width: 150px;" :show-alpha="true"
                    :actions="['clear']" :swatches="['#2c2c2c', '#333333', '#4a4a4a', '#101820', '#f5f5dc']" />
            </n-form-item>
        </n-card>


    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useWallpaper } from "@/hooks/useWallpaper"
const { fontOptions } = useWallpaper()

let bookState = reactive({
    content: '愿中国青年都摆脱冷气，只是向上走，不必听自暴自弃者流的话。能做事的做事，能发声的发声。有一分热，发一分光，就令萤火一般，也可以在黑暗里发一点光，不必等候炬火。',
    more: '鲁迅'
})


let config = reactive({
    bgColor: '#fffff0',
    fontColor: "#333333",
    fontFiamily: 'Chinese3',
})


</script>
<style lang="scss" scoped>
.book-view {
    height: 80vh;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 20px;

    .main {
        width: 60vw;
        text-align: left;
    }

    .more {
        width: 400px;
        text-align: right;
    }
}

.actions-view {
    margin: 20px;
}
</style>