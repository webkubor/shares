<template>
    <div class="color-palette-container" :class="theme === '1' ? 'dark-theme' : 'light-theme'">
        <!-- 顶部预览区域 -->
        <n-card class="preview-card" :style="{ 
            background: theme === '1' ? '#1a1a1a' : '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 8px 30px ' + (confirmColor || '#18a058') + '40',
            border: '1px solid ' + (confirmColor || '#18a058') + '30',
            transition: 'all 0.3s ease'
        }">
            <div class="header-section">
                <div class="title-section">
                    <div :class="titleClass" :style="{
                        borderLeft: '4px solid ' + (confirmColor || '#18a058'),
                        paddingLeft: '16px',
                        transition: 'all 0.3s ease'
                    }">
                        Color <span class="more" :style="{ color: confirmColor || '#18a058' }">Palette</span> 
                    </div>
                    <div class="color-code" :style="{ color: confirmColor || '#18a058' }">
                        {{ confirmColor || '#18a058' }}
                    </div>
                </div>
                
                <n-switch v-model:value="theme" checked-value="1" unchecked-value="0" :rail-style="railStyle" class="theme-switch">
                    <template #checked>
                        <span class="switch-label">暗黑模式</span>
                    </template>
                    <template #unchecked>
                        <span class="switch-label">浅色模式</span>
                    </template>
                </n-switch>
            </div>
            
            <div class="preview-section">
                <div class="color-preview" :style="{ backgroundColor: confirmColor || '#18a058' }"></div>
                <div class="button-showcase">
                    <n-button :color="confirmColor" class="showcase-button">模板按钮</n-button>
                    <n-button dashed :color="confirmColor" class="showcase-button">Dashed</n-button>
                    <n-button ghost :color="confirmColor" class="showcase-button">Ghost</n-button>
                    <n-button tertiary :color="confirmColor" class="showcase-button">Tertiary</n-button>
                    <div class="text-showcase" :style="{ color: confirmColor || '#18a058' }">这是一段使用当前颜色的文字</div>
                </div>
            </div>
        </n-card>
        <!-- 颜色选择区域 -->
        <div class="color-selection-container">
            <!-- 自定义颜色选择器 -->
            <n-card class="selection-card" title="自定义颜色" :bordered="false">
                <template #header-extra>
                    <n-button tertiary :color="confirmColor" @click="onCollect('0')" class="collapse-button">
                        {{ closeList.includes('0') ? '展开' : '收起' }}
                    </n-button>
                </template>
                <div class="custom-color-panel" v-if="!closeList.includes('0')">
                    <div class="color-picker-container">
                        <div class="picker-section">
                            <n-color-picker 
                                v-model:value="customColor" 
                                :show-alpha="false" 
                                size="large" 
                                @update:value="onCustomColorChange"
                                class="color-picker"
                            />
                        </div>
                        <div class="custom-color-preview">
                            <div class="preview-box" :style="{ backgroundColor: customColor }"></div>
                            <div class="color-info">
                                <div class="color-value">{{ customColor }}</div>
                                <n-button 
                                    size="large" 
                                    @click="onConfirm(customColor)"
                                    class="apply-button"
                                    :style="{
                                        backgroundColor: confirmColor || '#18a058'
                                    }"
                                >应用此颜色</n-button>
                            </div>
                        </div>
                    </div>
                </div>
            </n-card>
            
            <!-- 基础色板 -->
            <n-card class="selection-card" title="基础色板" :bordered="false">
                <template #header-extra>
                    <n-button tertiary :color="confirmColor" @click="onCollect('1')" class="collapse-button">
                        {{ closeList.includes('1') ? '展开' : '收起' }}
                    </n-button>
                </template>
                <div class="color-grid" v-if="!closeList.includes('1')">
                    <div class="color-grid-item" 
                         v-for="item in solidColor" 
                         :key="item.color" 
                         @click="onConfirm(item.color)"
                         @mouseover="hoverColor = item.color" 
                         @mouseleave="hoverColor = ''">
                        <div class="color-swatch" :style="{
                            backgroundColor: item.color,
                            transform: item.color === hoverColor ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: item.color === hoverColor ? '0 8px 20px ' + item.color + '80' : 'none'
                        }">
                            <div class="color-tooltip">
                                <div class="tooltip-name">{{ item.name }}</div>
                                <div class="tooltip-desc">{{ item.description }}</div>
                                <div class="tooltip-code">{{ item.color }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </n-card>
            
            <!-- 淡色色板 -->
            <n-card class="selection-card" title="淡色色板" :bordered="false">
                <template #header-extra>
                    <n-button tertiary :color="confirmColor" @click="onCollect('2')" class="collapse-button">
                        {{ closeList.includes('2') ? '展开' : '收起' }}
                    </n-button>
                </template>
                <div class="color-grid" v-if="!closeList.includes('2')">
                    <div class="color-grid-item" 
                         v-for="item in paleColor" 
                         :key="item.color" 
                         @click="onConfirm(item.color)"
                         @mouseover="hoverColor = item.color" 
                         @mouseleave="hoverColor = ''">
                        <div class="color-swatch pale" :style="{
                            backgroundColor: item.color,
                            transform: item.color === hoverColor ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: item.color === hoverColor ? '0 8px 20px ' + item.color + '80' : 'none'
                        }">
                            <div class="color-tooltip">
                                <div class="tooltip-name">{{ item.name }}</div>
                                <div class="tooltip-desc">{{ item.description }}</div>
                                <div class="tooltip-code">{{ item.color }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </n-card>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { writeClipboard } from "@/utils/copy"
import type { CSSProperties } from 'vue'
import colorData from './colorData.json'

// 定义响应式变量
const hoverColor = ref<string>('')
const confirmColor = ref<string>('')
const theme = ref<string>('1')
const customColor = ref<string>('#18a058')

// 计算属性
const titleClass = computed<string>(() => {
  return theme.value === '1'? 'common-title-white' : 'common-title-black';
});

// 定义列表和数据
const closeList = ref<string[]>([])

// 颜色数据接口
interface ColorItem {
  name: string;
  color: string;
  description: string;
}

// 从JSON文件导入颜色数据
const solidColor: ColorItem[] = colorData.solidColor;
const paleColor: ColorItem[] = colorData.paleColor;


// 收起/展开面板函数
function onCollect(name: string): void {
    if (closeList.value.includes(name)) {
        closeList.value = closeList.value.filter(item => item !== name)
        console.log(`output->移除`, closeList.value)
    } else {
        closeList.value.push(name)
    }
}

// 开关样式函数
const railStyle = ({
    focused,
    checked
}: {
    focused: boolean
    checked: boolean
}): CSSProperties => {
    const style: CSSProperties = {}
    if (checked) {
        // 暗黑模式下使用主题色
        style.background = confirmColor.value || '#18a058'
        if (focused) {
            style.boxShadow = `0 0 0 2px ${confirmColor.value || '#18a058'}`
        }
    } else {
        // 浅色模式下使用主题色
        style.background = confirmColor.value || '#18a058'
        if (focused) {
            style.boxShadow = `0 0 0 2px ${confirmColor.value || '#18a058'}`
        }
    }
    return style
}

// 自定义颜色变更函数
function onCustomColorChange(color: string): void {
    customColor.value = color
}

// 确认颜色函数
function onConfirm(color: string): void {
    confirmColor.value = color
    writeClipboard(color, 'color is copied to clipboard')
}

// 虽然在Vue 3的<script setup>中，所有顶层变量和函数都会自动暴露给模板使用
// 但为了解决编译器可能的问题，我们显式导出这些变量和函数
defineExpose({
  hoverColor,
  confirmColor,
  theme,
  customColor,
  titleClass,
  closeList,
  solidColor,
  paleColor,
  onCollect,
  railStyle,
  onCustomColorChange,
  onConfirm
})
</script>

<style lang="scss" scoped>
.color-palette-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    
    &.dark-theme {
        --text-color: #ffffff;
        --bg-color: #1a1a1a;
        --card-bg: #242424;
        --border-color: rgba(255, 255, 255, 0.1);
        --hover-bg: rgba(255, 255, 255, 0.05);
    }
    
    &.light-theme {
        --text-color: #333333;
        --bg-color: #f5f5f5;
        --card-bg: #ffffff;
        --border-color: rgba(0, 0, 0, 0.1);
        --hover-bg: rgba(0, 0, 0, 0.03);
    }
}

