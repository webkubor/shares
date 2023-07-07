<template>
    <div ref="canvasContainer"></div>
</template>
<script setup>
import * as THREE from 'three';
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
const canvasContainer = ref(null);
const planetSize = ref(2.5);
const rotationSpeed = ref(0.005);

let light, camera, renderer, planet, animateId, scene;

onMounted(() => {
    initRender()
})
onUnmounted(() => {
    cancelAnimationFrame(animateId);
});



watchEffect(() => {
    if (planet) {
        planet.scale.set(planetSize.value, planetSize.value, planetSize.value);
        planet.rotation.y = 0;
    }
});





function initRender() {

    // 创建3D场景对象Scene
    scene = new THREE.Scene();

    // 创建相机
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
        antialias: true, // 启用抗锯齿效果
        // alpha: true  //设置alpha为true，启用透明背景
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比例
    canvasContainer.value.appendChild(renderer.domElement);


    // 创建星球
    const geometry = new THREE.SphereGeometry(planetSize.value, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('https://webjunjun.github.io/wechat/earth.jpg'); // 替换为地球纹理贴图的路径
    // 要调整纹理过滤模式，可以使用Three.js中的Texture对象的minFilter属性。该属性用于设置纹理在缩小时的过滤方式
    // 设置纹理过滤模式为LinearMipmapLinearFilter
    // 双线性过滤模式，该模式结合了线性过滤和Mipmaps技术，在不同缩小级别的纹理之间平滑过渡，可以获得更好的质量和平滑度。
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    planet = new THREE.Mesh(geometry, material);
    scene.add(planet);


    // 创建一束光线
    const color = 0xFFFFFF;// 光颜色
    const intensity = 2;// 光照强度
    light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 0, 10);// 设置光源发射点的位置
    scene.add(light);

    animate();
}




function animate() {
    planet.rotation.y += rotationSpeed.value;
    renderer.render(scene, camera);
    animateId = requestAnimationFrame(animate);
}



</script>
<style lang="scss" scoped>
div {
    width: 100%;
    height: 300vh;
}
</style>