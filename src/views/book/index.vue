<template>
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="common-title">书面摘录分享</h1>
        <p class="page-subtitle">创建精美的文字分享卡片</p>
      </div>
      
      <!-- 主要内容区域 -->
      <div class="content-wrapper">
        <!-- 左侧控制面板 -->
        <div class="control-panel">
          <div class="card">
            <div class="form-grid">
              <label class="form-label">文案内容</label>
              <textarea v-model="bookState.content" placeholder="请输入文案内容" class="form-textarea" @input="adjustTextareaHeight($event)"></textarea>
              
              <label class="form-label">引用来源</label>
              <input type="text" v-model="bookState.more" placeholder="引用来源(可不填)" class="form-input" />
              
              <label class="form-label">背景颜色</label>
              <input type="color" v-model="config.bgColor" class="form-color" />
              
              <label class="form-label">字体选择</label>
              <CustomSelect 
                v-model="config.fontFamily" 
                :options="ChineseFont.map(font => ({ label: font.label, value: font.value }))"
                placeholder="选择字体"
              />
              
              <label class="form-label">字体大小</label>
              <CustomSelect 
                v-model="config.fontSize" 
                :options="[
                  { label: '小', value: '14px' },
                  { label: '标准', value: '16px' },
                  { label: '大', value: '18px' },
                  { label: '特大', value: '20px' }
                ]"
                placeholder="选择字体大小"
              />
              
              <label class="form-label">字体颜色</label>
              <input type="color" v-model="config.fontColor" class="form-color" />
            </div>

            <div class="action-buttons">
              <img src="./assets/fly.png" alt="装饰图标" class="decoration-icon">
              <div class="button-group">
                <button class="action-btn secondary" @click="resetConfig" v-ripple>重置</button>
                <button class="action-btn primary" @click="downloadBgImage" v-ripple>导出</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 右侧预览面板 -->
        <div class="preview-panel">
          <div id="book-view" class="book-view"
              :style="{ fontFamily: config.fontFamily, background: config.bgColor, color: config.fontColor, fontSize: config.fontSize }">
            <Drops class="fly" />
            <div class="main">
              <span>{{ bookState.content }}</span>
              <div class="more" v-if="bookState.more">{{ bookState.more }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

        <div v-if="exportLoading" class="export-overlay">导出中.......</div>
    </template>
<script lang="ts" setup>
import { reactive, ref, nextTick, watch } from 'vue';
import { useWallpaper } from "@/hooks/useWallpaper"
import dayjs from "@/utils/dayjs";
import domtoimage from 'dom-to-image-more';
import Drops from './drops.vue';
const { ChineseFont } = useWallpaper()

let exportLoading = ref(false)
let bookState = reactive({
    content: '愿中国青年都摆脱冷气，只是向上走，不必听自暴自弃者流的话。能做事的做事，能发声的发声。有一分热，发一分光，就令萤火一般，也可以在黑暗里发一点光，不必等候炬火。',
    more: '鲁迅'
})

// 自动调整textarea高度
const adjustTextareaHeight = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  if (!textarea) return; // 空值检查
  
  // 重置高度以获取正确的scrollHeight
  textarea.style.height = 'auto';
  // 设置新高度，但不超过最大高度
  const newHeight = Math.min(textarea.scrollHeight, 200);
  textarea.style.height = newHeight + 'px';
};

// 初始化textarea高度的专用函数
const initTextareaHeight = () => {
  const textarea = document.querySelector('.form-textarea') as HTMLTextAreaElement;
  if (textarea) {
    // 直接调整高度，不通过事件
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = newHeight + 'px';
  }
};

// 初始化时调整高度
nextTick(() => {
  initTextareaHeight();
});

// 监听内容变化，自动调整高度
watch(() => bookState.content, () => {
  nextTick(() => {
    initTextareaHeight();
  });
});

// 组件挂载后延迟初始化，确保DOM完全ready
setTimeout(() => {
  initTextareaHeight();
}, 100);


let config = reactive({
    bgColor: '#A3D9A5FF',
    fontColor: "#101820",
    fontFamily: 'Chinese3',
    fontSize: '16px', // 默认字体大小
})


const resetConfig = () => {
    config.bgColor = '#A3D9A5FF';
    config.fontColor = '#101820';
    config.fontFamily = 'Chinese3';
    config.fontSize = '16px'; // 重置字体大小
    bookState.content = '愿中国青年都摆脱冷气，只是向上走，不必听自暴自弃者流的话。能做事的做事，能发声的发声。有一分热，发一分光，就令萤火一般，也可以在黑暗里发一点光，不必等候炬火。';
    bookState.more = '鲁迅';
};


const exportOptions = {
    useCORS: true,
    scale: 3,
    width: 0,
    height: 0
}

const downloadBgImage = async () => {
    let target = document.getElementById('book-view') as HTMLDivElement as HTMLDivElement
    console.log(target.offsetWidth, target.offsetHeight);
    exportOptions.width = target.offsetWidth
    exportOptions.height = target.offsetHeight
    exportLoading.value = true
    const formattedDate = dayjs().format('YYYY-MM-DD HH:mm'); // 2021-09-01 12:00
    domtoimage.toPng(target, exportOptions).then(function (dataUrl: string) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `Share-${formattedDate}.png`;
        link.click();
    }).finally(() => {
        exportLoading.value = false
    });
};


</script>
<style lang="scss" scoped>
/* 页面容器 */
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 40px;
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 48px;
  
  .common-title {
    margin-bottom: 16px;
  }
  
  .page-subtitle {
    color: var(--text-secondary);
    font-size: 16px;
    margin: 0;
  }
}

