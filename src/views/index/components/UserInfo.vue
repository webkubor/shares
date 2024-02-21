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
    <div class="switch-btn" style="margin-bottom: 20px;" v-ripple="{ duration: 500, color:' #DCD5F5'}" @click="toggleLocale">语言切换: {{ language }}</div>
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
    <div class="sign" >
      {{ user.personalSign }}
    </div>
    <n-divider title-placement="center">工具包</n-divider>
    <n-space>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/battle')">xbox对战竞技</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/card')">xbox图标测试</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/wings')">xbox火焰翅膀模拟</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/open')">xbox开箱</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/transform')">视频转化</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/google')">google无感知登录</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/barrage')">弹幕测试</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/loading')">loading</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/show/tabbar')">Tabbar 设计参考</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/show/list')">列表滚动测试</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/show/money')">利息计算</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/show/spider')">蜘蛛网测试</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/show/apple')">苹果官网流动</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/show/earth')">地球滚动</n-button>
      <n-button :color="getRandomColor()" ghost @click="$router.push('/show/fontFamily')">字体交互</n-button>
    </n-space>



  </div>
</template>
<script setup>
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/hooks/useTheme";
import { getRandomType, getRandomColor } from "@/utils/random";
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
  }
}
</style>
