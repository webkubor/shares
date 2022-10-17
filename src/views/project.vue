<!--
 * @Date: 2021-10-22 13:33:57
 * @LastEditTime: 2022-10-17 17:10:56
-->
<template>
    <div class="detail-age">
      <div class="header">项目详情</div>
      <div class="body"></div>
    </div>
  </template>
  <script setup>
  import { reactive } from "vue";
  let detail = reactive({});
  detail = window.localStorage.project_detail;
  </script>
  <style lang="scss" scoped>
  .detail-age {
    padding: 1rem;
    .header {
      font-size: 28px;
    }
  }
  </style>
  