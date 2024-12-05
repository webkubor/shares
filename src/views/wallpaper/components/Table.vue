<template>

    <div class="main-container">
        <n-split direction="horizontal" :max="0.85" :min="0.25">
            <template #1>
                <n-card title="预览">
                    <!-- 背景素材 -->
                    <div class="bg-view" :style="{ background: `url(${paperState.bg}) no-repeat center/cover` }">
                        <div class="frame-border"
                            :style="{ background: `url(${paperState.modelSrc}) no-repeat center/cover` }">
                            <div class="inner-wallpaper"
                                :style="{ background: `url(${paperState.wallpaper}) no-repeat center/cover` }">
                                <div class="phone-top">
                                        <img class="phone-top-center" src="../assets/center.png" alt="">
                                        <PhoneTopIcon/>
                                    </div>
                                <template v-if="paperState.interface">
                                    <img class="table" :src="paperState.interface">
                                </template>
                                <template v-else>
                                    <div class="time-box">
                                        11:40
                                    </div>
                                    <div class="bottom-area">
                                        <PhoneLockBottom/>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </n-card>
            </template>
            <template #2>

                <RightView />
                <n-card title="壁纸">
                    <n-image width="100" preview-disabled :src="paperState.wallpaper" />
                </n-card>
                <n-card title="操作栏">
                    <n-space>
                        <n-button type="primary">下载样图</n-button>
                        <n-button type="primary">添加水印</n-button>
                        <n-button type="primary">添加标题</n-button>
                    </n-space>
                </n-card>

            </template>
        </n-split>
    </div>
</template>
<script setup lang="ts">
import { useWallpaper } from "../useWallpaper"
import RightView from "./RightView.vue";
import PhoneTopIcon from "./svg/PhoneTopIcon.vue";
import PhoneLockBottom from "./svg/PhoneLockBottom.vue";
const { paperState } = useWallpaper()

</script>
<style lang="scss" scoped>
.main-container {
    width: 100%;
    font-size: 16px;
    height: 80vh;

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
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15); /* 添加阴影效果 */
            transform: scale(1.1) translateZ(20px); /* 放大变换并保持3D效果 */
    transform-style: preserve-3d; /* 确保子元素也遵循3D变换 */
    transition: transform 0.3s ease-in-out; /* 添加平滑动画效果 */

            .inner-wallpaper {
                display: block;
                margin: 2px auto;
                width: calc(100% - 16px);
                height: calc(100% - 5px);
                position: relative;
                border-radius: 25px;
                overflow: hidden;
                font-family: system-ui;

                .table {
                    display: block;
                    margin: 30px  auto;
                    width: 160px;
                    height: auto;
                }

                .phone-top {
                    position: absolute;
                    z-index: 20;
                    display: flex;
                    width: 185px;
                    height: 40px;
                    top: 4px;
                    left: 0px;

                    svg {
                        margin-left: 20px;
                        width: 100%;
                    }

                    .phone-top-center {
                        position: absolute;
                        height: 20px;
                        width: auto;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }

                .time-box {
                    position: absolute;
                    left: 50%;
                    top: 45px;
                    transform: translateX(-50%);
                    color: #333333;
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


        }
    }

}
</style>