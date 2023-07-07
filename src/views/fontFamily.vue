<template>
    <svg viewBox="0 0 700 200">
	<text x="0" y="70%" id="timelinetext"> Tarspay </text>
</svg>	
</template>
<style style="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Bangers&family=Homemade+Apple&family=Sacramento&display=swap");

html, body {
	width: 100%;
	height: 100%;
	display: flex;
	font-family: "Bangers", cursive;
	background: #000;
}

svg {
	position: fixed;
	width: 1200px;
	height: 300px;
	margin: auto;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

svg text {
	text-transform: uppercase;
	letter-spacing: 10px;
	font-size: 150px;
	animation: stroke 5s infinite alternate;
}
@keyframes stroke {
	0% {
		fill: rgba(72, 138, 20, 0);
		stroke: rgba(54, 95, 160, 1);
		stroke-dashoffset: 25%;
		stroke-dasharray: 0 50%;
		stroke-width: 0.8;
	}
	70% {
		fill: rgba(72, 138, 20, 0);
		stroke: rgba(54, 95, 160, 1);
		stroke-width: 1.2;
	}
	85% {
		fill: rgba(72, 138, 20, 0);
		stroke: rgba(54, 95, 160, 1);
		stroke-width: 1.5;
	}
	95%,
	100% {
		fill: rgba(72, 138, 204, 1);
		stroke: rgba(54, 95, 160, 0);
		stroke-dashoffset: -25%;
		stroke-dasharray: 50% 0;
		stroke-width: 0;
	}
}



</style>