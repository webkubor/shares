<template>
    <div class="watermark">
        <n-split direction="horizontal" :max="1"
        :min="0">
            <template #1>
                <n-space vertical>
                    <n-card title="图片水印添加">
                        <n-space>
                            <n-upload :show-file-list="false" multiple v-model:file-list="fileListRef"
                                :on-update:file-list="handleFileListChange" @change="handleUploadChange">
                                <n-button>上传文件</n-button>
                            </n-upload>
                            <n-button v-if="previews.length" type="primary" @click="downloadAll">批量下载</n-button>

                            <n-button v-if="previews.length" @click="onRrewrite">重绘</n-button>
                            <n-switch v-model:value="config.show">
                                <template #checked>
                                    展开工具栏
                                </template>
                                <template #unchecked>
                                    折叠工具栏
                                </template>
                            </n-switch>
                        </n-space>
                    </n-card>
                    <n-collapse-transition :show="config.show">
                        <n-card title="操作栏目">
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
                            <n-form-item label="水印内容" label-placement="left" v-if="config.watermarkType === '2'">
                                <n-input type="text" v-model:value="watermarkText" placeholder="输入水印文字" />
                            </n-form-item>
                            <n-form-item label="图片水印" label-placement="left" v-if="config.watermarkType === '1'">
                                <n-select v-model:value="config.imageStyle" :options="imageStyles" />
                                <img :src="getImageUrl(config.imageStyle)" style="height: 40px;">
                            </n-form-item>
                            <n-form-item label="需要题字" label-placement="left">
                                <n-checkbox v-model:checked="config.active" label="添加图片标题" />
                            </n-form-item>
                            <div v-if="config.active">
                                <n-form-item label="题字大小" label-placement="left">
                                <n-select v-model:value="config.font" :options="sizeOptions" />
                            </n-form-item>
                            <n-form-item label="字间距离" label-placement="left">
                                <n-input-number type="text" v-model:value="config.letterSpacing" placeholder="字间距"
                                    :min="50" :step="1" />
                            </n-form-item>
                            <n-form-item label="题字粗细" label-placement="left">
                                <n-input-number type="text" v-model:value="config.weight" placeholder="题字粗细" :min="300"
                                    :step="100" />
                            </n-form-item>
                            <n-form-item label="题字内容" label-placement="left">
                                <n-input type="text" v-model:value="config.title" placeholder="添加图片标题" />
                            </n-form-item>
                            <n-form-item label="题字颜色" label-placement="left">
                                <n-color-picker v-model:value="config.color" :actions="['clear']" :swatches="[
                                    '#FFFFFF',
                                    '#18A058',
                                    '#2080F0',
                                    '#F0A020',
                                    'rgba(208, 48, 80, 1)',
                                ]" @complete="onCompleteColor" />
                            </n-form-item>
                            </div>
                      

                        </n-card>
                    </n-collapse-transition>


                </n-space>
            </template>
            <template #2>
                <n-card title="预览区域">
                    <n-space v-if="previews.length">
                        <n-space v-for="(item, index) in previews" vertical>
                            <img class="water-pic" :src="item.src" alt="">
                            <n-space> <n-button @click="downWaterPic(item.src)">下载图片</n-button>
                                <n-button @click="remove(index)">移除</n-button></n-space>
                        </n-space>
                    </n-space>
                </n-card>
            </template>
        </n-split>

    </div>

</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type { UploadFileInfo } from 'naive-ui'
const watermarkText = ref('司南烛');
const fileListRef = ref([]);
const previews = ref([]);


const config = reactive({
    show: true,
    active: false,
    font: 10,
    watermarkType: '2',
    weight: 500,
    imageStyle: '/src/assets/watermark/2.png',
    letterSpacing: 70,
    title: "小鬼阿七",
    color: "#000000"
})

