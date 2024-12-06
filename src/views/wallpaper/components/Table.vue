<template>
    <n-split direction="horizontal" :max="0.80" :min="0.2" :default-size="0.6">
        <template #1>
                <div id="phone-view" class="bg-view"
                    :style="{ background: `${paperState.bgColor}` }">
                    <div class="frame-border"
                        :style="{ background: `url(${paperState.modelSrc}) no-repeat center/cover` }">
                        <div class="inner-wallpaper"
                            :style="{ background: `url(${paperState.wallpaper}) no-repeat center/cover` }">
                            <div class="light-box"></div>
                            <div class="phone-top">
                                <img class="phone-top-center" crossorigin="anonymous" src="../assets/center.png" alt="">
                                <PhoneTopIcon />
                            </div>
                            <template v-if="paperState.interface">
                                <img class="table" crossorigin="anonymous"
                                    :src="paperState.interface + '?' + new Date().getTime()">
                            </template>
                            <template v-else>
                                <div class="time-box"  :style="{ color: paperState.fontColor }">
                                    11:40
                                </div>
                                <div class="bottom-area">
                                    <PhoneLockBottom />
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
        </template>
        <template #2>
            <RightView />
        </template>
    </n-split>
</template>
<script setup lang="ts">
import { useWallpaper } from "../useWallpaper"
import RightView from "./RightView.vue";
import PhoneTopIcon from "./svg/PhoneTopIcon.vue";
import PhoneLockBottom from "./svg/PhoneLockBottom.vue";
const { paperState } = useWallpaper()



</script>
<style lang="scss" scoped>
.bg-view {
    position: relative;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;

    .frame-border {
        height: 400px;
        width: 200px;
        border-radius: 25px;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        /* 添加阴影效果 */
        transform: scale(1.1) translateZ(20px);
        /* 放大变换并保持3D效果 */
        transform-style: preserve-3d;
        /* 确保子元素也遵循3D变换 */
        transition: transform 0.3s ease-in-out;
        /* 添加平滑动画效果 */
        position: relative;

        .inner-wallpaper {
            display: block;
            margin: 2px auto;
            width: calc(100% - 16px);
            height: calc(100% - 4px);
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
                top: 45px;
                transform: translateX(-50%);
                font-size: 32px;
                font-weight: 600;
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
}
</style>