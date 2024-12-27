<template>
    <ColorBorder class="right-view-container">
        <n-spin :show="exportLoading">
            <div class="settings-scroll">
                <n-collapse :default-expanded-names="['1']">
                    <!-- 1. 基础操作组 -->
                    <n-collapse-item title="基础操作" name="1">
                        <n-space vertical>
                            <n-space>
                                <n-upload :show-file-list="false" multiple v-model:file-list="fileListRef"
                                    :on-update:file-list="dealWallpaper" @change="handleUploadChange">
                                    <button class="webkubor-back-btn common-btn">上传壁纸</button>
                                </n-upload>
                                <button class="webkubor-back-btn common-btn" @click="downloadBgImage">导出</button>
                                <button class="webkubor-back-btn common-btn" @click="getConfigHistory">读取配置</button>
                                <button class="webkubor-back-btn common-btn" @click="setConfigHistory">保存配置</button>
                            </n-space>
                        </n-space>
                    </n-collapse-item>

                    <!-- 2. 布局与样式设置组 -->
                    <n-collapse-item title="布局与样式" name="2">
                        <n-space vertical>
                            <n-form-item v-if="!paperState.wallpaperView" label="壁纸位置" label-placement="left">
                                <n-space vertical>
                                    <n-space>
                                        <n-select v-model:value="paperState.backgroundPositon.x" style="width: 100px;"
                                            placeholder="X轴偏移" :options="backgroundPositonXOptions" />
                                        <n-select v-model:value="paperState.backgroundPositon.y" style="width: 100px"
                                            placeholder="Y轴偏移" :options="backgroundPositonYOptions" />
                                    </n-space>
                                    <n-space>
                                        <n-checkbox v-model:checked="paperState.enableCrop">启用裁剪</n-checkbox>
                                        <n-button v-if="paperState.enableCrop" @click="openCropModal" size="small">
                                            裁剪图片
                                        </n-button>
                                    </n-space>
                                </n-space>
                            </n-form-item>

                            <n-form-item label="背景颜色" label-placement="left">
                                <n-color-picker v-model:value="paperState.bgColor" style="width: 300px;"
                                    :show-alpha="true" :actions="['clear']"
                                    :swatches="['#FFFFFF', '#18A058', '#2080F0', '#F0A020', 'rgba(208, 48, 80, 1)']" />
                            </n-form-item>

                            <n-form-item label="显示设置" label-placement="left">
                                <n-space>
                                    <n-checkbox v-if="!paperState.wallpaperView"
                                        v-model:checked="paperState.perspective">透视</n-checkbox>
                                    <n-checkbox v-model:checked="paperState.wallpaperView">纯背景</n-checkbox>
                                </n-space>
                            </n-form-item>

                            <n-form-item label="切换模式" label-placement="left">
                                <n-space>
                                    <button class="webkubor-back-btn" v-for="(item, index) in config.interfaces"
                                        @click="onSetFace(item)">
                                        {{ item.name }}
                                    </button>
                                </n-space>
                            </n-form-item>
                        </n-space>
                    </n-collapse-item>

                    <!-- 3. 水印与文字设置组 -->
                    <n-collapse-item title="水印与文字" name="3">
                        <n-space vertical>
                            <n-form-item label="水印文字" label-placement="left">
                                <n-input type="text" v-model:value="paperState.waterMarkName"
                                    placeholder="输入水印(Design by 司南烛)" />
                            </n-form-item>

                            <n-form-item label="水印颜色" label-placement="left">
                                <n-color-picker v-model:value="paperState.waterColor" style="width: 150px;"
                                    :show-alpha="true" :actions="['clear']" :swatches="['#FFFFFF', '#333333']" />
                            </n-form-item>

                            <n-form-item v-if="paperState.wallpaperView" label="标题设置" label-placement="left">
                                <n-space vertical>
                                    <n-space>
                                        <n-input type="text" v-model:value="paperState.customTitle" placeholder="输入标题文字" />
                                        <n-input-number v-model:value="paperState.titleFontSize" :min="12" :max="100"
                                            placeholder="字体大小" />
                                    </n-space>
                                    <n-radio-group v-model:value="paperState.titleVertical" name="titleDirection">
                                        <n-space>
                                            <n-radio :value="false">横排</n-radio>
                                            <n-radio :value="true">竖排</n-radio>
                                        </n-space>
                                    </n-radio-group>
                                </n-space>
                            </n-form-item>

                            <n-form-item label="标题颜色" label-placement="left" v-if="paperState.wallpaperView">
                                <n-color-picker v-model:value="paperState.fontColor" style="width: 150px;"
                                    :show-alpha="true" :actions="['clear']"
                                    :swatches="['#FFFFFF', '#333333', '#EE5A5AD9']" />
                            </n-form-item>

                            <n-form-item label="字体选择" label-placement="left">
                                <n-select v-model:value="paperState.waterFontFiamily" placeholder="请选择字体"
                                    :options="fontOptions" />
                            </n-form-item>

                            <n-form-item label="图片水印" label-placement="left">
                                <n-upload list-type="image-card" :on-update:file-list="dealWaterMark">
                                    点击上传
                                </n-upload>
                            </n-form-item>
                        </n-space>
                    </n-collapse-item>

                    <!-- 4. 导出设置组 -->
                    <n-collapse-item title="导出设置" name="4">
                        <n-form-item label="导出名称" label-placement="left">
                            <n-input type="text" v-model:value="exportName" placeholder="默认日期" />
                        </n-form-item>

                        <n-form-item label="导出比例" label-placement="left">
                            <n-radio-group v-model:value="paperState.proportion" name="radiogroup">
                                <n-space>
                                    <n-radio :value="1">1 : 1</n-radio>
                                    <n-radio :value="2">3 : 4</n-radio>
                                    <n-radio :value="3">4 : 3</n-radio>
                                </n-space>
                            </n-radio-group>
                        </n-form-item>
                    </n-collapse-item>
                </n-collapse>
            </div>

            <template #description>
                导出中.......
            </template>
        </n-spin>
    </ColorBorder>

    <!-- 添加裁剪弹窗 -->
    <n-modal v-model:show="showCropModal" preset="card" style="width: 800px">
        <vue-cropper
            ref="cropperRef"
            :src="paperState.wallpaper"
            :aspect-ratio="getCropAspectRatio()"
            @crop-success="cropSuccess"
        />
        <template #footer>
            <n-space justify="end">
                <n-button @click="showCropModal = false">取消</n-button>
                <n-button type="primary" @click="confirmCrop">确认</n-button>
            </n-space>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, watchEffect } from "vue";
