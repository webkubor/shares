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

    .window {
        width: 100%;
        height: 100%;
        position: relative;
        background: #000000;
        border-radius: 20px;
        padding: 20px;
    }

    &:hover {
        box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 0.5);
        padding: 4px;
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