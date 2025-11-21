<template>
  <label
    :class="['k-checkbox', size, labelPosition, { 'is-checked': modelValue, 'is-disabled': disabled }]"
    :style="{ '--checkbox-color': color || 'var(--color-primary)', '--checkbox-ring': ringColor }"
    :aria-checked="modelValue"
    role="checkbox"
  >
    <input
      type="checkbox"
      class="k-checkbox-input"
      :checked="modelValue"
      :disabled="disabled"
      @change="onToggle"
    />
    <span class="k-checkbox-box">
      <span class="k-checkbox-tick" />
    </span>
    <span v-if="displayLabel" class="k-checkbox-badge">{{ currentLabel }}</span>
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  modelValue: boolean
  disabled?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
  checkedLabel?: string
  uncheckedLabel?: string
  labelPosition?: 'left' | 'right'
}>(), {
  modelValue: false,
  disabled: false,
  label: '',
  size: 'md',
  color: '',
  checkedLabel: '',
  uncheckedLabel: '',
  labelPosition: 'right'
})

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void; (e: 'change', v: boolean): void }>()

function onToggle(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
  emit('change', checked)
}

// 动态计算展示文案（优先使用 checked/unchecked 文案，其次 label）
const displayLabel = computed(() => !!(props.checkedLabel || props.uncheckedLabel || props.label))
const currentLabel = computed(() => {
  if (props.checkedLabel || props.uncheckedLabel) {
    return props.modelValue ? (props.checkedLabel || '') : (props.uncheckedLabel || '')
  }
  return props.label || ''
})

function hexAlpha(a: number) {
  return Math.round(a * 255).toString(16).padStart(2, '0')
}

function toAlpha(c: string, a: number) {
  const s = (c || '').trim()
  const mRgb = s.match(/^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([0-9.]+)\s*)?\)/i)
  if (mRgb) {
    const r = mRgb[1], g = mRgb[2], b = mRgb[3]
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  if (s.startsWith('#')) {
    if (s.length === 7) return `${s}${hexAlpha(a)}`
    if (s.length === 9) return s
  }
  return s || `rgba(255, 107, 53, ${a})`
}

const ringColor = computed(() => {
  return props.color ? toAlpha(props.color, 0.15) : 'rgba(255, 107, 53, 0.15)'
})
</script>

<style scoped>
.k-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  color: var(--text-primary);
}

.k-checkbox.left { flex-direction: row-reverse; }

.k-checkbox.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.k-checkbox-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.k-checkbox-box {
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--border-color);
  background: var(--bg-elevated);
  border-radius: 6px;
  box-shadow: 0 2px 8px var(--shadow-color);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.k-checkbox:hover .k-checkbox-box {
  border-color: var(--border-hover);
}

.k-checkbox.is-checked .k-checkbox-box {
  background: var(--checkbox-color);
  border-color: var(--checkbox-color);
  box-shadow: 0 0 0 3px var(--checkbox-ring), 0 8px 16px var(--shadow-hover);
}

.k-checkbox-tick {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  transform: scale(0);
  transition: transform 0.16s ease;
  background: #fff;
}

.k-checkbox.is-checked .k-checkbox-tick {
  transform: scale(1);
}

.k-checkbox-badge {
  font-size: 14px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  transition: all 0.2s ease;
  border: 1px solid var(--border-color);
  background: var(--bg-elevated);
}

.k-checkbox.is-checked .k-checkbox-badge {
  background: var(--checkbox-color);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 6px 16px var(--shadow-hover);
}

.k-checkbox.sm .k-checkbox-box { width: 16px; height: 16px; }
.k-checkbox.lg .k-checkbox-box { width: 20px; height: 20px; }
</style>