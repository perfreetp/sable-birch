import * as THREE from 'three';

/**
 * Kabsch 最优刚体配准：求旋转 R 与平移 t，使 R·moving[i] + t ≈ fixed[i]。
 * 用 Horn 的四元数法：构造 4×4 对称矩阵 N，取最大特征值对应的特征向量作为
 * 最优旋转四元数。特征分解用 Jacobi 迭代（对 4×4 对称阵稳定，且能正确区分
 * 正负特征值，避免幂迭代收敛到 |λ| 更大的负特征向量）。
 */
export function rigidTransformFromCorrespondences(
  fixed: THREE.Vector3[],
  moving: THREE.Vector3[],
): { quaternion: THREE.Quaternion; translation: THREE.Vector3; rmsd: number } {
  const n = Math.min(fixed.length, moving.length);
  if (n < 3) throw new Error('至少需要三组对应点');

  const cf = new THREE.Vector3();
  const cm = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    cf.add(fixed[i]);
    cm.add(moving[i]);
  }
  cf.divideScalar(n);
  cm.divideScalar(n);

  // 互协方差 S = Σ (moving - cm)(fixed - cf)^T
  // Horn 的四元数法要求 S 的行对应「被旋转的移动点」、列对应「目标固定点」；
  // 用反了会得到逆旋转（在无旋转时看不出问题，一旋转就完全错）。
  let sxx = 0, sxy = 0, sxz = 0;
  let syx = 0, syy = 0, syz = 0;
  let szx = 0, szy = 0, szz = 0;
  const fv = new THREE.Vector3();
  const mv = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    fv.subVectors(fixed[i], cf);
    mv.subVectors(moving[i], cm);
    sxx += mv.x * fv.x; sxy += mv.x * fv.y; sxz += mv.x * fv.z;
    syx += mv.y * fv.x; syy += mv.y * fv.y; syz += mv.y * fv.z;
    szx += mv.z * fv.x; szy += mv.z * fv.y; szz += mv.z * fv.z;
  }

  // Horn 的 4×4 对称矩阵
  const N: number[][] = [
    [sxx + syy + szz, syz - szy, szx - sxz, sxy - syx],
    [syz - szy, sxx - syy - szz, sxy + syx, szx + sxz],
    [szx - sxz, sxy + syx, -sxx + syy - szz, syz + szy],
    [sxy - syx, szx + sxz, syz + szy, -sxx - syy + szz],
  ];

  const { values, vectors } = jacobiEigen4(N);
  let best = 0;
  for (let i = 1; i < 4; i++) if (values[i] > values[best]) best = i;
  const q = vectors[best];

  // 四元数顺序 (w, x, y, z)
  const quaternion = new THREE.Quaternion(q[1], q[2], q[3], q[0]).normalize();
  const translation = cf.clone().sub(cm.clone().applyQuaternion(quaternion));

  let sum = 0;
  const t = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    t.copy(moving[i]).applyQuaternion(quaternion).add(translation);
    sum += t.distanceToSquared(fixed[i]);
  }
  return { quaternion, translation, rmsd: Math.sqrt(sum / n) };
}

/** 4×4 对称阵的 Jacobi 特征分解；返回特征值与对应的单位特征向量 */
function jacobiEigen4(input: number[][]) {
  const a = input.map(row => [...row]);
  const v: number[][] = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  for (let sweep = 0; sweep < 64; sweep++) {
    let off = 0;
    for (let p = 0; p < 4; p++) {
      for (let q = p + 1; q < 4; q++) off += a[p][q] * a[p][q];
    }
    if (off < 1e-24) break;

    for (let p = 0; p < 4; p++) {
      for (let q = p + 1; q < 4; q++) {
        if (Math.abs(a[p][q]) < 1e-18) continue;
        const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const s = t * c;
        for (let k = 0; k < 4; k++) {
          const akp = a[k][p];
          const akq = a[k][q];
          a[k][p] = c * akp - s * akq;
          a[k][q] = s * akp + c * akq;
        }
        for (let k = 0; k < 4; k++) {
          const apk = a[p][k];
          const aqk = a[q][k];
          a[p][k] = c * apk - s * aqk;
          a[q][k] = s * apk + c * aqk;
        }
        for (let k = 0; k < 4; k++) {
          const vkp = v[k][p];
          const vkq = v[k][q];
          v[k][p] = c * vkp - s * vkq;
          v[k][q] = s * vkp + c * vkq;
        }
      }
    }
  }

  const values = [a[0][0], a[1][1], a[2][2], a[3][3]];
  const vectors = [
    [v[0][0], v[1][0], v[2][0], v[3][0]],
    [v[0][1], v[1][1], v[2][1], v[3][1]],
    [v[0][2], v[1][2], v[2][2], v[3][2]],
    [v[0][3], v[1][3], v[2][3], v[3][3]],
  ];
  return { values, vectors };
}

/** 三个点的最佳拟合平面法向（归一化） */
export function planeNormal(points: THREE.Vector3[]): THREE.Vector3 {
  if (points.length < 3) return new THREE.Vector3(0, 1, 0);
  const a = points[0];
  const best = new THREE.Vector3(0, 1, 0);
  let bestLen = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const n = new THREE.Vector3()
      .subVectors(points[i], a)
      .cross(new THREE.Vector3().subVectors(points[i + 1], a));
    const len = n.length();
    if (len > bestLen) {
      bestLen = len;
      best.copy(n).divideScalar(len);
    }
  }
  return best;
}
