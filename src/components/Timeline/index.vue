<template>
  <div class="timeline-container">
    <div class="timeline-header">
      <h3 class="timeline-title">人生时间线</h3>
      <p class="timeline-subtitle">滑动探索我的成长历程</p>
    </div>
    
    <!-- 时间线区域分界标记 -->
    <div class="timeline-boundary top-boundary">
      <div class="boundary-line"></div>
      <div class="boundary-icon">◆</div>
      <div class="boundary-line"></div>
    </div>
    
    <!-- 垂直时间线 -->
    <div class="timeline-wrapper" ref="timelineWrapper" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
      <div class="timeline-vertical">
        <div class="timeline-line">
          <div class="timeline-progress" :style="{ height: `${progress}%` }"></div>
        </div>
        
        <div class="timeline-years">
        <div 
          v-for="(item, index) in timeline" 
          :key="item.year"
          class="timeline-year-item"
          :class="{ 
            'current': item.type === 'current',
            'hovered': hoveredIndex === index,
            'passed': currentYear > item.year || (currentYear === item.year && currentMonth > item.month)
          }"
          @mouseenter="onItemHover(index)"
          @mouseleave="onItemLeave"
          @click="selectYear(item)"
        >
          <div class="year-marker">
            <div class="year-dot">
              <div class="dot-core"></div>
              <div class="dot-glow"></div>
              <div class="dot-pulse" v-if="item.type === 'current'"></div>
            </div>
            <div class="year-label">{{ item.year }}</div>
          </div>
          
          <div class="year-content">
            <div class="year-title">{{ item.title }}</div>
            <div class="year-desc">{{ item.description }}</div>
            <div class="year-month" v-if="item.month">{{ item.month }}月</div>
          </div>
          
          <!-- 小气泡事件 -->
          <div class="event-bubbles" v-if="selectedYear === item.year">
            <div 
              v-for="(detail, detailIndex) in item.details" 
              :key="detailIndex"
              class="event-bubble"
              :class="{ 'current-event': currentYear === item.year && currentMonth === detail.month }"
            >
              <div class="event-dot"></div>
              <div class="event-content">
                <div class="event-month">{{ detail.month }}月</div>
                <div class="event-title">{{ detail.title }}</div>
                <div class="event-desc">{{ detail.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    <!-- 当前年份显示 -->
    <div class="current-year-display" :class="{ 'visible': showCurrentYear }">
      <div class="year-badge">{{ displayYear }}</div>
    </div>
    
    <!-- 滚动提示 -->
    <div class="scroll-indicator" v-if="isVisible && !hasInitialized && isHovering">
      <div class="scroll-text">Scroll to explore timeline</div>
      <div class="scroll-arrow">↓</div>
    </div>
    
    <!-- 时间线区域分界标记 -->
    <div class="timeline-boundary bottom-boundary">
      <div class="boundary-line"></div>
      <div class="boundary-icon">◆</div>
      <div class="boundary-line"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

const props = defineProps({
  timeline: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['itemClick', 'yearChange'])

// DOM引用
const timelineWrapper = ref(null)

// 状态管理
const hoveredIndex = ref(-1)
const showCurrentYear = ref(false)
const displayYear = ref(new Date().getFullYear())
const selectedYear = ref(null)
const isVisible = ref(false) // 时间线是否进入视口
const hasInitialized = ref(false) // 是否已经初始化定位
const isHovering = ref(false) // 鼠标是否悬停在时间线区域

// 计算属性
const currentYear = computed(() => new Date().getFullYear())
const currentMonth = computed(() => new Date().getMonth() + 1)
const latestYear = computed(() => Math.max(...props.timeline.map(item => item.year)))
const progress = computed(() => {
  const minYear = Math.min(...props.timeline.map(item => item.year))
  const maxYear = Math.max(...props.timeline.map(item => item.year))
  const totalMonths = (maxYear - minYear) * 12
  const currentMonths = (currentYear.value - minYear) * 12 + currentMonth.value
  return Math.min(100, Math.max(0, (currentMonths / totalMonths) * 100))
})



// 交互函数
function onWheel(event) {
  event.preventDefault()
  if (timelineWrapper.value) {
    timelineWrapper.value.scrollTop += event.deltaY
  }
}

function onItemHover(index) {
  hoveredIndex.value = index
  const item = props.timeline[index]
  displayYear.value = item.year
  showCurrentYear.value = true
  emit('yearChange', item.year)
  
  // 如果悬停的是当前年份，显示特殊提示
  if (item.year === 2025 && item.type === 'current') {
    displayYear.value = '2025 · 未来可期'
  }
}

function onItemLeave() {
  hoveredIndex.value = -1
  setTimeout(() => {
    if (hoveredIndex.value === -1) {
      showCurrentYear.value = false
      displayYear.value = currentYear.value
    }
  }, 300)
}

function selectYear(item) {
  selectedYear.value = item.year
  emit('itemClick', item)
}

onMounted(() => {
  nextTick(() => {
    // 使用 Intersection Observer 监听时间线是否进入视口
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasInitialized.value) {
          isVisible.value = true
          hasInitialized.value = true
          
          // 当时间线第一次进入视口时，定位到当前年份
          setTimeout(() => {
            if (timelineWrapper.value) {
              const currentItemIndex = props.timeline.findIndex(item => item.year === currentYear.value)
              if (currentItemIndex !== -1) {
                const currentElement = timelineWrapper.value.querySelectorAll('.timeline-year-item')[currentItemIndex]
                if (currentElement) {
                  // 平滑滚动到当前年份
                  timelineWrapper.value.scrollTo({
                    top: currentElement.offsetTop - (timelineWrapper.value.clientHeight / 2) + (currentElement.clientHeight / 2),
                    behavior: 'smooth'
                  })
                  
                  // 显示当前年份提示
                  showCurrentYear.value = true
                  displayYear.value = '2025 · 未来可期'
                  setTimeout(() => {
                    showCurrentYear.value = false
                  }, 2000)
                }
              }
            }
          }, 300)
        }
      })
    }, {
      threshold: 0.3 // 当30%的时间线进入视口时触发
    })
    
    // 开始监听时间线容器
    if (timelineWrapper.value) {
      observer.observe(timelineWrapper.value)
    }
    
    // 组件卸载时停止监听
    return () => {
      observer.disconnect()
    }
  })
})
</script>

