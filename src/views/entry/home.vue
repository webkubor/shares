
<template>
  <n-card>
    <UserInfo />
    <ToolView/>
    <ProjectList />
    <LifeShare />
  </n-card>
</template>
<script setup >
import UserInfo from "./components/UserInfo.vue";
import ProjectList from "./components/ProjectList.vue";
import LifeShare from "./components/LifeShare.vue";
import ToolView from './components/Tool.vue'
import { useMessage, useNotification, useDialog } from "naive-ui";
window.$message = useMessage();
window.$notification = useNotification();
window.$dialog = useDialog();

window.addEventListener('vite:preloadError', (event) => {
  window.$message?.warning('检测到有新版本，5秒后即将自动刷新...');
    setTimeout(() => {
      window.location.reload() // 例如，刷新页面
      console.log('页面已更新为最新版本...');
    }, 5000)
  })


</script>
<style lang="scss" scoped>

.carousel-img {
  width: 100%;
  object-fit: cover;
}
</style>
