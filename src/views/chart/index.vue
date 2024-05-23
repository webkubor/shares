<template>
 <n-space vertical>
    <n-card title="D3折线图"> 
        <D3Line />

    </n-card>

    <n-card title="echart折线图">
        <echartLine/>

    </n-card>
    <n-card title="echart折线图-图例改造">
        <echartLine2/>
    </n-card>

    <n-card title="echart折线图-混合">
        <doubleLine/>
    </n-card>
    <n-card title="echart折线图-g2plot">
        <g2plotLine/>
    </n-card>
 </n-space>

</template>
<script setup>
import D3Line from '@/components/D3/line.vue'
import echartLine from '@/components/echarts/line.vue'
import echartLine2 from '@/components/echarts/line2.vue'
import doubleLine from '@/components/echarts/doubleLine.vue'
import g2plotLine from '@/components/g2plot/doubleLine.vue'
</script>
