<template>
	<Login3 />
	<Login5 />
	<div class="input-layout">
		<input class="input-white" type="text" placeholder="请输入用户名" />
		<input class="input-base" type="text" placeholder="请输入用户名" />
		<input type="text" placeholder="请输入用户名" />
		<input type="text" placeholder="请输入用户名" />
		<input type="text" placeholder="请输入用户名" />
	</div>
</template>
<script setup>
import Login3 from "./components/login3.vue"
import Login5 from "./components/login5.vue"
</script>
<style lang="scss" scoped>
.input-layout {
	background: #ffffff;
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column wrap;

	input {
		margin: 10px;
		height: 45px;
		font-size: 16px;
		width: 300px;
	}
}

.input-white {
	padding: 0 10px;
	letter-spacing: 3px;
	border: none;
	outline: none;
	background-color: #ecf0f3;
	transition: 0.25s ease;
	border-radius: 8px;
	box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
	font-weight: 600;
	letter-spacing: 3px;

	&::placeholder {
		color: #a0a5a8;
		font-weight: 500;
	}
}

.input-base {
	@include input-standard(#E74C3C, #ffffff);
	color: #3b2116 !important;
	font-weight: 600;
	font-size: 18px;
}
</style>