<template>
  <div class="home-page page-transition">
    <!-- Hero Section -->
    <section class="hero-section animate-fadeInDown">
      <div class="hero-container">
        <div class="theme-toggle-container animate-fadeInRight animate-delay-100">
          <button class="theme-toggle-btn" @click="toggleTheme" :title="themeTitle">
            <span class="theme-icon">{{ themeIcon }}</span>
          </button>
        </div>
        <UserInfo class="animate-fadeInUp animate-delay-200" />

      </div>
    </section>

    <!-- Main Content -->
    <section class="content-section animate-fadeInUp animate-delay-600">
      <div class="content-container">
        <!-- Navigation Tabs -->
        <nav class="nav-tabs animate-scaleIn animate-delay-700">
          <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            :class="['nav-tab', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
            :style="{ animationDelay: `${0.8 + index * 0.1}s` }"
            class="animate-fadeInUp"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            <span class="tab-text">{{ tab.label }}</span>
            <div class="tab-indicator"></div>
          </button>
        </nav>

        <!-- Content Panels -->
        <div class="panels-container">
          <transition name="panel-fade" mode="out-in">
            <div v-if="activeTab === 'tools'" key="tools" class="panel animate-scaleIn">
              <div class="panel-header">
                <h2 class="panel-title text-gradient-animate">Creative Tools</h2>
                <p class="panel-subtitle">探索有趣的工具和实验</p>
              </div>
              <ToolView />
            </div>
            <div v-else-if="activeTab === 'projects'" key="projects" class="panel animate-scaleIn">
              <div class="panel-header">
                <h2 class="panel-title text-gradient-animate">Project Showcase</h2>
                <p class="panel-subtitle">精选项目展示</p>
              </div>
              <ProjectList />
            </div>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import UserInfo from "./components/UserInfo.vue";
import ProjectList from "./components/ProjectList.vue";
import ToolView from './components/Tool.vue'
import { ref, onMounted, computed } from 'vue'
import { useTheme } from '@/hooks/useTheme'

const activeTab = ref('tools')
const { toggleTheme, local } = useTheme()

// 计算主题图标
const themeIcon = computed(() => local.osTheme === 'dark' ? '☀️' : '🌙')
const themeTitle = computed(() => `切换到${local.osTheme === 'dark' ? '亮色' : '暗黑'}主题`)

const tabs = [
  { id: 'tools', label: '创意工具', icon: '🛠️' },
  { id: 'projects', label: '项目展示', icon: '🚀' }
]



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
}

/* Hero Section */
.hero-section {
  padding: 80px 24px 60px;
  background: var(--bg-base);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 30%, rgba(255, 107, 0, 0.06) 0%, transparent 50%),
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
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 主题切换按钮 */
.theme-toggle-container {
  position: absolute;
  top: -40px;
  right: 0;
  z-index: 100;
}

.theme-toggle-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: var(--glass-shadow);
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 32px var(--shadow-hover);
    border: 1px solid var(--color-primary);
  }
  
  &:active {
    transform: translateY(0) scale(0.95);
  }
}

.theme-icon {
  transition: transform 0.3s ease;
  
  .theme-toggle-btn:hover & {
    transform: rotate(180deg);
  }
}


/* Content Section */
.content-section {
  padding: 0 24px 80px;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Navigation Tabs */
.nav-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
  background: $glass-bg;
  padding: 8px;
  border-radius: 20px;
  box-shadow: $glass-shadow;
  border: 1px solid $glass-border;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  backdrop-filter: blur(10px);
}

.nav-tab {
  flex: 1;
  position: relative;
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: $text-secondary;
  font-weight: 500;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;

  .tab-icon {
    font-size: 18px;
    transition: transform 0.3s ease;
  }

  .tab-text {
    font-size: 14px;
    font-weight: 500;
  }

  .tab-indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: $color-primary;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-50%);
    border-radius: 1px;
  }

  &:hover {
    color: $text-primary;
    background: rgba(255, 107, 0, 0.1);
    
    .tab-icon {
      transform: translateY(-2px);
    }
  }

  &.active {
    color: $text-primary;
    background: $bg-surface;
    box-shadow: 0 4px 16px $shadow-color;

    .tab-indicator {
      width: 60%;
    }

    .tab-icon {
      transform: translateY(-2px);
    }
  }
}

