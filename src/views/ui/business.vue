<template>
    <div class="dashboard-container">
        <SiderBar />
        <div class="main-container">
            <div class="bg-row">
                <Card title="玻璃1">linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)</Card>
                <Card title="玻璃1">linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)</Card>
                <Card title="玻璃1">linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)</Card>
                <Card title="玻璃1">linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)</Card>

            </div>
            <div class="bg-row" style=" background-image: linear-gradient(25deg, #0f45f9, #843fd2, #af3bac, #cd3886) ;">
                <Card title="玻璃2">background-image: linear-gradient(25deg, #0f45f9, #843fd2, #af3bac, #cd3886)</Card>
                <Card title="玻璃2">background-image: linear-gradient(25deg, #0f45f9, #843fd2, #af3bac, #cd3886)</Card>
                <Card title="玻璃2">background-image: linear-gradient(25deg, #0f45f9, #843fd2, #af3bac, #cd3886)</Card>
                <Card title="玻璃2">background-image: linear-gradient(25deg, #0f45f9, #843fd2, #af3bac, #cd3886)</Card>
            </div>

            <div class="bg-row" style="background:#000DFF;">
                <Card title="Amount">#000DFF</Card>
                <Card title="Number">#000DFF</Card>
                <Card title="People">#000DFF</Card>
                <Card title="Orders">#000DFF</Card>
            </div>
            <div class="bg-row" style="background-image: linear-gradient(25deg, #004bd9, #236de6, #2c8ff3, #29b1ff);">
                <Card title="Amount">#000DFF</Card>
                <Card title="Number">#000DFF</Card>
                <Card title="People">#000DFF</Card>
                <Card title="Orders">#000DFF</Card>
            </div>
            <div class="bg-row" style=" background-image: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%);">
                <Card title="渐变测试">linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%)</Card>
                <Card title="渐变测试">linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%)</Card>
                <Card title="渐变测试">linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%)</Card>
                <Card title="渐变测试">linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%)</Card>
            </div>
            <div class="bg-row" style="background-image: linear-gradient(25deg, #51b0ff, #86c1ff, #aed2ff, #d1e4ff);">
                <Card title="渐变测试">2</Card>
                <Card title="渐变测试">2</Card>
                <Card title="渐变测试">2</Card>
                <Card title="渐变测试">2</Card>
            </div>
            <div class="bg-row" style="background-image: linear-gradient(25deg, #03b1ff, #90b1bf, #b9b37f, #d0b633);">
                <Card title="渐变测试">linear-gradient(25deg, #03b1ff, #90b1bf, #b9b37f, #d0b633)</Card>
                <Card title="渐变测试">linear-gradient(25deg, #03b1ff, #90b1bf, #b9b37f, #d0b633)</Card>
                <Card title="渐变测试">linear-gradient(25deg, #03b1ff, #90b1bf, #b9b37f, #d0b633)</Card>
                <Card title="渐变测试">linear-gradient(25deg, #03b1ff, #90b1bf, #b9b37f, #d0b633)</Card>
            </div>
            <div class="bg-row" style="background-image: linear-gradient(25deg, #230fff, #665bff, #8593ff, #97caff);">
                <Card title="渐变测试">llinear-gradient(25deg, #230fff, #665bff, #8593ff, #97caff)</Card>
                <Card title="渐变测试">linear-gradient(25deg, #230fff, #665bff, #8593ff, #97caff)</Card>
                <Card title="渐变测试">linear-gradient(25deg, #230fff, #665bff, #8593ff, #97caff)</Card>
                <Card title="渐变测试">linear-gradient(25deg, #230fff, #665bff, #8593ff, #97caff)</Card>
            </div>
            <div class="bg-row" style="background-image: linear-gradient(25deg, #0090f2, #37aaf5, #4cc4f7, #5bdff9);">
                <Card title="渐变测试">background-image: linear-gradient(25deg, #0090f2, #37aaf5, #4cc4f7, #5bdff9)</Card>
                <Card title="渐变测试">background-image: linear-gradient(25deg, #0090f2, #37aaf5, #4cc4f7, #5bdff9)</Card>
                <Card title="渐变测试">background-image: linear-gradient(25deg, #0090f2, #37aaf5, #4cc4f7, #5bdff9)</Card>
                <Card title="渐变测试">background-image: linear-gradient(25deg, #0090f2, #37aaf5, #4cc4f7, #5bdff9)</Card>
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