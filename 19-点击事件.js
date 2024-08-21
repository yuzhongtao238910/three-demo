import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import Stats from "three/examples/jsm/libs/stats.module.js"
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';



let scene, camera, render, axesHelper, controls, cube, stats, group;
let labelRenderer; // 文字渲染器
group = new THREE.Group();
/*
  threejs 鼠标事件
  1- 原生的dom事件：支持原生事件 需要pointerEvent = "all" 再将鼠标的交互事件打开
  2- threejs创建的物体使用光射投影 Raycaster
    核心：鼠标位置归一化为设备坐标，配合摄像机计算鼠标移过哪些物体
      canvas里面的threejs的坐标转换为屏幕的坐标
    
      x点坐标：（浏览器x轴坐标点 / 画布高度 ） * 2 - 1
      y点坐标：-（浏览器y轴坐标点 / 画布高度 ） * 2 + 1
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
  tag.style.pointerEvents = "all"
  tag.onclick = evt => {
    evt.stopPropagation()
    console.log("文字被点击了")
  }
  const tag3D = new CSS3DObject(tag)
  tag3D.position.y = 1
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



  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );


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
function bindClick() {
  window.addEventListener("click", (evt) => {
    // 定义光线投射对象
    const raycaster = new THREE.Raycaster();

    // 定义一个二维的向量 保存转换后的平面
    const pointer = new THREE.Vector2();

    // 把屏幕坐标转换为webgl的设备坐标
    pointer.x = ( evt.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( evt.clientY / window.innerHeight ) * 2 + 1;

    // 更新摄像机和鼠标之间的连线
    raycaster.setFromCamera( pointer, camera );
    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects( scene.children );
    console.log(intersects, 94)
  })
}

init()
createBox()
createControl()
createsStats() // 性能监视器
animate();
bindClick()

window.onresize = () => {
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  render.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
