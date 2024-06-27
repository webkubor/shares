<template>

    <div class="login-view">
        <div class="login-box">
            <div>
                <div class="title">BTC / USD</div>
                <div class="percentage">-0.52%</div>
            </div>
        
            <div ref="btcChart" class="chart"></div>
        </div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';

import { onMounted, ref,reactive } from 'vue';
const btcChart = ref(null);
const state = reactive({
      hoverValue: null
    });
const option = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        show: false,
        data: ['5 Nov', '10 Nov', '15 Nov', '20 Nov', '25 Nov', '30 Nov'],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false }
    },
    yAxis: {
        type: 'value',
        axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false }
    },
    series: [{
        data: [5, 6, 4, 7, 5, 6, 4],
        type: 'line',
        smooth: true,
        smooth: true,
        lineStyle: {
            color: '#E74C3C',
            width: 4,
            shadowColor: 'rgba(231, 76, 60, 0.5)',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0
          },
          itemStyle: {
            opacity: 0
          }
        //   areaStyle: {
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       { offset: 0, color: 'rgba(231, 76, 60, 0.5)' },
        //       { offset: 1, color: 'rgba(231, 76, 60, 0)' }
        //     ])
        //   }
    }],
    tooltip: {
        trigger: 'axis',
          backgroundColor: 'rgba(44, 47, 63, 0.9)',
          borderColor: '#E74C3C',
          borderWidth: 1,
          textStyle: {
            color: '#fff'
          },
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#E74C3C',
              width: 1
            }
          },
          formatter: function (params) {
            state.hoverValue = params[0].data;
            return `
              <div class="echarts-tooltip">
                <div class="tooltip-value">Value: ${params[0].data}</div>
              </div>
            `;
          }
        }
};

onMounted(() => {
    const chart = echarts.init(btcChart.value);
    chart.setOption(option);
    chart.on('mouseout', () => {
        state.hoverValue = null;
      });
      chart.on('highlight', (event) => {
        const series = option.series[0];
        series.lineStyle.width = 6;
        chart.setOption(option);
      });

      chart.on('downplay', (event) => {
        const series = option.series[0];
        series.lineStyle.width = 4;
        chart.setOption(option);
      });
})

</script>
<style lang="scss">

.login-view {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    padding: 80px;
    background: #3F4566;

    .login-box {
        width: 100%;
        height: 100%;
        background: #333854;
        border-radius: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        background: linear-gradient(to right bottom, #444A6F, #272C43);
        display: flex;
        flex-direction: column;
        padding: 50px;
        box-sizing: border-box;
        position: relative;
        color: #ffffff;
        font-size: 20px;

        .title {
            display: inline-block;
        }

        .percentage {
            color: #E74C3C;
            margin-left: 20px;
            display: inline-block;
        }
        .chart {
           width: 400px;
           height: 400px;
        }

    }
}
</style>