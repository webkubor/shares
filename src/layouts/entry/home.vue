
<template>
  <n-card>
    <UserInfo />
    <ProjectList />
    <LifeShare />
  </n-card>
</template>
<script setup >
import UserInfo from "./components/UserInfo.vue";
import ProjectList from "./components/ProjectList.vue";
import LifeShare from "./components/LifeShare.vue";
 
</script>
<style lang="scss" scoped>

.carousel-img {
  width: 100%;
  object-fit: cover;
}
</style>
