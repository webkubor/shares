<template>
    <div class="open-box-page">
        <div class="product-box">
            <img v-if="showStart" src="@/assets/xbox/box/end.png" alt="Product Image">
            <video ref="video" loop src="@/assets/xbox/box/move.mp4"></video>
        </div>
        <img class="start-botton" src="@/assets/xbox/box/button.png" alt="Product Image" @click="onOpen">
        <h1 class="btn-text">点击按钮开始</h1>
    </div>
</template>
<script setup>

import { useMusic } from "@/hooks/useMusic"
import processClick from '@/assets/click/process.mp3';
import { ref, onMounted } from "vue";
let video = ref(null)
let showStart = ref(true)
const { onClickBox, playAudio } = useMusic()

onMounted(() => {
    video.value.style.display = "none"

})
// function onOpen() {
//     onClickBox()
//     showStart.value = false
//     video.value.style.display = "block"
//     setTimeout(() => {
//         video.value.play()
//         let clickAudio = new Audio(processClick);
//         playAudio(clickAudio)

//         setTimeout(() => {
//             showStart.value = true
//             video.value.style.display = "none"
//         }, 6000)
//     }, 500);

// }


async function onOpen() {
    onClickBox();
    showStart.value = false;
    const videoElement = video.value;
    videoElement.style.display = "block";

    await new Promise(resolve => setTimeout(resolve, 500));

    videoElement.play();
    const clickAudio = new Audio(processClick);
    playAudio(clickAudio);

    await new Promise(resolve => setTimeout(resolve, 6000));

    showStart.value = true;
    videoElement.style.display = "none";
}

</script>
<style lang="scss" scoped>
.open-box-page {
    // 添加样式
    background: url(https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/xboxcsgo/red-bg.webp) no-repeat left top;
    background-size: 100% 100%;
    color: #ffffff;
    font-weight: 600;
    height: 100vh;
    overflow: auto;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-flow: column;
    align-items: center;

    .product-box {
        cursor: pointer;
        display: flex;
        flex-flow: column wrap;
        width: 700px;

        img {
            width: 100%;
            border-radius: 20px;
            position: relative;
            z-index: 2;
            transition: all 0.5s;
        }

        video {
            width: 100%;
            position: relative;
            z-index: 1;
            transition: all 0.5s;
        }
    }

    .start-botton {
        position: relative;
        width: 150px;
        filter: brightness(120%) drop-shadow(0 0 1em #F0000E);
        border-radius: 50%;
        top: -80px;
        cursor: pointer;
        z-index: 3;


        &:hover {
            border: 2px solid #F0000E;
        }
    }

    .btn-text {
        position: relative;
        font-size: 18px;
        color: orangered;
        top: -80px;
    }

}
</style>