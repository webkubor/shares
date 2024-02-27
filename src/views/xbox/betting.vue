<template>
    <div class="box-page">
        <h1>三色球</h1>
        <div class="box-list">
            <div class="item" :class="{ 'active': activeIndex === index }" v-for="(item, index) in boxList" :key="index">
                {{ item }}
            </div>
        </div>
        <button class="xbox-action-btn" @click="onStart(8)">开始</button>

    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
let boxList = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
let activeIndex = ref(0)
let speed = 100
let totalTime = 1000 // 总时长为 6000 毫秒
let timer = null


function onStart(number) {
    let currentIndex = 0; // 当前索引
    timer = setInterval(() => {
        if (currentIndex === boxList.length) {
          
            currentIndex = 0
        console.log(activeIndex.value, currentIndex);
        }
        activeIndex.value = boxList[currentIndex];
        currentIndex++;
    }, speed);
    setTimeout(() => {
        clearInterval(timer);
        timer = null
    }, totalTime + speed * (number + 1));

}

</script>
<style lang="scss" scoped>
.box-page {
    width: 100%;
    background: #101317;
    min-height: 100vh;
    color: aliceblue;

    .box-list {
        display: flex;
        justify-content: space-around;
        flex-flow: wrap;

        .item {
            width: 20vw;
            text-align: center;
            line-height: 20vw;
            height: 20vw;
            border: 1px solid $error-color;
            margin-bottom: 20px;
        }

        .active {
            box-shadow: 0 0 10px $error-color;
            filter: drop-shadow(0 0 10px $error-color);
            background: rgba($error-color, 0.3);
        }
    }
}
</style>