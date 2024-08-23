<template>
    <div class="watermark">
        <n-split direction="horizontal" :max="0.75" :min="0.25">
            <template #1>
                <n-space vertical>
                    <n-card title="图片水印添加">
                        <n-space>
                            <n-upload :show-file-list="false" multiple v-model:file-list="fileListRef"
                                :on-update:file-list="handleFileListChange" @change="handleUploadChange">
                                <n-button>上传文件</n-button>
                            </n-upload>
                            <n-button v-if="previews.length" type="primary" @click="downloadAll">批量下载</n-button>
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
                                <img src="./2.png" style="height: 40px;">
                            </n-form-item>
                            <n-form-item label="需要题字" label-placement="left">
                                <n-checkbox v-model:checked="config.active" label="添加图片标题" />
                            </n-form-item>
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
                            <n-button v-if="previews.length" @click="onRrewrite">重绘</n-button>

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
import imgSource from './2.png'
const watermarkText = ref('司南烛');
const fileListRef = ref([]);
const previews = ref([]);


const config = reactive({
    show: true,
    active: true,
    font: 10,
    watermarkType: '2',
    weight: 500,
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


function handleUploadChange(data: { fileList: UploadFileInfo[] }) {
    fileListRef.value = data.fileList
    previews.value = []
}



function getPreviewUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);

    });
}

async function processFile(element) {
    const previewUrl = await getPreviewUrl(element.file);
    const tempCanvas = await imgToCanvas(previewUrl);
    const canvas = addWatermark(tempCanvas, watermarkText.value);
    const img = convasToImg(canvas);
    return { name: element.name, src: img.src };
}



function onRrewrite() {
    if (!watermarkText.value) {
        window.$message?.warning("请填写水印内容")
        return
    }
    previews.value = []
    console.log(`output->fileListRef.value`,fileListRef.value)
    handleFileListChange()
}


function onCompleteColor() {
    onRrewrite()
}
async function handleFileListChange() {
    const processedPreviews = await Promise.all(fileListRef.value.map(processFile));
    const previewNames = new Set(previews.value.map(item => item.name));
    previews.value = previews.value.concat(processedPreviews.filter(item => !previewNames.has(item.name)));
}

function downWaterPic(imageSrc) {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'watermarked_image.png';
    link.click();
}


function remove(index) {
    previews.value?.splice(index, 1)
    fileListRef.value?.splice(index, 1)
}

/**
 * canvas添加水印
 * @param  canvas 对象
 * @param text 水印文字
 */
function addWatermark(canvas, text: string) {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // 设置透明度为 0.5

    ctx.textAlign = 'center';
    // 设置文本的垂直对齐方式为底部对齐
    ctx.textBaseline = 'bottom';
    // 设置字体大小，根据画布宽度动态调整
    ctx.font = (ctx.canvas.width / 14) + 'px Chinese1';
    ctx.fontWeight = config.weight
    // 设置一个边距值，根据画布宽度确定
    const padding = (ctx.canvas.width / 18);
    // 在底部居中位置绘制水印文字，通过计算水平位置使得文字居中
    ctx.fillText(text, canvas.width / 2, canvas.height - padding);
    drawImage(imgSource, ctx)
    if (config.active) {
        return addName(ctx, canvas)
    } else {
        return canvas

    }
}




function drawImage(source, ctx) {
    const padding = (ctx.canvas.width / 18);
    const img = new Image();
    img.src = source;
    img.onload = function () {
        console.log(`output->加载完毕`, img)
        ctx.drawImage(img, 0, 0, padding, padding);
    };
    return ctx
}



function addName(ctx, canvas) {
    // 设置文字颜色为黑色
    ctx.fillStyle = config.color;
    // 设置文字左对齐
    ctx.textAlign = 'left';
    // 设置字体大小为画布宽度的1/12加上字体名称为 Chinese1
    ctx.font = (ctx.canvas.width / config.font) + 'px Chinese1';
    // 设置文字粗细为 500
    ctx.fontWeight = 500;
    // 获取要添加的文本内容，假设来自 config.title
    const textToAdd = config.title;
    // 设置边距，水平边距和垂直边距一致，取画布宽度的1/18
    const padding = canvas.width / 18;
    const paddingH = canvas.height / 15;
    // 遍历文本中的每个字符
    for (let i = 0; i < textToAdd.length; i++) {
        // 在指定位置绘制单个字符，同时考虑垂直字间距和统一的边距
        ctx.fillText(textToAdd[i], padding, (i + 1) * (config.letterSpacing) + paddingH + i * config.letterSpacing);
    }
    return canvas
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
 * Base64转成canvas
 * @param  base64
 */
async function imgToCanvas(base64) {
    // 创建img元素
    const img = document.createElement('img')
    img.setAttribute('src', base64)
    await new Promise((resolve) => (img.onload = resolve))
    // 创建canvas DOM元素，并设置其宽高和图片一样
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    // 坐标(0,0) 表示从此处开始绘制，相当于偏移。
    canvas.getContext('2d').drawImage(img, 0, 0)
    return canvas
}


/**
 * canvas转成img
 * @param {canvas对象} canvas
 */
function convasToImg(canvas, type) {
    // 新建Image对象，可以理解为DOM
    let image = new Image()
    // canvas.toDataURL 返回的是一串Base64编码的URL
    // 指定格式 PNG
    image.src = canvas.toDataURL(type)
    return image
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
    width: 300px;
    margin-top: 10px;
}
</style>