// 顶部预览卡片样式
.preview-card {
    margin-bottom: 16px;
    
    .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        
        .title-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
            
            .common-title-white, .common-title-black {
                font-size: 28px;
                font-weight: 700;
                margin: 0;
                
                .more {
                    font-weight: 800;
                    letter-spacing: 1px;
                }
            }
            
            .common-title-white {
                color: #ffffff;
            }
            
            .common-title-black {
                color: #333333;
            }
            
            .color-code {
                font-family: monospace;
                font-size: 16px;
                font-weight: 600;
                margin-top: 4px;
                margin-left: 20px;
            }
        }
        
        .theme-switch {
            transform: scale(1.2);
            box-shadow: 0 4px 12px v-bind('(confirmColor || "#18a058") + "30"');
            transition: all 0.3s ease;
            
            .switch-label {
                font-weight: bold;
                font-size: 12px;
            }
        }
    }
    
    .preview-section {
        display: flex;
        gap: 24px;
        margin-top: 16px;
        
        @media (max-width: 768px) {
            flex-direction: column;
        }
        
        .color-preview {
            flex: 1;
            min-height: 180px;
            border-radius: 16px;
            box-shadow: 0 8px 24px v-bind('(confirmColor || "#18a058") + "40"');
            transition: all 0.3s ease;
            
            &:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 30px v-bind('(confirmColor || "#18a058") + "60"');
            }
        }
        
        .button-showcase {
            flex: 2;
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 16px;
            border-radius: 16px;
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            
            .showcase-button {
                height: 40px;
                font-weight: 600;
                border-radius: 8px;
                transition: all 0.3s ease;
                
                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px v-bind('(confirmColor || "#18a058") + "30"');
                }
            }
            
            .text-showcase {
                font-size: 16px;
                font-weight: 500;
                padding: 12px;
                border-radius: 8px;
                background-color: var(--hover-bg);
                text-align: center;
            }
        }
    }
}

