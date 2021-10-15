<!--
 * @Date: 2021-07-31 19:27:24
 * @LastEditTime: 2021-10-15 11:41:09
-->
<template>
  <div class="about-me column-center">
    <div class="show-item">
      <n-popover trigger="hover">
        <template #trigger>
          <n-avatar round :size="100" :src="user.avatar" @click="swtichTheme" />
        </template>
        <span>来换个心情呗</span>
      </n-popover>
    </div>
    <h1>{{ user.name }}</h1>
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
<script>
import { useUser } from "hooks/useUser";
import { useTheme } from "hooks/useTheme";
import {getRandomType} from "utils/random"
export default {
  setup() {
    let { user, updateAge } = useUser();
    let { swtichTheme } = useTheme();
    console.log(user, "我的");
    updateAge();

    return {
      getRandomType,
      swtichTheme,
      user,
    };
  },
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
