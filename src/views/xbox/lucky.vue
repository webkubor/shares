<template>
    <div class="lucky-page">
        <h1>幸运饰品特效</h1>
        <div class="center ">
            <img class="going" src="@/assets/xbox/circle.png" alt="" srcset="">
        </div>
        <div class="xbox-action-btn">
            开启测试
        </div>
    </div>
</template>


<script setup>
import { onMounted  } from 'vue';
</script>
<style lang="scss" scoped>

@keyframes goingflash {
    0% {
        box-shadow: 0 0 5px 3px rgba(255, 94, 0, 0.7);
        /* 开始时的光晕效果 */
    }

    100% {
        box-shadow: 0 0 20px 10px rgba(0, 255, 0, 0);
        /* 闪烁后的光晕效果 */
    }
}



.going {
    border-radius: 50%;
    animation: goingflash 1s infinite alternate;
}


.lucky-page{
    width: 100%;
    height: 100vh;
    background: #000000;
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    .center {
        img {
            width: 300px;
        }
    }
}
</style>