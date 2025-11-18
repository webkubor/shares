<template>
  <div class="tool-space">
    <div class="tool-card">
      <div class="tool-title">应用层实践</div>
      <div class="tool-row">
        <button class="common-btn" @click="$router.push('/wallpaper')">壁纸样机生成器</button>
        <button class="common-btn" @click="$router.push('/show/money')">利息计算</button>
        <button class="common-btn" @click="$router.push('/show/list')">indexDB</button>
        <button class="common-btn" @click="$router.push('/book/share')">摘录分享</button>
        <button class="common-btn" @click="$router.push('/show/colors')">主题色选择器</button>
      </div>
    </div>
    <div class="tool-card">
      <div class="tool-title">UI视觉</div>
      <div class="tool-row">
        <button class="common-btn" @click="$router.push('/show/login')">Login登录页</button>
      </div>
    </div>

    <div class="tool-card">
      <div class="tool-title">官网预览</div>
      <div class="tool-row">
        <button class="common-btn" @click="$router.push('/public/apple')">苹果官网流动参考</button>
        <button class="common-btn" @click="$router.push('/public/poster')">海报滚动</button>
        <button class="common-btn" @click="$router.push('/public/wall')">图片墙纸</button>
      </div>
    </div>

    <div class="tool-card">
      <div class="tool-title">待开发</div>
      <div class="tool-row">
        <button class="common-btn" @click="$router.push('/barrage')">弹幕</button>
      </div>
    </div>
    <div class="tool-card">
      <div class="tool-title">人机验证</div>
      <div class="tool-row">
        <button class="common-btn" @click="$router.push('/vertify/google')">google无感知登录</button>
        <button class="common-btn" @click="$router.push('/vertify/cloudflare')">Cloudflare无感知登录</button>
      </div>
    </div>
  </div>
  <!-- <SpiderView/> -->
</template>
<script setup lang="ts">
import SpiderView from "@/components/Spider.vue"
import { getRandomColor } from "@/utils/random";

</script>
<style scoped lang="scss">
.tool-space { display: flex; flex-direction: column; gap: 20px; }
.tool-card { background: var(--bg-elevated); border: 1px solid var(--border-color); border-radius: 16px; padding: 16px; box-shadow: 0 8px 24px var(--shadow-color); }
.tool-title { font-weight: 800; margin-bottom: 12px; letter-spacing: .5px; }
.tool-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
.common-btn { min-width: 160px; border: 0; background-image: var(--brand-gradient); color: #fff; border-radius: 12px; height: 40px; font-weight: 700; }
.common-btn:hover { filter: brightness(1.05); transform: translateY(-2px); }
</style>