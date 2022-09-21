<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2022-09-21 10:55:11
-->
<template>
  <div class="my-share" >
    <AboutMe />
    <AboutProject />
    <AboutLife />
    <n-back-top :right="300" />
  </div>
</template>
<script setup >
import AboutMe from "@/components/aboutMe.vue";
import AboutProject from "@/components/aboutProjects.vue";
import AboutLife from "@/components/aboutLife.vue";
 
</script>
<style lang="scss" scoped>
.my-share {
  padding: 1rem;
  background: var(--webkubor-card-level-1);
  color: var(--webkubor-text-primary);
}
.carousel-img {
  width: 100%;
  object-fit: cover;
}
</style>
