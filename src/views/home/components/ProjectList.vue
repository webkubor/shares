
<template>
  <div class="grid">
    <div class="grid-item" v-for="(item, index) in projects.list" :key="item.title + index">
      <div class="card" @click="toDetail(item.source)">
        <img :src="item.pic" />
        <div class="card-title">{{ item.title }}</div>
        <div class="content">
          <span
            v-for="(tag, i) in item.tags"
            :key="tag + i"
            class="tag"
          >{{ tag }}</span>
          <div class="item ellipsis-2">
            {{ item.descrition }}
          </div>
          <div class="item link" @click.stop="openUrl(item.source, item.title + index)">
            {{ item.source }}
          </div>
        </div>
      </div>
    </div>
  </div>
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
</style>
