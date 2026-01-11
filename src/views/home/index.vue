<template>
  <div class="home-page page-transition">
    <!-- Hero Section - 重新设计为现代橙色主题 -->
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
          <div class="profile-section" @mouseenter="onProfileHover" @mouseleave="onProfileLeave">
            <div class="avatar-container">
              <img class="avatar" src="https://github.com/webkubor/picx-images-hosting/raw/master/webkubor/me.1zi6wrx8na.webp" alt="avatar" />
              <div class="avatar-glow"></div>
              <div class="avatar-scan"></div>
              <div class="avatar-particles"></div>
            </div>
            <h1 class="profile-name">{{ user.name }}</h1>
          </div>
          
          <div class="signature-section" @mouseenter="onSignatureHover" @mouseleave="onSignatureLeave">
            <div class="signature-card">
              <span class="signature-text">{{ signText }}</span>
              <div class="signature-underline" :class="{ 'active': signatureHovered }"></div>
              <div class="signature-glow"></div>
              <div class="text-shimmer"></div>
            </div>
          </div>
          
          <div class="skills-showcase">
            <div class="skills-grid">
              <div 
                v-for="(item, index) in user.tags.slice(0, 8)" 
                :key="item + index"
                class="skill-item"
                :style="{ animationDelay: `${index * 0.1}s` }"
                @mouseenter="onSkillHover"
                @mouseleave="onSkillLeave"
              >
                <span class="skill-text">{{ item }}</span>
                <div class="skill-glow"></div>
                <div class="skill-pulse"></div>
                <div class="skill-border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ToolchainSection />

    <FeaturedToolsSection />

    <NavigationSection />


  </div>
</template>

<script setup>
import { useUser } from "@/hooks/useUser";
import { computed, onMounted, ref } from 'vue'
import ToolchainSection from './components/ToolchainSection.vue'
import FeaturedToolsSection from './components/FeaturedToolsSection.vue'
import NavigationSection from './components/NavigationSection.vue'

let { user, updateAge } = useUser();

updateAge("logo.jpeg");

// 交互状态
const signatureHovered = ref(false)
const profileHovered = ref(false)

const signText = computed(() => {
  const base = user.personalSign && String(user.personalSign).trim()
  return base && base.length > 0
    ? base
    : '用代码编织数字世界的艺术家'
})

// 交互函数
function onSignatureHover() {
  signatureHovered.value = true
}

function onSignatureLeave() {
  signatureHovered.value = false
}

function onProfileHover() {
  profileHovered.value = true
}

function onProfileLeave() {
  profileHovered.value = false
}

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
// 现代橙色主题设计
$primary-orange: #ff6b35;
$accent-orange: #f7931e;
$light-orange: #ffb627;
$dark-orange: #e55a2b;
$bg-light: #fafbfc;
$bg-card: #ffffff;
$text-dark: #1a1a1a;
$text-medium: #4a4a4a;
$text-light: #6b7280;
$border-light: rgba(255, 107, 53, 0.1);
$shadow-light: rgba(255, 107, 53, 0.1);
$shadow-hover: rgba(255, 107, 53, 0.2);

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
  background: linear-gradient(135deg, #ffffff 0%, #fff8f5 50%, #fff0eb 100%);
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
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

/* Profile Section */
.profile-section {
  margin-bottom: 60px;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 32px;
}

.avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid $primary-orange;
  box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
}

