<template>
  <div class="about-me">
    <div class="love-headers">
      <div class="avatar-wrap" @click="toggleTheme">
        <img class="avatar" src="https://github.com/webkubor/picx-images-hosting/raw/master/webkubor/me.1zi6wrx8na.webp" alt="avatar" />
        <div class="tooltip">this is {{ user.name }}</div>
      </div>
    </div>
    <span class="sign">
      {{ user.personalSign }}
      <span></span>
    </span>
    <Waiting />
    <div class="tags">
      <span
        v-for="(item, index) in user.tags"
        :key="item + index"
        class="tag"
        :style="getTagStyle(getRandomType())"
      >{{ item }}</span>
    </div>
  </div>
</template>
<script setup>
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/hooks/useTheme";
import { getRandomType } from "@/utils/random";
import Waiting from "./Waiting.vue";
import { computed } from 'vue'

let { user, updateAge } = useUser();
let { switchTheme, local } = useTheme();

updateAge("logo.jpeg");

function toggleTheme() {
  switchTheme(local.osTheme === "light");
}

function getTagStyle(type) {
  const map = {
    success: { background: '#30C0A2', color: '#fff' },
    info: { background: '#5E64DA', color: '#fff' },
    warning: { background: '#FFB31C', color: '#000' },
    error: { background: '#CF1322', color: '#fff' },
    default: { background: '#2354FF', color: '#fff' }
  }
  return map[type] || map.default
}

</script>

<style lang="scss" scoped>
</style>
