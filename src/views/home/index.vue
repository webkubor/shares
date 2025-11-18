<template>
  <div class="home-page">
    <UserInfo />
    <div class="home-cta">
      <button class="cta-btn" data-variant="primary" @click="activeTab = 'chap1'">Explore Tools</button>
      <button class="cta-btn" @click="activeTab = 'chap3'">View Projects</button>
    </div>
    <div class="show-container">
      <div role="tablist" class="tabs-nav">
        <button
          :class="['tab-btn', activeTab === 'chap1' ? 'is-active' : '']"
          role="tab"
          aria-selected="{{ activeTab === 'chap1' }}"
          @click="activeTab = 'chap1'"
        >有趣的尝试</button>
        <button
          :class="['tab-btn', activeTab === 'chap3' ? 'is-active' : '']"
          role="tab"
          aria-selected="{{ activeTab === 'chap3' }}"
          @click="activeTab = 'chap3'"
        >项目展示</button>
      </div>
      <div class="tabs-content">
        <div v-show="activeTab === 'chap1'" class="tab-pane">
          <ToolView />
        </div>
        <div v-show="activeTab === 'chap3'" class="tab-pane">
          <ProjectList />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import UserInfo from "./components/UserInfo.vue";
import ProjectList from "./components/ProjectList.vue";
import ToolView from './components/Tool.vue'
import { ref } from 'vue'

const activeTab = ref('chap1')

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
      radial-gradient(ellipse at 20% 20%, rgba(147, 197, 253, 0.25) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 80%, rgba(167, 139, 250, 0.25) 0%, transparent 55%),
      linear-gradient(135deg, rgba(246, 248, 252, 0.95) 0%, rgba(242, 245, 250, 0.95) 100%);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 20px);
      pointer-events: none;
    }
  }
  
  .dark_theme & {
    background:
      radial-gradient(ellipse at 20% 20%, rgba(35, 84, 255, 0.12) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(124, 58, 237, 0.12) 0%, transparent 60%),
      linear-gradient(135deg, rgba(15, 22, 41, 0.95) 0%, rgba(18, 26, 51, 0.95) 100%);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 20px);
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
    }
    .dark_theme & {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    
    .tabs-nav {
      display: flex;
      gap: 12px;
      padding: 14px;
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--border-color);
    }
    .tab-btn {
      border: 1px solid var(--border-color);
      border-radius: 999px;
      padding: 10px 18px;
      color: var(--text-secondary);
      background: rgba(0,0,0,0.03);
      font-weight: 600;
      letter-spacing: .5px;
      transition: all .2s ease;
    }
    .tab-btn:hover { filter: brightness(1.05); transform: translateY(-1px); }
    .tab-btn.is-active {
      background-image: var(--brand-gradient);
      border: 0;
      color: #fff;
      box-shadow: 0 8px 24px rgba(35, 84, 255, 0.18);
    }
    .tabs-content { padding: 24px; background: var(--bg-elevated); border: 1px solid var(--border-color); border-top: 0; }
  }

  .home-cta {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: -8px;
    margin-bottom: 16px;
  }
  .cta-btn {
    height: 40px;
    padding: 0 18px;
    font-weight: 700;
    border-radius: 999px;
    border: 1px solid var(--border-color);
    background: rgba(0,0,0,.03);
    color: var(--text-primary);
  }
  .cta-btn[data-variant="primary"] { background-image: var(--brand-gradient); border: 0; color: #fff; box-shadow: 0 8px 24px rgba(35,84,255,.18); }
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

.light_theme .home-page::before,
.dark_theme .home-page::before {
  display: none;
}
</style>
