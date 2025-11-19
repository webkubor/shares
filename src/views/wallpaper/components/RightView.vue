<template>
    <ColorBorder :class="['right-view-container', $attrs.class]">
      <div class="settings-scroll">
        <details open>
          <summary>基础操作</summary>
          <div class="space-v">
            <div class="space-h">
              <input type="file" multiple @change="handleUploadChangeNative" />
              <button class="webkubor-back-btn common-btn" @click="downloadBgImage">导出</button>
              <button class="webkubor-back-btn common-btn" @click="getConfigHistory">读取配置</button>
              <button class="webkubor-back-btn common-btn" @click="setConfigHistory">保存配置</button>
            </div>
          </div>
        </details>

        <details>
          <summary>布局与样式</summary>
          <div class="space-v">
            <div class="form-item">
              <label>壁纸位置</label>
              <div class="space-v">
                <div v-if="paperState.wallpaperView" class="space-h">
                  <label><input type="checkbox" v-model="paperState.enableCrop" /> 启用裁剪</label>
                  <button v-if="paperState.enableCrop" @click="openCropModal" data-size="sm">裁剪图片</button>
                </div>
                <div v-else class="space-h">
                  <select v-model="paperState.backgroundPositon.x" style="width: 120px">
                    <option v-for="opt in backgroundPositonXOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </select>
                  <select v-model="paperState.backgroundPositon.y" style="width: 120px">
                    <option v-for="opt in backgroundPositonYOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-item">
              <label>背景颜色</label>
              <input type="color" v-model="paperState.bgColor" />
            </div>

            <div class="form-item">
              <label>显示设置</label>
              <div class="space-h">
                <label v-if="!paperState.wallpaperView"><input type="checkbox" v-model="paperState.perspective" /> 透视</label>
                <label><input type="checkbox" v-model="paperState.wallpaperView" /> 纯背景</label>
              </div>
            </div>

            <div class="form-item">
              <label>切换模式</label>
              <div class="space-h">
                <button class="webkubor-back-btn" v-for="(item, index) in config.interfaces" :key="item.name + index" @click="onSetFace(item)">{{ item.name }}</button>
              </div>
            </div>
          </div>
        </details>

        <details>
          <summary>水印与文字</summary>
          <div class="space-v">
            <div class="form-item">
              <label>水印文字</label>
              <input type="text" v-model="paperState.waterMarkName" placeholder="输入水印(Design by 司南烛)" />
            </div>
            <div class="form-item">
              <label>水印颜色</label>
              <input type="color" v-model="paperState.waterColor" />
            </div>
            <div class="form-item">
              <label>水印透明度</label>
              <input type="range" v-model="paperState.watermarkOpacity" step="0.1" min="0" max="1" />
            </div>
            <div class="form-item" v-if="paperState.wallpaperView">
              <label>标题设置</label>
              <div class="space-h">
                <input type="text" v-model="paperState.customTitle" placeholder="输入标题文字" />
                <input type="number" v-model="paperState.titleFontSize" min="12" max="100" placeholder="字体大小" />
              </div>
              <div class="space-h">
                <label><input type="radio" value="horizontal" v-model="paperState.titleVertical" /> 横排</label>
                <label><input type="radio" value="vertical" v-model="paperState.titleVertical" /> 竖排</label>
              </div>
            </div>
            <div class="form-item" v-if="paperState.wallpaperView">
              <label>标题颜色</label>
              <input type="color" v-model="paperState.titleColor" />
            </div>
            <div class="form-item">
              <label>字体选择</label>
              <select v-model="paperState.waterFontFiamily">
                <option v-for="opt in fontOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="form-item">
              <label>图片水印</label>
              <input type="file" accept="image/*" @change="dealWaterMarkNative" />
            </div>
          </div>
        </details>

        <details>
          <summary>导出设置</summary>
          <div class="form-item">
            <label>导出名称</label>
            <input type="text" v-model="exportName" placeholder="默认日期" />
          </div>
          <div class="form-item">
            <label>导出比例</label>
            <div class="space-h">
              <label><input type="radio" :value="1" v-model="paperState.proportion" /> 1 : 1</label>
              <label><input type="radio" :value="2" v-model="paperState.proportion" /> 3 : 4</label>
              <label><input type="radio" :value="3" v-model="paperState.proportion" /> 4 : 3</label>
            </div>
          </div>
        </details>
      </div>

      <div v-if="exportLoading" class="export-overlay">导出中.......</div>
    </ColorBorder>

    <!-- 添加裁剪弹窗 -->
    <div v-if="showCropModal" class="modal-overlay" @click.self="showCropModal = false">
      <div class="modal-card">
        <div class="cropper-container">
            <VueCropper
                v-if="showCropModal && paperState.wallpaper"
                ref="cropperRef"
                :img="paperState.wallpaper"
                :aspect-ratio="getCropAspectRatio()"
                @crop-success="cropSuccess"
                :auto-crop="true"
                :center-box="true"
                :info="true"
                :full="true"
                :canvas-background="paperState.bgColor"
                mode="contain"
                :output-size="1"
                :output-type="'png'"
            />
        </div>
        <div class="modal-footer">
          <button @click="showCropModal = false">取消</button>
          <button data-variant="primary" @click="confirmCrop">确认</button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, watchEffect } from "vue";
