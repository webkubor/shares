<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2022-03-27 14:02:39
-->
<template>
  <div class="my-share" :class="{'dark-theme':theme}">
    <AboutMe />
    <AboutLife />
    <AboutProject />
    <n-back-top :right="300" />
  </div>
</template>
<script>
import AboutMe from "@/components/aboutMe.vue";
import AboutProject from "@/components/aboutProjects.vue";
import AboutLife from "@/components/aboutLife.vue";
import { getHotCommit } from "@/api/music";
import {useTheme} from "@/hooks/useTheme"

export default {
  components: {
    AboutMe,
    AboutProject,
    AboutLife,
  },

  setup() {
    let {theme} = useTheme()
    function fetchHotCommit() {
      getHotCommit({ name: "爱情" })
        .then((res) => {
          console.log(res, "fetchHotCommit");
        })
        .catch((err) => console.error(err));
    }
    return {
      theme
    }
  },
};
</script>
<style lang="scss" scoped>
.my-share {
  padding: 1rem;
}
.dark-theme {
    background: hsl(0deg 0% 0%);
    color: hsl(0deg 0% 100%);
}
.carousel-img {
  width: 100%;
  object-fit: cover;
}
</style>
