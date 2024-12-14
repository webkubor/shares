<template>
    <div>
        <h2>OCR 识别示例</h2>
        <input type="file" @change="handleFileUpload" />
        {{ progress }}
        <p v-if="loading">正在识别中...</p>
        <p v-else>识别结果：{{ result }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Tesseract from "tesseract.js";
const result = ref(""); // 存储 OCR 识别结果
const loading = ref(false); // 识别状态
let progress = ref(0); // 识别进度
const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const image = e.target.result;
            loading.value = true;

            try {
                const { data } = await Tesseract.recognize(image, "chi_sim", {
                    logger: (info) => {
                        if (info.status === "recognizing text") {
                            progress.value = Math.round(info.progress * 100);
                        }
                    },
                });
                result.value = data.text; // 提取识别的文本
            } catch (error) {
                console.error("OCR 错误：", error);
                result.value = "识别失败";
            } finally {
                loading.value = false;
            }
        };
        reader.readAsDataURL(file); // 读取图片数据为 Base64
    }
};
</script>
