<template>

    <div class="common-bg-move page-bg"></div>
    <div class="common-title">webkubor

        <span class="more">UI</span>
    </div>
    <MovieCom :barrage="true" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"></MovieCom>
</template>
<script setup lang="ts">
document.title = "弹幕测试"
</script>
<style scoped lang="scss">

.page-bg {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
}




</style>
