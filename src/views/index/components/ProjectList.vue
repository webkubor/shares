
<template>
  <n-divider title-placement="center">关于项目</n-divider>
  <n-grid
    cols="1 s:1 m:1 l:2 xl:3 2xl:3"
    x-gap="15"
    y-gap="15"
    responsive="screen"
  >
    <n-grid-item v-for="(item, index) in projects.list">
      <n-card :title="item.title" v-ripple="{ color: '#5e7ce0',duration: 500, delay: 300 }" @click="toDetail(item.source)">
        <template #cover>
          <n-image :src="item.pic" object-fit="scale-down" />
        </template>
        <div class="content"  >
          <n-tag
            v-for="(item, index) in item.tags"
            :key="item + index"
            :type="getRandomType()"
            round
          >
            {{ item }}
          </n-tag>
          <div class="item">
            <n-ellipsis :line-clamp="3">
              {{ item.descrition }}
            </n-ellipsis>
          </div>
          <div
            class="item link"
            @click="openUrl(item.source, item.title + index)"
          >
            {{ item.source }}
          </div>
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script lang="ts" setup>
import { useProject } from "@/hooks/useProject";
import { getRandomType } from "@/utils/random";
import { openUrl } from "@/utils/index";

let { projects } = useProject();


function toDetail(URL:string) {
  openUrl(URL)
}

</script>
<style lang="scss" scoped>
.n-card {
  max-width: 800px;
  max-height: 350px;
  cursor: pointer;
}
.content {
  font-size: 18px;
  .n-tag {
    margin-right: 4px;
  }
  .item {
    padding-top: 10px;
  }
  .link {
    text-decoration: underline;
    text-decoration-color: lightseagreen;
    color: lightseagreen;
    cursor: pointer;
  }
}
</style>
