<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls} from '@tresjs/cientos'
import Model from './model.vue'
import { Color } from 'three'
</script>

<template>
    <div class="globe-container">
        <!-- clear-color="#040d21" 这里可直接覆盖画布原色 -->
        <TresCanvas window-size antialias :alpha="true" :shadows="true">
            <TresPerspectiveCamera :position='[0, 0, 300]'>
                <TresAmbientLight :color="new Color(0xbbbbbb)" :intensity="1" />
                <TresDirectionalLight :position="[-800, 2000, 400]" :color="new Color(0xffffff)" :intensity="8" />
                <TresDirectionalLight :position="[-200, 500, 200]" :color="new Color(0x798886)" :intensity="10" />
                <TresPointLight :position="[-200, 500, 200]" :color="new Color(0x2575fc)" :intensity="50" />
            </TresPerspectiveCamera>
            <Model />
            <OrbitControls :enable-damping="true" :damping-factor="0.01" :enable-pan="false" :min-distance="200"
                :max-distance="500" :rotate-speed="0.8" :zoom-speed="1" :auto-rotate="true"
                :min-polar-angle="Math.PI / 3.5" :max-polar-angle="Math.PI - Math.PI / 3" />
        </TresCanvas>
    </div>
</template>
<style lang="scss" scope>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

#app {
    width:100%;
    height:100%;
}

.globe-container {
    /* position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1; */
    cursor:pointer;
}
</style>
