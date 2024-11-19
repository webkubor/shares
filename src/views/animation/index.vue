<template>
        <n-card>
                <n-space>
                        <n-card title="指定路径滑动" class="border-common ">
                                <div class="circle">
                                </div>

                        </n-card>
                        <n-card title="水波纹点击" class="border-common">
                                <div class="area" ref="clickAreaRef" @click="handleClick">
                                </div>

                        </n-card>
                </n-space>
        </n-card>

</template>
<script setup lang="ts">

import { gsap } from 'gsap';
import { onMounted, ref } from 'vue';
let clickAreaRef = ref(null)

onMounted(() => {
        animateElement()
})
function animateElement() {
        const tl = gsap.timeline();
        tl.to('.circle', { x: 200, duration: 1, ease: 'power2.inOut' })
                .to('.circle', { y: 100, duration: 1.5, ease: 'bounce' }, '-=0.5')
                .to('.circle', { x: 0, duration: 1.5, ease: 'power2.inOut' }, '-=0.5')
                .to('.circle', { y: 0, duration: 1.5, ease: 'power2.inOut' }, '-=0.5')
}



const handleClick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const style = window.getComputedStyle(event.currentTarget);
        const borderTopWidth = parseInt(style.borderTopWidth);
        const paddingTop = parseInt(style.paddingTop);
        let x = event.pageX - rect.left;
        let y = event.pageY - rect.top;
        console.log(`output->rect`, x, y)
        let ripples = document.createElement("span");
        ripples.className = 'ripple-item'; // Add the ripple clas
        ripples.style.left = x + "px";
        ripples.style.top = y + "px";
        event.currentTarget.appendChild(ripples);

        setTimeout(() => {
                ripples.remove();
        }, 2000);
}
</script>
<style lang="scss" scoped>
@keyframes ripple {
        0% {
                width: 0;
                height: 0;
                opacity: 0.5;
        }

        100% {
                width: 500px;
                height: 500px;
                opacity: 0;
        }
}

.border-common {
        width: 300px;
        height: 300px;

        &:hover {
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
}

.circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: $default-gold-color;
        filter: drop-shadow(0 0 20px $default-gold-color);
}




.area {
        width: 50%;
        height: 50%;
        border-radius: 15px;
        border: none;
        background: rgba(#f8cfd8, 0.3);
        overflow: hidden;
        cursor: pointer;
        position: relative;
        transition: all 0.3 ease-in-out;

        &:active {
                transform: scale(0.95);
                filter: drop-shadow(0 0 20px #f8cfd8);
        }

        :deep(.ripple-item) {
                position: absolute;
                background: rgba(#f8cfd8, 0.5);
                transform: translate(-50%, -50%);
                pointer-events: none;
                border-radius: 50%;
                animation: ripple 2s linear infinite;
                transition: 0.5s;
        }
}
</style>