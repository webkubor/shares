<template>
    <n-card title="界面">
        <n-form-item label="切换模式" label-placement="left">
            <n-space>
                <n-button :color="getRandomColor()" ghost v-for="(item, index) in config.interfaces"
                    @click="onSetFace(item)">
                    {{ item.name }}
                </n-button>
            </n-space>
        </n-form-item>
        <n-form-item label="背景设置" label-placement="left">
            <n-color-picker v-model:value="paperState.bgColor" style="width: 300px;" :show-alpha="true"
                :actions="['clear']" :swatches="[
                    '#FFFFFF',
                    '#18A058',
                    '#2080F0',
                    '#F0A020',
                    'rgba(208, 48, 80, 1)',
                ]" />
        </n-form-item>
        <n-form-item label="字体设置" label-placement="left">
            <n-color-picker v-model:value="paperState.fontColor" style="width: 300px;" :show-alpha="true"
                :actions="['clear']" :swatches="[
                    '#FFFFFF',
                    '#333333'
                ]" />
        </n-form-item>
    </n-card>
    <n-card>
        <n-space>
            <n-upload :show-file-list="false" multiple v-model:file-list="fileListRef"
                :on-update:file-list="handleFileListChange" @change="handleUploadChange">
                <n-button type="primary">上传图片</n-button>
            </n-upload>
            <n-button type="primary" :loading="exportLoading" @click="downloadBgImage">导出</n-button>
        </n-space>
    </n-card>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import type { UploadFileInfo } from 'naive-ui'
import { useWallpaper } from "../useWallpaper"
import BgSelector from "./BgSelector.vue";
import config from "../config.json"
import { getRandomColor } from "@/utils/random";
import domtoimage from 'dom-to-image-more';
import { imageToBase64, getPreviewUrl, canvasToImg, imgToCanvas } from '@/utils/watermarkUtils'
const fileListRef = ref([]);
const previews = ref([]);
const exportLoading = ref(false)

const { paperState, onSetFace, setBgColor } = useWallpaper()
function handleUploadChange(data: { fileList: UploadFileInfo[] }) {
    fileListRef.value = data.fileList
    previews.value = []
}

async function handleFileListChange() {
    const processedPreviews = await Promise.all(fileListRef.value.map(processFile));
    const previewNames = new Set(previews.value.map(item => item.name));
    previews.value = previews.value.concat(processedPreviews.filter(item => !previewNames.has(item.name)));
    paperState.wallpaper = previews.value[0].src

}

async function processFile(element: { file: File }): Promise<{ name: string; src: string }> {
    const previewUrl: string = await getPreviewUrl(element.file);
    const tempCanvas = await imgToCanvas(previewUrl);
    if (tempCanvas instanceof Error) {
        console.error(tempCanvas.message); // 处理错误
        return { name: element.name, src: previewUrl };
    } else {
        const img = canvasToImg(tempCanvas);
        return { name: element.name, src: img.src };
    }
}
const downloadBgImage = async () => {
    let target = document.getElementById('phone-view') as HTMLDivElement;
    console.log(target, 'start');
    exportLoading.value = true
    domtoimage.toPng(target, { useCORS: true }).then(function (dataUrl) {
        console.log(dataUrl);
        const link = document.createElement('a');
        link.href = dataUrl;
        // 设置下载的文件名，可根据需求修改
        link.download = 'downloaded-image.png';
        // 模拟点击 <a> 标签触发下载
        link.click();
    }).finally(() => {
        exportLoading.value = false
    });

};
</script>
<style lang="scss" scoped></style>