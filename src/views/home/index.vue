<template>
  <div class="home-page page-transition">
    <!-- Hero Section - Ion Teal 工具链视觉 -->
    <section class="hero-section animate-fadeInDown">
      <!-- 扫描线效果 -->
      <div class="scan-line"></div>
      
      <!-- 流光背景效果 -->
      <div class="shimmer-bg">
        <div class="shimmer-line line-1"></div>
        <div class="shimmer-line line-2"></div>
        <div class="shimmer-line line-3"></div>
      </div>
      
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      
      <div class="hero-container">
        <div class="hero-content animate-fadeInUp animate-delay-200">
          <div class="hero-grid">
            <div class="hero-left">
              <div class="hero-badge">AI Toolchain Studio</div>
              <h1 class="hero-title">
                用工具链构建智能
                <span class="hero-title-accent">创作流程</span>
              </h1>
              <p class="hero-subtitle">{{ signText }}</p>
              <div class="hero-actions">
                <router-link to="/tools" class="hero-btn primary">进入工具链</router-link>
                <router-link to="/projects" class="hero-btn ghost">查看案例</router-link>
              </div>
              <div class="hero-stats">
                <div class="stat-item">
                  <span class="stat-value">{{ user.tags.length }}</span>
                  <span class="stat-label">工具标签</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">4</span>
                  <span class="stat-label">流程阶段</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">持续更新</span>
                  <span class="stat-label">AI 实验室</span>
                </div>
              </div>
            </div>

            <div class="hero-right">
              <div class="glass-panel">
                <div class="panel-header">
                  <div class="panel-title">Toolchain Map</div>
                  <div class="panel-chip">Ion Teal</div>
                </div>
                <div class="node-grid">
                  <div
                    v-for="(item, index) in user.tags.slice(0, 6)"
                    :key="item + index"
                    class="node-item"
                    :style="{ animationDelay: `${index * 0.12}s` }"
                    @mouseenter="onSkillHover"
                    @mouseleave="onSkillLeave"
                  >
                    <span>{{ item }}</span>
                  </div>
                </div>
                <div class="panel-footer">
                  <div class="avatar-stack">
                    <img class="avatar-mini" src="https://github.com/webkubor/picx-images-hosting/raw/master/webkubor/me.1zi6wrx8na.webp" alt="avatar" />
                    <span class="avatar-name">{{ user.name }}</span>
                  </div>
                  <span class="panel-note">JSON 可拓展结构 · 属性筛选</span>
                </div>
              </div>
              <div class="glass-panel ghost">
                <div class="panel-header">
                  <div class="panel-title">Pipeline Preview</div>
                  <div class="panel-chip">Live</div>
                </div>
                <div class="pipeline-mini">
                  <span>采集</span>
                  <span>生成</span>
                  <span>应用</span>
                  <span>AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AboutSection />

    <XiaoZhuSection />

    <ToolchainSection />

    <FeaturedToolsSection />

    <SentimentCard />

    <!-- 底部全屏视觉收尾 -->
    <div class="footer-wide-decoration">
      <div class="gradient-overlay"></div>
      <img src="https://raw.githubusercontent.com/webkubor/picx-images-hosting/master/assets/decorations/footer-astro.webp" alt="Immersive Ending" />
    </div>


  </div>
</template>

<script setup>
import { useUser } from "@/hooks/useUser";
import { computed, onMounted, ref } from 'vue'
import AboutSection from './components/AboutSection.vue'
import XiaoZhuSection from './components/XiaoZhuSection.vue'
import ToolchainSection from './components/ToolchainSection.vue'
import FeaturedToolsSection from './components/FeaturedToolsSection.vue'
import SentimentCard from './components/SentimentCard.vue'

let { user, updateAge } = useUser();

updateAge("logo.jpeg");

const signText = computed(() => {
  const base = user.personalSign && String(user.personalSign).trim()
  return base && base.length > 0
    ? base
    : '用代码编织数字世界的艺术家'
})

function onSkillHover(event) {
  const skillItem = event.currentTarget
  skillItem.classList.add('hovered')
}

function onSkillLeave(event) {
  const skillItem = event.currentTarget
  skillItem.classList.remove('hovered')
}

