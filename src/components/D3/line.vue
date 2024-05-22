<!-- 折线图 -->
<template>
    <div ref="chart" class="chart"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';


const chart = ref(null);
const data = [
    { date: '25.07', value: 220342.76 },
    { date: '26.07', value: 230000 },
    { date: '27.07', value: 220000 },
    { date: '28.07', value: 210000 },
    { date: '29.07', value: 220342.76 },
    { date: '30.07', value: 200000 },
    { date: '31.07', value: 190000 },
    { date: '01.08', value: 195000 }
];

onMounted(() => {
    createChart();
});


const createChart = () => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chart.value)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height, 0]);

    // 添加背景图
    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'url(#bg-gradient)');


    // 定义背景图渐变
    svg.append('defs')
        .append('linearGradient')
        .attr('id', 'bg-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%')
        .selectAll('stop')
        .data([
            { offset: '0%', color: '#f8f9fa' },
            { offset: '100%', color: '#e9ecef' }
        ])
        .enter().append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color);


    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));


    const line = d3.line()
        .x(d => x(d.date) + x.bandwidth() / 2)
        .y(d => y(d.value))
        .curve(d3.curveCatmullRom); // 圆滑曲线

    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);

    svg.selectAll('.dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d.date) + x.bandwidth() / 2)
        .attr('cy', d => y(d.value))
        .attr('r', 5)
        .attr('fill', 'steelblue')
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);

    createTooltip();
    createLegend(svg, width, height);
};

const createTooltip = () => {
    d3.select(chart.value)
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', '#fff')
        .style('border', '1px solid #ccc')
        .style('padding', '5px')
        .style('display', 'none');
};

const createLegend = (svg, width, height) => {
      const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${width - 100}, ${height - 30})`);

      legend.append('rect')
        .attr('width', 80)
        .attr('height', 30)
        .attr('fill', '#f8f9fa')
        .attr('stroke', '#ccc');

      legend.append('circle')
        .attr('cx', 10)
        .attr('cy', 15)
        .attr('r', 5)
        .attr('fill', 'steelblue');

      legend.append('text')
        .attr('x', 20)
        .attr('y', 20)
        .text('TSD')
        .style('font-size', '12px');
    };
    
const handleMouseOver = (event, d) => {
    const tooltip = d3.select('.tooltip');
    tooltip
        .style('display', 'inline-block')
        .html(`Date: ${d.date}<br>Value: ${d.value}`)
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 28}px`);
};

const handleMouseOut = () => {
    d3.select('.tooltip').style('display', 'none');
};

</script>

<style lang="scss" scoped>
.chart {
    position: relative;
}
</style>