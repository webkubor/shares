<template>
  <n-space vertical>
    <n-card title="人机验证">
      <n-space>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/vertify/google')">google无感知登录</n-button>
        <n-button :color="getRandomColor()" ghost
          @click="$router.push('/vertify/cloudflare')">Cloudflare无感知登录</n-button>
      </n-space>
    </n-card>
    <n-card title="特殊功能试验区">
      <n-space>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/chat/room')">聊天室(未完成)</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/watermark')">图片水印添加</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/font')">小说封面</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/rtc/index')">WebRTC</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/rtc/webWork')">web worker</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/barrage')">弹幕测试</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/list')">列表滚动测试</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/money')">利息计算</n-button>
      </n-space>

    </n-card>
    <n-card title="UI视觉">
      <n-space>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/three/index')">Three</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/animation/index')">Animation</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/colors')">Colors</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/loading')">loading</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/chart')">图表</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/login')">Login登录页</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/buttons')">按钮组</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/tabbar')">Tabbar 设计参考</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/show/apple')">苹果官网流动</n-button>
      </n-space>
    </n-card>

    <n-card title="游戏专区">
      <n-space>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/betting')">三色球/下注/自定义切换</n-button>
        <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/battle')">对战竞技样式参考</n-button>
      </n-space>
    </n-card>

  </n-space>
  <!-- <SpiderView/> -->
</template>
<script setup lang="ts">
import SpiderView from "@/components/Spider.vue"
import { getRandomColor } from "@/utils/random";

</script>