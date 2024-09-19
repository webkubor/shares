import { ref, onMounted, onUnmounted } from 'vue';

export function useAddToHomeScreen() {
  const showAddTipsDialog = ref(false); // 控制是否显示 iOS 添加指引
  const isAddToHomeAvailable = ref(false); // 控制是否显示“添加到主屏幕”按钮

  // 存储 deferredPrompt
  let deferredPrompt = null;

  // 判断是否是 iOS 设备
  const isIOS = () => {
    const userAgent = navigator.userAgent;
    return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  };

  // 监听 beforeinstallprompt 事件
  const beforeInstallPromptHandler = (e) => {
    console.log(`output->beforeInstallPromptHandler`,e)
    // 阻止默认的安装提示
    e.preventDefault();
    deferredPrompt = e;
    isAddToHomeAvailable.value = true; // 显示“添加到主屏幕”按钮
  };

  // 开始触发添加到主屏幕流程
  const openAddFlow = () => {
    if (isIOS()) {
      // iOS 不支持 beforeinstallprompt，显示指引
      showAddTipsDialog.value = true;
      console.log('iOS: 显示浏览器设置指引图');
    } else {
      try {
        // 检查是否存在 deferredPrompt
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
              localStorage.setItem('addDesktop', true); // 标记为已添加
              isAddToHomeAvailable.value = false; // 隐藏按钮
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null; // 清空 deferredPrompt 以避免重复调用
          });
        } else {
          // 如果没有 deferredPrompt，显示手动添加指引
          showAddTipsDialog.value = true;
          console.log('deferredPrompt 不存在，可能是用户拒绝或不符合条件');
        }
      } catch (error) {
        console.error('Error triggering Add to Home Screen:', error);
        // 发生错误，显示手动添加指引
        showAddTipsDialog.value = true;
      }
    }
  };

  // 生命周期：挂载和卸载
  onMounted(() => {
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
  });

  onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
  });

  return {
    showAddTipsDialog,     // 是否显示 iOS 添加到桌面的提示
    isAddToHomeAvailable,  // 是否可以显示添加到桌面按钮
    openAddFlow,           // 调用以触发添加到桌面的流程
  };
}
