<template>
    <div>
      <button @click="startComputation">开始计算</button>
      <p>计算结果: {{ result }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const result = ref(null);
  let worker = null;
  
  onMounted(() => {
    worker = new Worker('/path/to/my-worker.js'); // 确保路径正确
    worker.addEventListener('message', handleWorkerMessage);
  });
  
  onUnmounted(() => {
    if (worker) {
      worker.terminate();
      worker = null;
    }
  });
  
  function startComputation() {
    worker.postMessage({ type: 'compute', value: 10 }); // 发送消息给Worker
  }
  
  function handleWorkerMessage(e) {
    const { data } = e;
    if (data.type === 'result') {
      result.value = data.value;
    }
  }
  </script>