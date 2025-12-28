<template>
    <div class="color-page" :class="[theme === '1' ? 'dark-theme' : 'light-theme', isMobile ? 'mobile-view' : 'desktop-view']">
        <section class="picker-section">
            <div class="picker-header">
                <div>
                    <div class="eyebrow">主题色选择器</div>
                    <h1 class="page-title">以一个颜色为中心搭建主题</h1>
                    <p class="page-desc">粘贴 Hex 色号或拖动选择器，统一主题色并驱动组件视觉。</p>
                </div>
                <div class="theme-toggle">
                    <k-checkbox v-model="themeChecked" :color="activeColor"
                        :checkedLabel="isMobile ? '暗' : '暗黑模式'" :uncheckedLabel="isMobile ? '亮' : '浅色模式'" />
                </div>
            </div>

            <div class="picker-body">
                <div class="picker-panel">
                    <input type="color" v-model="customColor" @input="onCustomColorChange(customColor)"
                        class="color-picker" />
                    <div class="picker-meta">
                        <div class="current-color" :style="{ backgroundColor: activeColor }"></div>
                        <div class="current-info">
                            <div class="current-label">当前主题色</div>
                            <div class="current-value">{{ activeColor }}</div>
                        </div>
                    </div>
                </div>

                <div class="hex-panel">
                    <label class="input-label">粘贴 Hex 色号</label>
                    <div class="input-row">
                        <input type="text" v-model="hexInput" class="hex-input" placeholder="#9BA3AF"
                            @input="onHexInput" @keydown.enter.prevent="applyHexInput" />
                        <button class="apply-hex" @click="applyHexInput"
                            :style="{ backgroundColor: activeColor }">应用</button>
                    </div>
                    <div v-if="hexError" class="input-hint">{{ hexError }}</div>

                    <div class="action-row">
                        <button class="ghost-button" @click="copyColor(activeColor)"
                            :style="{ color: activeColor, borderColor: activeColor }">复制 Hex</button>
                        <button class="ghost-button" @click="onConfirm(customColor)"
                            :style="{ color: activeColor, borderColor: activeColor }">设为主题色</button>
                    </div>
                </div>
            </div>
        </section>

        <k-card title="主题色组件区">
            <div class="theme-preview">
                <div class="preview-block" :style="{ backgroundColor: activeColor }"></div>
                <div class="preview-components">
                    <div class="button-row">
                        <button class="primary-btn" :style="{ backgroundColor: activeColor }">主按钮</button>
                        <button class="outline-btn" :style="{ color: activeColor, borderColor: activeColor }">描边按钮</button>
                    </div>
                    <div class="tag-row">
                        <span class="tag" :style="{ backgroundColor: activeColor }">主题标签</span>
                        <span class="tag ghost" :style="{ color: activeColor, borderColor: activeColor }">次级标签</span>
                    </div>
                    <div class="card-row">
                        <div class="mini-card">
                            <div class="mini-title">模块标题</div>
                            <div class="mini-desc">用于展示主题色在卡片与提示中的强弱层级。</div>
                            <button class="link-btn" :style="{ color: activeColor }">查看详情</button>
                        </div>
                        <div class="mini-card soft" :style="{ borderColor: activeColor + '40' }">
                            <div class="mini-title">强调信息</div>
                            <div class="mini-desc">浅色背景 + 主题边框，适合提示和状态。</div>
                            <div class="mini-pill" :style="{ backgroundColor: activeColor }">重点</div>
                        </div>
                    </div>
                </div>
            </div>
        </k-card>

        <k-card title="色系灵感库">
            <div class="palette-grid">
                <div class="palette-section" v-for="group in paletteGroups" :key="group.id">
                    <div class="palette-header">
                        <div>
                            <div class="palette-title">{{ group.title }}</div>
                            <div class="palette-desc">{{ group.desc }}</div>
                        </div>
                        <button class="palette-cta" @click="onConfirm(group.colors[0].color)"
                            :style="{ color: activeColor }">用第一色做主题</button>
                    </div>
                    <div class="palette-colors">
                        <button class="palette-chip" v-for="item in group.colors" :key="item.color"
                            :style="{ backgroundColor: item.color }" @click="onConfirm(item.color)">
                            <span class="chip-name">{{ item.name }}</span>
                            <span class="chip-code">{{ item.color }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </k-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { writeClipboard } from "@/utils/copy"

const theme = ref<string>('1')
const customColor = ref<string>('#8FA7A0')
const hexInput = ref<string>('#8FA7A0')
const hexError = ref<string>('')
const confirmColor = ref<string>('')
const isMobile = ref<boolean>(false)

const themeChecked = computed({
    get: () => theme.value === '1',
    set: (val: boolean) => { theme.value = val ? '1' : '0' }
})

const activeColor = computed<string>(() => confirmColor.value || customColor.value || '#8FA7A0')

const checkDeviceType = () => {
    isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkDeviceType)
})

