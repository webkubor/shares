<template>

   <n-card>
      <div>
         网站秘钥  6LcTelEpAAAAAMP0-x8wbH9pvGwElJkxBZ47UvAP
      </div>
      <div>
         服务器秘钥：6LcTelEpAAAAAI-OY2JMcjHcnm-n2I7i7K5wbVSZ
      </div>
     <n-button @click="onVertifyV3Click">V3无感知登录</n-button>
      <n-card title="结果">
         {{ register.captchaCode }}
      </n-card>
   </n-card>
   <!-- <div id="captcha" style="margin:10px;"></div>
    -->
</template>
<!-- 6Lc_OlEpAAAAABJA5kqj1SM0S3vo_tmbKNHuor48 前端 -->
<!-- 6Lc_OlEpAAAAANp6r2WD2aoSpghbYgnuFQCNBCNz 服务器 -->
<script setup>
import { ref, onMounted, reactive } from 'vue';

let register = reactive({
   captchaCode: {}
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
            console.log(token, "token验证后");
            let params = {
               action: 'login',
               token:token,
               key: key_id
            }
            console.log(params, "params");
            register.captchaCode = JSON.stringify(params, null, 2)
            window.$message.success('验证成功,请打开控制台，看输出内容');
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
  