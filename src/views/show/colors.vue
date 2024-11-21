<template>
    <n-card :style="{ background: theme === '1' ? '#000000' : '#ffffff' }">
        <n-space align="center">
            <n-switch v-model:value="theme" checked-value="1" unchecked-value="0" :rail-style="railStyle">
                <template #checked>
                    浅色模式
                </template>
                <template #unchecked>
                    暗黑模式
                </template>
            </n-switch>
            <n-button :color="confirmColor">模板按钮</n-button>
            <n-button dashed :color="confirmColor">
                Default
            </n-button>
            <n-button ghost :color="confirmColor">
                Default
            </n-button>
            <n-button tertiary :color="confirmColor">
                Default
            </n-button>
            <span :style="{ color: confirmColor }">这是一段普通的文字</span>
        </n-space>

    </n-card>
    <div class="control-window">
        <n-card title="基础-色板">
            <template #header-extra>
                <n-button tertiary :color="confirmColor" @click="onCollect('1')">
                    收起
                </n-button>
            </template>
            <div class="color-list" v-if="!closeList.includes('1')">
                <div class="color-item" v-for="item in solidColor" :key="item.color" @click="onConfirm(item.color)">
                    <div class="board" :style="{
                        backgroundColor: item.color,
                        filter: item.color === hoverColor ? `drop-shadow(0 0 2em ${item.color})` : 'none'
                    }" @mouseover="hoverColor = item.color" @mouseleave="hoverColor = ''">
                       <span>
                        {{ item.description }}
                       </span> 
                    </div>
                    <div class="name" :style="{ color: item.color }"> {{ item.name }}{{ item.color }}</div>
                </div>
            </div>
        </n-card>
        <n-card title="淡色-色板" style="margin-top: 20px;">
            <template #header-extra>
                <n-button tertiary :color="confirmColor" @click="onCollect('2')">
                    收起
                </n-button>
            </template>
            <div class="color-list" v-if="!closeList.includes('2')">
                <div class="color-item" v-for="item in paleColor" :key="item.color" @click="onConfirm(item.color)">
                    <div class="board dark" :style="{
                        backgroundColor: item.color,
                        filter: item.color === hoverColor ? `drop-shadow(0 0 2em ${item.color})` : 'none'
                    }" @mouseover="hoverColor = item.color" @mouseleave="hoverColor = ''">
                       <span>
                        {{ item.description }}
                       </span> 
                    </div>
                    <div class="name" :style="{ color: item.color }"> {{ item.name }}{{ item.color }}</div>
                </div>
            </div>
        </n-card>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { writeClipboard } from "@/utils/copy"
import type { CSSProperties } from 'vue'
const hoverColor = ref('')
const confirmColor = ref('')
const theme = ref('1')

