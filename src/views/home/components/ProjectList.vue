
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
img {
  width: 100%;
  object-fit: cover;
  height: 200px;
}
.card { max-width: 800px; height: 380px; cursor: pointer; border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; background: var(--bg-elevated); box-shadow: 0 8px 24px var(--shadow-color); }
.card-title { font-weight: 700; padding: 10px 12px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }
.grid-item { display: block; }
.content {
  font-size: 12px;
  .tag { margin-right: 4px; display: inline-block; padding: 4px 10px; border-radius: 999px; background: rgba(35,84,255,0.12); color: #2354FF; font-weight: 600; }
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
.ellipsis-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
</style>
