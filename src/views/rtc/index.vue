<template>
    <n-card title="WebRTC">
        一种基于浏览器的多媒体即时通信技术，🌐能实现在浏览器之间交换任意数据而无需中间件的技术
        <n-card>
            <video class="video" ref="videoWindow"></video>
            <canvas id="canvas" style="display:none;"></canvas>
            <n-space>
                <n-button @click="onStart">开始</n-button>
                <n-button @click="onStop">停止</n-button>
                <n-button @click="onContinue">继续</n-button>
                <n-button @click="onClose">关闭播放</n-button>
                <n-button @click="onPic">拍照</n-button>
            </n-space>
        </n-card>

    </n-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const videoWindow = ref<HTMLVideoElement | null>(null);

async function onStart() {
    if (!videoWindow.value) return;
    // 尝试获取媒体设备
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        videoWindow.value.srcObject = stream;
        videoWindow.value.play();
addWatermark();
    } catch (error) {
        console.error('无法获取媒体设备：', error);
    }
}


function onPic() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (context && videoWindow.value) {
        canvas.width = 300;
        canvas.height = 150;
        context.drawImage(videoWindow.value, 0, 0, 300, 150);
        const url = canvas.toDataURL('images/png')
  const a = document.createElement('a');
  const event = new MouseEvent('click');
  a.download = 'default.png';
  a.href = url;
  a.dispatchEvent(event);

    }
}



function addWatermark() {
    const canvas = document.createElement('canvas');
    const video = videoWindow.value;
    if (!video ||!canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '20px Arial';
    ctx.fillText('Webkubor Test', canvas.width - 150, canvas.height - 20);
    video.srcObject = canvas.captureStream();
}



// 暂停视频播放
function onStop() {
    if (!videoWindow.value) return;
    if (videoWindow.value.srcObject !== null && !videoWindow.value.paused) {
        videoWindow.value.pause();
    } else {
        window.$message?.warning('视频已经停止或未在播放中。');
    }
}
// 继续视频播放
function onContinue() {
    if (!videoWindow.value) return;
    if (videoWindow.value.srcObject !== null && videoWindow.value.paused) {
        videoWindow.value.play();
    } else {
        window.$message?.warning('视频不处于暂停状态或未在播放中。');
    }
}

// 关闭视频播放
function onClose() {
    if (!videoWindow.value) return;
    try {
        videoWindow.value.srcObject = null;
    } catch (error) {
        console.error('关闭播放时出现错误：', error);
    }
}
</script>
<style lang="scss" scoped>
.video {
    width: 300px;
    height: 300px;
    background-color: #f5f5f5;
    object-fit: cover;

    &:hover {
        transform: scale(1.05);
    }
}
</style>