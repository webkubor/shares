<template>
  <div class="section-card">
    <div class="basics">
      <h3>竹笛简介</h3>
      <p>竹笛是中国传统的木管乐器，由竹子制成，音色清脆悠扬，是民族音乐中重要的独奏和合奏乐器。</p>
      <div class="image-container">
        <img src="../assets/introduce.png" alt="竹笛简介" class="intro-image">
      </div>
      
      <h3>竹笛构造</h3>
      <ul>
        <li><strong>笛身：</strong>主要的发声部分</li>
        <li><strong>笛膜：</strong>贴在膜孔上，影响音色</li>
        <li><strong>笛塞：</strong>调节音高的部件</li>
        <li><strong>音孔：</strong>控制不同音高的孔洞</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// 基础知识卡片组件
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
  
  padding: 28px;
  
  h3 {
    font-size: 19px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
  }
  
  h3 {
    color: #1e293b;
    margin-bottom: 20px;
    font-size: 16px;
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
      background: linear-gradient(135deg, #4ade80, #22c55e);
      border-radius: 2px;
    }
  }
  
  h4 {
    color: #334155;
    margin-bottom: 12px;
    font-weight: 600;
  }
  
  p {
    line-height: 1.6;
    color: #475569;
    margin-bottom: 14px;
    font-size: 14px;
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
  
  .image-container {
    text-align: center;
    margin: 20px 0;
    
    .intro-image {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.02);
      }
    }
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
}
</style>