<template>
  <div class="spinner-box">
    <div class="circle-border">
      <div class="circle-core"></div>
    </div>
  </div>
  <div class="scene">
    <div class="sphere">
      <div class="face front"></div>
      <div class="face back"></div>
      <div class="face left"></div>
      <div class="face right"></div>
      <div class="face top"></div>
      <div class="face bottom"></div>
    </div>
  </div>

</template>
<style lang="scss" scoped >
      .scene {
      perspective: 800px; /* 调整perspective以控制3D效果 */
      width: 200px;
      height: 200px;
      margin: 100px auto;
      .sphere {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, black, transparent 60%);
      position: relative;
      transform-style: preserve-3d;
      animation: rotate 8s linear infinite;
      
    }
    }



    .face {
      width: 100%;
      height: 100%;
      background-color: black;
      position: absolute;
      border-radius: 50%;
      opacity: 0.7;
    }

    .face.front { transform: translateZ(50px); }
    .face.back { transform: translateZ(-50px); }
    .face.left { transform: rotateY(90deg) translateZ(50px); }
    .face.right { transform: rotateY(-90deg) translateZ(50px); }
    .face.top { transform: rotateX(90deg) translateZ(50px); }
    .face.bottom { transform: rotateX(-90deg) translateZ(50px); }

    @keyframes rotate {
      0% {
        transform: rotateX(0) rotateY(0);
      }
      100% {
        transform: rotateX(360deg) rotateY(360deg);
      }
    }

.spinner-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}



/* ALTERNATING ORBITS */

.circle-border {
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgb(63, 249, 220);
  background: linear-gradient(0deg, rgba(63, 249, 220, 0.1) 33%, rgba(63, 249, 220, 1) 100%);
  animation: spin .8s linear 0s infinite;

  .circle-core {
    width: 100%;
    height: 100%;
    background-color: #000000;
    border-radius: 50%;
  }
}

@keyframes spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(359deg);
  }
}
</style>