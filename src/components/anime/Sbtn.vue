<template>
    <div class="button">
      <span></span>
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped lang="scss">
  $btn-color: #4d4bd0;
  $btn-margin: 50px;
  
  .button {
    text-decoration: none;
    color: $btn-color;
    position: relative;
    display: inline-block;
    padding: 20px 30px;
    margin: $btn-margin;
    text-transform: uppercase;
    letter-spacing: 40px;
    overflow: hidden;
    font-size: 22px;
  
    &::before,
    &::after,
    span::before,
    span::after {
      content: '';
      position: absolute;
      background: linear-gradient(to right, transparent, $btn-color);
    }
  
    &::before {
      width: 100%;
      height: 2px;
      top: 0;
      left: -100%;
      animation: span1 1s linear infinite;
    }
  
    &::after {
      width: 2px;
      height: 100%;
      top: -100%;
      right: 0;
      background: linear-gradient(to bottom, transparent, $btn-color);
      animation: span2 1s 0.25s linear infinite;
    }
  
    span::before {
      width: 100%;
      height: 2px;
      right: -100%;
      bottom: 0;
      background: linear-gradient(to left, transparent, $btn-color);
      animation: span3 1s 0.5s linear infinite;
    }
  
    span::after {
      width: 2px;
      height: 100%;
      left: 0;
      bottom: -100%;
      background: linear-gradient(to top, transparent, $btn-color);
      animation: span4 1s 0.75s linear infinite;
    }
  
    &:nth-child(1) {
      filter: hue-rotate(270deg);
    }
  
    &:nth-child(2) {
      filter: hue-rotate(110deg);
    }
  }
  
  @keyframes span1 {
    0% { left: -100%; }
    50%, 100% { left: 100%; }
  }
  
  @keyframes span2 {
    0% { top: -100%; }
    50%, 100% { top: 100%; }
  }
  
  @keyframes span3 {
    0% { right: -100%; }
    50%, 100% { right: 100%; }
  }
  
  @keyframes span4 {
    0% { bottom: -100%; }
    50%, 100% { bottom: 100%; }
  }
  </style>
  