<template>
  <section class="about-section animate-fadeInUp">
    <div class="about-container">
      <div class="bio-content">
        <h2 class="section-title">Beyond Code.</h2>
        <p class="bio-text">
          我是 <strong>webkubor</strong>，一名在 <strong>AI 工程化</strong> 与 <strong>数字艺术</strong> 边缘徘徊的开发者。
          我致力于构建标准化的 AI 工具链，同时也热爱用旋律与视觉去诠释技术背后的感性。
        </p>
        <div class="personality-tags">
          <span># AI Builder</span>
          <span># Fullstack Expert</span>
          <span># Music Producer</span>
          <span># Aesthetic Seeker</span>
        </div>
      </div>

      <div class="social-matrix">
        <!-- 核心技术 -->
        <a href="https://github.com/webkubor" target="_blank" class="social-card github">
          <div class="social-icon">🐙</div>
          <div class="social-info">
            <span class="social-name">GitHub</span>
            <span class="social-desc">Open Source</span>
          </div>
        </a>

        <a href="https://juejin.cn/user/2119514149631870" target="_blank" class="social-card juejin">
          <div class="social-icon">💎</div>
          <div class="social-info">
            <span class="social-name">掘金</span>
            <span class="social-desc">Technical Sharing</span>
          </div>
        </a>

        <!-- 深度内容 -->
        <div class="social-card wechat">
          <div class="social-icon">💬</div>
          <div class="social-info">
            <span class="social-name">心语拾光</span>
            <span class="social-desc">Official Account</span>
          </div>
          <div class="qr-popover">
            <img src="/assets/wechat.jpg" alt="WeChat QR" />
          </div>
        </div>

        <!-- 视觉审美 -->
        <a href="https://www.xiaohongshu.com/user/profile/5f8d1c0000000000010068fd" target="_blank" class="social-card xhs">
          <div class="social-icon">📕</div>
          <div class="social-info">
            <span class="social-name">司南烛</span>
            <span class="social-desc">XHS / Aesthetics</span>
          </div>
        </a>

        <!-- 音乐创作 -->
        <div class="social-card music-group">
          <div class="music-tabs">
            <div class="music-card ncm">
              <span class="icon">🎵</span>
              <span class="name">网易云音乐</span>
            </div>
            <div class="music-card qq">
              <span class="icon">🎼</span>
              <span class="name">QQ 音乐</span>
            </div>
          </div>
          <div class="social-info">
            <span class="social-name">Original Works</span>
            <span class="social-desc">Composition & Beats</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-section {
  padding: 100px 24px;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.section-title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.bio-text {
  font-size: 18px;
  line-height: 1.8;
  color: #4a4a4a;
  margin-bottom: 32px;
  strong {
    color: #20c4b6;
  }
}

.personality-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  span {
    padding: 6px 14px;
    background: rgba(32, 196, 182, 0.08);
    color: #0f8f83;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
  }
}

.social-matrix {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.social-card {
  padding: 20px;
  border-radius: 20px;
  background: #f8fbfb;
  border: 1px solid rgba(32, 196, 182, 0.12);
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    background: #ffffff;
    box-shadow: 0 12px 24px rgba(32, 196, 182, 0.12);
    border-color: rgba(32, 196, 182, 0.3);
  }
}

.social-icon {
  font-size: 24px;
}

.social-info {
  display: flex;
  flex-direction: column;
}

.social-name {
  font-weight: 700;
  color: #1a1a1a;
  font-size: 15px;
}

.social-desc {
  font-size: 12px;
  color: #888;
}

/* 微信弹窗 */
.wechat {
  cursor: pointer;
  .qr-popover {
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%) scale(0.9);
    padding: 10px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    img { width: 120px; height: 120px; }
  }
  &:hover .qr-popover {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}

/* 音乐组合卡片 */
.music-group {
  grid-column: span 2;
  flex-direction: row;
  justify-content: space-between;
}

.music-tabs {
  display: flex;
  gap: 12px;
}

.music-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255,255,255,0.6);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid rgba(0,0,0,0.05);
}

@media (max-width: 800px) {
  .about-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .social-matrix {
    grid-template-columns: 1fr;
  }
  .music-group {
    grid-column: span 1;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
