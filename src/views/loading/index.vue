<template>
 <n-card  title="loading样式测试">
  <n-button>
    背景切换
  </n-button>
</n-card>

<n-space justify="space-around">
  <circleLoading/>
  <flowerLoading/>
  <waitingLoading/>
  <waitingLoading2/>
</n-space>

</template>
<script setup>
import circleLoading from './components/circle.vue';
import flowerLoading from './components/flower.vue'
import waitingLoading from './components/waiting.vue'
import waitingLoading2 from './components/waiting2.vue'
</script>