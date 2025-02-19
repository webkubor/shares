<template>
    <div class="page">
        <div class="card" ref="cardRef">
            Magic Card
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const cardRef = ref(null);


</script>

<style lang="scss" scoped>
$page-bg: #212534;
$card-bg: #191c29;
$card-height: 65vh;
$card-width: calc(#{$card-height} / 1.5);

.page {
    min-height: 100vh;
    width: 100%;
    background: $page-bg;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 2rem;
    padding-bottom: 2rem;
    box-sizing: border-box;
}

.card {
    $rotate: 132deg;
    background: $card-bg;
    width: $card-width;
    height: $card-height;
    padding: 3px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.5em;
    color: rgba(88, 199, 250, 0%);
    cursor: pointer;
    font-family: cursive;
    position: relative;
    border: 1px solid #ffffff;

  

    &::before,
    &::after {
        content: "";
        position: absolute;
        background-image: linear-gradient($rotate,
                #5ddcff,
                #3c67e3 43%,
                #4e00c2);
        z-index: -1;
        pointer-events: none;
        animation: spin 2.5s linear infinite;
    }

    &::before {
        width: 104%;
        height: 102%;
        border-radius: 8px;
        top: -1%;
        left: -2%;
        border: 1px solid #ffffff;
    }

    &::after {
        top: calc(#{$card-height} / 6);
        left: 0;
        right: 0;
        height: 90%;
        width: 90%;
        margin: 0 auto;
        transform: scale(0.8);
        filter: blur(calc(#{$card-height} / 6));
        opacity: 1;
        transition: opacity 0.5s;
    }

    &:hover {
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
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 