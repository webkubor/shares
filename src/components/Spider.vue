<!-- 蜘蛛网背景组件 - 动态Canvas背景 -->
<template>
    <canvas ref="canvasRef"></canvas>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { getAttr, getWindowWH, createSquare, createMouse, handleMouseMove, handleMouseOut, drawCanvas } from '@/utils/sipider';

/**
 * 蜘蛛网背景组件
 * Canvas绘制的动态蜘蛛网背景效果
 * 鼠标移动时元素会跟随互动
 */
export default {
    setup() {
        const canvasRef = ref(null);
        let canvas, ctx, squares, mouse;

        onMounted(() => {
            canvas = canvasRef.value;
            ctx = canvas.getContext("2d");
            getWindowWH(canvas);
            squares = createSquare();
            mouse = createMouse();
            window.addEventListener('mousemove', handleMouseMove(mouse));
            window.addEventListener('mouseout', handleMouseOut(mouse));
            drawCanvas(ctx, squares, mouse);
            window.addEventListener('resize', () => getWindowWH(canvas));
        });

        onUnmounted(() => {
            window.removeEventListener('mousemove', handleMouseMove(mouse));
            window.removeEventListener('mouseout', handleMouseOut(mouse));
            window.removeEventListener('resize', () => getWindowWH(canvas));
        });

        return { canvasRef };
    },
};
</script>

<style>
canvas {
    position: fixed;
    top: 0;
    left: 0;
}
</style>