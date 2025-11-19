<template>
  <div class="tool-grid animate-fadeInUp">
    <k-card>
      <div class="tool-title">应用层实践</div>
      <div class="tool-actions">
        <k-button href="https://wallpaperbuild.netlify.app/#/">壁纸样机生成器</k-button>
        <k-button @click="$router.push('/show/money')">利息计算</k-button>
        <k-button @click="$router.push('/show/list')">indexDB</k-button>
        <k-button @click="$router.push('/book/share')">摘录分享</k-button>
        <k-button @click="$router.push('/bot/kimi')">Kimi 机器人</k-button>
        <k-button @click="$router.push('/iframe')">Iframe</k-button>
      </div>
    </k-card>

    <k-card>
      <div class="tool-title">UI视觉</div>
      <div class="tool-actions">
        <k-button @click="$router.push('/show/colors')">主题色选择器</k-button>
        <k-button @click="$router.push('/show/login/3')">Login登录页</k-button>
        <k-button @click="$router.push('/show/login/5')">Login5登录页</k-button>
      </div>
    </k-card>

    <k-card>
      <div class="tool-title">官网预览</div>
      <div class="tool-actions">
        <k-button @click="$router.push('/public/apple')">苹果官网流动参考</k-button>
        <k-button @click="$router.push('/public/poster')">海报滚动</k-button>
      </div>
    </k-card>

    <k-card>
      <div class="tool-title">待开发</div>
      <div class="tool-actions">
        <k-button @click="$router.push('/barrage')">弹幕</k-button>
      </div>
    </k-card>

    <k-card>
      <div class="tool-title">人机验证</div>
      <div class="tool-actions">
        <k-button @click="$router.push('/vertify/google')">Google 无感知登录</k-button>
        <k-button @click="$router.push('/vertify/cloudflare')">Cloudflare 无感知登录</k-button>
      </div>
    </k-card>
  </div>
</template>

<script setup lang="ts">
import KCard from "@/components/KCard.vue"
import KButton from "@/components/KButton.vue"
</script>
<style scoped lang="scss">
@import '@/styles/variables.scss';

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
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


</style>