import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import Stats from "three/examples/jsm/libs/stats.module.js"

let scene, camera, render, axesHelper, controls, cube, stats, group;
group = new THREE.Group();
/*
  物体的分组管理
    新建分组：分组之中加入物体
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
  // 1- 圆圆的形状
  const circleGeo = new THREE.CircleGeometry( 1, 32 );
  // side 设置哪一面进行渲染哈
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide} );
  const circle = new THREE.Mesh( circleGeo, material );

  // 2- 平面
  const planeGeo = new THREE.PlaneGeometry( 1, 1 );
  const plane = new THREE.Mesh( planeGeo, material );
  scene.add(circle)
  plane.position.z = 2
  scene.add(plane)
  // 3- 球体
  const sphereGeo = new THREE.SphereGeometry( 2, 32, 16 );
  const sphere = new THREE.Mesh( sphereGeo, material );
  sphere.position.z = 6
  scene.add(sphere)
  camera.position.z = 5;
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
