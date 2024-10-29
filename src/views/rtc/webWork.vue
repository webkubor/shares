<template>
    <n-card>
        <n-space>
            <n-button @click="startComputation">开始计算</n-button>
      <n-input-number  placeholder="计算结果"  v-model:value="end"/>
        </n-space>
    </n-card>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const end = ref(null);
  let worker = null;
  
  onMounted(() => {
    worker = new Worker(new URL('@/workers/worker.ts', import.meta.url), { type: 'module' });
    worker.addEventListener('message', handleWorkerMessage);
  });
  
  onUnmounted(() => {
    if (worker) {
      worker.terminate();
      worker = null;
    }
  });
  
  function startComputation() {
    worker.postMessage({ type: 'compute', data: 10 });
  }
  
  function handleWorkerMessage(e) {
    console.log(e.data , 'handleWorkerMessage')
    const { type, result } = e.data;
    if (type === 'result') {
        end.value = result;
    }
  }
  </script>