<style lang="scss" scoped>
$primary-orange: #ff6b35;
$accent-orange: #f7931e;
$light-orange: #ffb627;
$dark-orange: #e55a2b;
$bg-light: #fafbfc;
$bg-card: #ffffff;
$text-dark: #1a1a1a;
$text-medium: #4a4a4a;
$text-light: #6b7280;
$border-light: rgba(255, 107, 53, 0.1);
$shadow-light: rgba(255, 107, 53, 0.1);
$shadow-hover: rgba(255, 107, 53, 0.2);

.timeline-container {
  padding: 60px 0;
  background: linear-gradient(180deg, #ffffff 0%, #fff8f5 100%);
  position: relative;
  overflow: hidden;
  border-radius: 24px; /* 添加圆角 */
  border: 1px solid rgba(255, 107, 53, 0.1); /* 添加边框 */
}

/* 时间线区域分界标记 */
.timeline-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 0 32px;
  padding: 16px 0;
  position: relative;
}

.boundary-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.3), transparent);
  border-radius: 1px;
}

.boundary-icon {
  color: $primary-orange;
  font-size: 16px;
  opacity: 0.6;
  animation: boundaryPulse 2s ease-in-out infinite;
}

.top-boundary {
  margin-bottom: 0;
}

.bottom-boundary {
  margin-top: 0;
}

@keyframes boundaryPulse {
  0%, 100% { 
    opacity: 0.6; 
    transform: scale(1);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2);
  }
}

.timeline-header {
  text-align: center;
  margin-bottom: 60px;
  padding: 0 32px;
}