function normalizeHex(input: string): string | null {
    const trimmed = input.trim()
    const raw = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed
    if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(raw)) {
        return null
    }
    const full = raw.length === 3
        ? raw.split('').map(ch => ch + ch).join('')
        : raw
    return `#${full.toUpperCase()}`
}

function onCustomColorChange(color: string): void {
    const normalized = normalizeHex(color)
    if (normalized) {
        customColor.value = normalized
        hexInput.value = normalized
        hexError.value = ''
    }
}

function onHexInput(): void {
    const normalized = normalizeHex(hexInput.value)
    if (normalized) {
        customColor.value = normalized
        hexInput.value = normalized
        hexError.value = ''
        return
    }
    if (!hexInput.value.trim()) {
        hexError.value = ''
        return
    }
    hexError.value = '支持 #RRGGBB 或 #RGB 形式'
}

function applyHexInput(): void {
    const normalized = normalizeHex(hexInput.value)
    if (!normalized) {
        hexError.value = '请输入合法的 Hex 色号'
        return
    }
    customColor.value = normalized
    hexInput.value = normalized
    hexError.value = ''
    onConfirm(normalized)
}

function onConfirm(color: string): void {
    const normalized = normalizeHex(color) || color
    confirmColor.value = normalized
    writeClipboard(normalized, 'color is copied to clipboard')
}

function copyColor(color: string): void {
    writeClipboard(color, 'color is copied to clipboard')
}

watch(confirmColor, (value) => {
    const normalized = normalizeHex(value)
    if (normalized) {
        customColor.value = normalized
        hexInput.value = normalized
    }
})

