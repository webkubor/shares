<template>
    <div v-for="(danmaku, index) in danmakus" :key="index" class="danmaku" :style="danmaku.style">
        {{ danmaku.content }}
    </div>
    <div class="barrage-board">
        <div class="show-row">
            <n-input v-model:value="message" placeholder="这里输入弹幕" clearable type="textarea" autosize
                style="min-width: 80%"></n-input>
            <n-button @click="sendMessage" type="primary">发送弹幕</n-button>
            <n-button dashed type="info" @click="clearMessage">清空弹幕</n-button>
        </div>
        <n-form-item label="弹幕速度:" label-placement="left" label-width="90">
            <n-select v-model:value="speed" :options="speedOptions" />
        </n-form-item>
        <n-form-item label="字体大小:" label-placement="left" label-width="90">
            <n-select v-model:value="fontSize" :options="fontOptions" />
        </n-form-item>
        <n-form-item label="颜色(随机):" label-placement="left" label-width="90">
            <n-color-picker v-model:value="color" :modes="['hex']" :swatches="[
                '#FFFFFF',
                '#18A058',
                '#2080F0',
                '#F0A020',
                'rgba(208, 48, 80, 1)'
            ]" />
        </n-form-item>
        <div class="show-row">
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const message = ref('');
const fontSize = ref('22');
const speed = ref(20);
const danmakus = ref([]);
const color = ref(null);

let speedOptions = [
    {
        label: '慢',
        value: 40
    },
    {
        label: '中等（默认）',
        value: 20
    },
    {
        label: '快速',
        value: 10
    }
]

let fontOptions = [
    {
        label: '小',
        value: '16'
    },
    {
        label: '中等（默认）',
        value: '22'
    },
    {
        label: '大',
        value: '30'
    }
]

const sendMessage = () => {
    console.log('发送弹幕:', message.value);
    if (message.value.trim() === '') {
        window.$toast.success('请先输入弹幕内容!');
        return
    };
    const newDanmaku = {
        content: message.value,
        style: {
            color: color.value ?? getRandomColor(),
            top: `${getRandomPosition()}%`,
            fontSize: `${fontSize.value}px`,
            fontWeight: 'bold',
            animationDuration: `${speed.value}s`,
        },
    };
    danmakus.value.push(newDanmaku);
    message.value = '';
    console.log(danmakus.value, "弹幕列表");
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// 生成随机位置，从 10% 到 80%
const getRandomPosition = () => {
    return Math.floor(Math.random() * 70) + 10;
};

const clearMessage = () => {
    danmakus.value = [];
}

</script>
<style lang="scss" scoped>
.danmaku {
    position: absolute;
    white-space: nowrap;
    font-size: 16px;
    left: 0;
    animation: slideToLeft linear infinite;
    z-index: 10;
}

@keyframes slideToLeft {
    to {
        transform: translateX(100vw);
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
        margin-left: 10px;
    }
}
</style>