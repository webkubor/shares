<template>
	<n-card>
		<n-space>
			<n-card title="指定路径滑动" class="card-common ">
				<div class="circle">
				</div>

			</n-card>
			<n-card title="水波纹点击" class="card-common">
				<div class="area" ref="clickAreaRef" @click="handleClick">
				</div>

			</n-card>
			<n-card title="卡片交互" class="card-common card3">
				<img
					src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=c061dab14f3709fadfa364fb1a0c0185"
					alt="Image">
				<div class="card3-content">
					<h3>Card 3</h3>
					<p>Hover to reveal more content.</p>
				</div>

			</n-card>
		</n-space>
	</n-card>

</template>
<script setup lang="ts">

import { gsap } from 'gsap';
import { onMounted, ref } from 'vue';
let clickAreaRef = ref(null)

onMounted(() => {
	animateElement()
})
function animateElement() {
	const tl = gsap.timeline();
	tl.to('.circle', { x: 200, duration: 1, ease: 'power2.inOut' })
		.to('.circle', { y: 100, duration: 1.5, ease: 'bounce' }, '-=0.5')
		.to('.circle', { x: 0, duration: 1.5, ease: 'power2.inOut' }, '-=0.5')
		.to('.circle', { y: 0, duration: 1.5, ease: 'power2.inOut' }, '-=0.5')
}



const handleClick = (event) => {
	const rect = event.currentTarget.getBoundingClientRect();
	const style = window.getComputedStyle(event.currentTarget);
	const borderTopWidth = parseInt(style.borderTopWidth);
	const paddingTop = parseInt(style.paddingTop);
	let x = event.pageX - rect.left;
	let y = event.pageY - rect.top;
	console.log(`output->rect`, x, y)
	let ripples = document.createElement("span");
	ripples.className = 'ripple-item'; // Add the ripple clas
	ripples.style.left = x + "px";
	ripples.style.top = y + "px";
	event.currentTarget.appendChild(ripples);

	setTimeout(() => {
		ripples.remove();
	}, 2000);
}
</script>
<style lang="scss" scoped>
@keyframes ripple {
	0% {
		width: 0;
		height: 0;
		opacity: 0.5;
	}

	100% {
		width: 500px;
		height: 500px;
		opacity: 0;
	}
}

.card-common {
	font-family: Arial, sans-serif;
	width: 300px;
	height: 300px;
	padding: 20px;
	border-radius: 15px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	text-align: center;
	transition: transform 0.3s, box-shadow 0.3s;

	img {
		width: 100%;
		height: auto;
		border-radius: 10px;
		margin-bottom: 15px;
	}

	&:hover {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
		transform: scale(1.05);
	}
}

.circle {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: #FFC000;
	filter: drop-shadow(0 0 20px #FFC000);
}


.area {
	width: 50%;
	height: 50%;
	border-radius: 15px;
	border: none;
	background: rgba(#f8cfd8, 0.3);
	overflow: hidden;
	cursor: pointer;
	position: relative;
	transition: all 0.3 ease-in-out;

	&:active {
		transform: scale(0.95);
		filter: drop-shadow(0 0 20px #f8cfd8);
	}

	:deep(.ripple-item) {
		position: absolute;
		background: rgba(#f8cfd8, 0.5);
		transform: translate(-50%, -50%);
		pointer-events: none;
		border-radius: 50%;
		animation: ripple 2s linear infinite;
		transition: 0.5s;
	}
}


.card3 {
	position: relative;

	.card3-content {
		opacity: 0;
		transition: opacity 0.3s;
		margin-top: -150px;
	}

	&:hover {
		.card3-content {
			opacity: 1;
		}

		img {
			opacity: 0.3;
		}

	}


}
</style>