<template>
    <n-card title="图片水印添加">
        <n-space>
            <n-input type="text" v-model="watermarkText" placeholder="输入水印文字"></n-input>
            <n-button>生成水印</n-button>
        </n-space>
    </n-card>
    <n-card>
        <n-upload list-type="image" v-model:file-list="fileListRef" @change="handleUploadChange" @remove="handleRemove"
            @update:file-list="handleFileListChange">
            <n-button>上传文件</n-button>
        </n-upload>
    </n-card>

    <n-card>
            <img  class="water-pic" v-for="item in previews" :src="item" alt="">
    </n-card>

</template>
<script setup lang="ts">
import { ref } from "vue";
import type { UploadFileInfo } from 'naive-ui'
const watermarkText = ref('');
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
    reader.readAsDataURL(file);
  });
}

function handleFileListChange() {
    window.$message.info('是的，file-list 的值变了')
    fileListRef.value.forEach(async (element) => {
    try {
      const previewUrl = await getPreviewUrl(element.file);
      previews.value.push(previewUrl);
    } catch (error) {
      console.error('获取预览 URL 时出错:', error);
    } finally {
        console.log(previews.value)
    }
});
}


</script>
<style lang="scss">
.water-pic {
    width: 300px;
    margin-top: 10px;
}
</style>