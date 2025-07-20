<template>
    <ColorBorder>
        <div class="control">
            <n-form-item label="字体选择" label-placement="left">
            <n-select v-model:value="waterFontFiamily" style="width: 150px;" placeholder="请选择字体"
                :options="fontOptions" />
        </n-form-item>

        <n-form-item label="水印颜色" label-placement="left">
            <n-color-picker v-model:value="waterColor" style="width: 150px;" :show-alpha="true" :actions="['clear']"
                :swatches="['#FFFFFF', '#333333']" />
        </n-form-item>
    </div>

        <div class="border" id="wallpaper-view">
            <div class="left-title" :style="{ fontFamily: waterFontFiamily, color: waterColor }">
                杀尽春秋
            </div>
            <div class="author-title" :style="{ fontFamily: waterFontFiamily }">
               酒歌狂 著
            </div>
            <img class="bottom-logo" src="./imgs/logo.png" alt="" srcset="">
        </div>
     
        <button class="webkubor-back-btn common-btn" @click="downloadBgImage">导出</button>
    </ColorBorder>
</template>
<script setup lang="ts">
import dayjs from "@/utils/dayjs";
import domtoimage from 'dom-to-image-more';
import { ref } from 'vue';

const fontOptions = [
    { label: '楷体', value: '"Kaiti SC", "KaiTi", "STKaiti", "serif"' },
    { label: 'vampire-wars', value: 'vampire-wars' },
    { label: 'AI书面-粗', value: 'AiChinese02' },
    { label: '艺术手写体', value: 'Chinese3' }
];


const exportLoading = ref(false)
const exportName = ref('')
const waterFontFiamily = ref('')
const waterColor = ref('')
const downloadBgImage = async () => {
    let target = document.getElementById('wallpaper-view') as HTMLDivElement as HTMLDivElement
    console.log(target.offsetWidth, target.offsetHeight);
    exportLoading.value = true
    const formattedDate = exportName.value || dayjs().format('YYYY-MM-DD HH:mm'); // 2021-09-01 12:00
    domtoimage.toPng(target, { useCORS: true, scale: 3 }).then(function (dataUrl) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `wallpaper-${formattedDate}.png`;
        link.click();
    }).finally(() => {
        exportLoading.value = false
    });
};

</script>
<style lang="scss" scoped>
 .control {
    display: inline-block;
        width: 200px;
    }
.border {
    width: 600px;
    height: 800px;
    overflow: hidden;
    background: url(./imgs/bg1.png) no-repeat center center;
    background-size: 600px 840px;
    position: relative;

    .bottom-logo {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 140px;
    }

    .left-title {
        position: absolute;
        left: 20px;
        top: 30px;
        font-size: 92px;
        writing-mode: vertical-lr;
        letter-spacing: 3px;
    }
    .author-title {
        position: absolute;
        right: 150px;
        bottom: 150px;
        font-size: 45px;
        writing-mode: vertical-lr;
        letter-spacing: 3px;
        color: #fff;
    }
   
}
</style>