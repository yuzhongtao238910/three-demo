import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import Stats from "three/examples/jsm/libs/stats.module.js"

let scene, camera, render, axesHelper, controls, cube, stats;
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
  // 定义数据对象
  const cubeInfoArr = []
  for (let i = 0; i < 15; i++) {
    cubeInfoArr.push({
      color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
      w: Math.floor(Math.random() * 3) + 1,
      h: Math.floor(Math.random() * 3) + 1,
      d: Math.floor(Math.random() * 3) + 1,
      x: Math.floor(Math.random() * 10) - 5,
      y: Math.floor(Math.random() * 10) - 5,
      z: Math.floor(Math.random() * 10) - 5,
    })

  }

  cubeInfoArr.forEach(info => {
    const {color, x, y, z, w, h, d} = info
    const geometry = new THREE.BoxGeometry(w, h, d)
    const material= new THREE.MeshBasicMaterial({color: color})
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z)
    scene.add( cube );
  })
  // const material = new THREE.MeshBasicMaterial( { color: 'red' } );
  // // 绘制6个面的颜色不同的立方体 顺序的是：x轴的正负 y轴的正负 z轴的正负
  // const colorArr = ['red', 'green', 'blue', 'pink', 'orange', 'write']
  // const materialArr = colorArr.map(color => {
  //   return new THREE.MeshBasicMaterial({color: color})
  // })
  // cube = new THREE.Mesh( geometry, materialArr );
  
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