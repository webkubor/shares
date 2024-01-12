<template>
    <div v-for="(danmaku, index) in danmakus" :key="index" class="danmaku" :style="danmaku.style">
        {{ danmaku.content }}
    </div>

    <div class="barrage-board">
        <div class="show-row">
            <n-button @click="sendMessage" type="primary">发送弹幕</n-button>
            <n-input v-model:value="message" placeholder="输入弹幕内容" clearable type="textarea" autosize
                style="min-width: 80%"></n-input>
        </div>
        <n-color-picker />
        <div class="show-row">
            <n-button dashed type="info" @click="clearMessage">清空弹幕</n-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const message = ref('');
const danmakus = ref([]);

const sendMessage = () => {
    // 在这里处理发送弹幕的逻辑
    console.log('发送弹幕:', message.value);
    if (message.value.trim() === '') {
        window.$toast.success('请先输入弹幕内容!');
        return
    };
    const newDanmaku = {
        content: message.value,
        style: {
            color: getRandomColor(),
            top: `${getRandomPosition()}%`,
            animationDuration: `${getRandomSpeed()}s`,
        },
    };
    danmakus.value.push(newDanmaku);
    // 清空输入框
    message.value = '';
    console.log(danmakus.value, "弹幕列表");
};

const getRandomColor = () => {
    // 生成随机颜色，可以根据需要进行调整
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const getRandomPosition = () => {
    // 生成随机位置，从 10% 到 90%
    return Math.floor(Math.random() * 80) + 10;
};

const getRandomSpeed = () => {
    // 生成随机速度，可以根据需要进行调整
    // return (Math.random() * 5 + 2).toFixed(1);
    return 12;
};

const clearMessage = () => {
    console.log('清空弹幕')
}




</script>
<style lang="scss" scoped>
.danmaku {
    position: absolute;
    white-space: nowrap;
    font-size: 16px;
    animation: slideToLeft linear infinite;
}

@keyframes slideToLeft {
    to {
        transform: translateX(-100%);
    }
}

.barrage-board {
    padding: 20px;
    background: transparent;
}

.show-row {
    display: flex;
    margin: 10px 0;

    button {
        margin-right: 10px;
    }
}
</style>