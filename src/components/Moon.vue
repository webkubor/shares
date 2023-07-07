<template>
    <div class="satellite-orbits">
  <div class="mercury "></div>
    </div>
  
</template>
<style lang="scss" scoped>
@keyframes autogiration {
    from {
        background-position-x: 0px;
    }

    to {
        background-position-x: -2400px;
    }
}


.mercury {
    position: absolute;
    z-index: 3;
    left: 50%;
    top: 50%;
    margin-left: -300px;
    margin-top: -300px;
    height: 600px;
    width: 600px;
    // background-size: 800px 600px !important;
    border-radius: 300px;
    background: url(@/assets/3d/moon.jpg);
    //矫正
    transform: rotateX(-70deg) scaleY(2);
    animation-name: autogiration;
    //动画名称
    animation-duration: 60s;
    //持续时间
    animation-delay: 1s;
    //一秒后执行
    animation-iteration-count: infinite;
    //无限次播放
    animation-timing-function: linear;
    //添加阴影
    box-shadow: -90px 20px 50px 0 black inset, 0 0px 130px 40px rgba(73, 61, 59, 0.1) inset, 0 0px 23px 4px rgba(230, 223, 221, 0.3) inset, -20px 0 60px 0 rgba(189, 183, 181, 0.3);
}

.satellite-orbits {
    height: 1000px;
    width: 1000px;
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    margin-left: -500px;
    margin-top: -500px;
    border: 7px solid rgba(181, 187, 189, 0.2);
    border-radius: 50%;
    transform: scaleY(0.5) rotateX(70deg); //压缩
    border-radius: 50%;
    transform-style: preserve-3d; //子元素是位于 3D 空间中
    animation-name: operation; //动画名称
    animation-duration: 60s; //持续时间
    animation-delay: 1s; //一秒后执行
    animation-iteration-count: infinite; //无限次播放
    animation-timing-function: linear; //均速


}
</style>