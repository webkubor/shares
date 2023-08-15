<template>
    <div class="spinner-box">
      <div class="circle-border">
        <div class="circle-core"></div>
      </div>
    </div>
  </template>
  <style lang="scss" scoped >
  .spinner-box {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
  
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
  
  
  @keyframes rotate {
    0% {
      transform: rotateX(0) rotateY(0);
    }
  
    100% {
      transform: rotateX(360deg) rotateY(360deg);
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