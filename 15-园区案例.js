import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import Stats from "three/examples/jsm/libs/stats.module.js"

let scene, camera, render, axesHelper, controls, cube, stats, group;
group = new THREE.Group();
/*
  目标：全景贴图
    1- 调整摄像机位置的到盒子的中间
    2- 调整立方体沿着z轴做 -1的缩小 镜面反转
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
      map: texture,
      side:THREE.DoubleSide
    })
  })
  const mesh = new THREE.Mesh( geometry, materialArr )  // 
  scene.add(mesh)
  mesh.scale.set(1, 1, -1)
  // 不能给0的原因是，如果全是0的话，之后做坐标变换就一直都是0
  camera.position.z = 0.1
  camera.position.y = 0
  camera.position.x = 0
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
