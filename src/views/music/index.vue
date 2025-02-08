<template>
  <div class="audio-pitch-control">
    <n-card class="container" title="音频音高调节工具" :bordered="false">
      <p class="description">
        上传音频文件，调整音高，并试听或下载调整后的音频。
      </p>

      <!-- 上传音频区域 -->
      <div class="upload-section">
        <n-upload
          accept="audio/mp3, audio/wav"
          :show-file-list="false"
          @change="onFileChange"
        >
          <n-button type="primary" class="upload-btn">
            <template #icon>
              <n-icon><i class="fas fa-cloud-upload-alt"></i></n-icon>
            </template>
            选择音频文件
          </n-button>
        </n-upload>
        <p v-if="uploadMessage" class="upload-message">{{ uploadMessage }}</p>
      </div>

      <!-- 音频控制区域 -->
      <div v-if="audioFile" class="control-panel">
        <!-- 音高调节滑块 -->
        <div class="pitch-control">
          <label for="pitch" class="pitch-label">音高调整（半音）</label>
          <div class="pitch-slider">
            <n-slider
              v-model:value="pitch"
              :min="-12"
              :max="12"
              :step="1"
              :tooltip="true"
              :marks="{
                '-12': '-12',
                '0': '0',
                '12': '+12'
              }"
            />
          </div>
          <span class="pitch-value">{{ pitch > 0 ? "+" + pitch : pitch }} 半音</span>
        </div>

        <!-- 自定义播放器 -->
        <div class="custom-player">
          <div class="player-controls">
            <n-button circle class="control-btn" @click="playOriginalAudio">
              <template #icon><i class="fas fa-play"></i></template>
            </n-button>
            <n-button circle class="control-btn" @click="playAdjustedAudio">
              <template #icon><i class="fas fa-music"></i></template>
            </n-button>
            <n-button circle class="control-btn" @click="downloadAudio">
              <template #icon><i class="fas fa-download"></i></template>
            </n-button>
          </div>
          <div class="player-info">
            <span class="file-name">{{ audioFile?.name }}</span>
            <audio ref="audioPlayer" :src="audioSrc" class="hidden-player"></audio>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

// 音高调节值，范围为 -12 到 12 半音
const pitch = ref(0);

// 监听音高变化，停止当前播放
watch(pitch, () => {
  stopAllAudio();
});

// 音频相关状态管理
const audioFile = ref<File | null>(null); // 当前音频文件
const uploadMessage = ref<string | null>(null); // 上传提示信息
const audioSrc = ref<string | null>(null); // 音频源URL

// Web Audio API 相关变量
let audioContext: AudioContext | null = null; // 音频上下文
let audioSource: AudioBufferSourceNode | null = null; // 音频源节点
let audioBuffer: AudioBuffer | null = null; // 音频缓冲区

// 播放器DOM引用
const audioPlayer = ref<HTMLAudioElement | null>(null);

