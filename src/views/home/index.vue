<template>
  <div class="home-page page-transition">
    <!-- Hero Section -->
    <section class="hero-section animate-fadeInDown">
      <div class="hero-container">
        <div class="about-me animate-fadeInUp animate-delay-200">
          <div class="love-headers">
            <div class="avatar-wrap">
              <img class="avatar" src="https://github.com/webkubor/picx-images-hosting/raw/master/webkubor/me.1zi6wrx8na.webp" alt="avatar" />
              <div class="tooltip">Designed by {{ user.name }}</div>
            </div>
          </div>
          <span class="sign">
            {{ signText }}
            <span></span>
          </span>
          <div class="tags">
            <div class="tags-container">
              <span
                v-for="(item, index) in user.tags.slice(0, 6)"
                :key="item + index"
                class="tag"
                :style="getTagStyle(getRandomType())"
              >{{ item }}</span>
              <span
                v-if="user.tags && user.tags.length > 6"
                class="tag more-tag"
              >+{{ user.tags.length - 6 }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Section -->
    <section class="nav-section animate-fadeInUp animate-delay-600">
      <div class="nav-container">
        <h2 class="section-title">探索更多</h2>
        <div class="nav-cards">
          <router-link to="/tools" class="nav-card tools-card">
            <div class="card-icon">🛠️</div>
            <h3 class="card-title">创意工具</h3>
            <p class="card-description">探索有趣的工具和实验</p>
            <span class="card-arrow">→</span>
          </router-link>
          
          <router-link to="/projects" class="nav-card projects-card">
            <div class="card-icon">🚀</div>
            <h3 class="card-title">项目展示</h3>
            <p class="card-description">精选项目展示</p>
            <span class="card-arrow">→</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useUser } from "@/hooks/useUser";
import { getRandomType } from "@/utils/random";
import { computed, onMounted } from 'vue'

let { user, updateAge } = useUser();

updateAge("logo.jpeg");

function getTagStyle(type) {
  const map = {
    success: { background: '#30C0A2', color: '#fff' },
    info: { background: '#5E64DA', color: '#fff' },
    warning: { background: '#FFB31C', color: '#000' },
    error: { background: '#CF1322', color: '#fff' },
    default: { background: '#2354FF', color: '#fff' }
  }
  return map[type] || map.default
}

const signText = computed(() => {
  const base = user.personalSign && String(user.personalSign).trim()
  return base && base.length > 0
    ? base
    : '用代码编织数字世界的艺术家'
})

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
// 引入变量文件
@import "@/styles/variables.scss";

// 默认使用亮色主题变量
$bg-base: $light-bg-base;
$bg-surface: $light-bg-surface;
$bg-elevated: $light-bg-elevated;
$text-primary: $light-text-primary;
$text-secondary: $light-text-secondary;
$text-tertiary: $light-text-tertiary;
$border-color: $light-border-color;
$border-hover: $light-border-hover;
$shadow-color: $light-shadow-color;
$shadow-hover: $light-shadow-hover;
$glass-bg: $light-glass-bg;
$glass-border: $light-glass-border;
$glass-shadow: $light-glass-shadow;
$brand-gradient: $light-brand-gradient;
$surface-gradient: $light-surface-gradient;
$color-primary: $light-color-primary;
$color-accent: $light-color-accent;

.home-page {
  min-height: 100vh;
  background: var(--bg-base);
  color: var(--text-primary);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* Hero Section */
.hero-section {
  width: 100%;
  padding: 100px 32px 80px;
  background: var(--bg-base);
  position: relative;
  overflow: hidden;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 30%, rgba(255, 107, 0, 0.06) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255, 140, 66, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 70%, var(--bg-base) 100%);
    pointer-events: none;
  }
}

.hero-container {
  width: min(100%, 960px);
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Navigation Section */
.nav-section {
  padding: 0 32px 100px;
  margin-top: -60px;
  position: relative;
  z-index: 10;
  width: 100%;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 48px;
  letter-spacing: -0.02em;
}

.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 800px;
  margin: 0 auto;
}

.nav-card {
  display: block;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 40px 32px;
  text-decoration: none;
  color: var(--text-primary);
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(16px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--brand-gradient);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-hover);
    border-color: var(--color-primary);

    &::before {
      opacity: 0.9;
    }

    .card-arrow {
      transform: translateX(4px);
    }
  }
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.card-description {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 20px;
}

.card-arrow {
  font-size: 24px;
  color: var(--color-primary);
  transition: transform 0.3s ease;
  display: inline-block;
}