const closeList = ref([])
const solidColor = [
    // 红色系
    { name: '红色', color: '#f50057', description: '明亮、鲜艳的红色' },
    { name: '柔和红', color: '#ff6f91', description: '柔和的红色' },
    { name: '蔷薇红', color: '#e91e63', description: '柔和、浪漫的红色' },
    { name: '洋气红', color: '#c81045', description: '明亮且洋气的红色' },
    { name: '深红色', color: '#b03a2e', description: '深沉、具有深度的红色' },
    { name: '玫瑰红', color: '#d16d82', description: '典雅的玫瑰红色' },
    { name: '暗红色', color: '#7f1d1d', description: '更深邃的红色' },

    // 橙色系
    { name: '橙色', color: '#ff6200', description: '鲜亮、充满活力的橙色' },
    { name: '浅橙色', color: '#ff9e6d', description: '柔和的橙色' },
    { name: '橘子橙', color: '#ff9800', description: '活力、热情的橙色' },
    { name: '琥珀黄', color: '#ffc107', description: '明亮、温暖的黄色' },
    { name: '香槟橙', color: '#ffa726', description: '温暖且优雅的香槟橙' },

    // 黄色系
    { name: '柔和黄', color: '#ffe082', description: '柔和的黄色' },
    { name: '琥珀黄', color: '#ffc107', description: '明亮、温暖的黄色' },
    { name: '明亮黄', color: '#ffeb3b', description: '吸引目光的明亮黄色' },
    { name: '柠檬黄', color: '#fdd835', description: '充满活力的柠檬黄色' },
    { name: '金色', color: '#ffca28', description: '带有贵气的金黄色' },

    // 绿色系
    { name: '绿色', color: '#00c853', description: '清新、自然的绿色' },
    { name: '浅绿色', color: '#66ffa6', description: '柔和的绿色' },
    { name: '明亮绿', color: '#2ecc71', description: '明亮且鲜艳的绿色' },
    { name: '薄荷绿', color: '#4caf50', description: '清新、自然的绿色' },
    { name: '翠绿', color: '#009975', description: '强烈的翠绿色' },
    { name: '深森林绿', color: '#004d00', description: '更深沉、浓郁的森林绿' },
    { name: '温暖绿', color: '#6abf69', description: '柔和、温暖的绿色' },

    // 青色系
    { name: '青色', color: '#00bfa5', description: '冷静、沉稳的青色' },
    { name: '柔和青', color: '#5df2d6', description: '柔和的青色' },
    { name: '青竹蓝', color: '#00acc1', description: '冷静、沉稳的蓝色' },
    { name: '湖水青', color: '#76e4cc', description: '清澈且温和的湖水青' },
    { name: '孔雀青', color: '#00897b', description: '高贵且深邃的孔雀青' },

    // 蓝色系
    { name: '蓝色', color: '#0077ff', description: '经典、深邃的蓝色' },
    { name: '浅蓝色', color: '#80bfff', description: '柔和的蓝色' },
    { name: '靛青蓝', color: '#3f51b5', description: '经典、深邃的蓝色' },
    { name: '宝石蓝', color: '#2962ff', description: '深邃且晶莹的宝石蓝' },
    { name: '极光蓝', color: '#00bcd4', description: '明亮、清新的极光蓝' },

    // 紫色系
    { name: '紫色', color: '#651fff', description: '深邃、神秘的紫色' },
    { name: '柔和紫', color: '#9c8eff', description: '柔和的紫色' },
    { name: '午夜紫', color: '#673ab7', description: '深邃、神秘的紫色' },
    { name: '薰衣草紫', color: '#b39ddb', description: '浪漫且温柔的薰衣草紫' },
    { name: '茄子紫', color: '#512da8', description: '沉稳且高雅的茄子紫' },

    // 黑色系
    { name: '经典黑', color: '#000000', description: '纯黑色，经典而稳重' },
    { name: '炭黑', color: '#2c2c2c', description: '深灰色偏黑，现代感强' },
    { name: '墨黑', color: '#4a4a4a', description: '墨黑，带有温暖的深灰调' },
    { name: '午夜黑', color: '#101820', description: '深邃的午夜黑，带有些许蓝色调' },
    { name: '钢铁黑', color: '#3b3b3b', description: '钢铁黑，带有冷冽的金属感' }
];


