<template>
  <div class="login-view">
    <div class="login-box">
      <div class="header">
        <div class="title">BTC / USD</div>
        <div class="percentage">-0.52%</div>
      </div>
      <div class="board">
        <div ref="btcChart" class="chart"></div>
        <div class="form">
          <H1>Manager</H1>
          <p>Access your payment services and manage your account.</p>
          <label for="username">账号</label>
          <input id="username" type="text" placeholder="请输入账号" autocomplete="username">
          <label for="password">密码</label>
          <input id="password" type="password" placeholder="请输入密码" autocomplete="current-password">
          <button type="submit" @click="onsubmit">提交</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, reactive, onBeforeUnmount } from 'vue';

// 引用 ref 和 reactive
const btcChart = ref(null);
const state = reactive({
  hoverValue: null,
  data: [5, 6, 4, 7, 5, 6, 4],  // 初始数据
});

// 抽离的函数：生成图表选项
const createChartOption = (data) => ({
  xAxis: {
    type: 'category',
    boundaryGap: false,
    show: false,
    data: ['5 Nov', '10 Nov', '15 Nov', '20 Nov', '25 Nov', '30 Nov'],
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false },
  },
  series: [{
    data: data,
    type: 'line',
    smooth: true,
    lineStyle: {
      color: '#E74C3C',
      width: 4,
      shadowColor: 'rgba(231, 76, 60, 0.5)',
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    },
    itemStyle: { opacity: 0 },
  }],
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(44, 47, 63, 0.9)',
    borderColor: '#E74C3C',
    borderWidth: 1,
    textStyle: { color: '#fff' },
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#E74C3C',
        width: 1,
      },
    },
    formatter: tooltipFormatter,
  },
});

// 抽离的函数：tooltip 格式化回调
const tooltipFormatter = (params) => {
  state.hoverValue = params[0].data;
  return `
  <div class="echarts-tooltip">
    <div class="tooltip-value">Value: ${params[0].data}</div>
  </div>
`;
};

// 抽离的函数：事件处理
const setupChartEvents = (chart, option) => {
  chart.on('mouseout', () => {
    state.hoverValue = null;
  });

  chart.on('highlight', () => {
    const series = option.series[0];
    series.lineStyle.width = 6;
    chart.setOption(option);
  });

  chart.on('downplay', () => {
    const series = option.series[0];
    series.lineStyle.width = 4;
    chart.setOption(option);
  });
};

// 模拟数据变化的函数
const updateChartData = (chart) => {
  // 每 5 秒生成新的随机数据，并更新图表
  setInterval(() => {
    // 生成新的数据
    state.data = state.data.map(() => (Math.random() * 10).toFixed(2));

    // 更新图表选项
    const newOption = createChartOption(state.data);
    chart.setOption(newOption);
  }, 5000);  // 5 秒更新一次
};

onMounted(() => {
  const chart = echarts.init(btcChart.value);
  const option = createChartOption(state.data);
  chart.setOption(option);

  setupChartEvents(chart, option);
  updateChartData(chart);  // 启动数据更新定时器
});

// 清理定时器
onBeforeUnmount(() => {
  clearInterval(updateChartData);
});




function onsubmit() {
  window.$toast.success('登录成功');
}

</script>

<style lang="scss" scoped>
$bg-color: #2c3e50;
$theme-color: #E74C3C;

// 使用 mixin
input {
  @include input-standard($theme-color, $bg-color);
}

button {
  margin-top: 20px;
  @include button-standard($theme-color, #323753);
}

.form {
  color: $theme-color;

  label {
    font-size: 14px;
    display: inline-block;
  }

  input {
    display: inline-block;
  }
}

.login-view {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

    .board {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header {
      .title {
        display: inline-block;
      }

      .percentage {
        color: #E74C3C;
        margin-left: 20px;
        display: inline-block;
      }
    }


    .chart {
      width: 400px;
      height: 400px;
    }
  }
}
</style>