// 处理文件上传
const onFileChange = (options: { file: File }) => {
  const file = options.file;
  if (file.file) {
    audioFile.value = file.file;
    audioSrc.value = URL.createObjectURL(file.file);
    uploadMessage.value = `音频上传成功: ${file.file.name}`;
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

// 播放调整音高后的音频
const playAdjustedAudio = async () => {
  if (audioFile.value) {
    stopAllAudio();

    // 初始化音频上下文
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // 停止当前播放的音源
    if (audioSource) {
      audioSource.stop();
    }

    // 加载并解码音频数据
    const response = await fetch(audioSrc.value!);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // 创建新的音源节点
    audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;

    // 根据音高值计算播放速率
    const pitchFactor = Math.pow(2, pitch.value / 12);
    audioSource.playbackRate.value = pitchFactor;

    // 连接音频节点并开始播放
    audioSource.connect(audioContext.destination);
    audioSource.start();
  }
};

// 停止所有音频播放
const stopAllAudio = () => {
  // 停止HTML5音频播放器
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value.currentTime = 0;
  }
  // 停止Web Audio API音源
  if (audioSource) {
    audioSource.stop();
  }
};

// 下载调整后的音频
const downloadAudio = async () => {
  if (audioFile.value && audioBuffer) {
    // 创建离线音频上下文用于渲染
    const offlineContext = new OfflineAudioContext({
      numberOfChannels: audioBuffer.numberOfChannels,
      length: audioBuffer.length,
      sampleRate: audioBuffer.sampleRate
    });

    // 设置音源节点
    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.playbackRate.value = Math.pow(2, pitch.value / 12);
    source.connect(offlineContext.destination);
    source.start();

    // 渲染音频
    const renderedBuffer = await offlineContext.startRendering();

    // 转换为WAV格式并下载
    const wavBlob = await audioBufferToWav(renderedBuffer);
    const link = document.createElement("a");
    const url = URL.createObjectURL(wavBlob);
    link.href = url;
    link.download = `${audioFile.value.name.split(".")[0]}_pitched.wav`;
    link.click();
    URL.revokeObjectURL(url);
  }
};

// 将AudioBuffer转换为WAV格式
const audioBufferToWav = (buffer: AudioBuffer) => {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2;
  const buffer32 = new Float32Array(buffer.length * numOfChan);
  const view = new DataView(new ArrayBuffer(44 + length));

  // 写入WAV文件头
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // 设置WAV格式参数
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + length, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numOfChan, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * 2 * numOfChan, true);
  view.setUint16(32, numOfChan * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, length, true);

  // 写入音频采样数据
  const offset = 44;
  for (let i = 0; i < buffer.numberOfChannels; i++) {
    buffer32.set(buffer.getChannelData(i), buffer.length * i);
  }

  for (let i = 0; i < buffer32.length; i++) {
    const s = Math.max(-1, Math.min(1, buffer32[i]));
    view.setInt16(offset + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  return new Blob([view], { type: "audio/wav" });
};
</script>

<style lang="scss" scoped>
.audio-pitch-control {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #252525;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;

  .container {
    width: 100%;
    max-width: 800px;
    background-color: #2d2d2d;
    border-radius: 12px;
    color: #fff;

    :deep(.n-card-header) {
      color: #fff;
      font-size: 24px;
      font-weight: 600;
    }

    .description {
      font-size: 16px;
      color: #b3b3b3;
      margin-bottom: 30px;
    }

    .upload-section {
      text-align: center;
      margin-bottom: 30px;

      .upload-btn {
        padding: 12px 24px;
        font-size: 16px;
        border-radius: 24px;
        background: linear-gradient(45deg, #c62f2f, #d53a3a);
        border: none;

        &:hover {
          background: linear-gradient(45deg, #d53a3a, #e64545);
        }
      }

      .upload-message {
        color: #b3b3b3;
        font-size: 14px;
        margin-top: 10px;
      }
    }

    .control-panel {
      .pitch-control {
        margin-bottom: 30px;

        .pitch-label {
          color: #fff;
          font-size: 16px;
          margin-bottom: 15px;
          display: block;
        }

        .pitch-slider {
          padding: 0 10px;
        }

        .pitch-value {
          color: #b3b3b3;
          font-size: 14px;
          margin-top: 10px;
          display: block;
          text-align: center;
        }
      }

      .custom-player {
        background-color: #363636;
        border-radius: 8px;
        padding: 20px;

        .player-controls {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 15px;

          .control-btn {
            width: 48px;
            height: 48px;
            background-color: #4a4a4a;
            border: none;
            transition: all 0.3s ease;

            &:hover {
              background-color: #c62f2f;
              transform: scale(1.05);
            }

            :deep(i) {
              font-size: 18px;
              color: #fff;
            }
          }
        }

        .player-info {
          text-align: center;

          .file-name {
            color: #b3b3b3;
            font-size: 14px;
          }
        }

        .hidden-player {
          display: none;
        }
      }
    }
  }
}
</style>