<template>
    <n-card title="图片水印添加">
        <n-space>
            <n-input type="text" v-model:value="watermarkText" placeholder="输入水印文字"></n-input>
            <n-button @click="handleFileListChange">生成水印</n-button>
        </n-space>
    </n-card>
    <n-card>
        <n-upload list-type="image" multiple v-model:file-list="fileListRef" @change="handleUploadChange" @remove="handleRemove"
            @update:file-list="handleFileListChange">
            <n-button>上传文件</n-button>
        </n-upload>
    </n-card>

    <n-card>
        <n-space v-for="(item, index) in previews">
            <n-space  vertical>
            <img class="water-pic" :src="item" alt="">
            <n-button @click="downWaterPic(item)">下载图片</n-button>
        </n-space>

        </n-space>
    </n-card>

</template>
<script setup lang="ts">
import { ref } from "vue";
import type { UploadFileInfo } from 'naive-ui'
import { saveFile } from "@/utils/down"
const watermarkText = ref('说书人司南烛');
const fileListRef = ref([]);
const previews = ref([]);


function addWatermarks() {
    console.log(previewFileList.value)
}

function handleUploadChange(data: { fileList: UploadFileInfo[] }) {
    fileListRef.value = data.fileList
}

function handleRemove(data: { file: UploadFileInfo, fileList: UploadFileInfo[] }) {
    if (data.file.id === 'text-message') {
        window.$message.info('居然没传上去，算了，删了吧')
    }
    else if (data.file.id === 'notification') {
        window.$message.error('不行，这个有用，不许删')
        return false
    }
    else if (data.file.id === 'contact') {
        message.loading('不知道这个有没有用，等我问问服务器能不能删', {
            duration: 4000
        })
        return new Promise((resolve) => {
            setTimeout(() => {
                window.$message.error('不行，他们也不许删这个')
                resolve(false)
            }, 4000)
        })
    }
}


function getPreviewUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        // 转换为base64字符串
        reader.readAsDataURL(file);

    });
}

function handleFileListChange() {
    window.$message.info('开始处理临时图片预览 URL')
    fileListRef.value.forEach(async (element) => {
        try {
            // 转换为base64
            const previewUrl = await getPreviewUrl(element.file);
            //   转换为Canvas
            let tempCanvas = await imgToCanvas(previewUrl)
            // 把水印写入
            const canvas = addWatermark(tempCanvas, watermarkText.value)
            const img = convasToImg(canvas);
            previews.value.push(img.src);
        } catch (error) {
            console.error('获取预览 URL 时出错:', error);
        } finally {
            console.log(previews.value)
        }
    });
}


function downWaterPic(imageSrc) {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'watermarked_image.png';
    link.click();
}


/**
 * canvas添加水印
 * @param  canvas 对象
 * @param text 水印文字
 */
function addWatermark(canvas, text: string) {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#aaa'
    ctx.textBaseline = 'middle'
    ctx.font = (ctx.canvas.width / 20) + 'px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    // ctx.rotate(45);
    // ctx.rotate((45 * Math.PI) / 180);
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)
    return canvas
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
    console.log(img.height)
    console.log(img.width)
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