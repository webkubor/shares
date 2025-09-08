<template>
  <div class="home-page">
    <UserInfo />
    <div class="show-container">
      <n-tabs type="segment" animated>
        <n-tab-pane name="chap1" tab="有趣的尝试">
          <ToolView />
        </n-tab-pane>

        <n-tab-pane name="chap3" tab="项目展示">
          <ProjectList />
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>
<script setup>
import UserInfo from "./components/UserInfo.vue";
import ProjectList from "./components/ProjectList.vue";
import ToolView from './components/Tool.vue'

window.addEventListener('vite:preloadError', (event) => {
  window.$message?.warning('检测到有新版本，5秒后即将自动刷新...');
  setTimeout(() => {
    window.location.reload() // 例如，刷新页面
    console.log('页面已更新为最新版本...');
  }, 5000)
})


</script>
<style lang="scss" scoped>
.home-page {
  padding: 20px 0 80px;
  min-height: 100vh;
  position: relative;
  
  .light_theme & {
    background: 
      radial-gradient(ellipse at 20% 20%, rgba(240, 240, 240, 0.8) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(230, 230, 230, 0.8) 0%, transparent 60%),
      linear-gradient(135deg, rgba(245, 245, 245, 0.95) 0%, rgba(225, 225, 225, 0.95) 100%);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.02) 0%, transparent 30%),
        radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.02) 0%, transparent 30%);
      pointer-events: none;
    }
  }
  
  .dark_theme & {
    background: 
      radial-gradient(ellipse at 20% 20%, rgba(40, 40, 40, 0.8) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(30, 30, 30, 0.8) 0%, transparent 60%),
      linear-gradient(135deg, rgba(25, 25, 25, 0.95) 0%, rgba(45, 45, 45, 0.95) 100%);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.02) 0%, transparent 30%),
        radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.02) 0%, transparent 30%);
      pointer-events: none;
    }
  }
  
  .show-container {
    margin: 0 auto;
    width: 90%;
    max-width: 1200px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    
    .light_theme & {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.08);
      
      :deep(.n-tabs-nav) {
        background: rgba(255, 255, 255, 0.7);
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        
        .n-tabs-tab {
          color: rgba(0, 0, 0, 0.7);
          
          &:hover {
            color: #2354FF;
            background: rgba(0, 0, 0, 0.05);
          }
          
          &.n-tabs-tab--active {
            color: #2354FF;
            background: rgba(0, 0, 0, 0.05);
          }
        }
      }
    }
    
    .dark_theme & {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      
      :deep(.n-tabs-nav) {
        background: rgba(255, 255, 255, 0.05);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        
        .n-tabs-tab {
          color: rgba(255, 255, 255, 0.7);
          
          &:hover {
            color: white;
            background: rgba(255, 255, 255, 0.1);
          }
          
          &.n-tabs-tab--active {
            color: white;
            background: rgba(255, 255, 255, 0.15);
          }
        }
      }
    }
    
    :deep(.n-tab-pane) {
      padding: 24px;
    }
  }
}

@media screen and (max-width: 768px) {
  .home-page {
    padding: 16px 0 60px;
    
    .show-container {
      width: calc(100% - 32px);
      border-radius: 12px;
      
      :deep(.n-tabs-nav) {
        .n-tabs-tab {
          padding: 12px 16px;
          font-size: 14px;
        }
      }
      
      :deep(.n-tab-pane) {
        padding: 16px;
      }
    }
  }
}
</style>
