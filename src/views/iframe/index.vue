<template>
  <div class="iframe-container" :class="local.osTheme === 'dark' ? 'dark_theme' : 'light_theme'">
    <div class="iframe-header">
      <div class="title-section">
        <h1 class="main-title">iframe链接测试</h1>
        <p class="subtitle">External content preview</p>
      </div>
      <div class="controls">
        <button class="control-btn refresh" @click="refreshIframe" title="Refresh">
          <i class="refresh-icon">↻</i>
        </button>
        <button class="control-btn fullscreen" @click="toggleFullscreen" title="Toggle Fullscreen">
          <i class="fullscreen-icon">⛶</i>
        </button>
      </div>
    </div>
    
    <div class="iframe-wrapper" ref="iframeWrapper" :class="{ 'is-fullscreen': isFullscreen }">
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Loading content...</p>
      </div>
      <iframe 
        ref="iframeElement"
        :src="iframeUrl" 
        @load="onIframeLoad"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    
    <div class="url-editor">
      <div class="url-card">
        <div class="input-container">
          <div class="url-input">
            <span class="prefix-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" fill="currentColor"/>
              </svg>
            </span>
            <input
              class="url-input-el"
              v-model="inputUrl"
              type="text"
              placeholder="Enter URL here"
              @keydown.enter="updateIframe"
            />
          </div>
          <button type="button" @click="updateIframe" :disabled="!inputUrl" class="apply-button common-btn">
            Apply
          </button>
        </div>
      </div>
    </div>
    
    <div class="iframe-footer">
      <div class="url-display">
        <span class="url-label">Source:</span>
        <a :href="iframeUrl" target="_blank" class="url-value" title="Open in new tab">{{ iframeUrl }}</a>
      </div>
      <div class="status-indicator" :class="{ 'status-loaded': !loading }">
        {{ loading ? 'Loading...' : 'Loaded' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTheme } from "@/hooks/useTheme";

// const iframeUrl = ref('https://pk-test.tpservice.vip/#/app-opener');
const iframeUrl = ref('https://pk-test.tpservice.vip/#/app-opener');
const inputUrl = ref(iframeUrl.value);
const loading = ref(true);
const isFullscreen = ref(false);
const iframeElement = ref(null);
const iframeWrapper = ref(null);

// 获取主题相关信息
const { local } = useTheme();

const onIframeLoad = () => {
  loading.value = false;
};

const refreshIframe = () => {
  loading.value = true;
  if (iframeElement.value) {
    iframeElement.value.src = iframeUrl.value;
  }
};

const updateIframe = () => {
  if (inputUrl.value && inputUrl.value !== iframeUrl.value) {
    iframeUrl.value = inputUrl.value;
    refreshIframe();
  }
};

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  
  if (isFullscreen.value) {
    if (iframeWrapper.value.requestFullscreen) {
      iframeWrapper.value.requestFullscreen();
    } else if (iframeWrapper.value.webkitRequestFullscreen) {
      iframeWrapper.value.webkitRequestFullscreen();
    } else if (iframeWrapper.value.msRequestFullscreen) {
      iframeWrapper.value.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};

// Listen for fullscreen change events
onMounted(() => {
  const fullscreenChangeHandler = () => {
    isFullscreen.value = !!(document.fullscreenElement || 
                          document.webkitFullscreenElement || 
                          document.msFullscreenElement);
  };
  
  document.addEventListener('fullscreenchange', fullscreenChangeHandler);
  document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
  document.addEventListener('msfullscreenchange', fullscreenChangeHandler);
  
  return () => {
    document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('msfullscreenchange', fullscreenChangeHandler);
  };
});
</script>
<style lang="scss" scoped>
.iframe-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  font-family: var(--font-sans);
  transition: background-color 300ms ease, color 300ms ease;

  /* 背景网格与光晕：科技氛围 */
  background-image:
    radial-gradient(circle at 10% 10%, rgba(124, 58, 237, 0.06), transparent 30%),
    radial-gradient(circle at 90% 80%, rgba(35, 84, 255, 0.06), transparent 35%),
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.03) 0px,
      rgba(255,255,255,0.03) 1px,
      transparent 1px,
      transparent 20px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.03) 0px,
      rgba(255,255,255,0.03) 1px,
      transparent 1px,
      transparent 20px
    );

  // 亮色主题
  &.light_theme {
    background-color: var(--bg-surface);

    .iframe-header, .url-editor, .iframe-footer {
      background-color: var(--bg-elevated);
      border-color: var(--border-color);
    }

    .main-title { color: var(--text-primary); }
    .subtitle { color: var(--text-secondary); }

    .control-btn {
      background-color: #f3f6ff;
      border: 1px solid rgba(35, 84, 255, 0.18);
      
      &:hover { filter: brightness(1.03); }
      i { color: #2354ff; }
    }

    .iframe-wrapper {
      background-color: var(--bg-elevated);
      box-shadow: 0 8px 32px var(--shadow-color);
    }

    .loading-overlay { background-color: rgba(255, 255, 255, 0.85); }
    .url-label { color: var(--text-secondary); }
    .url-value { color: #2354ff; }
  }

  // 暗色主题
  &.dark_theme {
    background-color: var(--bg-surface);

    .iframe-header, .url-editor, .iframe-footer {
      background-color: var(--bg-elevated);
      border-color: var(--border-color);
    }

    .main-title { color: var(--text-primary); }
    .subtitle { color: var(--text-secondary); }

    .control-btn {
      background-color: #182241;
      border: 1px solid rgba(124, 58, 237, 0.25);
      
      &:hover { filter: brightness(1.08); }
      i { color: #9aa8ff; }
    }

    .iframe-wrapper {
      background-color: var(--bg-elevated);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
    }

    .loading-overlay {
      background-color: rgba(18, 26, 51, 0.88);
      p { color: var(--text-secondary); }
    }

    .url-label { color: var(--text-secondary); }
    .url-value { color: #7c9cff; }
  }
}

.url-editor {
  padding: 16px 24px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.url-card {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  width: 100%;
  gap: 12px;
}

.url-input {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--bg-elevated);
}

.prefix-icon {
  display: inline-flex;
  align-items: center;
  color: #2354ff;
}

.url-input-el {
  flex: 1;
  height: 36px;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 14px;
}

.apply-button {
  white-space: nowrap;
}

.iframe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  position: relative;
  
  /* 顶部品牌渐变细线 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-image: var(--brand-gradient);
  }
}

.title-section {
  display: flex;
  flex-direction: column;
}

.main-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  padding: 0;
}

.subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  opacity: 0.8;
}

.controls {
  display: flex;
  gap: 12px;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 8px 24px rgba(35, 84, 255, 0.15);
  
  &:active {
    transform: translateY(1px);
  }
}

.control-btn i {
  font-size: 18px;
}

.iframe-wrapper {
  position: relative;
  flex: 1;
  border-radius: 0;
  margin: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &.is-fullscreen {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.spinner {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 3px solid rgba(124, 58, 237, 0.25);
  border-top-color: #2354ff;
  box-shadow: 0 0 12px rgba(35, 84, 255, 0.35);
  animation: spin 0.9s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.iframe-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-top-width: 1px;
  border-top-style: solid;
}

.url-display {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.url-label {
  font-weight: 600;
  margin-right: 8px;
}

.url-value {
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-indicator {
  font-size: 14px;
  font-weight: 500;
  color: #FFB31C;
  display: flex;
  align-items: center;
  
  &.status-loaded {
    color: #30C0A2;
  }
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
    margin-right: 8px;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .iframe-header {
    padding: 6px 12px;
  }
  
  .main-title {
    font-size: 16px;
  }
  
  .subtitle {
    font-size: 11px;
  }
  
  .url-editor {
    padding: 0;
  }
  
  .iframe-footer {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
  
  .url-value {
    max-width: 300px;
  }
}
</style>