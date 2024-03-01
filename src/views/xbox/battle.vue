<template>
    <div class="xbox-page">

        <h1>对战竞技& 欧皇</h1>
        <div class="room-item king" @click="onTest">
            <img class="cover" src="@/assets/xbox/logo.png" />
            <div class="title-box">
                <h2>欧皇</h2>
                <div style="color: #666666; display: flex; align-items: center;">
                    <ph-eye :size="18" color="#666666" weight="bold" />
                    <span style="margin-left: 10px;">
                        6人观看
                    </span>
                </div>
                <n-space align="center">
                    <div class="status-dot going"></div>
                    <h4>进行中 3回合</h4>
                </n-space>
            </div>

            <div class="price-box">
                <span>X 1000.89</span>
            </div>
            <n-space style="margin: 20px 0; display: flex;">
                <img class="user-head" src="@/assets/avactor.png" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <div class="join">
                    <ph-plus :size="18" weight="bold" color="#ffffff" />
                </div>
            </n-space>
            <button>立刻开始</button>
            <button>加入观战</button>
            <div class="show-list">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">

            </div>
        </div>
        <div class="room-item battle" @click="onTest">
            <img class="cover" src="@/assets/xbox/logo.png" />
            <div class="title-box">
                <h2>经典模式</h2>
                <div style="color: #666666; display: flex; align-items: center;">
                    <ph-eye :size="18" color="#666666" weight="bold" />
                    <span style="margin-left: 10px;">
                        6人观看
                    </span>
                </div>
                <n-space align="center">
                    <div class="status-dot going"></div>
                    <h4>进行中 3回合</h4>
                </n-space>
            </div>

            <div class="price-box">
                <span>X 1000.89</span>
            </div>
            <n-space style="margin: 20px 0; display: flex;">
                <img class="user-head" src="@/assets/avactor.png" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <div class="join">
                    <ph-plus :size="18" weight="bold" color="#ffffff" />
                </div>
            </n-space>
            <button>立刻开始</button>
            <button>加入观战</button>
            <div class="show-list">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">

            </div>
        </div>
        <div class="room-item battle">
            <img class="cover" src="@/assets/xbox/logo.png" />
            <div class="title-box">
                <h2>经典模式</h2>
                <div style="color: #666666; display: flex; align-items: center;">
                    <ph-eye :size="18" color="#666666" weight="bold" />
                    <span style="margin-left: 10px;">
                        6人观看
                    </span>
                </div>
                <n-space align="center">
                    <div class="status-dot going"></div>
                    <h4>进行中 3回合</h4>
                </n-space>
            </div>
            <div class="price-box">
                <span>X 1000.89</span>
            </div>
            <n-space style="margin: 20px 0; display: flex;">
                <img class="user-head" src="@/assets/avactor.png" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <div class="join">
                    <ph-plus :size="18" weight="bold" color="#ffffff" />
                </div>
            </n-space>
            <button>立刻开始</button>
            <button>加入观战</button>
            <div class="show-list">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">

            </div>
        </div>
        <div class="room-item battle">
            <img class="cover" src="@/assets/xbox/logo.png" />
            <div class="title-box">
                <h2>经典模式</h2>
                <div style="color: #666666; display: flex; align-items: center;">
                    <ph-eye :size="18" color="#666666" weight="bold" />
                    <span style="margin-left: 10px;">
                        6人观看
                    </span>
                </div>
                <n-space align="center">
                    <div class="status-dot waiting"></div>
                    <h4>等待中 3回合</h4>
                </n-space>
            </div>
            <div class="price-box">
                <span>X 1000.89</span>
            </div>
            <n-space style="margin: 20px 0; display: flex;">
                <img class="user-head" src="@/assets/avactor.png" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <div class="join">
                    <ph-plus :size="18" weight="bold" color="#ffffff" />
                </div>
            </n-space>
            <button>立刻开始</button>
            <button>加入观战</button>
            <div class="show-list">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">

            </div>
        </div>
        <div class="room-item Joker">
            <img class="cover" src="@/assets/xbox/logo.png" />
            <div class="title-box">
                <h2>小丑模式</h2>
                <div style="color: #666666; display: flex; align-items: center;">
                    <ph-eye :size="18" color="#666666" weight="bold" />
                    <span style="margin-left: 10px;">
                        6人观看
                    </span>
                </div>
                <n-space align="center">
                    <div class="status-dot waiting"></div>
                    <h4>等待中 3回合</h4>
                </n-space>
            </div>
            <div class="price-box">
                <span>X 1000.89</span>
            </div>
            <n-space style="margin: 20px 0; display: flex;">
                <img class="user-head" src="@/assets/avactor.png" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <div class="join">
                    <ph-plus :size="18" weight="bold" color="#ffffff" />
                </div>
            </n-space>
            <button>立刻开始</button>
            <button>加入观战</button>
            <div class="show-list">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">

            </div>
        </div>
        <div class="room-item Joker">
            <img class="cover" src="@/assets/xbox/logo.png" />
            <div class="title-box">
                <h2>小丑模式</h2>
                <div style="color: #666666; display: flex; align-items: center;">
                    <ph-eye :size="18" color="#666666" weight="bold" />
                    <span style="margin-left: 10px;">
                        6人观看
                    </span>
                </div>
                <n-space align="center">
                    <div class="status-dot going"></div>
                    <h4>进行中 3回合</h4>
                </n-space>
            </div>
            <div class="price-box">
                <span>X 1000.89</span>
            </div>
            <n-space style="margin: 20px 0; display: flex;">
                <img class="user-head" src="@/assets/avactor.png" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <div class="join">
                    <ph-plus :size="18" weight="bold" color="#ffffff" />
                </div>
            </n-space>
            <button>立刻开始</button>
            <button>加入观战</button>
            <div class="show-list">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">

            </div>
        </div>
        <div class="room-item Joker">
            <img class="cover" src="@/assets/xbox/logo.png" />
            <div class="title-box">
                <h2>小丑模式</h2>
                <div style="color: #666666; display: flex; align-items: center;">
                    <ph-eye :size="18" color="#666666" weight="bold" />
                    <span style="margin-left: 10px;">
                        6人观看
                    </span>
                </div>
                <n-space align="center">
                    <div class="status-dot going"></div>
                    <h4>进行中 3回合</h4>
                </n-space>
            </div>
            <div class="price-box">
                <span>X 1000.89</span>
            </div>
            <n-space style="margin: 20px 0; display: flex;">
                <img class="user-head" src="@/assets/avactor.png" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <div class="join">
                    <ph-plus :size="18" weight="bold" color="#ffffff" />
                </div>
            </n-space>
            <button>立刻开始</button>
            <button>加入观战</button>
            <div class="show-list">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
            </div>
        </div>
        <div class="room-item disabled">
            <img class="cover" src="@/assets/xbox/active-logo.png" />
            <div class="title-box">
                <h2>小丑模式</h2>
                <div style="color: #666666; display: flex; align-items: center;">
                    <ph-eye :size="18" color="#666666" weight="bold" />
                    <span style="margin-left: 10px;">
                        6人观看
                    </span>
                </div>
                <n-space align="center">
                    <div class="status-dot ending"></div>
                    <h4>已结束 3回合</h4>
                </n-space>
            </div>
            <div class="price-box">
                <span>X 1000.89</span>
            </div>
            <n-space style="margin: 20px 0; display: flex;">
                <img class="user-head" src="@/assets/avactor.png" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <div class="join">
                    <ph-plus :size="18" weight="bold" color="#ffffff" />
                </div>
            </n-space>
            <button>查看</button>
            <div class="show-list">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
            </div>
        </div>
        <div class="room-item disabled">
            <img class="cover" src="@/assets/xbox/active-logo.png" />
            <div class="title-box">
                <h2>经典模式</h2>
                <div style="color: #666666; display: flex; align-items: center;">
                    <ph-eye :size="18" color="#666666" weight="bold" />
                    <span style="margin-left: 10px;">
                        6人观看
                    </span>
                </div>
                <n-space align="center">
                    <div class="status-dot ending"></div>
                    <h4>已结束 3回合</h4>
                </n-space>
            </div>
            <div class="price-box">
                <span>X 1000.89</span>
            </div>
            <n-space style="margin: 20px 0; display: flex;">
                <img class="user-head" src="@/assets/avactor.png" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <div class="join">
                    <ph-plus :size="18" weight="bold" color="#ffffff" />
                </div>
            </n-space>
            <button>查看</button>
            <div class="show-list">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">

            </div>

        </div>
        <div class="room-item disabled">
            <img class="cover" src="@/assets/xbox/active-logo.png" />
            <div class="title-box">
                <h2>经典模式</h2>
                <div style="color: #666666; display: flex; align-items: center;">
                    <ph-eye :size="18" color="#666666" weight="bold" />
                    <span style="margin-left: 10px;">
                        6人观看
                    </span>
                </div>
                <n-space align="center">
                    <div class="status-dot ending"></div>
                    <h4>已结束 3回合</h4>
                </n-space>
            </div>
            <div class="price-box">
                <span>X 1000.89</span>
            </div>
            <n-space style="margin: 20px 0; display: flex;">
                <img class="user-head" src="@/assets/avactor.png" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <img class="user-head" src="@/assets/me.jpeg" alt="">
                <div class="join">
                    <ph-plus :size="18" weight="bold" color="#ffffff" />
                </div>
            </n-space>
            <button>查看</button>
            <div class="show-list">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">
                <img src="@/assets/xbox/lucky.png" alt="">

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Message } from "@/hooks/useMessage";
import lark from '@/assets/xbox/lucky.png'

