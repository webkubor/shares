<template>


<div class="card" @onmousemove="handleMouseMove(event, this)" @onmouseleave="clearRotation(this)">
  <!-- 卡片内容 -->
  <img src="https://github.com/webkubor/picx-images-hosting/raw/master/20240823/webkubor_In_the_style_of_an_anime_girl_long_black_hair_with_ban_729005cc-0e53-4754-9957-63a4d44838f4.5j44m9nnhe.webp">
   <div class="highlight"></div>
</div>


</template>
<script setup lang="ts">

function handleMouseMove(event, card) {
  const gradientX = event.clientX / card.offsetWidth * 100; // X 轴位置
  const gradientY = event.clientY / card.offsetHeight * 100; // Y 轴位置

  const highlight = card.querySelector('.highlight');
  highlight.style.backgroundImage = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(245,148,3, 0.2) 5%, transparent 60%)`;
  highlight.style.display = 'block';

   // 计算鼠标相对于卡片中心的位置
  const offsetX = event.clientX - card.getBoundingClientRect().left - card.offsetWidth / 2;
  const offsetY = event.clientY - card.getBoundingClientRect().top - card.offsetHeight / 2;

  // 计算倾斜角度
  const tiltX = offsetY / card.offsetHeight * 20; // 10 是一个调整因子，你可以根据需要调整
  const tiltY = offsetX / card.offsetWidth * -20; // 同样，根据需要调整
   // 应用倾斜变换
  card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
}


function clearRotation(card) {
  // 在鼠标移出后，卡片恢复到初始状态
  card.style.transform = 'none';
}



</script>
<style lang="scss" scoped>

    

    
.card {
      height: 800px;
      margin: 20px;
      position: relative;
      overflow: hidden;
      
      img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
     
    }

       &:hover {
      cursor: pointer;
        border: 1.5px solid orangered;
        transform: scale(1.05);
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


    body {
      background: #333333;
      display: flex;
    }
</style>