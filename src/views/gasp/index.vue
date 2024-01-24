<template>
     <button ref="animatedButton" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <span ref="buttonText">Hover me</span>
  </button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TweenMax } from 'gsap';
const animatedButton = ref(null);
    const buttonText = ref(null);

    const handleMouseEnter = () => {
      TweenMax.to(buttonText.value, 0.5, { opacity: 1, y: 0, ease: 'Power4.easeInOut' });
      TweenMax.to(animatedButton.value, 0.5, { backgroundColor: '#3498db', scale: 1.1 });
    };

    const handleMouseLeave = () => {
      TweenMax.to(buttonText.value, 0.5, { opacity: 0, y: 20, ease: 'Power4.easeInOut' });
      TweenMax.to(animatedButton.value, 0.5, { backgroundColor: '#2ecc71', scale: 1 });
    };

</script>



<style lang="scss" scoped>

button {
  position: relative;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  cursor: pointer;
  overflow: hidden;
}

span {
  position: relative;
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s, transform 0.5s;
}
</style>