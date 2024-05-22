<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Line } from '@antv/g2plot';

export default {
  name: 'LineChart',
  setup() {
    const chart = ref(null);
    let lineChart = null;

    const data1 = [
      { date: '25.07', value: 220342.76, series: 'Series 1' },
      { date: '26.07', value: 230000, series: 'Series 1' },
      { date: '27.07', value: 220000, series: 'Series 1' },
      { date: '28.07', value: 210000, series: 'Series 1' },
      { date: '29.07', value: 220342.76, series: 'Series 1' },
      { date: '30.07', value: 200000, series: 'Series 1' },
      { date: '31.07', value: 190000, series: 'Series 1' },
      { date: '01.08', value: 195000, series: 'Series 1' }
    ];

    const data2 = [
      { date: '25.07', value: 180000, series: 'Series 2' },
      { date: '26.07', value: 190000, series: 'Series 2' },
      { date: '27.07', value: 185000, series: 'Series 2' },
      { date: '28.07', value: 175000, series: 'Series 2' },
      { date: '29.07', value: 180000, series: 'Series 2' },
      { date: '30.07', value: 170000, series: 'Series 2' },
      { date: '31.07', value: 160000, series: 'Series 2' },
      { date: '01.08', value: 165000, series: 'Series 2' }
    ];

    const data = [...data1, ...data2];

    onMounted(() => {
      lineChart = new Line(chart.value, {
        data,
        xField: 'date',
        yField: 'value',
        seriesField: 'series',
        smooth: true, // 平滑曲线
        // 配置图例
        legend: {
          position: 'top-right'
        },
        // 配置渐变区域填充
        area: {
          style: ({ series }) => {
            if (series === 'Series 1') {
              return {
                fill: 'l(270) 0:rgba(123, 97, 255, 0) 1:rgba(123, 97, 255, 0.5)' // 调整渐变方向
              };
            }
            return {
              fill: 'l(270) 0:rgba(52, 180, 235, 0) 1:rgba(52, 180, 235, 0.5)' // 调整渐变方向
            };
          },
        },
        color: ({ series }) => {
          if (series === 'Series 1') {
            return 'l(0) 0:rgba(123, 97, 255, 0.1) 0.5:#7B61FF 1:rgba(123, 97, 255, 0.1)';
          }
          return 'l(0) 0:rgba(52, 180, 235, 0.1) 0.5:#34b4eb 1:rgba(52, 180, 235, 0.1)';
        },
        lineStyle: ({ series }) => {
          if (series === 'Series 1') {
            return {
              stroke: 'l(0) 0:rgba(123, 97, 255, 0.1) 0.5:#7B61FF 1:rgba(123, 97, 255, 0.1)',
              lineWidth: 3,
            };
          }
          return {
            stroke: 'l(0) 0:rgba(52, 180, 235, 0.1) 0.5:#34b4eb 1:rgba(52, 180, 235, 0.1)',
            lineWidth: 3,
          };
        },
        tooltip: {
          customContent: (title, items) => {
            const tooltipItems = items.map(item => `
              <li style="color:${item.color}">
                ${item.name}: ${item.value.toLocaleString()}
              </li>
            `).join('');
            return `<div class="custom-tooltip">
              <div class="custom-tooltip-title">${title}</div>
              <ul>${tooltipItems}</ul>
            </div>`;
          }
        },
        // 调整Y轴的范围
        yAxis: {
          min: 150000, // 适当调整Y轴的最小值，使数据点贴近Y轴
          max: 250000, // 适当调整Y轴的最大值，使数据点贴近Y轴
        },
        // 调整图表的padding
        padding: [10, 20, 50, 40], // 上, 右, 下, 左
      });
      lineChart.render();

      // 监听窗口的resize事件，使图表自适应窗口大小
      window.addEventListener('resize', resizeChart);
    });

    const resizeChart = () => {
      if (lineChart) {
        lineChart.changeSize(window.innerWidth, 400);
      }
    };

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeChart);
      if (lineChart) {
        lineChart.destroy();
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

.custom-tooltip {
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
}

.custom-tooltip-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.custom-tooltip ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
