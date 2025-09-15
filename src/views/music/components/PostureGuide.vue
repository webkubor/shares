<template>
  <n-card title="持笛姿势" class="section-card">
    <div class="posture">
      <h3>正确的持笛方法</h3>
      <ol>
        <li>双手自然握持笛身</li>
        <li>左手在上，右手在下</li>
        <li>拇指托住笛身背面</li>
        <li>其余手指自然弯曲，指尖按孔</li>
      </ol>
      
      <h3>演奏姿势</h3>
      <ul>
        <li>身体挺直，肩膀放松</li>
        <li>笛子与身体呈45度角</li>
        <li>头部微微向左转</li>
        <li>呼吸要深而稳</li>
      </ul>
    </div>
  </n-card>
</template>

<script setup lang="ts">
// 持笛姿势卡片组件
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