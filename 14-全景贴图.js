import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import Stats from "three/examples/jsm/libs/stats.module.js"

let scene, camera, render, axesHelper, controls, cube, stats, group;
group = new THREE.Group();
/*
  全景图贴图
    720度全景的环境
    上下是360 UV贴图
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
  // 立方体贴图
  const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
  const imgUrlArr = ["posx.jpg", "negx.jpg", "posy.jpg", "negy.jpg", "posz.jpg", "negz.jpg"]
  const textureLoader = new THREE.TextureLoader()
  textureLoader.setPath("/park/")
  const materialArr = imgUrlArr.map(item => {
    // threejs 的颜色通道  为了防止颜色图片太浅了
    const texture = textureLoader.load(item)
    texture.colorSpace = THREE.SRGBColorSpace
    return new THREE.MeshBasicMaterial({
      map: texture
    })
  })
  const mesh = new THREE.Mesh( geometry, materialArr )  // 
  scene.add(mesh)
  camera.position.z = 5
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
