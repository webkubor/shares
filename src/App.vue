<template>
  <n-config-provider :theme="local.theme" :theme-overrides="allThemeOverrides">
    <n-notification-provider :max="1">
      <n-loading-bar-provider>
        <n-message-provider>
          <router-view />
        </n-message-provider>
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
<script setup>
import { useTheme } from "@/hooks/useTheme";
import { onMounted } from "vue";
import { Message } from "@/hooks/useToast";
let { allThemeOverrides, local, initTheme } = useTheme();
window.$toast = Message;

if (import.meta.env.MODE === 'production') {
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 123) { // F12键的键码
      e.preventDefault();
      window.$toast('开发者工具已被禁用！');
    }
  });
}



onMounted(() => {
  initTheme();
})

</script>
<style lang="scss">
@import "@/styles/index.scss";
</style>
