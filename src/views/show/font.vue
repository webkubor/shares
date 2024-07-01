<template>
    <h2>我是百晓生封面选择</h2>
    <n-space>
        <n-card title="彩云字体设计">
            <div class="type-chinese1" @click="selectFont('type-chinese1')"
                :class="{ selected: selectedFont === 'type-chinese1' }">
                <p class="vertical-text">
                    {{ textContent }}
                </p>
            </div>
        </n-card>
        <n-card title="白鸽天行体">
            <div class="type-chinese2" @click="selectFont('type-chinese2')"
                :class="{ selected: selectedFont === 'type-chinese2' }">
                <p class="vertical-text">
                    {{ textContent }}
                </p>
            </div>
        </n-card>
        <n-card title="Aa墨韵行书">
            <div class="type-chinese3" @click="selectFont('type-chinese3')"
                :class="{ selected: selectedFont === 'type-chinese3' }">
                <p class="vertical-text">
                    {{ textContent }}
                </p>
            </div>
        </n-card>
    </n-space>
    <n-space>
        <div v-for="(book, index) in books" :key="index" class="book"
            :class="[book.bg, { selected: selectedBook === index + 1 }]" @click="selectBook(index + 1)">
            <div :class="selectedFont">
                <div class="title vertical-text">
                    <span>
                        我是
                    </span>
                    <span class="big">
                        百晓生
                    </span>
                    
                </div>
                <div class="author vertical-text">苏梦城 著</div>
                <!-- <div class="author2">苏梦城&nbsp;著</div> -->
                <p class="vertical-text other">
                    {{ textContent }}
                </p>
            </div>
        </div>
    </n-space>
</template>

<script setup>
import { ref } from 'vue'

const selectedFont = ref('type-chinese1')
const selectedBook = ref(1)
const textContent = ref('曲断天涯\u00A0剑道情长')

const books = ref([
    { bg: 'bg1' },
    { bg: 'bg2' },
    { bg: 'bg3' },
    { bg: 'bg4' },
])

function selectFont(fontClass) {
    selectedFont.value = fontClass
}

function selectBook(bookIndex) {
    selectedBook.value = bookIndex
}
</script>

<style lang="scss" scoped>
.book {
    width: 600px;
    height: 800px;
    position: relative;
    cursor: pointer;
    transition: border 0.3s;
}

.author2 {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 50px;
}

.author {
    position: absolute;
    top: 70px;
    left: 110px;
    font-size: 30px;
}

.other {
    position: absolute;
    top: 30px;
    left: 20px;
    font-size: 30px;
}

.title {
    position: absolute;
    top: 30px;
    right: -10px;

    .big {
        font-size: 150px;
        position: relative;
        top: -60px;
        text-shadow: 
    0 0 1px black,
    0 0 1px black,
    0 0 1px black,
    0 0 1px black,
    0 0 1px black;
    }

    span {
        position: relative;
        font-size: 60px;
    }
}

.bg1 {
    background: url(@/assets/book/1.png) no-repeat;
    background-size: contain;
}

.bg2 {
    background: url(@/assets/book/2.png) no-repeat;
    background-size: contain;
}

.bg3 {
    background: url(@/assets/book/3.png) no-repeat;
    background-size: contain;
}

.bg4 {
    background: url(@/assets/book/4.png) no-repeat;
    background-size: contain;
}




.vertical-text {
    writing-mode: vertical-rl;
    text-orientation: upright;
}



.type-chinese1,
.type-chinese2,
.type-chinese3 {
    font-size: 100px;
    transition: border 0.3s;
}

.type-chinese1 {
    font-family: 'Chinese1';
}

.type-chinese2 {
    font-family: 'Chinese2';
}

.type-chinese3 {
    font-family: 'Chinese3';
}

.selected {
    border: 2px solid #333333;
    /* 选中时亮起的边框颜色 */
}
</style>
