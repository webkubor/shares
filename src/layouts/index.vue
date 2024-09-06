<template>
     
      <router-view></router-view>
</template>
<script lang="ts" setup>
import { useMessage, useNotification, useDialog } from "naive-ui";
import { Message } from "@/hooks/useMessage";
window.$message = useMessage();
window.$notification = useNotification();
window.$dialog = useDialog();
window.$toast = Message

window.addEventListener('vite:preloadError', (event) => {
  window.$message?.warning('检测到有新版本，5秒后即将自动刷新...');
    setTimeout(() => {
      window.location.reload() // 例如，刷新页面
      console.log('页面已更新为最新版本...');
    }, 5000)
  })

</script>

