<template>
<div class="apple-container">
  <div class="text">
    <span>
      灵动的 iPhone
      新玩法，迎面而来。重大的安全新功能，为拯救生命而设计。创新的 4800
      万像素主摄，让细节纤毫毕现。更有 iPhone
      芯片中的速度之王，为一切提供强大原动力。
    </span>
  </div>
</div>
</template>
<script lang="ts" setup>
</script>


<style lang="scss" scoped> 


.apple-container {
  width: 100vw;
  height: 400vh;
  margin-bottom: 100vh;
  background: linear-gradient(
    15deg,
    #000 0 25%,
    #ffb6ff,
    #b344ff,
    #ae38ff,
    #ffb6ff,
    #ffe3ff,
    #ffb6ff,
    #b344ff,
    #000 75% 100%
  );
}
.text {
  width: 100vw;
  height: 100vh;
  font-size: 56px;
  font-weight: 900;
  position: fixed;
  display: flex;
  align-items: center;
  color: #fff;
  background: #000;
  mix-blend-mode: darken;
}
.text > span {
  padding: 0 12.5vw;
}
</style>