<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-10-15 10:44:06
-->
<template>
  <div class="my-share" :class="{'dark-theme':theme}">
    <AboutMe />
    <AboutProject />
    <AboutLife />
    <n-back-top :right="300" />
  </div>
</template>
<script>
import AboutMe from "comps/aboutMe.vue";
import AboutProject from "comps/aboutProjects.vue";
import AboutLife from "comps/aboutLife.vue";
import { getHotCommit } from "api/music";
import {useTheme} from "hooks/useTheme"

export default {
  components: {
    AboutMe,
    AboutProject,
    AboutLife,
  },

  setup() {
    let {theme} = useTheme()
    fetchHotCommit();
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
.dark-theme {
    background: hsl(0deg 0% 0%);
    color: hsl(0deg 0% 100%);
}
.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>