import type { UploadFileInfo } from 'naive-ui'
import { useWallpaper } from "../useWallpaper"
import config from "../config.json"
import domtoimage from 'dom-to-image-more';
import { getPreviewUrl, canvasToImg, imgToCanvas } from '@/utils/watermarkUtils'
import dayjs from "@/utils/dayjs";
import { useDraggable } from '@vueuse/core'
import VueCropper from 'vue-cropper'
import 'vue-cropper/dist/index.css'

const fileListRef = ref([]);
const exportName = ref('')
const exportLoading = ref(false)
const { paperState, onSetFace, getConfigHistory, setConfigHistory, fontOptions, backgroundPositonXOptions, backgroundPositonYOptions } = useWallpaper()

const titleRef = ref<HTMLElement | null>(null)
const initialPosition = reactive({ x: 100, y: 100 })

watchEffect(() => {
    if (titleRef.value) {
        const { x, y } = useDraggable(titleRef.value, {
            initialValue: initialPosition,
        })

        titleRef.value.style.transform = `translate(${x.value}px, ${y.value}px)`
    }
})

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
    const formattedDate = exportName.value || dayjs().format('YYYY-MM-DD HH:mm'); // 2021-09-01 12:00
    domtoimage.toPng(target, { useCORS: true, scale: 3 }).then(function (dataUrl) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `wallpaper-${formattedDate}.png`;
        link.click();
    }).finally(() => {
        exportLoading.value = false
    });
};

const showCropModal = ref(false)
const cropperRef = ref()

const openCropModal = () => {
    showCropModal.value = true
}

const getCropAspectRatio = () => {
    switch (paperState.proportion) {
        case 1: return 1
        case 2: return 3/4
        case 3: return 4/3
        default: return undefined
    }
}

const cropSuccess = (imgData: string) => {
    paperState.wallpaper = imgData
}

const confirmCrop = () => {
    cropperRef.value?.getCropData((data: string) => {
        cropSuccess(data)
        showCropModal.value = false
    })
}
</script>

<style lang="scss" scoped>
.right-view-container {
    height: 100%; // 继承父容器高度
    display: flex;
    flex-direction: column;

    .settings-scroll {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 16px; // 为滚动条预留空间
        height: calc(100vh - 120px); // 减去头部和其他固定元素的高度

        // 美化滚动条
        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 3px;

            &:hover {
                background-color: rgba(0, 0, 0, 0.3);
            }
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
        }

        // 设置内部卡片的边距
        :deep(.n-card) {
            margin-bottom: 16px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>