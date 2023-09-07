
<template>
  <div class="my-share" >
    <UserInfo />
    <ProjectList />
    <LifeShare />
  </div>
</template>
<script setup >
import UserInfo from "./components/UserInfo.vue";
import ProjectList from "./components/ProjectList.vue";
import LifeShare from "./components/LifeShare.vue";
 
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
