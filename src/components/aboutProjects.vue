<!--
 * @Date: 2021-07-31 19:26:47
 * @LastEditTime: 2021-10-14 18:00:55
-->
<template>
  <n-divider title-placement="left">关于项目</n-divider>
  <n-grid :x-gap="12" :y-gap="8" :cols="3">
    <n-grid-item v-for="(item, index) in projects.list">
      <n-card :title="item.title">
        <template #cover>
          <img :src="item.pic" />
        </template>
        <div class="content">
          <n-tag  type="warning">{{ item.type }}</n-tag>
          <div>description: {{ item.description }}</div>
          <div>time: {{ item.time }}</div>
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script>
import { useProject } from "hooks/useProject";
export default {
  setup() {
    let { projects } = useProject();
    return {
      projects,
    };
  },
};
</script>
<style lang="scss" scoped>
.n-card {
  max-width: 800px;
  max-height: 350px;
}
</style>
