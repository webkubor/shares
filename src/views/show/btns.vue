<template>
    <n-card title="按钮组">
        <n-space vertical>
            <n-card class="moon" style="background: #000000;">
                <n-space align="center" :size="[50, 30]">
                    <button class="btn-1">
                        Hover Me!
                    </button>
                    <button class="ripple-btn">Click Me</button>

                    <button class="down-btn">
                        <svg class="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z">
                            </path>
                        </svg>
                        <span class="icon2"></span>
                        <span class="tooltip">Download</span>
                    </button>
                </n-space>
            </n-card>

            <n-card class="sun" title="浅色主题">
                <n-space align="center" :size="[50, 30]">
                    <button class="btn-1">
                        Hover Me!
                    </button>
                <button class="ripple-btn">Click Me</button>
                <button class="down-btn">
                        <svg class="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z">
                            </path>
                        </svg>
                        <span class="icon2"></span>
                        <span class="tooltip">Download</span>
                    </button>
            </n-space>

            </n-card>
        </n-space>
    </n-card>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(() => {
    let btn = document.querySelectorAll("button");
    btn.forEach((btn) => {
        btn.onclick = function (e) {
            let x = e.pageX - e.target.offsetLeft;
            let y = e.pageY - e.target.offsetTop;
            let ripples = document.createElement("span");

            ripples.style.left = x + "px";
            ripples.style.top = y + "px";
            window.document.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 2000);
        };
    });
})
</script>

<style scoped lang="scss">
:root {
    --backdrop-color:#212121;
  --fill-color:#e8e8e8;
}



.sun {
  --backdrop-color: #e8e8e8; /* 默认的背景颜色 */
  --fill-color:#212121;
}

.moon {
  --backdrop-color: #212121; /* 默认的背景颜色 */
  --fill-color:#e8e8e8;
}


.btn-1 {
    position: relative;
    box-sizing: border-box;
    border-radius: 15px;
    height: 100px;
    width: 100px;
    background: transparent;

    border: 0px;
    cursor: pointer;
    outline: 0px;
    font-weight: 600;
    font-size: 14px;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    z-index: 2;
    /* 确保主按钮在伪类之上 */
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

    &::after {
        content: '';
        position: absolute;
        z-index: -1;
        /* 确保伪类在主按钮之下 */
        width: 90%;
        height: 90%;
        top: 50%;
        left: 50%;
        border-radius: 15px;
        background-color: rgba(36, 33, 228, 0.3);
        transform: translateX(-50%) translateY(-50%);
        transition: all ease-in-out 0.5s;
    }

    &:hover {
        box-shadow: none;

        &::after {
            top: 48%;
            background-color: rgba(36, 33, 228, 0.9);
            box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
            transform: rotate(15deg) translateX(-50%) translateY(-50%);
        }
    }
}



.ripple-btn {
    background: linear-gradient(270deg, #e88b00 0%, #ee3200 100%);
    color: #ffffff;
    text-align: center;
    font-weight: 600;
    padding: 20px 35px;
    cursor: pointer;
    border: none;
    font-size: 14px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    transition: all 0.2s ease-in-out;

    &::before {
        content: "";
        position: absolute;
        background-color: rgba(255, 255, 255, 0.4);
        width: 100px;
        height: 100px;
        border-radius: 50%;
        transform: scale(0);
        transition: all 0.5s ease-in-out;
        pointer-events: none;
    }

    &:hover {
        filter: drop-shadow(0 0 5px #f59403);

        &::before {
            transform: scale(2);
            opacity: 0;
        }
    }

    &:active {
        filter: drop-shadow(0 0 5px #f0000e);

        &::before {
            transform: scale(0);
            opacity: 0.4;
        }
    }
}

.down-btn {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background-color: var(--fill-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.11);

    .svgIcon {
        fill: rgb(214, 178, 255);
    }

    .icon2 {
        width: 18px;
        height: 5px;
        border-bottom: 2px solid rgb(182, 143, 255);
        border-left: 2px solid rgb(182, 143, 255);
        border-right: 2px solid rgb(182, 143, 255);
    }

    .tooltip {
        position: absolute;
        right: -105px;
        opacity: 0;
        background-color: rgb(12, 12, 12);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition-duration: .2s;
        pointer-events: none;
        letter-spacing: 0.5px;

        &::before {
            position: absolute;
            content: "";
            width: 10px;
            height: 10px;
            background-color: rgb(12, 12, 12);
            background-size: 1000%;
            background-position: center;
            transform: rotate(45deg);
            left: -5%;
            transition-duration: .3s;
        }
    }


    &:hover {
        background-color: rgb(150, 94, 255);
        transition-duration: .3s;

        .tooltip {
            opacity: 1;
            transition-duration: .3s;
        }

        .icon2 {
            border-bottom: 2px solid rgb(235, 235, 235);
            border-left: 2px solid rgb(235, 235, 235);
            border-right: 2px solid rgb(235, 235, 235);
        }

        .svgIcon {
            fill: rgb(255, 255, 255);
            animation: slide-in-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }
    }

}






@keyframes slide-in-top {
    0% {
        transform: translateY(-10px);
        opacity: 0;
    }

    100% {
        transform: translateY(0px);
        opacity: 1;
    }
}
</style>
