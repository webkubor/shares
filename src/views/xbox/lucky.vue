<template>
    <div class="lucky-page">
        <h1>幸运饰品特效</h1>
        <div class="center">
            <img src="@/assets/xbox/circle.png" alt="" srcset="">
        </div>
    </div>
</template>


<script setup>
import { onMounted } from 'vue';
</script>
<style lang="scss" scoped>

.lucky-page{
    width: 100%;
    height: 100vh;
    background: #000000;
    display: flex;
    justify-content: center;
    .center {
        img {
            width: 300px;
            filter: drop-shadow(0  0 10px #da370e);
        }
    }
}
</style>