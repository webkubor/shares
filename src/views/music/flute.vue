<template>
  <div class="flute-page">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <div class="nav-container">
        <div class="nav-left">
          <div class="logo">
            <span class="logo-icon">🎋</span>
            <span class="logo-text">竹笛学堂</span>
          </div>
        </div>
        <div class="nav-center">
          <n-space>
            <n-button text @click="scrollToSection('basic')" :class="{ active: activeNav === 'basic' }">
              基础知识
            </n-button>
            <n-button text @click="scrollToSection('practice')" :class="{ active: activeNav === 'practice' }">
              练习建议
            </n-button>
            <n-button text @click="scrollToSection('faq')" :class="{ active: activeNav === 'faq' }">
              常见问题
            </n-button>
            <n-button text @click="scrollToSection('guide')" :class="{ active: activeNav === 'guide' }">
              选购指南
            </n-button>
          </n-space>
        </div>
        <div class="nav-right">
          <n-button class="mobile-menu-toggle" @click="toggleMobileMenu" quaternary circle>
            <template #icon>
              <n-icon size="20">
                <svg viewBox="0 0 24 24">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
                </svg>
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <n-drawer v-model:show="isMobileMenuOpen" :width="280" placement="right">
        <n-drawer-content title="导航菜单">
          <n-space vertical size="large">
            <n-button text @click="scrollToSection('basic'); closeMobileMenu()" size="large">
              <template #icon>
                <n-icon><span>📚</span></n-icon>
              </template>
              基础知识
            </n-button>
            <n-button text @click="scrollToSection('practice'); closeMobileMenu()" size="large">
              <template #icon>
                <n-icon><span>🎵</span></n-icon>
              </template>
              练习建议
            </n-button>
            <n-button text @click="scrollToSection('faq'); closeMobileMenu()" size="large">
              <template #icon>
                <n-icon><span>❓</span></n-icon>
              </template>
              常见问题
            </n-button>
            <n-button text @click="scrollToSection('guide'); closeMobileMenu()" size="large">
              <template #icon>
                <n-icon><span>🛒</span></n-icon>
              </template>
              选购指南
            </n-button>
          </n-space>
        </n-drawer-content>
      </n-drawer>
    </nav>
    
    <div class="content">
      <n-collapse :default-expanded-names="['basic', 'practice', 'faq']">
        <n-collapse-item name="basic" id="basic">
          <template #header>
            <div class="collapse-header">
              <span class="icon">📚</span>
              <span class="title">基础知识</span>
              <span class="subtitle">竹笛演奏的基本理论</span>
            </div>
          </template>
          <BasicKnowledge />
        </n-collapse-item>
        
        <n-collapse-item name="practice" id="practice">
          <template #header>
            <div class="collapse-header">
              <span class="icon">🎯</span>
              <span class="title">练习建议</span>
              <span class="subtitle">科学有效的练习方法</span>
            </div>
          </template>
          <PracticeGuide />
        </n-collapse-item>
        
        <n-collapse-item name="faq" id="faq">
          <template #header>
            <div class="collapse-header">
              <span class="icon">❓</span>
              <span class="title">常见问题</span>
              <span class="subtitle">学习过程中的疑难解答</span>
            </div>
          </template>
          <FAQ />
        </n-collapse-item>
        
        <n-collapse-item name="guide" id="guide">
          <template #header>
            <div class="collapse-header">
              <span class="icon">🛒</span>
              <span class="title">选购与保养指南</span>
              <span class="subtitle">如何选择和维护竹笛</span>
            </div>
          </template>
          <FluteGuide />
        </n-collapse-item>
        
        <n-collapse-item name="fingering">
          <template #header>
            <div class="collapse-header">
              <span class="icon">🎼</span>
              <span class="title">转调对应表</span>
              <span class="subtitle">进阶演奏技巧参考</span>
            </div>
          </template>
          <BasicFingering />
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BasicKnowledge from './components/BasicKnowledge.vue'
import BasicFingering from './components/BasicFingering.vue'
import PracticeGuide from './components/PracticeGuide.vue'
import FAQ from './components/FAQ.vue'
import FluteGuide from './components/FluteGuide.vue'

// 导航状态
const activeNav = ref('basic')

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 平滑滚动到指定元素
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const navHeight = 70 // 导航栏高度
    const elementPosition = element.offsetTop - navHeight - 20
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
    
    // 更新激活状态
    activeNav.value = sectionId
  }
}