.timeline-title {
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 800;
  color: $text-dark;
  margin-bottom: 12px;
  background: linear-gradient(135deg, $primary-orange 0%, $dark-orange 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.timeline-subtitle {
  font-size: 18px;
  color: $text-medium;
  font-weight: 500;
}

.timeline-wrapper {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 0; /* 减少内边距，给分界标记留空间 */
  cursor: grab;
  height: 70vh; /* 固定高度，提供更好的滚动体验 */
  max-height: 600px; /* 最大高度限制 */
  scroll-behavior: smooth;
  position: relative;
  background: rgba(255, 255, 255, 0.5); /* 轻微背景色区分 */
  border-radius: 16px; /* 内圆角 */
  margin: 0 16px; /* 添加边距 */
  
  /* 添加顶部和底部渐变遮罩，增强滚动视觉效果 */
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 40px;
    z-index: 10;
    pointer-events: none;
  }
  
  &::before {
    top: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, transparent 100%);
  }
  
  &::after {
    bottom: 0;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.8) 0%, transparent 100%);
  }
  
  &:active {
    cursor: grabbing;
  }
  
  /* 自定义滚动条 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 107, 53, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: $primary-orange;
    border-radius: 3px;
    
    &:hover {
      background: $dark-orange;
    }
  }
}

/* 垂直时间线 */
.timeline-vertical {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 0;
  min-height: 100%; /* 确保容器有足够高度 */
  display: flex;
  flex-direction: column;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: $border-light;
  transform: translateX(-50%);
  border-radius: 2px;
}

.timeline-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, $primary-orange 0%, $accent-orange 100%);
  border-radius: 2px;
  transition: height 0.3s ease;
}

.timeline-years {
  position: relative;
  padding: 20px 0;
  flex: 1; /* 让年份列表占据剩余空间 */
  display: flex;
  flex-direction: column;
  gap: 60px; /* 年份间距 */
}

.timeline-year-item {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0; /* 移除margin，使用gap */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:nth-child(odd) {
    flex-direction: row;
    .year-marker {
      margin-right: 40px;
    }
    .year-content {
      text-align: left;
    }
    .event-bubbles {
      left: 100%;
      margin-left: 40px;
    }
  }
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    .year-marker {
      margin-left: 40px;
    }
    .year-content {
      text-align: right;
    }
    .event-bubbles {
      right: 100%;
      margin-right: 40px;
    }
  }
  
  &.hovered {
    transform: scale(1.02);
    
    .year-dot {
      transform: scale(1.1);
      box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
    }
    
    .dot-glow {
      opacity: 0.6;
    }
  }
  
  &.passed {
    .year-dot {
      background: $light-orange;
      border-color: $primary-orange;
      
      .dot-core {
        background: $primary-orange;
        transform: scale(1);
      }
    }
    
    .year-label {
      color: $primary-orange;
    }
  }
  
  &.current {
    .year-dot {
      background: $primary-orange;
      border-color: $dark-orange;
      box-shadow: 0 0 20px rgba(255, 107, 53, 0.4);
      
      .dot-core {
        background: white;
        transform: scale(1.1);
      }
      
      .dot-pulse {
        animation: pulse 2s infinite;
      }
    }
    
    .year-label {
      color: $primary-orange;
      font-weight: 700;
    }
  }
}

.year-marker {
  position: relative;
  z-index: 20;
  flex-shrink: 0;
}

.year-dot {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: $bg-card;
  border: 4px solid $border-light;
  margin: 0 auto 16px;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .dot-core {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: $text-light;
    transition: all 0.3s ease;
  }
  
  .dot-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, $primary-orange 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    filter: blur(10px);
  }
  
  .dot-pulse {
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: 50%;
    border: 2px solid $primary-orange;
    opacity: 0;
  }
}

.year-label {
  font-size: 24px;
  font-weight: 700;
  color: $text-dark;
  text-align: center;
  margin-bottom: 4px;
}

.year-content {
  flex: 1;
  max-width: 300px;
  padding: 20px;
  background: $bg-card;
  border-radius: 16px;
  box-shadow: 0 8px 24px $shadow-light;
  border: 1px solid $border-light;
  transition: all 0.3s ease;
}

.year-title {
  font-size: 20px;
  font-weight: 600;
  color: $text-dark;
  margin-bottom: 8px;
}

.year-desc {
  font-size: 16px;
  color: $text-medium;
  line-height: 1.5;
  margin-bottom: 8px;
}

