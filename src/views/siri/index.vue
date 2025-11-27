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
          <div class="rotating-light rotating-light-1"></div>
          <div class="rotating-light rotating-light-2"></div>
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
  transform: scale(0.98); /* 减小缩放幅度，避免空隙过大 */
  border-radius: 12px; /* 减小圆角，适应网页直角窗口 */
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

/* 使用 mask 裁剪中间部分，让光从边缘向内柔和衰减 */
.edge-mask {
  position: absolute;
  inset: 0;
  z-index: 10;
  /* 
    改用 ellipse at center，并大幅放宽过渡区 (40% -> 100%)
    这会让光效从屏幕很靠里的地方就开始渐变，消除硬边框感
  */
  -webkit-mask-image: radial-gradient(
    ellipse at center, 
    transparent 40%, 
    black 100%
  );
  mask-image: radial-gradient(
    ellipse at center, 
    transparent 40%, 
    black 100%
  );
}

/* --- 核心：流动的彩虹光带 --- */
.glow-container {
  position: absolute;
  inset: -50px; /* 更大的外扩，防止模糊边缘被切断 */
  overflow: hidden;
}

/* 通用光效层 */
.rotating-light {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  filter: blur(100px); /* 极高的模糊度 */
  mix-blend-mode: screen;
  opacity: 0; /* 默认隐藏 */
  transition: opacity 0.5s ease;
}

.siri-overlay.active .rotating-light {
  opacity: 1;
}

/* 第一层：主色调 - 顺时针流动 */
.rotating-light-1 {
  background: conic-gradient(
      from 0deg,
      transparent 0%,
      #00C6FF 15%, 
      #0072FF 30%, 
      #A044FF 50%, 
      #FF006E 70%, 
      #FF9F0E 85%, 
      transparent 100%
  );
  opacity: 0.8;
}

.siri-overlay.active .rotating-light-1 {
  animation: rotate-glow-1 4s linear infinite;
}

/* 第二层：干扰层 - 逆时针流动，打破规则感 */
.rotating-light-2 {
  background: conic-gradient(
      from 180deg,
      transparent 10%,
      #00FFFF 25%, 
      #FF00FF 50%, 
      #FFFF00 75%, 
      transparent 90%
  );
  opacity: 0.5;
  mix-blend-mode: plus-lighter; /* 使用更亮的混合模式 */
}

.siri-overlay.active .rotating-light-2 {
  animation: rotate-glow-2 6s linear infinite;
}

/* 内部发光增强 (Inner Glow) */
.inner-highlight {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 100px 30px rgba(255, 255, 255, 0.15);
  mix-blend-mode: overlay;
  z-index: 5;
  pointer-events: none;
}

/* 动画定义 - 双向旋转 + 呼吸 */
@keyframes rotate-glow-1 {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.15); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes rotate-glow-2 {
  0% { transform: rotate(360deg) scale(1.1); }
  50% { transform: rotate(180deg) scale(1); }
  100% { transform: rotate(0deg) scale(1.1); }
}

/* 底部文字 */
.status-text {
  position: absolute;
  bottom: 140px;
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
