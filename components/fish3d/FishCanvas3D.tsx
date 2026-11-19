"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createBubbleTexture } from "./bettaTextures";
import { buildBettaFish, BETTA_PALETTES, type BettaPalette } from "./buildBettaFish";
import { buildFrySchool } from "./buildFrySchool";

export interface PointerTracker {
  x: number;
  y: number;
  active: boolean;
  lastClickAt: number;
  clickX: number;
  clickY: number;
}

interface FishCanvas3DProps {
  pointerRef: React.MutableRefObject<PointerTracker>;
  activeSpecimenId?: BettaPalette["id"];
  onNibble?: (clientX: number, clientY: number) => void;
}

const WORLD_UP = new THREE.Vector3(0, 1, 0);
const ORIGIN = new THREE.Vector3(0, 0, 0);

/**
 * High-performance Three.js WebGL aquarium canvas rendering the photo-sculpted
 * 3D Betta fish, GPU-driven fin undulation, dynamic specimen morphing, and interactive 3D bubbles.
 */
export default function FishCanvas3D({
  pointerRef,
  activeSpecimenId = "01",
  onNibble,
}: FishCanvas3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onNibbleRef = useRef(onNibble);
  const activeSpecimenIdRef = useRef<BettaPalette["id"]>(activeSpecimenId);

  useEffect(() => {
    activeSpecimenIdRef.current = activeSpecimenId;
  }, [activeSpecimenId]);

  useEffect(() => {
    onNibbleRef.current = onNibble;
  }, [onNibble]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 45);
    camera.position.set(0, 0.12, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // Deep-ocean studio lighting matching upper-right sunbeams + subtle warm reef bounce
    const initialPal = BETTA_PALETTES[activeSpecimenIdRef.current] || BETTA_PALETTES["01"];
    const hemiLight = new THREE.HemisphereLight("#7dd3fc", "#041426", 1.65);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight("#e0f2fe", 3.2);
    sunLight.position.set(4.5, 6.2, 4.8);
    scene.add(sunLight);

    const coralRimLight = new THREE.PointLight("#fb7185", 2.2, 10);
    coralRimLight.position.set(-3.2, -2.4, 3.0);
    scene.add(coralRimLight);

    const fishAccentLight = new THREE.PointLight(initialPal.pointLight, 2.9, 8.0);
    scene.add(fishAccentLight);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const betta = buildBettaFish(maxAniso);
    betta.setPalette(activeSpecimenIdRef.current || "01");
    const fishPivot = new THREE.Group();
    fishPivot.add(betta.root);
    const isDesktopInitial = width >= 1024;
    fishPivot.position.set(isDesktopInitial ? 1.45 : 0, 0.0, 0.15);
    fishPivot.scale.setScalar(isDesktopInitial ? 1.05 : 0.8);
    scene.add(fishPivot);

    // Living background school of baby fish fry (fish kunjungal)
    const frySchool = buildFrySchool();
    scene.add(frySchool.mesh);

    // 3D Underwater dust & burst bubbles
    const ambientCount = 50;
    const burstCount = 26;
    const totalParticles = ambientCount + burstCount;
    const particlePositions = new Float32Array(totalParticles * 3);
    const particleVelY = new Float32Array(totalParticles);
    const particleVelX = new Float32Array(totalParticles);
    const particleLife = new Float32Array(totalParticles);

    for (let i = 0; i < ambientCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 9.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5.6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.2 - 0.4;
      particleVelY[i] = 0.07 + Math.random() * 0.14;
      particleVelX[i] = (Math.random() - 0.5) * 0.03;
      particleLife[i] = 1;
    }
    for (let i = ambientCount; i < totalParticles; i++) {
      particlePositions[i * 3 + 1] = 99;
      particleLife[i] = 0;
    }

    const bubbleGeo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(particlePositions, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    bubbleGeo.setAttribute("position", posAttr);

    const bubbleTex = createBubbleTexture();
    const bubbleMat = new THREE.PointsMaterial({
      map: bubbleTex,
      size: 0.1,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color("#bae6fd"),
    });
    const bubbles = new THREE.Points(bubbleGeo, bubbleMat);
    scene.add(bubbles);

    let burstIndex = ambientCount;
    const emitBubbleBurst = (origin: THREE.Vector3, count = 6) => {
      for (let k = 0; k < count; k++) {
        const idx = burstIndex;
        burstIndex =
          burstIndex + 1 >= totalParticles ? ambientCount : burstIndex + 1;
        particlePositions[idx * 3] = origin.x + (Math.random() - 0.5) * 0.22;
        particlePositions[idx * 3 + 1] = origin.y + (Math.random() - 0.5) * 0.18;
        particlePositions[idx * 3 + 2] = origin.z + (Math.random() - 0.5) * 0.18;
        particleVelY[idx] = 0.5 + Math.random() * 0.6;
        particleVelX[idx] = (Math.random() - 0.5) * 0.3;
        particleLife[idx] = 1.0;
      }
    };

    // Reusable math vectors (zero per-frame allocations)
    const raycaster = new THREE.Raycaster();
    const ndcVec = new THREE.Vector2();
    const swimPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.1);
    const cursor3D = new THREE.Vector3();
    const targetPos = new THREE.Vector3();
    const velocity = new THREE.Vector3();
    const desiredVel = new THREE.Vector3();
    const steerVec = new THREE.Vector3();
    const lookDir = new THREE.Vector3(-0.92, 0.08, 0.38).normalize();
    const desiredDir = new THREE.Vector3();
    const lookMatrix = new THREE.Matrix4();
    const targetQuat = new THREE.Quaternion();
    const bankQuat = new THREE.Quaternion();
    const zAxis = new THREE.Vector3(0, 0, 1);
    const localForward = new THREE.Vector3();
    const localRight = new THREE.Vector3();
    const mouthWorld = new THREE.Vector3();
    const toCursorCenter = new THREE.Vector3();
    const goalPos = new THREE.Vector3();
    const screenProjected = new THREE.Vector3();

    let smoothSpeed = 0;
    let smoothTurn = 0;
    let smoothBank = 0;
    let lastFacingX = -1;
    let arrivedAtDot = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let idleStillTime = 0;
    let lastNibbleAt = 0;
    let lastHandledClickAt = 0;
    let elapsed = 0;
    let lastTime = performance.now();
    let rafId = 0;
    let isTabHidden = document.hidden;
    let scrollVel = 0;
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const currentTint = new THREE.Color(initialPal.tint);
    const currentEmissive = new THREE.Color(initialPal.emissive);
    const currentSheen = new THREE.Color(initialPal.sheen);
    const currentLightColor = new THREE.Color(initialPal.pointLight);
    let lastHandledSpecimenId: BettaPalette["id"] = activeSpecimenIdRef.current;

    const clampCinematicDir = (dir: THREE.Vector3) => {
      if (Math.abs(dir.x) > 0.22) {
        lastFacingX = Math.sign(dir.x);
      }
      dir.y = THREE.MathUtils.clamp(dir.y, -0.46, 0.46);
      // Keep graceful side/3-4 profile so fins never collapse edge-on into the camera lens
      if (Math.hypot(dir.x, dir.y) < 0.26) {
        dir.x = lastFacingX * 0.48;
      }
      dir.z = THREE.MathUtils.clamp(dir.z, -0.56, 0.56);
      dir.normalize();
    };

    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
      if (!isTabHidden) {
        lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;
      scrollVel = THREE.MathUtils.clamp(scrollVel + delta * 0.0035, -1.8, 1.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(entry.contentRect.width, 1);
      const h = Math.max(entry.contentRect.height, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const desktop = w >= 1024;
      fishPivot.scale.setScalar(desktop ? 1.05 : 0.8);
    });
    resizeObserver.observe(container);

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate);
      if (isTabHidden) return;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (!reducedMotion) elapsed += dt;

      const rect = container.getBoundingClientRect();
      const desktop = rect.width >= 1024;
      const homeX = desktop ? 1.45 : 0.0;

      const pointer = pointerRef.current;

      let isClickBurst = false;
      // Water click -> burst bubbles
      if (pointer.lastClickAt > lastHandledClickAt && rect.width > 0 && rect.height > 0) {
        lastHandledClickAt = pointer.lastClickAt;
        isClickBurst = true;
        ndcVec.set(
          ((pointer.clickX - rect.left) / rect.width) * 2 - 1,
          -((pointer.clickY - rect.top) / rect.height) * 2 + 1
        );
        raycaster.setFromCamera(ndcVec, camera);
        if (raycaster.ray.intersectPlane(swimPlane, cursor3D)) {
          emitBubbleBurst(cursor3D, 9);
        }
      }

      if (pointer.active && !reducedMotion && rect.width > 0 && rect.height > 0) {
        const pointerMoved =
          Math.hypot(pointer.x - lastPointerX, pointer.y - lastPointerY) > 1.5;
        if (pointerMoved) {
          lastPointerX = pointer.x;
          lastPointerY = pointer.y;
          idleStillTime = 0;
        } else {
          idleStillTime += dt;
        }

        // Project cursor dot onto a steady 3D swim plane across the full viewport
        ndcVec.set(
          ((pointer.x - rect.left) / rect.width) * 2 - 1,
          -((pointer.y - rect.top) / rect.height) * 2 + 1
        );
        raycaster.setFromCamera(ndcVec, camera);
        raycaster.ray.intersectPlane(swimPlane, cursor3D);

        const minX = desktop ? -2.4 : -1.6;
        const maxX = desktop ? 2.8 : 1.6;
        cursor3D.x = THREE.MathUtils.clamp(cursor3D.x, minX, maxX);
        cursor3D.y = THREE.MathUtils.clamp(cursor3D.y, -2.1, 2.1);
        cursor3D.z = THREE.MathUtils.clamp(
          0.22 - Math.abs(cursor3D.x - homeX) * 0.1,
          -0.42,
          0.35
        );

        const mouthOffset = 0.95 * fishPivot.scale.x;
        localForward.set(0, 0, 1).applyQuaternion(fishPivot.quaternion);
        mouthWorld.copy(fishPivot.position).addScaledVector(localForward, mouthOffset);
        const mouthDist = mouthWorld.distanceTo(cursor3D);

        // Hold calm stationary hover once arrived (hysteresis prevents orbiting/spinning)
        const staySettled =
          mouthDist < 0.36 ||
          (arrivedAtDot && mouthDist < 0.65 && !pointerMoved) ||
          (idleStillTime > 1.2 && mouthDist < 0.72);

        if (staySettled) {
          if (!arrivedAtDot) {
            arrivedAtDot = true;
            if (now - lastNibbleAt > 750) {
              lastNibbleAt = now;
              emitBubbleBurst(mouthWorld, 5);
              if (onNibbleRef.current) {
                screenProjected.copy(mouthWorld).project(camera);
                const sx = (screenProjected.x * 0.5 + 0.5) * rect.width + rect.left;
                const sy = (-screenProjected.y * 0.5 + 0.5) * rect.height + rect.top;
                onNibbleRef.current(sx, sy);
              }
            }
          }
          // Living hover: gentle buoyancy drift and living breathing motion so the fish never freezes
          const hoverWave = Math.sin(elapsed * 1.8) * 0.12;
          const hoverSway = Math.cos(elapsed * 1.3) * 0.06;
          velocity.x = THREE.MathUtils.lerp(velocity.x, hoverSway, 1 - Math.exp(-dt * 3.5));
          velocity.y = THREE.MathUtils.lerp(velocity.y, hoverWave, 1 - Math.exp(-dt * 3.5));
          velocity.z *= Math.exp(-dt * 4.0);
        } else {
          arrivedAtDot = false;

          // Aim body center -> cursor3D so slight mouth overshoot never whips fish around 180 deg
          toCursorCenter.subVectors(cursor3D, fishPivot.position);
          const centerDist = toCursorCenter.length();

          if (centerDist > 0.12) {
            desiredDir.copy(toCursorCenter).divideScalar(centerDist);
            clampCinematicDir(desiredDir);
            lookDir.lerp(desiredDir, 1 - Math.exp(-dt * 4.8)).normalize();
          } else {
            desiredDir.copy(lookDir);
          }

          goalPos.copy(cursor3D).addScaledVector(desiredDir, -mouthOffset);
          desiredVel.subVectors(goalPos, fishPivot.position);
          const goalDist = desiredVel.length();
          const maxSpeed = goalDist > 1.2 ? 4.2 : Math.min(goalDist * 3.0, 3.0);
          if (goalDist > 0.001) {
            desiredVel.multiplyScalar(maxSpeed / goalDist);
          }
          steerVec.subVectors(desiredVel, velocity);
          velocity.addScaledVector(steerVec, 1 - Math.exp(-dt * 5.2));
        }
      } else {
        // Continuous, majestic ocean swimming cruise when pointer is idle or outside
        arrivedAtDot = false;
        targetPos.set(
          homeX + Math.sin(elapsed * 0.42) * (desktop ? 1.35 : 0.85),
          Math.sin(elapsed * 0.72) * 0.65 + Math.cos(elapsed * 0.36) * 0.25,
          Math.cos(elapsed * 0.42) * 0.38 - 0.05
        );
        desiredVel.subVectors(targetPos, fishPivot.position).multiplyScalar(1.4);
        steerVec.subVectors(desiredVel, velocity);
        velocity.addScaledVector(steerVec, 1 - Math.exp(-dt * 2.8));

        if (velocity.lengthSq() > 0.02) {
          desiredDir.copy(velocity).normalize();
          clampCinematicDir(desiredDir);
          lookDir.lerp(desiredDir, 1 - Math.exp(-dt * 3.8)).normalize();
        }
      }

      if (!reducedMotion) {
        fishPivot.position.addScaledVector(velocity, dt);
        // Fluid reaction to page scrolling
        fishPivot.position.y -= scrollVel * 0.32 * dt;
        fishPivot.position.y = THREE.MathUtils.clamp(fishPivot.position.y, -2.1, 2.1);
        scrollVel *= Math.exp(-dt * 4.2);
      }

      const currentSpeed = velocity.length();
      // Always maintain a living swim undulation (minimum 0.24) so the Halfmoon fins wave continuously like silk
      const targetSwimSpeed = arrivedAtDot
        ? 0.32 + Math.sin(elapsed * 2.5) * 0.08
        : Math.max(0.25, currentSpeed / 3.2);
      smoothSpeed = THREE.MathUtils.lerp(
        smoothSpeed,
        THREE.MathUtils.clamp(targetSwimSpeed, 0.22, 1),
        1 - Math.exp(-dt * 4.2)
      );

      // Matrix4.lookAt(eye=lookDir, target=ORIGIN) aligns local +Z nose along lookDir
      lookMatrix.lookAt(lookDir, ORIGIN, WORLD_UP);
      targetQuat.setFromRotationMatrix(lookMatrix);

      // Gentle roll banking & spine bend only while actively turning/swimming
      localRight.set(1, 0, 0).applyQuaternion(fishPivot.quaternion);
      const rawTurn = arrivedAtDot ? Math.sin(elapsed * 1.4) * 0.06 : localRight.dot(lookDir);
      smoothTurn = THREE.MathUtils.lerp(smoothTurn, rawTurn, 1 - Math.exp(-dt * 6));
      smoothBank = THREE.MathUtils.lerp(
        smoothBank,
        -rawTurn * 0.36,
        1 - Math.exp(-dt * 5.5)
      );
      bankQuat.setFromAxisAngle(zAxis, smoothBank);
      targetQuat.multiply(bankQuat);

      fishPivot.quaternion.slerp(targetQuat, 1 - Math.exp(-dt * 5.2));

      // Update GPU vertex wave uniforms
      betta.uniforms.uTime.value = elapsed;
      betta.uniforms.uSwimSpeed.value = smoothSpeed;
      betta.uniforms.uTurnBend.value = THREE.MathUtils.clamp(smoothTurn * 1.35, -1, 1);

      // Smooth specimen palette morphing
      const targetSpecimenId = activeSpecimenIdRef.current;
      if (targetSpecimenId !== lastHandledSpecimenId) {
        lastHandledSpecimenId = targetSpecimenId;
        betta.setPalette(targetSpecimenId);
        emitBubbleBurst(mouthWorld, 12);
      }
      const palette = BETTA_PALETTES[targetSpecimenId] || BETTA_PALETTES["01"];
      const colorLerp = 1 - Math.exp(-dt * 4.8);
      currentTint.lerp(new THREE.Color(palette.tint), colorLerp);
      currentEmissive.lerp(new THREE.Color(palette.emissive), colorLerp);
      currentSheen.lerp(new THREE.Color(palette.sheen), colorLerp);
      currentLightColor.lerp(new THREE.Color(palette.pointLight), colorLerp);

      betta.bodyMaterial.color.copy(currentTint);
      betta.bodyMaterial.emissive.copy(currentEmissive);
      betta.finMaterial.color.copy(currentTint);
      betta.finMaterial.emissive.copy(currentEmissive);
      betta.finMaterial.sheenColor.copy(currentSheen);
      fishAccentLight.color.copy(currentLightColor);

      // Keep highlight light near fish
      fishAccentLight.position.set(
        fishPivot.position.x + 1.1,
        fishPivot.position.y + 1.3,
        fishPivot.position.z + 2.2
      );

      // Update rising ambient dust & burst bubbles
      if (!reducedMotion) {
        for (let i = 0; i < ambientCount; i++) {
          particlePositions[i * 3] +=
            (particleVelX[i] + Math.sin(elapsed + i) * 0.02) * dt;
          particlePositions[i * 3 + 1] += particleVelY[i] * dt;
          if (particlePositions[i * 3 + 1] > 2.9) {
            particlePositions[i * 3 + 1] = -2.9;
            particlePositions[i * 3] = (Math.random() - 0.5) * 9.5;
          }
        }
        for (let i = ambientCount; i < totalParticles; i++) {
          if (particleLife[i] > 0) {
            particlePositions[i * 3] +=
              (particleVelX[i] + Math.sin(elapsed * 6 + i) * 0.12) * dt;
            particlePositions[i * 3 + 1] += particleVelY[i] * dt;
            particleLife[i] -= dt * 0.5;
            if (particleLife[i] <= 0) {
              particlePositions[i * 3 + 1] = 99;
            }
          }
        }
        posAttr.needsUpdate = true;
      }

      // Update schooling background baby fish fry (fish kunjungal)
      frySchool.update(dt, elapsed, cursor3D, isClickBurst, reducedMotion);

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      frySchool.dispose();
      betta.dispose();
      bubbleGeo.dispose();
      bubbleMat.dispose();
      bubbleTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [pointerRef]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-label="Interactive 3D Halfmoon Betta fish swimming underwater"
      role="img"
    />
  );
}
