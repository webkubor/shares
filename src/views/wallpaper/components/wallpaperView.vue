<template>
    <div class="wallpaper-box" :style="{ width: `${phoneSize?.width}`, height: `${phoneSize?.height}` }">
        <div class="wallpaper-container">
            <img v-if="paperState.wallpaper" :src="paperState.wallpaper" alt="wallpaper" />
            <span v-else>请上传图片</span>
        </div>
        <div ref="waterMarkRef" 
             class="water-mark draggable-watermark" 
             :class="{ 'is-dragging': isWaterMarkDragging }" 
             :style="{ 
                color: paperState.waterColor, 
                fontFamily: paperState.waterFontFiamily, 
                opacity: paperState.watermarkOpacity,
                left: `${paperState.waterMarkPosition.x}px`,
                top: `${paperState.waterMarkPosition.y}px`,
                transform: 'none'
             }">
            <img v-if="paperState.waterMarkImage" :src="paperState.waterMarkImage" alt="" srcset="">
            {{ paperState.waterMarkName }}
            <div class="drag-handle watermark-drag-handle">
                <div class="drag-icon">⋮⋮</div>
                <span class="drag-tip">拖动调整水印位置</span>
            </div>
        </div>
        <div v-if="paperState.wallpaperView && paperState.customTitle" 
             ref="titleRef"
             class="draggable-title"
             :class="{ 'is-dragging': isDragging }"
             :style="{
                 color: paperState.titleColor,
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
const waterMarkRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const isWaterMarkDragging = ref(false)

// 自定义拖拽实现
const mouseOffset = ref({ x: 0, y: 0 })
const isMouseDown = ref(false)
const isWaterMarkMouseDown = ref(false)

// 初始化拖拽功能
const initDraggable = () => {
    if (!titleRef.value) return
    
    // 设置初始位置，如果没有设置过
    if (!titleRef.value.style.left) {
        titleRef.value.style.left = '50px'
    }
    if (!titleRef.value.style.top) {
        titleRef.value.style.top = '50px'
    }
    
    // 鼠标按下事件
    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (!titleRef.value) return
        
        isMouseDown.value = true
        isDragging.value = true
        
        // 计算鼠标与元素左上角的偏移量
        const rect = titleRef.value.getBoundingClientRect()
        mouseOffset.value = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
        
        // 添加全局事件监听
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }
    
    // 鼠标移动事件
    const handleMouseMove = (e: MouseEvent) => {
        if (!isMouseDown.value || !titleRef.value) return
        
        const containerRect = titleRef.value.parentElement?.getBoundingClientRect()
        if (!containerRect) return
        
        // 计算新位置，考虑鼠标与元素的偏移
        const newLeft = e.clientX - containerRect.left - mouseOffset.value.x
        const newTop = e.clientY - containerRect.top - mouseOffset.value.y
        
        // 限制在容器内
        const titleRect = titleRef.value.getBoundingClientRect()
        const maxX = containerRect.width - titleRect.width
        const maxY = containerRect.height - titleRect.height
        
        titleRef.value.style.left = `${Math.min(Math.max(newLeft, 0), maxX)}px`
        titleRef.value.style.top = `${Math.min(Math.max(newTop, 0), maxY)}px`
    }
    
    // 鼠标松开事件
    const handleMouseUp = () => {
        isMouseDown.value = false
        isDragging.value = false
        
        // 移除全局事件监听
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }
    
    // 添加鼠标按下事件监听
    titleRef.value.addEventListener('mousedown', handleMouseDown)
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

// 水印拖拽功能初始化
const initWaterMarkDraggable = () => {
    if (!waterMarkRef.value) return
    
    // 鼠标按下事件
    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (!waterMarkRef.value) return
        
        isWaterMarkMouseDown.value = true
        isWaterMarkDragging.value = true
        
        // 计算鼠标与元素左上角的偏移量
        const rect = waterMarkRef.value.getBoundingClientRect()
        mouseOffset.value = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
        
        // 添加全局事件监听
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }
    
    // 鼠标移动事件
    const handleMouseMove = (e: MouseEvent) => {
        if (!isWaterMarkMouseDown.value || !waterMarkRef.value) return
        
        const containerRect = waterMarkRef.value.parentElement?.getBoundingClientRect()
        if (!containerRect) return
        
        // 计算新位置，考虑鼠标与元素的偏移
        const newLeft = e.clientX - containerRect.left - mouseOffset.value.x
        const newTop = e.clientY - containerRect.top - mouseOffset.value.y
        
        // 限制在容器内
        const waterMarkRect = waterMarkRef.value.getBoundingClientRect()
        const maxX = containerRect.width - waterMarkRect.width
        const maxY = containerRect.height - waterMarkRect.height
        
        // 更新水印位置状态
        paperState.waterMarkPosition.x = Math.min(Math.max(newLeft, 0), maxX)
        paperState.waterMarkPosition.y = Math.min(Math.max(newTop, 0), maxY)
    }
    
    // 鼠标松开事件
    const handleMouseUp = () => {
        isWaterMarkMouseDown.value = false
        isWaterMarkDragging.value = false
        
        // 移除全局事件监听
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }
    
    // 添加鼠标按下事件监听
    waterMarkRef.value.addEventListener('mousedown', handleMouseDown)
}

// 组件挂载后初始化拖拽
onMounted(() => {
    if (paperState.customTitle && titleRef.value) {
        initDraggable()
    }
    
    // 初始化水印拖拽
    if (waterMarkRef.value) {
        initWaterMarkDraggable()
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
        font-weight: 800;
        font-size: clamp(16px, 1.5vw, 20px); // 动态字体大小
        display: flex;
        flex-direction: column;
        align-items: center;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); // 添加阴影
        z-index: 50;

        img {
            height: 30px;
            margin: 10px;
        }
        
        &.draggable-watermark {
            cursor: move;
            user-select: none;
            padding: 8px;
            border-radius: 4px;
            transition: background-color 0.3s;
            
            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
                
                .watermark-drag-handle {
                    opacity: 1;
                }
            }
            
            &.is-dragging {
                background-color: rgba(0, 0, 0, 0.15);
                .watermark-drag-handle {
                    opacity: 1;
                }
            }
        }
        
        .watermark-drag-handle {
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