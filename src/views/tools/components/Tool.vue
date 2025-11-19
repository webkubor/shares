<template>
  <div class="tool-grid animate-fadeInUp">
    <SpotlightCard class="tool-card">
      <div class="tool-title">应用层实践</div>
      <div class="tool-actions">
        <button v-ripple @click="$router.push('/wallpaper')">壁纸样机生成器</button>
        <button v-ripple @click="$router.push('/show/money')">利息计算</button>
        <button v-ripple @click="$router.push('/show/list')">indexDB</button>
        <button v-ripple @click="$router.push('/book/share')">摘录分享</button>
      </div>
    </SpotlightCard>

    <SpotlightCard class="tool-card">
      <div class="tool-title">UI视觉</div>
      <div class="tool-actions">
        <button v-ripple @click="$router.push('/show/colors')">主题色选择器</button>
        <button v-ripple @click="$router.push('/show/login/3')">Login登录页</button>
      </div>
    </SpotlightCard>

    <SpotlightCard class="tool-card">
      <div class="tool-title">官网预览</div>
      <div class="tool-actions">
        <button v-ripple @click="$router.push('/public/apple')">苹果官网流动参考</button>
        <button v-ripple @click="$router.push('/public/poster')">海报滚动</button>
      </div>
    </SpotlightCard>

    <SpotlightCard class="tool-card">
      <div class="tool-title">待开发</div>
      <div class="tool-actions">
        <button v-ripple @click="$router.push('/barrage')">弹幕</button>
      </div>
    </SpotlightCard>

    <SpotlightCard class="tool-card">
      <div class="tool-title">人机验证</div>
      <div class="tool-actions">
        <button v-ripple @click="$router.push('/vertify/google')">Google 无感知登录</button>
        <button v-ripple @click="$router.push('/vertify/cloudflare')">Cloudflare 无感知登录</button>
      </div>
    </SpotlightCard>
  </div>
</template>
<script setup lang="ts">
import SpotlightCard from "@/components/SpotlightCard/index.vue"
</script>
<style scoped lang="scss">
@import '@/styles/variables.scss';

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.tool-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 24px var(--shadow-light);
}

.tool-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.tool-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tool-actions button {
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  transition: all .2s ease;
}

.tool-actions button:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
  box-shadow: 0 8px 24px var(--shadow-hover);
}

@media (max-width: 640px) {
  .tool-actions button { width: 100%; }
}
</style>