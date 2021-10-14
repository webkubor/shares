<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-10-14 17:43:38
-->
<template>
  <n-carousel autoplay>
    <img
      class="carousel-img"
      src="https://s.anw.red/fav/1623979004.jpg!/fw/600/quality/77/ignore-error/true"
    />
    <img
      class="carousel-img"
      src="https://s.anw.red/news/1623372884.jpg!/both/800x450/quality/78/progressive/true/ignore-error/true"
    />
    <img
      class="carousel-img"
      src="https://s.anw.red/news/1623177220.jpg!/both/800x450/quality/78/progressive/true/ignore-error/true"
    />
    <img
      class="carousel-img"
      src="https://s.anw.red/news/1623152423.jpg!/both/800x450/quality/78/progressive/true/ignore-error/true"
    />
  </n-carousel>
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
.my-share {
  padding: 1rem;
}
.dark-theme {
    background: hsl(0deg 0% 0%);
    color: hsl(0deg 0% 100%);
}
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