import { useWallpaper } from "@/hooks/useWallpaper"
import config from "../config.json"
import domtoimage from 'dom-to-image-more';
import { getPreviewUrl, canvasToImg, imgToCanvas } from '@/utils/watermarkUtils'
import dayjs from "@/utils/dayjs";
import { useDraggable } from '@vueuse/core'
import { VueCropper } from 'vue-cropper'
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

// 移除同步颜色的watchEffect，确保水印颜色和标题颜色可以独立设置

function handleUploadChangeNative(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files || [])
  fileListRef.value = files.map(f => ({ file: f, name: f.name }))
  paperState.previews = []
}

async function dealWallpaper() {
    const processedPreviews = await Promise.all(fileListRef.value.map(processFile));
    const previewNames = new Set(paperState.previews.map(item => item.name));
    paperState.previews = paperState.previews.concat(processedPreviews.filter(item => !previewNames.has(item.name)));
    const lastPreview = paperState.previews[paperState.previews.length - 1];
    paperState.wallpaper = lastPreview.src;
    // 显示上传的壁纸图片文件名
    window.$message?.success(`已上传壁纸图片: ${lastPreview.name}`);
    // 设置标题内容默认为上传图片的名字
    paperState.customTitle = lastPreview.name.split('.')[0]; // 去掉文件后缀名
    console.log(paperState.previews, "dealWallpaper");
}
async function dealWaterMarkNative(e: Event) {
    const input = e.target as HTMLInputElement
    const files = Array.from(input.files || [])
    const processedPreviews = await processFile({ file: files[0], name: files[0]?.name || 'watermark' });
    paperState.waterMarkImage = processedPreviews.src;
    window.$message?.success(`已上传水印图片: ${processedPreviews.name}`);
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
    if (!paperState.wallpaper) {
        // 如果没有壁纸，给出提示
        window.$message?.warning('请先上传壁纸')
        return
    }
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
    console.log('裁剪成功')
    paperState.wallpaper = imgData
}

const confirmCrop = () => {
    if (!cropperRef.value) return
    cropperRef.value.getCropData((data: string) => {
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

        .form-item { margin-bottom: 16px; display: grid; grid-template-columns: 120px 1fr; align-items: center; gap: 12px; }
        .space-h { display: flex; gap: 12px; align-items: center; }
        .space-v { display: flex; flex-direction: column; gap: 12px; }
    }
}

.cropper-container {
    height: 500px;
    width: 100%;
    background: #f0f0f0;
    
    :deep(.vue-cropper) {
        height: 100%;
        width: 100%;
    }
}
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-card { width: 800px; background: var(--bg-elevated); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 12px 40px var(--shadow-color); overflow: hidden; }
.modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding: 12px; border-top: 1px solid var(--border-color); }
.export-overlay { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.35); color: #fff; font-weight: 700; z-index: 999; }

details { background: var(--bg-elevated); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 4px 16px var(--shadow-color); margin-bottom: 16px; }
summary { cursor: pointer; padding: 12px 16px; font-weight: 600; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
details[open] summary { color: var(--color-primary); }
details > div { padding: 12px 16px; }
</style>