.year-month {
  font-size: 14px;
  font-weight: 500;
  color: $primary-orange;
  opacity: 0.8;
}

/* 小气泡事件 */
.event-bubbles {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 250px;
  max-height: 300px;
  overflow-y: auto;
}

.event-bubble {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 107, 53, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(255, 107, 53, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 107, 53, 0.12);
    transform: translateX(4px);
    box-shadow: 0 8px 16px rgba(255, 107, 53, 0.15);
  }
  
  &.current-event {
    background: rgba(255, 107, 53, 0.15);
    border-color: $primary-orange;
    box-shadow: 0 8px 16px rgba(255, 107, 53, 0.2);
  }
}

.event-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $primary-orange;
  margin-top: 6px;
  flex-shrink: 0;
}

.event-content {
  flex: 1;
}

.event-month {
  font-size: 12px;
  font-weight: 600;
  color: $primary-orange;
  margin-bottom: 4px;
}

.event-title {
  font-size: 14px;
  font-weight: 600;
  color: $text-dark;
  margin-bottom: 4px;
}

.event-desc {
  font-size: 12px;
  color: $text-medium;
  line-height: 1.3;
}

.timeline-item {
  flex: 0 0 240px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: 20px; // 为详细信息留出空间
  
  &.passed {
    .timeline-dot {
      background: $light-orange;
      
      .dot-core {
        background: $primary-orange;
        transform: scale(1);
      }
    }
  }
  
  &.current {
    .timeline-dot {
      background: $primary-orange;
      box-shadow: 0 0 20px rgba(255, 107, 53, 0.4);
      
      .dot-core {
        background: white;
        transform: scale(1.2);
      }
      
      .dot-pulse {
        animation: pulse 2s infinite;
      }
    }
    
    .timeline-year {
      color: $primary-orange;
      font-weight: 700;
    }
  }
  
  &.hovered {
    transform: translateY(-10px) scale(1.05);
    
    .timeline-dot {
      transform: scale(1.2);
      box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
    }
    
    .timeline-content {
      opacity: 1;
      transform: translateY(0);
    }
    
    .timeline-year {
      color: $dark-orange;
    }
  }
}

