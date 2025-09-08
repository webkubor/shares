<template>
       <div class="earth-page">
              <Globe />
       </div>
</template>
<script setup>
import Globe from '@/components/Globe/earth.vue';

</script>
<style lang="scss" scope>
.earth-page {
       width: 100%;
       height: 100vh;
       position: relative;
       overflow: hidden;
       border: 1px solid #ffffff;
}
</style>