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
             @mousedown.stop="isDragging = true"
             @mouseup.stop="isDragging = false"
             :class="{ 'is-dragging': isDragging }"
             :style="{
                 color: paperState.waterColor,
                 fontFamily: paperState.waterFontFiamily,
                 fontSize: `${paperState.titleFontSize || 24}px`
             }">
            {{ paperState.customTitle }}
            <div class="drag-handle">
                <div class="drag-icon">⋮⋮</div>
                <span class="drag-tip">拖动调整位置</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useWallpaper } from "../useWallpaper"
import { useGlobal } from "@/hooks/useGlobal";
import { computed, ref, onMounted, watch } from "vue";
import { useDraggable } from '@vueuse/core'

const { appConfig } = useGlobal()
const { paperState, transExportSize } = useWallpaper()
const titleRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

// 监听 paperState.customTitle 的变化
watch(() => paperState.customTitle, (newVal) => {
    if (newVal && titleRef.value) {
        const { style } = titleRef.value
        useDraggable(titleRef.value, {
            initialValue: { x: 50, y: 50 },
            onMove(position, event) {
                const containerRect = titleRef.value?.parentElement?.getBoundingClientRect()
                const titleRect = titleRef.value?.getBoundingClientRect()
                
                console.log({
                    mouseY: event.clientY,
                    containerTop: containerRect?.top,
                    relativeY: event.clientY - (containerRect?.top || 0),
                    position
                })

                if (containerRect && titleRect) {
                    const maxY = containerRect.height - titleRect.height
                    // 计算相对于容器的Y坐标
                    const relativeY = event.clientY - containerRect.top
                    const y = Math.min(Math.max(relativeY, 0), maxY)
                    
                    style.left = `${position.x}px`
                    style.top = `${y}px`
                }
            },
            onEnd() {
                isDragging.value = false
            }
        })
    }
}, { immediate: true })

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
}
</style>