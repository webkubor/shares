<template>

    <div class="input-layout">
        <div class="common-title-white">
            Input Styles
        </div>
        <n-input type="text" style="width:300px;" v-history placeholder="UI 框架" />
        <input class="input-white" type="text" v-history placeholder=" 测试输入框 1" />
        <input class="input-base" type="text" v-history  placeholder=" 测试输入框 2" />
        <input type="text" v-history  placeholder=" 测试输入框 3" />
        <input type="text" v-history placeholder="测试输入框 4" />
    </div>

</template>
<script setup lang="ts">
import { onMounted } from 'vue';

</script>
<style lang="scss" scoped>
.input-layout {
    background: #ffffff;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;

    input {
        margin: 10px;
        height: 45px;
        font-size: 16px;
        width: 300px;
        color: #333333;
    }
}

.input-white {
    padding: 0 10px;
    letter-spacing: 3px;
    border: none;
    outline: none;
    background-color: #ecf0f3;
    transition: 0.25s ease;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
    font-weight: 600;
    letter-spacing: 3px;

    &::placeholder {
        color: #a0a5a8;
        font-weight: 500;
    }
}

.input-base {
    @include input-standard(#E74C3C, #ffffff);
    color: #3b2116 !important;
    font-weight: 600;
    font-size: 18px;
}
</style>