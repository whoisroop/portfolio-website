import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = {
  size?: number;
  opacity?: number;
  sizeAttenuation?: boolean;
  vertexColors?: boolean;
  isDark?: boolean;
};

export function DottedSurface({
  size = 7,
  opacity = 0.75,
  sizeAttenuation = true,
  vertexColors = true,
  isDark = true,
}: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    geometry: THREE.BufferGeometry;
    material: THREE.PointsMaterial;
    animationId: number;
    targetCameraX: number;
    targetCameraY: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const SEPARATION = 140;
    const AMOUNTX = 45;
    const AMOUNTY = 65;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x070714 : 0xf8fafc, 0.00035);

    const camera = new THREE.PerspectiveCamera(
      58,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(0, 380, 1250);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    containerRef.current.appendChild(renderer.domElement);

    const positions: number[] = [];
    const colors: number[] = [];

    // Indigo -> Purple -> Pink gradient palette (normalized 0..1 for Three.js)
    const colorA = new THREE.Color(0x6366f1); // Indigo
    const colorB = new THREE.Color(0xa855f7); // Purple
    const colorC = new THREE.Color(0xec4899); // Pink
    const tempColor = new THREE.Color();

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        positions.push(x, 0, z);

        const tX = ix / AMOUNTX;
        const tY = iy / AMOUNTY;

        if (tX < 0.5) {
          tempColor.copy(colorA).lerp(colorB, tX * 2);
        } else {
          tempColor.copy(colorB).lerp(colorC, (tX - 0.5) * 2);
        }

        // Slightly brighten foreground
        const depthFactor = 0.5 + 0.5 * (1 - tY);
        colors.push(
          tempColor.r * depthFactor,
          tempColor.g * depthFactor,
          tempColor.b * depthFactor
        );
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size,
      vertexColors,
      transparent: true,
      opacity,
      sizeAttenuation,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let targetX = 0;
    let targetY = 380;

    const onPointerMove = (e: MouseEvent) => {
      const mouseX = (e.clientX - window.innerWidth / 2) * 0.35;
      const mouseY = (e.clientY - window.innerHeight / 2) * 0.2;
      targetX = mouseX;
      targetY = 380 - mouseY;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    const animate = () => {
      const frameId = requestAnimationFrame(animate);
      if (sceneRef.current) sceneRef.current.animationId = frameId;

      // Smooth camera interpolation for responsive 3D parallax
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      const positionAttribute = geometry.attributes.position;
      const pos = positionAttribute.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const idx = i * 3;
          // Rich compound organic liquid wave
          pos[idx + 1] =
            Math.sin((ix + count) * 0.28) * 45 +
            Math.sin((iy + count) * 0.45) * 45 +
            Math.cos((ix + iy + count * 0.5) * 0.2) * 20;
          i++;
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.06;
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      geometry,
      material,
      animationId: 0,
      targetCameraX: 0,
      targetCameraY: 380,
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onPointerMove);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isDark, size, opacity, sizeAttenuation, vertexColors]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
    />
  );
}

export default DottedSurface;
