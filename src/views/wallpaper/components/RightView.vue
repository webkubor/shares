<template>
    <ColorBorder>
        <n-spin :show="exportLoading">
            <n-space>
                <n-upload :show-file-list="false" multiple v-model:file-list="fileListRef"
                    :on-update:file-list="dealWallpaper" @change="handleUploadChange">
                    <button class="webkubor-back-btn common-btn">上传壁纸</button>
                </n-upload>
                <button class="webkubor-back-btn common-btn" @click="downloadBgImage">导出</button>
            </n-space>

            <n-form-item v-if="!paperState.wallpaperView" label="壁纸位置" label-placement="left" style="margin-top: 20px;">
                <n-space>
                    <n-select v-model:value="paperState.backgroundPositon.x" style="width: 100px;" placeholder="X轴偏移"
                        :options="backgroundPositonXOptions" />
                    <n-select v-model:value="paperState.backgroundPositon.y" style="width: 100px" placeholder="Y轴偏移"
                        :options="backgroundPositonYOptions" />
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
                <n-checkbox v-if="!paperState.wallpaperView" v-model:checked="paperState.perspective">
                    透视
                </n-checkbox>
                <n-checkbox v-model:checked="paperState.wallpaperView">
                    纯背景
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
            <n-form-item label="水印字体" label-placement="left">
                <n-select v-model:value="paperState.waterFontFiamily" placeholder="请选择字体" :options="fontOptions">
                </n-select>
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
            <n-form-item label="本地配置" label-placement="left">
                <n-space>
                    <button class="webkubor-back-btn common-btn" @click="getConfigHistory">读取</button>
                    <button class="webkubor-back-btn common-btn" @click="setConfigHistory">保存/更新</button>
                </n-space>
            </n-form-item>
            <template #description>
                导出中.......
            </template>
        </n-spin>
    </ColorBorder>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw, watchEffect } from "vue";
import type { UploadFileInfo } from 'naive-ui'
import { useWallpaper } from "../useWallpaper"
import config from "../config.json"
import domtoimage from 'dom-to-image-more';
import { getPreviewUrl, canvasToImg, imgToCanvas } from '@/utils/watermarkUtils'
import dayjs from "@/utils/dayjs";

const fileListRef = ref([]);
const exportLoading = ref(false)
const { paperState, onSetFace, getConfigHistory, setConfigHistory, fontOptions, backgroundPositonXOptions, backgroundPositonYOptions } = useWallpaper()

watchEffect(() => {
    if (paperState.fontColor) {
        paperState.waterColor = paperState.fontColor
    }
})

function handleUploadChange(data: { fileList: UploadFileInfo[] }) {
    fileListRef.value = data.fileList
    paperState.previews = []
}

async function dealWallpaper() {
    const processedPreviews = await Promise.all(fileListRef.value.map(processFile));
    const previewNames = new Set(paperState.previews.map(item => item.name));
    paperState.previews = paperState.previews.concat(processedPreviews.filter(item => !previewNames.has(item.name)));
    paperState.wallpaper = paperState.previews[paperState.previews.length - 1].src
    console.log(paperState.previews, "dealWallpaper");
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


const renderDom = () => {
    if (paperState.wallpaperView) {
        return document.getElementById('wallpaper-view') as HTMLDivElement
    } else {
        return document.getElementById('phone-view') as HTMLDivElement
    }

}


const downloadBgImage = async () => {
    let target = renderDom() as HTMLDivElement
    console.log(target.offsetWidth, target.offsetHeight);
    exportLoading.value = true
    const formattedDate = dayjs().format('YYYY-MM-DD HH:mm'); // 2021-09-01 12:00
    domtoimage.toPng(target, { useCORS: true, scale: 3 }).then(function (dataUrl) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `wallpaper-${formattedDate}.png`;
        link.click();
    }).finally(() => {
        exportLoading.value = false
    });
};
</script>