.avatar-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  background: radial-gradient(circle, $primary-orange 0%, transparent 70%);
  filter: blur(20px);
  opacity: 0.6;
  z-index: 1;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.profile-name {
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 800;
  color: $text-dark;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, $primary-orange 0%, $accent-orange 50%, $light-orange 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.profile-title {
  font-size: clamp(18px, 3vw, 24px);
  color: $text-medium;
  font-weight: 500;
  margin-bottom: 40px;
  letter-spacing: 0.01em;
}

/* Signature Section */
.signature-section {
  margin-bottom: 60px;
}

.signature-card {
  position: relative;
  display: inline-block;
  padding: 32px 48px;
  background: $bg-card;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(255, 107, 53, 0.1);
  border: 1px solid $border-light;
  backdrop-filter: blur(10px);
}

.signature-text {
  font-size: clamp(20px, 4vw, 32px);
  font-weight: 600;
  color: $text-dark;
  line-height: 1.4;
  position: relative;
  z-index: 2;
}

.signature-underline {
  position: absolute;
  bottom: 24px;
  left: 48px;
  right: 48px;
  height: 3px;
  background: linear-gradient(90deg, $primary-orange 0%, $accent-orange 100%);
  border-radius: 2px;
  animation: underlineGrow 1s ease-out;
}

@keyframes underlineGrow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* Skills Showcase */
.skills-showcase {
  max-width: 600px;
  margin: 0 auto;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  padding: 20px;
}

.skill-item {
  position: relative;
  padding: 16px 20px;
  background: $bg-card;
  border-radius: 16px;
  box-shadow: 0 8px 16px $shadow-light;
  border: 1px solid $border-light;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: skillAppear 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.skill-text {
  font-size: 14px;
  font-weight: 600;
  color: $primary-orange;
  text-align: center;
  display: block;
}

.skill-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  background: radial-gradient(circle at center, $primary-orange 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.skill-item:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px $shadow-hover;
  
  .skill-glow {
    opacity: 0.1;
  }
}

@keyframes skillAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 移动端优化 */
@media (max-width: 799px) {
  .hero-section {
    padding: 100px 20px 80px;
    min-height: 60vh;
  }
  
  .avatar {
    width: 140px;
    height: 140px;
  }
  
  .profile-name {
    font-size: clamp(28px, 8vw, 40px);
  }
  
  .signature-card {
    padding: 24px 32px;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 12px;
    padding: 16px;
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
  .avatar-glow,
  .skill-item {
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
    linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px);
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
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.6), transparent);
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

/* 头像扫描效果 */
.avatar-scan {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(45deg, $primary-orange, $accent-orange, $light-orange, $primary-orange) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: avatarScan 3s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
}

.profile-section:hover .avatar-scan {
  opacity: 1;
}

@keyframes avatarScan {
  0%, 100% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 头像粒子效果 */
.avatar-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  transform: translate(-50%, -50%);
  z-index: 4;
  pointer-events: none;
}

.avatar-particles::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: $primary-orange;
  border-radius: 50%;
  box-shadow: 
    0 -80px 0 $light-orange, 0 80px 0 $accent-orange,
    -80px 0 0 $primary-orange, 80px 0 0 $dark-orange,
    -56px -56px 0 $light-orange, 56px -56px 0 $accent-orange,
    -56px 56px 0 $primary-orange, 56px 56px 0 $dark-orange;
  animation: particleRotate 6s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-section:hover .avatar-particles::before {
  opacity: 0.8;
}

@keyframes particleRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* 签名流光效果 */
.signature-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  background: linear-gradient(135deg, $primary-orange 0%, $accent-orange 100%);
  opacity: 0;
  filter: blur(20px);
  z-index: 1;
  transition: opacity 0.3s ease;
}

.signature-section:hover .signature-glow {
  opacity: 0.1;
}

.text-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  z-index: 3;
  transition: left 0.6s ease;
}

.signature-section:hover .text-shimmer {
  left: 100%;
}

/* 技能项动画效果 */
.skill-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 2px solid $primary-orange;
  border-radius: 16px;
  transform: translate(-50%, -50%) scale(1);
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 2;
}

.skill-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  background: linear-gradient(45deg, $primary-orange, $accent-orange, $light-orange, $primary-orange);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  animation: borderFlow 2s linear infinite;
}

.skill-item.hovered .skill-pulse {
  animation: skillPulse 1s ease-out;
}

.skill-item.hovered .skill-border {
  opacity: 0.3;
}

@keyframes skillPulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
}

@keyframes borderFlow {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(180deg); }
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
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.1), transparent);
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
</style>
