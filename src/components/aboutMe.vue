<!--
 * @Date: 2021-07-31 19:27:24
 * @LastEditTime: 2022-03-27 14:01:43
-->
<template>
  <div class="about-me column-center">
    <div class="show-item">
      <n-popover trigger="hover">
        <template #trigger>
          <div>
            <n-avatar
              round
              :size="100"
              :src="user.avatar"
              @click="swtichTheme"
            />
            <!-- <n-avatar
              round
              :size="100"
              :src="getImage(logo.jpeg)"
              @click="swtichTheme"
            /> -->
          </div>
        </template>
        <span>来换个心情呗 {{ t("about") }}</span>
      </n-popover>
    </div>
    <h1>{{ user.name }} and {{ user.name2 }}</h1>
    <!-- <div @click="toggleLocale">语言切换: {{ language }}</div> -->
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
<script  setup>
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/hooks/useTheme";
import { getRandomType } from "@/utils/random";
    const { t, locale } = useI18n();
    let { user, updateAge } = useUser();
    let { swtichTheme } = useTheme();
    console.log(user, "我的");
    updateAge();
    const language = computed(() =>
      locale.value === "zh-CN" ? "中文" : "English"
    );

    const toggleLocale = () => {
      locale.value = locale.value === "zh-CN" ? "en" : "zh-CN";
    };
    /**
     * @description: 将图片导为模块
     * @param {*} name
     * @return {*}
     */
    const getImage = (name) => {
      const picModules = import.meta.globEager("/src/assets/*");
 
      const path = `/src/assets/${name}`;
      return picModules[path].default;
    };

</script>

<style lang="scss" scoped>
@keyframes rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.about-me {
  padding: 1rem 0 1rem;
  .show-item {
    padding: 1rem 0 0;
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
