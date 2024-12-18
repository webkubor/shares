<template>
    <div class="color-card">
        <div class="window">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.color-card {
    box-sizing: border-box;
    position: relative;
    transition: all 300ms cubic-bezier(0.03, 0.98, 0.53, 0.99) 0s;
    background: linear-gradient(to right, $default-primary, #ec585c, #e7d155, #56a8c6);
    border-radius: 20px;
    padding: 2px;
    margin: 5px 10px;
    border: 2px solid transparent;
    background-clip: padding-box;

    .window {
        width: 100%;
        height: 100%;
        position: relative;
        background: #000000;
        border-radius: 20px;
        padding: 20px;
        overflow: hidden;
    }

    &:hover {
        animation: borderColorChange 3s linear infinite;  /* 动画效果 */
        padding: 0px;
        box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 0.5);
    }
}

@keyframes borderColorChange {
    0% {
        border-color: #ec585c;
    }
    25% {
        border-color: #e7d155;
    }
    50% {
        border-color: #56a8c6;
    }
    75% {
        border-color: #0d7f6f;
    }
    100% {
        border-color: #ec585c;
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