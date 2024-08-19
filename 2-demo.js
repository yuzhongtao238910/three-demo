import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';
const gui = new dat.GUI();
let scene, camera, renderer, controls, cube;
function init() {
  // 创建场景
  scene = new THREE.Scene();
  // 垂直角度75(0-90) 宽高比 近截面距离摄像机的距离 远截面距离摄像机的距离 
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.y = 0;
  camera.position.x = 0;
  camera.position.z = 5;
  renderer = new THREE.WebGLRenderer({
    antialias: true // 执行抗锯齿
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
}

/*
所有起点都是坐标轴的中心点，包括物体和摄像机
*/
function createCube() {
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
}

function controlsCreate() {
  controls = new OrbitControls( camera, renderer.domElement );
  // 1- 阻尼效果
  controls.dampingFactor = 0.04
  controls.enableDamping = true
  // 2- 开启自动旋转的轨道控制器的效果
  // controls.autoRotate = true
  // 3- 垂直和水平旋转角度范围的控制
  controls.maxPolarAngle = Math.PI * 3 / 4
  controls.minPolarAngle = 0

  controls.maxAzimuthAngle = Math.PI
  controls.minAzimuthAngle = -Math.PI

  // 4- 摄像机移动范围的控制
  controls.maxDistance = 20
  controls.minDistance = 0.5
}

init()
controlsCreate()
createHelper()
createCube()

function renderLoop() {
  renderer.render( scene, camera )
  controls.update();
  cube.rotation.x += 0.01
  requestAnimationFrame( renderLoop );
}
function createHelper() {
  const axesHelper = new THREE.AxesHelper( 10 );
  scene.add( axesHelper );
}
renderLoop()
window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
  camera.updateProjectionMatrix()
}

function moveCube() {
  // 位置
  cube.position.set(1, 0, 0)
  // 旋转
  // cube.rotation.x = Math.PI / 4
  // 缩放scale
  cube.scale.x = 0.5
}
moveCube()



function createGUI() {
  // gui.add 添加图形用户界面工具
  // 参数1：关联的对象，js对象 dom对象，3d物理对象
  // 参数2：对象之中的某个属性 字符串是输入框
  gui.add(document, 'title')
  // 布尔值 多选框
  gui.add(cube, 'visible')
  // 函数 -》 按钮
  gui.add(controls, 'reset')
  // 颜色 打印cube显示的
  const colorObj = {
    'color': `#${cube.material.color.getHexString()}`
  }
  // gui.addColor(cube.material, 'color')
  gui.addColor(colorObj, 'color').onChange((val) => {
    cube.material.color = new THREE.Color( val );
  })
  // 创建分组 影响立方体的位置
  const folder = gui.addFolder('位移')
  folder.add(cube.position, 'x', -10, 10, 0.2)
  folder.add(cube.position, 'y', -10, 10, 0.2)
  folder.add(cube.position, 'z', -10, 10, 0.2)
  // 下拉菜单 (第3个参数)
  gui.add({type: '1'}, 'type', {"方案1": "1", "方案2": "2"}).onChange(val => {
    console.log(val)
    switch (val) {
      case "1":
        cube.position.set(0, 0, 0)
        break;
      case "2":
        cube.position.set(1, 1, 1)
        break;
    }
  })
}
createGUI()