<template>
    <div class="frame-border shadow-common">
        <img class="border-img" :src="paperState.modelSrc">
        <div class="inner-wallpaper" :style="{ background: `url(${paperState.wallpaper}) no-repeat center/cover` }">
            <div class="light-box"></div>
            <div class="phone-top">
                <img class="phone-top-center" crossorigin="anonymous" src="../assets/center.png" alt="">
                <PhoneTopIcon />
            </div>
            <template v-if="paperState.interface">
                <img class="table" crossorigin="anonymous" :src="paperState.interface + '?' + new Date().getTime()">
            </template>
            <template v-else>
                <div class="time-box" :style="{ color: paperState.fontColor }">
                    {{ getCurrent() }}
                    <div class="more">{{ getCurrentTime() }}</div>
                </div>
                <div class="bottom-area">
                    <PhoneLockBottom />
                </div>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useWallpaper } from "../useWallpaper"
import PhoneTopIcon from "./svg/PhoneTopIcon.vue";
import PhoneLockBottom from "./svg/PhoneLockBottom.vue";
const { paperState } = useWallpaper()
import dayjs from "@/utils/dayjs";

function getCurrentTime() {
    const now = dayjs();
    const formattedTime = now.format('dddd | MMM D'); // 使用 'ddd D' 格式来显示星期几和日期
    return formattedTime;
}

function getCurrent() {
    const now = dayjs();
    const formattedTime = now.format('hh:mm'); // 使用 'ddd D' 格式来显示星期几和日期
    return formattedTime;
}

</script>
<style lang="scss" scoped>
   .shadow-common {
        box-shadow:
            3.4px 3.4px 2.7px rgba(0, 0, 0, 0.025),
            8.7px 8.7px 6.9px rgba(0, 0, 0, 0.035),
            17.7px 17.7px 14.2px rgba(0, 0, 0, 0.045),
            36.5px 36.5px 29.2px rgba(0, 0, 0, 0.055),
            100px 100px 80px rgba(0, 0, 0, 0.08);
    }

    .frame-border {
        height: 400px;
        width: 200px;
        border-radius: 28px;
        box-sizing: border-box;
        /* 添加阴影效果 */
        transform: scale(1.3) translateZ(20px);
        /* 放大变换并保持3D效果 */
        transform-style: preserve-3d;
        /* 确保子元素也遵循3D变换 */
        transition: transform 0.3s ease-in-out;
        /* 添加平滑动画效果 */
        position: relative;
        padding: 4px 5px 2px;
        z-index: 20;

        .border-img {
            position: absolute;
            width: 203px;
            height: 100%;
            left: -1px;
            top: 1px;
        }

        .inner-wallpaper {
            display: block;
            margin: 2px auto;
            width: calc(100% - 4px);
            height: calc(100% - 5px);
            position: relative;
            border-radius: 25px;
            font-family: system-ui;
            position: relative;
            overflow: hidden;

            .light-box {
                position: absolute;
                z-index: 20;
                width: 100px;
                height: 100px;
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), transparent);
                top: -20px;
                left: 100px;
                transform: rotate(-20deg);
            }


            .table {
                display: block;
                margin: 30px auto;
                width: 160px;
                height: auto;
            }

            .phone-top {
                position: absolute;
                display: flex;
                width: 185px;
                height: 40px;
                top: 4px;
                left: 0px;
                z-index: 10;

                svg {
                    margin-left: 20px;
                    width: 100%;
                }

                .phone-top-center {
                    position: absolute;
                    height: 20px;
                    width: auto;
                    left: 50%;
                    z-index: 2;
                    transform: translateX(-50%);
                }
            }

            .time-box {
                position: absolute;
                left: 50%;
                top: 50px;
                width: 100%;
                text-align: center;
                transform: translateX(-50%);
                font-size: 34px;
                letter-spacing: 2px;
                font-weight: 600;

                .more {
                    font-size: 10px;
                    font-weight: 400;
                    text-align: center;
                    letter-spacing: 0px;
                }
            }

            .bottom-area {
                position: absolute;
                bottom: -5px;
                left: 0;
                right: 0;

                svg {
                    width: 100%;
                }
            }

        }

        &:after {
            content: "";
            content: "";
            position: absolute;
            width: 500px;
            height: 660px;
            background-color: rgba(0, 0, 0, 0.05);
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 100%);
            bottom: 0;
            left: 10px;
            transform: rotate(25deg);
            transform-origin: bottom left;
            z-index: -1;
        }
    }
</style>