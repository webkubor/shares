<template>
  <div class="full-page">
    <div class="about-me">
      <n-popover trigger="hover">
        <template #trigger>
          <div class="love-headers">
            <n-avatar round :size="100"
              src="https://github.com/webkubor/picx-images-hosting/raw/master/webkubor/me.1zi6wrx8na.webp"
              @click="toggleTheme" />
          </div>
        </template>
        <span> this is {{ user.name }}</span>
      </n-popover>

      <span class="sign">
        {{ user.personalSign }}
        <span></span>
      </span>
      <n-space>
        <n-tag v-for="(item, index) in user.tags" :key="item + index" :type="getRandomType()" round>
          {{ item }}
        </n-tag>
      </n-space>
    </div>
  </div>


</template>
<script setup>
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/hooks/useTheme";
import { getRandomType } from "@/utils/random";

let { user, updateAge } = useUser();
let { switchTheme, local } = useTheme();

updateAge("logo.jpeg");

function toggleTheme() {
  switchTheme(local.osTheme === "light");
}

</script>

<style lang="scss" scoped>
.full-page {
  min-height: 50vh;
  width: 100%;
  position: relative;
}

.about-me {
  margin: 5vh auto;
  font-size: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  color: var(--webkubor-text-primary);
  padding: 20px 30px;
  @include glass-effect(#e7e5e4, 10, 0.09);


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
    display: block;
    font-weight: 500;
    font-size: 30px;
    margin: 40px;
    cursor: pointer;
    color: var(--webkubor-text-primary);

    span {
      background: var(--webkubor-text-primary);
      height: 2px;
      width: 0px;
      display: block;
      transition: all 0.5s ease-in-out;
    }

    &:hover {
      background-size: 100% 2px;
      filter: drop-shadow(0 0 10px var(--webkubor-text-primary));

      span {
        width: 100%;
      }
    }
  }
}
</style>
