<template>
    <div class="book-page">
        <n-split direction="horizontal" :max="1" :min="0">
            <template #1>
                <n-card title="操作栏目">
                    <n-upload :show-file-list="false" multiple v-model:file-list="fileListRef"
                        :on-update:file-list="handleFileListChange" @change="handleUploadChange">
                        <n-button>上传文件</n-button>
                    </n-upload>
                    <n-divider />
                    <n-space>
                        <n-form-item label="水印形式" label-placement="left">
                            <n-radio-group v-model:value="config.watermarkType" name="radiogroup">
                                <n-space>
                                    <n-radio value="1">
                                        图片水印
                                    </n-radio>
                                    <n-radio value="2">
                                        文字水印
                                    </n-radio>
                                </n-space>
                            </n-radio-group>
                        </n-form-item>
                        <n-form-item label="内容" label-placement="left" v-if="config.watermarkType === '2'">
                            <n-input type="text" v-model:value="watermarkText" placeholder="输入水印文字" />
                        </n-form-item>
                    </n-space>

                    <n-space v-if="config.watermarkType === watermarkTypeKey.image">
                        <n-form-item label="图片水印" label-placement="left">
                            <n-select v-model:value="config.imageStyle" :options="StylrConfig.imageStyles" />
                            <img :src="getImageUrl(config.imageStyle)" style="height: 40px;">
                        </n-form-item>
                        <n-form-item label="图片大小" label-placement="left">
                            <n-input-number v-model:value="config.scaleFactor" placeholder="图片水印大小" :step="0.1" />
                        </n-form-item>
                        <n-form-item label="透明度" label-placement="left">
                            <n-input-number v-model:value="config.globalAlpha" placeholder="透明度" :step="0.1" />
                        </n-form-item>
                    </n-space>

                    <n-form-item label="需要题字" label-placement="left">
                        <n-checkbox v-model:checked="config.active" label="添加图片标题" />
                    </n-form-item>
                    <n-space v-if="config.active">
                        <n-form-item label="题字大小" label-placement="left">
                            <n-select v-model:value="config.font" :options="StylrConfig.sizeOptions" />
                        </n-form-item>
                        <n-form-item label="字间距离" label-placement="left">
                            <n-input-number type="text" v-model:value="config.letterSpacing" placeholder="字间距" :min="50"
                                :step="1" />
                        </n-form-item>
                        <n-form-item label="题字粗细" label-placement="left">
                            <n-input-number type="text" v-model:value="config.weight" placeholder="题字粗细" :min="300"
                                :step="100" />
                        </n-form-item>
                        <n-form-item label="题字内容" label-placement="left">
                            <n-input type="text" v-model:value="config.title" placeholder="添加图片标题" />
                        </n-form-item>
                        <n-form-item label="题字颜色" label-placement="left">
                            <n-color-picker v-model:value="config.color" style="width: 300px;" :actions="['clear']"
                                :swatches="[
                                    '#FFFFFF',
                                    '#18A058',
                                    '#2080F0',
                                    '#F0A020',
                                    'rgba(208, 48, 80, 1)',
                                ]" @complete="onRrewrite" />
                        </n-form-item>
                    </n-space>

                </n-card>
            </template>
            <template #2>
                <n-card title="预览区域">

                    <n-space>
                        <n-button v-if="previews.length" @click="onRrewrite">重绘</n-button>
                        <n-button v-if="previews.length" type="primary" @click="downloadAll">批量下载</n-button>
                    </n-space>
                    <n-space v-if="previews.length">
                        <n-space v-for="(item, index) in previews" vertical>
                            <img class="water-pic" :src="item.src" alt="">
                            <n-space> <n-button @click="downloadImage(item.src)">下载图片</n-button>
                                <n-button @click="remove(index)">移除</n-button></n-space>
                        </n-space>
                    </n-space>
                </n-card>
            </template>
        </n-split>

    </div>

</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import type { UploadFileInfo } from 'naive-ui'
import StylrConfig from './config.json'
import { downloadImage, getPreviewUrl, canvasToImg, imgToCanvas } from '@/utils/watermarkUtils'
const watermarkText = ref('司南烛');
const fileListRef = ref([]);
const previews = ref([]);


