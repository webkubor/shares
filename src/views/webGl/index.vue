<template>

    <h2>
        webGL 
    </h2>
    <div>
        <div id="#glcanvas"></div>
    </div>
</template>
<script setup>
import {useWebGl} from '@/hooks/useWebGl'
import { onMounted } from 'vue';
const {init} = useWebGl()
onMounted(()=>{
    init()
})

</script>
<style lang="scss" scoped>

</style>