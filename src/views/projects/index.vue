<template>
  <div class="projects-page page-transition">
    <div class="diffuse-backdrop">
      <span class="halo halo-a"></span>
      <span class="halo halo-b"></span>
      <span class="halo halo-c"></span>
    </div>

    <div class="page-header animate-fadeInDown">
      <div class="header-content">
        <span class="header-kicker">Workflow Cases</span>
        <h1 class="page-title en-title">Prismatic Portfolio</h1>
        <p class="page-subtitle">用弥散渐变与液态玻璃展示工具链落地项目。</p>
      </div>
      <router-link to="/" class="back-btn">
        <span>←</span> 返回主页
      </router-link>
    </div>
    
    <div class="projects-container glass-shell">
      <ProjectList />
    </div>
  </div>
</template>

<script setup>
import ProjectList from './components/list.vue'
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.projects-page {
  min-height: 100vh;
  padding: 56px 24px 120px;
  background: radial-gradient(circle at 10% 10%, rgba(79, 224, 210, 0.28), transparent 50%),
    radial-gradient(circle at 90% 20%, rgba(255, 138, 61, 0.2), transparent 55%),
    radial-gradient(circle at 20% 80%, rgba(32, 196, 182, 0.2), transparent 45%),
    #f2f8f7;
  color: var(--text-primary);
  position: relative;
  overflow: hidden;
}

.diffuse-backdrop {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.halo {
  position: absolute;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
}

.halo-a {
  top: -100px;
  left: 10%;
  background: radial-gradient(circle, rgba(32, 196, 182, 0.5), transparent 70%);
}

.halo-b {
  top: 140px;
  right: -120px;
  background: radial-gradient(circle, rgba(255, 138, 61, 0.35), transparent 70%);
}

.halo-c {
  bottom: -140px;
  left: 20%;
  background: radial-gradient(circle, rgba(79, 224, 210, 0.38), transparent 70%);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
}

.header-content {
  text-align: left;
}

.header-kicker {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.28em;
  color: rgba(32, 196, 182, 0.8);
  display: inline-block;
  margin-bottom: 12px;
}

.page-title {
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 16px;
  color: rgba(16, 20, 24, 0.72);
  font-weight: 400;
  opacity: 0.8;
  max-width: 480px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(32, 196, 182, 0.35);
  border-radius: 12px;
  color: #0f1418;
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
  position: relative;
  z-index: 1;
}

.glass-shell {
  padding: 28px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.35));
  backdrop-filter: blur(22px);
  box-shadow: 0 25px 60px rgba(32, 196, 182, 0.18);
}

@media (max-width: 720px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .glass-shell {
    padding: 20px;
  }
}

</style>
