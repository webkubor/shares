<template>

   <n-space vertical>
      <n-button text tag="a" href="https://www.google.com/recaptcha/admin/site/702521588/setup?hl=zh-c" target="_blank"
         type="primary">
         recaptcha添加操作地址
      </n-button>
      <n-card title="google 无感知验证-基于得分">
         <div>
            网站秘钥 6LcTelEpAAAAAMP0-x8wbH9pvGwElJkxBZ47UvAP
         </div>
         <div>
            服务器秘钥：6LcTelEpAAAAAI-OY2JMcjHcnm-n2I7i7K5wbVSZ
         </div>
         <n-button @click="onVertifyV3Click">V3无感知登录</n-button>
         <n-card title="结果">
            {{ register.captchaCode }}
         </n-card>
      </n-card>
   </n-space>

   <!-- <div id="captcha" style="margin:10px;"></div>
    -->
</template>

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
            token: token,
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
      "sitekey": '6LcTelEpAAAAAMP0-x8wbH9pvGwElJkxBZ47UvAP',
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