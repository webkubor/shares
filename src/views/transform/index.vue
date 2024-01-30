<template>
    <div>
      <h1>视频 to WebP Gif</h1>
      <input type="file" @change="handleFileChange" accept="video/*">
      <video ref="video" width="320" height="240" controls>
        <source :src="videoSrc" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <button @click="downloadGif" :disabled="!videoSrc">下载动图</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const videoRef = ref(null);
      const videoSrc = ref(null);
      const fileInputRef = ref(null);
  
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        console.log(URL.createObjectURL(file),11111);

          videoSrc.value = URL.createObjectURL(file);
        }
      };
  
      const downloadGif = () => {
        const video = videoRef.value;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = video.width;
        canvas.height = video.height;
  
        function renderFrame() {
          ctx.drawImage(video, 0, 0);
          requestAnimationFrame(renderFrame);
        }
  
        requestAnimationFrame(renderFrame);
  
        canvas.toBlob(function (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'video.gif';
          a.click();
          URL.revokeObjectURL(url);
        });
      };
  
      onMounted(() => {
        const downloadBtn = document.querySelector('#downloadBtn');
        downloadBtn.addEventListener('click', downloadGif);
      });
  
      return {
        videoRef,
        videoSrc,
        fileInputRef,
        handleFileChange,
        downloadGif,
      };
    },
  };
  </script>
  
  <style>
  /* Add your component-specific styles here */
  </style>
  