/* 内容包装器 - 左右布局 */
.content-wrapper {
  display: grid;
  grid-template-columns: 480px 1fr; /* 增加控制面板宽度 */
  gap: 48px; /* 增加两列间距 */
  align-items: start;
  
  @media (max-width: 1200px) {
    grid-template-columns: 440px 1fr;
    gap: 32px;
  }
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr; /* 移动端垂直布局 */
    gap: 24px;
  }
}

/* 控制面板 */
.control-panel {
  position: sticky;
  top: 20px;
}

/* 主卡片容器 */
.card { 
  background: var(--bg-elevated); 
  border: 1px solid var(--border-color); 
  border-radius: 16px; 
  padding: 32px;
  width: 100%;
}

/* 表单网格 - 合理的比例分配 */
.form-grid { 
  display: grid; 
  grid-template-columns: 80px 1fr; /* 减小标签宽度，增加输入框空间 */
  gap: 16px 20px; /* 减小垂直间距，保持水平间距 */
  align-items: center; /* 垂直居中对齐 */
}

.form-label {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 14px;
  text-align: right; /* 右对齐，靠近输入框 */
  padding-right: 8px; /* 与输入框保持适当距离 */
}

.form-input,
.form-textarea {
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-surface);
  color: var(--text-primary);
  font-size: 14px;
  width: 100%;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
  }
}

.form-textarea {
  min-height: 60px; /* 减小最小高度 */
  max-height: 200px; /* 限制最大高度 */
  resize: vertical; /* 允许垂直调整 */
  overflow-y: auto; /* 超出时显示滚动条 */
  line-height: 1.4; /* 优化行高 */
}

.form-color {
  width: 100%;
  height: 32px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--color-primary);
  }
}
/* 按钮区域重新设计 */
.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid var(--border-color);
}

.decoration-icon {
  height: 40px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
}

.button-group {
  display: flex;
  gap: 12px;
}

.export-overlay { 
  position: fixed; 
  inset: 0; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  background: rgba(0,0,0,0.35); 
  color: #fff; 
  font-weight: 700; 
  z-index: 999; 
}

.action-btn {
  padding: 14px 28px;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background: var(--color-primary);
    color: white;
    
    &:hover {
      background: var(--color-accent);
      transform: translateY(-1px);
    }
  }
  
  &.secondary {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    
    &:hover {
      background: var(--bg-surface);
      border-color: var(--color-primary);
    }
  }
}
/* 预览面板 */
.preview-panel {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 70vh;
  padding: 40px 0;
}

.book-view {
  width: 90%;
  max-width: 800px; /* 增加最大宽度 */
  aspect-ratio: 16/10; /* 更宽的宽高比 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 16px; /* 基础字体大小 */
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);

  .fly {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 40px;
    height: 40px;
    opacity: 0.3;
  }

  .main {
    width: 85%;
    text-align: left;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    padding: 40px;
    line-height: 1.7;
    transition: all 0.3s ease;
    
    /* 预览内容字体层级 - 基于选择的字体大小 */
    .content {
      font-size: 1em; /* 使用基础字体大小 */
      line-height: 1.8;
      margin-bottom: 24px;
    }
    
    .more {
      font-size: 0.85em; /* 引用内容稍小一些 */
      opacity: 0.8;
      text-align: right;
      font-style: italic;
    }
  }
}

/* 响应式优化 */
@media (max-width: 1200px) {
  .container {
    padding: 24px 32px;
  }
}

@media (max-width: 968px) {
  .container {
    padding: 20px 24px;
  }
  
  .page-header {
    margin-bottom: 32px;
  }
  
  .control-panel {
    position: static; /* 移动端取消粘性定位 */
  }
  
  .preview-panel {
    min-height: 50vh;
    padding: 24px 0;
  }
  
  .book-view {
    width: 95%;
    max-width: 600px;
    aspect-ratio: 4/3;
    /* 移除硬编码的字体大小，使用动态控制 */
  }
  
  .book-view .main {
    padding: 24px;
  }
  
  /* 中等屏幕优化：调整标签宽度比例 */
  .form-grid {
    grid-template-columns: 70px 1fr; /* 进一步减小标签宽度 */
  }
  
  .form-input,
  .form-textarea,
  .form-select {
    padding: 11px 15px; /* 介于PC和移动端之间 */
    font-size: 15px;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 16px 20px;
  }
  
  .page-header {
    margin-bottom: 24px;
  }
  
  .card {
    padding: 20px;
  }
  
  .form-grid {
    grid-template-columns: 1fr; /* 移动端单列布局 */
    gap: 16px;
  }
  
  .form-input,
  .form-textarea,
  .form-select {
    padding: 12px 16px; /* 移动端增加触摸区域 */
    font-size: 16px; /* 防止iOS自动缩放 */
    min-height: 44px; /* 确保触摸目标足够大 */
  }
  
  .form-textarea {
    min-height: 80px; /* 移动端textarea最小高度 */
    font-size: 16px; /* 保持一致性 */
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 12px;
  }
  
  .action-btn {
    padding: 12px 20px;
    font-size: 14px;
  }
  
  .decoration-icon {
    display: none; /* 小屏隐藏装饰图标 */
  }
  
  .preview-panel {
    min-height: 40vh;
    padding: 16px 0;
  }
  
  .book-view {
    width: 100%;
    max-width: 100%;
    aspect-ratio: auto;
    min-height: 300px;
    /* 移除硬编码的字体大小，使用动态控制 */
  }
}
</style>