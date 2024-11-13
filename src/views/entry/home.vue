
<template>
  <n-card>
    <UserInfo />
    <n-tabs type="segment" animated>
    <n-tab-pane name="chap1" tab="技术博客">
      <LifeShare />
    </n-tab-pane>
    <n-tab-pane name="chap2" tab="有趣的尝试">
      <ToolView/>
    </n-tab-pane>
    <n-tab-pane name="chap3" tab="项目展示">
      <ProjectList />
    </n-tab-pane>
  </n-tabs>
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
