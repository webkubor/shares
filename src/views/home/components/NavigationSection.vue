<template>
  <!-- Navigation Section - 重新设计为现代卡片 -->
  <section class="nav-section animate-fadeInUp animate-delay-600">
    <!-- 扫描网格效果 -->
    <div class="scan-grid"></div>
    
    <div class="nav-container">
      <div class="section-header">
        <h2 class="section-title">Toolchain Entry</h2>
        <p class="section-subtitle">工具链与项目入口，所有模块统一归档</p>
        <div class="title-shimmer"></div>
      </div>
      
      <div class="nav-cards">
        <router-link to="/tools" class="nav-card" @mouseenter="onCardHover" @mouseleave="onCardLeave">
          <div class="card-content">
            <div class="card-icon-wrapper">
              <div class="card-icon">🛠️</div>
              <div class="icon-glow"></div>
              <div class="icon-shimmer"></div>
            </div>
            <h3 class="card-title">Toolchain Library</h3>
            <p class="card-description">按属性筛选、可扩展的工具目录</p>
            <div class="card-link">
              <span>进入工具链</span>
              <div class="link-arrow">→</div>
              <div class="link-trail"></div>
            </div>
          </div>
          <div class="card-background">
            <div class="bg-pattern"></div>
            <div class="bg-shimmer"></div>
          </div>
          <div class="card-border-glow"></div>
        </router-link>
        
        <router-link to="/projects" class="nav-card" @mouseenter="onCardHover" @mouseleave="onCardLeave">
          <div class="card-content">
            <div class="card-icon-wrapper">
              <div class="card-icon">🚀</div>
              <div class="icon-glow"></div>
              <div class="icon-shimmer"></div>
            </div>
            <h3 class="card-title">Workflow Cases</h3>
            <p class="card-description">工具链落地项目与案例</p>
            <div class="card-link">
              <span>查看案例</span>
              <div class="link-arrow">→</div>
              <div class="link-trail"></div>
            </div>
          </div>
          <div class="card-background">
            <div class="bg-pattern"></div>
            <div class="bg-shimmer"></div>
          </div>
          <div class="card-border-glow"></div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
function onCardHover(event) {
  const card = event.currentTarget
  card.classList.add('hovered')
}

function onCardLeave(event) {
  const card = event.currentTarget
  card.classList.remove('hovered')
}
</script>

<style lang="scss" scoped>
// 现代橙色主题设计
$primary-orange: #ff6b35;
$accent-orange: #f7931e;
$dark-orange: #e55a2b;
$bg-card: #ffffff;
$text-dark: #1a1a1a;
$text-medium: #4a4a4a;
$border-light: rgba(255, 107, 53, 0.1);

/* Navigation Section */
.nav-section {
  padding: 80px 32px 120px;
  background: linear-gradient(180deg, #fff0eb 0%, #ffffff 100%);
  position: relative;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-size: clamp(36px, 6vw, 48px);
  font-weight: 800;
  color: $text-dark;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, $primary-orange 0%, $dark-orange 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: clamp(16px, 3vw, 20px);
  color: $text-medium;
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.nav-card {
  position: relative;
  display: block;
  background: $bg-card;
  border-radius: 28px;
  padding: 48px 40px;
  text-decoration: none;
  color: $text-dark;
  box-shadow: 0 20px 40px rgba(255, 107, 53, 0.1);
  border: 1px solid $border-light;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 24px;
}

.card-icon {
  font-size: 56px;
  display: block;
  filter: drop-shadow(0 4px 8px rgba(255, 107, 53, 0.2));
}

.icon-glow {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  background: radial-gradient(circle, $primary-orange 0%, transparent 70%);
  filter: blur(16px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-title {
  font-size: 28px;
  font-weight: 700;
  color: $text-dark;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.card-description {
  font-size: 18px;
  color: $text-medium;
  line-height: 1.6;
  margin-bottom: 32px;
  font-weight: 400;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: $primary-orange;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
}

.link-arrow {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.bg-pattern {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.03) 0%, rgba(247, 147, 30, 0.02) 100%);
  mask-image: radial-gradient(circle at 70% 30%, black 0%, transparent 70%);
}

.nav-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 30px 60px rgba(255, 107, 53, 0.15);
  border-color: rgba(255, 107, 53, 0.3);
  
  .icon-glow {
    opacity: 0.4;
  }
  
  .card-link {
    color: $dark-orange;
    gap: 16px;
  }
  
  .link-arrow {
    transform: translateX(4px);
  }
  
  .card-background {
    opacity: 1;
  }
}

/* 移动端优化 */
@media (max-width: 799px) {
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
</style>