const paleColor = [
    { name: '雪白', color: '#f8f9fa', description: '带有轻微灰度的白色，柔和舒适' },
    { name: '米白', color: '#f0e5de', description: '米色调的白色，带有自然的暖意' },
    { name: '淡灰白', color: '#e0e0e0', description: '淡灰色调的白色，现代且清新' },
    { name: '冰雪白', color: '#e6f1f5', description: '带有冰蓝色调的白色，清凉而清新' },
    { name: '象牙白', color: '#fffff0', description: '带有象牙色调的白色，古典而优雅' },
    { name: '珍珠白', color: '#f5f5f5', description: '珍珠感的白色，带有微光泽' },
    { name: '奶茶色', color: '#f5e3e2', description: '经典奶茶色，温暖柔和' },
    { name: '浅奶咖色', color: '#d4bda4', description: '浅奶咖色，带有一点咖啡的深度' },
    { name: '淡米色', color: '#f5f5dc', description: '清新的米色，柔和舒适' },
    { name: '浅杏色', color: '#f2b5d4', description: '淡淡的杏色，甜美而清新' },
    { name: '奶油色', color: '#fef5e7', description: '细腻的奶油色，清爽而不刺眼' },
    { name: '柔和棕色', color: '#d6a55e', description: '温暖的柔和棕色，具有自然质感' },
    { name: '浅杏仁色', color: '#f5d1b1', description: '轻柔的杏仁色，带有些微暖意' },
    { name: '奶白色', color: '#f8f4e3', description: '温暖、柔和的白色' },
    { name: '奶灰色', color: '#d3d3d3', description: '低调、现代的灰白色' },
    { name: '鹅黄色', color: '#f8e58c', description: '轻盈、愉悦的黄色' },
    { name: '青瓷绿', color: '#a8d5ba', description: '清凉、治愈的绿色' },
    { name: '水泥灰', color: '#b0b0b0', description: '工业风格的灰色，冷静' },
    { name: '米白色', color: '#faf3e0', description: '自然、简约的白色' },
    { name: '浅褐色', color: '#d2b48c', description: '温和、舒适的褐色' },
    { name: '卡其色', color: '#d0b67f', description: '温暖的卡其色' },
    { name: '浅棕色', color: '#bfa98a', description: '柔和的浅棕色' },
    { name: '砂色', color: '#e0c8a2', description: '轻柔的砂色' },
    { name: '浅巧克力色', color: '#d5a95b', description: '柔和的巧克力色' },
    { name: '奶咖色', color: '#d8cfc4', description: '温暖的奶咖色' },
    { name: '浅粉色', color: '#f8cfd8', description: '柔和的浅粉色' },  // 柔和的浅粉色
    { name: '浅粉色', color: '#fddde6', description: '柔美、优雅' },  // 柔美、优雅
    { name: '粉红色', color: '#f7a0b3', description: '温暖的粉红色' },
    { name: '淡玫瑰色', color: '#f5b7b1', description: '温柔的淡玫瑰色' },
    { name: '粉橙色', color: '#f7b3a8', description: '淡粉橙色' },    // 淡粉橙色
    { name: '樱花粉', color: '#f9c5d1', description: '柔和的樱花粉' },
    { name: '桃色', color: '#f6a1b2', description: '清新的桃色' },
    { name: '明亮绿', color: '#76c7c0', description: '清新的桃色' },
    { name: '温暖绿', color: '#a3d9a5', description: '温暖的绿，偏黄绿色调' },
];


function onCollect(name) {
    if (closeList.value.includes(name)) {
        closeList.value = closeList.value.filter(item => item !== name)
        console.log(`output->移除`, closeList.value)
    } else {
        closeList.value.push(name)
    }

}
const railStyle = ({
    focused,
    checked
}: {
    focused: boolean
    checked: boolean
}) => {
    const style: CSSProperties = {}
    if (checked) {
        style.background = '#101820'
        if (focused) {
            style.boxShadow = '0 0 0 2px #101820'
        }
    } else {
        style.background = confirmColor.value
        if (focused) {
            style.boxShadow = `0 0 0 2px ${confirmColor.value}`
        }
    }
    return style
}


function onConfirm(color: string) {
    confirmColor.value = color
    writeClipboard(color, 'color is copied to clipboard')
}
</script>

<style lang="scss" scoped>
.control-window {
    overflow: scroll;
    height: 100vh;
    background: var(--webkubor-bg);
    padding: 0 20px;
}

.color-list {
    display: flex;
    flex-wrap: wrap;
    transition: all 0.3s;

    .color-item {
        margin: 20px;
        transition: all 0.3s;
       

        .board {
            width: 150px;
            height: 100px;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.3s ease;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #ffffff;
            font-weight: 600;
            /* 初始状态无阴影 */
            filter: none;
            span {
                display: none;
            }

            &:hover {
                transform: translateY(-4px) scale(1.05);
                span {
                display: block;
            }

            }
        }
        .dark {
            color: #333333;
        }

        .name {
            font-size: 14px;
            text-align: center;
            margin-top: 8px;
            transition: color 0.3s ease;
            text-decoration: underline;
        }
    }
}
</style>
