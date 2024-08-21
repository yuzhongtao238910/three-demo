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
  // const alphaTexture = textureLoader.load("/texture/one/opacity.jpg")
  const alphaTexture = textureLoader.load("/test.jpg")
  texture.colorSpace = THREE.SRGBColorSpace
  alphaTexture.colorSpace = THREE.SRGBColorSpace
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    alphaMap: alphaTexture, // 部分透明
    transparent: true,
    opacity: 0.8 // 这个是全透明
  })
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
}
initBase()