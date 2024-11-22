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
import {prettyLog} from "@/utils/log";
import { Message } from "@/hooks/useToast";
let { allThemeOverrides, local, initTheme } = useTheme();
window.$toast = Message;
window.$log = prettyLog();
onMounted(() => {
  initTheme();
})

</script>
<style lang="scss" >
@import "@/styles/index.scss";

</style>
