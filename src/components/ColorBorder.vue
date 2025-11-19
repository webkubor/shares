<template>
    <div class="color-card" :style="{ '--gradient': gradient }">
        <div class="window">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { computed} from 'vue';

const props = defineProps({
    colors: {
        type: Array,
        default: () => ['#ec585c', '#e7d155', '#56a8c6']
    }
});

const gradient = computed(() => {
    // 生成渐变字符串
    const colorStr = props.colors.join(', ');
    return `linear-gradient(270deg, ${colorStr}, ${props.colors[0]})`;
});
</script>

<style lang="scss" scoped>
.color-card {
    box-sizing: border-box;
    position: relative;
    transition: all 300ms cubic-bezier(0.03, 0.98, 0.53, 0.99) 0s;
    margin: 5px;
    font-size: 14px;
    border-radius: 20px;
    overflow: hidden;
}

.color-card .window {
    box-sizing: border-box;
    position: relative;
    background: var(--bg-elevated);
    color: var(--text-primary);
    border-radius: 17px;
    margin: 3px;
    padding: 16px;
    z-index: 1;
}


.color-card {
    position: relative;
    z-index: 1;
    border-radius: 20px;
    /* 移除原有 padding、background、border */
}

.color-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: 20px;
    background: var(--gradient);
    background-size: 300% 300%;
    animation: borderFlow 8s linear infinite;
}

.color-card::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: 20px;
    background: var(--gradient);
    background-size: 300% 300%;
    animation: borderFlow 8s linear infinite;
    opacity: 0.6;
    filter: blur(6px);
    pointer-events: none;
}

.color-card .window {
    position: relative;
    z-index: 1;
    background: var(--bg-elevated);
    color: var(--text-primary);
    border-radius: 17px;
    margin: 3px;
    padding: 18px;
    box-sizing: border-box;
}

@keyframes borderFlow {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 100% 50%;
    }
}


@media screen and (max-width: 400px) {
    .color-card {
        margin: 2px;

        .window {
            padding: 0px;
        }
    }
}
</style>