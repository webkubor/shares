
<template>
      <router-view></router-view>
</template>
<script setup>
import { useMessage, useNotification, useDialog } from "naive-ui";
window.$message = useMessage();
window.$notification = useNotification();
window.$dialog = useDialog();
</script>
  
