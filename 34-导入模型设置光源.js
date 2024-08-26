import { scene } from "./utils/init"
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import * as THREE from "three"
/*
模型：由建模师通过专业软件，设计包含网格 材质 贴图 坐标 灯光等信息的集合体

模型文件：
.gltf 类似json格式内容
.glb 二进制流数据存储
.fbx 

GLTFLoader 加载器 加载gltf glb文件，来得到模型对象


模型编辑器：在线操作这个模型
  https://threejs.org/editor/
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