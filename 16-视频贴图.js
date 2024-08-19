import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import Stats from "three/examples/jsm/libs/stats.module.js"

let scene, camera, render, axesHelper, controls, cube, stats, group;
group = new THREE.Group();
/*
  目标：3D空间之中加入视频进行播放
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
  // 1- 创建平面几何物体
  const geometry = new THREE.PlaneGeometry( 1, 0.5 );
  // 2- 准备视频
  const video = document.createElement("video")
  video.src = "/mouse_cat.mp4"
  video.muted = true // 设置静音才能够自动播放
  video.addEventListener("loadedmetadata", () => {
    video.play()
  })
  // 创建视频纹理
  const texture = new THREE.VideoTexture( video );
  // 视频纹理贴到材质上
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side:THREE.DoubleSide
  })
  const mesh = new THREE.Mesh( geometry, material )  // 
  scene.add(mesh)
  camera.position.z = 1

  // 点击按钮  播放声音
  const button = document.createElement("button")
  button.innerHTML = "播放"
  button.style.position = "fixed"
  button.style.left = '0'
  button.style.bottom = '0'
  button.addEventListener("click", evt => {
    video.muted = false // 关闭静音
  })
  document.body.appendChild(button)
}
function animate() {
  requestAnimationFrame( animate );
  render.render( scene, camera );
  stats.update()
  controls.update();
}
function createControl() {
  controls = new OrbitControls( camera, render.domElement );
  // controls.autoRotate = true
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
  // document.body.appendChild(stats.domElement)
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
