<template>
  <n-card title="🎵 竹笛转调对应表" class="section-card">
    <div class="card-content">
      <p>这里适合你需要演奏-有一定的指法基础和两个笛子以上的，有合奏和调门疑惑的同学</p>
      <div class="image-container">
        <img src="../assets/trans.png" alt="竹笛转调对应表" class="trans-chart">
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
// 基础指法卡片组件
</script>

<style lang="scss" scoped>
.section-card {
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  
  :deep(.n-card-header) {
    background: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 18px 24px;
    
    .n-card-header__main {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1e293b;
    }
  }
  
  :deep(.n-card__content) {
    padding: 20px 24px;
    background: #ffffff;
  }
  
  p {
    line-height: 1.6;
    color: #475569;
    margin-bottom: 16px;
    font-size: 0.9rem;
  }
}

.card-content {
  .image-container {
    text-align: center;
    margin-top: 16px;
    
    .trans-chart {
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
    margin-bottom: 20px;
    
    :deep(.n-card-header) {
      padding: 16px 20px;
      
      .n-card-header__main {
        font-size: 1.2rem;
      }
    }
    
    :deep(.n-card__content) {
      padding: 20px;
    }
  }
  
  .card-content {
    p {
      font-size: 0.95rem;
      margin-bottom: 16px;
    }
    
    .image-container {
      margin-top: 12px;
      
      .trans-chart {
        border-radius: 8px;
      }
    }
  }
}
</style>