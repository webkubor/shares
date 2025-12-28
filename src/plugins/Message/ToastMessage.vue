<template>
  <transition name="slide-fade">
    <div v-if="modelValue" class="toast-message">
      <main class="toast-message-main">
        <section v-if="content" class="toast-message-content" v-html="content" />
        <section v-else class="toast-message-content">
          <slot />
        </section>
        <div v-if="showProgress" class="progress-bar-container">
          <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
      </main>
    </div>
  </transition>
</template>

<script setup>
import { watchEffect, onMounted, ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  showProgress: {
    type: Boolean,
    default: true
  },
  content: {
    type: String,
    default: ''
  },
  time: {
    type: Number,
    default: 3000
  },
  destroy: {
    type: Function,
    default: () => {}
  },
  type: {
    type: String,
    default: 'info',
    validator(value) {
      return ['success', 'warning', 'error', 'info'].includes(value)
    }
  }
})

const emit = defineEmits(['update:modelValue'])

const progress = ref(100)
const totalTime = computed(() => props.time || 5000)
let timer = null

const onClose = () => {
  emit('update:modelValue', false)
  props.destroy()
}

const startProgress = () => {
  const interval = setInterval(() => {
    progress.value -= (100 / totalTime.value) * 1000
    if (progress.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}

onMounted(() => {
  startProgress()
})


watchEffect(() => {
  clearTimeout(timer)
  if (props.modelValue) {
    timer = setTimeout(() => {
      onClose()
    }, props.time)
  }
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style lang="scss" scoped>
.toast-message {
  position: fixed;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 380px;
  z-index: 10000;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: message-appear 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  
  .toast-message-main {
    padding: 16px 20px;
    position: relative;
  }

  .toast-message-content {
    color: var(--toast-text-color, white);
    line-height: 1.5;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  &[data-type="success"] {
    background: rgba(40, 167, 69, 0.15);
    border-color: rgba(40, 167, 69, 0.2);
  }
  
  &[data-type="error"] {
    background: rgba(220, 53, 69, 0.15);
    border-color: rgba(220, 53, 69, 0.2);
  }
  
  &[data-type="warning"] {
    background: rgba(255, 193, 7, 0.15);
    border-color: rgba(255, 193, 7, 0.2);
  }
  
  &[data-type="info"] {
    background: rgba(23, 162, 184, 0.15);
    border-color: rgba(23, 162, 184, 0.2);
  }

  &[data-accent="custom"] {
    background: rgba(var(--toast-accent), 0.16);
    border-color: rgba(var(--toast-accent), 0.28);
  }
}

.progress-bar-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  
  .progress-bar {
    height: 100%;
    transition: width 1s linear;
    background: var(--toast-progress-color, rgba(255, 255, 255, 0.8));
  }
}

.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.38, 0.1, 0.36, 0.9);
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.5, 0, 0.66, 0.33);
}

.slide-fade-enter-from {
  transform: translateX(-50%) translateY(-10px);
  opacity: 0;
  filter: blur(4px);
}

.slide-fade-leave-to {
  transform: translateX(-50%) translateY(-20px);
  opacity: 0;
  filter: blur(4px);
}

@keyframes message-appear {
  0% {
    transform: translateX(-50%) scale(0.95);
    opacity: 0;
    filter: blur(4px);
  }
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
    filter: blur(0);
  }
}

@media screen and (max-width: 400px) {
  .toast-message {
    width: calc(100% - 32px);
    max-width: none;
    border-radius: 8px;
    
    .toast-message-main {
      padding: 12px 16px;
      font-size: 14px;
    }
    
    .progress-bar-container {
      height: 3px;
    }
  }
}
</style>
