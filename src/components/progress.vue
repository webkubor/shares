<template>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: `${progress}%`, backgroundColor: progressBarColor }"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const progress = ref(100);
  let props = defineProps('time','color')
  const totalTime = props.time || 5000; // 接受外部传入的时间参数，默认为 5000 毫秒
  const progressBarColor = ref(props.color || 'red'); // 接受外部传入的颜色参数，默认为红色
  
  const startProgress = () => {
    const interval = setInterval(() => {
      progress.value -= (100 / totalTime) * 1000;
      if (progress.value <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
  

  </script>
  
  <style scoped>
  .progress-bar-container {
    width: 100%;
    height: 10px;
    background-color: #ccc;
    border-radius: 4px;
  }
  
  .progress-bar {
    height: 100%;
    border-radius: 4px;
    transition: width 1s;
  }
  </style>
  