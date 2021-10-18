<!--
 * @Date: 2021-07-31 19:26:47
 * @LastEditTime: 2021-10-18 11:07:23
-->
<template>
  <n-divider title-placement="center">关于项目</n-divider>
  <n-grid cols="1 s:1 m:1 l:2 xl:3 2xl:3" x-gap="15" y-gap="15" responsive="screen">
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