/* Component Overrides */
:deep(.about-me) {
  text-align: center;
  color: var(--text-primary);
  padding: 48px 0;
  position: relative;
  background: var(--bg-surface);
  border-radius: 32px;
  margin: 24px auto;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-color);
  backdrop-filter: blur(16px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 30% 30%, rgba(255, 107, 53, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(255, 182, 39, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
}

:deep(.avatar) {
  border-radius: 50%;
  box-shadow: var(--shadow-color);
  border: 3px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 160px;
  height: 160px;
  object-fit: cover;
  margin: 0 auto 32px;
  display: block;
  position: relative;
  z-index: 2;

  &:hover {
    transform: scale(1.08) rotate(2deg);
    border-color: var(--color-primary);
    box-shadow: var(--shadow-hover);
  }

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    background: var(--brand-gradient);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    opacity: 0.3;
  }
}

:deep(.sign) {
  display: inline-block;
  font-weight: 700;
  font-size: clamp(36px, 6vw, 64px);
  color: var(--text-primary);
  margin: 32px 0 20px;
  padding: 24px 48px;
  background: var(--glass-bg);
  border-radius: 28px;
  box-shadow: var(--glass-shadow);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
  letter-spacing: -0.03em;
  line-height: 1.1;
  background-clip: text;
  -webkit-background-clip: text;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.8s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: var(--brand-gradient);
    border-radius: 30px;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  &:hover::after {
    opacity: 0.3;
  }
}

/* UserInfo Styles */
.about-me {
  text-align: center;
  color: var(--text-primary);
  padding: 48px 0;
  position: relative;
  background: var(--bg-surface);
  border-radius: 32px;
  margin: 24px auto;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-color);
  backdrop-filter: blur(16px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 30% 30%, rgba(255, 107, 53, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(255, 182, 39, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
}

.avatar-wrap {
  position: relative;
  display: inline-block;
}

.avatar {
  border-radius: 50%;
  box-shadow: var(--shadow-color);
  border: 3px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 160px;
  height: 160px;
  object-fit: cover;
  margin: 0 auto 32px;
  display: block;
  position: relative;
  z-index: 2;
  cursor: pointer;

  &:hover {
    transform: scale(1.08) rotate(2deg);
    border-color: var(--color-primary);
    box-shadow: var(--shadow-hover);
  }

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    background: var(--brand-gradient);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    opacity: 0.3;
  }
}

.tooltip {
  position: absolute;
  left: 50%;
  bottom: -28px;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.6);
  color: #fff;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.avatar-wrap:hover .tooltip {
  opacity: 1;
}

.sign {
  display: inline-block;
  font-weight: 700;
  font-size: clamp(36px, 6vw, 64px);
  color: var(--text-primary);
  margin: 32px 0 20px;
  padding: 24px 48px;
  background: var(--glass-bg);
  border-radius: 28px;
  box-shadow: var(--glass-shadow);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
  letter-spacing: -0.03em;
  line-height: 1.1;
  background-clip: text;
  -webkit-background-clip: text;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.8s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: var(--brand-gradient);
    border-radius: 30px;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }

  &:hover::after {
    opacity: 0.3;
  }
}

.tags {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 32px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  max-height: 48px;
  overflow: hidden;
  align-items: flex-start;
  justify-content: center;
}

.tag {
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 13px;
  color: white;
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  letter-spacing: -0.01em;
  white-space: nowrap;
  display: inline-block;
  margin: 2px;
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-color);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }
}

.more-tag {
  background: var(--bg-surface) !important;
  border-style: dashed !important;
  opacity: 0.7;
}



/* 移动端优化（<800px） */
@media (max-width: 799px) {
  .hero-section {
    padding: 80px 20px 60px;
    min-height: 65svh;
  }

  .about-me {
    padding: 32px 0;
    margin: 16px 0 32px;
  }

  .avatar {
    width: 110px;
    height: 110px;
    margin-bottom: 20px;
  }

  .sign {
    font-size: clamp(24px, 9vw, 40px);
    padding: 16px 28px;
  }

  .tags {
    gap: 12px;
    margin-top: 20px;
  }

  .tag {
    font-size: 12px;
    padding: 4px 12px;
    max-width: 120px;
  }

  :deep(.grid) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  :deep(.tool-card) {
    padding: 24px 20px;
  }

  :deep(.card) {
    margin: 0 -4px;
  }

  :deep(.tool-card button) {
    width: 100%;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --border-color: rgba(0, 0, 0, 0.3);
    --text-primary: #000000;
    --text-secondary: #333333;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  :deep(.tool-card),
  :deep(.card),
  :deep(.avatar),
  :deep(.sign),
  :deep(.tag),
  :deep(.tool-card button) {
    transition: none !important;
    
    &:hover {
      transform: none !important;
      box-shadow: none !important;
    }
  }
}

*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>