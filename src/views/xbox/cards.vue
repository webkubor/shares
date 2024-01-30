<template>
    <div class="icon-box">
        <div class="item">
            <h2>vip</h2>
            <img src="@/assets/xbox/vip.png" alt="">
            <img src="@/assets/xbox/vip2.png" alt="">
        </div>
        <div class="item">
            <h2>钱包</h2>
            <img src="@/assets/xbox/wallet.png" alt="">
            <img src="@/assets/xbox/wallet2.png" alt="">
        </div>

        <div class="item">

            <h2>欧皇</h2>
            <img src="@/assets/xbox/king.png" alt="">
            <img src="@/assets/xbox/king2.png" alt="">
        </div>
        <div class="item">

<h2>决战沙场</h2>
<img src="@/assets/xbox/battle.png" alt="">
<img src="@/assets/xbox/battle2.png" alt="">
</div>

        <div class="item">
            <h2>roll房</h2>
            <img src="@/assets/xbox/lucky.png" alt="">
            <img src="@/assets/xbox/lucky2.png" alt="">
            <img src="@/assets/xbox/house.png" alt="">
            <img src="@/assets/xbox/house2.png" alt="">
        </div>
        <div class="item">
            <h2>幸运饰品</h2>
            <img src="@/assets/xbox/roll.png" alt="">
            <img src="@/assets/xbox/roll2.png" alt="">
        </div>

        <div class="item">
            <h2>名人堂</h2>
            <img src="@/assets/xbox/rank.png" alt="">
            <img src="@/assets/xbox/rank2.png" alt="">
        </div>

        <div class="item">
            <h2>炼金术</h2>
            <img src="@/assets/xbox/gold.png" alt="">
            <img src="@/assets/xbox/gold2.png" alt="">
        </div>


    </div>
    <div class="list-box">
        <div v-for="(img, index) in showImglist" :key="index">
            <div class="card" :style="{ backgroundImage: `url(${img})` }" @mousemove="handleMouseMove($event, index)"
                @mouseleave="clearRotation(index)">
                <div class="tags">
                    限时爆款
                </div>
                <div class="price-box">
                    <img src="@/assets/xbox/1.png" alt="">
                    <span>1200</span>

                </div>
                <img class="arms"
                    src='https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/fly-open-removebg-preview.png'>
                <div class="highlight"></div>
                <div class="card-bottom">
                    无双拳套
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>

let showImglist = [
    'https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/5.png',
    'https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/4.png',
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
<style lang="scss" scoped> .icon-box {
     padding: 20px;
     width: 100%;
     height: fit-content;
     color: #ffffff;
     background: url(https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/xboxcsgo/red-bg.webp) no-repeat left top;
     background-size: 100% 200%;
     display: flex;
     flex-wrap: wrap;

     .item {
         margin: 20px;

         img {
             width: 250px;

             &:hover {
                 cursor: pointer;
                 border: 2.5px solid #F0000E;
                 filter: brightness(120%) drop-shadow(0 0 1em #F0000E);
             }
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

 .list-box {
     display: flex;
     background: #120505;
     min-height: 100vh;

     .card {
         height: 300px;
         width: 200px;
         margin: 20px;
         position: relative;
         background-size: cover;

         /* 添加过渡效果 */
         .tags {
             position: absolute;
             top: 0px;
             left: 0px;
             font-size: 14px;
             color: #fff;
             font-size: 10px;
             font-weight: bold;
             padding: 5px;
             background-image: linear-gradient(135deg, #F6D242 10%, #FF52E5 100%);
         }

         .price-box {
             position: absolute;
             right: 5px;
             top: 5px;
             width: 40%;
             border-radius: 5px;
             background: linear-gradient(rgb(15, 13, 28) 0%, rgb(34, 45, 57) 100%);
             color: #F8E079;
             padding: 0 10px;
             display: flex;
             align-items: center;
             height: 30px;

             img {
                 height: 20px;
                 width: auto;
                 display: block;
             }

             span {
                 margin-left: 4px;
             }
         }

         .card-bottom {
             position: absolute;
             bottom: 0;
             left: 0;
             right: 0;
             color: aliceblue;
             text-align: center;
             height: 30px;
             line-height: 30px;
             background: rgba(0, 0, 0, 0.5);
         }


         .arms {
             position: relative;
             top: 80px;
             width: 60%;
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
             border: 2.5px solid #F0000E;
             filter: brightness(120%) drop-shadow(0 0 1em #F0000E);

             &::before {
                 background-color: transparent;
             }

             .arms {
                 transform: translateX(-50%) scale(1.5);
             }

         }
     }

 }</style>