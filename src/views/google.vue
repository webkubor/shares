<template>
    <div id="captcha" style="margin:10px;"></div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  let codeFlag = ref(false);
  let captchaId = null;
  
  function handleLoadGoogleCaptcha() {
    codeFlag.value = false;
    captchaId = grecaptcha.render("captcha", {
      "sitekey": '6Lc_OlEpAAAAABJA5kqj1SM0S3vo_tmbKNHuor48',
      "theme": "light",
      "callback": handleCaptchaCallback,
      "expired-callback": handleCaptchaExpired,
      "error-callback": handleCaptchaError,
      "hl": 'zh-CN',
    });
  }
  
  function handleCaptchaCallback(val) {
    if (val != null) {
      register.captchaCode = val;
      codeFlag.value = true;
    }
  }
  
  function handleCaptchaExpired() {
    register.captchaCode = "";
    codeFlag.value = false;
  }
  
  function handleCaptchaError() {
    register.captchaCode = "";
    grecaptcha.reset(captchaId);
    codeFlag.value = false;
  }
  </script>
  <style>
#captcha {
    border: 1px solid #ccc;
}

</style>
  