// 移动端菜单切换
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 监听滚动事件，自动更新导航高亮
const handleScroll = () => {
  const sections = ['basic', 'practice', 'faq', 'guide']
  const navHeight = 70
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i])
    if (section) {
      const sectionTop = section.offsetTop - navHeight - 50
      if (scrollTop >= sectionTop) {
        if (activeNav.value !== sections[i]) {
          activeNav.value = sections[i]
        }
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.flute-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%);
  padding: 120px 20px 40px 20px;
  position: relative;
  overflow-x: hidden;
  
  .content {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    padding-top: 90px;
  }
}

/* 顶部导航样式 */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(20px) saturate(180%);
  background: linear-gradient(135deg, 
    rgba(240, 253, 244, 0.95) 0%, 
    rgba(220, 252, 231, 0.9) 50%, 
    rgba(187, 247, 208, 0.95) 100%);
  border-bottom: 1px solid rgba(34, 197, 94, 0.15);
  box-shadow: 0 8px 32px rgba(34, 197, 94, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-left {
  flex: 1;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
}

.logo-icon {
  font-size: 28px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #065f46 0%, #10b981 50%, #047857 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
}

.nav-center {
  flex: 2;
  display: flex;
  justify-content: center;
}

.nav-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.mobile-menu-toggle {
  display: none;
}

/* Naive UI 按钮样式覆盖 */
:deep(.n-button) {
  &.active {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%);
    border: 1px solid rgba(34, 197, 94, 0.25);
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
    color: #10b981;
  }
  
  &:not(.active) {
    color: rgba(6, 95, 70, 0.8);
    
    &:hover {
      color: #065f46;
      background: rgba(34, 197, 94, 0.05);
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
    height: 60px;
  }
  
  .nav-center {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .content {
    padding-top: 80px;
  }
}

/* 折叠面板样式 */
:deep(.n-collapse) {
  background: transparent;
  border: none;
  gap: 20px;
  display: flex;
  flex-direction: column;
}

:deep(.n-collapse-item) {
  background: linear-gradient(145deg, 
    rgba(240, 253, 244, 0.95) 0%, 
    rgba(220, 252, 231, 0.85) 50%, 
    rgba(187, 247, 208, 0.95) 100%);
  border: 1px solid rgba(34, 197, 94, 0.15);
  border-radius: 24px;
  margin: 16px 20px 20px 20px;
  backdrop-filter: blur(30px) saturate(200%);
  box-shadow: 
    0 16px 50px rgba(34, 197, 94, 0.08),
    0 8px 25px rgba(16, 185, 129, 0.05);
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  
  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 
      0 25px 80px rgba(34, 197, 94, 0.12),
      0 12px 35px rgba(16, 185, 129, 0.08);
    border-color: rgba(34, 197, 94, 0.25);
  }
}

.collapse-header {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 0 15px;
  
  .icon {
    font-size: 28px;
    flex-shrink: 0;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
  
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #065f46;
    margin: 0;
    letter-spacing: 0.3px;
  }
  
  .subtitle {
    font-size: 14px;
    color: rgba(6, 95, 70, 0.7);
    margin-left: auto;
    font-weight: 400;
    letter-spacing: 0.2px;
  }
}

:deep(.n-collapse-item__header) {
  padding: 24px 28px;
  background: linear-gradient(135deg, 
    rgba(240, 253, 244, 0.9) 0%, 
    rgba(220, 252, 231, 0.7) 50%, 
    rgba(187, 247, 208, 0.9) 100%);
  border-bottom: 1px solid rgba(34, 197, 94, 0.12);
  transition: all 0.3s ease;
  border-radius: 24px 24px 0 0;
  
  &:hover {
    background: linear-gradient(135deg, 
      rgba(240, 253, 244, 0.95) 0%, 
      rgba(220, 252, 231, 0.85) 50%, 
      rgba(187, 247, 208, 0.95) 100%);
  }
}

:deep(.n-collapse-item__arrow) {
  color: #065f46 !important;
}

:deep(.n-collapse-item__content-wrapper) {
  background: rgba(240, 253, 244, 0.98);
  border-radius: 0 0 24px 24px;
}

:deep(.n-collapse-item__content-inner) {
  padding: 24px;
  color: #333;
  line-height: 1.6;
  font-size: 15px;
}

@media (max-width: 768px) {
  .flute-page {
    padding: 24px 16px;
    
    .collapse-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      
      .subtitle {
        margin-left: 0;
        align-self: flex-start;
      }
    }
    
    :deep(.n-collapse-item) {
      margin-bottom: 16px;
      border-radius: 16px;
    }
  }
  
  :deep(.n-collapse-item__header) {
    padding: 16px 20px;
    font-size: 16px;
  }
}
</style>