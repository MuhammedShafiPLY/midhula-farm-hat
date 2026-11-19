import * as THREE from "three";

export interface FrySchool {
  mesh: THREE.InstancedMesh;
  update: (
    dt: number,
    elapsed: number,
    cursor3D: THREE.Vector3,
    isClicking: boolean,
    reducedMotion: boolean
  ) => void;
  dispose: () => void;
}

interface FryInstance {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  targetDir: THREE.Vector3;
  schoolId: number;
  scale: number;
  flutterSpeed: number;
  flutterPhase: number;
  burstTimer: number;
}

const FRY_COUNT = 45;

const FRY_PALETTES = [
  new THREE.Color("#f59e0b"), // Farm Neon Amber
  new THREE.Color("#fbbf24"), // Sunburst Gold
  new THREE.Color("#fb7185"), // Coral Rose
  new THREE.Color("#f43f5e"), // Fiery Guppy Red
  new THREE.Color("#34d399"), // Emerald Seafoam
  new THREE.Color("#fef08a"), // Pearl Auric
];

const WORLD_UP = new THREE.Vector3(0, 1, 0);
const ORIGIN = new THREE.Vector3(0, 0, 0);

function createFryGeometry(): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  // Streamlined fusiform baby fry body profile (nose at +z, tail at -z)
  const segs = [
    { z: 0.11, w: 0.0, h: 0.0 }, // Snout tip
    { z: 0.08, w: 0.016, h: 0.02 }, // Cheeks / eye level
    { z: 0.03, w: 0.024, h: 0.03 }, // Torso center
    { z: -0.04, w: 0.018, h: 0.022 }, // Belly tapering
    { z: -0.09, w: 0.007, h: 0.009 }, // Tail peduncle
  ];

  const radSegs = 8;
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    for (let j = 0; j <= radSegs; j++) {
      const theta = (j / radSegs) * Math.PI * 2;
      const x = Math.sin(theta) * s.w;
      const y = Math.cos(theta) * s.h;
      positions.push(x, y, s.z);
      normals.push(Math.sin(theta), Math.cos(theta), i === 0 ? 1 : 0);
      uvs.push(j / radSegs, i / (segs.length - 1));
    }
  }

  for (let i = 0; i < segs.length - 1; i++) {
    for (let j = 0; j < radSegs; j++) {
      const a = i * (radSegs + 1) + j;
      const b = a + radSegs + 1;
      const c = b + 1;
      const d = a + 1;
      if (i > 0) indices.push(a, d, b);
      indices.push(b, d, c);
    }
  }

  // Translucent triangular caudal fin
  const tailStart = positions.length / 3;
  positions.push(0, 0, -0.09); // 0: tail root
  normals.push(1, 0, 0);
  uvs.push(0.5, 0);

  positions.push(0, 0.042, -0.17); // 1: dorsal tip
  normals.push(1, 0, 0);
  uvs.push(1, 1);

  positions.push(0, 0, -0.155); // 2: center fork
  normals.push(1, 0, 0);
  uvs.push(0.5, 1);

  positions.push(0, -0.038, -0.17); // 3: ventral tip
  normals.push(1, 0, 0);
  uvs.push(0, 1);

  // Double-sided fin triangles
  indices.push(tailStart, tailStart + 1, tailStart + 2);
  indices.push(tailStart, tailStart + 2, tailStart + 1);
  indices.push(tailStart, tailStart + 2, tailStart + 3);
  indices.push(tailStart, tailStart + 3, tailStart + 2);

  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  return geo;
}

/**
 * Builds a high-performance background school of baby fish fry (fish kunjungal)
 * swimming in coordinated boid-flocks behind the main showcase fish.
 */
