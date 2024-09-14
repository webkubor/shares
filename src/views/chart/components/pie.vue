<template>
    <div ref="chart" class="pie-border"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'; // 从Vue中引入ref和onMounted
import * as echarts from 'echarts'; // 引入ECharts库

const chart = ref(null); // 创建一个ref对象，用于引用图表的DOM元素
const data = [
    { value: 35634, name: 'bank' },
    { value: 12456, name: 'qris' },
    { value: 12456, name: 'ewallet' },
    { value: 12456, name: 'market' }
]; // 定义数据数组，每个对象代表一个支付方式及其对应的值

// 计算总和
const total = data.reduce((sum, item) => sum + item.value, 0);

// 创建一个渐变色函数，根据索引生成颜色渐变
const createGradientColor = (index) => {
    return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
        { offset: 0, color: `hsl(${index * 90}, 70%, 50%)` },
        { offset: 1, color: `hsl(${index * 90 + 60}, 70%, 50%)` }
    ]);
};

// 图表的配置选项
const option = {

    tooltip: {
        trigger: 'item' // 提示框触发类型
    },
    legend: {
        orient: 'horizontal', // 图例的方向
        bottom: '10px', // 图例的位置
        left: 'center' // 图例的水平对齐方式
    },
    series: [
        {
            name: 'Payment Method', // 系列名称
            type: 'pie', // 图表类型为饼图
            radius: ['60%', '70%'], // 饼图的半径
            avoidLabelOverlap: false, // 避免标签重叠
            padAngle: 5, // 饼图扇区之间的间隔角度
            itemStyle: {
                borderRadius: 10, // 圆角半径
                borderColor: '#fff', // 边框颜色
                borderWidth: 2 // 边框宽度
            },
            label: {
                show: false, // 不显示标签
                position: 'center' // 标签位置
            },
            labelLine: {
                show: false // 不显示标签的引导线
            },

            data: data.map((item, index) => ({
                ...item,
                itemStyle: {
                    color: createGradientColor(index) // 设置每个项目的颜色
                }
            }))
        }
    ],
};

onMounted(() => {
    const myChart = echarts.init(chart.value); // 初始化ECharts实例
    myChart.setOption(option); // 设置图表的配置选项

    // 添加中心圆，带有阴影和总值
    const centerCircle = new echarts.graphic.Circle({
        shape: {
            cx: myChart.getWidth() / 2, // 圆心的x坐标
            cy: myChart.getHeight() / 2, // 圆心的y坐标
            r: 90 // 圆的半径，可以根据需要调整
        },
        style: {
            fill: '#fff', // 填充颜色为白色
            shadowBlur: 20, // 阴影的模糊程度
            shadowOffsetX: 0, // 阴影的水平偏移
            shadowOffsetY: 0, // 阴影的垂直偏移
            shadowColor: '#00BFFF' // 阴影颜色
        }
    });
    myChart.getZr().add(centerCircle); // 将中心圆添加到图表中

    // 更新中心显示的文本
    const updateCenterText = (text) => {
        myChart.setOption(
            {
                title: {
                    text: text,
                    //标题位置
                    left: "center",
                    top: "center",
                    //标题样式
                    textStyle: {
                        fontSize: 24,
                        color: "#000000",
                    }
                },
                subtext: text, // 副标题初始为空
                subtextStyle: {
                    fontSize: 16,
                    color: '#000000'
                }

            });
    };

    // 监听图例选中事件
    myChart.on('legendselectchanged', function (params) {
        const selectedName = params.name; // 获取选中的图例名称
        const selectedData = data.find(item => item.name === selectedName); // 找到对应的数据
        if (selectedData) {
            updateCenterText(`${selectedData.name}\n${selectedData.value}`); // 更新中心文本
        } else {
            updateCenterText(`Total\n\n${total}`); // 如果没有选中则显示总值
        }
    });

    // 监听饼图点击事件
    myChart.on('click', function (params) {
        if (params.componentType === 'series') {
            const { name, value } = params.data; // 获取点击数据的名称和值
            console.log(`点击了${name}，值为${value}`);
            updateCenterText(`${name}\n\n${value}`); // 更新中心文本
        }
    });

    // 初始状态显示总值
    updateCenterText(`Total\n\n${total}`);
});
</script>
>


<style scoped>
.pie-border {
    width: 500px;
    height: 400px;
}

/* 添加任何必要的样式 */
</style>
