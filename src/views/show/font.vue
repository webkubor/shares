<template>
    <h2>我是百晓生封面选择</h2>
    <n-space>
        <n-card title="彩云字体设计">
            <div class="type-chinese1" @click="selectFont('type-chinese1')"
                :class="{ selected: selectedFont === 'type-chinese1' }">
                <p>
                    {{ textContent }}
                </p>
            </div>
        </n-card>
        <n-card title="白鸽天行体">
            <div class="type-chinese2" @click="selectFont('type-chinese2')"
                :class="{ selected: selectedFont === 'type-chinese2' }">
                <p>
                    {{ textContent }}
                </p>
            </div>
        </n-card>
        <n-card title="Aa墨韵行书">
            <div class="type-chinese3" @click="selectFont('type-chinese3')"
                :class="{ selected: selectedFont === 'type-chinese3' }">
                <p>
                    {{ textContent }}
                </p>
            </div>
        </n-card>
    </n-space>
    <n-space class="container-1">
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
                <p class="vertical-text other">
                    {{ textContent }}
                </p>
            </div>
        </div>
    </n-space>
    <h2>魔刀青衣封面选择</h2>
    <n-space class="container-2">
        <div v-for="(book, index) in books" :key="index" class="book"
            :class="[book.bg, { selected: selectedBook === index + 1 }]" @click="selectBook(index + 1)">
            <div :class="selectedFont">
                <div class="title">
                        魔刀青衣
                

                </div>
              
                <div class="author ">酒歌狂
                    
                    <img class="blood" src="@/assets/book/blood2.png" alt="">著</div>

                <img class="logo" src="@/assets/book/logo.png">
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




.container-1 {

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
        background: url(https://github.com/webkubor/picx-images-hosting/raw/master/book/w-1.32hw7nmu8c.webp) no-repeat;
        background-size: contain;
    }

    .bg2 {
        background: url(https://github.com/webkubor/picx-images-hosting/raw/master/book/w-2.5mnqkamsuq.webp) no-repeat;
        background-size: contain;
    }

    .bg3 {
        background: url(https://github.com/webkubor/picx-images-hosting/raw/master/book/w-3.6pnfv6imqf.webp) no-repeat;
        background-size: contain;
    }

    .bg4 {
        background: url(https://github.com/webkubor/picx-images-hosting/raw/master/book/w-4.5c0wr57kpp.webp) no-repeat;
        background-size: contain;
    }

}

@supports (-webkit-text-stroke: 1px black) or (text-stroke: 1px black) {
    .title {
        -webkit-text-stroke: 1px #FFFFFF; /* 白色描边 */
        text-stroke: 1px #FFFFFF; /* 白色描边 */
    }
}


.container-2 {
    color: #ffffff;
    text-align: center;
    padding-bottom: 50px;
    .book {
        padding-top: 40px;
        position: relative;
    }

    .title {
        font-size: 140px;
        color: #FF4500;  /* 较亮的红色字体，鲜明且突出 */
        text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.7);  /* 更明显的文字阴影 */
        letter-spacing: 2px;  /* 字符间距 */
        text-transform: uppercase;  /* 全部大写，增加气势 */
        filter: drop-shadow(0 0 2px #000000);  /* 文字阴影 */
        position: relative;
        // img {
        //     width: 300px;
        //     position: absolute;
        //     top: -20px;
        //     right: 200px;
        //     display: none;
        // }

    }
    .blood {
        position: absolute;
        top: 30px;
        left: 70%;
        transform: translateX(-50%);
        width: 100px;
    }
    .author {
        font-size: 40px;
        font-weight: normal;  /* 正常字体粗细 */
        margin-top: 10px;  /* 书名和作者名之间的间距 */
        color: #FF6347;  /* 略浅的红色字体，增加对比 */
        filter: drop-shadow(0 0 4px #000000);  /* 文字阴影 */
    }
    .bg1 {
        background: url(https://github.com/webkubor/picx-images-hosting/raw/master/book/m-1.361i5dfwxd.webp) no-repeat;
        background-size: cover;
    }

    .bg2 {
        background: url(https://github.com/webkubor/picx-images-hosting/raw/master/book/m-2.6t71swbpfc.webp) no-repeat;
        background-size: cover;
    }

    .bg3 {
        background: url(https://github.com/webkubor/picx-images-hosting/raw/master/book/m-3.1023jlo96n.webp) no-repeat;
        background-size: cover;
    }

    .bg4 {
        background: url(https://github.com/webkubor/picx-images-hosting/raw/master/book/m-4.5xakdg20zq.webp) no-repeat;
        background-size: cover;
    }
    .logo {
        height: 30px;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
}




.vertical-text {
    writing-mode: vertical-rl;
    text-orientation: upright;
}



.type-chinese1,
.type-chinese2,
.type-chinese3 {
    transition: border 0.3s;
}

.type-chinese1 {
    font-family: 'AiChinese01';
}

.type-chinese2 {
    font-family: 'AiChinese02';
}

.type-chinese3 {
    font-family: 'Chinese3';
}

.selected {
    border: 2px solid #333333;
}
</style>