function onTest() {
    Message({
        time:8000,
        content: `<div>开启红色箱子2次，中奖预计为获得
            <div style="display:flex;align-items:center;justify-content:space-between;margin-top: 8px;">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                    <img src="${lark}" style="height:40px"> 
                    <span>sdsdsdsds</span>
                    <span style="color:yellow; margin-left:10px;"> *2</span>
                </div>
                <span>x总价值 30/40</span>
                </div>
            </div>`,
    })
    // Message({
    //     time:5000,
    //     showProgress: false,
    //     content: `余额不足，请重新充值`,
    // })
}

</script>
<style  lang="scss"  scoped>



.status-dot {
    position: relative;
    width: 10px;
    height: 10px;
    background-color: rgb(10, 238, 10);
    border-radius: 50%;
    /* 设置闪烁动画 */
}

.going {
    background-color: rgb(10, 238, 10);
    animation: goingflash 1s infinite alternate;
}

.waiting {
    background-color: rgb(238, 196, 10);
    animation: waitingflash 1s infinite alternate;
}

.ending {
    background-color: rgba(49, 23, 8, 0.89);

}

@keyframes waitingflash {
    0% {
        box-shadow: 0 0 5px 3px rgba(237, 251, 44, 0.7);
        /* 开始时的光晕效果 */
    }

    100% {
        box-shadow: 0 0 20px 10px rgba(0, 255, 0, 0);
        /* 闪烁后的光晕效果 */
    }
}

