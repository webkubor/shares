<template>
    <n-card title="API 文档">
        API 文档： https://developers.cloudflare.com/turnstile/
    </n-card>
    <div id="vertify-container" class="cf-turnstile"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    sitekey: {
      type: String,
      required: true,
    },
    // onVerified: {
    //   type: Function,
    //   required: true,
    // },
  });
  

const turnstileSiteKey = '1x00000000000000000000AA'; // 测试
  onMounted(() => {
    window._turnstileCb = () => {
      console.log('_turnstileCb called');
  
      window.turnstile.render('#vertify-container', {
        sitekey: turnstileSiteKey,
        theme:'light',
        callback: (token) => {
          console.log('Turnstile token:', token);
        //   props.onVerified(token);
        },
        'expired-callback': () => {
          console.log('Turnstile token expired');
          window.turnstile.reset('#vertify-container'); // 重置以刷新令牌
        },
        'timeout-callback': () => {
          console.log('Turnstile challenge timed out');
          window.turnstile.reset('#vertify-container'); // 重置以刷新令牌
        },
        'refresh-timeout': 'auto', // 可以是 'auto', 'manual', 或 'never'
      });
    };
  
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=_turnstileCb';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
  </script>
  
  <style scoped>
  /* Add any custom styles for the turnstile component here */
  </style>
  