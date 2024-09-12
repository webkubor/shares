<template>

  <div class="about-me column-center">
    <div class="switch-btn" v-ripple="{ duration: 500, color: ' #DCD5F5' }" @click="toggleLocale"> {{ language }}</div>
    <n-popover trigger="hover">
      <template #trigger>
        <div class="love-headers">
          <n-avatar round :size="100"
            src="https://github.com/webkubor/picx-images-hosting/raw/master/webkubor/me.1zi6wrx8na.webp"
            @click="swtichTheme" />
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
      <div id="demoCanvas"></div>
    </n-space>
  </div>

</template>
<script setup>
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/hooks/useTheme";
import { getRandomType } from "@/utils/random";
import { useI18n } from "vue-i18n";
import { computed, ref, onMounted} from "vue"
import SVGA from 'svgaplayerweb';

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
