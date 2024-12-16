<template>

    <div class="login-view">
        <div class="main">
            <div class="switch">
                <div class="switch__circle"></div>
                <div class="switch__circle switch__circle--t"></div>
                <div class="switch__container">
                    <img src="@/assets/logo/w-3.png" alt="">
                    <div class="switch__title title">
                        Welcome Back !
                    </div>
                    <div class="descriptiom">
                        Don't have an account? Sign up now.
                    </div>

                </div>
            </div>
            <div class="container">
                <form class="form" id="a-form" method="" action="">
                    <h2 class="form_title title">Create Account</h2>
                    <input class="form__input"  type="text" autocomplete="off" placeholder="Name"
                        autofocus>
                    <input class="form__input" type="text" autocomplete="off" placeholder="Email">
                    <input class="form__input" type="password" placeholder="Password">
                    <button class="form__button">SIGN UP</button>
                </form>

            </div>

        </div>
    </div>

</template>
<script setup lang="ts">
import { onMounted } from 'vue';

</script>
<style lang="scss" scoped>
.title {
    font-size: 34px;
    font-weight: 700;
    line-height: 2;
    text-align: left;
    color: #181818;
}



button {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1.15px;
    background-color: #0f1011;
    color: #f9f9f9;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    border: none;
    outline: none;
}

.login-view {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background-color: #ecf0f3;
    color: #a0a5a8;

    .main {
        cursor: pointer;
        position: relative;
        width: 1000px;
        min-width: 1000px;
        min-height: 600px;
        height: 600px;
        padding: 25px;
        background-color: #ecf0f3;
        box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
        border-radius: 12px;
        overflow: hidden;

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            right: 0;
            width: 500px;
            height: 100%;
            padding: 25px;
            background-color: #ecf0f3;
            transition: 1.25s;

            .form__input {
                width: 350px;
                height: 40px;
                margin: 4px 0;
                padding-left: 25px;
                font-size: 13px;
                letter-spacing: 0.15px;
                border: none;
                outline: none;
                background-color: #ecf0f3;
                transition: 0.25s ease;
                border-radius: 8px;
                box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
            }

            .form__button {
                display: block;
                margin-left: 80px;
                transition: all 0.25s ease;

                &:hover {
                    transform: scale(1.02) translateY(-4px);
                    filter: brightness(1.2);
                    cursor: pointer;
                    box-shadow: inset 2px 2px 4px #141619, inset -2px -2px 4px #3a2828;
                }

                &:active {
                    transform: translateY(2px);
                }
            }
        }

        .switch {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 400px;
            padding: 50px;
            z-index: 200;
            transition: 1.25s;
            background-color: #ecf0f3;
            overflow: hidden;
            box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;

            .switch__circle {
                position: absolute;
                width: 500px;
                height: 500px;
                border-radius: 50%;
                background-color: #ecf0f3;
                box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
                bottom: -60%;
                left: -60%;
                transition: 1.25s;
            }

            .switch__circle--t {
                top: -30%;
                left: 60%;
                width: 300px;
                height: 300px;
            }

            .switch__container {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                position: absolute;
                width: 400px;
                padding: 50px 55px;
                transition: 1.25s;

                img {
                    width: 100px;
                    border-radius: 50%;
                }



                .descriptiom {
                    font-size: 14px;
                    letter-spacing: 0.25px;
                    text-align: center;
                    line-height: 1.6;
                }
            }
        }
    }
}
</style>
