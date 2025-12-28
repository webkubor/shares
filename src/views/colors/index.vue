<template>
    <div class="color-page"
        :class="[theme === '1' ? 'dark-theme' : 'light-theme', isMobile ? 'mobile-view' : 'desktop-view']"
        :style="themeTokens">
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
                    <div class="alpha-row">
                        <div class="alpha-label">透明度</div>
                        <input class="alpha-slider" type="range" min="0" max="100" step="1" v-model.number="alphaPercent" />
                        <div class="alpha-value">{{ alphaPercent }}%</div>
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
                    <div class="hex-actions">
                        <button class="ghost-button" @click="copyColor(activeColor)"
                            :style="{ color: activeColor, borderColor: activeColor }">复制 Hex</button>
                        <button class="ghost-button" @click="onConfirm(customColor)"
                            :style="{ color: activeColor, borderColor: activeColor }">设为主题色</button>
                    </div>

                    <div class="format-panel">
                        <div class="format-title">颜色格式（多维度）</div>
                        <div class="format-list">
                            <div class="format-item">
                                <div class="format-label">十六进制 HEX（网页）</div>
                                <div class="format-value">{{ colorFormats.hex }}</div>
                            </div>
                            <div class="format-item">
                                <div class="format-label">RGB（屏幕）</div>
                                <div class="format-value">{{ colorFormats.rgb }}</div>
                            </div>
                            <div class="format-item">
                                <div class="format-label">RGBA（含透明度）</div>
                                <div class="format-value">{{ colorFormats.rgba }}</div>
                            </div>
                            <div class="format-item">
                                <div class="format-label">HSL（色相/饱和/明度）</div>
                                <div class="format-value">{{ colorFormats.hsl }}</div>
                            </div>
                            <div class="format-item">
                                <div class="format-label">HSV（色相/饱和/明度）</div>
                                <div class="format-value">{{ colorFormats.hsv }}</div>
                            </div>
                            <div class="format-item">
                                <div class="format-label">CMYK（印刷）</div>
                                <div class="format-value">{{ colorFormats.cmyk }}</div>
                            </div>
                            <div class="format-item">
                                <div class="format-label">Pantone（印刷色）</div>
                                <input class="pantone-input" v-model="pantoneCode" placeholder="PANTONE 7544 C" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <k-card title="主题色组件区">
            <div class="theme-preview">
                <div class="preview-block" :style="{ backgroundColor: activeColor }"></div>
                <div class="preview-components">
                    <div class="preview-header">
                        <div class="header-title">产品标题</div>
                        <div class="header-subtitle">使用主题色作为强调与焦点</div>
                        <div class="header-actions">
                            <button class="header-btn" :style="{ color: activeColor, borderColor: activeColor }">次要操作</button>
                            <button class="header-btn solid" :style="{ backgroundColor: activeColor }">主要操作</button>
                        </div>
                    </div>
                    <div class="button-row">
                        <button class="primary-btn" :style="{ backgroundColor: activeColor }">主按钮</button>
                        <button class="outline-btn" :style="{ color: activeColor, borderColor: activeColor }">描边按钮</button>
                    </div>
                    <div class="tag-row">
                        <span class="tag" :style="{ backgroundColor: activeColor }">主题标签</span>
                        <span class="tag ghost" :style="{ color: activeColor, borderColor: activeColor }">次级标签</span>
                    </div>
                    <div class="form-row">
                        <label class="form-label">交互输入框</label>
                        <div class="form-field" :style="{ borderColor: activeColor + '55' }">
                            <span class="form-icon" :style="{ color: activeColor }">🔍</span>
                            <input class="form-input" placeholder="搜索关键词或输入内容" />
                            <span class="form-chip" :style="{ backgroundColor: activeColor }">提示</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="form-label">下拉选择</label>
                        <div class="select-field" :style="{ borderColor: activeColor + '55' }">
                            <span class="select-label">选择主题策略</span>
                            <span class="select-value" :style="{ color: activeColor }">平衡模式</span>
                            <span class="select-arrow" :style="{ color: activeColor }">▾</span>
                        </div>
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
const alphaPercent = ref<number>(90)
const pantoneCode = ref<string>('PANTONE 7544 C')
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
    writeClipboard(normalized, 'color is copied to clipboard', activeColor.value)
}

function copyColor(color: string): void {
    writeClipboard(color, 'color is copied to clipboard', activeColor.value)
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

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const normalized = normalizeHex(hex) || '#000000'
    const raw = normalized.replace('#', '')
    const r = parseInt(raw.slice(0, 2), 16)
    const g = parseInt(raw.slice(2, 4), 16)
    const b = parseInt(raw.slice(4, 6), 16)
    return { r, g, b }
}

