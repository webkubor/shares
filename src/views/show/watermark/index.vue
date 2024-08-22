<template>
    <n-card title="图片水印添加">
        <n-space>
            <n-input type="text" v-model:value="watermarkText" placeholder="输入水印文字">
                <template #prefix>
                    水印内容:
                </template>
            </n-input>
          
            <n-button v-if="previews.length" @click="onRrewrite">生成水印</n-button>
            <n-upload :show-file-list="false" multiple v-model:file-list="fileListRef"
                :on-update:file-list="handleFileListChange" @change="handleUploadChange">
                <n-button>上传文件</n-button>
            </n-upload>
            <n-button v-if="previews.length" type="primary" @click="downloadAll">批量下载</n-button>
            <n-checkbox v-model:checked="config.active" label="添加图片标题"  />
            <n-input v-if="config.active" type="text" v-model:value="config.title" placeholder="添加图片标题">
                <template #prefix>
                    标题:
                </template>
            </n-input>
        </n-space>
    </n-card>
    <n-card>

    </n-card>

    <n-card v-if="previews.length">
        <n-space>
            <n-space v-for="(item, index) in previews" vertical>
                <img class="water-pic" :src="item.src" alt="">
                <n-space> <n-button @click="downWaterPic(item.src)">下载图片</n-button>
                    <n-button @click="remove(index)">移除</n-button></n-space>
            </n-space>
        </n-space>
    </n-card>


</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type { UploadFileInfo } from 'naive-ui'
const watermarkText = ref('司南烛');
const fileListRef = ref([]);
const previews = ref([]);


const config = reactive({
    active: true,
    title: "魔女阿七"
})


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
    handleFileListChange()
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
    ctx.fontWeight = 500
    // 设置一个边距值，根据画布宽度确定
    const padding = (ctx.canvas.width / 18);
    // 在底部居中位置绘制水印文字，通过计算水平位置使得文字居中
    ctx.fillText(text, canvas.width / 2, canvas.height - padding);
    if (config.active) {
        return addName(ctx, canvas)
    } else {
        return canvas

    }
}



function addName(ctx, canvas) {
    // 设置文字颜色为黑色
    ctx.fillStyle = 'black';
    // 设置文字左对齐
    ctx.textAlign = 'left';
    // 设置字体大小为画布宽度的1/12加上字体名称为 Chinese1
    ctx.font = (ctx.canvas.width / 10) + 'px Chinese1';
    // 设置文字粗细为 500
    ctx.fontWeight = 500;
    // 获取要添加的文本内容，假设来自 config.title
    const textToAdd = config.title;
    // 设置边距，水平边距和垂直边距一致，取画布宽度的1/18
    const padding = canvas.width / 18;
    // 设置垂直字间距为画布宽度的1/10
    let verticalLetterSpacing = ctx.canvas.width / 13;
    // 遍历文本中的每个字符
    for (let i = 0; i < textToAdd.length; i++) {
        // 在指定位置绘制单个字符，同时考虑垂直字间距和统一的边距
        ctx.fillText(textToAdd[i], padding, (i + 1) * (ctx.canvas.width / 14) + padding + i * verticalLetterSpacing);
    }
    return  canvas
}

// 批量下载函数
function downloadAll() {
    previews.value.forEach((imageSrc) => {
        const link = document.createElement('a');
        link.href = imageSrc.src;
        link.download = `watermarked_image_${new Date().getTime()}.png`;
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
.water-pic {
    width: 300px;
    margin-top: 10px;
}
</style>