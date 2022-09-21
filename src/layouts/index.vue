
<template>
      <router-view></router-view>
</template>
<script setup>
  import { useTheme } from "@/hooks/useTheme";
  let {  initTheme } = useTheme();
  initTheme();
  </script>
  
