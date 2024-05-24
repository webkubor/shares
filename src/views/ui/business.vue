<template>
    <div class="dashboard-container">
        <SiderBar />
        <div class="main-container">
            <div class="bg-row">
                <Card title="玻璃1">wwwww</Card>
                <Card title="玻璃1">wwwww</Card>
                <Card title="玻璃1">wwwww</Card>
                <Card title="玻璃1">wwwww</Card>

            </div>
            <div class="bg-row" style=" background: #736EFE;">
                <Card title="玻璃2">wwwww</Card>
                <Card title="玻璃2">wwwww</Card>
                <Card title="玻璃2">wwwww</Card>
                <Card title="玻璃2">wwwww</Card>
            </div>

            <div class="bg-row" style="background:#000DFF;">
                <Card title="玻璃">wwwww</Card>
                <Card title="玻璃">wwwww</Card>
                <Card title="玻璃">wwwww</Card>
                <Card title="玻璃">wwwww</Card>

            </div>
            <div class="bg-row" style=" background-image: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%);">
                <Card title="渐变测试">wwwww</Card>
                <Card title="渐变测试">wwwww</Card>
                <Card title="渐变测试">wwwww</Card>
                <Card title="渐变测试">wwwww</Card>
            </div>
            <div class="show-box">
                <div class="card">12222</div>
                <div class="card">12222</div>
                <div class="card">12222</div>
            </div>
            <div class="row-show-2">
                <div class="row-item">
                    <doubleLine />

                </div>
                <div class="row-item" style="flex: 1;">
                    <PieChart></PieChart>

                </div>
            </div>
            <div class="row-show-2">
                <div class="row-item">
                    <doubleLine />

                </div>
                <div class="row-item" style="flex: 1;">
                    <PieChart></PieChart>

                </div>
            </div>

        </div>

    </div>

</template>
<script setup>
import SiderBar from './components/siderBar.vue';
import doubleLine from '@/components/echarts/doubleLine.vue'
import PieChart from "@/components/echarts/pie.vue"

import Card from './components/card.vue';


</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';



.bg-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
}

.dashboard-container {
    display: flex;
    font-family: 'Roboto', sans-serif;
    min-height: 100vh;
    background-image: linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%);
    color: white;
  position: relative;
    .main-container {
        flex: 1;
        height: 100%;


        .show-box {
            display: flex;
            justify-content: space-between;
            padding: 20px 10px;

            .card {
                height: 100px;
                flex: 1;
                font-size: 30px;
                text-align: center;
                line-height: 100px;
                border-radius: 20px;
                background: #ffffff;
                color: #212121;
                margin: 0 10px;
                border-radius: 20px;
                background: #ffffff;
                color: #212121;
            }
        }

        .row-show-2 {
            display: flex;
            justify-content: space-around;
            padding: 10px;

            .row-item {
                flex: 3;
                margin: 0 10px;
                border-radius: 20px;
                background: #ffffff;
            }
        }

    }
}
</style>