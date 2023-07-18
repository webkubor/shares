<template>
    <!-- 球体容器 -->
    <div class="mercury"></div>
  </template>
  
  <style lang="scss" scoped>
  @keyframes autogiration {
    from {
      background-position-x: 0px; /* 背景图片开始位置 */
    }
  
    to {
      background-position-x: -2400px; /* 背景图片结束位置，通过改变这个值实现旋转效果 */
    }
  }
  
  .mercury {
    /* 设置球体的位置和大小 */
    position: absolute;
    z-index: 3;
    left: 50%;
    top: 50%;
    margin-left: -300px;
    margin-top: -300px;
    height: 600px;
    width: 600px;
  
    /* 设置背景图片样式 */
    border-radius: 300px; /* 将图片剪切成圆形，模拟立体球体效果 */
    background: url(@/assets/3d/earth.png); /* 设置背景图片 */
    animation-name: autogiration; /* 使用定义的 @keyframes 动画 */
    animation-duration: 60s; /* 动画持续时间，球体在 60 秒内完成一次旋转 */
    animation-delay: 1s; /* 一秒后执行动画 */
    animation-iteration-count: infinite; /* 无限次播放动画 */
    animation-timing-function: linear; /* 动画以匀速运行 */
    /* 添加阴影效果，增加立体感 */
    box-shadow: -90px 20px 50px 0 black inset,
                0 0px 130px 40px rgba(73, 61, 59, 0.1) inset,
                0 0px 23px 4px rgba(230, 223, 221, 0.3) inset,
                -20px 0 60px 0 rgba(189, 183, 181, 0.3);
  }
  </style>
  