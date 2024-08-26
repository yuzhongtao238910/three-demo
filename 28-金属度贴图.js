import { scene } from "./utils/init"

import * as THREE from "three"
/*
金属度 其实就是光泽度 metalness
粗糙度 其实就是能否反光
*/
function initBase() {
  // 1- 创建几何图形
  const geometry = new THREE.SphereGeometry( 1, 32, 16 );
  // 2- 定义纹理对象（图片）
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load("/texture/one/basecolor.jpg")
  // 3- 透明度贴图
  const alphaTexture = textureLoader.load("/texture/one/opacity.jpg")
  // const aoMapTexture = textureLoader.load("/texture/one/ambientOcclusion.jpg")
  // const alphaTexture = textureLoader.load("/test.jpg")
  const roughnessTexture = textureLoader.load("/texture/one/roughness.jpg")
  const metalnessTexture = textureLoader.load("/texture/one/metalness.jpg")
  texture.colorSpace = THREE.SRGBColorSpace
  // aoMapTexture.colorSpace = THREE.SRGBColorSpace
  alphaTexture.colorSpace = THREE.SRGBColorSpace
  roughnessTexture.colorSpace = THREE.SRGBColorSpace
  // 标准网络材质
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    // 黑的更加黑  亮的更加亮

    // ao环境 遮挡贴图 只对环境光做计算
    // 同时设置的时候 roughnessMap 设置为 1
    roughnessMap: roughnessTexture, // 粗糙度贴图  黑色：光滑 白色：粗糙（不反光 散射）
    // roughness: 1, // 粗糙度 0 光滑 1粗糙
    metalness: 1, // 金属度设置 0 的话是光泽度低 光泽度高
    metalnessMap: metalnessTexture, // 金属度贴图
    // emissive: "red"
    // emissiveMap: ""
    // aoMap: 该纹理的红色通道用作环境遮挡贴图。默认值为null。aoMap需要第二组UV。
    // alphaMap: alphaTexture, // 部分透明
    // transparent: true,
    // opacity: 0.8 // 这个是全透明
  })
  const mesh = new THREE.Mesh( geometry, material );
  // 扩展：给目标物体设置第二组uv坐标 影响贴图像素点转换对应的映射过程
  // 当aoMap直接没有效果的时候，设置第二组的uv坐标来影响贴图过来的明暗效果
  mesh.geometry.setAttribute("uv2", new THREE.BufferAttribute(mesh.geometry.attributes.uv.array, 2))
  scene.add( mesh );
  // console.log(mesh)
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