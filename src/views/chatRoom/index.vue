<template>
    <div class="room-bg">
        <div class="chat-room">
            <LeftNav />
            <directory />
            <Window />
        </div>

    </div>
</template>
<script setup>
import LeftNav from "./components/leftNav.vue"
import directory from "./components/directory.vue"
import Window from "./components/window.vue"
</script>
<style lang="scss" scoped>
.room-bg {
    width: 100%;
    box-sizing: border-box;
    height: 100vh;
    overflow: hidden;
    background: url(https://cdn.pixabay.com/photo/2016/10/21/15/59/sun-1758348_1280.jpg);
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .chat-room {
        width: 80vw;
        height: 46.875vw;
        @include glass-effect(rgba(255, 255, 255), 10, 0.4);
        display: flex;
    }
}
</style>