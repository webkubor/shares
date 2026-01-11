<template>
  <div class="tools-page page-transition">
    <div class="liquid-backdrop">
      <span class="orb orb-a"></span>
      <span class="orb orb-b"></span>
      <span class="orb orb-c"></span>
    </div>

    <div class="page-header animate-fadeInDown">
      <router-link to="/" class="back-icon" aria-label="Back" v-ripple>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </router-link>
      <div class="header-content">
        <span class="header-kicker">Toolchain Index</span>
        <h1 class="page-title text-gradient-animate en-title">Liquid Toolkit</h1>
        <p class="page-subtitle">以 JSON 驱动结构、以属性筛选能力，保持工具链可拓展。</p>
      </div>
    </div>
    
    <div class="tools-container glass-shell">
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
  padding: 56px 24px 120px;
  background: radial-gradient(circle at top left, rgba(255, 157, 80, 0.18), transparent 45%),
    radial-gradient(circle at 70% 20%, rgba(255, 199, 138, 0.2), transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(255, 122, 0, 0.12), transparent 45%),
    #faf7f4;
  color: var(--text-primary);
  position: relative;
  overflow: hidden;
}

.liquid-backdrop {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.6;
}

.orb-a {
  top: -80px;
  left: -60px;
  background: radial-gradient(circle, rgba(255, 122, 0, 0.45), transparent 70%);
}

.orb-b {
  top: 120px;
  right: -80px;
  background: radial-gradient(circle, rgba(255, 201, 142, 0.45), transparent 70%);
}

.orb-c {
  bottom: -120px;
  left: 20%;
  background: radial-gradient(circle, rgba(255, 140, 84, 0.35), transparent 70%);
}

.page-header {
  display: flex;
  align-items: flex-start;
  gap: 24px;
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
  color: rgba(255, 122, 0, 0.8);
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
  color: rgba(34, 34, 34, 0.7);
  font-weight: 400;
  opacity: 0.8;
  max-width: 480px;
}

.back-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #2b1f16;
  text-decoration: none;
  border: 1px solid rgba(255, 122, 0, 0.35);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
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
  position: relative;
  z-index: 1;
}

.glass-shell {
  padding: 28px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.35));
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 60px rgba(255, 122, 0, 0.15);
}

@media (max-width: 720px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .glass-shell {
    padding: 20px;
  }
}

</style>
