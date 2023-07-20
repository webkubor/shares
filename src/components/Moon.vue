<template>
  <div class="mercury" >
    <div class="halo"></div> 
  </div>
</template>
<script setup>

</script>
  
<style lang="scss" scoped>
@keyframes autogiration {
  from {
    background-position-x: 0px;
  }

  to {
    background-position-x: -229.1667vw;
  }
}


@keyframes blink {
  0% {
    opacity: 0; /* 透明度为0，光晕不可见 */
  }
  50% {
    opacity: 1; /* 透明度为1，光晕可见 */
  }
  100% {
    opacity: 0; /* 透明度为0，光晕不可见 */
  }
}

.halo {
  position: absolute;
  top: -2px; /* 距离球体顶部的距离，可根据需要调整 */
  left: -2px; /* 距离球体左侧的距离，可根据需要调整 */
  width: calc(100% + 2px); /* 光晕的宽度，比球体稍大一些 */
  height: calc(100% + 2px); /* 光晕的高度，比球体稍大一些 */
  border-radius: 50%; /* 圆形光晕效果 */
  box-shadow: 0 0 10px rgba(100, 149, 237, 0.6), /* 浅蓝色光晕 */
              0 0 20px rgba(100, 149, 237, 0.4),
              0 0 30px rgba(100, 149, 237, 0.2),
              0 0 40px rgba(100, 149, 237, 0.1),
              0 0 50px rgba(100, 149, 237, 0.05); /* 深蓝色光晕 */
  animation-name: blink; /* 光晕闪烁动画 */
  animation-duration: 5s; /* 动画持续时间 */
  animation-iteration-count: infinite; /* 无限次播放动画 */
}

.mercury {
  position: absolute;
  cursor: pointer;
  z-index: 3;
  right: -13.0208vw;
  top: 22.2083vw;
  // transform: translate(-50%, -50%); /* 居中定位 */
  transform: translate(-50%, -50%) perspective(400px) rotateX(20deg); /* 添加透视效果 */
  height: 37.4583vw;
  width: 37.4583vw;

  border-radius: 50%;
  background: url(@/assets/3d/earth.png);
  animation-name: autogiration;
  animation-duration: 30s;
  animation-delay: 1s;
  background-size: cover;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  box-shadow: -90px 20px 50px 0 black inset,
    0 0px 130px 40px rgba(73, 61, 59, 0.1) inset,
    0 0px 23px 4px rgba(230, 223, 221, 0.3) inset,
    -20px 0 60px 0 rgba(189, 183, 181, 0.3);
  // background-position-x: 50%;
  background-position-y: 40%;

}


</style>
  