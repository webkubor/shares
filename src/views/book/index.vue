<template>
  

    <div class="actions-view">
        <n-card title="操作">
            <n-form-item label="文案内容" label-placement="left">
                <n-input v-model:value="bookState.content" placeholder="请输入文案内容" type="textarea" autosize show-count
                    clearable />
            </n-form-item>
            <n-form-item label="引用来源" label-placement="left">
                <n-input type="text" v-model:value="bookState.more" placeholder="引用来源(可不填)" show-count clearable />
            </n-form-item>
            <n-space>
                <n-form-item label="底部背景" label-placement="left">
                <n-color-picker v-model:value="config.bgColor" style="width: 150px;" :show-alpha="true"
                    :actions="['clear']" :swatches="['#fddde6', '#f2b5d4', '#faf3e0', '#a3d9a5', '#f5f5dc']" />
            </n-form-item>
            <n-form-item label="字体选择" label-placement="left">
                <n-select v-model:value="config.fontFamily" placeholder="请选择字体" :options="fontOptions"
                    style="width: 200px;" />
            </n-form-item>
            <n-form-item label="字体颜色" label-placement="left">
                <n-color-picker v-model:value="config.fontColor" style="width: 150px;" :show-alpha="true"
                    :actions="['clear']" :swatches="['#2c2c2c', '#333333', '#4a4a4a', '#101820', '#f5f5dc']" />
            </n-form-item>
            </n-space>
       
            <n-space justify="end">
                <button class="webkubor-back-btn common-btn" @click="resetConfig">Reset</button>
                <button class="webkubor-back-btn common-btn" @click="downloadBgImage">导出</button>
            </n-space>

        </n-card>
    </div>
    <div id="book-view" class="book-view"
        :style="{ fontFamily: config.fontFamily, background: config.bgColor, color: config.fontColor }">
        <div class="main">
            {{ bookState.content }}
            <div class="more" v-if="bookState.more">
                {{ bookState.more }}
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { reactive,ref } from 'vue';
import { useWallpaper } from "@/hooks/useWallpaper"
import dayjs from "@/utils/dayjs";
import domtoimage from 'dom-to-image-more';
const { fontOptions } = useWallpaper()

let exportLoading = ref(false)
let bookState = reactive({
    content: '愿中国青年都摆脱冷气，只是向上走，不必听自暴自弃者流的话。能做事的做事，能发声的发声。有一分热，发一分光，就令萤火一般，也可以在黑暗里发一点光，不必等候炬火。',
    more: '鲁迅'
})


let config = reactive({
    bgColor: '#fffff0',
    fontColor: "#333333",
    fontFamily: 'Chinese3',
})


const resetConfig = () => {
    config.bgColor = '#fffff0';
    config.fontColor = '#333333';
    config.fontFamily = 'Chinese3';
    bookState.content = '...';
    bookState.more = '...';
};

const downloadBgImage = async () => {
    let target = document.getElementById('book-view') as HTMLDivElement as HTMLDivElement
    console.log(target.offsetWidth, target.offsetHeight);
    exportLoading.value = true
    const formattedDate =  dayjs().format('YYYY-MM-DD HH:mm'); // 2021-09-01 12:00
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
<style lang="scss" scoped>
.book-view {
    min-height: 40vh; // 保证视图高度适应不同设备
    margin: 20px auto 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 75%;
    font-weight: 500;
    font-size: clamp(12px, 1.8vw, 18px); // 主内容字体大小范围
    .main {
        width: 100%; // 自适应宽度，避免硬编码
        max-width: 60vw; // 设置最大宽度，限制主内容区域大小
        text-align: left;
        background: rgba(255, 255, 255, 0.75); // 替代玻璃效果，可以结合 backdrop-filter
        backdrop-filter: blur(20px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); // 增加立体感
        border-radius: 12px; // 增加圆角
        padding: 20px;
        transition: all 0.3s ease-in-out; // 过渡动画

        .more {
            width: 100%;
            text-align: right;
            font-style: italic; // 引用来源用斜体显示更显优雅
            color: rgba(0, 0, 0, 0.6); // 降低对比度以区分主内容
        }
    }
}

.actions-view {
    margin: 20px auto;
    width: 100%; // 自适应布局
    max-width: 75%; // 限制最大宽度
    display: flex;
    flex-wrap: wrap; // 支持多列布局
    justify-content: space-between; // 均匀分布内容
    gap: 16px; // 增加组件间距
}

@media (max-width: 768px) {
    .book-view {
        width: 90%;
        .main {
            max-width: 100%; // 移动端取消宽度限制
        }
    }

    .actions-view {
        flex-direction: column; // 垂直布局
        align-items: center;
    }
}
</style>