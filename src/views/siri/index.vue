<template>
  <div class="siri-page" @contextmenu.prevent>
    <!-- 模拟的页面内容 -->
    <div class="content" :class="{ 'siri-active': isActive }">
      <h1>Hello, Siri</h1>
      <p class="hint">长按下方按钮 (或按住空格键) 激活 Apple Intelligence 效果</p>
      <br>
      <button 
        class="trigger-btn"
        @mousedown="startPress"
        @mouseup="endPress"
        @mouseleave="endPress"
        @touchstart.prevent="startPress"
        @touchend="endPress"
        @touchcancel="endPress"
      >
        <span class="icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
        长按激活 Siri
      </button>
    </div>

    <!-- Siri 视觉效果层 -->
    <div class="siri-overlay" :class="{ active: isActive }">
      <!-- 1. 深色玻璃背景 -->
      <div class="glass-backdrop"></div>
      
      <!-- 2. 边缘遮罩容器 -->
      <!-- 使用 mask-composite 技巧实现精确的边缘发光 -->
      <div class="edge-mask">
        <div class="glow-container">
          <div class="rotating-light"></div>
        </div>
      </div>

      <!-- 3. 内部高光增强 -->
      <div class="inner-highlight"></div>

      <!-- 状态指示（可选） -->
      <div class="status-text" v-show="isActive">
        Siri 正在聆听...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isActive = ref(false)

const startPress = () => {
  isActive.value = true
}

const endPress = () => {
  isActive.value = false
}

// 键盘空格键支持
const handleKeydown = (e: KeyboardEvent) => {
  if (e.code === 'Space' && !e.repeat) {
    startPress()
  }
}

const handleKeyup = (e: KeyboardEvent) => {
  if (e.code === 'Space') {
    endPress()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('keyup', handleKeyup)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('keyup', handleKeyup)
})
</script>

<style scoped>
/* 基础容器 */
.siri-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden;
}

/* 模拟手机屏幕内容的容器 */
.content {
  position: relative;
  z-index: 1;
  padding: 20px;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop') center/cover no-repeat;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), border-radius 0.4s ease;
}

/* 当Siri激活时，内容稍微缩小，模拟iOS按压效果 */
.content.siri-active {
  transform: scale(0.96);
  border-radius: 40px; /* 模拟屏幕圆角 */
  overflow: hidden;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(180deg, #fff, #888);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.hint {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  text-shadow: 0 1px 5px rgba(0,0,0,0.5);
}

/* --- 交互按钮样式 --- */
.trigger-btn {
  padding: 20px 40px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  cursor: pointer;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  user-select: none;
  transition: transform 0.1s, background 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  /* 禁用移动端长按弹出菜单 */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
}

.trigger-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.trigger-btn:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.2);
}

.trigger-btn .icon {
  width: 24px;
  height: 24px;
}

.trigger-btn .icon svg {
  width: 100%;
  height: 100%;
}

/* --- 核心：Siri 辉光层容器 --- */
.siri-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* 让点击穿透，不影响底层操作 */
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.siri-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* 深色玻璃拟态背景 (Backdrop) */
.glass-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4); /* 深色遮罩 */
  backdrop-filter: blur(10px); /* 玻璃模糊 */
  -webkit-backdrop-filter: blur(10px);
}

/* 使用 mask 裁剪中间部分，只保留边缘 */
.edge-mask {
  position: absolute;
  inset: 0;
  z-index: 10;
  /* 
     这里使用了 mask-composite 的技巧 (Webkit)。
     原理：画一个填充整个区域的层，再画一个稍微小一点的层，
     利用 exclude 排除中间，只留下边框区域。
  */
  -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; /* 标准属性是 exclude，但在Chrome/Safari中 xor 效果更稳 */
  mask-composite: exclude;
  
  /* 控制光带的宽度，padding 越大，光带越粗 */
  padding: 15px; 
}

/* --- 核心：流动的彩虹光带 --- */
.glow-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

/* 旋转的光源 */
.rotating-light {
  position: absolute;
  /* 让光源比屏幕大很多，确保旋转时覆盖四角 */
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  
  /* Apple Intelligence 典型配色：青、蓝、紫、粉、橙 */
  background: conic-gradient(
      from 0deg,
      transparent 0%,
      #00C6FF 10%, /* Cyan */
      #0072FF 20%, /* Blue */
      #A044FF 40%, /* Purple */
      #FF006E 60%, /* Pink */
      #FF9F0E 80%, /* Orange */
      transparent 100%
  );
  
  /* 极强的模糊，制造"光晕"而非"线条" */
  filter: blur(60px);
  opacity: 0.8;
  
  /* 默认隐藏动画，激活时添加 */
  animation: none;
}

/* 激活时的旋转动画 */
.siri-overlay.active .rotating-light {
  animation: rotate-glow 3s linear infinite;
}

/* 内部发光增强 (Inner Glow) - 让光看起来是从屏幕外溢进来的 */
.inner-highlight {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 40px 10px rgba(255, 255, 255, 0.2);
  mix-blend-mode: overlay;
  z-index: 5;
}

/* 动画定义 */
@keyframes rotate-glow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 底部文字 */
.status-text {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.2rem;
  color: rgba(255,255,255,0.9);
  font-weight: 500;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  z-index: 20;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .content h1 {
    font-size: 2rem;
  }
  
  .trigger-btn {
    width: 240px;
    justify-content: center;
  }
  
  .status-text {
    bottom: 50px;
  }
}
</style>
