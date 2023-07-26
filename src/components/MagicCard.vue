<template>
  <div class="card" ref="cardRef" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cardRef = ref(null);

const handleMouseOver = () => {
  cardRef.value.classList.add('hover');
};

const handleMouseOut = () => {
  cardRef.value.classList.remove('hover');
};
</script>

<style lang="scss" scoped>
.card {
  --rotate: 132deg;
  --card-height: 65vh;
  --card-width: calc(var(--card-height) / 1.5);
  width: var(--card-width);
  height: var(--card-height);
  padding: 3px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  background: #191c29;
  text-align: center;
  display: flex;
  font-size: 1.5em;
  color: rgba(88, 199, 250, 0%);
  cursor: pointer;
  overflow:hidden;
  position: relative;
  font-family: cursive;

  &::before {
    content: "";
    width: 104%;
    height: 102%;
    border-radius: 8px;
    background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -2%;
    animation: spin 2.5s linear infinite;
  }

  &::after {
    position: absolute;
    top: calc(var(--card-height) / 6);
    content: "";
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    transform: scale(0.8);
    filter: blur(calc(var(--card-height) / 6));
    background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
    opacity: 1;
  transition: opacity .5s;
    animation: spin 1.5s linear infinite;
  }

  &.hover {
    color: rgba(88, 199, 250, 1);
    transition: color 1s;

    &::before,
    &::after {
      animation: none;
      opacity: 0;
    }
  }
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}
</style>
