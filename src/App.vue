<template>
    <router-view />
</template>
<script setup>
import { onMounted } from "vue";
import { useGlobal } from "./hooks/useGlobal";
import { Message } from '@/plugins/Message/message';
import {klogger} from "kbor-logger";
const { initView } = useGlobal();
window.$message = Message;

window.$logger = klogger();
window.$logger?.success('当前环境', import.meta.env.MODE)

onMounted(() => {
  initView()
})
</script>
<style lang="scss">
</style>
@/components/Notice/useToast