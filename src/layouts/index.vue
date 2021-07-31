<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-07-31 19:08:55
-->
<template>
<!-- 自定义主题配置 -->
 <n-config-provider :theme="darkTheme">
   <h2>webkubor的项目分享</h2>
    <router-view></router-view>
 </n-config-provider>
  <!-- <n-config-provider :theme-overrides="themeOverrides">
  </n-config-provider> -->
</template>
<script>
 import { darkTheme } from 'naive-ui'
export default {
  setup() {
    /**
     * @type import('naive-ui').GlobalThemeOverrides
     */
    // const themeOverrides = {
    //   common: {
    //     primaryColor: "#FF0000",
    //   },
    //   Button: {
    //     textColor: "#FF0000",
    //   },
    //   Select: {
    //     peers: {
    //       InternalSelection: {
    //         textColor: "#FF0000",
    //       },
    //     },
    //   },
    // };
    return {
      darkTheme
    };
  },
};
</script>
