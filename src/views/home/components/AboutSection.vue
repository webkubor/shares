<template>
  <section class="about-section animate-fadeInUp">
    <div class="about-container">
      <div class="bio-content">
        <h2 class="section-title">Beyond Code.</h2>
        <p class="bio-text">
          我是 <strong>webkubor (月栖洲)</strong>，一名在 <strong>AI 工程化</strong>、<strong>数字艺术</strong> 与 <strong>文学叙事</strong> 边缘徘徊的创作者。
          我致力于构建标准化的 AI 工具链，同时也热爱用文字与旋律去诠释技术背后的感性。
        </p>
        <div class="personality-tags">
          <span># AI Builder</span>
          <span># Fullstack Expert</span>
          <span># Qidian Author</span>
          <span># Music Producer</span>
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

        <!-- 文学创作 -->
        <a href="https://my.qidian.com/author/433262531/" target="_blank" class="social-card qidian">
          <div class="social-icon">📖</div>
          <div class="social-info">
            <span class="social-name">月栖洲</span>
            <span class="social-desc">Qidian Author</span>
          </div>
        </a>

        <!-- 知识分享 -->
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
            <img src="@/assets/wechat.jpg" alt="WeChat QR" />
          </div>
        </div>

        <!-- 视觉审美 -->
        <a href="https://www.xiaohongshu.com/user/profile/5c3c1581000000000501835d" target="_blank" class="social-card xhs">
          <div class="social-icon">📕</div>
          <div class="social-info">
            <span class="social-name">司南烛</span>
            <span class="social-desc">XHS / Aesthetics</span>
          </div>
        </a>

        <a href="https://huaban.com/user/webkubor" target="_blank" class="social-card huaban">
          <div class="social-icon">🎨</div>
          <div class="social-info">
            <span class="social-name">司南烛</span>
            <span class="social-desc">Huaban / Design</span>
          </div>
        </a>

        <a href="https://www.pinterest.com/webkubor" target="_blank" class="social-card pinterest">
          <div class="social-icon">📌</div>
          <div class="social-info">
            <span class="social-name">苏梦城</span>
            <span class="social-desc">Pinterest / Mood</span>
          </div>
        </a>

        <!-- 音乐创作 -->
        <div class="social-card music-group">
          <div class="music-tabs">
            <a href="https://music.163.com/#/artist?id=32462959" target="_blank" class="music-sub-card ncm">
              <span class="icon">🎵</span>
              <span class="name">网易云音乐</span>
            </a>
            <div class="music-sub-card qq">
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

  &:not(.music-group):hover {
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

.music-sub-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255,255,255,0.8);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid rgba(0,0,0,0.05);
  text-decoration: none;
  color: #333;
  transition: all 0.2s ease;

  &.ncm:hover {
    background: #fff;
    border-color: #ff4d4f;
    color: #ff4d4f;
    transform: scale(1.05);
  }
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
