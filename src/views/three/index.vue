<template>
    <h3>环境渲染器搭建</h3>
</template>
<script setup lang="ts">
import * as THREE from 'three'//导入three.js核心库
import { onMounted } from 'vue';


onMounted(() => {
    var scene = new THREE.Scene(); //创建场景
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //创建相机

    var renderer = new THREE.WebGLRenderer(); //创建渲染器
    renderer.setSize(window.innerWidth, window.innerHeight); //设置渲染器的大小
    document.body.appendChild(renderer.domElement); //将渲染器添加到页面中

    var geometry = new THREE.BoxGeometry(1, 1, 1); //创建一个立方体的几何形状
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); //创建一个材质对象
    var cube = new THREE.Mesh(geometry, material); //创建一个网格对象
    scene.add(cube); //将网格对象添加到场景中

    camera.position.z = 5;

    var render = function () {
        requestAnimationFrame(render);

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        renderer.render(scene, camera);
    };

    render();
})



</script>
<style lang="scss" scoped></style>