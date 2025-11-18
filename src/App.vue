<template>
  <div>
    <router-view />
  </div>
</template>
<script setup>
import { useTheme } from "@/hooks/useTheme";
import { onMounted } from "vue";
import { useGlobal } from "./hooks/useGlobal";
import { Message } from '@/plugins/Message/message';
import {klogger} from "kbor-logger";
let { initTheme } = useTheme();
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
</style>
@/components/Notice/useToast