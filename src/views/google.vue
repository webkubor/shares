<template>
   <div id="captcha" style="margin:10px;"></div>
</template>
<!-- 6Lc_OlEpAAAAABJA5kqj1SM0S3vo_tmbKNHuor48 前端 -->
<!-- 6Lc_OlEpAAAAANp6r2WD2aoSpghbYgnuFQCNBCNz 服务器 -->
<script setup>
import { ref, onMounted, reactive } from 'vue';

let register = reactive({
   captchaCode: ''
})
let codeFlag = ref(false);
let captchaId = null;
onMounted(() => {
   handleLoadGoogleCaptcha();
});
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
   if (val) {
      register.captchaCode = val;
      console.log(val, 'handleCaptchaCallback');
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
  