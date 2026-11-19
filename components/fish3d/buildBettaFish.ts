import * as THREE from "three";

export interface BettaPalette {
  id: "01" | "02" | "03";
  name: string;
  tint: string;
  emissive: string;
  sheen: string;
  pointLight: string;
}

export const BETTA_PALETTES: Record<BettaPalette["id"], BettaPalette> = {
  "01": {
    id: "01",
    name: "Fiery Guppy Crimson",
    tint: "#ff8a8a",
    emissive: "#780909",
    sheen: "#ef4444",
    pointLight: "#f59e0b",
  },
  "02": {
    id: "02",
    name: "Electric Crayfish Cobalt",
    tint: "#93c5fd",
    emissive: "#0a2656",
    sheen: "#3b82f6",
    pointLight: "#60a5fa",
  },
  "03": {
    id: "03",
    name: "Golden Sun & Emerald",
    tint: "#fde68a",
    emissive: "#3b2604",
    sheen: "#f59e0b",
    pointLight: "#10b981",
  },
};

export interface BettaRig {
  root: THREE.Group;
  bodyMaterial: THREE.MeshPhysicalMaterial;
  finMaterial: THREE.MeshPhysicalMaterial;
  uniforms: {
    uTime: { value: number };
    uSwimSpeed: { value: number };
    uTurnBend: { value: number };
  };
  dispose: () => void;
}

const MODEL_WIDTH_WORLD = 3.15;
const MODEL_HEIGHT_WORLD = MODEL_WIDTH_WORLD * (701 / 917);

// Measured strictly inside the opaque muscular body bounds of /images/betta-fish.png (917x701)
const BODY_PROFILE_POINTS: ReadonlyArray<readonly [number, number, number]> = [
  [0.031, 0.546, 0.557],
  [0.05, 0.511, 0.576],
  [0.08, 0.482, 0.598],
  [0.12, 0.459, 0.629],
  [0.17, 0.445, 0.66],
  [0.24, 0.438, 0.692],
  [0.33, 0.445, 0.703],
  [0.44, 0.456, 0.68],
  [0.54, 0.472, 0.656],
  [0.63, 0.505, 0.626],
];

const SPINE_GLSL_HELPERS = /* glsl */ `
  uniform float uTime;
  uniform float uSwimSpeed;
  uniform float uTurnBend;

  float bettaSpineWave(float zPos) {
    // Keep head & eyes ahead of z = 0.68 stable; smoothly undulate torso -> tail
    float dist = max(0.0, 0.68 - zPos);
    float normD = dist / 2.65;
    float freq = 2.8 + uSwimSpeed * 5.2;
    float amp = pow(normD, 1.5) * (0.045 + uSwimSpeed * 0.14);
    float swimWave = sin(uTime * freq - dist * 2.55) * amp;
    float turnCurve = uTurnBend * pow(normD, 1.55) * 0.46;
    return swimWave + turnCurve;
  }
`;

function sampleBodyProfile(u: number): { vBelly: number; vDorsal: number } {
  const first = BODY_PROFILE_POINTS[0];
  const last = BODY_PROFILE_POINTS[BODY_PROFILE_POINTS.length - 1];
  if (u <= first[0]) return { vBelly: first[1], vDorsal: first[2] };
  if (u >= last[0]) return { vBelly: last[1], vDorsal: last[2] };

  for (let i = 0; i < BODY_PROFILE_POINTS.length - 1; i++) {
    const [u0, b0, t0] = BODY_PROFILE_POINTS[i];
    const [u1, b1, t1] = BODY_PROFILE_POINTS[i + 1];
    if (u >= u0 && u <= u1) {
      const f = (u - u0) / (u1 - u0);
      return {
        vBelly: b0 + (b1 - b0) * f,
        vDorsal: t0 + (t1 - t0) * f,
      };
    }
  }
  return { vBelly: first[1], vDorsal: first[2] };
}

