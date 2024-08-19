import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import Stats from "three/examples/jsm/libs/stats.module.js"
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';



let scene, camera, render, axesHelper, controls, cube, stats, group;
let labelRenderer; // 文字渲染器
group = new THREE.Group();
/*
  原生dom加入到3d场景
  准备：
    1- 使用原生dom标签和内容的样式
    2- 引入CSS3DObject 和 CSS3DRenderer 进行渲染
*/
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  render = new THREE.WebGLRenderer({
    antialias: true
  });
  render.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( render.domElement );
  axesHelper = new THREE.AxesHelper( 5 ); 
  scene.add( axesHelper );
}
function createBox() {
  const tag = document.createElement("span")
  tag.innerHTML = "我的文字"
  // 原生标签之中的px的值会平移到3d空间的
  tag.style.color = "white"
  const tag3D = new CSS3DObject(tag)
  scene.add(tag3D)
  tag3D.scale.set(1 / 16, 1/ 16, 1/ 16)
  labelRenderer = new CSS3DRenderer()
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  // 阻止标签触发鼠标交互事件
  labelRenderer.domElement.style.pointerEvents = "none"
  labelRenderer.domElement.style.position = "fixed"
  labelRenderer.domElement.style.left = "0"
  labelRenderer.domElement.style.top = "0"
  camera.position.z = 10
  document.body.appendChild(labelRenderer.domElement)
  labelRenderer.render(scene, camera)
}
function animate() {
  render.render( scene, camera );
  labelRenderer.render(scene, camera)
  stats.update()
  controls.update();
  requestAnimationFrame( animate );
}
function createControl() {
  controls = new OrbitControls( camera, render.domElement );
  controls.autoRotate = true
  controls.enableDamping = true
}
function createsStats() {
  // 创建性能监视器
  stats = new Stats()
  // 设置监视器面板类型，0 fps每秒传输帧数 1 ms每帧刷新用时 2mb内存占用
  stats.setMode(0)
  stats.domElement.style.position = "fixed"
  stats.domElement.style.left = '0'
  stats.domElement.style.top = '0'
  document.body.appendChild(stats.domElement)
}

init()
createBox()
createControl()
createsStats() // 性能监视器
animate();

window.onresize = () => {
  render.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
