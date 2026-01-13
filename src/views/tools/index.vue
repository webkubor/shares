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
        <p class="curation-note">
          所有工具都是我使用过很多工具后选择出来的最佳工具，能降低很多心智成本。有些虽然是付费的，但其商业价值一定高于订阅价格，市面上同类工具往往更贵且难以超越。
        </p>
      </div>
    </div>
    
    <div class="tools-container glass-shell">
      <ToolView />
    </div>

    <div class="donate-section animate-fadeInUp">
      <div class="donate-card glass-shell">
        <p class="donate-text">
          如果大家觉得我推荐的工具好用的话，也可以请我喝杯咖啡 ☕️
        </p>
        <div class="qr-wrapper">
          <img 
            src="@/assets/wechat.jpg" 
            alt="微信二维码" 
            class="qr-img" 
            @click="showLargeQr = true"
          />
          <span class="qr-label">微信扫码支持 (点击放大)</span>
        </div>
      </div>
    </div>

    <!-- Fullscreen QR Overlay -->
    <div v-if="showLargeQr" class="qr-overlay" @click="showLargeQr = false">
      <img src="@/assets/wechat.jpg" alt="微信二维码大图" class="large-qr" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ToolView from './components/Tool.vue'

const showLargeQr = ref(false)
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.tools-page {
  min-height: 100vh;
  padding: 56px 24px 120px;
  background: radial-gradient(circle at top left, rgba(32, 196, 182, 0.22), transparent 45%),
    radial-gradient(circle at 70% 20%, rgba(255, 138, 61, 0.18), transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(79, 224, 210, 0.2), transparent 45%),
    #f4f8f8;
  color: var(--text-primary);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  background: radial-gradient(circle, rgba(32, 196, 182, 0.5), transparent 70%);
}

.orb-b {
  top: 120px;
  right: -80px;
  background: radial-gradient(circle, rgba(255, 138, 61, 0.35), transparent 70%);
}

.orb-c {
  bottom: -120px;
  left: 20%;
  background: radial-gradient(circle, rgba(79, 224, 210, 0.38), transparent 70%);
}

.page-header {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 48px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
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
  color: rgba(32, 196, 182, 0.8);
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
  color: rgba(16, 20, 24, 0.72);
  font-weight: 400;
  opacity: 0.8;
  max-width: 480px;
  margin-bottom: 16px;
}

.curation-note {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(16, 20, 24, 0.6);
  max-width: 600px;
  padding-left: 12px;
  border-left: 2px solid rgba(32, 196, 182, 0.3);
  background: linear-gradient(to right, rgba(32, 196, 182, 0.05), transparent);
}

.back-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #0f1418;
  text-decoration: none;
  border: 1px solid rgba(32, 196, 182, 0.4);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  transition: all .2s ease;
  flex-shrink: 0;
}

.back-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--shadow-hover);
  border-color: var(--color-primary);
}

.tools-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.donate-section {
  max-width: 1200px;
  width: 100%;
  margin: 48px auto 0;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
}

.donate-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 48px;
  max-width: 600px;
  width: 100%;
}

.donate-text {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 24px;
  opacity: 0.9;
}

.qr-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.qr-img {
  width: 180px;
  height: 180px;
  object-fit: contain; /* changed from cover to contain for placeholder safety */
  border-radius: 12px;
  background: #fff;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(32, 196, 182, 0.2);
}

.qr-label {
  font-size: 12px;
  color: rgba(16, 20, 24, 0.5);
  letter-spacing: 0.05em;
}

.glass-shell {
  padding: 28px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.35));
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 60px rgba(32, 196, 182, 0.18);
}

@media (max-width: 720px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .glass-shell {
    padding: 20px;
  }
  
    .donate-card {
  
      padding: 24px;
  
    }
  
  }
  
  
  
  .qr-img {
  
    cursor: zoom-in;
  
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  
    
  
    &:hover {
  
      transform: scale(1.05);
  
      box-shadow: 0 8px 20px rgba(32, 196, 182, 0.25);
  
      border-color: var(--color-primary);
  
    }
  
  }
  
  
  
  .qr-overlay {
  
    position: fixed;
  
    inset: 0;
  
    z-index: 9999;
  
    background: rgba(244, 248, 248, 0.85);
  
    backdrop-filter: blur(12px);
  
    display: flex;
  
    align-items: center;
  
    justify-content: center;
  
    cursor: zoom-out;
  
    animation: fadeIn 0.3s ease-out;
  
  }
  
  
  
  .large-qr {
  
    max-width: 90vw;
  
    max-height: 90vh;
  
    width: 400px;
  
    height: auto;
  
    border-radius: 16px;
  
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8);
  
    animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  }
  
  
  
  @keyframes fadeIn {
  
    from { opacity: 0; }
  
    to { opacity: 1; }
  
  }
  
  
  
  @keyframes popIn {
  
    from { 
  
      opacity: 0;
  
      transform: scale(0.9) translateY(20px);
  
    }
  
    to { 
  
      opacity: 1;
  
      transform: scale(1) translateY(0);
  
    }
  
  }
  
  </style>
  
  
