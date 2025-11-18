<template>
  <div class="projects-page page-transition">
    <div class="page-header animate-fadeInDown">
      <div class="header-content">
        <h1 class="page-title text-gradient-animate">Project Showcase</h1>
        <p class="page-subtitle">精选项目展示</p>
      </div>
      <router-link to="/" class="back-btn">
        <span>←</span> 返回主页
      </router-link>
    </div>
    
    <div class="projects-container">
      <ProjectList />
    </div>
  </div>
</template>

<script setup>
import ProjectList from './components/ProjectList.vue'
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.projects-page {
  min-height: 100vh;
  padding: 40px 24px;
  background: var(--bg-base);
  color: var(--text-primary);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.header-content {
  text-align: left;
}

.page-title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  font-weight: 400;
  opacity: 0.8;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px var(--shadow-hover);
    border-color: var(--color-primary);
  }
}

.projects-container {
  max-width: 1200px;
  margin: 0 auto;
}

// 深色主题适配
:global(.dark_theme) {
  .projects-page {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  }
}
</style>