onMounted(() => {
  window.addEventListener('vite:preloadError', (event) => {
    window.$message?.warning('检测到有新版本，5秒后即将自动刷新...')
    setTimeout(() => {
      window.location.reload()
      console.log('页面已更新为最新版本...')
    }, 5000)
  })
})
</script>

<style lang="scss" scoped>
// Ion Teal 主题
$primary-orange: #20c4b6;
$accent-orange: #4fe0d2;
$light-orange: #8cf1e7;
$dark-orange: #0f8f83;
$bg-light: #f6f9f9;
$bg-card: #ffffff;
$text-dark: #1a1a1a;
$text-medium: #4a4a4a;
$text-light: #6b7280;
$border-light: rgba(32, 196, 182, 0.12);
$shadow-light: rgba(32, 196, 182, 0.12);
$shadow-hover: rgba(32, 196, 182, 0.24);

.home-page {
  min-height: 100vh;
  background: $bg-light;
  color: $text-dark;
  width: 100%;
  overflow-x: hidden;
}

/* Hero Section - 现代渐变背景 */
.hero-section {
  width: 100%;
  padding: 120px 32px 100px;
  background: linear-gradient(135deg, #ffffff 0%, #f2fbfb 50%, #eef9f8 100%);
  position: relative;
  overflow: hidden;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, $primary-orange 0%, transparent 70%);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, $accent-orange 0%, transparent 70%);
  top: 60%;
  right: 20%;
  animation-delay: 2s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, $light-orange 0%, transparent 70%);
  bottom: 20%;
  left: 60%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

