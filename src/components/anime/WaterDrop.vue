<template>
    <div class="water">
        <img src="@/assets/logo/tp.png" alt="" srcset="">
    </div>
  </template>
  
  <style lang="scss" scoped>
  $white-opacity: rgba(255, 255, 255, 0.8);
  $black-opacity: rgba(0, 0, 0, 0.4);
  $black-opacity-light: rgba(0, 0, 0, 0.3);
  $black-opacity-lighter: rgba(0, 0, 0, 0.05);
  
  
  .water {
    width: 200px;
    height: 200px;
    border-radius: 61% 39% 57% 43% / 46% 67% 33% 54%;
    box-shadow: inset 10px 20px 30px $black-opacity,
                10px 10px 20px $black-opacity-light,
                15px 15px 30px $black-opacity-lighter,
                inset -10px -20px 30px $white-opacity;
    position: relative;
    animation: water-a 3s linear infinite alternate;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 60%;
    }
  
    &::before, &::after {
      content: '';
      position: absolute;
      background-color: $white-opacity;
      border-radius: 46% 54% 36% 64% / 46% 43% 57% 54%;
    }
  
    &::before {
      top: 15%;
      left: 50%;
      width: 10px;
      height: 10px;
      animation: water-b 2s linear infinite alternate;
    }
  
    &::after {
      top: 25%;
      left: 30%;
      width: 6px;
      height: 6px;
    }
  }
  
  @keyframes water-a {
    25% {
      border-radius: 58% 42% 59% 41% / 52% 56% 54% 48%;
    }
    50% {
      border-radius: 46% 54% 40% 60% / 52% 33% 67% 48%;
    }
    75% {
      border-radius: 65% 35% 71% 29% / 31% 60% 40% 69%;
    }
    100% {
      border-radius: 60% 40% 43% 57% / 45% 51% 49% 55%;
    }
  }
  
  @keyframes water-b {
    25% {
      top: 17%;
      left: 50%;
    }
    50% {
      top: 20%;
      left: 50%;
    }
    100% {
      top: 22%;
      left: 50%;
    }
  }
  </style>
  