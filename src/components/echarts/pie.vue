<template>
    <div ref="chart" class="pie-border"></div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

export default {
    name: 'PaymentChart',
    setup() {
        const chart = ref(null);
        const totalValue = 1256345617; // 总值
        const data = [
            { value: 35634, name: 'bank' },
            { value: 12456, name: 'qris' },
            { value: 12456, name: 'ewallet' },
            { value: 12456, name: 'market' }
        ];

        const createGradientColor = (index) => {
            return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                { offset: 0, color: `hsl(${index * 90}, 70%, 50%)` },
                { offset: 1, color: `hsl(${index * 90 + 60}, 70%, 50%)` }
            ]);
        };

        onMounted(() => {
            const myChart = echarts.init(chart.value);

            myChart.getZr().on('click', (e) => {
                const pointInPie = myChart.containPixel({ seriesIndex: 0 }, [e.offsetX, e.offsetY]);
                if (!pointInPie) {
                    myChart.getZr().refresh();
                }
            });

            const option = {
                title: {
                    zlevel: 0,
                    text: [
                        '{value|￥' + totalValue + '}',
                        '{name|总金额}',
                    ].join('\n'),
                    rich: {
                        value: {
                            color: '#303133',
                            fontSize: 30,
                            fontWeight: 'bold',
                            lineHeight: 40,
                        },
                        name: {
                            color: '#909399',
                            lineHeight: 20
                        },
                    },
                    top: 'center',
                    left: '245',
                    textAlign: 'center',
                    textStyle: {
                        rich: {
                            value: {
                                color: '#303133',
                                fontSize: 30,
                                fontWeight: 'bold',
                                lineHeight: 40,
                            },
                            name: {
                                color: '#909399',
                                lineHeight: 20
                            },
                        },
                    },
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    bottom: '10px',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Payment Method',
                        type: 'pie',
                        radius: ['60%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: data.map((item, index) => ({
                            ...item,
                            itemStyle: {
                                color: createGradientColor(index)
                            }
                        }))
                    }
                ]
            };

            myChart.setOption(option);

            // Add center circle with shadow and total value
            const centerCircle = new echarts.graphic.Circle({
                shape: {
                    cx: myChart.getWidth() / 2,
                    cy: myChart.getHeight() / 2,
                    r: 90 // Adjust the size as needed
                },
                style: {
                    fill: '#fff',
                    shadowBlur: 20,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: '#00BFFF'
                }
            });
            myChart.getZr().add(centerCircle);
        });


        return {
            chart
        };
    }
};
</script>

<style scoped>
.pie-border {
    width: 500px;
    height: 400px;
    border: 1px solid red;
}

/* Add any necessary styles here */
</style>