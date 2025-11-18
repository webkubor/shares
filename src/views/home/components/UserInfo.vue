<template>
  <div class="about-me">
    <div class="love-headers">
      <div class="avatar-wrap" @click="toggleTheme">
        <img class="avatar" src="https://github.com/webkubor/picx-images-hosting/raw/master/webkubor/me.1zi6wrx8na.webp" alt="avatar" />
        <div class="tooltip">Designed by {{ user.name }}</div>
      </div>
    </div>
    <span class="sign">
      {{ signText }}
      <span></span>
    </span>
    <div class="tags">
      <div class="tags-container">
        <span
          v-for="(item, index) in user.tags.slice(0, 6)"
          :key="item + index"
          class="tag"
          :style="getTagStyle(getRandomType())"
        >{{ item }}</span>
        <span
          v-if="user.tags && user.tags.length > 6"
          class="tag more-tag"
        >+{{ user.tags.length - 6 }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/hooks/useTheme";
import { getRandomType } from "@/utils/random";
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

const signText = computed(() => {
  const base = user.personalSign && String(user.personalSign).trim()
  return base && base.length > 0
    ? base
    : '用代码编织数字世界的艺术家'
})

</script>

<style lang="scss" scoped>
.avatar-wrap {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  left: 50%;
  bottom: -28px;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.6);
  color: #fff;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 12px;
  white-space: nowrap;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  max-height: 48px;
  overflow: hidden;
}

.more-tag {
  border-style: dashed;
  opacity: 0.8;
}
</style>
