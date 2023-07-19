<template>
  <!-- <Svg/> -->
  <!-- <scrollRow />
  <ColorCard /> -->
  <div class="sky">
    <Moon />
  </div>
</template>
<script setup>
import Moon from '@/components/Moon.vue';
import ColorCard from '@/components/ColorCard.vue'
import scrollRow from '@/components/scrollRow.vue';
import Svg from '@/components/Svg.vue';
</script>
<style lang="scss" scoped>
.sky {
  width: 100%;
  height: 1200px;
  background-image: url('@/assets/3d/universe.png');
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
