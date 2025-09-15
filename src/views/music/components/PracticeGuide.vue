<template>
  <div class="section-card">
    <div class="practice">
      <h3>初学者练习步骤</h3>
      <ol>
        <li><strong>长音练习：</strong>每个音保持8拍，注意音色的稳定</li>
        <li><strong>音阶练习：</strong>从低音5到高音5，上行下行反复练习</li>
        <li><strong>简单曲目：</strong>选择《茉莉花》、《小星星》等简单曲目</li>
        <li><strong>气息控制：</strong>练习腹式呼吸，保持气息稳定</li>
      </ol>
      
      <h3>练习注意事项</h3>
      <ul>
        <li>每天坚持练习30分钟以上</li>
        <li>注意手指的灵活性训练</li>
        <li>保持正确的演奏姿势</li>
        <li>循序渐进，不要急于求成</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// 练习建议卡片组件
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
    font-size: 1rem;
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
    color: #374151;
    margin: 16px 0 8px 0;
    font-size: 16px;
    font-weight: 600;
  }
  
  p {
    line-height: 1.6;
    color: #475569;
    margin-bottom: 12px;
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