
<template>
    <n-card class="login-div">
        <div class="kuang"><span class="kuang-left">用户名</span>天爱有情</div>
        <div class="kuang"><span class="kuang-left">密码</span>*********</div>
        <n-button id="login-btn" @click="loginBtn">登录</n-button>
        <div id="captcha-div"></div>
    </n-card>
</template>
<script setup>
import "@/assets/captcha/tac.css" // 验证码css
import "@/assets/captcha/tac.min.js"; // 验证码js

function loginBtn() {
    let style = {logoUrl: null}// 去除logo  
    const config = {
        requestCaptchaDataUrl: "/api/gen/random",
        validCaptchaUrl: "/api/check3",
        bindEl: "#captcha-div",
        // 验证成功回调函数
        validSuccess: (res, c, tac) => {
            tac.destroyWindow();
        }
    }
    new window.TAC(config, style).init();
}
</script>