<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2022-03-05 12:25:09
-->
<template>
  <n-config-provider :theme="theme">
      <router-view></router-view>
  </n-config-provider>
  <!-- 自定义主题配置 -->
  <!-- <n-config-provider :theme-overrides="themeOverrides">
  </n-config-provider> -->
</template>
<script>
import { useTheme } from "@/hooks/useTheme";
// import DefaultTheme from "@/theme/default.json";
export default {
  setup() {
    let { theme } = useTheme();
    /**
     * @type import('naive-ui').GlobalThemeOverrides
     */
    // const themeOverrides = DefaultTheme;
    return {
      theme,
    };
  },
};
</script>