const paletteGroups = [
    {
        id: 'morandi',
        title: '莫兰迪色系',
        desc: '低饱和、柔雾质感，用于高级感主题。',
        colors: [
            { name: '雾松绿', color: '#8FA7A0' },
            { name: '灰湖蓝', color: '#8EA2B4' },
            { name: '雾霾粉', color: '#C5A5A6' },
            { name: '干草杏', color: '#C9B3A2' },
            { name: '雾栗棕', color: '#A1877C' },
            { name: '浅烟灰', color: '#B2B5B8' }
        ]
    },
    {
        id: 'scandi',
        title: '北欧极简',
        desc: '冷静克制、轻灰蓝调，适合工具与内容产品。',
        colors: [
            { name: '雾蓝', color: '#8CA0B3' },
            { name: '石板灰', color: '#9AA0A6' },
            { name: '雪松灰', color: '#B3B7BC' },
            { name: '冷雾青', color: '#93A9A5' },
            { name: '浅岩灰', color: '#C7CCD1' },
            { name: '冰灰', color: '#D6DBE0' }
        ]
    },
    {
        id: 'muji',
        title: '无印自然',
        desc: '米白、木质、柔和灰，强调自然舒适。',
        colors: [
            { name: '米白', color: '#F2E9DC' },
            { name: '麻灰', color: '#BFAF9E' },
            { name: '浅卡其', color: '#CBBBA4' },
            { name: '燕麦', color: '#D8CAB5' },
            { name: '暖灰', color: '#B8ADA2' },
            { name: '浅木棕', color: '#C6A989' }
        ]
    },
    {
        id: 'pastel',
        title: '柔雾粉彩',
        desc: '低对比、轻柔亲和，适合生活方式与社交产品。',
        colors: [
            { name: '粉雾', color: '#F2C9C8' },
            { name: '奶油黄', color: '#F4E3B2' },
            { name: '雾蓝', color: '#C7D8E6' },
            { name: '薄荷绿', color: '#CDE3D2' },
            { name: '淡紫灰', color: '#CFC4D5' },
            { name: '蜜桃奶', color: '#F1D0B5' }
        ]
    },
    {
        id: 'warm',
        title: '暖色系',
        desc: '情绪温暖、偏社交氛围，适合电商与内容品牌。',
        colors: [
            { name: '蜜桃橙', color: '#F4A261' },
            { name: '珊瑚红', color: '#E76F51' },
            { name: '暖杏色', color: '#F6C7A2' },
            { name: '焦糖棕', color: '#BB7A5C' },
            { name: '琥珀黄', color: '#E9C46A' },
            { name: '浅赭石', color: '#D8A47F' }
        ]
    },
    {
        id: 'retro',
        title: '复古暖调',
        desc: '焦糖、赭石、橄榄绿，适合情绪化品牌与内容。',
        colors: [
            { name: '赭石', color: '#C46A4A' },
            { name: '焦糖棕', color: '#A66A4E' },
            { name: '酒红', color: '#8B3B3B' },
            { name: '橄榄绿', color: '#7A7F55' },
            { name: '复古黄', color: '#D9B56A' },
            { name: '泥土棕', color: '#8F6B4F' }
        ]
    },
    {
        id: 'cool',
        title: '冷色系',
        desc: '理性、科技、效率感，适合产品与工具类。',
        colors: [
            { name: '雾蓝', color: '#5C7B99' },
            { name: '松石青', color: '#4DA8A6' },
            { name: '深海蓝', color: '#35648B' },
            { name: '冷灰绿', color: '#6C8A7E' },
            { name: '钴蓝', color: '#3A6EA5' },
            { name: '蓝灰', color: '#7E93A1' }
        ]
    },
    {
        id: 'neon',
        title: '赛博霓虹',
        desc: '高饱和、高对比，适合活动页与科技感视觉。',
        colors: [
            { name: '电光蓝', color: '#2D9CFF' },
            { name: '霓虹紫', color: '#A259FF' },
            { name: '荧光粉', color: '#FF4DD2' },
            { name: '激光绿', color: '#2EFFA0' },
            { name: '电紫红', color: '#FF2E88' },
            { name: '夜行蓝', color: '#1E2A78' }
        ]
    },
    {
        id: 'neutral',
        title: '中性色系',
        desc: '稳定、专业、可做底色或辅助主题。',
        colors: [
            { name: '雾白', color: '#F5F1EB' },
            { name: '岩灰', color: '#A1A1A1' },
            { name: '暖灰', color: '#BEB7AE' },
            { name: '煤黑', color: '#2F2F2F' },
            { name: '沙色', color: '#D9CBB8' },
            { name: '米灰', color: '#C7C0B8' }
        ]
    }
]
</script>

<style lang="scss" scoped>
.color-page {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1180px;
    margin: 0 auto;
    padding: 24px;
    border-radius: 26px;
    font-family: "IBM Plex Sans", "PingFang SC", "Microsoft YaHei", sans-serif;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
            radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.22), transparent 50%),
            radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.18), transparent 45%),
            linear-gradient(160deg, rgba(255, 255, 255, 0.08), transparent 40%);
        pointer-events: none;
    }

    > * {
        position: relative;
        z-index: 1;
    }

    &.dark-theme {
        --page-bg: linear-gradient(140deg, #141414, #1d1d1d 45%, #0f1114 100%);
        --text-color: #f5f5f5;
        --muted-color: rgba(255, 255, 255, 0.6);
        --card-bg: rgba(30, 30, 30, 0.9);
        --border-color: rgba(255, 255, 255, 0.08);
        --soft-bg: rgba(255, 255, 255, 0.04);
    }

    &.light-theme {
        --page-bg: linear-gradient(160deg, #f7f3ed 0%, #eef1f4 50%, #f5f5f2 100%);
        --text-color: #2e2a25;
        --muted-color: rgba(46, 42, 37, 0.6);
        --card-bg: rgba(255, 255, 255, 0.92);
        --border-color: rgba(0, 0, 0, 0.08);
        --soft-bg: rgba(0, 0, 0, 0.04);
    }

    &.mobile-view {
        padding: 16px;
        border-radius: 20px;
    }
}

.picker-section {
    padding: 20px;
    border-radius: 20px;
    background: var(--page-bg);
    border: 1px solid var(--border-color);
}

.picker-header {
    display: flex;
    justify-content: space-between;
    gap: 16px;

    .mobile-view & {
        flex-direction: column;
    }
}

.eyebrow {
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--muted-color);
}

