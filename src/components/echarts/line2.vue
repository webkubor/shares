<template>
    <div ref="chart" class="chart"></div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import * as echarts from 'echarts';
  
  export default {
    name: 'LineChart2',
    setup() {
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
          // 配置提示框
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              const date = params[0].axisValue;
              const value = params[0].data;
              const percentageChange = '+5.6%'; // 可以根据你的数据动态计算
              return `${date}<br />${value.toLocaleString()}<br />${percentageChange}`;
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: [10, 15],
            borderRadius: 10,
            textStyle: {
              color: '#fff',
              fontSize: 14,
            }
          },
          // 配置X轴
          xAxis: {
            type: 'category',
            data: data.map(d => d.date),
            axisLine: {
              lineStyle: {
                color: '#E0E0E0' // X轴的颜色
              }
            },
            axisTick: {
              show: false // 不显示刻度
            },
            axisLabel: {
              color: '#666' // X轴标签的颜色
            }
          },
          // 配置Y轴
          yAxis: [
            {
              type: 'value',
              axisLine: {
                show: false // 不显示Y轴的轴线
              },
              axisTick: {
                show: false // 不显示刻度
              },
              axisLabel: {
                color: '#666' // Y轴标签的颜色
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed', // 虚线
                  color: '#E0E0E0' // 分割线的颜色
                }
              }
            },
            {
              type: 'value',
              show: false // 隐藏第二个Y轴
            }
          ],
          // 配置数据系列
          series: [{
            name: 'TSD',
            type: 'line',
            smooth: true, // 圆滑曲线
            data: data.map(d => d.value),
            lineStyle: {
              width: 3, // 线条宽度
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: 'rgba(123, 97, 255, 0.1)' },
                { offset: 0.5, color: '#7B61FF' },
                { offset: 1, color: 'rgba(123, 97, 255, 0.1)' }
              ]) // 线条渐变颜色
            },
            itemStyle: {
              color: '#7B61FF', // 数据点颜色
              borderColor: '#fff', // 数据点边框颜色
              borderWidth: 2 // 数据点边框宽度
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(123, 97, 255, 0.5)' },
                { offset: 1, color: 'rgba(123, 97, 255, 0)' }
              ])
            },
            emphasis: {
              focus: 'series', // 鼠标悬停时高亮整个系列
              itemStyle: {
                color: '#7B61FF' // 鼠标悬停时的点颜色
              },
              lineStyle: {
                width: 4 // 鼠标悬停时的线条宽度
              }
            }
          }]
        };
        myChart.setOption(option);
  
        // 监听窗口的resize事件，使图表自适应窗口大小
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
  
      return {
        chart,
      };
    },
  };
  </script>
  
  <style>
  .chart {
    width: 100%;
    height: 400px;
  }
  </style>
  