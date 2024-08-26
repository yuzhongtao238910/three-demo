import { scene, camera, controls } from "./utils/init"
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import * as dat from 'dat.gui'
import * as THREE from "three"
/*
世界坐标系 和 模型坐标系
世界坐标系：场景空间的中心点
模型坐标系：物体自己的坐标系

物体位移：参考父级坐标系的位移
物体的旋转/缩放：参考模型本身的坐标系

注意：建模师给的模型文件，物体的坐标轴原点可能不是正中心的

*/


function initBase() {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  scene.add(mesh)
  const gui = new dat.GUI()
  gui.add(mesh.position, "x", 0, 3, 0.01).name("位移x")
  gui.add(mesh.position, "y", 0, 3, 0.01).name("位移y")
  gui.add(mesh.position, "z", 0, 3, 0.01).name("位移z")

  gui.add(mesh.rotation, "x", 0, 2 * Math.PI).name("旋转x")
  gui.add(mesh.rotation, "y", 0, 2 * Math.PI).name("旋转y")
  gui.add(mesh.rotation, "z", 0, 2 * Math.PI).name("旋转z")

  gui.add(mesh.scale, "x", 0, 3, 0.01).name("缩放x")
  gui.add(mesh.scale, "y", 0, 3, 0.01).name("缩放y")
  gui.add(mesh.scale, "z", 0, 3, 0.01).name("缩放z")

  const helper = new THREE.AxesHelper(2)
  mesh.add(helper)

}
initBase()

// function createLight() {
//   // 环境光：没有方向：照亮场景之中所有受光照影响的物体

//   // 平行光 从一个方向发射过来的平行光线
//   // 参数1：光照的颜色 参数2：光照的强度
//   const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
//   directionalLight.position.set(3, 3, 3)
//   scene.add( directionalLight );
//   // 重要的话：环境光线只能照亮物体，没有反向不能投影（反光）
//   const ambientLight = new THREE.AmbientLight( 0xffffff, 2 );
//   // directionalLight.position.set(3, 3, 3)
//   scene.add( ambientLight );
//   // 平行光辅助对象
//   // // 参数2：模拟平行光  光源的大小
//   // const helper = new THREE.DirectionalLightHelper( directionalLight, 1 );
//   // scene.add( helper );
// }
// createLight()

// 监听轨道控制器的旋转 拖拽
// controls.addEventListener("change", () => {
//   console.log(camera.position)
//   console.log(controls.target) // 正在观察的坐标点对象
// })

// window.addEventListener("dblclick", (evt) => {
//   camera.position.set(0.47, 1.12, -0.3)

//   // 轨道控制器的target的优先级是高于camera自己的lookat的，这里直接使用target就可以哈
//   // controls.target
//   // camera.lookAt
//   // 影响轨道控制器观察的目标位置（聚焦点） -》 影响摄像机查看的角度
//   controls.target = new THREE.Vector3(0.47, 0.77, 0.06)
// })