function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (value: number) => value.toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255
    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    const delta = max - min
    let h = 0
    if (delta !== 0) {
        if (max === rNorm) h = ((gNorm - bNorm) / delta) % 6
        else if (max === gNorm) h = (bNorm - rNorm) / delta + 2
        else h = (rNorm - gNorm) / delta + 4
        h = Math.round(h * 60)
        if (h < 0) h += 360
    }
    const l = (max + min) / 2
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
    return { h, s, l }
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2
    let rPrime = 0
    let gPrime = 0
    let bPrime = 0
    if (h >= 0 && h < 60) {
        rPrime = c
        gPrime = x
    } else if (h >= 60 && h < 120) {
        rPrime = x
        gPrime = c
    } else if (h >= 120 && h < 180) {
        gPrime = c
        bPrime = x
    } else if (h >= 180 && h < 240) {
        gPrime = x
        bPrime = c
    } else if (h >= 240 && h < 300) {
        rPrime = x
        bPrime = c
    } else {
        rPrime = c
        bPrime = x
    }
    return {
        r: Math.round((rPrime + m) * 255),
        g: Math.round((gPrime + m) * 255),
        b: Math.round((bPrime + m) * 255)
    }
}

function tone(hex: string, lightness: number, saturationScale: number): string {
    const { r, g, b } = hexToRgb(hex)
    const { h, s } = rgbToHsl(r, g, b)
    const nextS = clamp(s * saturationScale, 0, 1)
    const nextL = clamp(lightness, 0, 1)
    const { r: nr, g: ng, b: nb } = hslToRgb(h, nextS, nextL)
    return rgbToHex(nr, ng, nb)
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255
    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    const delta = max - min
    let h = 0
    if (delta !== 0) {
        if (max === rNorm) h = ((gNorm - bNorm) / delta) % 6
        else if (max === gNorm) h = (bNorm - rNorm) / delta + 2
        else h = (rNorm - gNorm) / delta + 4
        h = Math.round(h * 60)
        if (h < 0) h += 360
    }
    const s = max === 0 ? 0 : delta / max
    return { h, s, v: max }
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255
    const k = 1 - Math.max(rNorm, gNorm, bNorm)
    if (k === 1) return { c: 0, m: 0, y: 0, k: 1 }
    const c = (1 - rNorm - k) / (1 - k)
    const m = (1 - gNorm - k) / (1 - k)
    const y = (1 - bNorm - k) / (1 - k)
    return { c, m, y, k }
}

const colorFormats = computed(() => {
    const base = normalizeHex(activeColor.value) || '#8FA7A0'
    const { r, g, b } = hexToRgb(base)
    const { h, s, l } = rgbToHsl(r, g, b)
    const { h: hh, s: hs, v } = rgbToHsv(r, g, b)
    const { c, m, y, k } = rgbToCmyk(r, g, b)
    const alpha = clamp(alphaPercent.value / 100, 0, 1)
    const round = (value: number) => Math.round(value)
    const percent = (value: number) => Math.round(value * 100)
    return {
        hex: base,
        rgb: `rgb(${r}, ${g}, ${b})`,
        rgba: `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`,
        hsl: `hsl(${round(h)}, ${percent(s)}%, ${percent(l)}%)`,
        hsv: `hsv(${round(hh)}, ${percent(hs)}%, ${percent(v)}%)`,
        cmyk: `cmyk(${percent(c)}%, ${percent(m)}%, ${percent(y)}%, ${percent(k)}%)`
    }
})

const themeTokens = computed(() => {
    const base = normalizeHex(activeColor.value) || '#8FA7A0'
    const isDark = theme.value === '1'
    const accentLight = tone(base, 0.72, 0.7)
    const accentDark = tone(base, 0.38, 0.9)
    const pageBg = isDark
        ? `linear-gradient(150deg, ${tone(base, 0.14, 0.25)}, ${tone(base, 0.18, 0.3)} 45%, ${tone(base, 0.12, 0.2)} 100%)`
        : `linear-gradient(160deg, ${tone(base, 0.96, 0.12)} 0%, ${tone(base, 0.93, 0.15)} 55%, ${tone(base, 0.9, 0.12)} 100%)`
    return {
        '--accent': base,
        '--accent-10': `${base}1A`,
        '--accent-20': `${base}33`,
        '--accent-35': `${base}59`,
        '--accent-60': `${base}99`,
        '--accent-light': accentLight,
        '--accent-dark': accentDark,
        '--page-bg': pageBg,
        '--card-bg': isDark ? tone(base, 0.18, 0.2) : tone(base, 0.98, 0.08),
        '--soft-bg': isDark ? tone(base, 0.22, 0.2) : tone(base, 0.94, 0.1),
        '--border-color': isDark ? tone(base, 0.28, 0.18) : tone(base, 0.86, 0.12),
        '--text-color': isDark ? '#F6F4F1' : '#2E2A25',
        '--muted-color': isDark ? 'rgba(246, 244, 241, 0.6)' : 'rgba(46, 42, 37, 0.6)',
        '--field-bg': isDark ? tone(base, 0.2, 0.15) : '#FFFFFF',
        '--field-text': isDark ? '#F6F4F1' : '#2E2A25',
        '--field-placeholder': isDark ? 'rgba(246, 244, 241, 0.6)' : 'rgba(46, 42, 37, 0.5)'
    } as Record<string, string>
})
</script>

