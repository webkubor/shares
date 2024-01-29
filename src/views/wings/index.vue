<template>
    <div class="bg">
        <div class="flame">
            <img class="red" src="https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/test/fly-open-removebg-preview.png">
            <div class="light"></div>
        </div>
        <div class="flame">
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

    .light {
        width: 500px;
        height: 600px;
        position: absolute;
        top: -200px;
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
        width: 300px;
        margin: 0 120px;

    }
}
</style>