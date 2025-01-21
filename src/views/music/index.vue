<template>
  <div class="audio-pitch-control">
    <!-- 白色背景板 -->
    <n-card class="container" title="音频音高调节工具">
      <p class="description">
        上传音频文件，调整音高，并试听或下载调整后的音频。
      </p>

      <!-- 上传音频 -->
      <div class="upload-section">
        <input type="file" @change="onFileChange" accept="audio/mp3, audio/wav" />
        <p v-if="uploadMessage" class="upload-message">{{ uploadMessage }}</p>
      </div>

      <!-- 音高调节 -->
      <div v-if="audioFile" class="control-section">
        <label for="pitch" class="pitch-label">音高调整（半音）:</label>
        <input
          type="range"
          v-model="pitch"
          id="pitch"
          min="-12"
          max="12"
          step="1"
        />
        <span class="pitch-value">{{ pitch > 0 ? "+" + pitch : pitch }} 半音</span>
      </div>
      <!-- 播放控制 -->
      <n-space>
        <n-button v-if="audioFile" @click="playOriginalAudio">播放原始音频</n-button>
        <n-button v-if="audioFile" @click="playAdjustedAudio">播放调整后音频</n-button>
        <n-button v-if="audioFile" @click="downloadAudio">下载调整后的音频</n-button>
      </n-space>
      <!-- 播放器 -->
      <audio ref="audioPlayer"  style="margin-top: 20px;" :src="audioSrc" controls v-if="audioFile"></audio>
    </n-card>
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
// Web Audio API 相关变量
let audioContext: AudioContext | null = null;
let audioSource: AudioBufferSourceNode | null = null;
let audioBuffer: AudioBuffer | null = null;

// 播放器引用
const audioPlayer = ref<HTMLAudioElement | null>(null);

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

// 播放原始音频
const playOriginalAudio = () => {
  if (audioSrc.value && audioPlayer.value) {
    stopAllAudio();
    audioPlayer.value.src = audioSrc.value;
    audioPlayer.value.play();
  }
};

// 播放调整后的音频
const playAdjustedAudio = async () => {
  if (audioFile.value) {
    stopAllAudio();

    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioSource) {
      audioSource.stop();
    }

    const response = await fetch(audioSrc.value!);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;

    const pitchFactor = Math.pow(2, pitch.value / 12);
    audioSource.playbackRate.setValueAtTime(pitchFactor, audioContext.currentTime);

    audioSource.connect(audioContext.destination);
    audioSource.start();
  }
};

// 停止所有音频播放
const stopAllAudio = () => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value.currentTime = 0;
  }
  if (audioSource) {
    audioSource.stop();
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;

  .container {

  

    .description {
      font-size: 16px;
      color: #666;
      margin-bottom: 20px;
    }

    .upload-section {
      input[type="file"] {
        display: block;
        margin: 0 auto;
        margin-bottom: 10px;
      }

      .upload-message {
        color: #4caf50;
        font-size: 14px;
      }
    }

    .control-section {
      margin: 20px 0;

      .pitch-label {
        display: block;
        font-size: 16px;
        margin-bottom: 5px;
      }

      input[type="range"] {
        width: 100%;
        margin: 10px 0;
      }

      .pitch-value {
        font-size: 14px;
        color: #333;
      }
    }


   
  }
}
</style>