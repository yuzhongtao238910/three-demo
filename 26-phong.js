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
  // 镜面高光的
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    // 黑的更加黑  亮的更加亮

    // ao环境 遮挡贴图 只对环境光做计算
    aoMap: aoMapTexture,
    shininess: 100, // 光照的亮度
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
  // const helper = new THREE.DirectionalLightHelper( directionalLight, 1 );
  // scene.add( helper );
}
createLight()