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
    <div class="tags" style="margin-top: 20px;">
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
.about-me {
  position: relative;
  margin: 5vh auto;
  font-size: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1920px;
  width: 80vw;
  color: var(--webkubor-text-primary);
  padding: 20px 30px;

  .love-headers {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar-wrap {
    position: relative;
    display: inline-block;
  }

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.5s ease-in-out 0s;
  }

  .avatar:hover { transform: rotate(720deg); }

  .tooltip {
    position: absolute;
    bottom: -32px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg-elevated);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 12px;
    box-shadow: 0 6px 20px var(--shadow-color);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
  .avatar-wrap:hover .tooltip { opacity: 1; }

  .sign {
    display: inline-block;
    font-weight: 800;
    font-size: clamp(24px, 3.2vw, 40px);
    margin: 24px 30px 12px;
    color: var(--text-primary);
    background: var(--bg-elevated);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 8px 16px;
    box-shadow: 0 8px 24px var(--shadow-color);
  }
}


@media screen and (max-width: 768px) {
.about-me {
    width: 90%;
    margin: 10px auto;
    padding: 5px;
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 1em $default-primary);

    .sign {
      font-size: 1.25rem;
    }
  }

}
</style>
.tags { display: flex; gap: 8px; flex-wrap: wrap; }
.tag { padding: 4px 10px; border-radius: 999px; font-weight: 600; font-size: 12px; }
