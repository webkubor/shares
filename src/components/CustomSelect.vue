<template>
  <div class="custom-select" :class="{ 'is-open': isOpen }" v-click-outside="closeDropdown">
    <div class="select-trigger" 
         @click="toggleDropdown" 
         @keydown="handleKeydown"
         tabindex="0">
      <span class="selected-label">{{ selectedLabel }}</span>
      <div class="select-arrow" :class="{ 'is-rotated': isOpen }">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    
    <transition name="dropdown">
      <div class="select-dropdown" v-if="isOpen">
        <div 
          v-for="(option, index) in options" 
          :key="option.value"
          class="select-option"
          :class="{ 
            'is-selected': option.value === modelValue,
            'is-highlighted': index === selectedIndex && isOpen
          }"
          @click="selectOption(option)"
          @mouseenter="selectedIndex = index"
        >
          <span class="option-label">{{ option.label }}</span>
          <div class="option-check" v-if="option.value === modelValue">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.6667 3.5L5.25004 9.91667L2.33337 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'

interface Option {
  label: string
  value: string
}

interface Props {
  modelValue: string
  options: Option[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const selectedIndex = ref(-1)

const selectedLabel = computed(() => {
  const selected = props.options.find(option => option.value === props.modelValue)
  return selected ? selected.label : props.placeholder
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    selectedIndex.value = props.options.findIndex(option => option.value === props.modelValue)
  }
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  closeDropdown()
}

// 键盘导航
const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleDropdown()
    }
    return
  }

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, props.options.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
      break
    case 'Enter':
      event.preventDefault()
      if (selectedIndex.value >= 0) {
        selectOption(props.options[selectedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      closeDropdown()
      break
  }
}

// 滚动到选中项
const scrollToSelected = () => {
  nextTick(() => {
    const dropdown = document.querySelector('.select-dropdown') as HTMLElement
    const selectedOption = dropdown?.querySelector('.is-selected') as HTMLElement
    if (selectedOption && dropdown) {
      const dropdownRect = dropdown.getBoundingClientRect()
      const optionRect = selectedOption.getBoundingClientRect()
      const scrollTop = selectedOption.offsetTop - dropdownRect.height / 2 + optionRect.height / 2
      dropdown.scrollTo({ top: scrollTop, behavior: 'smooth' })
    }
  })
}

// 监听下拉框打开状态
watch(isOpen, (newVal) => {
  if (newVal) {
    scrollToSelected()
  }
})

// 自定义指令：点击外部关闭下拉框
const vClickOutside = {
  mounted(el: HTMLElement & { clickOutsideEvent?: (event: Event) => void }, binding: any) {
    el.clickOutsideEvent = function(event: Event) {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent!)
  },
  unmounted(el: HTMLElement & { clickOutsideEvent?: (event: Event) => void }) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  }
}
</script>

<style lang="scss" scoped>
// CSS变量支持
.custom-select {
  --bg-elevated-rgb: 255, 255, 255;
  --color-primary-rgb: 255, 107, 0;
  --border-color-rgb: 224, 224, 224;
}

.custom-select {
  position: relative;
  width: 100%;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--bg-surface);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 44px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
  }

  .custom-select.is-open & {
    border-color: var(--color-primary);
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
}

.selected-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  user-select: none;
  transition: color 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  margin-right: 8px;
  
  .custom-select.is-open & {
    color: var(--color-primary);
  }
}

.select-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(var(--color-primary-rgb), 0.05);

  &.is-rotated {
    transform: rotate(180deg);
    background: rgba(var(--color-primary-rgb), 0.1);
    color: var(--color-primary);
  }
}

.select-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  max-height: 240px;
  overflow-y: auto;
  overflow-x: hidden; /* 防止横向滚动 */
}

.select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(var(--border-color-rgb), 0.3); /* 更淡的分界线 */
  position: relative;
  min-width: 0; /* 防止内容撑开 */

  &:last-child {
    border-bottom: none;
  }

  &:first-child {
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
  }

  &:hover {
    background: var(--bg-surface);
    padding-left: 24px;
  }

  &.is-selected {
    background: rgba(255, 107, 0, 0.08);
    color: var(--color-primary);
    font-weight: 500;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 60%;
      background: var(--color-primary);
      border-radius: 0 2px 2px 0;
    }
  }

  &.is-highlighted {
    background: rgba(var(--color-primary-rgb), 0.05);
    transform: translateX(2px);
  }

  &.is-highlighted.is-selected {
    background: rgba(255, 107, 0, 0.12);
  }
}

.option-label {
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  margin-right: 8px;
}

.option-check {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  animation: checkIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes checkIn {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

// 过渡动画
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
  filter: blur(4px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
  filter: blur(4px);
}

// 自定义滚动条
.select-dropdown::-webkit-scrollbar {
  width: 6px;
}

.select-dropdown::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

.select-dropdown::-webkit-scrollbar-thumb {
  background: rgba(var(--color-primary-rgb), 0.2);
  border-radius: 3px;
  transition: background 0.2s ease;
}

.select-dropdown::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--color-primary-rgb), 0.4);
}

// 移动端适配
@media (max-width: 640px) {
  .select-trigger {
    padding: 14px 18px;
    min-height: 48px;
    border-radius: 12px;
  }

  .selected-label,
  .option-label {
    font-size: 16px; // 防止iOS自动缩放
  }

  .select-dropdown {
    border-radius: 14px;
    max-height: 280px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
  }

  .select-option {
    padding: 16px 22px;
    border-bottom: 1px solid rgba(var(--border-color-rgb), 0.2); /* 移动端更淡的分界线 */
    
    &:hover {
      padding-left: 26px;
    }
  }
}
</style>