<template>
  <n-space vertical>
    <n-card title="应用层实践">
      <n-space>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/wallpaper')">壁纸样机生成器</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/watermark')">小红书水印添加</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/font')">书法类型字体参考</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/money')">利息计算</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/betting')">三色球/下注/自定义切换</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/list')">indexDB</n-button>
      </n-space>

    </n-card>
    <n-card title="UI视觉">
      <n-space>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/animation/index')">动画组</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/colors')">主题色选择器</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/login')">Login登录页</n-button>
      </n-space>
    </n-card>


    <n-card title="官网预览">
      <n-button :color="getRandomColor()" ghost @click="$router.push('/public/apple')">苹果官网流动参考</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/public/poster')">海报滚动</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/public/wall')">图片墙纸</n-button>
    </n-card>


    <n-card title="待开发">
      <n-space>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/rtc/webWork')">web worker</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/barrage')">弹幕</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/rtc/index')">WebRTC</n-button>
      </n-space>
    </n-card>
    <n-card title="人机验证">
      <n-space>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/vertify/google')">google无感知登录</n-button>
        <n-button :color="getRandomColor()" ghost
          @click="$router.push('/vertify/cloudflare')">Cloudflare无感知登录</n-button>
      </n-space>
    </n-card>

  </n-space>
  <!-- <SpiderView/> -->
</template>
<script setup lang="ts">
import SpiderView from "@/components/Spider.vue"
import { getRandomColor } from "@/utils/random";

</script>