<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-10-14 17:34:18
-->
<template>
<!-- 自定义主题配置 -->
 <n-config-provider :theme="theme">
    <router-view></router-view>
 </n-config-provider>
  <!-- <n-config-provider :theme-overrides="themeOverrides">
  </n-config-provider> -->
</template>
<script>
import {useTheme} from "hooks/useTheme"

export default {
  setup() {
    let {theme} = useTheme()
    /**
     * @type import('naive-ui').GlobalThemeOverrides
     */
    const themeOverrides = {
      common: {
        primaryColor: "#FF0000",
      },
      Button: {
        textColor: "#FF0000",
      },
      Select: {
        peers: {
          InternalSelection: {
            textColor: "#FF0000",
          },
        },
      },
    };
    return {
      theme
    };
  },
};
</script>
