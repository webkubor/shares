<template>
    <div class="earth" ref="canvasContainer"></div>
</template>
<script setup>
import * as THREE from 'three';
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const canvasContainer = ref(null);
const planetSize = ref(2.5);
const rotationSpeed = ref(0.008);

let width , height;
let  camera, renderer, planet, animateId, scene, controls;

onMounted(() => {
    width = canvasContainer.value.clientWidth
    height = canvasContainer.value.clientHeight
    initRender()
    initCamera()
    initScene()
    initControls()
    initEarth()
    initLight()
    animate();
    console.log(height, width, "测试DOM节点的可视高度和宽度")

    window.addEventListener('resize', onWindowResize, false);
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


function renders() {
    renderer.clear();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    renders();
}


/**
 * @name 创建渲染器
 * @return {*}
 */
function initRender() {
    renderer = new THREE.WebGLRenderer({
        antialias: true, // 启用抗锯齿效果
        alpha: true  //设置alpha为true，启用透明背景
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // 设置屏幕像素比例
    canvasContainer.value.appendChild(renderer.domElement);
}

/**
 * @name 初始化场景
 * @return {*}
 */
function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020924);
    scene.fog = new THREE.Fog(0x020924, 200, 1000);
    window.scene = scene;
}


/**
 * @description 初始化交互
 * @return {*}
 */
function initControls() {
    // 创建一个OrbitControls对象，并传入相机和渲染器的domElement作为参数
    controls = new OrbitControls(camera, renderer.domElement);

    // 启用阻尼效果，使相机运动更平滑
    controls.enableDamping = true;

    // 允许缩放操作
    controls.enableZoom = true;

    // 是否自动旋转场景
    controls.autoRotate = false;

    // 自动旋转的速度
    controls.autoRotateSpeed = 2;

    // 允许平移操作
    controls.enablePan = true;
}


/**
 * @name 配置摄像机 
 * @return {*}
 */
function initCamera() {
    // 第一个参数为摄像机视锥体垂直视野角度，第二个参数为摄像机视锥体长宽比，第三个参数为摄像机视锥体近端面，第四个参数为摄像机视锥体远端面
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    // 设置相机位置，对应参数分别表示x，y，z位置
    camera.position.set(0, 0, 6);
}


/**
 * @name 初始化地球平铺图 
 * @return {*}
 */
function initEarth() {
    const geometry = new THREE.SphereGeometry(planetSize.value, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('@/assets/3d/earth.png');
    // 要调整纹理过滤模式，可以使用Three.js中的Texture对象的minFilter属性。该属性用于设置纹理在缩小时的过滤方式
    // 双线性过滤模式，该模式结合了线性过滤和Mipmaps技术，在不同缩小级别的纹理之间平滑过渡，可以获得更好的质量和平滑度。
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    planet = new THREE.Mesh(geometry, material);
    scene.add(planet);
}



/**
 * @name 创建一束光线 
 * @return {*}
 */
function initLight() {
    const ambientLight = new THREE.AmbientLight(0xcccccc, 1.1);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(1, 0.1, 0).normalize();
    var directionalLight2 = new THREE.DirectionalLight(0xff2ffff, 0.2);
    directionalLight2.position.set(1, 0.1, 0.1).normalize();
    scene.add(directionalLight);
    scene.add(directionalLight2);

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.2);
    hemiLight.position.set(0, 1, 0);
    scene.add(hemiLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 500, - 20);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 18;
    directionalLight.shadow.camera.bottom = - 10;
    directionalLight.shadow.camera.left = - 52;
    directionalLight.shadow.camera.right = 12;
    scene.add(directionalLight);
}

/**
 * @name 球体转动效果
 * @return {*}
 */
function animate() {
    planet.rotation.y += rotationSpeed.value;
    renderer.render(scene, camera);
    if (controls) controls.update();
    animateId = requestAnimationFrame(animate);
}



</script>
<style lang="scss" scoped>
.earth {
    width: 100%;
    height: 300vh;
}
</style>