<style lang="scss" scoped>
.color-page {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 24px;
    border-radius: 0;
    font-family: "IBM Plex Sans", "PingFang SC", "Microsoft YaHei", sans-serif;
    overflow: hidden;
    background: var(--page-bg);
    min-height: 100vh;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
            radial-gradient(circle at 15% 20%, var(--accent-10), transparent 55%),
            radial-gradient(circle at 80% 10%, var(--accent-10), transparent 50%),
            linear-gradient(160deg, var(--accent-20), transparent 45%);
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
        --field-bg: #2b2b2b;
        --field-text: #f5f5f5;
        --field-placeholder: rgba(255, 255, 255, 0.65);
    }

    &.light-theme {
        --page-bg: linear-gradient(160deg, #f7f3ed 0%, #eef1f4 50%, #f5f5f2 100%);
        --text-color: #2e2a25;
        --muted-color: rgba(46, 42, 37, 0.6);
        --card-bg: rgba(255, 255, 255, 0.92);
        --border-color: rgba(0, 0, 0, 0.08);
        --soft-bg: rgba(0, 0, 0, 0.04);
        --field-bg: #ffffff;
        --field-text: #2e2a25;
        --field-placeholder: rgba(46, 42, 37, 0.5);
    }

    &.mobile-view {
        padding: 16px 14px 24px;
        border-radius: 0;
        gap: 18px;
    }
}

.color-page :deep(.k-card) {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.color-page :deep(.k-card-title) {
    color: var(--text-color);
}

.color-page :deep(.k-card-body) {
    color: var(--text-color);
}

.picker-section {
    padding: 0;
    background: transparent;
    border: none;
}

.picker-header {
    display: flex;
    justify-content: space-between;
    gap: 16px;

    .mobile-view & {
        flex-direction: column;
        gap: 12px;
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
        gap: 14px;
        margin-top: 12px;
    }
}

.format-panel {
    margin-top: 10px;
 
    .mobile-view & {
        margin-top: 8px;
    }
}

.format-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 10px;

    .mobile-view & {
        font-size: 12px;
        margin-bottom: 8px;
    }
}

.format-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px 14px;

    .mobile-view & {
        grid-template-columns: 1fr;
        gap: 8px;
    }
}

.format-item {
    display: grid;
    gap: 4px;
    padding: 6px 8px;
    border-radius: 10px;
    background: var(--soft-bg);
    border: 1px solid var(--accent-20, var(--border-color));

    .mobile-view & {
        padding: 6px 8px;
    }
}

.format-label {
    font-size: 11px;
    color: var(--muted-color);
}

.format-value {
    font-size: 12px;
    font-family: "IBM Plex Mono", "Courier New", monospace;
    color: var(--text-color);
}

.pantone-input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 12px;
    font-family: "IBM Plex Mono", "Courier New", monospace;
    color: var(--text-color);
}

.picker-panel {
    display: grid;
    gap: 16px;
    padding: 16px;
    border-radius: 18px;
    background: var(--card-bg);
    border: 1px solid var(--accent-20, var(--border-color));

    .mobile-view & {
        padding: 14px;
        border-radius: 14px;
    }
}

.alpha-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 12px;
    align-items: center;
    padding: 8px 10px;
    border-radius: 12px;
    border: 1px solid var(--accent-20, var(--border-color));
    background: var(--field-bg);
}

.alpha-label {
    font-size: 12px;
    color: var(--muted-color);
}

.alpha-value {
    font-size: 12px;
    color: var(--text-color);
}

.alpha-slider {
    width: 100%;
    accent-color: var(--accent);
}

.color-picker {
    width: 100%;
    min-height: 180px;
    border-radius: 18px;
    border: 1px solid var(--accent-20, var(--border-color));
    background: transparent;
    cursor: pointer;

    .mobile-view & {
        min-height: 140px;
        border-radius: 14px;
    }
}

.picker-meta {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 12px;
    align-items: center;

    .mobile-view & {
        grid-template-columns: 56px 1fr;
    }
}

