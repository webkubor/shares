<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';


    const chart = ref(null);
    let myChart = null;

    const data = [
      { date: '25.07', value: 220342.76 },
      { date: '26.07', value: 230000 },
      { date: '27.07', value: 220000 },
      { date: '28.07', value: 210000 },
      { date: '29.07', value: 220342.76 },
      { date: '30.07', value: 200000 },
      { date: '31.07', value: 190000 },
      { date: '01.08', value: 195000 }
    ];

    onMounted(() => {
      myChart = echarts.init(chart.value);
      const option = {
        title: {
          text: '折线图示例',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['TSD'],
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: data.map(d => d.date)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: 'TSD',
          type: 'line',
          smooth: true,
          data: data.map(d => d.value),
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(75, 192, 192, 0.5)' },
              { offset: 1, color: 'rgba(75, 192, 192, 0.1)' }
            ])
          },
          lineStyle: {
            color: 'rgba(75, 192, 192, 1)'
          },
          itemStyle: {
            color: 'rgba(75, 192, 192, 1)'
          }
        }]
      };
      myChart.setOption(option);

      window.addEventListener('resize', resizeChart);
    });

    const resizeChart = () => {
      if (myChart) {
        myChart.resize();
      }
    };

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeChart);
      if (myChart) {
        myChart.dispose();
      }
    });

   
</script>

<style>
.chart {
  width: 50vw;
  height: 400px;
}
</style>
