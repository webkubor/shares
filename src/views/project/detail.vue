<!--
 * @Date: 2021-10-22 13:33:57
 * @LastEditTime: 2021-11-01 16:07:58
-->
<template>
  <div class="detail-age">
    <div class="header">项目详情</div>
    <div class="body"></div>
  </div>
</template>
<script>
import { getData } from "hooks/useStorage";
import { reactive } from "vue";

export default {
  setup() {
    let detail = reactive({});

    detail = getData("project_detail");

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
