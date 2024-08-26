import { scene, camera, controls } from "./utils/init"
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import * as THREE from "three"
/*
修改摄像机的位置和观察点
目标：双击页面，切换到主驾驶的位置上
位置：可以决定摄像机在空间之中所处的位置
观察点：可以影响摄像机往哪里看，默认0 0 0世界坐标的中心的原点
*/


function initBase() {
  // 1- 引入模型的加载器
  const loader = new GLTFLoader();
  loader.load("/model/ferrari.glb", gltf => {
    const model = gltf.scene
    // 遍历物体内部的小物体的组成部分
    model.traverse(obj => {
      console.log(obj)
      if(obj.name === "Object_3") {
        obj.material.color = new THREE.Color(0xff0000)
      }
    })
    scene.add(model)
  })
}
initBase()

function createLight() {
  // 环境光：没有方向：照亮场景之中所有受光照影响的物体

  // 平行光 从一个方向发射过来的平行光线
  // 参数1：光照的颜色 参数2：光照的强度
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
  directionalLight.position.set(3, 3, 3)
  scene.add( directionalLight );
  // 重要的话：环境光线只能照亮物体，没有反向不能投影（反光）
  const ambientLight = new THREE.AmbientLight( 0xffffff, 2 );
  // directionalLight.position.set(3, 3, 3)
  scene.add( ambientLight );
  // 平行光辅助对象
  // // 参数2：模拟平行光  光源的大小
  // const helper = new THREE.DirectionalLightHelper( directionalLight, 1 );
  // scene.add( helper );
}
createLight()

// 监听轨道控制器的旋转 拖拽
controls.addEventListener("change", () => {
  console.log(camera.position)
  console.log(controls.target) // 正在观察的坐标点对象
})

window.addEventListener("dblclick", (evt) => {
  camera.position.set(0.47, 1.12, -0.3)

  // 轨道控制器的target的优先级是高于camera自己的lookat的，这里直接使用target就可以哈
  // controls.target
  // camera.lookAt
  // 影响轨道控制器观察的目标位置（聚焦点） -》 影响摄像机查看的角度
  controls.target = new THREE.Vector3(0.47, 0.77, 0.06)
})