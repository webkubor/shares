<template>
    <div class="color-card">
        <div class="wrapper">
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

    .wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        background: #000000;
        border-radius: 20px;
        padding: 20px;
    }
}
</style>