const sizeOptions = [
    {
        label: '字体12等分(小)',
        value: 12
    },
    {
        label: '字体10等分(中)',
        value: 10
    },
    {
        label: '字体8等分(大)',
        value: 8
    },
]
// 静态资源处理问题：Vite 在开发模式下对静态资源的处理方式与传统的 Webpack 等构建工具可能有所不同。如果直接使用相对路径来引用静态资源，可能会导致资源加载失败。

const imageStyles = [

{
        label: '中规中矩',
        value: '/src/assets/watermark/1.png'
    },
    {
        label: '还不错',
        value: '/src/assets/watermark/2.png'
    },
    {
        label: 'nice',
        value: '/src/assets/watermark/3.png'
    },
    {
        label: '4',
        value: '/src/assets/watermark/4.png'
    },
    {
        label: '5',
        value: '/src/assets/watermark/5.png'
    },
    {
        label: '6',
        value: '/src/assets/watermark/6.png'
    },
    {
        label: '7',
        value: '/src/assets/watermark/7.png'
    },
    {
        label: '8',
        value: '/src/assets/watermark/8.png'
    }
]

function getImageUrl(path) {
  return imagePaths[path]?.default;
}
const imagePaths = import.meta.glob('/src/assets/watermark/*.png', { eager: true });

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


function onCompleteColor() {
    onRrewrite()
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


enum watermarkTypeKey {
image = "1",
text ="2"
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
            return config.active? addName(ctx, canvas) : canvas;
        } catch (error) {
            console.error('图片水印加载错误:', error);
            return canvas;
        }
    } else {
        //文字水印
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.font = `bold ${(ctx.canvas.width / 14)}px Chinese1 `;
        const padding = (ctx.canvas.width / 18);
        ctx.fillText(watermarkText.value, canvas.width / 2, canvas.height - padding);
        return config.active? addName(ctx, canvas) : canvas;
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
            const newWidth = (fixedHeight / originalHeight) * originalWidth;
            ctx.drawImage(img, canvas.width / 2 - newWidth / 2, ctx.canvas.height - fixedHeight - padding, newWidth, fixedHeight);
            resolve(ctx);
        };
        img.onerror = reject;
    });
}


function addName(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): HTMLCanvasElement {
    ctx.fillStyle = config.color;
    ctx.textAlign = 'left';
    ctx.font = `${config.weight} ${(ctx.canvas.width / config.font)}px Chinese1 `;
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
    previews.value.forEach((imageSrc) => {
        const link = document.createElement('a');
        link.href = imageSrc.src;
        link.download = `webkubor_${new Date().getTime()}.png`;
        link.click();
    });
}

/**
 * @description: 单独下载
 * @param {*} imageSrc
 * @return {*}
 */
function downWaterPic(imageSrc) {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `webkubor_${new Date().getTime()}.png`;
    link.click();
}



function getPreviewUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}

async function processFile(element: { file: File }): Promise<{ name: string; src: string }> {
    const previewUrl = await getPreviewUrl(element.file);
    const tempCanvas = await imgToCanvas(previewUrl);
    const canvas = await addWatermark(tempCanvas);
    const img = convasToImg(canvas);
    return { name: element.name, src: img.src };
}

/**
 * Base64转成canvas
 * @param base64
 */
async function imgToCanvas(base64: string): Promise<HTMLCanvasElement> {
    const img = document.createElement('img');
    img.setAttribute('src', base64);
    await new Promise((resolve) => (img.onload = resolve));
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d')?.drawImage(img, 0, 0);
    return canvas;
}


/**
 * canvas转成img
 * @param {canvas对象} canvas
 */
function convasToImg(canvas: HTMLCanvasElement, type = "image/png"): HTMLImageElement {
    let image = new Image();
    image.src = canvas.toDataURL(type);
    return image;
}

</script>
<style lang="scss">
.watermark {
    width: 100%;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    min-height: 1080px;
    padding: 20px;
}

.water-pic {
    width: 250px;
    margin-top: 10px;
}
</style>