<template>
  <n-card title="基础指法" class="section-card">
    <div class="fingering">
      <h3>音阶指法表</h3>
      <div class="fingering-chart">
        <div class="note-item">
          <span class="note">低音5 (sol)</span>
          <span class="fingers">● ● ● ● ● ●</span>
        </div>
        <div class="note-item">
          <span class="note">低音6 (la)</span>
          <span class="fingers">● ● ● ● ● ○</span>
        </div>
        <div class="note-item">
          <span class="note">低音7 (si)</span>
          <span class="fingers">● ● ● ● ○ ○</span>
        </div>
        <div class="note-item">
          <span class="note">中音1 (do)</span>
          <span class="fingers">● ● ● ○ ○ ○</span>
        </div>
        <div class="note-item">
          <span class="note">中音2 (re)</span>
          <span class="fingers">● ● ○ ○ ○ ○</span>
        </div>
        <div class="note-item">
          <span class="note">中音3 (mi)</span>
          <span class="fingers">● ○ ○ ○ ○ ○</span>
        </div>
      </div>
      <p class="note-explanation">● 表示按住音孔，○ 表示打开音孔</p>
    </div>
  </n-card>
</template>

<script setup lang="ts">
// 基础指法卡片组件
</script>

<style lang="scss" scoped>
.section-card {
  margin-bottom: 32px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
  }
  
  :deep(.n-card-header) {
    background: linear-gradient(135deg, #f8fafc, #e2e8f0);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 24px 32px;
    
    .n-card-header__main {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
    }
  }
  
  :deep(.n-card__content) {
    padding: 32px;
  }
  
  h3 {
    color: #1e293b;
    margin-bottom: 20px;
    font-size: 1.4rem;
    font-weight: 600;
    position: relative;
    padding-left: 16px;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 20px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 2px;
    }
  }
  
  h4 {
    color: #334155;
    margin-bottom: 12px;
    font-weight: 600;
  }
  
  p {
    line-height: 1.7;
    color: #475569;
    margin-bottom: 16px;
    font-size: 1rem;
  }
  
  ul, ol {
    padding-left: 24px;
    
    li {
      margin-bottom: 10px;
      line-height: 1.6;
      color: #475569;
      
      strong {
        color: #1e293b;
        font-weight: 600;
      }
    }
  }
}

.fingering-chart {
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  padding: 28px;
  border-radius: 16px;
  margin: 24px 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  .note-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: white;
    margin-bottom: 8px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateX(4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .note {
      font-weight: 600;
      color: #1e293b;
      min-width: 140px;
      font-size: 1.1rem;
    }
    
    .fingers {
      font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
      font-size: 1.3rem;
      color: #dc2626;
      letter-spacing: 6px;
      font-weight: 600;
    }
  }
  
  .note-explanation {
    margin-top: 20px;
    font-size: 0.95rem;
    color: #64748b;
    font-style: italic;
    text-align: center;
    padding: 12px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
  }
}

@media (max-width: 768px) {
  .section-card {
    :deep(.n-card-header) {
      padding: 20px 24px;
    }
    
    :deep(.n-card__content) {
      padding: 24px;
    }
  }
  
  .fingering-chart {
    padding: 20px;
    
    .note-item {
      flex-direction: column;
      align-items: flex-start;
      padding: 16px;
      
      .note {
        margin-bottom: 8px;
        min-width: auto;
      }
      
      .fingers {
        letter-spacing: 4px;
      }
    }
  }
}
</style>