function createLuminanceBumpTexture(
  img: CanvasImageSource & { width?: number; height?: number },
  maxAnisotropy: number
): THREE.CanvasTexture | null {
  const srcW = Number(img.width) || 0;
  const srcH = Number(img.height) || 0;
  if (!srcW || !srcH || typeof document === "undefined") return null;

  const scale = Math.min(1, 1024 / Math.max(srcW, srcH));
  const w = Math.max(1, Math.round(srcW * scale));
  const h = Math.max(1, Math.round(srcH * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(img, 0, 0, w, h);
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  // Convert scale & fin-ray luminance into subtle organic micro-relief
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3] / 255;
    const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const relief = THREE.MathUtils.clamp((luma * 1.25 - 18) * a, 0, 255);
    data[i] = relief;
    data[i + 1] = relief;
    data[i + 2] = relief;
    data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
  const bumpTex = new THREE.CanvasTexture(canvas);
  bumpTex.colorSpace = THREE.NoColorSpace;
  bumpTex.anisotropy = Math.min(maxAnisotropy, 8);
  bumpTex.wrapS = THREE.ClampToEdgeWrapping;
  bumpTex.wrapT = THREE.ClampToEdgeWrapping;
  bumpTex.needsUpdate = true;
  return bumpTex;
}

/**
 * Builds a closed, 100%-watertight 360-degree revolved anatomical head and torso
 * mapped strictly inside the opaque Betta photograph core (zero cutout holes).
 */
function createClosedBodyGeometry(): THREE.BufferGeometry {
  const lenSegs = 80;
  const radSegs = 44;
  const uStart = BODY_PROFILE_POINTS[0][0];
  const uEnd = BODY_PROFILE_POINTS[BODY_PROFILE_POINTS.length - 1][0];

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= lenSegs; i++) {
    const t = i / lenSegs;
    const u = uStart + t * (uEnd - uStart);
    const { vBelly, vDorsal } = sampleBodyProfile(u);
    const vCenter = 0.5 * (vBelly + vDorsal);
    const halfHeightV = i === 0 ? 0 : 0.5 * (vDorsal - vBelly);

    // Smooth snout dome at t=0 tapering naturally through cheeks and down to tail peduncle
    let halfWidth = 0;
    if (i > 0) {
      const noseRound =
        t < 0.14
          ? Math.pow(Math.sin(Math.min(t / 0.14, 1) * Math.PI * 0.5), 0.78)
          : 1;
      const rawWidth =
        Math.sin(Math.pow(t, 0.5) * Math.PI) * 0.185 * (1 - 0.36 * t) +
        0.007 * (1 - t) * noseRound;
      halfWidth = t < 1 ? Math.max(rawWidth * noseRound, 0.0012) : 0.001;
    }

    const z = (0.36 - u) * MODEL_WIDTH_WORLD;

    for (let j = 0; j <= radSegs; j++) {
      const theta = (j / radSegs) * Math.PI * 2;
      const x = Math.sin(theta) * halfWidth;
      const v = vCenter + Math.cos(theta) * halfHeightV;
      const y = (v - 0.54) * MODEL_HEIGHT_WORLD;

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < lenSegs; i++) {
    for (let j = 0; j < radSegs; j++) {
      const a = i * (radSegs + 1) + j;
      const b = a + radSegs + 1;
      const c = b + 1;
      const d = a + 1;

      // Skip degenerate apex triangle on closed snout pole (a === d at i=0)
      if (i > 0) {
        indices.push(a, d, b);
      }
      indices.push(b, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  // Weld normals across theta = 0 / 2pi seam and set forward normal on closed snout apex
  const normAttr = geo.getAttribute("normal") as THREE.BufferAttribute;
  for (let j = 0; j <= radSegs; j++) {
    normAttr.setXYZ(j, 0, 0, 1);
  }
  const seamVecA = new THREE.Vector3();
  const seamVecB = new THREE.Vector3();
  for (let i = 1; i <= lenSegs; i++) {
    const idx0 = i * (radSegs + 1);
    const idxEnd = idx0 + radSegs;
    seamVecA.fromBufferAttribute(normAttr, idx0);
    seamVecB.fromBufferAttribute(normAttr, idxEnd);
    seamVecA.add(seamVecB).normalize();
    normAttr.setXYZ(idx0, seamVecA.x, seamVecA.y, seamVecA.z);
    normAttr.setXYZ(idxEnd, seamVecA.x, seamVecA.y, seamVecA.z);
  }
  normAttr.needsUpdate = true;

  return geo;
}

/**
 * Builds high-resolution Halfmoon dorsal, anal, ventral, and caudal fin sheets
 * anchored cleanly inside the torso spine behind the head (u >= 0.19).
 */
function createFinShellGeometry(side: 1 | -1): THREE.BufferGeometry {
  const uSegs = 128;
  const vSegs = 112;
  const uStart = 0.19;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= uSegs; i++) {
    const u = uStart + (i / uSegs) * (1 - uStart);
    const z = (0.36 - u) * MODEL_WIDTH_WORLD;
    const { vBelly, vDorsal } = sampleBodyProfile(u);
    const rippleEnvelope = THREE.MathUtils.smoothstep(u, 0.24, 0.36);

    for (let j = 0; j <= vSegs; j++) {
      const v = j / vSegs;
      const y = (v - 0.54) * MODEL_HEIGHT_WORLD;

      // Only ripple outside the solid muscular torso so fins emerge cleanly from the spine
      let outOfBodyWeight = 1;
      if (u < 0.63) {
        if (v > vDorsal) {
          outOfBodyWeight = THREE.MathUtils.smoothstep(v, vDorsal, vDorsal + 0.04);
        } else if (v < vBelly) {
          outOfBodyWeight = THREE.MathUtils.smoothstep(vBelly - v, 0, 0.04);
        } else {
          outOfBodyWeight = 0;
        }
      }

      const finRipple =
        Math.sin(v * Math.PI * 15 + u * 8) *
        0.011 *
        Math.max(0, u - 0.24) *
        rippleEnvelope *
        outOfBodyWeight;

      const x = side * 0.0012 + finRipple;
      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < uSegs; i++) {
    for (let j = 0; j < vSegs; j++) {
      const a = i * (vSegs + 1) + j;
      const b = a + vSegs + 1;
      const c = b + 1;
      const d = a + 1;

      if (side === 1) {
        indices.push(a, b, d);
        indices.push(b, c, d);
      } else {
        indices.push(a, d, b);
        indices.push(b, d, c);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function attachSpineShader(
  material: THREE.MeshPhysicalMaterial,
  uniforms: BettaRig["uniforms"],
  cacheKey: string
): void {
  material.customProgramCacheKey = () => cacheKey;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uSwimSpeed = uniforms.uSwimSpeed;
    shader.uniforms.uTurnBend = uniforms.uTurnBend;

    shader.vertexShader = `${SPINE_GLSL_HELPERS}\n${shader.vertexShader}`.replace(
      "#include <begin_vertex>",
      `
      #include <begin_vertex>
      transformed.x += bettaSpineWave(transformed.z);
      `
    );
  };
}

/**
 * Builds a photorealistic, watertight 3D Betta fish combining a closed 360-degree
 * sculpted head/body manifold with undulating translucent Halfmoon fin membranes.
 */
export function buildBettaFish(maxAnisotropy = 8): BettaRig {
  const root = new THREE.Group();
  const initialPalette = BETTA_PALETTES["01"];

  const uniforms: BettaRig["uniforms"] = {
    uTime: { value: 0 },
    uSwimSpeed: { value: 0 },
    uTurnBend: { value: 0 },
  };

  let disposed = false;
  let bumpTexture: THREE.CanvasTexture | null = null;

  const textureLoader = new THREE.TextureLoader();
  const bettaTexture = textureLoader.load("/images/betta-fish.png", (loaded) => {
    if (disposed || !loaded.image) return;
    const generated = createLuminanceBumpTexture(loaded.image, maxAnisotropy);
    if (!generated) return;
    if (disposed) {
      generated.dispose();
      return;
    }
    bumpTexture = generated;
    bodyMaterial.bumpMap = bumpTexture;
    bodyMaterial.bumpScale = 0.022;
    bodyMaterial.needsUpdate = true;

    finMaterial.bumpMap = bumpTexture;
    finMaterial.bumpScale = 0.015;
    finMaterial.needsUpdate = true;
  });
  bettaTexture.colorSpace = THREE.SRGBColorSpace;
  bettaTexture.anisotropy = Math.min(maxAnisotropy, 8);
  bettaTexture.wrapS = THREE.ClampToEdgeWrapping;
  bettaTexture.wrapT = THREE.ClampToEdgeWrapping;

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    map: bettaTexture,
    color: new THREE.Color(initialPalette.tint),
    emissiveMap: bettaTexture,
    emissive: new THREE.Color(initialPalette.emissive),
    emissiveIntensity: 0.22,
    transparent: false,
    depthWrite: true,
    roughness: 0.42,
    metalness: 0.1,
    iridescence: 0.36,
    iridescenceIOR: 1.33,
    clearcoat: 0.36,
    clearcoatRoughness: 0.25,
    side: THREE.FrontSide,
  });

  const finMaterial = new THREE.MeshPhysicalMaterial({
    map: bettaTexture,
    color: new THREE.Color(initialPalette.tint),
    emissiveMap: bettaTexture,
    emissive: new THREE.Color(initialPalette.emissive),
    emissiveIntensity: 0.24,
    alphaTest: 0.06,
    transparent: true,
    depthWrite: true,
    roughness: 0.46,
    metalness: 0.06,
    iridescence: 0.35,
    iridescenceIOR: 1.33,
    clearcoat: 0.28,
    clearcoatRoughness: 0.28,
    sheen: 0.55,
    sheenRoughness: 0.48,
    sheenColor: new THREE.Color("#7dd3fc"),
    side: THREE.FrontSide,
  });

  attachSpineShader(bodyMaterial, uniforms, "betta-body-wave-v1");
  attachSpineShader(finMaterial, uniforms, "betta-fin-wave-v1");

  const bodyGeo = createClosedBodyGeometry();
  const rightFinGeo = createFinShellGeometry(1);
  const leftFinGeo = createFinShellGeometry(-1);

  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMaterial);
  const rightFinMesh = new THREE.Mesh(rightFinGeo, finMaterial);
  const leftFinMesh = new THREE.Mesh(leftFinGeo, finMaterial);
  root.add(bodyMesh, rightFinMesh, leftFinMesh);

  return {
    root,
    bodyMaterial,
    finMaterial,
    uniforms,
    dispose: () => {
      disposed = true;
      bodyGeo.dispose();
      rightFinGeo.dispose();
      leftFinGeo.dispose();
      bodyMaterial.dispose();
      finMaterial.dispose();
      bettaTexture.dispose();
      bumpTexture?.dispose();
    },
  };
}
