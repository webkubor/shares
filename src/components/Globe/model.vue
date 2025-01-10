<template>
  <primitive :object="Globe" />
</template>

<script setup lang='ts'>
import { Color, MeshPhongMaterial } from 'three'
import ThreeGlobe from 'three-globe'
import countries from './custom.geo.json'

const N = 40

// 随机生成经纬度的函数
const getRandomCoordinates = () => ({
  lat: (Math.random() - 0.5) * 180,  // 随机生成纬度
  lng: (Math.random() - 0.5) * 360   // 随机生成经度
});

// 随机生成弧线的透明度和宽度
const getRandomStyle = () => ({
  opacity: Math.random(),  // 随机透明度，范围 [0, 1]
  width: Math.random() * 2 + 1  // 随机宽度，范围 [1, 3]
});

// 增加更多的弧线并且设置每条弧线的透明度和宽度
const arcsData = [...Array(N).keys()].map(() => {
  const startCoordinates = getRandomCoordinates();  // 获取起点经纬度
  const endCoordinates = getRandomCoordinates();    // 获取终点经纬度
  const color = ['red', 'white', 'blue', 'green'][Math.floor(Math.random() * 4)];  // 随机选择颜色
  const { opacity, width } = getRandomStyle();  // 获取随机样式

  return {
    startLat: startCoordinates.lat,
    startLng: startCoordinates.lng,
    endLat: endCoordinates.lat,
    endLng: endCoordinates.lng,
    color: color,
    opacity: opacity,  // 添加透明度
    width: width,      // 添加线条宽度
  };
});


function readerCountrey(Globe) {
 return Globe.hexPolygonResolution(3)
        .hexPolygonMargin(0.3)
        .hexPolygonUseDots(true)
        .hexPolygonColor(() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`)
}

const Globe = new ThreeGlobe()
  .hexPolygonsData(countries.features)
  .hexPolygonResolution(3)
  .hexPolygonMargin(0.7)
  .showAtmosphere(true)  // 地球的大气层
  .atmosphereColor('#2575fc')     // 设置大气层的颜色
  .atmosphereAltitude(0.4)  //设置大气层的高度
  .arcsData(arcsData)  //设置弧线的数据来源
  .arcColor('color') //设置弧线的颜色使用
  .arcDashLength(0.9) //设置弧线的虚线长度
  .arcDashGap(4)  // 设置弧线虚线段之间的间距
  .arcDashInitialGap(() => Math.random() * 5) // 设置弧线的初始虚线段起始偏移量 
  .arcDashAnimateTime(1000)    // 设置弧线的动画时间
  .arcsTransitionDuration(1000)   // 设置弧线过渡动画的持续时间

// 调整球体位置，让地球靠左显示
Globe.position.set(-80, 0, 0)

const globeMaterial = Globe.globeMaterial() as MeshPhongMaterial

globeMaterial.color = new Color('#0031DA')    // 设置地球的颜色
globeMaterial.emissive = new Color('#220038') // 设置地球的发光颜色
globeMaterial.emissiveIntensity = 0.2 // 发光效果
globeMaterial.shininess = 0.9  // 光泽度
</script>
