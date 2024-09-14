<template>
    <div class="water-page iphone15-border">
      <div class="loading">
        <span v-for="i in 7" :style="`--i: ${i}`"></span>
      </div>
  
      <svg>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          <feColorMatrix values="
              1 0 0 0 0 
              0 1 0 0 0
              0 0 1 0 0 
              0 0 0 20 -10" />
        </filter>
      </svg>
    </div>
  </template>
  
  <style lang="scss" scoped>
  .water-page {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  svg {
    width: 0;
    height: 0;
  }
  
  .loading {
    width: 200px;
    height: 200px;
    position: relative;
    filter: url(#gooey);
    will-change: transform;
  }
  
  .loading span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    animation: loading 4s ease-in-out infinite;
    animation-delay: calc(0.2s * var(--i));
    will-change: transform;
  }
  
  .loading span::before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(50% - 20px);
    width: 40px;
    height: 40px;
    background: linear-gradient(#fce4ec, #03a9f4);
    border-radius: 50%;
    box-shadow: 0 0 30px #03a9f4;
  }
  
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    50%,
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  