/* Panels Container */
.panels-container {
  position: relative;
}

.panel {
  background: $glass-bg;
  border-radius: 24px;
  padding: 40px;
  box-shadow: $glass-shadow;
  border: 1px solid $glass-border;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: $brand-gradient;
    opacity: 0.8;
  }
}

.panel-header {
  text-align: center;
  margin-bottom: 40px;
}

.panel-title {
  font-size: 32px;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: 8px;
  background: $brand-gradient;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.panel-subtitle {
  font-size: 16px;
  color: $text-secondary;
  font-weight: 400;
  opacity: 0.8;
}

/* Panel Transitions */
.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.panel-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

/* Component Overrides */
:deep(.about-me) {
  text-align: center;
  color: $text-primary;
  padding: 40px 0;
  position: relative;
  background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%);
  border-radius: 24px;
  margin: 20px 0;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 20%, rgba(255, 107, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 107, 0, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
}

:deep(.avatar) {
  border-radius: 50%;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border: 4px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 140px;
  height: 140px;
  object-fit: cover;
  margin: 0 auto 24px;
  display: block;
  position: relative;
  z-index: 2;

  &:hover {
    transform: scale(1.08) rotate(3deg);
    border-color: rgba(255, 107, 0, 0.4);
    box-shadow: 0 16px 48px rgba(255, 107, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    background: $brand-gradient;
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
  font-weight: 800;
  font-size: clamp(32px, 5vw, 56px);
  color: $text-primary;
  margin: 24px 0 16px;
  padding: 20px 40px;
  background: linear-gradient(135deg, $glass-bg 0%, rgba(255, 255, 255, 0.1) 100%);
  border-radius: 24px;
  box-shadow: $glass-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid $glass-border;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  letter-spacing: -0.02em;
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
    transition: left 0.6s ease;
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
    background: $brand-gradient;
    border-radius: 26px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover::after {
    opacity: 0.3;
  }
}

:deep(.tags) {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 24px;
}

:deep(.tags-container) {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
  max-height: 40px;
  overflow: hidden;
  align-items: flex-start;
}

:deep(.more-tag) {
  background: var(--bg-surface) !important;
  border-style: dashed !important;
  opacity: 0.7;
}

:deep(.tag) {
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 500;
  font-size: 10px;
  color: var(--text-secondary);
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  letter-spacing: 0.01em;
  white-space: nowrap;
  display: inline-block;
  margin: 1px;
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
}

/* Tool Cards */
:deep(.tool-space) {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

:deep(.tool-card) {
  background: $bg-surface;
  border: 1px solid $border-color;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px $shadow-color;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: $brand-gradient;
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 12px 48px $shadow-hover;
    border-color: $border-hover;

    &::before {
      transform: translateX(0);
    }
  }
}

:deep(.tool-title) {
  font-size: 20px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 12px;
  position: relative;
  line-height: 1.3;
}

:deep(.tool-card button) {
  height: 36px;
  border-radius: 10px;
  border: none;
  background: $brand-gradient;
  color: white;
  font-weight: 500;
  padding: 0 16px;
  margin: 6px 8px 0 0;
  box-shadow: 0 4px 16px rgba(255, 107, 0, 0.2);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-size: 14px;

  &:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 6px 20px rgba(255, 107, 0, 0.3);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
}

/* Project Cards */
:deep(.grid) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  align-items: stretch; /* 确保卡片高度一致 */
}

:deep(.card) {
  background: $bg-surface;
  border: 1px solid $border-color;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px $shadow-color;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  backdrop-filter: blur(10px);
  height: 100%; /* 确保卡片填满网格高度 */
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 1px;
    background: $brand-gradient;
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 48px $shadow-hover;

    &::before {
      opacity: 0.6;
    }
  }
}

:deep(.card-title) {
  font-weight: 600;
  padding: 16px 20px 8px;
  color: $text-primary;
  font-size: 16px;
  position: relative;
  z-index: 2;
  line-height: 1.4;
  flex-shrink: 0; /* 防止标题被压缩 */
}

:deep(.content) {
  font-size: 13px;
  padding: 0 20px 16px;
  color: $text-secondary;
  line-height: 1.5;
  position: relative;
  z-index: 2;
  flex: 1; /* 占据剩余空间 */
  display: flex;
  flex-direction: column;
  min-height: 0; /* 防止内容撑开 */
}

:deep(.link) {
  color: $color-primary;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  margin-top: auto; /* 将链接推到底部 */
  padding-top: 8px;

  &:hover {
    color: $color-accent;
    text-decoration: underline;
  }
}

:deep(img) {
  width: 100%;
  height: 180px; /* 稍微减小高度 */
  object-fit: cover;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
  flex-shrink: 0; /* 防止图片被压缩 */
}

:deep(.card:hover img) {
  transform: scale(1.05);
}

/* Dark Theme Specific Adjustments */
:global(.dark_theme) {
  // 在深色主题下重新定义变量 - 使用水泥灰配色
  $bg-base: #1a1a1a;
  $bg-surface: #2d2d2d;
  $bg-elevated: #404040;
  $text-primary: #f5f5f5;
  $text-secondary: #d1d1d1;
  $text-tertiary: #a8a8a8;
  $border-color: rgba(255, 255, 255, 0.08);
  $border-hover: $dark-border-hover;
  $shadow-color: $dark-shadow-color;
  $shadow-hover: $dark-shadow-hover;
  $glass-bg: $dark-glass-bg;
  $glass-border: $dark-glass-border;
  $glass-shadow: $dark-glass-shadow;
  $brand-gradient: $dark-brand-gradient;
  $surface-gradient: $dark-surface-gradient;
  $color-primary: $dark-color-primary;
  $color-accent: $dark-color-accent;

  .hero-section {
    background: #1a1a1a;
    
    &::before {
      background: radial-gradient(circle at 20% 30%, rgba(255, 122, 0, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(255, 122, 0, 0.02) 0%, transparent 50%);
    }
  }

  :global(.dark_theme) .nav-tabs {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(148, 163, 184, 0.1);
  }

  :global(.dark_theme) .nav-tab {
    color: $text-tertiary;
    
    &:hover {
      background: rgba(255, 107, 0, 0.1);
      color: $text-secondary;
    }
  }

  :global(.dark_theme) .nav-tab.active {
    background: $bg-surface;
    color: $text-primary;
  }

  :global(.dark_theme) .panel {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(148, 163, 184, 0.1);
  }

  :global(.dark_theme) .panel-title {
    color: $text-primary;
  }

  :global(.dark_theme) .panel-subtitle {
    color: $text-secondary;
  }

  :global(.dark_theme) :deep(.sign) {
    background: rgba(30, 41, 59, 0.6);
  }

  :global(.dark_theme) :deep(.tool-card) {
    background: rgba(30, 41, 59, 0.4);
    border-color: rgba(148, 163, 184, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  :global(.dark_theme) :deep(.card) {
    background: rgba(30, 41, 59, 0.4);
    border-color: rgba(148, 163, 184, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  :global(.dark_theme) :deep(.tag) {
    background: var(--bg-elevated);
    border-color: var(--border-color);
    color: var(--text-secondary);
    
    &:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: 60px 16px 40px;
  }

  .content-section {
    padding: 0 16px 60px;
  }

  .nav-tabs {
    max-width: 100%;
    padding: 6px;
  }

  .nav-tab {
    padding: 10px 16px;
    font-size: 13px;
  }

  .panel {
    padding: 24px 16px;
  }

  .panel-title {
    font-size: 24px;
  }

  :deep(.grid) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  :deep(.tool-card) {
    padding: 20px 16px;
  }

  :deep(.card) {
    margin: 0 -8px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 40px 12px 30px;
  }

  .nav-tab {
    padding: 8px 12px;
    font-size: 12px;
    
    .tab-icon {
      font-size: 16px;
    }
  }

  .panel {
    padding: 20px 12px;
  }

  .panel-title {
    font-size: 20px;
  }

  :deep(.avatar) {
    width: 100px;
    height: 100px;
  }

  :deep(.sign) {
    font-size: 24px;
    padding: 12px 24px;
  }

  :deep(.tag) {
    font-size: 11px;
    padding: 3px 8px;
    margin: 1px;
    max-width: 100px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --border-color: rgba(0, 0, 0, 0.3);
    --text-primary: #000000;
    --text-secondary: #333333;
  }

  .dark_theme {
    --border-color: rgba(255, 255, 255, 0.3);
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .nav-tab,
  .panel,
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