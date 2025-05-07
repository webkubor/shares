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
                        <n-form-item label="字体" label-placement="left" v-if="config.watermarkType === '2'">
                            <n-select v-model:value="config.fontFamily" :options="fontOptions" placeholder="选择水印字体" />
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
                        <n-button v-if="previews.length" type="primary" @click="exportZip">导出为ZIP</n-button>
                    </n-space>
                    
                    <div class="sortable-container" v-if="previews.length">
                        <p class="tip">提示: 可拖动图片进行排序，导出时将按排序命名</p>
                        <n-grid :cols="3" :x-gap="12" :y-gap="12">
                            <n-grid-item v-for="(item, index) in previews" :key="index">
                                <div class="preview-item" :class="{ 'dragging': draggingIndex === index }" 
                                     draggable="true"
                                     @dragstart="onDragStart(index, $event)"
                                     @dragover.prevent
                                     @dragenter.prevent
                                     @drop="onDrop(index, $event)">
                                    <div class="img-order">{{ index + 1 }}</div>
                                    <div class="image-container">
                                        <img 
                                            class="water-pic" 
                                            :src="item.src" 
                                            alt="水印图片"
                                            @click="previewImage(item.src)"
                                        />
                                    </div>
                                    <div class="preview-actions">
                                        <n-tooltip placement="bottom" trigger="hover">
                                            <template #trigger>
                                                <n-button size="small" quaternary circle type="primary" @click="downloadImage(item.src)">
                                                    <template #icon>
                                                        <n-icon><download-outline /></n-icon>
                                                    </template>
                                                </n-button>
                                            </template>
                                            <span>下载图片</span>
                                        </n-tooltip>
                                        
                                        <n-tooltip placement="bottom" trigger="hover">
                                            <template #trigger>
                                                <n-button size="small" quaternary circle type="error" @click="remove(index)">
                                                    <template #icon>
                                                        <n-icon><trash-outline /></n-icon>
                                                    </template>
                                                </n-button>
                                            </template>
                                            <span>移除图片</span>
                                        </n-tooltip>
                                    </div>
                                </div>
                            </n-grid-item>
                        </n-grid>
                    </div>
                </n-card>
            </template>
        </n-split>

    </div>

    <!-- 图片预览 -->
    <n-modal v-model:show="previewVisible" preset="card" style="width: 80%; max-width: 1200px;">
        <template #header>
            图片预览
        </template>
        <div style="text-align: center;">
            <img :src="previewSrc" style="max-width: 100%; max-height: 80vh;" />
        </div>
        <template #footer>
            <n-button type="primary" @click="previewVisible = false">关闭</n-button>
        </template>
    </n-modal>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import type { UploadFileInfo } from 'naive-ui'
import StylrConfig from './config.json'
import { downloadImage, getPreviewUrl, canvasToImg, imgToCanvas } from '@/utils/watermarkUtils'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { DownloadOutline, TrashOutline, EyeOutline } from '@vicons/ionicons5'
const watermarkText = ref('司南烛');
const fileListRef = ref([]);
const previews = ref([]);
const draggingIndex = ref(-1); // 当前拖拽的图片索引
const previewVisible = ref(false);
const previewSrc = ref('');

// 预览图片
function previewImage(src) {
    previewSrc.value = src;
    previewVisible.value = true;
}


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
    color: "#000000",
    fontFamily: "AiChinese02"
})

// 字体选项
const fontOptions = [
    { label: '楷体', value: 'KaiTi' },
    { label: '宋体', value: 'SimSun' },
    { label: '黑体', value: 'SimHei' },
    { label: '微软雅黑', value: 'Microsoft YaHei' },
    { label: '华文行楷', value: 'STXingkai' },
    { label: '华文仿宋', value: 'STFangsong' },
    { label: '华文细黑', value: 'STXihei' },
    { label: 'AI中文字体', value: 'AiChinese02' }
]

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
        ctx.font = `bold ${(ctx.canvas.width / 14)}px AiChinese02 `;
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
    // 使用选择的字体
    ctx.font = `${config.weight} ${(ctx.canvas.width / config.font)}px ${config.fontFamily}`;
    const textToAdd = config.title;
    const padding = canvas.width / 18;
    const paddingH = canvas.height / 15;
    for (let i = 0; i < textToAdd.length; i++) {
        ctx.fillText(textToAdd[i], padding, (i + 1) * (config.letterSpacing) + paddingH + i * config.letterSpacing);
    }
    return canvas;
}

// 导出为ZIP函数
async function exportZip() {
    if (!previews.value.length) {
        window.$message?.warning('没有可导出的图片');
        return;
    }
    
    try {
        const zip = new JSZip();
        const promises = [];
        
        // 按排序添加图片到ZIP
        for (let i = 0; i < previews.value.length; i++) {
            const item = previews.value[i];
            const imgName = `image_${i + 1}.png`;
            
            // 将base64转换为binary
            const promise = fetch(item.src)
                .then(res => res.blob())
                .then(blob => {
                    zip.file(imgName, blob);
                });
                
            promises.push(promise);
        }
        
        await Promise.all(promises);
        
        // 生成并下载ZIP
        const content = await zip.generateAsync({ type: 'blob' });
        const timestamp = new Date().getTime();
        saveAs(content, `watermark_images_${timestamp}.zip`);
        
        window.$message?.success('导出ZIP成功');
    } catch (error) {
        console.error('ZIP导出错误:', error);
        window.$message?.error('导出ZIP失败');
    }
}

// 拖拽开始
function onDragStart(index, event) {
    draggingIndex.value = index;
    // 设置拖拽数据
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', index.toString());
    
    // 添加半透明效果
    setTimeout(() => {
        event.target.classList.add('dragging');
    }, 0);
}

// 拖拽放下
function onDrop(targetIndex, event) {
    event.preventDefault();
    const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'));
    
    if (sourceIndex !== targetIndex) {
        // 交换图片位置
        const temp = { ...previews.value[sourceIndex] };
        previews.value.splice(sourceIndex, 1);
        previews.value.splice(targetIndex, 0, temp);
        
        window.$message?.success('图片排序已更新');
    }
    
    draggingIndex.value = -1;
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
    height: 100%;
    padding: 10px;
    overflow: auto;

    .image-container {
        width: 100%;
        height: 150px;
        position: relative;
        overflow: hidden;
        background: #f9f9f9;
        border-radius: 4px;
        margin-bottom: 12px;
        cursor: pointer;
        
        &:hover {
            background: #f0f0f0;
        }
    }
    
    .water-pic {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border-radius: 4px;
        padding: 8px;
        box-sizing: border-box;
    }
    
    .sortable-container {
        margin-top: 16px;
        
        .tip {
            color: #666;
            font-size: 14px;
            margin-bottom: 12px;
        }
        
        .preview-item {
            position: relative;
            padding: 8px;
            border-radius: 8px;
            background: #f5f5f5;
            transition: all 0.3s;
            border: 2px solid transparent;
            cursor: move;
            
            &:hover {
                border-color: #2080f0;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            &.dragging {
                opacity: 0.5;
                border: 2px dashed #2080f0;
            }
            
            .img-order {
                position: absolute;
                top: 0;
                left: 0;
                background: #2080f0;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                transform: translate(-30%, -30%);
                z-index: 2;
            }
            
            .preview-actions {
                display: flex;
                justify-content: space-between;
                margin-top: 8px;
                gap: 8px;
            }
        }
    }
}</style>