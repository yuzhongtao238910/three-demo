import { scene } from "./utils/init"
import * as dat from 'dat.gui'

import * as THREE from "three"
/*
物理网络材质：清晰度
  是标准网格材质的扩展，添加了更加高级的渲染属性
  清晰度：类似一层薄薄的摸
*/
function initBase() {
  // 1- 创建几何图形
  const geometry = new THREE.SphereGeometry( 1, 32, 16 );
  // 2- 定义纹理对象（图片）
  // const textureLoader = new THREE.TextureLoader()
  // const texture = textureLoader.load("/texture/one/basecolor.jpg")
  // // 3- 透明度贴图
  // const alphaTexture = textureLoader.load("/texture/one/opacity.jpg")
  // // const aoMapTexture = textureLoader.load("/texture/one/ambientOcclusion.jpg")
  // // const alphaTexture = textureLoader.load("/test.jpg")
  // const roughnessTexture = textureLoader.load("/texture/one/roughness.jpg")
  // const metalnessTexture = textureLoader.load("/texture/one/metalness.jpg")
  // const displacementTexture = textureLoader.load("/texture/one/displacement_height.jpg")
  // const normalMapTexture = textureLoader.load("/texture/one/normal.jpg")
  // texture.colorSpace = THREE.SRGBColorSpace
  // // aoMapTexture.colorSpace = THREE.SRGBColorSpace
  // alphaTexture.colorSpace = THREE.SRGBColorSpace
  // roughnessTexture.colorSpace = THREE.SRGBColorSpace
  // displacementTexture.colorSpace = THREE.SRGBColorSpace
  // normalMapTexture.colorSpace = THREE.SRGBColorSpace


  const cubeLoader = new THREE.CubeTextureLoader()
  const cubeTexture = cubeLoader.setPath("image/sky/").load([
    "px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"
  ])
  const material = new THREE.MeshPhysicalMaterial({
    envMap: cubeTexture,
    metalness: 1,
    roughness: 0,
    // 1- 设置清晰度0 - 1
    clearcoat: 1,
    // 2- 设置清晰度的粗糙度
    clearcoatRoughness: 1
  })
  const mesh = new THREE.Mesh( geometry, material );
  const gui = new dat.GUI()
  gui.add(material, "metalness", 0, 1, 0.1)
  gui.add(material, "roughness", 0, 1, 0.1)
  gui.add(material, "clearcoat", 0, 1, 0.1)
  gui.add(material, "clearcoatRoughness", 0, 1, 0.1)

  // 标准网络材质
  // const material = new THREE.MeshStandardMaterial({
  //   map: texture,
  //   // 位移贴图 黑色是没有位移的 白色的是最大位移
  //   displacementMap: displacementTexture,
  //   displacementScale: 0.3,
  //   // 黑的更加黑  亮的更加亮

  //   // ao环境 遮挡贴图 只对环境光做计算
  //   // 同时设置的时候 roughnessMap 设置为 1
  //   roughnessMap: roughnessTexture, // 粗糙度贴图  黑色：光滑 白色：粗糙（不反光 散射）
  //   roughness: 1, // 粗糙度 0 光滑 1粗糙
  //   metalness: 1, // 金属度设置 0 的话是光泽度低 光泽度高
  //   metalnessMap: metalnessTexture, // 金属度贴图
  //   normalMap: normalMapTexture
  //   // emissive: "red"
  //   // emissiveMap: ""
  //   // aoMap: 该纹理的红色通道用作环境遮挡贴图。默认值为null。aoMap需要第二组UV。
  //   // alphaMap: alphaTexture, // 部分透明
  //   // transparent: true,
  //   // opacity: 0.8 // 这个是全透明
  // })
  // const mesh = new THREE.Mesh( geometry, material );
  // // 扩展：给目标物体设置第二组uv坐标 影响贴图像素点转换对应的映射过程
  // // 当aoMap直接没有效果的时候，设置第二组的uv坐标来影响贴图过来的明暗效果
  // mesh.geometry.setAttribute("uv2", new THREE.BufferAttribute(mesh.geometry.attributes.uv.array, 2))
  scene.add( mesh );
  // console.log(mesh)
  scene.background = cubeTexture
}
initBase()

function createLight() {
  // 环境光：没有方向：照亮场景之中所有受光照影响的物体

  // 平行光 从一个方向发射过来的平行光线
  // 参数1：光照的颜色 参数2：光照的强度
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
  // const directionalLight = new THREE.AmbientLight( 0xffffff, 2 );
  directionalLight.position.set(3, 3, 3)
  scene.add( directionalLight );
  // 平行光辅助对象
  // 参数2：模拟平行光  光源的大小
  const helper = new THREE.DirectionalLightHelper( directionalLight, 1 );
  scene.add( helper );
}
createLight()