import { scene } from "./utils/init"

import * as THREE from "three"
/*
贴图的黑色部分：完全透明的
贴图的白色部分：完全不透明的
https://xuexi.boxuegu.com/lesson/?id=3990
*/
function initBase() {
  // 1- 创建几何图形
  const geometry = new THREE.SphereGeometry( 1, 32, 16 );
  // 2- 定义纹理对象（图片）
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load("/texture/one/basecolor.jpg")
  // 3- 透明度贴图
  const alphaTexture = textureLoader.load("/texture/one/opacity.jpg")
  const aoMapTexture = textureLoader.load("/texture/one/ambientOcclusion.jpg")
  // const alphaTexture = textureLoader.load("/test.jpg")
  texture.colorSpace = THREE.SRGBColorSpace
  aoMapTexture.colorSpace = THREE.SRGBColorSpace
  alphaTexture.colorSpace = THREE.SRGBColorSpace
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    // 黑的更加黑  亮的更加亮
    aoMap: aoMapTexture
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
  console.log(mesh)
}
initBase()