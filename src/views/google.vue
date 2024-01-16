<template>
<n-button @click="onVertifyV3Click">V3无感知登录</n-button>
   <!-- <div id="captcha" style="margin:10px;"></div>
    -->
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

const key_id = '6LcTelEpAAAAAMP0-x8wbH9pvGwElJkxBZ47UvAP'
onMounted(() => {
   // handleGoogleCaptchaV2();
});

function onVertifyV3Click() {
    grecaptcha.ready(function () {
        console.log(grecaptcha, 'grecaptcha准备完毕');
        grecaptcha.execute(key_id, { action: 'login' }).then(function (token) {
            // Add your logic to submit to your backend server here.
            console.log(token, "token验证后");
            console.log(key_id, "当前秘钥");
            window.v3token = token;
        })
    });
}


function handleGoogleCaptchaV2() {
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
  