.page-title {
    font-size: 28px;
    margin: 6px 0 0;
    color: var(--text-color);

    .mobile-view & {
        font-size: 22px;
    }
}

.page-desc {
    font-size: 14px;
    color: var(--muted-color);
}

.picker-body {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 20px;
    margin-top: 16px;

    .mobile-view & {
        grid-template-columns: 1fr;
    }
}

.picker-panel {
    display: grid;
    gap: 16px;
    padding: 16px;
    border-radius: 18px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
}

.color-picker {
    width: 100%;
    min-height: 180px;
    border-radius: 18px;
    border: 1px solid var(--border-color);
    background: transparent;
    cursor: pointer;
}

.picker-meta {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 12px;
    align-items: center;
}

.current-color {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
}

.current-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.current-label {
    font-size: 12px;
    color: var(--muted-color);
}

.current-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-color);
    font-family: "IBM Plex Mono", "Courier New", monospace;
}

.hex-panel {
    padding: 16px;
    border-radius: 18px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    display: grid;
    gap: 12px;
}

.input-label {
    font-size: 12px;
    color: var(--muted-color);
}

.input-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
}

.hex-input {
    border-radius: 12px;
    border: 1px solid var(--border-color);
    padding: 10px 12px;
    font-family: "IBM Plex Mono", "Courier New", monospace;
    background: transparent;
    color: var(--text-color);
}

.apply-hex {
    border: none;
    border-radius: 12px;
    padding: 10px 18px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
}

.input-hint {
    font-size: 12px;
    color: #d95c5c;
}

.action-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.ghost-button {
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 6px 14px;
    font-size: 12px;
    cursor: pointer;
}

.theme-preview {
    display: grid;
    grid-template-columns: minmax(0, 0.6fr) minmax(0, 1.4fr);
    gap: 20px;

    .mobile-view & {
        grid-template-columns: 1fr;
    }
}

.preview-block {
    min-height: 200px;
    border-radius: 20px;
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.2);
}

.preview-components {
    display: grid;
    gap: 16px;
}

.button-row {
    display: flex;
    gap: 12px;
}

.primary-btn,
.outline-btn {
    flex: 1;
    border-radius: 12px;
    height: 40px;
    font-weight: 600;
    cursor: pointer;
}

.primary-btn {
    border: none;
    color: #fff;
}

.outline-btn {
    border: 1px solid;
    background: transparent;
}

.tag-row {
    display: flex;
    gap: 10px;
}

.tag {
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
}

.tag.ghost {
    background: transparent;
    border: 1px solid;
}

.card-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    .mobile-view & {
        grid-template-columns: 1fr;
    }
}

.mini-card {
    background: var(--soft-bg);
    border-radius: 16px;
    padding: 14px;
    border: 1px solid var(--border-color);
}

.mini-card.soft {
    background: rgba(255, 255, 255, 0.08);
}

.mini-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-color);
}

.mini-desc {
    font-size: 12px;
    color: var(--muted-color);
    margin: 6px 0 10px;
}

.link-btn {
    background: transparent;
    border: none;
    font-size: 12px;
    cursor: pointer;
    padding: 0;
}

.mini-pill {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
}

.palette-grid {
    display: grid;
    gap: 18px;
}

.palette-section {
    padding: 16px;
    border-radius: 18px;
    background: var(--page-bg);
    border: 1px solid var(--border-color);
}

.palette-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    .mobile-view & {
        flex-direction: column;
        align-items: flex-start;
    }
}

.palette-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-color);
}

.palette-desc {
    font-size: 12px;
    color: var(--muted-color);
}

.palette-cta {
    background: transparent;
    border: none;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
}

.palette-colors {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
}

.palette-chip {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 90px;
    border-radius: 16px;
    padding: 10px;
    border: none;
    cursor: pointer;
    color: #fff;
}

.chip-name {
    font-size: 12px;
    font-weight: 600;
}

.chip-code {
    font-size: 11px;
    font-family: "IBM Plex Mono", "Courier New", monospace;
}
</style>
