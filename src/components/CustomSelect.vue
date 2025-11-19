<template>
  <div class="custom-select" :class="{ 'is-open': isOpen }" v-click-outside="closeDropdown">
    <div class="select-trigger" @click="toggleDropdown">
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
          v-for="option in options" 
          :key="option.value"
          class="select-option"
          :class="{ 'is-selected': option.value === modelValue }"
          @click="selectOption(option)"
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
import { ref, computed } from 'vue'

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

const selectedLabel = computed(() => {
  const selected = props.options.find(option => option.value === props.modelValue)
  return selected ? selected.label : props.placeholder
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  closeDropdown()
}

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
.custom-select {
  position: relative;
  width: 100%;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-surface);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover {
    border-color: var(--color-primary);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
  }
}

.selected-label {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-primary);
  user-select: none;
}

.select-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: transform 0.2s ease;

  &.is-rotated {
    transform: rotate(180deg);
  }
}

.select-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}

.select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--bg-surface);
  }

  &.is-selected {
    background: rgba(255, 107, 0, 0.05);
    color: var(--color-primary);
  }
}

.option-label {
  font-size: 14px;
  font-weight: 400;
}

.option-check {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

// 过渡动画
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// 移动端适配
@media (max-width: 640px) {
  .select-trigger {
    padding: 12px 16px;
    min-height: 44px;
  }

  .selected-label,
  .option-label {
    font-size: 16px; // 防止iOS自动缩放
  }
}
</style>