<template>
        <ColorBorder>
            <n-spin :show="exportLoading">
                <n-space>
                    <n-upload :show-file-list="false" v-model:file-list="fileListRef"
                        :on-update:file-list="dealWallpaper" @change="handleUploadChange">
                        <button class="webkubor-back-btn common-btn">上传壁纸</button>
                    </n-upload>
                    <button class="webkubor-back-btn common-btn" @click="downloadBgImage">导出</button>
                </n-space>
                <template #description>
                    你不知道你有多幸运
                </template>
            </n-spin>
            <n-form-item label="壁纸位置" label-placement="left" style="margin-top: 20px;">
                <n-space>
            <n-select v-model:value="paperState.backgroundPositon.x" style="width: 100px;" placeholder="X轴偏移" :options="backgroundPositonXOptions" />
            <n-select v-model:value="paperState.backgroundPositon.y" style="width: 100px"  placeholder="Y轴偏移" :options="backgroundPositonYOptions" />
                </n-space>
            </n-form-item>
            <n-form-item label="切换模式" label-placement="left" style="margin-top: 20px;">
                <n-space>
                    <button class="webkubor-back-btn" v-for="(item, index) in config.interfaces"
                        @click="onSetFace(item)">
                        {{ item.name }}
                    </button>
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
            <n-form-item label="背景透视" label-placement="left" >
                <n-checkbox v-model:checked="paperState.perspective">
                透视
                </n-checkbox>
            </n-form-item>
         
            <n-form-item label="字体颜色" label-placement="left">
                <n-color-picker v-model:value="paperState.fontColor" style="width: 300px;" :show-alpha="true"
                    :actions="['clear']" :swatches="[
                        '#FFFFFF',
                        '#333333'
                    ]" />
            </n-form-item>
            <n-form-item label="文字水印" label-placement="left">
                <n-input type="text" v-model:value="paperState.waterMarkName" placeholder="输入水印(Design by 司南烛)" />
            </n-form-item>
            <n-form-item label="水印颜色" label-placement="left">
                <n-color-picker v-model:value="paperState.waterColor" style="width: 300px;" :show-alpha="true"
                    :actions="['clear']" :swatches="[
                        '#FFFFFF',
                        '#333333'
                    ]" />
            </n-form-item>
            <n-form-item label="图片水印" label-placement="left">
                <n-upload list-type="image-card" :on-update:file-list="dealWaterMark">
                    点击上传
                </n-upload>
            </n-form-item>
            <n-form-item label="辅助线"  label-placement="left">
                <n-checkbox size="large" label="显示"  v-model:checked="paperState.help" />
            </n-form-item>
            <n-form-item label="导出比例" label-placement="left">
                <n-radio-group v-model:value="paperState.proportion" name="radiogroup">
                    <n-space>
                        <n-radio :value="1">
                            1 : 1
                        </n-radio>
                        <n-radio :value="2">
                            3 : 4
                        </n-radio>
                        <n-radio :value="3">
                            4 : 3
                        </n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
         
        </ColorBorder>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import type { UploadFileInfo } from 'naive-ui'
import { useWallpaper } from "../useWallpaper"
import config from "../config.json"
import domtoimage from 'dom-to-image-more';
import { getPreviewUrl, canvasToImg, imgToCanvas } from '@/utils/watermarkUtils'
import dayjs from "@/utils/dayjs";

const fileListRef = ref([]);
const previews = ref([]);
const exportLoading = ref(false)


const backgroundPositonXOptions = [
    {
        label: '图左',
        value: 'left'
    },
    {
        label: '图中',
        value: 'center'
    },
    {
        label: '图右',
        value: 'right'
    }
]

const backgroundPositonYOptions = [
    {
        label: '上',
        value: 'top'
    },
    {
        label: '中',
        value: 'center'
    },
    {
        label: '下',
        value: 'bottom'
    }
]

const { paperState, onSetFace } = useWallpaper()
function handleUploadChange(data: { fileList: UploadFileInfo[] }) {
    fileListRef.value = data.fileList
    previews.value = []
}

async function dealWallpaper() {
    previews.value = []
    const processedPreviews = await Promise.all(fileListRef.value.map(processFile));
    const previewNames = new Set(previews.value.map(item => item.name));
    previews.value = previews.value.concat(processedPreviews.filter(item => !previewNames.has(item.name)));
    paperState.wallpaper = previews.value[0].src
    console.log(previews.value, "dealWallpaper");
    window.$logger?.picture(previews.value[0].src)

}
async function dealWaterMark(file) {
    const processedPreviews = await processFile(file[0]);
    paperState.waterMarkImage = processedPreviews.src
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
    const formattedDate = dayjs().format('YYYY-MM-DD'); // 使用 dayjs 格式化日期
    domtoimage.toPng(target, { useCORS: true, scale: 2 }).then(function (dataUrl) {
        console.log(dataUrl);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `bg-image-${formattedDate}.png`;
        link.click();
    }).finally(() => {
        exportLoading.value = false
    });
};
</script>