@keyframes goingflash {
    0% {
        box-shadow: 0 0 5px 3px rgba(0, 255, 0, 0.7);
        /* 开始时的光晕效果 */
    }

    100% {
        box-shadow: 0 0 20px 10px rgba(0, 255, 0, 0);
        /* 闪烁后的光晕效果 */
    }
}


.xbox-page {
    width: 100%;
    min-height: 100vh;
    background-color: #000000;
    background: url(https://xboxcsgo.oss-cn-hongkong.aliyuncs.com/files/xboxcsgo/red-bg.webp) no-repeat left top;
    background-size: 100% 200%;
    color: #ffffff;
    padding: 40px;
    box-sizing: border-box;

    .price-box {
        text-align: center;
        color: #ffffff;
        font-weight: 700;
        font-size: 22px;
        margin: 20px 0;
        filter: drop-shadow(0 0 10px #e42121);
    }

    button {
        width: 150px;
        height: 30px;
        font-size: 14px;
        cursor: pointer;
        margin-right: 10px;

    }

    .room-item {
        width: 500px;
        padding: 20px;
        margin: 20px;
        display: inline-block;

        .title-box {
            display: flex;
            align-items: center;
            justify-content: space-between;

        }

        .user-head {
            width: 50px;
            border-radius: 50%;
        }

        .join {
            background: linear-gradient(180deg, #ec5d35 0%, rgba(96, 107, 166, 0) 100%);
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
        }

        .show-list {
            width: 100%;
            height: 100px;
            margin-top: 20px;
            display: flex;
            overflow: hidden;
            padding: 5px 0;

            img {
                filter: brightness(220%);
                margin: 5px;
            }
        }

        .cover {
            position: absolute;
            right: 10px;
            height: 200px;
            width: 200px;
        }
    }

    .Joker {
        background: linear-gradient(144deg, #5498FF 2.92%, #101317 20.5%);
        border: 3px solid #ADCDFF;
        box-shadow: 0 0 17px #71bee9;

        button {
            border: 1px solid #ADCDFF;
            color: #ADCDFF;
            background: transparent;
        }

        .show-list {
            background: rgba(#5498FF, 0.2);

        }
    }

    .battle {
        background: linear-gradient(145deg, #e42121 2.89%, #23181E 20.36%);
        box-shadow: 0 0 17px #e97179;
        border: 2px solid #e70c0c;

        button {
            border: 1px solid #e42121;
            color: #e42121;
            background: transparent;
        }

        .show-list {
            background: rgba(#e42121, 0.1);
        }
    }
    .king {
        background: linear-gradient(145deg, #e4d021 2.89%, #23181E 20.36%);
        box-shadow: 0 0 17px #7c6b20;
        border: 2px solid #e7d80c;

        button {
            border: 1px solid #e7d80c;
            color: #e7d80c;
            background: transparent;
        }

        .show-list {
            background: rgba(#e7d80c, 0.1);
        }
    }


    .disabled {
        background: linear-gradient(145deg, #3D4655 2.89%, #2C2D34 20.36%);
        border-color: #65677d;
        border-width: 2px;
        box-shadow: none;

        button {
            border: 1px solid #65677d;
            color: #65677d;
            background: transparent;
        }

        .show-list {
            background: rgba(#000000, 0.1);

        }
    }


}
</style>