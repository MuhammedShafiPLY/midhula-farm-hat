import * as THREE from "three";

/**
 * Soft glowing circular sprite texture for underwater micro-bubbles & marine dust.
 */
export function createBubbleTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const c = size * 0.5;
    const grad = ctx.createRadialGradient(c - 6, c - 6, 2, c, c, c);
    grad.addColorStop(0.0, "rgba(255, 255, 255, 0.96)");
    grad.addColorStop(0.34, "rgba(186, 230, 253, 0.7)");
    grad.addColorStop(0.72, "rgba(56, 189, 248, 0.25)");
    grad.addColorStop(1.0, "rgba(14, 165, 233, 0.0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
