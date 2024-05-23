<template>
    <n-space vertical>
        <n-card title="交互" style="background: #FFD7E9;">
            <button class="btn-1">
                Hover Me!
            </button>
        </n-card>
    </n-space>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
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
    color:white;
    z-index: 2; /* 确保主按钮在伪类之上 */
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

    &::before {
        content: '';
        z-index: 2; /* 确保伪类在主按钮之下 */
        background-color: rgba(255, 255, 255, 0.3);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
    filter: blur(10px);
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 15px;
    } 

    &::after {
        content: '';
        position: absolute;
        z-index: -1; /* 确保伪类在主按钮之下 */
        width: 90%;
        height: 90%;
        top: 50%;
        left: 50%;
        border-radius: 15px;
        background-color: rgb(36, 33, 228);
        transform: translateX(-50%) translateY(-50%);
        transition: all ease-in-out 0.5s;
    }

    &:hover {
        box-shadow: none;
        &::after {
            top: 48%;
            box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
            transform: rotate(15deg) translateX(-50%) translateY(-50%);
        }
    }
}
</style>
