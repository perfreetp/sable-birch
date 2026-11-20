import * as THREE from 'three';

/**
 * 内置 eVTOL 演示机体:机身 / 机翼 / 舱门 为可涂装部件,
 * 旋翼、起落架、座舱玻璃为固定材质部件。
 */
export function buildDefaultModel() {
  const group = new THREE.Group();
  group.name = 'eVTOL_Default';

  const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x2b2f33,
    metalness: 0.7,
    roughness: 0.45
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x10161d,
    metalness: 0,
    roughness: 0.08,
    transparent: true,
    opacity: 0.6
  });

  const add = (geo, name, pos = [0, 0, 0], rot = [0, 0, 0], mat = null) => {
    const mesh = new THREE.Mesh(geo, mat || undefined);
    mesh.name = name;
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    if (mat) mesh.material = mat;
    group.add(mesh);
    return mesh;
  };

  // ---- 机身(可涂装) ----
  add(new THREE.CapsuleGeometry(0.85, 3.2, 12, 40), 'Fuselage', [0, 0, 0], [Math.PI / 2, 0, 0]);
  add(new THREE.BoxGeometry(0.08, 0.9, 0.7, 1, 8, 6), 'TailFin', [0, 1.0, -2.2]);

  // ---- 机翼(可涂装) ----
  add(new THREE.BoxGeometry(8.8, 0.14, 1.2, 48, 1, 8), 'WingMain', [0, 0.5, 0.1]);
  add(new THREE.BoxGeometry(3.0, 0.1, 0.65, 20, 1, 4), 'WingTail', [0, 0.55, -2.15]);

  // ---- 舱门(可涂装) ----
  add(new THREE.BoxGeometry(0.07, 0.9, 1.2, 1, 10, 12), 'Door_L', [0.82, 0.0, 0.5]);
  add(new THREE.BoxGeometry(0.07, 0.9, 1.2, 1, 10, 12), 'Door_R', [-0.82, 0.0, 0.5]);

  // ---- 座舱玻璃 ----
  const canopyGeo = new THREE.SphereGeometry(0.62, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const canopy = add(canopyGeo, 'CanopyGlass', [0, 0.5, 1.3], [0, 0, 0], glass);
  canopy.scale.set(1, 0.75, 1.35);

  // ---- 旋翼臂 / 电机舱 / 螺旋桨 ----
  const armGeo = new THREE.CylinderGeometry(0.07, 0.07, 1.9, 10);
  const podGeo = new THREE.CylinderGeometry(0.13, 0.16, 0.5, 12);
  const propGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.02, 32);
  const sides = [
    [3.6, 'R'],
    [-3.6, 'L']
  ];
  const ends = [
    [0.85, 'F'],
    [-0.85, 'B']
  ];
  for (const [x, sx] of sides) {
    add(armGeo, `RotorArm_${sx}`, [x, 0.5, 0], [Math.PI / 2, 0, 0], darkMetal);
    for (const [z, sz] of ends) {
      add(podGeo, `RotorPod_${sx}${sz}`, [x, 0.62, z], [0, 0, 0], darkMetal);
      add(propGeo, `Prop_${sx}${sz}`, [x, 0.92, z], [0, 0, 0], darkMetal);
    }
  }

  // ---- 起落架滑橇 ----
  const skidGeo = new THREE.CylinderGeometry(0.05, 0.05, 3.4, 8);
  const strutGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.5, 8);
  for (const [x, sx] of [
    [0.55, 'R'],
    [-0.55, 'L']
  ]) {
    add(skidGeo, `Skid_${sx}`, [x, -1.05, 0], [Math.PI / 2, 0, 0], darkMetal);
    add(strutGeo, `Strut_${sx}F`, [x, -0.82, 0.9], [0, 0, 0], darkMetal);
    add(strutGeo, `Strut_${sx}B`, [x, -0.82, -0.9], [0, 0, 0], darkMetal);
  }

  return group;
}
