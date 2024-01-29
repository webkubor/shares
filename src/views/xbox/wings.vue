<template>
    <div class="bg">
        <div class="flame">
            <img class="avactor" src="https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/avactor.png" alt="">
            <div class="name-title">
                King
            </div>
            <img class="red" src="https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/fly-open-removebg-preview.png">
            <div class="light"></div>
        </div>
        <div class="flame">
            <img class="avactor" src="https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/avactor.png" alt="">
      
            <img src="https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/king.png">
            <div class="light">
            </div>
        </div>

        <div class="others">
            <div class="flame">
                <img src="https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/2.png">
            </div>
            <div class="flame">
                <img src="https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/3.png">
            </div>
        </div>


    </div>
</template>

<script setup>
import { useMusic } from "@/hooks/useMusic";

const { initBackgroundMusic, onClickAudio } = useMusic()
initBackgroundMusic()



</script>

<style lang="scss" scoped>
@keyframes masked-animation {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: -100% 0;
    }
}


.bg {
    min-height: 100vh;
    width: 100vw;
    background: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #ffffff;
    padding-bottom: 20vh;
    padding: 0 20px 30vh;
}


.flame {
    width: 400px;
    position: relative;
    cursor: pointer;
    z-index: 2;

    h2 {
        font-weight: 800;
        text-align: center;
    }

    .avactor {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: absolute;
        top: 80px;
        z-index: 10;
        left: 50%;
        transform: translateX(-50%);
        filter: drop-shadow(0 0 10px yellow);
    }

    .name-title {
        top: 180px;
        position: relative;
        text-align: center;
        filter: drop-shadow(0 0 1em #F0000E);
        font-size: 40px;
        color: yellow;
        z-index: 50;
        font-family: "Bangers", cursive;
        width: 300px;
        height: 200px;
        position: absolute;
        top: 25px;
        left: 50%;
        margin-left: -150px;
        background-image: -webkit-linear-gradient(left, #F0000E, #c2ff66 10%, #ff6a00 20%, #F0000E 30%, #CCCCFF 40%, #ff6a00 50%, #CCCCFF 60%, #CC00CC 70%, #F0000E 80%, #ff6a00 90%, #c2ff66 100%);
        -webkit-text-fill-color: transparent;
        font-weight: 800;
        /* 将字体设置成透明色 */
        -webkit-background-clip: text;
        /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
        -webkit-background-size: 200% 100%;
        -webkit-animation: masked-animation 4s linear infinite;
    }

    .light {
        width: 500px;
        height: 600px;
        position: absolute;
        top: -265px;
        left: -50px;
        background: url(https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/light.png) no-repeat center;
        background-size: contain;
        z-index: -1;
    }



    &::before {
        display: block;
        content: "";
        width: 800px;
        height: 550px;
        background: url(https://p.ipic.vip/oy9n1b.png) no-repeat center;
        background-size: contain;
        position: absolute;
        left: 50%;
        top: -60%;
        transform: translate(-65%);
        z-index: -1;
    }

    img {
        width: 100%;
    }

    .red {
        filter: drop-shadow(0 0 1em #F0000E);
    }

    .list {
        height: 100px;
        margin-bottom: 40px;
        position: reactive;
        z-index: 30;

        &:hover {
            border: 2px solid #F0000E;

        }
    }
}

.others {
    display: flex;
    margin-top: -20px;

    .flame {
        width: 45%;
        margin: 0 20px;

        img {
            width: 200px;
        }
    }
}</style>