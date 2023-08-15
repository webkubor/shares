<template>
    <div class="spinner-box">
        <img class="loading-img" src="@/assets/logo.png" alt="">
        <div class="circle-border">
            <div class="circle-core"></div>
        </div>
    </div>
</template>
<style lang="scss" scoped >
.spinner-box {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    position: relative;

    .loading-img {
        height: 100px;
        width: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 5;
    }
}



.circle-border {
    width: 150px;
    height: 150px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #0060FD;
    box-shadow: 0px 1px 10px 0px #0061FF;
    background: linear-gradient(212deg, rgba(0, 96, 253, 0) 0%, rgba(0, 96, 253, 0.8) 100%);
    animation: spin .8s linear 0s infinite;

    .circle-core {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        border-radius: 50%;
    }
}


@keyframes rotate {
    0% {
        transform: rotateX(0) rotateY(0);
    }

    100% {
        transform: rotateX(360deg) rotateY(360deg);
    }
}


@keyframes spin {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(359deg);
    }
}
</style>