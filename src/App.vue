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
import {WURL} from 'nex-lib';
initTheme();
const url = new WURL('https://example.com:8080/path?query=123');
let { allThemeOverrides, local,initTheme } = useTheme();

console.log(url.getMainDomain());  // 输出: example.com
console.log(url.parseQueryParams());  // 输出: { query: '123' }
console.log(url.isHttps());  // 输出: true
console.log(url.getPathname());  // 输出: /path
console.log(url.getPort());  // 输出: 8080
 </script>
