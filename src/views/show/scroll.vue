
<!-- 记住，只有具有滚动条并且内容溢出的元素才能触发 scroll 事件 -->
<template>
    <div id="card-container">
        <div class="card magictime" v-for="(item, index) in numbers" :key="index">Card {{ item }}</div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, nextTick } from 'vue';
let numbers = Array.from({ length: 100 }, (_, index) => index + 1);
onMounted(async () => {
    await nextTick(); // 等待DOM更新
    let Dom = getDom('card-container')
    if (Dom) {
        console.log('获取到了事');
        // 添加滚动事件监听
        Dom.addEventListener('scroll', function () {
            // 获取卡片列表中所有卡片元素
            const cards = document.querySelectorAll('.card');

            // 遍历卡片元素
            cards.forEach(card => {
                // 计算卡片的可见性
                const top = card.offsetTop;
                const height = card.offsetHeight;
                const containerTop = Dom.scrollTop;
                const containerHeight = Dom.offsetHeight;

                if (top >= containerTop && top + height <= containerTop + containerHeight) {
                    // 如果卡片完全在可见区域内，则添加动画类
                    card.classList.add( 'puffIn'); 
                } else {
                    // 如果卡片不在可见区域内，则移除动画类
                    card.classList.remove( 'puffIn');
                }
            });
        });
    }

})

function getDom(id: string) {
    return document.getElementById(id)
}
</script>
<style lang="scss" scoped>
#card-container {
    height: 500px;
    overflow: auto;
    border: orangered 1px solid;

    .card {
        width: 200px;
        height: 100px;
        margin: 10px;
        border: 1px solid #ccc;
        padding: 10px;
        background-color: #f0f0f0;
        /* 添加动画效果的类 */
        animation-duration: 1s;
        animation-fill-mode: both;
    }
}
</style>