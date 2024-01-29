<template>
    <div>
      <h1>视频切片生成WebP</h1>
      <input type="file" @change="handleFileChange" accept="video/*">
      <button @click="generateWebP">生成WebP</button>
      <div v-if="webpData.url">
        <img :src="webpData.url" alt="Generated WebP">
        <a :href="webpData.url" download="output.webp">下载WebP</a>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  
  export default {
    setup() {
      const videoFile = ref(null);
      const webpData = reactive({ url: '' });
  
      const handleFileChange = (event) => {
        videoFile.value = event.target.files[0];
      };
  
      const generateWebP = async () => {
        try {
          if (!videoFile.value) {
            alert('请选择一个视频文件。');
            return;
          }
  
          const video = document.createElement('video');
  
          video.src = URL.createObjectURL(videoFile.value);
          video.preload = 'metadata';
  
          await new Promise((resolve) => {
            video.onloadedmetadata = resolve;
          });
  
          const duration = video.duration;
          const interval = 0.5; // 间隔时间，单位秒
  
          const captureImages = [];
          let currentTime = 0;
  
          while (currentTime < duration) {
            video.currentTime = currentTime;
            await new Promise((resolve) => {
              video.onseeked = resolve;
            });
  
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
            const dataURL = canvas.toDataURL('image/webp');
            captureImages.push(dataURL);
  
            currentTime += interval;
          }
  
          // 将多个 WebP 图片合并成一个 Blob
          const webpBlob = await createWebPBlob(captureImages);
  
          // 创建 Blob 的 URL 用于预览和下载
          webpData.url = URL.createObjectURL(webpBlob);
        } catch (error) {
          console.error(error);
        }
      };
  
      const createWebPBlob = async (images) => {
        const webpChunks = [];
  
        for (const dataURL of images) {
          const base64String = dataURL.split(',')[1];
          const binaryData = atob(base64String);
  
          const uint8Array = new Uint8Array(binaryData.length);
          for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
          }
  
          webpChunks.push(uint8Array);
        }
  
        // 创建一个新的 Blob 包含所有 WebP 图片的数据
        return new Blob(webpChunks, { type: 'image/webp' });
      };
  
      return {
        videoFile,
        webpData,
        handleFileChange,
        generateWebP,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  