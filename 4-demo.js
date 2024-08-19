import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

let scene, camera, render, axesHelper, controls, cube;
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
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // const material = new THREE.MeshBasicMaterial( { color: 'red' } );
  // 绘制6个面的颜色不同的立方体 顺序的是：x轴的正负 y轴的正负 z轴的正负
  const colorArr = ['red', 'green', 'blue', 'pink', 'orange', 'write']
  const materialArr = colorArr.map(color => {
    return new THREE.MeshBasicMaterial({color: color})
  })
  cube = new THREE.Mesh( geometry, materialArr );
  scene.add( cube );
  camera.position.z = 5;
}
function animate() {
  requestAnimationFrame( animate );
  render.render( scene, camera );
  controls.update();
}
function createControl() {
  controls = new OrbitControls( camera, render.domElement );
  // controls.autoRotate = true
  controls.enableDamping = true
}

init()
createBox()
createControl()
animate();
window.onresize = () => {
  render.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}