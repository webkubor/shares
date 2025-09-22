<template>
  <div class="iframe-container">
    <div class="iframe-header">
      <div class="title-section">
        <h1 class="main-title">打开jazzcash的iframe链接测试</h1>
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
    
    <div class="iframe-footer">
      <div class="url-display">
        <span class="url-label">Source:</span>
        <span class="url-value">{{ iframeUrl }}</span>
      </div>
      <div class="status-indicator" :class="{ 'status-loaded': !loading }">
        {{ loading ? 'Loading...' : 'Loaded' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const iframeUrl = ref('http://192.168.124.28:5173/#/connect/jazzcash/P34074863650475521');
const loading = ref(true);
const isFullscreen = ref(false);
const iframeElement = ref(null);
const iframeWrapper = ref(null);

const onIframeLoad = () => {
  loading.value = false;
};

const refreshIframe = () => {
  loading.value = true;
  if (iframeElement.value) {
    iframeElement.value.src = iframeUrl.value;
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

<style scoped>
.iframe-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  font-family: 'Arial', sans-serif;
}

.iframe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e8eaed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.title-section {
  display: flex;
  flex-direction: column;
}

.main-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
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
  border-radius: 8px;
  background-color: #f0f2f5;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background-color: #e4e6eb;
}

.control-btn i {
  font-size: 18px;
  color: #444;
}

.iframe-wrapper {
  position: relative;
  flex: 1;
  background-color: #ffffff;
  border-radius: 8px;
  margin: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.iframe-wrapper.is-fullscreen {
  margin: 0;
  border-radius: 0;
  box-shadow: none;
}

.iframe-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
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
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
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
  background-color: #ffffff;
  border-top: 1px solid #e8eaed;
}

.url-display {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.url-label {
  font-weight: 600;
  color: #555;
  margin-right: 8px;
}

.url-value {
  color: #0066cc;
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-indicator {
  font-size: 14px;
  font-weight: 500;
  color: #f39c12;
  display: flex;
  align-items: center;
}

.status-indicator.status-loaded {
  color: #2ecc71;
}

.status-indicator::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
  margin-right: 8px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .iframe-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .controls {
    align-self: flex-end;
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