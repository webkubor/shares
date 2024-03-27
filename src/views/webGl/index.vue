<template>

    <h2>
        webGL 
    </h2>
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