.current-color {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);

    .mobile-view & {
        width: 56px;
        height: 56px;
        border-radius: 12px;
    }
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
    border: 1px solid var(--accent-20, var(--border-color));
    display: grid;
    gap: 10px;
    align-content: start;

    .mobile-view & {
        padding: 14px;
        border-radius: 14px;
    }
}

.input-label {
    font-size: 12px;
    color: var(--muted-color);
    margin-bottom: -2px;
}

.input-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    align-items: center;

    .mobile-view & {
        grid-template-columns: 1fr;
    }
}

.hex-input {
    border-radius: 12px;
    border: 1px solid var(--accent-20, var(--border-color));
    padding: 8px 12px;
    font-family: "IBM Plex Mono", "Courier New", monospace;
    background: transparent;
    color: var(--text-color);
    height: 38px;

    .mobile-view & {
        height: 36px;
    }
}

.apply-hex {
    border: none;
    border-radius: 12px;
    padding: 8px 16px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    background: var(--accent);
    height: 38px;

    .mobile-view & {
        height: 36px;
        width: 100%;
    }
}

.input-hint {
    font-size: 12px;
    color: #d95c5c;
}

.hex-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    .mobile-view & {
        gap: 8px;
    }
}

.ghost-button {
    background: transparent;
    border: 1px solid var(--accent);
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 11px;
    cursor: pointer;
    color: var(--accent);
}

.theme-preview {
    display: grid;
    grid-template-columns: minmax(0, 0.6fr) minmax(0, 1.4fr);
    gap: 20px;

    .mobile-view & {
        grid-template-columns: 1fr;
        gap: 16px;
    }
}

.preview-block {
    min-height: 200px;
    border-radius: 20px;
    box-shadow: 0 14px 24px var(--accent-35, rgba(0, 0, 0, 0.2));

    .mobile-view & {
        min-height: 160px;
        border-radius: 16px;
    }
}

.preview-components {
    display: grid;
    gap: 16px;
}

.preview-header {
    display: grid;
    gap: 8px;
    padding: 14px;
    border-radius: 16px;
    background: var(--soft-bg);
    border: 1px solid var(--border-color);
}

.header-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-color);
}

.header-subtitle {
    font-size: 12px;
    color: var(--muted-color);
}

.header-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.header-btn {
    border: 1px solid var(--accent);
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 12px;
    background: transparent;
    cursor: pointer;
    font-weight: 600;
    color: var(--accent);
}

.header-btn.solid {
    border: none;
    color: #fff;
    background: var(--accent);
}

.button-row {
    display: flex;
    gap: 12px;

    .mobile-view & {
        flex-direction: column;
    }
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
    background: var(--accent);
}

.outline-btn {
    border: 1px solid;
    background: transparent;
    color: var(--accent);
    border-color: var(--accent);
}

.tag-row {
    display: flex;
    gap: 10px;

    .mobile-view & {
        flex-wrap: wrap;
        gap: 8px;
    }
}

.tag {
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    background: var(--accent);
}

.tag.ghost {
    background: transparent;
    border: 1px solid var(--accent);
    color: var(--accent);
}

.card-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;

    .mobile-view & {
        grid-template-columns: 1fr;
    }
}

.form-row {
    display: grid;
    gap: 8px;
}

.form-label {
    font-size: 12px;
    color: var(--muted-color);
}

.form-field {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    align-items: center;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid var(--accent-20, var(--border-color));
    background: var(--field-bg);
    color: var(--field-text);
}

.form-icon {
    font-size: 14px;
}

.form-input {
    border: none;
    outline: none;
    background: transparent;
    color: var(--field-text);
    font-size: 13px;
}

.form-input::placeholder {
    color: var(--field-placeholder);
}

.form-chip {
    font-size: 11px;
    color: #fff;
    padding: 3px 8px;
    border-radius: 999px;
    background: var(--accent);
}

.select-field {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 10px;
    align-items: center;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid var(--accent-20, var(--border-color));
    background: var(--field-bg);
    color: var(--field-text);
}

.select-label {
    font-size: 13px;
    color: var(--field-text);
}

.select-value {
    font-size: 12px;
    font-weight: 600;
    color: var(--accent);
}

.select-arrow {
    font-size: 12px;
    color: var(--accent);
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
    color: var(--accent);
}

.mini-pill {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    background: var(--accent);
}

.palette-grid {
    display: grid;
    gap: 18px;
}

.palette-section {
    padding: 16px;
    border-radius: 18px;
    background: var(--page-bg);
    border: 1px solid var(--accent-20, var(--border-color));

    .mobile-view & {
        padding: 14px;
        border-radius: 14px;
    }
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
        gap: 8px;
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
    color: var(--accent);
}

.palette-colors {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;

    .mobile-view & {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
    }
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