export function buildFrySchool(): FrySchool {
  const geo = createFryGeometry();

  const material = new THREE.MeshPhysicalMaterial({
    roughness: 0.28,
    metalness: 0.06,
    clearcoat: 0.88,
    clearcoatRoughness: 0.14,
    iridescence: 0.68,
    iridescenceIOR: 1.36,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const mesh = new THREE.InstancedMesh(geo, material, FRY_COUNT);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  // Initialize fry instances
  const fryList: FryInstance[] = [];
  const dummyMatrix = new THREE.Matrix4();
  const dummyPos = new THREE.Vector3();
  const dummyQuat = new THREE.Quaternion();
  const dummyScale = new THREE.Vector3();
  const lookMat = new THREE.Matrix4();
  const flutterQuat = new THREE.Quaternion();
  const yAxis = new THREE.Vector3(0, 1, 0);

  // 3 distinct schooling clusters wandering at background depth
  const schoolCenters = [
    new THREE.Vector3(-1.8, 0.4, -1.2),
    new THREE.Vector3(1.6, -0.5, -1.5),
    new THREE.Vector3(0.2, 0.9, -1.8),
  ];

  for (let i = 0; i < FRY_COUNT; i++) {
    const schoolId = i % 3;
    const center = schoolCenters[schoolId];
    const pos = new THREE.Vector3(
      center.x + (Math.random() - 0.5) * 1.8,
      center.y + (Math.random() - 0.5) * 1.2,
      center.z + (Math.random() - 0.5) * 0.8
    );

    const heading = (Math.random() - 0.5) * Math.PI * 2;
    const speed = 0.55 + Math.random() * 0.45;
    const vel = new THREE.Vector3(
      Math.sin(heading) * speed,
      (Math.random() - 0.5) * 0.2,
      Math.cos(heading) * 0.15
    );

    const scale = 0.75 + Math.random() * 0.45; // age/size variation
    const flutterSpeed = 10.0 + Math.random() * 6.0;
    const flutterPhase = Math.random() * Math.PI * 2;

    fryList.push({
      pos,
      vel,
      targetDir: vel.clone().normalize(),
      schoolId,
      scale,
      flutterSpeed,
      flutterPhase,
      burstTimer: 0,
    });

    const color = FRY_PALETTES[i % FRY_PALETTES.length];
    mesh.setColorAt(i, color);
  }

  if (mesh.instanceColor) {
    mesh.instanceColor.needsUpdate = true;
  }

  const update = (
    dt: number,
    elapsed: number,
    cursor3D: THREE.Vector3,
    isClicking: boolean,
    reducedMotion: boolean
  ) => {
    if (reducedMotion) return;

    // Slowly drift school centers in sinusoidal natural currents
    schoolCenters[0].set(
      -1.8 + Math.sin(elapsed * 0.32) * 1.4,
      0.4 + Math.cos(elapsed * 0.45) * 0.65,
      -1.2 + Math.sin(elapsed * 0.22) * 0.35
    );
    schoolCenters[1].set(
      1.6 + Math.cos(elapsed * 0.28) * 1.3,
      -0.5 + Math.sin(elapsed * 0.38) * 0.7,
      -1.5 + Math.cos(elapsed * 0.25) * 0.4
    );
    schoolCenters[2].set(
      0.2 + Math.sin(elapsed * 0.36 + 1.5) * 1.6,
      0.9 + Math.cos(elapsed * 0.31 + 0.8) * 0.6,
      -1.8 + Math.sin(elapsed * 0.2 + 2.0) * 0.3
    );

    for (let i = 0; i < FRY_COUNT; i++) {
      const fry = fryList[i];
      const center = schoolCenters[fry.schoolId];

      // 1. Cohesion pull to school centroid
      const toCenter = center.clone().sub(fry.pos);
      const distCenter = toCenter.length();
      if (distCenter > 0.05) {
        fry.vel.addScaledVector(toCenter.normalize(), dt * 0.85);
      }

      // 2. Separation force away from close neighbors
      for (let j = 0; j < FRY_COUNT; j++) {
        if (i === j) continue;
        const other = fryList[j];
        const toOther = fry.pos.clone().sub(other.pos);
        const distOther = toOther.length();
        if (distOther < 0.28 && distOther > 0.001) {
          fry.vel.addScaledVector(toOther.normalize(), (dt * 1.2) / distOther);
        }
      }

      // 3. Playful reaction to cursor (scatter / dart burst on proximity or clicks)
      const toCursor = fry.pos.clone().sub(cursor3D);
      const distCursor = toCursor.length();
      if (isClicking && distCursor < 3.2) {
        fry.burstTimer = 0.8;
        fry.vel.addScaledVector(toCursor.normalize(), 3.5);
      } else if (distCursor < 1.35) {
        fry.burstTimer = 0.4;
        fry.vel.addScaledVector(toCursor.normalize(), (dt * 4.2) / distCursor);
      }

      // 4. Subtle wandering currents
      fry.vel.x += Math.sin(elapsed * 1.8 + i) * 0.08 * dt;
      fry.vel.y += Math.cos(elapsed * 1.4 + i * 2) * 0.06 * dt;

      // Damp & clamp swimming speed
      const baseSpeed = fry.burstTimer > 0 ? 2.4 : 0.85;
      if (fry.burstTimer > 0) fry.burstTimer -= dt;
      const curSpeed = fry.vel.length();
      if (curSpeed > baseSpeed) {
        fry.vel.multiplyScalar(Math.exp(-dt * 3.5));
      } else if (curSpeed < 0.25) {
        fry.vel.normalize().multiplyScalar(0.4);
      }

      // Update position
      fry.pos.addScaledVector(fry.vel, dt);

      // Graceful viewport boundary wrapping
      if (fry.pos.x < -4.8) fry.pos.x = 4.8;
      if (fry.pos.x > 4.8) fry.pos.x = -4.8;
      if (fry.pos.y < -3.0) fry.pos.y = 3.0;
      if (fry.pos.y > 3.0) fry.pos.y = -3.0;
      if (fry.pos.z < -2.6) fry.pos.z = -0.7;
      if (fry.pos.z > -0.5) fry.pos.z = -2.4;

      // Direction & agile tail flutter
      dummyPos.copy(fry.pos);
      fry.targetDir.copy(fry.vel).normalize();
      lookMat.lookAt(fry.targetDir, ORIGIN, WORLD_UP);
      dummyQuat.setFromRotationMatrix(lookMat);

      // Energetic baby fry tail flutter oscillation (wagging)
      const flutterAngle =
        Math.sin(elapsed * fry.flutterSpeed + fry.flutterPhase) * 0.22;
      flutterQuat.setFromAxisAngle(yAxis, flutterAngle);
      dummyQuat.multiply(flutterQuat);

      dummyScale.setScalar(fry.scale);
      dummyMatrix.compose(dummyPos, dummyQuat, dummyScale);
      mesh.setMatrixAt(i, dummyMatrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  };

  return {
    mesh,
    update,
    dispose: () => {
      geo.dispose();
      material.dispose();
    },
  };
}
