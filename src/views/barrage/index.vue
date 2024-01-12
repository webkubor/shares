<template>
    <div class="barrage">
        <MovieCom src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"></MovieCom>
        <Board></Board>
    </div>
</template>
<script setup lang="ts">
import Board from './components/Board.vue'

document.title = "弹幕测试"

</script>
<style lang="scss" scoped>
.barrage {
     background: #000000;
    color: #ffffffff;
    height: 100vh;
    position: relative;
}
</style>