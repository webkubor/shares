<template>
  <div class="aura-player" :class="{ 'is-playing': isPlaying }">
    <div class="player-visual">
      <div class="wave-container" v-if="isPlaying">
        <div v-for="i in 5" :key="i" class="wave-bar"></div>
      </div>
      <div class="play-btn" @click="togglePlay">
        <span v-if="!isPlaying">▶</span>
        <span v-else>⏸</span>
      </div>
    </div>
    
    <div class="player-info">
      <div class="track-title">江月无声</div>
      <div class="track-artist">Original by 月栖洲</div>
      <div class="progress-container" @click="seek">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <audio
      ref="audioRef"
      src="https://img.webkubor.online/1770365741294-ypu7ztmj.wav"
      @timeupdate="onTimeUpdate"
      @ended="onEnded"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const progress = ref(0)

const togglePlay = () => {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const onTimeUpdate = () => {
  if (!audioRef.value) return
  progress.value = (audioRef.value.currentTime / audioRef.value.duration) * 100
}

const onEnded = () => {
  isPlaying.value = false
  progress.value = 0
}

const seek = (e: MouseEvent) => {
  if (!audioRef.value) return
  const container = e.currentTarget as HTMLElement
  const rect = container.getBoundingClientRect()
  const pos = (e.clientX - rect.left) / rect.width
  audioRef.value.currentTime = pos * audioRef.value.duration
}
</script>

<style scoped lang="scss">
.aura-player {
  padding: 16px 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(32, 196, 182, 0.1) 0%, rgba(255, 255, 255, 0.8) 100%);
  border: 1px solid rgba(32, 196, 182, 0.2);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &.is-playing {
    border-color: rgba(32, 196, 182, 0.5);
    box-shadow: 0 12px 30px rgba(32, 196, 182, 0.15);
  }
}

.player-visual {
  width: 48px;
  height: 48px;
  background: #20c4b6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  color: white;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(32, 196, 182, 0.3);
}

.wave-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  opacity: 0.4;
}

.wave-bar {
  width: 3px;
  height: 12px;
  background: white;
  border-radius: 2px;
  animation: wave 1s ease-in-out infinite;
  @for $i from 1 through 5 {
    &:nth-child(#{$i}) { animation-delay: $i * 0.1s; }
  }
}

@keyframes wave {
  0%, 100% { height: 8px; }
  50% { height: 20px; }
}

.player-info {
  flex: 1;
  min-width: 0;
}

.track-title {
  font-weight: 700;
  font-size: 15px;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.track-artist {
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
}

.progress-container {
  height: 4px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: #20c4b6;
  border-radius: 2px;
  transition: width 0.1s linear;
}
</style>
