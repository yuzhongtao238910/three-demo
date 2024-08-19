import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import Stats from "three/examples/jsm/libs/stats.module.js"

let scene, camera, render, axesHelper, controls, cube, stats, group;
group = new THREE.Group();
/*
  line: 一条连续的线段
  lineloop: 一条头尾相接的线
  lineSegments: 若个对顶点之间绘制一系列的线（2个点为一组绘制线，组和组之间不连接）
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
  const material = new THREE.LineBasicMaterial( { color: 0xffff00} );
  const points = []
  points.push(new THREE.Vector3(-10, 0, 0))  
  points.push(new THREE.Vector3(0, 10, 0))  
  points.push(new THREE.Vector3(10, 0, 0))  
  points.push(new THREE.Vector3(0, -10, 0))  
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  // line
  // const line = new THREE.Line( geometry, material );
  // 一条从头到尾的链接的闭合的线
  // const line = new THREE.LineLoop( geometry, material );
  // 两两连线
  const line = new THREE.LineSegments( geometry, material );
  scene.add(line)
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
