<template>
    <div class="out iphone15-border">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// 获取 canvas 的引用
const canvas = ref(null);

onMounted(() => {
    const ctx = canvas.value.getContext("2d");
    const parentElement = canvas.value.parentElement;
    const w = (canvas.value.width = parentElement.offsetWidth);
    const h = (canvas.value.height = parentElement.offsetHeight);
    let hue = 217;
    let stars = [];
    let count = 0;
    const maxStars = 1200;

    // 创建缓存的 canvas，用于星星图案
    const canvas2 = document.createElement("canvas");
    const ctx2 = canvas2.getContext("2d");
    canvas2.width = 100;
    canvas2.height = 100;
    const half = canvas2.width / 2;
    const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, "#fff");
    gradient2.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
    gradient2.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
    gradient2.addColorStop(1, "transparent");

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // 随机数函数
    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }
        if (min > max) {
            const hold = max;
            max = min;
            min = hold;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 计算星星最大轨道半径
    function maxOrbit(x, y) {
        const max = Math.max(x, y);
        const diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
    }

    // 星星对象构造函数
    const Star = function () {
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 12;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 50000;
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
    };

    // 绘制星星的方法
    Star.prototype.draw = function () {
        const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
        const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
        const twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    };

    // 创建星星
    for (let i = 0; i < maxStars; i++) {
        new Star();
    }

    // 动画函数
    function animation() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = `hsla(${hue}, 64%, 6%, 1)`;
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = "lighter";
        for (let i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
        }

        window.requestAnimationFrame(animation);
    }

    // 开始动画
    animation();
});
</script>

<style scoped>
canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
}
</style>