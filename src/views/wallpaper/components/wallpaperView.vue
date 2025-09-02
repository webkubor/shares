<template>
    <div class="wallpaper-box" :style="{ width: `${phoneSize?.width}`, height: `${phoneSize?.height}` }">
        <div class="wallpaper-container">
            <img v-if="paperState.wallpaper" :src="paperState.wallpaper" alt="wallpaper" />
            <span v-else>请上传图片</span>
        </div>
        <div class="water-mark" :style="{ color: paperState.waterColor, fontFamily: paperState.waterFontFiamily }">
            <img v-if="paperState.waterMarkImage" :src="paperState.waterMarkImage" alt="" srcset="">
            {{ paperState.waterMarkName }}
        </div>
        <div v-if="paperState.wallpaperView && paperState.customTitle" 
             ref="titleRef"
             class="draggable-title"
             :class="{ 'is-dragging': isDragging }"
             :style="{
                 color: paperState.waterColor,
                 fontFamily: paperState.waterFontFiamily,
                 fontSize: `${paperState.titleFontSize || 24}px`,
                 writingMode: paperState.titleVertical === 'vertical' ? 'vertical-rl' : 'horizontal-tb'
             }">
            {{ paperState.customTitle }}
            <div class="control-panel">
                <div class="control-item" @click="toggleTitleDirection">
                    <i class="iconfont" :class="paperState.titleVertical === 'vertical' ? 'icon-horizontal' : 'icon-vertical'"></i>
                    <span class="tip">{{ paperState.titleVertical === 'vertical' ? '切换横排' : '切换竖排' }}</span>
                </div>
                <div class="drag-handle">
                    <div class="drag-icon">⋮⋮</div>
                    <span class="drag-tip">拖动调整位置</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useWallpaper } from "@/hooks/useWallpaper"
import { useGlobal } from "@/hooks/useGlobal";
import { computed, ref, onMounted, watch } from "vue";
import { useDraggable } from '@vueuse/core'

const { appConfig } = useGlobal()
const { paperState, transExportSize } = useWallpaper()
const titleRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

// 初始化拖拽功能
const initDraggable = () => {
    if (titleRef.value) {
        const { style } = titleRef.value
        useDraggable(titleRef.value, {
            initialValue: { x: 50, y: 50 },
            onStart() {
                isDragging.value = true
            },
            onMove(position, event) {
                const containerRect = titleRef.value?.parentElement?.getBoundingClientRect()
                const titleRect = titleRef.value?.getBoundingClientRect()
                
                if (containerRect && titleRect) {
                    const maxX = containerRect.width - titleRect.width
                    const maxY = containerRect.height - titleRect.height
                    
                    // 限制在容器内
                    const x = Math.min(Math.max(position.x, 0), maxX)
                    const y = Math.min(Math.max(position.y, 0), maxY)
                    
                    style.left = `${x}px`
                    style.top = `${y}px`
                }
            },
            onEnd() {
                isDragging.value = false
            }
        })
    }
}

// 监听 customTitle 变化
watch(() => paperState.customTitle, (newVal) => {
    if (newVal) {
        // 等待DOM更新后初始化拖拽
        setTimeout(() => {
            initDraggable()
        }, 100)
    }
}, { immediate: true })

// 组件挂载后初始化拖拽
onMounted(() => {
    if (paperState.customTitle && titleRef.value) {
        initDraggable()
    }
})

const phoneSize = computed(() => {
    if (appConfig.isPcModel) {
        return transExportSize(250)
    } else {
        return {
            width: '100%',
            height: '80vh'
        }
    }
})

const toggleTitleDirection = () => {
    // 在'horizontal'和'vertical'之间切换
    paperState.titleVertical = paperState.titleVertical === 'vertical' ? 'horizontal' : 'vertical'
}
</script>
<style lang="scss" scoped>
.wallpaper-box {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333333;
    position: relative;

    .wallpaper-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none; // 禁止图片容器接收鼠标事件
        color: $default-primary;
        span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .water-mark {
        opacity: 0.8; // 半透明效果
        position: absolute;
        bottom: 60px;
        left: 50%;
        font-weight: 800;
        font-size: clamp(16px, 1.5vw, 20px); // 动态字体大小
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); // 添加阴影
        z-index: 50;

        img {
            height: 30px;
            margin: 10px;
            
        }
    }
}


@media screen and (max-width: 400px) {
    .wallpaper-box {
        .water-mark {
            font-size: clamp(12px, 1.8vw, 16px);
            bottom: 20px;
        }
    }
}

.draggable-title {
    position: absolute;
    cursor: move;
    user-select: none;
    z-index: 1000;
    left: 50px;
    top: 50px;
    pointer-events: auto;
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        
        .drag-handle {
            opacity: 1;
        }
    }

    &.is-dragging {
        background-color: rgba(0, 0, 0, 0.15);
        .drag-handle {
            opacity: 1;
        }
    }

    .drag-handle {
        opacity: 0;
        position: absolute;
        right: -30px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        transition: opacity 0.3s;
        
        .drag-icon {
            font-size: 20px;
            color: rgba(0, 0, 0, 0.5);
            margin-right: 4px;
            writing-mode: vertical-lr;
            line-height: 1;
        }

        .drag-tip {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.5);
            white-space: nowrap;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 2px 6px;
            border-radius: 2px;
        }
    }

    .control-panel {
        position: absolute;
        right: -40px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .control-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        
        .iconfont {
            font-size: 20px;
            color: rgba(0, 0, 0, 0.5);
            margin-right: 4px;
        }

        .tip {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.5);
            white-space: nowrap;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 2px 6px;
            border-radius: 2px;
            display: none;
        }

        &:hover .tip {
            display: block;
        }
    }

    &:hover .control-panel {
        opacity: 1;
    }
}
</style>