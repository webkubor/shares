<template>
  <div class="flute-page">

    
    <div class="content">
      <n-collapse :default-expanded-names="['basic', 'practice', 'faq']">
        <n-collapse-item title="基础知识" name="basic">
          <BasicKnowledge />
        </n-collapse-item>
        
        <n-collapse-item title="练习建议" name="practice">
          <PracticeGuide />
        </n-collapse-item>
        
        <n-collapse-item title="常见问题" name="faq">
          <FAQ />
        </n-collapse-item>
        
        <n-collapse-item title="🧐 竹笛选购与保养指南" name="guide">
          <FluteGuide />
        </n-collapse-item>
        
        <n-collapse-item title="🎵 竹笛转调对应表 (进阶)" name="fingering">
          <BasicFingering />
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicKnowledge from './components/BasicKnowledge.vue'
import BasicFingering from './components/BasicFingering.vue'
import PracticeGuide from './components/PracticeGuide.vue'
import FAQ from './components/FAQ.vue'
import FluteGuide from './components/FluteGuide.vue'

// 竹笛演奏指导页面
</script>

<style lang="scss" scoped>
.flute-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  

  
  .content {
    max-width: 900px;
    margin: 0 auto;
    padding: 32px 20px 60px;
    
    > * {
      margin-bottom: 24px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

:deep(.n-collapse) {
  background: transparent;
}

:deep(.n-collapse-item) {
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.n-collapse-item__header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 18px;
  padding: 16px 20px;
}

:deep(.n-collapse-item__header:hover) {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

:deep(.n-collapse-item__content-wrapper) {
  background: white;
}

:deep(.n-collapse-item__content-inner) {
  padding: 0;
}

@media (max-width: 768px) {
  .flute-page {
    .header {
      padding: 30px 15px;
      
      .title {
        font-size: 28px;
      }
      
      .subtitle {
        font-size: 16px;
      }
    }
    
    .content {
      padding: 20px 15px;
    }
  }
}
</style>