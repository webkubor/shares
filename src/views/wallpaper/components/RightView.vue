<template>
     <n-card title="界面切换">
        <n-space>
            <n-button :color="getRandomColor()" ghost v-for="(item, index) in config.mobile.interfaces"
                @click="onSetFace(item)">
                {{ item.name }}
            </n-button>
        </n-space>
    </n-card>
    <BgSelector  v-if="paperState.model === modelKeyType.phone"/>
    <n-card >
        <n-space>
            <n-upload :show-file-list="false" multiple v-model:file-list="fileListRef"
                :on-update:file-list="handleFileListChange" @change="handleUploadChange">
                <n-button type="primary">上传图片</n-button>
            </n-upload>
            <n-button type="primary" @click="downloadBgImage">导出</n-button>
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
import { imageToBase64, getPreviewUrl, canvasToImg, imgToCanvas } from '@/utils/watermarkUtils'
const fileListRef = ref([]);
const previews = ref([]);

const { paperState, onSetFace,modelKeyType } = useWallpaper()
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
    const imgUrl = paperState.bg;  // 从 state 获取图像 URL
    try {
        const base64Image = await imageToBase64(imgUrl);
        // 将 Base64 图像嵌入到 HTML 中
        const bgView = document.querySelector('.bg-view') as HTMLElement;
        bgView.style.backgroundImage = `url(${base64Image})`;

        // 将 Base64 图像转换为 Canvas 下载
        const img = new Image();
        img.src = base64Image;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imgUrl = canvas.toDataURL('image/png');

            const link = document.createElement('a');
            link.href = imgUrl;
            link.download = 'background-image.png';  // 设置下载文件名
            link.click();  // 触发下载
        };
    } catch (error) {
        console.error('图像转换为 Base64 失败:', error);
    }
};
</script>
<style lang="scss" scoped></style>