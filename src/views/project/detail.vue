<!--
 * @Date: 2021-10-22 13:33:57
 * @LastEditTime: 2022-03-05 12:30:54
-->
<template>
  <div class="detail-age">
    <div class="header">项目详情</div>
    <div class="body"></div>
  </div>
</template>
<script>
import { reactive } from "vue";

export default {
  setup() {
    let detail = reactive({});
    detail = window.localStorage.project_detail;

    return { detail };
  },
};
</script>
<style lang="scss" scoped>
.detail-age {
  padding: 1rem;
  .header {
    font-size: 28px;
  }
}
</style>
