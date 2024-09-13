<template>
    <div class="login-view">
        <div class="login-box">
            <div class="left">
                <WaterDrop />
            </div>
            <div class="right">
                <h1>Login</h1>
                <n-space vertical>
                    <n-input placeholder="2"></n-input>
                    <n-input placeholder="password"></n-input>
                    <n-button type="primary" style="width: 100%;">登录</n-button>
                </n-space>
            </div>

        </div>

    </div>
</template>
<script setup>

import WaterDrop from "@/components/anime/WaterDrop.vue"
</script>
<style lang="scss" scoped>
.login-view {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    font-size: 12px;
    background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);

    .login-box {
        width: 50vw;
        padding: 80px 40px;
        color: #ffffff;
        box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2), 0 1px 1px rgba(255, 255, 255, 0.2);
        @include glass-effect(rgba(255, 255, 255), 10, 0.2);
        border-radius: 10px;
        display: flex;
        justify-content: space-between;

        .right {
            width: 70%;
        }

        .left {
            flex: 1;
            display: flex;
            justify-content: center;
        }

        &:hover {
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            background: rgba(255, 255, 255, 0.3);
        }


    }

}
</style>