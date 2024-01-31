<template>
    <div class="open-box-page">
      <div class="product-box" :class="{ 'rotate': showAnimate }">
        2
      </div>
      <img class="start-botton" src="@/assets/xbox/box/button.png" alt="Product Image" @click="onOpen">
    </div>
  </template>
  
  <script setup>
  import { useMusic } from "@/hooks/useMusic";
  import processClick from '@/assets/click/process.mp3';
  import { ref, onMounted } from "vue";
  
  const { onClickBox, playAudio } = useMusic();
  const showAnimate = ref(false);
  const animationDuration = 6 * 1000; // 6 seconds in milliseconds
  
  onMounted(() => {});
  
  async function onOpen() {
    onClickBox();
    if (showAnimate.value) return;
    showAnimate.value = true;
    console.log(showAnimate.value, 222222);
    await new Promise(resolve => setTimeout(resolve, 500));
    const clickAudio = new Audio(processClick);
    playAudio(clickAudio);
    await new Promise(resolve => setTimeout(resolve, animationDuration));
    showAnimate.value = false;
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
  
    .product-box {
      cursor: pointer;
      display: flex;
      flex-flow: column wrap;
      border: 1px solid #ffffff;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      animation: rotate linear infinite; /* 添加这行 */
      animation-duration: animationDuration; /* 添加这行 */
      transition: transform cubic-bezier(0.4, 0, 0.2, 1) 1s;
    }
  
    .rotate {
      transform: rotate(360deg);
    }
  
    .start-botton {
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
  }
  </style>
  