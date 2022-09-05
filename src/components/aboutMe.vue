<!--
 * @Date: 2021-07-31 19:27:24
 * @LastEditTime: 2022-09-05 11:21:00
-->
<template>
  <div class="about-me column-center">
    <div class="show-item">
      <n-popover trigger="hover">
        <template #trigger>
          <div class="love-headers">
            <n-avatar
              round
              :size="100"
              :src="getImage('me.jpeg')"
              @click="swtichTheme"
            />
          </div>
        </template>
        <span>来换个心情呗 {{ t("about") }}</span>
      </n-popover>
    </div>

    <h1>
      <n-gradient-text type="info">
        {{ user.name }}
      </n-gradient-text>
    </h1>
    <div style="margin-bottom: 20px;" @click="toggleLocale">语言切换: {{ language }}</div>
    <n-space>
      <n-tag
        v-for="(item, index) in user.tags"
        :key="item + index"
        :type="getRandomType()"
        round
      >
        {{ item }}
      </n-tag>
    </n-space>
    <n-divider title-placement="center">签名</n-divider>
    <div class="sign">
      {{ user.personalSign }}
    </div>
  </div>
</template>
<script setup>
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/hooks/useTheme";
import { getRandomType } from "@/utils/random";
import { useI18n } from "vue-i18n";
import {computed}  from "vue"
const { t, locale } = useI18n();
let { user, updateAge } = useUser();
let { swtichTheme } = useTheme();
console.log(user, "我的");


updateAge("logo.jpeg");
const language = computed(() =>
  locale.value === "zh-CN" ? "中文" : "English"
);

const toggleLocale = () => {
  locale.value = locale.value === "zh-CN" ? "en" : "zh-CN";
};


const getImage = (name) => {
  const picModules = import.meta.globEager("/src/assets/*");
  const path = `/src/assets/${name}`;
  return picModules[path].default;
};


</script>

<style lang="scss" scoped>
.about-me {
  padding: 1rem 0 1rem;
  .show-item {
    padding: 1rem 0 0;
    .love-headers {
      display: flex;
      align-items: center;
      .n-icon {
        margin: 0 10px;
      }
      .n-icon:active {
        animation: bounce; /* referring directly to the animation's @keyframe declaration */
        animation-duration: 2s; /* don't forget to set a duration! */
      }
    }
    .n-avatar {
      cursor: pointer;
      transition: transform 0.5s ease-in-out 0s;
      &:hover {
        transform: rotate(720deg);
      }
    }
  }
  .sign {
    font-weight: 500;
    font-size: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
}
</style>
