<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2022-09-21 10:51:01
-->
<template>
  <n-config-provider   :theme="local.theme"
    :theme-overrides="allThemeOverrides">
      <router-view></router-view>
  </n-config-provider>
</template>
<script setup>
import { useTheme } from "@/hooks/useTheme";
let { allThemeOverrides, local, initTheme } = useTheme();
initTheme();


</script>
