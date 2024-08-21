import { scene } from "./utils/init"

import * as THREE from "three"

function initBase() {
  // 1- 创建几何图形
  const geometry = new THREE.SphereGeometry( 1, 32, 16 );
  // 2- 定义纹理对象（图片）
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load("/texture/one/basecolor.jpg")
  texture.colorSpace = THREE.SRGBColorSpace
  const material = new THREE.MeshBasicMaterial({
    map: texture
  })
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
}
initBase()