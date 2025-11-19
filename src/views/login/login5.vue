<template>
  <div class="login-view">
    <div class="login-box">
      <div class="header">
        <div class="title">BTC / USD</div>
        <div class="percentage">-0.52%</div>
      </div>
      <div class="board">
        <div class="chart">
          <svg viewBox="0 0 100 50" class="price-chart">
            <path d="M0,25 L20,20 L40,30 L60,15 L80,35 L100,25" 
                  class="price-line" 
                  fill="none" 
                  stroke="#E74C3C" 
                  stroke-width="2"/>
          </svg>
        </div>
        <div class="form">
          <div class="title">Manager</div>
          <p>Access your payment services and manage your account.</p>
          <label for="username">账号</label>
          <input id="username" type="text" v-history placeholder="请输入账号" autocomplete="username">
          <label for="password">密码</label>
          <input id="password" type="password" placeholder="请输入密码" autocomplete="current-password">
          <button type="submit" @click="onsubmit">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

function onsubmit() {
  window.$message.success('登录成功');
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

$bg-color: #2c3e50;
$theme-color: #E74C3C;

@keyframes drawLine {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.price-chart {
  width: 100%;
  height: 100%;
  .price-line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawLine 2s ease-in-out forwards;
    filter: drop-shadow(0 0 5px rgba(231, 76, 60, 0.5));
  }
}

button {
  margin-top: 20px;
  @include button-standard($theme-color);
  background: #2c335e;
}

.form {
  color: $theme-color;
  .title {
    font-size: 35px;
    font-weight: 600;
  }

  label {
    font-size: 14px;
    display: inline-block;
  }

  input {
    @include input-standard($theme-color, $bg-color);
    display: inline-block;
  }
}

.login-view {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px;
  background: #3F4566;
  box-sizing: border-box;

  .login-box {
    width: 100%;
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

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .title {
        font-size: 24px;
        font-weight: bold;
      }

      .percentage {
        color: #E74C3C;
        font-size: 18px;
      }
    }

    .board {
      display: flex;
      gap: 20px;

      .chart {
        flex: 1;
        height: 200px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        padding: 20px;
      }

      .form {
        flex: 1;
        padding: 20px;
      }
    }
  }
}
</style>
