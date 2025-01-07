<template>
  <div class="home-page">
    <UserInfo />
    <div class="show-container">
      <n-tabs type="segment" animated>
        <n-tab-pane name="chap1" tab="有趣的尝试">
          <ToolView />
        </n-tab-pane>

        <n-tab-pane name="chap3" tab="项目展示">
          <ProjectList />
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>
<script setup>
import UserInfo from "./components/UserInfo.vue";
import ProjectList from "./components/ProjectList.vue";
import ToolView from './components/Tool.vue'

window.addEventListener('vite:preloadError', (event) => {
  window.$message?.warning('检测到有新版本，5秒后即将自动刷新...');
  setTimeout(() => {
    window.location.reload() // 例如，刷新页面
    console.log('页面已更新为最新版本...');
  }, 5000)
})
initBackgroundMusic()


</script>
<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;
  .show-container {
    margin: 0 auto;
    border: $default-primary 2px solid;
    border-radius: 4px;
    filter: drop-shadow(0px 0px 1em $default-primary);
    width: 80vw;
  }
}



@media screen and (max-width: 768px) {
.home-page {
  .show-container {
    width: 90%;
  }
}
}
</style>