// 颜色选择容器
.color-selection-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-height: 70vh;
    overflow-y: auto;
    padding: 16px;
    border-radius: 16px;
    background: var(--bg-color);
    border: 1px solid v-bind('(confirmColor || "#18a058") + "30"');
    box-shadow: 0 8px 24px v-bind('(confirmColor || "#18a058") + "20"');
    scrollbar-width: thin;
    scrollbar-color: v-bind('confirmColor || "#18a058"') transparent;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: v-bind('(confirmColor || "#18a058") + "60"');
        border-radius: 6px;
    }
    
    .selection-card {
        border-radius: 16px;
        box-shadow: 0 6px 20px v-bind('(confirmColor || "#18a058") + "20"');
        transition: all 0.3s ease;
        overflow: hidden;
        margin-bottom: 16px;
        
        &:hover {
            box-shadow: 0 10px 30px v-bind('(confirmColor || "#18a058") + "30"');
            transform: translateY(-2px);
        }
        
        .collapse-button {
            font-weight: 600;
            border-radius: 6px;
        }
    }
    
    // 自定义颜色面板
    .custom-color-panel {
        padding: 24px;
        border-radius: 12px;
        background-color: var(--card-bg);
        border-left: 4px solid v-bind('confirmColor || "#18a058"');
        transition: all 0.3s ease;
        
        .color-picker-container {
            display: flex;
            flex-wrap: wrap;
            gap: 32px;
            
            @media (max-width: 768px) {
                flex-direction: column;
            }
            
            .picker-section {
                flex: 1;
                min-width: 280px;
                display: flex;
                justify-content: center;
                
                .color-picker {
                    border: 1px solid v-bind('(confirmColor || "#18a058") + "40"');
                    border-radius: 12px;
                    padding: 16px;
                    box-shadow: 0 8px 20px v-bind('(confirmColor || "#18a058") + "20"');
                    transition: all 0.3s ease;
                    background-color: var(--card-bg);
                    
                    &:hover {
                        box-shadow: 0 12px 24px v-bind('(confirmColor || "#18a058") + "30"');
                    }
                }
            }
            
            .custom-color-preview {
                flex: 1;
                min-width: 280px;
                display: flex;
                flex-direction: column;
                gap: 20px;
                
                .preview-box {
                    width: 100%;
                    height: 120px;
                    border-radius: 12px;
                    box-shadow: 0 8px 20px v-bind('(confirmColor || "#18a058") + "30"');
                    transition: all 0.3s ease;
                    border: 2px solid v-bind('(confirmColor || "#18a058") + "50"');
                    
                    &:hover {
                        transform: scale(1.02);
                        box-shadow: 0 12px 24px v-bind('(confirmColor || "#18a058") + "40"');
                    }
                }
                
                .color-info {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    
                    .color-value {
                        font-size: 18px;
                        font-weight: 600;
                        color: var(--text-color);
                        padding: 12px;
                        border-radius: 8px;
                        background-color: var(--hover-bg);
                        border-left: 4px solid v-bind('confirmColor || "#18a058"');
                        text-align: center;
                        font-family: monospace;
                        letter-spacing: 1px;
                    }
                    
                    .apply-button {
                        color: #ffffff;
                        border-radius: 8px;
                        font-weight: 600;
                        padding: 8px 16px;
                        box-shadow: 0 6px 16px v-bind('(confirmColor || "#18a058") + "40"');
                        transition: all 0.3s ease;
                        border: none;
                        width: 100%;
                        font-size: 16px;
                        letter-spacing: 1px;
                        
                        &:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 8px 20px v-bind('(confirmColor || "#18a058") + "60"');
                        }
                    }
                }
            }
        }
    }
    
    // 颜色网格
    .color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 16px;
        padding: 16px;
        
        @media (max-width: 768px) {
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        }
        
        .color-grid-item {
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
            
            .color-swatch {
                width: 100%;
                aspect-ratio: 1/1;
                border-radius: 12px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                border: 2px solid transparent;
                
                &:hover {
                    border-color: v-bind('confirmColor || "#18a058"');
                    
                    .color-tooltip {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                &.pale {
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    
                    .color-tooltip {
                        color: #333;
                        background-color: rgba(255, 255, 255, 0.95);
                    }
                }
                
                .color-tooltip {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: rgba(0, 0, 0, 0.8);
                    color: #fff;
                    padding: 8px;
                    font-size: 12px;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.3s ease;
                    border-radius: 0 0 12px 12px;
                    
                    .tooltip-name {
                        font-weight: 600;
                        margin-bottom: 2px;
                    }
                    
                    .tooltip-desc {
                        font-size: 10px;
                        opacity: 0.8;
                        margin-bottom: 2px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    
                    .tooltip-code {
                        font-family: monospace;
                        font-size: 11px;
                        font-weight: 600;
                    }
                }
            }
        }
    }
}
</style>
