<template>
  <div class="tool-space">
    <div class="tool-card">
      <div class="tool-title">应用层实践</div>
      <div>
        <button @click="$router.push('/wallpaper')">壁纸样机生成器</button>
        <button @click="$router.push('/show/money')">利息计算</button>
        <button @click="$router.push('/show/list')">indexDB</button>
        <button @click="$router.push('/book/share')">摘录分享</button>
        <button @click="$router.push('/show/colors')">主题色选择器</button>
      </div>
    </div>
    <div class="tool-card">
      <div class="tool-title">UI视觉</div>
      <div>
        <button @click="$router.push('/show/login')">Login登录页</button>
      </div>
    </div>

    <div class="tool-card">
      <div class="tool-title">官网预览</div>
      <div>
        <button @click="$router.push('/public/apple')">苹果官网流动参考</button>
        <button @click="$router.push('/public/poster')">海报滚动</button>
        <button @click="$router.push('/public/wall')">图片墙纸</button>
      </div>
    </div>

    <div class="tool-card">
      <div class="tool-title">待开发</div>
      <div>
        <button @click="$router.push('/barrage')">弹幕</button>
      </div>
    </div>
    <div class="tool-card">
      <div class="tool-title">人机验证</div>
      <div>
        <button @click="$router.push('/vertify/google')">google无感知登录</button>
        <button @click="$router.push('/vertify/cloudflare')">Cloudflare无感知登录</button>
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
</style>