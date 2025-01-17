<template>
  <div class="audio-pitch-control">
    <!-- 白色背景板 -->
    <div class="background-overlay">
      <div class="container">
        <h1>音频音高调节</h1>
        <p>上传音频文件并调整音高，您可以试听并下载调整后的音频。</p>

        <!-- 文件上传 -->
        <input type="file" @change="onFileChange" accept="audio/mp3, audio/wav" />
        <div v-if="uploadMessage" class="upload-message">{{ uploadMessage }}</div>

        <!-- 音高调节 -->
        <label for="pitch">音高调整（半音）:</label>
        <input
          type="range"
          v-model="pitch"
          id="pitch"
          min="-12"
          max="12"
          step="1"
        />
        <span>{{ pitch }} 半音</span>

        <!-- 播放调整后音频 -->
        <button @click="playAudio" :disabled="!audioFile">试听调整后的音频</button>

        <!-- 下载调整后的音频 -->
        <button @click="downloadAudio" :disabled="!audioFile">下载调整后的音频</button>

        <!-- 显示音频播放器 -->
        <audio ref="audioPlayer" :src="audioSrc" controls v-if="audioFile"></audio>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 音高调节值，范围为 -12 到 12 半音
const pitch = ref(0);
// 音频文件
const audioFile = ref<File | null>(null);
// 上传成功的提示信息
const uploadMessage = ref<string | null>(null);
// 存储音频的 URL
const audioSrc = ref<string | null>(null);

// 记录当前的音频上下文
let audioContext: AudioContext | null = null;
let audioSource: AudioBufferSourceNode | null = null;
let audioBuffer: AudioBuffer | null = null;
let pitchShiftNode: GainNode | null = null;

// 处理文件上传
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files ? input.files[0] : null;
  if (file) {
    audioFile.value = file;
    audioSrc.value = URL.createObjectURL(file); // 生成音频的 URL
    uploadMessage.value = `音频上传成功: ${file.name}`;
  }
};

// 播放调整后的音频
const playAudio = async () => {
  if (audioFile.value) {
    // 创建音频上下文，如果已存在则重用
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // 如果已经有音频正在播放，则停止
    if (audioSource) {
      audioSource.stop();
    }
    
    // 读取上传的音频文件并创建音频缓冲区
    const response = await fetch(audioSrc.value!);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // 创建音频源节点
    audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;

    // 创建音高调整节点（我们用 GainNode 进行音高处理）
    pitchShiftNode = audioContext.createGain();
    
    // 根据音高调整值计算音频播放的速率
    const pitchFactor = Math.pow(2, pitch.value / 12); // 音高转换公式（半音 -> 速率）
    audioSource.playbackRate.setValueAtTime(pitchFactor, audioContext.currentTime);
    
    // 将音频源节点连接到音高调整节点，并将其连接到音频上下文的输出
    audioSource.connect(pitchShiftNode);
    pitchShiftNode.connect(audioContext.destination);

    // 播放音频
    audioSource.start();
  }
};

// 下载调整后的音频
const downloadAudio = () => {
  if (audioFile.value) {
    const link = document.createElement("a");
    const url = URL.createObjectURL(audioFile.value);
    link.href = url;
    link.download = audioFile.value.name;
    link.click();
    URL.revokeObjectURL(url);
  }
};

</script>

<style lang="scss" scoped>
.audio-pitch-control {
  text-align: center;
  padding: 20px;
  position: relative;
}

.background-overlay {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 28px;
  margin-bottom: 15px;
}

input[type="file"] {
  margin-bottom: 15px;
}

input[type="range"] {
  width: 300px;
  margin-top: 15px;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
}

button + button {
  margin-left: 10px;
}

.upload-message {
  margin-top: 10px;
  color: #4caf50;
  font-size: 16px;
}

audio {
  margin-top: 20px;
  max-width: 100%;
}
</style>