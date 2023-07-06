<template>
      <div class="color-card">
    <h2>流光画布效果</h2>
    <button class="common-btn square-btn"><span>Click!</span><span>测试</span></button>
  </div>
</template>
<style lang="scss" scoped>
.color-card {
  overflow: auto;
  line-height: 300px;
  background: linear-gradient(315deg, RGBA(169, 96, 238, 1.00) 3%, RGBA(249, 51, 61, 1.00) 38%, rgba(48, 238, 226, 1) 68%, RGBA(255, 203, 86, 1.00) 98%);
  background-size: 400% 400%;
  background-attachment: fixed;
  animation: gradient 15s ease infinite;
  text-align: center;
  height: 100vh;
  border-radius: 20px;
  width: calc(100% - 40px);
  margin: 20px  auto;

}


@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }

  50% {
    background-position: 100% 100%;
  }

  100% {
    background-position: 0% 0%;
  }
}
</style>