.timeline-year {
  font-size: 24px;
  font-weight: 600;
  color: $text-medium;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.timeline-month {
  font-size: 16px;
  font-weight: 500;
  color: $primary-orange;
  margin-left: 8px;
  opacity: 0.8;
}

.timeline-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: $bg-card;
  border: 3px solid $border-light;
  margin: 0 auto 20px;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .dot-core {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: $text-light;
    transition: all 0.3s ease;
    transform: scale(0.8);
  }
  
  .dot-glow {
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    background: radial-gradient(circle, $primary-orange 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    filter: blur(8px);
  }
  
  .dot-pulse {
    position: absolute;
    top: -12px;
    left: -12px;
    right: -12px;
    bottom: -12px;
    border-radius: 50%;
    border: 2px solid $primary-orange;
    opacity: 0;
  }
}

.timeline-item:hover .timeline-dot {
  .dot-glow {
    opacity: 0.6;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

.timeline-content {
  background: $bg-card;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 24px $shadow-light;
  border: 1px solid $border-light;
  opacity: 0.8;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.timeline-icon {
  font-size: 32px;
  margin-bottom: 12px;
  display: block;
}

.timeline-item-title {
  font-size: 16px;
  font-weight: 600;
  color: $text-dark;
  margin-bottom: 8px;
}

.timeline-item-desc {
  font-size: 14px;
  color: $text-medium;
  line-height: 1.4;
}

/* 详细信息面板样式 */
.timeline-detail-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 24px;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.15);
  border: 1px solid $border-light;
  padding: 32px;
  max-width: 500px;
  width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
  animation: panelSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes panelSlideIn {
  from {
    opacity: 0;
    transform: translate(-50%, -45%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.detail-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid $border-light;
}

.panel-year {
  font-size: 18px;
  font-weight: 700;
  color: $primary-orange;
}

.panel-close {
  width: 32px;
  height: 32px;
  border: none;
  background: $bg-light;
  border-radius: 50%;
  color: $text-medium;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: $primary-orange;
    color: white;
    transform: scale(1.1);
  }
}

.panel-content {
  text-align: center;
}

.panel-icon {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.panel-title {
  font-size: 24px;
  font-weight: 700;
  color: $text-dark;
  margin-bottom: 12px;
}

.panel-desc {
  font-size: 16px;
  color: $text-medium;
  line-height: 1.6;
  margin-bottom: 24px;
}

.panel-subtitle {
  font-size: 18px;
  font-weight: 600;
  color: $primary-orange;
  margin-bottom: 16px;
  text-align: left;
}

.panel-details {
  text-align: left;
}

.panel-detail-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 107, 53, 0.05);
  border-radius: 12px;
  margin-bottom: 12px;
  border-left: 4px solid $primary-orange;
  transition: all 0.3s ease;
  
  &.current {
    background: rgba(255, 107, 53, 0.1);
    border-left-color: $dark-orange;
    box-shadow: 0 4px 16px rgba(255, 107, 53, 0.15);
  }
}

.detail-time {
  font-size: 14px;
  font-weight: 600;
  color: $primary-orange;
  background: white;
  padding: 6px 12px;
  border-radius: 16px;
  min-width: 50px;
  text-align: center;
  flex-shrink: 0;
}

.detail-info {
  flex: 1;
}

.detail-info .detail-title {
  font-size: 16px;
  font-weight: 600;
  color: $text-dark;
  margin-bottom: 6px;
}

.detail-info .detail-desc {
  font-size: 14px;
  color: $text-medium;
  line-height: 1.4;
}

.timeline-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
  padding: 0 32px;
}

.control-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: $bg-card;
  border: 2px solid $border-light;
  color: $primary-orange;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: $primary-orange;
    color: white;
    border-color: $primary-orange;
    transform: scale(1.1);
    box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.timeline-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

.indicator-bar {
  width: 100%;
  height: 6px;
  background: $border-light;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.indicator-progress {
  height: 100%;
  background: linear-gradient(90deg, $primary-orange 0%, $accent-orange 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmer 2s infinite;
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.indicator-text {
  font-size: 14px;
  color: $text-medium;
  font-weight: 500;
}

/* 滚动提示 */
.scroll-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 15;
  animation: fadeInOut 3s ease-in-out infinite;
}

.scroll-text {
  font-size: 14px;
  color: $text-medium;
  font-weight: 500;
  opacity: 0.8;
}

.scroll-arrow {
  font-size: 20px;
  color: $primary-orange;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.current-year-display {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.visible {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.year-badge {
  background: linear-gradient(135deg, $primary-orange 0%, $dark-orange 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 50px;
  font-size: 24px;
  font-weight: 700;
  box-shadow: 0 20px 40px rgba(255, 107, 53, 0.3);
  backdrop-filter: blur(10px);
}

/* 移动端优化 */
@media (max-width: 799px) {
  .timeline-vertical {
    padding: 20px 0;
  }
  
  .timeline-year-item {
    margin: 40px 0;
    
    &:nth-child(odd),
    &:nth-child(even) {
      flex-direction: column;
      text-align: center;
      
      .year-marker {
        margin: 0 0 20px 0;
      }
      
      .year-content {
        text-align: center;
        max-width: 100%;
        margin-bottom: 20px;
      }
      
      .event-bubbles {
        position: static;
        transform: none;
        margin: 0;
        max-width: 100%;
      }
    }
  }
  
  .year-dot {
    width: 60px;
    height: 60px;
    
    .dot-core {
      width: 24px;
      height: 24px;
    }
  }
  
  .year-label {
    font-size: 20px;
  }
  
  .year-content {
    padding: 16px;
  }
  
  .year-title {
    font-size: 18px;
  }
  
  .year-desc {
    font-size: 14px;
  }
  
  .timeline-line {
    left: 30px;
    transform: none;
  }
}

/* 减少动画支持 */
@media (prefers-reduced-motion: reduce) {
  .timeline-vertical,
  .timeline-year-item,
  .year-dot,
  .year-content,
  .event-bubbles {
    transition: none !important;
  }
  
  .dot-pulse {
    animation: none !important;
  }
}
</style>