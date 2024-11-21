<template>
    <div class="common-bg-move page-bg"></div>
    <div class="common-title">webkubor
        <span class="more">UI</span>
    </div>
    <MovieCom :barrage="true" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"></MovieCom>
</template>
<script setup lang="ts">
import MovieCom from './video/index.vue';
</script>
<style scoped lang="scss">
@keyframes jumbo {
  from {
      background-position: 50% 50%, 50% 50%;
  }

  to {
      background-position: 350% 50%, 350% 50%;
  }
}
.page-bg {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
}

.common-bg-move {
  --stripes: repeating-linear-gradient(100deg,
          #fff 0%,
          #fff 7%,
          transparent 10%,
          transparent 12%,
          #fff 16%);
  --stripesDark: repeating-linear-gradient(100deg,
          #000 0%,
          #000 7%,
          transparent 10%,
          transparent 12%,
          #000 16%);
  --rainbow: repeating-linear-gradient(100deg,
          #60a5fa 10%,
          #e879f9 15%,
          #60a5fa 20%,
          #5eead4 25%,
          #60a5fa 30%);
  background-image: var(--stripes), var(--rainbow);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;

  filter: blur(10px) invert(100%);

  mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);

  pointer-events: none;
}

.common-bg-move::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--stripes), var(--rainbow);
  background-size: 200%, 100%;
  animation: jumbo 60s linear infinite;
  background-attachment: fixed;
  mix-blend-mode: difference;
}


</style>
