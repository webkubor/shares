<template>
    <div class="loading-container iphone15-border">
        <img class="loading-img" src="@/assets/logo.png" alt="">
        <div class="sk-chase">
            <div class="sk-chase-dot">
            </div>
            <div class="sk-chase-dot">
            </div>
            <div class="sk-chase-dot">
            </div>
            <div class="sk-chase-dot">
            </div>
            <div class="sk-chase-dot">
            </div>
            <div class="sk-chase-dot">
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    position: relative;


    .loading-img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 100px;
        width: 100px;
    }
}


.sk-chase {
    width: 135px;
    height:135px;
    position: relative;
    animation: sk-chase 2.5s infinite linear both;

}

.sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: sk-chase-dot 2.0s infinite ease-in-out both;
}

.sk-chase-dot:before {
    content: '';
    display: block;
    width: 15%;
    height: 15%;
    background-color: #0061FF;
    border-radius: 100%;
    animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
    box-shadow: 0px 1px 10px 0px #0061FF;
}

.sk-chase-dot:nth-child(1) {
    animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2) {
    animation-delay: -1.0s;
}

.sk-chase-dot:nth-child(3) {
    animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4) {
    animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5) {
    animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6) {
    animation-delay: -0.6s;
}

.sk-chase-dot:nth-child(1):before {
    animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2):before {
    animation-delay: -1.0s;
}

.sk-chase-dot:nth-child(3):before {
    animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4):before {
    animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5):before {
    animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6):before {
    animation-delay: -0.6s;
}

@keyframes sk-chase {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes sk-chase-dot {

    80%,
    100% {
        transform: rotate(360deg);
    }
}

@keyframes sk-chase-dot-before {
    50% {
        transform: scale(1);
    }

    100%,
    0% {
        transform: scale(0.4);
    }
}
</style>