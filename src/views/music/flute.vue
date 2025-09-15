<template>
  <div class="flute-guide">
    <div class="header">
      <h1 class="title">竹笛演奏指导</h1>
      <p class="subtitle">学习竹笛演奏的基础知识和技巧</p>
    </div>
    
    <div class="content">
      <BasicKnowledge />
      <PostureGuide />
      <BasicFingering />
      <PracticeGuide />
      <FAQ />
      
      <!-- 竹笛选购与保养指南 -->
      <FluteGuide />
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicKnowledge from './components/BasicKnowledge.vue'
import PostureGuide from './components/PostureGuide.vue'
import BasicFingering from './components/BasicFingering.vue'
import PracticeGuide from './components/PracticeGuide.vue'
import FAQ from './components/FAQ.vue'
import FluteGuide from './components/FluteGuide.vue'

// 竹笛演奏指导页面
</script>

<style lang="scss" scoped>
.flute-guide {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  
  .header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 60px 20px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    
    .title {
      font-size: 3.5rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 15px;
      font-weight: 700;
      letter-spacing: -1px;
    }
    
    .subtitle {
      font-size: 1.3rem;
      color: #64748b;
      margin: 0;
      font-weight: 400;
    }
  }
  
  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }
}

@media (max-width: 768px) {
  .flute-guide {
    .header {
      padding: 40px 15px;
      
      .title {
        font-size: 2.5rem;
      }
      
      .subtitle {
        font-size: 1.1rem;
      }
    }
    
    .content {
      padding: 20px 15px;
    }
  }
}
</style>