<template>
  <div class="about-me column-center">
    <div class="switch-btn" v-ripple="{ duration: 500, color: ' #DCD5F5' }" @click="toggleLocale"> {{ language }}</div>
    <n-popover trigger="hover">
      <template #trigger>
        <div class="love-headers">
          <n-avatar round :size="100" :src="getImage('me.jpeg')" @click="swtichTheme" />
        </div>
      </template>
      <span> {{ t("this") }} {{ user.name }}</span>
    </n-popover>

    <div class="sign">
      {{ user.personalSign }}
    </div>
    <n-space>
      <n-tag v-for="(item, index) in user.tags" :key="item + index" :type="getRandomType()" round>
        {{ item }}
      </n-tag>

    </n-space>
    <n-divider title-placement="center">工具包</n-divider>
    <n-space vertical>
      <n-card title="人机验证">
        <n-button :color="getRandomColor()" ghost @click="$router.push('/google')">google无感知登录</n-button>
      </n-card>
      <n-card title="特殊功能试验区">
        <n-space>

          <n-button :color="getRandomColor()" ghost @click="$router.push('/chart/line')">折线图测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/chart/pie')">饼图</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/rtc/webWork')">web worker</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/barrage')">弹幕测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/loading')">loading</n-button>
          <n-watermark v-if="show" content="大家艰苦一下，一切都会有的" cross fullscreen :font-size="16" :line-height="16"
            :width="384" :height="384" :x-offset="12" :y-offset="60" :rotate="-15" />
          <n-switch v-model:value="show"></n-switch>
        </n-space>

      </n-card>
      <n-card title="UI视觉">
        <n-space>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/login')">Login登录页</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/business')">UI界面</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/buttons')">按钮组</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/webgl/index')">webGL</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/tabbar')">Tabbar 设计参考</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/list')">列表滚动测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/money')">利息计算</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/spider')">蜘蛛网测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/apple')">苹果官网流动</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/earth')">地球滚动</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/fontFamily')">字体交互</n-button>
        </n-space>
      </n-card>

      <n-card title="游戏专区">
        <n-space>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/lucky')">xbox幸运饰品</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/betting')">三色球/下注/自定义切换</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/battle')">对战竞技样式参考</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/xbox/card')">xbox图标测试</n-button>
        </n-space>
      </n-card>

    </n-space>



  </div>
</template>
<script setup>
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/hooks/useTheme";
import { getRandomType, getRandomColor } from "@/utils/random";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue"
const { t, locale } = useI18n();
let { user, updateAge } = useUser();
let { swtichTheme } = useTheme();
console.log(user, "我的");

let show = ref(false)

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
  font-size: 20px;



  .love-headers {
    display: flex;
    align-items: center;

    .n-icon {
      margin: 0 10px;

      &:active {
        animation: bounce;
        /* referring directly to the animation's @keyframe declaration */
        animation-duration: 2s;
        /* don't forget to set a duration! */
      }
    }
  }

  .n-avatar {
    cursor: pointer;
    transition: transform 0.5s ease-in-out 0s;

    &:hover {
      transform: rotate(720deg);
    }
  }

  .sign {
    font-weight: 500;
    font-size: 20px;
    margin: 10px 0 20px;
  }
}

.switch-btn {
  position: absolute;
  font-size: 14px;
  right: 50px;
  top: 50px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  background-color: #A04CF8;
  color: #ffffff;
  border-radius: 50%;
  text-align: center;
  font-family: PingFangSC-Regular, Microsoft Yahei, \\5FAE\8F6F\96C5\9ED1, sans-serif;

  &:hover {
    cursor: pointer;
    filter: drop-shadow(0 0 1em #a04cf7);
    user-select: none;
  }
}
</style>
