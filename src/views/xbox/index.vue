<template>
    <div class="list-box">
        <div v-for="(img, index) in showImglist" :key="index">
            <div class="card" :style="{ backgroundImage: `url(${img})` }" @mousemove="handleMouseMove($event, index)"
                @mouseleave="clearRotation(index)">
                <img src='https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/test.png'>
                <div class="highlight"></div>
            </div>
        </div>
    </div>
</template>


<script setup>

let showImglist = [
    'https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/5.png',
    'https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/4.png',
    'https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/3.png',
    'https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/2.png',
    'https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/1.png',
    'https://img.tfskins.com/image/cdd673ded2eee54fe9c17f01d322c9320231102210449.png'
]



const handleMouseMove = (event, index) => {
    const card = event.currentTarget;
    const gradientX = (event.clientX - card.getBoundingClientRect().left) / card.offsetWidth * 100;
    const gradientY = (event.clientY - card.getBoundingClientRect().top) / card.offsetHeight * 100;

    const highlight = card.querySelector('.highlight');
    highlight.style.backgroundImage = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(245,148,3, 0.2) 5%, transparent 60%)`;
    highlight.style.display = 'block';

    const offsetX = event.clientX - card.getBoundingClientRect().left - card.offsetWidth / 2;
    const offsetY = event.clientY - card.getBoundingClientRect().top - card.offsetHeight / 2;

    const tiltX = offsetY / card.offsetHeight * 20;
    const tiltY = offsetX / card.offsetWidth * -20;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
};


const clearRotation = (index) => {
    const card = document.querySelectorAll('.card')[index];
    const highlight = card.querySelector('.highlight');
    highlight.style.display = 'none';
    card.style.transform = '';
};
</script>
<style lang="scss" scoped> 
 .highlight {
     position: absolute;
     top: 0;
     left: 0;
     cursor: pointer;
     width: 100%;
     height: 100%;
     display: none;
 }

.list-box {
     display: flex;
     background: #000000;
     min-height: 100vh;

     .card {
         height: 300px;
         width: 200px;
         margin: 20px;
         position: relative;
         background-size: cover;
         filter: blur(0px);
         transition: filter 0.3s ease;
         /* 添加过渡效果 */

         img {
             position: relative;
             top: 100px;
             width: 160%;
             left: 50%;
             transform: translateX(-54%);
             transition: all 0.5s ease-in-out;
         }

         &::before {
             content: '';
             position: absolute;
             top: 0;
             left: 0;
             width: 100%;
             height: 100%;
             transition: filter 0.3s ease;
             background-color: rgba($color: #000000, $alpha: 0.3);
             z-index: 1;
         }

         &:hover {
             cursor: pointer;
             border: 2.5px solid orangered;
             filter: brightness(120%) drop-shadow(0 0 2em orangered);
             &::before {
                 background-color: transparent;
             }
             img {
                 transform: translateX(-50%) scale(1.5);
                 filter: drop-shadow(0 0 2em orangered);

             }

         }
     }

 }




</style>