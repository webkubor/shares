<template>
  <Svg/>
  <ColorCard /> 
  <div class="sky">
    <Moon />
  </div>
</template>
<script setup>
import Svg from '@/components/Svg.vue';
</script>
<style lang="scss" scoped>
.sky {
  width: 100%;
  height: 1200px;
  background-image: url('@/assets/3d/bg2.png');
  background-size: cover;
  position: relative;

}

.code-box {
  margin: 20px;
  border: 5px solid orangered;
  padding: 20px;
  border-radius: 10px;
}
</style>
