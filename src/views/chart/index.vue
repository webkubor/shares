<template>
    <n-space vertical>
        <n-card title="echart折线图">
            <echartLine />

        </n-card>
        <n-card title="echart折线图-图例改造">
            <echartLine2 />
        </n-card>

        <n-card title="echart折线图-混合">
            <doubleLine />
        </n-card>
        <n-card title="echart折线图-g2plot">
            <g2plotLine />
        </n-card>
        <n-card title="echart环形图">
            <PieChart></PieChart>
        </n-card>
    </n-space>

</template>
<script setup>
import echartLine from '@/views/chart/components/line.vue'
import echartLine2 from '@/views/chart/components/line2.vue'
import doubleLine from '@/views/chart/components/doubleLine.vue'
import g2plotLine from '@/views/chart/components/g2plotLine.vue'
import PieChart from "@/views/chart/components/pie.vue"

</script>
