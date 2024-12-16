<template>

    <div class="input-layout">
        <div class="common-title">
            Input Styles
        </div>
        <input class="input-white" type="text" placeholder="请输入用户名" />
        <input class="input-base" type="text" placeholder="请输入用户名" />
        <input type="text" placeholder="请输入用户名" />
        <input type="text" placeholder="请输入用户名" />
        <n-input type="text" style="width:300px;" id="search-input" placeholder="请输入用户名" />
    </div>

</template>
<script setup lang="ts">
import { createSearchHistory } from '@/utils/useSearchHistory';
import { onMounted } from 'vue';

const searchHistory = createSearchHistory({
    key: "search-history", // 指定 localStorage 的存储键
    limit: 999,
    filter: (item, query) => item.toLowerCase().includes(query.toLowerCase()), // 忽略大小写的模糊匹配
    renderItem: (item) => `<li class="history-item">${item}</li>`, // 自定义渲染样式
});
onMounted(() => {
    const input = document.querySelector<HTMLInputElement>("#search-input");
    if (input) {
        searchHistory.attachToInput(input);
    }
})



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
        color: #333333;
    }

    .common-title {
        letter-spacing: 5px;
        color: #e6e6e6;
        text-shadow: 1px -1px #ffffff, -1px 1px #999999, -4px 4px 10px #80808080;
        font-size: 70px;
        line-height: 2;
        text-align: center;
        font-weight: bold;

        &:hover {
            color: #3b2116;
            cursor: pointer;
        }
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