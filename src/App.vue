<template>
  <n-config-provider :theme="local.theme" :theme-overrides="allThemeOverrides">
    <n-notification-provider :max="1">
      <n-loading-bar-provider>
        <n-dialog-provider>
          <n-message-provider>
            <router-view />
          </n-message-provider>
        </n-dialog-provider>
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
<script setup>
import { useTheme } from "@/hooks/useTheme";
import { onMounted } from "vue";
import {prettyLog} from "@/utils/log";
let { allThemeOverrides, local, initTheme } = useTheme();

window.log = prettyLog();
onMounted(() => {
  initTheme();
})

</script>
<style lang="scss" >
@import "@/styles/index.scss";

</style>
