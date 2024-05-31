<template>
    <div class="b-sider-box">

        <div class="logo-box">
            <img src="@/assets/logo/q.png" alt="">
            <div class="name">
                Tarspay
            </div>
        </div>
        <div class="menu-list">
            <div class="item active">
                订单1
            </div>
            <div class="item">
                订单2
            </div>
            <div class="item">
                订单3
            </div>
            <div class="item">
                订单3
            </div>
            <div class="item">
                订单3
            </div>
            <div class="item">
                订单3
            </div>
        </div>

        <div class="bottom-board">
            <div style="display: flex; align-items: center;">
                <n-avatar round :size="48" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                <svg t="1716531337836" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="1451" width="200" height="200">
                    <path
                        d="M709.12 117.248c-5.632-2.56-11.776 1.024-11.776 7.168v65.536c0 5.632 3.072 10.752 7.68 13.824 23.04 14.336 44.032 31.232 63.488 50.688 33.28 33.28 59.392 72.192 77.824 115.712 18.944 44.544 28.672 92.16 28.672 141.312 0 49.152-9.728 96.768-28.672 141.312-18.432 43.008-44.544 81.92-77.824 115.712s-72.192 59.392-115.2 77.824c-44.544 18.944-92.16 28.672-141.312 28.672s-96.768-9.728-141.312-28.672c-43.008-18.432-81.92-44.544-115.2-77.824S196.096 696.32 177.664 652.8c-18.944-44.544-28.672-92.16-28.672-141.312 0-49.152 9.728-96.768 28.672-141.312 18.432-43.008 44.544-81.92 77.824-115.712 19.456-19.456 40.448-36.352 63.488-50.688 4.608-3.072 7.68-8.192 7.68-13.824V124.928c0-6.144-6.656-10.24-11.776-7.168A439.35232 439.35232 0 0 0 71.68 506.368c-3.072 243.2 196.096 445.44 439.296 445.952 243.712 0.512 441.344-197.12 441.344-440.832 0-172.544-98.816-321.536-243.2-394.24z m-229.888 443.904h65.024c4.608 0 8.192-3.584 8.192-8.192V79.872c0-4.608-3.584-8.192-8.192-8.192H479.232c-4.608 0-8.192 3.584-8.192 8.192V552.96c0 4.096 4.096 8.192 8.192 8.192z"
                        fill="#ffffff" p-id="1452"></path>
                </svg>
            </div>

            <div class="text">
                merchant name
            </div>
            <div class="text">
                IP:杭州
                <br>
                address: 127.0.0.1
            </div>
            <n-button ghost color="#ffffff" round>Change password</n-button>
        </div>

    </div>
</template>
<script setup>


</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.b-sider-box {
    min-height: 100vh;
    width: 14vw;
    border-radius: 0 20px 20px 0px;
    filter: drop-shadow(0 0 10px #8fb7c0);
    background: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 10px;
    position: relative;

    .logo-box {
        border-radius: 0 20px 20px 0px;
        filter: drop-shadow(0 0 10px #00000010);
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: 20px;

        img {
            height: 100px;
            width: 100px;
            filter: drop-shadow(0 0 3px #5E64DA);
            border-radius: 50%;
        }

        .name {
            color: #212121;
            font-size: 30px;
            font-weight: 600;
            text-align: center;
        }
    }

    .menu-list {
        margin-top: 20px;
        border-radius: 10px;
        box-sizing: border-box;
      

        .item {
            padding: 10px 20px;
            font-size: 25px;
            font-weight: 600;
            line-height: 60px;
            margin-bottom: 10px;
            border-radius: 10px;
            font-family: 'Roboto', sans-serif;
            color: #212121;
            border-radius: 10px;
            text-align: center;
            cursor: pointer;
            &:hover {
                border: 2px solid  #007BFF;
            }
        }
        .active {
            background: #007BFF;
            color: #ffffff;
            filter: drop-shadow(0 0 3px #007BFF);
        }
    }

    .bottom-board {
        position: absolute;
        bottom: 35px;
        width: 85%;
        color: #ffffff;
        background: #fff;
        border-radius: 10px;
        background-image: linear-gradient(25deg, #5f6fb9, #8a92c9, #b2b6d8, #d9dce7);
        display: flex;
        padding: 10px 10px;
        flex-flow: column wrap;
        align-items: center;

        .text {
            font-weight: 600;
            margin: 5px 0;
        }

        .icon {
            width: 20px;
            height: 20px;
            display: inline-block;
            position: absolute;
            right: 20px;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                width: 30px;
                height: 30px;
                font-weight: 600;
            }
        }
    }
}
</style>