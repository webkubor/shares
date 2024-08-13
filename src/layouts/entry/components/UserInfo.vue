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
      <n-watermark v-if="show" content="大家艰苦一下，一切都会有的" cross fullscreen :font-size="16" :line-height="16" :width="384"
        :height="384" :x-offset="12" :y-offset="60" :rotate="-15" />
      <n-switch v-model:value="show">
        <template #checked>
      自然赠予你，树冠 微风 肩头的暴雨
    </template>
    <template #unchecked>
      片刻后生成，平衡 忠诚 不息的身体
    </template>
      </n-switch>
      <n-tag v-for="(item, index) in user.tags" :key="item + index" :type="getRandomType()" round>
        {{ item }}
      </n-tag>

    </n-space>
    <n-divider title-placement="center">工具包</n-divider>
    <n-space vertical>
      <n-card title="图标库-@phosphor-icons/vue">
        <PhAirplay :size="32" />
        <PhAppWindow :size="32" />
      </n-card>
      <n-card title="图标库-@icon-park/vue-next">
        https://iconpark.oceanengine.com/official
        <n-space>
          <hourglass-full theme="filled" size="34" fill="#e75716" :strokeWidth="3" strokeLinecap="butt" />
          <friends-circle theme="filled" size="34" fill="#000000" :strokeWidth="3" strokeLinecap="butt" />
        </n-space>
        <!-- <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M292.021 106.277H84.88v150.736H292.02V106.277Z" fill="#EFF2F4"/><path d="M308.576 80.227H101.435v150.736h207.141V80.227Z" fill="#D6DAE1"/><path d="M146.476 90.391c5.317 0 9.628-4.31 9.628-9.628 0-5.318-4.311-9.629-9.628-9.629a9.628 9.628 0 0 0-9.628 9.629 9.628 9.628 0 0 0 9.628 9.628Z" fill="#005DFF"/><path d="M102.371 114.969h204.948M157.574 97.184h66.328" stroke="#fff" stroke-width="2.568" stroke-miterlimit="10"/><path d="m156.719 188.655-26.077 7.295-3.293-11.773 17.404-38.292 12.476-3.49 8.859 31.664 6.467-1.809 3.106 11.105-6.466 1.809 2.694 9.63-12.476 3.49-2.694-9.629Zm-3.107-11.106-4.533-16.201-9.243 20.056 13.776-3.855ZM187.857 177.331c-.789-10.138.478-17.375 3.801-21.708 3.348-4.336 8.757-6.795 16.227-7.376 3.59-.279 6.572-.06 8.946.658 2.372.694 4.342 1.7 5.909 3.018 1.564 1.293 2.821 2.696 3.768 4.209.97 1.486 1.79 3.252 2.462 5.298 1.304 3.901 2.124 8.01 2.46 12.327.753 9.678-.333 16.888-3.258 21.63-2.925 4.743-8.39 7.425-16.394 8.048-4.488.349-8.169-.084-11.046-1.3-2.876-1.216-5.308-3.138-7.293-5.765-1.439-1.865-2.654-4.466-3.646-7.806-.97-3.365-1.615-7.109-1.936-11.233Zm14.702-1.107c.528 6.791 1.484 11.39 2.867 13.796 1.405 2.38 3.248 3.481 5.528 3.303 1.504-.117 2.761-.739 3.771-1.867 1.033-1.154 1.715-2.891 2.047-5.211.356-2.321.347-5.896-.029-10.722-.551-7.083-1.527-11.79-2.929-14.121-1.379-2.357-3.269-3.442-5.671-3.256-2.449.191-4.123 1.578-5.02 4.161-.899 2.559-1.087 7.198-.564 13.917ZM268.565 183.058l-26.865-3.389 1.531-12.13 30.893-28.544 12.853 1.621-4.115 32.622 6.662.84-1.443 11.441-6.662-.84-1.252 9.921-12.853-1.622 1.251-9.92Zm1.444-11.442 2.105-16.691-16.298 14.901 14.193 1.79Z" fill="#fff"/><path d="M293.92 270.894c21.358 0 38.673-17.315 38.673-38.674 0-21.358-17.315-38.673-38.673-38.673-21.359 0-38.674 17.315-38.674 38.673 0 21.359 17.315 38.674 38.674 38.674Z" fill="#FF3640"/><path d="M69.343 32.3s-1.07 75.448-1.337 92.592c-.294 21.53 10.698 25.755 19.203 20.219" stroke="#231815" stroke-width="2.354" stroke-miterlimit="10"/><path d="M87.287 110.77s-1.31 39.556-.134 45.895c1.82 9.949 16.369 8.023 16.369-1.364" stroke="#231815" stroke-width="2.354" stroke-miterlimit="10"/><path d="M104.11 116.013s-.856 34.982-.589 41.749c.455 11.554 20.113 12.918 19.043-6.259" stroke="#231815" stroke-width="2.354" stroke-miterlimit="10"/><path d="M151.61 80.602c-10.217-2.46-11.554 20.487-11.634 31.639-.08 11.153 2.915 28.404.321 40.332s-18.107 10.698-18.24-1.979c0-5.349.401-36.935.401-36.935M177.633 79.933c-4.252-22.84-33.565-21.048-33.565-21.048V30" stroke="#231815" stroke-width="2.354" stroke-miterlimit="10"/><path d="M270.599 240.297s20.299-27.12 49.13-1.311" stroke="#fff" stroke-width="2.407" stroke-miterlimit="10"/></svg> -->
      </n-card>
      <n-card title="人机验证">
        <n-space>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/vertify/google')">google无感知登录</n-button>
          <n-button :color="getRandomColor()" ghost
            @click="$router.push('/vertify/cloudflare')">Cloudflare无感知登录</n-button>
        </n-space>
      </n-card>
      <n-card title="特殊功能试验区">
        <n-space>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/chat/room')">聊天室</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/chart/line')">折线图测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/chart/pie')">饼图</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/rtc/webWork')">web worker</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/barrage')">弹幕测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/loading')">loading</n-button>

        </n-space>

      </n-card>
      <n-card title="UI视觉">
        <n-space>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/font')">中文字体设计</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/login')">Login登录页</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/business')">UI界面</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/buttons')">按钮组</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/webgl/index')">webGL</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/tabbar')">Tabbar 设计参考</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/list')">列表滚动测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/money')">利息计算</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/spider')">蜘蛛网测试</n-button>
          <n-button :color="getRandomColor()" ghost @click="$router.push('/show/apple')">苹果官网流动</n-button>
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
import { PhAirplay, PhAppWindow } from "@phosphor-icons/vue";
import { HourglassFull, FriendsCircle } from '@icon-park/vue-next';
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
  const picModules = import.meta.glob("/src/assets/*", { eager: true });
  const path = `/src/assets/${name}`;
  return picModules[path].default;
};


</script>

<style lang="scss" scoped>
.about-me {
  padding: 1rem 0 1rem;
  font-size: 12px;



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
