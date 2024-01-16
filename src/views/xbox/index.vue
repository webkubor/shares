<template>
    <div class="list-box">
        <div v-for="(img, index) in showImglist" :key="index">
            <div class="card"  :style="{background:`url(${img})`}"  @mousemove="handleMouseMove($event, index)" @mouseleave="clearRotation(index)">
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
<style lang="scss" scoped> .list-box {
     display: flex;
     background: #000000;
     min-height: 100vh;

 }

 .card {
     height: 300px;
     width: 200px;
     margin: 10px;
     position: relative;
     overflow: hidden;

     img {
     position: relative;
        top: 100px;
        left:-110px;
         width: 200%;
         object-fit: scale-down;
         display: block;

     }

     &:hover {
         cursor: pointer;
         border: 2.5px solid orangered;
         img {
            transform: scale(1.5);
         }
     }
 }

 .highlight {
     position: absolute;
     top: 0;
     left: 0;
     cursor: pointer;
     width: 100%;
     height: 100%;
     display: none;
 }
</style>