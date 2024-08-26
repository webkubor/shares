<template>
      <n-divider title-placement="center">工具包</n-divider>
    <n-space vertical>
      <!-- <n-card title="图标库-@phosphor-icons/vue">
        <PhAirplay :size="32" />
        <PhAppWindow :size="32" />
      </n-card>
      <n-card title="图标库-@icon-park/vue-next">
        https://iconpark.oceanengine.com/official
        <n-space>
          <hourglass-full theme="filled" size="34" fill="#e75716" :strokeWidth="3" strokeLinecap="butt" />
          <friends-circle theme="filled" size="34" fill="#000000" :strokeWidth="3" strokeLinecap="butt" />
        </n-space>
      </n-card> -->
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
          <n-button :color="getRandomColor()" ghost @click="$router.push('/chart/line')">折线图测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/chart/pie')">饼图</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/rtc/webWork')">web worker</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/barrage')">弹幕测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/loading')">loading</n-button>

        </n-space>

      </n-card>
      <n-card title="UI视觉">
        <n-space>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/watermark')">图片水印添加</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/font')">小说封面设计</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/login')">Login登录页</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/business')">管理端界面颜色</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/buttons')">按钮组</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/tabbar')">Tabbar 设计参考</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/list')">列表滚动测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/money')">利息计算</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/spider')">蜘蛛网测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/apple')">苹果官网流动</n-button>
        </n-space>
      </n-card>

      <n-card title="游戏专区">
        <n-space>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/lucky')">xbox幸运饰品</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/betting')">三色球/下注/自定义切换</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/battle')">对战竞技样式参考</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/card')">xbox图标测试</n-button>
        </n-space>
      </n-card>

    </n-space>
</template>
<script setup lang="ts">

import {  getRandomColor } from "@/utils/random";
import { PhAirplay, PhAppWindow } from "@phosphor-icons/vue";
import { HourglassFull, FriendsCircle } from '@icon-park/vue-next';
</script>