const config = reactive({
    active: false,
    font: 10,
    scaleFactor: 0.5,
    globalAlpha: 0.7,
    watermarkType: '2',
    weight: 500,
    imageStyle: '/src/assets/watermark/2.png',
    letterSpacing: 70,
    title: "小鬼阿七",
    color: "#000000"
})

enum watermarkTypeKey {
    image = "1",
    text = "2"
}

function getImageUrl(path) {
    const imagePaths = import.meta.glob('/src/assets/watermark/*.png', { eager: true });
    return imagePaths[path]?.default;
}


function handleUploadChange(data: { fileList: UploadFileInfo[] }) {
    fileListRef.value = data.fileList
    previews.value = []
}


function onRrewrite() {
    if (!watermarkText.value) {
        window.$message?.warning("请填写水印内容")
        return
    }
    previews.value = []
    handleFileListChange()
}

function remove(index) {
    previews.value?.splice(index, 1)
    fileListRef.value?.splice(index, 1)
}


async function handleFileListChange() {
    const processedPreviews = await Promise.all(fileListRef.value.map(processFile));
    const previewNames = new Set(previews.value.map(item => item.name));
    previews.value = previews.value.concat(processedPreviews.filter(item => !previewNames.has(item.name)));
}

/**
 * canvas添加水印
 * @param  canvas 对象
 * @param text 水印文字
 */
async function addWatermark(canvas: HTMLCanvasElement): Promise<HTMLCanvasElement> {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('无法获取画布上下文');
    }
    if (config.watermarkType === watermarkTypeKey.image) {
        try {
            await onDrawImage(canvas, ctx);
            return config.active ? addName(ctx, canvas) : canvas;
        } catch (error) {
            console.error('图片水印加载错误:', error);
            return canvas;
        }
    } else {
        //文字水印
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.font = `bold ${(ctx.canvas.width / 14)}px AiChinese01 `;
        const padding = (ctx.canvas.width / 18);
        ctx.fillText(watermarkText.value, canvas.width / 2, canvas.height - padding);
        return config.active ? addName(ctx, canvas) : canvas;
    }
}


function onDrawImage(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Promise<CanvasRenderingContext2D> {
    return new Promise((resolve, reject) => {
        const padding = (ctx.canvas.width / 18);
        const img = new Image();
        img.src = getImageUrl(config.imageStyle);
        img.onload = function () {
            const originalWidth = img.width;
            const originalHeight = img.height;
            const fixedHeight = 100;
            const scaleFactor = config.scaleFactor;
            const newWidth = (fixedHeight / originalHeight) * originalWidth * scaleFactor;
            const newHeight = fixedHeight * scaleFactor;
            ctx.globalAlpha = config.globalAlpha;
            ctx.drawImage(img, canvas.width / 2 - newWidth / 2, ctx.canvas.height - fixedHeight - padding, newWidth, newHeight);
            ctx.globalAlpha = 1;
            resolve(ctx);
        };
        img.onerror = reject;
    });
}

function addName(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): HTMLCanvasElement {
    ctx.fillStyle = config.color;
    ctx.textAlign = 'left';
    ctx.font = `${config.weight} ${(ctx.canvas.width / config.font)}px AiChinese01 `;
    const textToAdd = config.title;
    const padding = canvas.width / 18;
    const paddingH = canvas.height / 15;
    for (let i = 0; i < textToAdd.length; i++) {
        ctx.fillText(textToAdd[i], padding, (i + 1) * (config.letterSpacing) + paddingH + i * config.letterSpacing);
    }
    return canvas;
}

// 批量下载函数
function downloadAll() {
    downloadImage(toRaw(previews.value), true)
}


async function processFile(element: { file: File }): Promise<{ name: string; src: string }> {
    const previewUrl: string = await getPreviewUrl(element.file);
    const tempCanvas = await imgToCanvas(previewUrl);
    if (tempCanvas instanceof Error) {
        console.error(tempCanvas.message); // 处理错误
        return { name: element.name, src: previewUrl };
    } else {
        const canvas = await addWatermark(tempCanvas);
        const img = canvasToImg(canvas);
        console.log(img, 'processFile');
        return { name: element.name, src: img.src };
    }
}

</script>
<style lang="scss">
.book-page {
    width: 100%;
    min-height: 1080px;
    padding: 20px;
    background: var(--webkubor-bg);
}


.water-pic {
    width: 250px;
    margin-top: 10px;
}
</style>