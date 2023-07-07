<template>
	<CodeEditor theme="github-dark" :languages="[['javascript']]" width="100%" :line-nums="true" v-model="model.code"></CodeEditor>
</template>
<script setup>
import  highlight from 'highlight'
import CodeEditor from 'simple-code-editor';
import { onMounted, reactive } from 'vue';
let model = reactive({
	code: ``,
	targetCode: `import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/hooks/useTheme";
import { getRandomType } from "@/utils/random";
import { useI18n } from "vue-i18n";
import {computed}  from "vue"
const { t, locale } = useI18n();
let { user, updateAge } = useUser();
let { swtichTheme } = useTheme();
console.log(user, "我的");


updateAge("logo.jpeg");
const language = computed(() =>
  locale.value === "zh-CN" ? "中文" : "English"
);

const toggleLocale = () => {
  locale.value = locale.value === "zh-CN" ? "en" : "zh-CN";
};

`,
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