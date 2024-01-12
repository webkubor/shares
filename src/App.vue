<template>
  <n-config-provider :theme="local.theme" :theme-overrides="allThemeOverrides">
    <n-notification-provider :max="1">
      <n-loading-bar-provider>
        <n-dialog-provider>
          <n-message-provider>
            <router-view></router-view>
          </n-message-provider>
        </n-dialog-provider>
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
<script setup>
import { useTheme } from "@/hooks/useTheme";
let { allThemeOverrides, local,initTheme } = useTheme();
initTheme();


</script>
