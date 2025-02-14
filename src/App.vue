<template>
  <n-config-provider :theme="local.theme" :theme-overrides="allThemeOverrides">
    <router-view />
  </n-config-provider>
</template>
<script setup>
import { useTheme } from "@/hooks/useTheme";
import { onMounted } from "vue";
import { Message } from "@/components/Notice/useToast";
import { useGlobal } from "./hooks/useGlobal";
import {klogger} from "kbor-logger";
let { allThemeOverrides, local, initTheme } = useTheme();
const { initView } = useGlobal();
window.$message = Message;
window.$logger = klogger();
window.$logger?.success('当前环境', import.meta.env.MODE)

onMounted(() => {
  initView()
  initTheme();
})

</script>
<style lang="scss">
@import "@/styles/index.scss";
</style>
@/components/Notice/useToast