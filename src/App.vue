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
import { useGlobal } from "./hooks/useGlobal";
let { allThemeOverrides, local, initTheme } = useTheme();
const { init } = useGlobal();
window.$toast = Message;

onMounted(() => {
  init()
  initTheme();
})

</script>
<style lang="scss">
@import "@/styles/index.scss";
</style>
