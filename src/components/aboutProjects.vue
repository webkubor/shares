<!--
 * @Date: 2021-07-31 19:26:47
 * @LastEditTime: 2021-10-15 11:48:03
-->
<template>
  <n-divider title-placement="center">关于项目</n-divider>
  <n-grid :x-gap="12" :y-gap="8" :cols="3">
    <n-grid-item v-for="(item, index) in projects.list">
      <n-card :title="item.title">
        <template #cover>
          <n-image :src="item.pic" />
        </template>
        <div class="content">
          <n-tag
            v-for="(item, index) in item.tags"
            :key="item + index"
            :type="getRandomType()"
            round
          >
            {{ item }}
          </n-tag>
          <div class="item">description: {{ item.descrition }}</div>
          <div class="item">time: {{ item.time }}</div>
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script>
import { useProject } from "hooks/useProject";
import { getRandomType } from "utils/random";

export default {
  setup() {
    let { projects } = useProject();
    return {
      projects,
      getRandomType,
    };
  },
};
</script>
<style lang="scss" scoped>
.n-card {
  max-width: 800px;
  max-height: 350px;
}
.content {
  font-size: 18px;
  .n-tag {
    margin-right: 4px;
  }
  .item {
    padding-top: 10px;
  }
}
</style>
