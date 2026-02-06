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
          <div class="social-brand">
            <img src="https://raw.githubusercontent.com/webkubor/picx-images-hosting/master/icons/svg/github.svg" alt="GitHub" />
          </div>
          <div class="social-info">
            <span class="social-name">GitHub</span>
            <span class="social-desc">Open Source</span>
          </div>
        </a>

        <!-- 文学创作 -->
        <a href="https://my.qidian.com/author/433262531/" target="_blank" class="social-card qidian">
          <div class="social-brand">
            <img src="https://raw.githubusercontent.com/webkubor/picx-images-hosting/master/icons/svg/qidian.svg" alt="月栖洲" />
          </div>
          <div class="social-info">
            <span class="social-name">月栖洲</span>
            <span class="social-desc">Qidian Author</span>
          </div>
        </a>

        <!-- 知识分享 -->
        <a href="https://juejin.cn/user/2119514149631870" target="_blank" class="social-card juejin">
          <div class="social-brand">
            <img src="https://raw.githubusercontent.com/webkubor/picx-images-hosting/master/icons/svg/juejin.svg" alt="掘金" />
          </div>
          <div class="social-info">
            <span class="social-name">掘金</span>
            <span class="social-desc">Technical Sharing</span>
          </div>
        </a>

        <!-- 深度内容 -->
        <div class="social-card wechat">
          <div class="social-brand">
            <img src="https://raw.githubusercontent.com/webkubor/upic-images/main/uPic/2026/02/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260206160808_805_11.jpg" alt="心语拾光" />
          </div>
          <div class="social-info">
            <span class="social-name">心语拾光</span>
            <span class="social-desc">Official Account</span>
          </div>
        </div>

        <!-- 视觉审美 -->
        <a href="https://www.xiaohongshu.com/user/profile/5c3c1581000000000501835d" target="_blank" class="social-card xhs">
          <div class="social-brand xhs-brand">
            <img src="https://raw.githubusercontent.com/webkubor/picx-images-hosting/master/icons/svg/xiaohongshu.svg" alt="司南烛" />
          </div>
          <div class="social-info">
            <span class="social-name">司南烛</span>
            <span class="social-desc">XHS / Aesthetics</span>
          </div>
        </a>

        <a href="https://huaban.com/user/webkubor" target="_blank" class="social-card huaban">
          <div class="social-brand">
            <img src="https://raw.githubusercontent.com/webkubor/picx-images-hosting/master/icons/svg/huaban.svg" alt="司南烛" />
          </div>
          <div class="social-info">
            <span class="social-name">司南烛</span>
            <span class="social-desc">Huaban / Design</span>
          </div>
        </a>

        <a href="https://www.pinterest.com/webkubor" target="_blank" class="social-card pinterest">
          <div class="social-brand">
            <img src="https://raw.githubusercontent.com/webkubor/picx-images-hosting/master/icons/svg/pinterest.svg" alt="苏梦城" />
          </div>
          <div class="social-info">
            <span class="social-name">苏梦城</span>
            <span class="social-desc">Pinterest / Mood</span>
          </div>
        </a>
      </div>

      <!-- 核心作品播放器 -->
      <div class="featured-player">
        <MusicPlayer />
        <div class="player-external-links">
          <a href="https://music.163.com/#/artist?id=32462959" target="_blank" title="网易云音乐">
            <img src="https://raw.githubusercontent.com/webkubor/picx-images-hosting/master/icons/svg/neteasemusic.svg" alt="NCM" />
          </a>
          <a href="#" title="QQ 音乐">
            <img src="https://raw.githubusercontent.com/webkubor/picx-images-hosting/master/icons/svg/qqmusic.svg" alt="QQ" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MusicPlayer from './MusicPlayer.vue'
</script>

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

.social-brand {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.05);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* 小红书专项优化：红底白字 */
.xhs-brand {
  background-color: #ff2442;
  border: none;
  img {
    width: 70%;
    height: 70%;
    filter: brightness(0) invert(1); /* 强制变白 */
    object-fit: contain;
  }
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

/* 核心作品播放器区域 */
.featured-player {
  grid-column: span 2;
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.player-external-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 24px;
  border-left: 1px solid rgba(0,0,0,0.05);
  a {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
    filter: grayscale(0.2) opacity(0.7);
    img { width: 100%; height: 100%; }
    &:hover {
      filter: grayscale(0) opacity(1);
      transform: scale(1.1) rotate(5deg);
    }
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
  .featured-player {
    grid-column: span 1;
    flex-direction: column;
    gap: 16px;
    .player-external-links {
      flex-direction: row;
      border-left: none;
      border-top: 1px solid rgba(0,0,0,0.05);
      padding-left: 0;
      padding-top: 16px;
    }
  }
}
</style>