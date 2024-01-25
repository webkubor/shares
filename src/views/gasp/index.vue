<template>
  <canvas ref="canvas" id="hero-lightpass"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const canvas = ref(null);
const context = ref(null);
const baseUrl = "https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass";
const frameCount = 147;
let images = []; // 在模块级别声明 images 数组

onMounted(() => {
  initCanvas();
  loadImages();
  gsap.registerPlugin(ScrollTrigger); // 注册 ScrollTrigger 插件
  setupAnimation();
});

onBeforeUnmount(() => {
  // 在组件销毁前清理资源
  images.forEach(img => {
    img.onload = null;
  });
});

function initCanvas() {
  canvas.value = document.getElementById("hero-lightpass");
  context.value = canvas.value.getContext("2d");
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

function loadImages() {
  images = []; // 重置 images 数组
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `${baseUrl}/${(i + 1).toString().padStart(4, '0')}.jpg`;
    images.push(img);
  }
}

function setupAnimation() {
  const airpods = {
    frame: 0
  };

  gsap.to(airpods, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.5,
      onUpdate: render
    }
  });
}

function render() {
  context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  context.value.drawImage(images[airpods.frame], 0, 0);
}
</script>

<style lang="scss" scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

canvas {
  display: block;
}
</style>
