<template>
     
      <router-view></router-view>
</template>
<script lang="ts" setup>
import { useMessage, useNotification, useDialog } from "naive-ui";
import { Message } from "@/hooks/useMessage";
window.$message = useMessage();
window.$notification = useNotification();
window.$dialog = useDialog();
window.$toast = Message
</script>

