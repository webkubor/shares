<template>
  <div class="aura-player-v3" :class="{ 'is-playing': isPlaying }">
    <!-- 沉浸式背景层 -->
    <div class="player-ambient">
      <div class="aurora-glow"></div>
      <div class="star-field"></div>
    </div>

    <!-- 左侧：巨型黑胶魂 -->
    <div class="vinyl-wrapper" @click="togglePlay">
      <div class="vinyl-plate" :class="{ 'spinning': isPlaying }">
        <div class="vinyl-groove"></div>
        <div class="vinyl-cover">
          <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000" alt="Cover" />
        </div>
      </div>
      <div class="stylus" :class="{ 'on-plate': isPlaying }"></div>
      <div class="play-hint">
        <span v-if="!isPlaying">PLAY</span>
        <span v-else>LIVE</span>
      </div>
    </div>

    <!-- 右侧：震撼信息区 -->
    <div class="player-core">
      <div class="header-meta">
        <span class="badge">Featured Track</span>
        <span class="track-id">#001</span>
      </div>
      
      <div class="main-info">
        <h2 class="title">江月无声</h2>
        <p class="artist-line">Produced by <span class="highlight">月栖洲</span></p>
      </div>

      <!-- 巨幕声波 -->
      <div class="mega-visualizer">
        <div v-for="i in 30" :key="i" class="v-bar" :style="{ 
          height: isPlaying ? `${10 + Math.random() * 40}px` : '4px',
          animationDuration: `${0.5 + Math.random() * 0.5}s`
        }"></div>
      </div>

      <div class="footer-controls">
        <div class="time-display">
          <span class="curr">{{ formatTime(currentTime) }}</span>
          <div class="progress-track" @click="seek">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
            <div class="progress-glow" :style="{ left: progress + '%' }"></div>
          </div>
          <span class="total">{{ formatTime(duration) }}</span>
        </div>
      </div>
    </div>

    <audio
      ref="audioRef"
      src="https://img.webkubor.online/1770365741294-ypu7ztmj.wav"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const progress = computed(() => (duration.value ? (currentTime.value / duration.value) * 100 : 0))

const togglePlay = () => {
  if (!audioRef.value) return
  isPlaying.value ? audioRef.value.pause() : audioRef.value.play()
  isPlaying.value = !isPlaying.value
}

const onTimeUpdate = () => audioRef.value && (currentTime.value = audioRef.value.currentTime)
const onLoadedMetadata = () => audioRef.value && (duration.value = audioRef.value.duration)
const onEnded = () => { isPlaying.value = false; currentTime.value = 0 }

const seek = (e: MouseEvent) => {
  if (!audioRef.value) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  audioRef.value.currentTime = ((e.clientX - rect.left) / rect.width) * duration.value
}

const formatTime = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`
</script>

<style scoped lang="scss">
.aura-player-v3 {
  width: 100%;
  height: 240px;
  background: #0a0f12;
  border-radius: 32px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  gap: 40px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.6s cubic-bezier(0.2, 1, 0.2, 1);

  &.is-playing {
    border-color: #20c4b6;
    box-shadow: 0 0 40px rgba(32, 196, 182, 0.2), inset 0 0 20px rgba(32, 196, 182, 0.1);
  }
}

/* 氛围背景 */
.player-ambient {
  position: absolute;
  inset: 0;
  z-index: 0;
  .aurora-glow {
    position: absolute;
    top: -50%;
    left: -20%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(32, 196, 182, 0.12) 0%, transparent 70%);
    filter: blur(60px);
    animation: aurora 10s infinite alternate;
  }
  .star-field {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, #fff 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.05;
  }
}

@keyframes aurora {
  from { transform: translate(0, 0); }
  to { transform: translate(10%, 10%); }
}

/* 巨型唱片 */
.vinyl-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  flex-shrink: 0;
  z-index: 2;
  cursor: pointer;
}

.vinyl-plate {
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 15px 40px rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .vinyl-groove {
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: repeating-radial-gradient(circle, #1a1a1a 0, #1a1a1a 1px, #000 2px, #000 3px);
    opacity: 0.8;
  }
  
  .vinyl-cover {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 2;
    border: 3px solid #000;
    img { width: 100%; height: 100%; object-fit: cover; }
  }
}

.spinning { animation: rotate 8s linear infinite; }

/* 唱片针 */
.stylus {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 60px;
  height: 60px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ccc' d='M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z'/%3E%3C/svg%3E") no-repeat center;
  transform-origin: top right;
  transform: rotate(-30deg);
  transition: transform 0.5s ease;
  filter: drop-shadow(0 4px 4px rgba(0,0,0,0.5));
  &.on-plate { transform: rotate(5deg); }
}

.play-hint {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  letter-spacing: 3px;
  color: #20c4b6;
  font-weight: 800;
  opacity: 0.6;
}

/* 核心内容区 */
.player-core {
  flex: 1;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.header-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  .badge {
    padding: 2px 10px;
    background: #20c4b6;
    color: #000;
    font-size: 10px;
    font-weight: 900;
    border-radius: 4px;
    text-transform: uppercase;
  }
  .track-id { color: rgba(255,255,255,0.3); font-size: 10px; font-family: monospace; }
}

.main-info {
  .title { font-size: 32px; font-weight: 900; color: #fff; margin: 0; letter-spacing: -1px; }
  .artist-line { font-size: 14px; color: #666; margin: 4px 0 0; .highlight { color: #aaa; } }
}

/* 巨幕声波 */
.mega-visualizer {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 50px;
  margin: 20px 0;
  .v-bar {
    width: 4px;
    background: linear-gradient(to top, #20c4b6, #4fe0d2);
    border-radius: 2px;
    transition: height 0.2s ease;
  }
}

/* 底部控制区 */
.footer-controls {
  .time-display {
    display: flex;
    align-items: center;
    gap: 15px;
    font-family: monospace;
    font-size: 12px;
    color: #444;
  }
}

.progress-track {
  flex: 1;
  height: 6px;
  background: rgba(255,255,255,0.05);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  .progress-bar {
    position: absolute;
    height: 100%;
    background: #20c4b6;
    border-radius: 3px;
    z-index: 1;
  }
  .progress-glow {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    background: #20c4b6;
    filter: blur(10px);
    transform: translate(-50%, -50%);
    opacity: 0.5;
  }
}

@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

@media (max-width: 800px) {
  .aura-player-v3 { height: auto; flex-direction: column; padding: 40px; text-align: center; }
  .stylus { display: none; }
  .mega-visualizer { justify-content: center; }
}
</style>
