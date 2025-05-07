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
                            <n-select 
                                v-model:value="config.fontFamily" 
                                :options="fontOptions" 
                                placeholder="选择水印字体"
                                @update:value="onFontChange" 
                            />
                        </n-form-item>
                    </n-space>

                    <n-space v-if="config.watermarkType === watermarkTypeKey.image">
    <n-form-item label="图片水印" label-placement="left">
        <n-select v-model:value="config.imageStyle" :options="StylrConfig.imageStyles" />
        <img :src="getImageUrl(config.imageStyle)" style="height: 40px; margin-left:8px; border:1px solid #eee;">
    </n-form-item>

    <n-form-item label="图片设置" label-placement="left">
        <n-input-number v-model:value="config.scaleFactor" placeholder="图片水印大小" :step="0.1" />
    </n-form-item>
    <n-form-item label="透明度" label-placement="left">
        <n-input-number v-model:value="config.globalAlpha" placeholder="透明度" :step="0.1" />
    </n-form-item>

    <n-form-item label="水印位置" label-placement="left">
        <n-space>
            <n-button :type="config.watermarkPosition==='top-left'?'primary':'default'" @click="config.watermarkPosition='top-left'; onRrewrite();">左上</n-button>
            <n-button :type="config.watermarkPosition==='top-right'?'primary':'default'" @click="config.watermarkPosition='top-right'; onRrewrite();">右上</n-button>
            <n-button :type="config.watermarkPosition==='center'?'primary':'default'" @click="config.watermarkPosition='center'; onRrewrite();">居中</n-button>
            <n-button :type="config.watermarkPosition==='bottom-left'?'primary':'default'" @click="config.watermarkPosition='bottom-left'; onRrewrite();">左下</n-button>
            <n-button :type="config.watermarkPosition==='bottom-right'?'primary':'default'" @click="config.watermarkPosition='bottom-right'; onRrewrite();">右下</n-button>
        </n-space>
    </n-form-item>
    <n-form-item label="X轴偏移" label-placement="left">
        <n-input-number v-model:value="config.offsetX" :min="-100" :max="100" :step="1" style="width:100px;" @update:value="onRrewrite" />
        <span style="margin-left:8px; color:#888;">{{ config.offsetX }}%</span>
    </n-form-item>
    <n-form-item label="Y轴偏移" label-placement="left">
        <n-input-number v-model:value="config.offsetY" :min="-100" :max="100" :step="1" style="width:100px;" @update:value="onRrewrite" />
        <span style="margin-left:8px; color:#888;">{{ config.offsetY }}%</span>
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
                    
                    <div class="sortable-container">
                        <div class="tip">拖拽图片可调整顺序，按顺序导出</div>
                        <n-spin :show="isLoading" description="处理中...">
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
                        </n-spin>
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
import { reactive, ref, toRaw, watch } from "vue";
import type { UploadFileInfo } from 'naive-ui'
import StylrConfig from './config.json'
import { downloadImage, getPreviewUrl, canvasToImg, imgToCanvas } from '@/utils/watermarkUtils'
import { DownloadOutline, TrashOutline, EyeOutline } from '@vicons/ionicons5'
import { drawImageWatermark, addTextTitle, addTextWatermark, exportImagesToZip } from './watermarkHelpers'
const watermarkText = ref('司南烛');
const fileListRef = ref([]);
// 定义预览图片的类型
interface PreviewItem {
    src: string;
    name: string;
    id?: string | number;
}

const previews = ref<PreviewItem[]>([]);
const draggingIndex = ref(-1); // 当前拖拽的图片索引
const previewVisible = ref(false);
const previewSrc = ref('');
const isLoading = ref(false); // 添加 loading 状态
const rewriteTimer = ref<number | null>(null); // 存储防抖定时器ID

// 预览图片
function previewImage(src) {
    previewSrc.value = src;
    previewVisible.value = true;
}

// 字体变更处理
function onFontChange(fontFamily: string) {
    console.log('字体已更改为:', fontFamily);
    // 强制触发重绘
    if (previews.value.length > 0) {
        onRrewrite();
    }
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
    fontFamily: "AiChinese02",
    watermarkPosition: "center",
    offsetX: 0,
    offsetY: 0
})

// 监听配置变更，自动触发重绘
watch(
    () => ({
        ...toRaw(config),
        watermarkText: watermarkText.value,
        watermarkPosition: config.watermarkPosition,
        offsetX: config.offsetX,
        offsetY: config.offsetY
    }),
    () => {
        if (previews.value.length > 0) {
            // 添加防抖，避免频繁触发
            if (rewriteTimer.value !== null) {
                clearTimeout(rewriteTimer.value);
            }
            rewriteTimer.value = window.setTimeout(() => {
                onRrewrite();
                rewriteTimer.value = null;
            }, 300);
        }
    },
    { deep: true }
)

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

// 水印位置选项
const positionOptions = [
    { label: '居中', value: 'center' },
    { label: '左上角', value: 'top-left' },
    { label: '右上角', value: 'top-right' },
    { label: '左下角', value: 'bottom-left' },
    { label: '右下角', value: 'bottom-right' }
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
    
    // 设置 loading 状态
    isLoading.value = true;
    
    // 保存当前预览的文件名，以便重新生成后保持顺序
    const currentFiles = fileListRef.value.map(file => file.name);
    previews.value = []
    
    // 使用 setTimeout 让 UI 有时间更新 loading 状态
    setTimeout(() => {
        handleFileListChange().finally(() => {
            // 处理完成后关闭 loading
            isLoading.value = false;
        });
    }, 50);
}

function remove(index) {
    previews.value?.splice(index, 1)
    fileListRef.value?.splice(index, 1)
}


async function handleFileListChange() {
    try {
        const processedPreviews = await Promise.all(fileListRef.value.map(processFile));
        const previewNames = new Set(previews.value.map(item => item.name));
        previews.value = previews.value.concat(processedPreviews.filter(item => !previewNames.has(item.name)));
    } catch (error) {
        console.error('处理图片失败:', error);
        window.$message?.error('处理图片失败');
    }
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
            const imageUrl = getImageUrl(config.imageStyle);
            await drawImageWatermark(canvas, ctx, imageUrl, config.scaleFactor, config.globalAlpha, config.watermarkPosition, config.offsetX, config.offsetY);
            return config.active ? addName(ctx, canvas) : canvas;
        } catch (error) {
            console.error('图片水印加载错误:', error);
            return canvas;
        }
    } else {
        //文字水印
        addTextWatermark(ctx, canvas, watermarkText.value, config.fontFamily);
        return config.active ? addName(ctx, canvas) : canvas;
    }
}


function addName(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): HTMLCanvasElement {
    return addTextTitle(ctx, canvas, config);
}

// 导出为ZIP函数
async function exportZip() {
    if (!previews.value.length) {
        window.$message?.warning('没有可导出的图片');
        return;
    }
    
    try {
        await exportImagesToZip(toRaw(previews.value));
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


async function processFile(file: UploadFileInfo): Promise<PreviewItem> {
    const { id, name } = file;
    const url = await getPreviewUrl(file.file as File);
    const canvas = await imgToCanvas(url);
    const watermarkedCanvas = await addWatermark(canvas as HTMLCanvasElement);
    const base64 = watermarkedCanvas.toDataURL('image/png');
    return { id, name, src: base64 };
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