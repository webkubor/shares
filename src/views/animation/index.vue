<template>
        <h1 class="elegantshadow">Animation</h1>
        <div class="circle">
        </div>
</template>
<script setup lang="ts">

import { gsap } from 'gsap';
import { onMounted } from 'vue';

onMounted(()=>{
    animateElement()
})
function  animateElement() {
        const tl = gsap.timeline();
        tl.to('.circle', { x: 400, duration: 1, ease: 'power2.inOut' })
        .to('.circle', { y: 100, duration: 1.5, ease: 'bounce' }, '-=0.5')
        .from(".circle", { rotation: 360, x: 400, duration: 5 , ease: 'power2.inOut'});
    }
</script>
<style lang="scss" scoped>
.circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: $default-gold-color;
        filter: drop-shadow(0 0 20px $default-gold-color);
}

</style>