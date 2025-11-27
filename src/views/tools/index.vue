<template>
  <div class="tools-page page-transition">
    <div class="page-header animate-fadeInDown">
      <router-link to="/" class="back-icon" aria-label="Back" v-ripple>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </router-link>
      <div class="header-content">
        <h1 class="page-title text-gradient-animate">Creative Tools</h1>
        <p class="page-subtitle">探索有趣的工具和实验</p>
      </div>
    </div>
    
    <div class="tools-container">
      <ToolView />
    </div>
  </div>
</template>

<script setup>
import ToolView from './components/Tool.vue'
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.tools-page {
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

.back-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--text-primary);
  text-decoration: none;
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  transition: all .2s ease;
}

.back-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--shadow-hover);
  border-color: var(--color-primary);
}

.tools-container {
  max-width: 1200px;
  margin: 0 auto;
}


</style>