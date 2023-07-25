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

let light, camera, renderer, planet, animateId, scene, controls;

onMounted(() => {
    initCamera()
    initScene()
    initRender()
    initControls()
    initEarth()
    createLight()
    animate();
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


	/**
	 * @description 渲染
	 */
     function renders() {
		renderer.clear();
		renderer.render( scene, camera );
	}

function onWindowResize() {
    camera.aspect = innerWidth / innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( innerWidth, innerHeight );
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
 * @name 创建场景
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


function initCamera() {
    // 第一个参数为摄像机视锥体垂直视野角度，第二个参数为摄像机视锥体长宽比，第三个参数为摄像机视锥体近端面，第四个参数为摄像机视锥体远端面
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    // 设置相机位置，对应参数分别表示x，y，z位置
    // camera.position.z = 6;
    camera.position.set(0, 0, 6);
}



function initEarth() {
    const geometry = new THREE.SphereGeometry(planetSize.value, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('https://webjunjun.github.io/wechat/earth.jpg');
    // 要调整纹理过滤模式，可以使用Three.js中的Texture对象的minFilter属性。该属性用于设置纹理在缩小时的过滤方式
    // 双线性过滤模式，该模式结合了线性过滤和Mipmaps技术，在不同缩小级别的纹理之间平滑过渡，可以获得更好的质量和平滑度。
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    planet = new THREE.Mesh(geometry, material);
    scene.add(planet);
}

function initEarth2() {
    // 创建TextureLoader实例
    const globeTextureLoader = new THREE.TextureLoader();

    // 地球半径
    const radius = planetSize.value;
    const group = new THREE.Group();
    // 使用globeTextureLoader加载地球的贴图
    globeTextureLoader.load('https://webjunjun.github.io/wechat/earth.jpg', function (texture) {
        // 创建地球的几何体
        const globeGeometry = new THREE.SphereGeometry(radius, 100, 100);

        // 创建地球的材质，使用MeshStandardMaterial，其中map属性为地球贴图
        const globeMaterial = new THREE.MeshStandardMaterial({ map: texture });

        // 创建地球的网格，将几何体和材质组合在一起
        const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);

        // 设置地球的旋转角度，使用欧拉角来表示旋转
        group.rotation.set(0.5, 2.9, 0.1);

        // 将地球网格添加到group中
        group.add(globeMesh);

        // 将group添加到场景中
        scene.add(group);

    })

}



function createLight() {
    // 创建一束光线
    // const color = 0xFFFFFF;// 光颜色
    // const intensity = 2;// 光照强度
    // light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(0, 0, 10);// 设置光源发射点的位置
    // scene.add(light);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // 创建平行光
    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 10);
    scene.add(light);
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