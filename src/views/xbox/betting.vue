<template>
    <div class="box-page">
        <span>期号:   {{ currentTitle }}</span>
        <div class="box-list">
            <div class="item" :class="{ 'active': activeIndex === index, 'choose': chooseList.includes(index) }"
                v-for="(item, index) in boxList" :key="index" @click="onChoose(index)">
                <span>
                    {{ item }}
                </span>
                <img v-show="activeIndex === index" src="@/assets/xbox/lucky.png" alt="">
            </div>
        </div>
        <button class="xbox-action-btn" @click="onStart(8)">开始出奖</button>
    </div>
</template>
<script setup>
import { reactive, ref,onMounted } from 'vue'
import { Message } from "@/hooks/useMessage";
import dayjs from 'dayjs';
import lark from '@/assets/xbox/lucky.png'


let currentTitle = ref('')
let boxList = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
let activeIndex = ref(null)
let chooseList = ref([])
let speed = 100
let totalTime = 1000 // 总时长为 6000 毫秒
let timer = null

onMounted(()=>{
    currentTitle.value =generateTimestampWithRandom()
})

function onChoose(index) {
    if (chooseList.value && chooseList.value.includes(index)) {
        Message({
            content: `不可重复下注`,
        })
    } else {
        chooseList.value.push(index)
        Message({
        time:3000,
        content: `<div>投注${index}号箱子，中奖预计为获得
            <div style="display:flex;align-items:center;justify-content:space-between;margin-top: 8px;">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                    <img src="${lark}" style="height:40px"> 
                    <span>sdsdsdsds</span>
                    <span style="color:yellow; margin-left:10px;"> *2</span>
                </div>
                <span>x总价值 30/40</span>
                </div>
            </div>`,
    })
    }

}

function onStart(number) {
    if (timer) return
    let currentIndex = 0; // 当前索引
    activeIndex.value = 0
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
        Message({
            time: 5000,
            content: `本期中奖码为${number}`,
        })
        showResult(number)

    }, totalTime + speed * (number + 1));

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showResult(number) {
    if (chooseList.value.includes(number)) {
        Message({
            time: 4000,
            content: `恭喜！${number}号箱子已经中奖`,
        })
    }

    await sleep(4000);
    activeIndex.value = null
    chooseList.value = []
    currentTitle.value =generateTimestampWithRandom()
}



function generateTimestampWithRandom() {
    const currentDate = dayjs(); // 获取当前日期时间
    const year = currentDate.year(); // 获取年份
    const month = currentDate.month() + 1; // 获取月份（月份从0开始，因此需要加1）
    const day = currentDate.date(); // 获取日期
    const hour = currentDate.hour(); // 获取小时
    const minute = currentDate.minute(); // 获取分钟
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 生成随机的四位数字
    const combinedTimestamp = year * 100000000 + month * 1000000 + day * 10000 + hour * 100 + minute + randomDigits; // 将年月日时分和随机数字组合在一起
    return combinedTimestamp; // 返回组合后的数字
}

</script>
<style lang="scss" scoped>
.box-page {
    width: 100%;
    background: #101317;
    min-height: 100vh;
    color: aliceblue;
    display: flex;
    flex-flow: column;
    align-items: center;
    span {
    filter: brightness(120%) drop-shadow(0 0 10px $error-color);

        padding: 20px;
        font-size: 20px;
    }

    .box-list {
        margin: 30px;
        display: flex;
        justify-content: space-around;
        flex-flow: wrap;
        width: 80vw;

        .item {
            width: 200px;
            text-align: center;
            line-height: 200px;
            height: 200px;
            border: 1px solid $error-color;
            margin-bottom: 20px;
            position: relative;

            span {
                position: relative;
                z-index: 2;
            }

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
            }
        }

        .choose {
            background: linear-gradient(145deg, $warining-color 2.89%, #23181E 20.36%);
            box-shadow: 0 0 10px $warining-color;
            border: 1px solid $warining-color;

        }

        .active {
            box-shadow: 0 0 10px $error-color;
            transform: scale(1.1);
            filter: drop-shadow(0 0 10px $error-color);
        }
    }
}</style>