<template>

  
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
   
</template>
<script setup>
import D3Line from '@/components/D3/line.vue'
import echartLine from '@/components/echarts/line.vue'
import echartLine2 from '@/components/echarts/line2.vue'
import doubleLine from '@/components/echarts/doubleLine.vue'
</script>
<script setup>

</script>