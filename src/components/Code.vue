<template>
	<CodeEditor theme="github-dark" :languages="[['javascript']]" width="100%" :line-nums="true" v-model="model.code"></CodeEditor>
</template>
<script setup>
import CodeEditor from 'simple-code-editor';
import { onMounted, reactive } from 'vue';
let model = reactive({
	code: ``,
	targetCode: `import Moon from '@/components/Moon.vue';
import ColorCard from '@/components/ColorCard.vue';
import CodeVue from "@/components/Code.vue";`,
	currentIndex: 0
})

let timer = null; // 定时器
const typingSpeed = 50; // 敲打速度，单位为毫秒


onMounted(() => {
	startTyping()
})


const startTyping = () => {
	model.currentIndex = 0; // 重置索引
	model.code = ''; // 重置显示的代码
	timer = setInterval(typeNextCharacter, typingSpeed);
};

function typeNextCharacter() {
	if (model.currentIndex < model.targetCode.length) {
		model.code += model.targetCode[model.currentIndex];
		model.currentIndex++;
	} else {
		clearInterval(timer); // 敲打完成，清除定时器
		startTyping()
	}
}


</script>
<style lang="scss" scoped></style>