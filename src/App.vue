<template>
  <n-config-provider :theme="local.theme" :theme-overrides="allThemeOverrides">
    <router-view />
  </n-config-provider>
</template>
<script setup>
import { useTheme } from "@/hooks/useTheme";
import { onMounted } from "vue";
import { Message } from "@/hooks/useToast";
import { useGlobal } from "./hooks/useGlobal";
let { allThemeOverrides, local, initTheme } = useTheme();
const { initView } = useGlobal();
window.$toast = Message;
window.$message = Snackbar;

onMounted(() => {
  initView()
  initTheme();
})

</script>
<style lang="scss">
@import "@/styles/index.scss";
</style>
