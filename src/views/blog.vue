<template>
 <ColorCard/>
  <div  class="sky">
    <Moon/>
  </div>
</template>
<script setup>
import Moon from '@/components/Moon.vue';
import  ColorCard from '@/components/ColorCard.vue'
</script>
<style lang="scss" scoped>
.sky {
  width: 100%;
  height: 100vh;
 background-image: url('@/assets/3d/universe.png');
background-size: cover;
position: relative;

}


</style>
