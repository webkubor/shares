<template>
  <div class="section-card">
    <div class="faq">
      <div class="faq-item">
        <h4>Q: 为什么吹不出声音？</h4>
        <p>A: 检查笛膜是否贴好，嘴型是否正确，气息是否足够。</p>
      </div>
      
      <div class="faq-item">
        <h4>Q: 音不准怎么办？</h4>
        <p>A: 调整气息强度，检查手指按孔是否严实，练习音准感。</p>
      </div>
      
      <div class="faq-item">
        <h4>Q: 手指按不住孔怎么办？</h4>
        <p>A: 多做手指灵活性练习，确保指尖垂直按孔，逐渐增强手指力量。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 常见问题卡片组件
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
  
  padding: 32px;
  
  h3 {
    color: #1e293b;
    margin-bottom: 20px;
    font-size: 18px;
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
}

.faq {
  .faq-item {
    margin-bottom: 20px;
    padding: 24px;
    background: linear-gradient(135deg, #fefefe, #f8fafc);
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(135deg, #4ade80, #22c55e);
    }
    
    h4 {
      margin-bottom: 12px;
      color: #1e293b;
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    p {
      margin: 0;
      color: #475569;
      line-height: 1.6;
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