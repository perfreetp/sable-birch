import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/** 环境 1:室内机库(RoomEnvironment 生成的柔和棚拍光) */
export function createStudioEnv(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  return tex;
}

/** 环境 2:户外夕阳(程序化渐变天空 + 高亮太阳 + 暗地面) */
export function createSunsetEnv(renderer) {
  const scene = new THREE.Scene();

  // 渐变天空
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0.0, '#16244d');
  grad.addColorStop(0.45, '#4a3a6e');
  grad.addColorStop(0.62, '#ff8c42');
  grad.addColorStop(0.72, '#c94f2e');
  grad.addColorStop(1.0, '#1c1210');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 4, 256);
  const skyTex = new THREE.CanvasTexture(canvas);
  skyTex.colorSpace = THREE.SRGBColorSpace;
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(50, 32, 16),
    new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide })
  );
  scene.add(sky);

  // 太阳(超亮,产生明显高光反射)
  const sunMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  sunMat.color.setRGB(18, 9, 3.5);
  const sun = new THREE.Mesh(new THREE.CircleGeometry(3.5, 32), sunMat);
  sun.position.set(18, 7, -32);
  sun.lookAt(0, 0, 0);
  scene.add(sun);

  // 地面反光板
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(60, 32),
    new THREE.MeshBasicMaterial({ color: 0x181210 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -3;
  scene.add(ground);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(scene, 0.08).texture;
  pmrem.dispose();
  skyTex.dispose();
  return tex;
}
