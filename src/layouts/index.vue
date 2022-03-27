<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2022-03-27 13:35:38
-->
<template>
  <n-config-provider :theme="theme">
      <router-view></router-view>
  </n-config-provider>

</template>
<script>
import { useTheme } from "@/hooks/useTheme";
export default {
  setup() {
    let { theme } = useTheme();
    return {
      theme,
    };
  },
};
</script>
