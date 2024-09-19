
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

window.addEventListener('beforeinstallprompt', (e) => {
  // 阻止默认的安装提示
  e.preventDefault();
  window.deferredPrompt = e;
});


const openAddFlow = () => {
  if (isIOS()) {
    // iOS 不支持 beforeinstallprompt，直接显示引导提示
    showAddTipsDialog.value = true;
    console.log('如果是苹果手机，直接显示浏览器设置指引图');
  } else {
    try {
      // 检查是否存在 deferredPrompt
      if (window.deferredPrompt) {
        // 显示 prompt 提示用户添加到桌面
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
            localStorage.setItem('addDesktop', true);  // 标记已添加到桌面
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          // 清空 deferredPrompt 以避免重复调用
          window.deferredPrompt = null;
        });
      } else {
        // 如果没有 deferredPrompt，说明之前可能已经被用户拒绝或不符合条件
        showAddTipsDialog.value = true;
        console.log('deferredPrompt 不存在，可能是用户之前拒绝或不符合条件');
      }
    } catch (error) {
      console.error('Error triggering Add to Home Screen:', error);
      // 如果发生任何错误，显示引导提示
      showAddTipsDialog.value = true;
    }
  }
};

const isIOS = () => {
  const userAgent = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(userAgent) &&!window.MSStream;
};

</script>
<style lang="scss" scoped>

.carousel-img {
  width: 100%;
  object-fit: cover;
}
</style>