.hero-container {
  width: min(100%, 1200px);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-content {
  text-align: left;
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero Layout */
.hero-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 48px;
  align-items: center;
  text-align: left;
}

.hero-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(32, 196, 182, 0.12);
  color: $dark-orange;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.hero-title {
  font-size: clamp(34px, 6vw, 64px);
  font-weight: 800;
  color: $text-dark;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.hero-title-accent {
  display: block;
  background: linear-gradient(135deg, $primary-orange 0%, $accent-orange 50%, #ff8a3d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 18px;
  color: $text-medium;
  line-height: 1.7;
  max-width: 520px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.hero-btn {
  padding: 12px 22px;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s ease;
}

.hero-btn.primary {
  background: linear-gradient(135deg, $primary-orange, $accent-orange);
  color: #0f1418;
  box-shadow: 0 12px 24px rgba(32, 196, 182, 0.35);
}

.hero-btn.ghost {
  border: 1px solid rgba(32, 196, 182, 0.4);
  color: $text-dark;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px rgba(32, 196, 182, 0.25);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 8px;
}

.stat-item {
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(32, 196, 182, 0.15);
  backdrop-filter: blur(8px);
}

.stat-value {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: $primary-orange;
}

.stat-label {
  font-size: 12px;
  color: $text-light;
}

.hero-right {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.glass-panel {
  padding: 22px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.3));
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 48px rgba(32, 196, 182, 0.18);
}

.glass-panel.ghost {
  background: linear-gradient(135deg, rgba(32, 196, 182, 0.1), rgba(255, 255, 255, 0.3));
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.panel-title {
  font-weight: 700;
  font-size: 16px;
  color: $text-dark;
}

.panel-chip {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(32, 196, 182, 0.18);
  color: $dark-orange;
  font-weight: 600;
}

.node-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.node-item {
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(32, 196, 182, 0.25);
  background: rgba(255, 255, 255, 0.6);
  color: $text-dark;
  font-size: 13px;
  font-weight: 600;
  animation: skillAppear 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(12px);
  transition: all 0.3s ease;
}

.node-item.hovered,
.node-item:hover {
  border-color: rgba(32, 196, 182, 0.5);
  box-shadow: 0 12px 24px rgba(32, 196, 182, 0.2);
}

@keyframes skillAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

.avatar-stack {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar-mini {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(32, 196, 182, 0.4);
}

.avatar-name {
  font-size: 12px;
  color: $text-medium;
  font-weight: 600;
}

.panel-note {
  font-size: 12px;
  color: $text-light;
}

.pipeline-mini {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.pipeline-mini span {
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(32, 196, 182, 0.2);
  font-size: 12px;
  text-align: center;
  color: $text-medium;
}

/* 移动端优化 */
@media (max-width: 799px) {
  .hero-section {
    padding: 100px 20px 80px;
    min-height: 60vh;
  }

  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-btn {
    text-align: center;
  }

  .panel-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .nav-section {
    padding: 60px 20px 80px;
  }
  
  .nav-cards {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .nav-card {
    padding: 32px 24px;
  }
  
  .card-title {
    font-size: 24px;
  }
  
  .card-description {
    font-size: 16px;
  }
}

/* 减少动画支持 */
@media (prefers-reduced-motion: reduce) {
  .gradient-orb,
  .node-item {
    animation: none !important;
  }
  
  * {
    transition-duration: 0.01ms !important;
  }
}

/* 焦点可见性 */
*:focus-visible {
  outline: 2px solid $primary-orange;
  outline-offset: 2px;
}

/* 扫描线效果 */
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, $primary-orange, transparent);
  animation: scanLine 3s linear infinite;
  z-index: 10;
  pointer-events: none;
}

@keyframes scanLine {
  0% { transform: translateY(-100vh); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

/* 扫描网格效果 */
.scan-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(32, 196, 182, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(32, 196, 182, 0.12) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: scanGrid 8s linear infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes scanGrid {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* 流光背景效果 */
.shimmer-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.shimmer-line {
  position: absolute;
  width: 200%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(32, 196, 182, 0.6), transparent);
  animation: shimmerMove 4s linear infinite;
}

.line-1 {
  top: 20%;
  animation-delay: 0s;
}

.line-2 {
  top: 50%;
  animation-delay: 1.5s;
}

.line-3 {
  top: 80%;
  animation-delay: 3s;
}

@keyframes shimmerMove {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 卡片图标动画 */
.icon-shimmer {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: rotate(45deg);
  transition: all 0.6s ease;
  opacity: 0;
  z-index: 3;
}

.nav-card:hover .icon-shimmer {
  top: -100%;
  left: 100%;
  opacity: 1;
}

/* 卡片背景动画 */
.bg-shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(32, 196, 182, 0.12), transparent);
  transform: translateX(-100%);
  animation: bgShimmer 3s ease-in-out infinite;
  z-index: 2;
}

@keyframes bgShimmer {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}

/* 卡片边框流光 */
.card-border-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 30px;
  background: linear-gradient(45deg, $primary-orange, $accent-orange, $light-orange, $primary-orange);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: borderGlow 2s linear infinite;
}

.nav-card:hover .card-border-glow {
  opacity: 0.6;
}

@keyframes borderGlow {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(180deg); }
}

/* 链接轨迹效果 */
.link-trail {
  position: absolute;
  top: 50%;
  right: -20px;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, $primary-orange, transparent);
  transform: translateY(-50%);
  opacity: 0;
  transition: all 0.3s ease;
}

.nav-card:hover .link-trail {
  opacity: 1;
  right: -30px;
}

/* 标题流光效果 */
.title-shimmer {
  position: absolute;
  top: 0;
  left: 50%;
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, $primary-orange, transparent);
  transform: translateX(-50%);
  border-radius: 2px;
  animation: titleShimmer 3s ease-in-out infinite;
}

@keyframes titleShimmer {
  0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleX(0.5); }
  50% { opacity: 1; transform: translateX(-50%) scaleX(1); }
}

/* 底部全屏视觉收尾 */
.footer-wide-decoration {
  width: 100%;
  margin-top: -60px; /* 向上微移，与上方模块产生重叠感 */
  position: relative;
  z-index: 0;
  line-height: 0;
  overflow: hidden;

  .gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(to bottom, #ffffff 0%, transparent 100%);
    z-index: 1;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    opacity: 0.9;
    filter: brightness(1.05) contrast(1.02);
  }
}

@media (max-width: 800px) {
  .footer-wide-decoration {
    margin-top: 0;
    img {
      min-height: 200px;
      width: auto;
      transform: translateX(-20%); /* 移动端截取核心部分 */
    }
  }
}
</style>
