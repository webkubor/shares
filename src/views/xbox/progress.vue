<template>
    <div class="border-bg">
        <XobxProgress :value="curProbability" :min="Number(curluckyGood.minProbability)"
            :max="Number(curluckyGood.maxProbability)" @change="onSliderChange" />
    </div>

</template>

<script lang="ts" setup>
import XobxProgress from '@/components/Gprogress.vue';
import { reactive } from 'vue';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';


const curProbability = ref(0);

let curluckyGood =reactive({
    minProbability:0,
    maxProbability:100,
    value:0
})


function onSliderChange(value) {
  curProbability.value = value;
}

</script>

<style lang="scss" scoped>
.border-bg{
    padding: 20vw;
}
</style>
