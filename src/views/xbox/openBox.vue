<template>
  <div class="open-box-page">
    <div class="product-box" :class="{ 'rotate': showAnimate }">
    </div>
    <img class="start-button" src="@/assets/xbox/box/button.png" alt="Product Image" @click="onOpen">
  </div>
</template>

<script setup>
import { useMusic } from "@/hooks/useMusic";
import processClick from '@/assets/click/process.mp3';
import { ref } from "vue";

const { onClickBox, playAudio } = useMusic();
const showAnimate = ref(false);
const animationDuration = 6000; // 6 seconds in milliseconds

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startRotateAnimation() {
  showAnimate.value = true;
  const clickAudio = new Audio(processClick);
  playAudio(clickAudio);
  await sleep(animationDuration);
  showAnimate.value = false;
}

function onOpen() {
  onClickBox();
  if (!showAnimate.value) {
    startRotateAnimation();
  }
}
</script>

<style lang="scss" scoped>
.open-box-page {
  background: url(@/assets/xbox/box/bg4.png) no-repeat center center;
  background-size: contain;
  color: #ffffff;
  font-weight: 600;
  height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-flow: column;
  align-items: center;
  background-color: #040607;
}

.product-box {
  cursor: pointer;
  display: flex;
  flex-flow: column wrap;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  transition: transform cubic-bezier(0.4, 0, 0.2, 1) 6s;
}

.rotate {
  animation: rotate linear infinite;
  animation-duration: 6s;
}

.start-button {
  position: relative;
  width: 150px;
  border-radius: 50%;
  top: 200px;
  cursor: pointer;
  z-index: 3;

  &:hover {
    border: 3px solid #f0000e;
    filter: brightness(120%) drop-shadow(0 0 2em #f0000e);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg * 20);
  }
}
</style>
