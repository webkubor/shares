<template>
    <div class="container iphone15-border">
        <div class="ground">
            <div class="ball"></div>
        </div>
    </div>

</template>
<style lang="scss" scoped>
.container {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ground {
    position: relative;
    width: 80%;
    height: 10px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(52, 152, 219, 1) 50%, rgba(52, 152, 219, 0) 100%);
    box-shadow: 0 0 20px rgba(52, 152, 219, 1);
    animation: glow 4s infinite;
}

.ball {
    width: 50px;
    height: 50px;
    background: radial-gradient(circle, #3498db, #cfdbe3);
    border-radius: 50%;
    position: absolute;
    bottom: 10px; /* Align with the ground */
    left: calc(50% - 25px);
    animation: bounce 2s infinite ease-in-out, colorChange 4s infinite, sizeChange 2s infinite;
    filter: drop-shadow(0 0 10px #3498db);
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-150px);
    }
    60% {
        transform: translateY(-75px);
    }
}

@keyframes colorChange {
    0% {
        background: radial-gradient(circle, #80bbe2, #4fc9eb);
        filter: drop-shadow(0 0 10px #3498db);
    }
    50% {
        background: radial-gradient(circle, #3c4de7, #1d8bd5);
        filter: drop-shadow(0 0 20px #2bcff0);
    }
    100% {
        background: radial-gradient(circle, #80bbe2, #4fc9eb);
        filter: drop-shadow(0 0 10px #3498db);
    }
}

@keyframes sizeChange {
    0%, 100% {
        width: 50px;
        height: 50px;
    }
    50% {
        width: 60px;
        height: 60px;
    }
}

@keyframes glow {
    0%, 100% {
        box-shadow: 0 0 20px rgba(52, 152, 219, 1);
    }
    50% {
        box-shadow: 0 0 40px rgba(52, 152, 219, 1);
    }
}
</style>
