<template>
    <div class="container">
        <img src="./img/1.png">
        <img src="./img/2.png">
        <img src="./img/3.png">
        <img src="./img/4.png">
        <img src="./img/5.png">
        <img src="./img/6.png">
        <img src="./img/7.png">
    </div>
</template>
<style lang="scss" scoped>
body {
    background: #000;
}

.container {
    display: flex;
    width: 600px;
    height: 240px;
    margin: 50px auto;
}

img {
    flex: 1;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    transition: all 0.5s;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0003);
}

.container:hover> :not(:hover) {
    margin: 0 -20px;
    filter: grayscale(0.9) drop-shadow(0 0 25px #000) drop-shadow(0 0 45px #000);
    transform: perspective(500px) rotateY(45deg) scale(0.8);
}

.container :hover~img {
    transform: perspective(500px) rotateY(-45deg) scale(0.8) !important;
}
</style>