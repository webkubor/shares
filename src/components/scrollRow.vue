<template>
    <div class="coin-wrap">
        <div class="coin-list">
            <div class="scroll">
                <div class="coin-block" v-for="(item, index) in arr" :key="index">
                    <img :src="item" alt="" srcset="">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
let arr = [
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png",
    "https://cdn.shorter.finance/tokens/cmc/6950.png"
]

</script>
<style lang="scss" scoped>
.coin-wrap {
    display: flex;
    margin: 38px 20px;
    background-image: linear-gradient(to top, #e2ebf0 0%, #e2ebf0 100%);
    padding: 20px;

    .coin-list {
        position: relative;
        display: flex;
        width: 400px;
        overflow: hidden;

        &::after,
        &::before {
            content: "";
            position: absolute;
            top: 0;
            height: 32px;
            width: 16px;
            z-index: 1;
        }

        &::before {
            left: 0;
            background: linear-gradient(to right, #e2ebf0, transparent);
        }

        .coin-block {
            margin-right: 20px;
            height: 32px;
            width: 32px;

            img {
                width: 100%;
                border-radius: 50%
            }

        }

        .scroll {
            display: flex;
            animation: scrollLeft 50s infinite linear;
        }
    }
}


@keyframes scrollLeft {
    0% {
        transform: translate(0);
    }

    100% {
        transform: translate(-100%);
    }
}
</style>