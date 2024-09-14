<template>
    <h1 class="elegantshadow">背景切换</h1>
    <n-color-picker v-model:value="model.color" :actions="['confirm']" @confirm="handleConfirm"></n-color-picker>

  <n-space vertical style="margin-top: 30px;">
    <n-space justify="space-around">
      <flowerLoading />
      <waitingLoading />
      <waitingLoading2 />
      <Boundce />
      <Flow />
      <Water />
      <star/>
    </n-space>
  </n-space>



</template>
<script lang="ts" setup>
import flowerLoading from './components/flower.vue'
import waitingLoading from './components/waiting.vue'
import waitingLoading2 from './components/waiting2.vue'
import Boundce from './components/bounce.vue'
import Flow from "./components/flow.vue"
import star from './components/star.vue'
import { reactive } from 'vue';
import Water from './components/water.vue';
const model = reactive({
  color: '#161B29'
})

handleConfirm(model.color)
function handleConfirm(value: string) {
  console.log(value)
  const root = document.documentElement;
  root.style.setProperty('--webkubor-loading-color', value ? value : '#161B29');
}



</script>
<style lang="scss" scoped>
:root {
  --webkubor-loading-color: #161B29;
}

.iphone15-border {
  width: 355px;
  height: 790px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2),
    0 4px 6px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  filter: drop-shadow(0px 1px 1em $primary-color);
  background-color: var(--webkubor-loading-color);
}
</style>