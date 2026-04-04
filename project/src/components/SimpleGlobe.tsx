import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EarthGlobe({ size = 460 }: { size?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 3.2;

    // ── Lights ────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x0a2040, 3));
    const sun = new THREE.DirectionalLight(0xffeedd, 2.5);
    sun.position.set(5, 2, 5);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x00c8a0, 0.7);
    rim.position.set(-4, 1, -4);
    scene.add(rim);

    // ── Earth group ───────────────────────────────────────
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Ocean sphere
    earthGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshPhongMaterial({
          color: 0x0b3d5e,
          emissive: 0x001018,
          specular: 0x00c8a0,
          shininess: 30,
        })
      )
    );

    // Subtle lat/lon wireframe overlay
    earthGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1.003, 20, 20),
        new THREE.MeshBasicMaterial({
          color: 0x00c8a0,
          wireframe: true,
          transparent: true,
          opacity: 0.045,
        })
      )
    );

    // ── Atmosphere (Fresnel shader) ───────────────────────
    const makeAtm = (
      radius: number,
      power: number,
      col: [number, number, number],
      intensity: number
    ) =>
      new THREE.Mesh(
        new THREE.SphereGeometry(radius, 40, 40),
        new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          uniforms: {
            uPow:       { value: power },
            uIntensity: { value: intensity },
            uColor:     { value: new THREE.Vector3(...col) },
          },
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float uPow;
            uniform float uIntensity;
            uniform vec3 uColor;
            varying vec3 vNormal;
            void main() {
              float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
              float g = pow(rim, uPow) * uIntensity;
              gl_FragColor = vec4(uColor, clamp(g, 0.0, 1.0));
            }
          `,
        })
      );

    scene.add(makeAtm(1.18, 2.5, [0.0, 0.55, 0.75], 1.2));
    scene.add(makeAtm(1.38, 4.5, [0.0, 0.25, 0.55], 0.5));

    // ── City markers ─────────────────────────────────────
    const cities = [
      { lat: -23.55, lng: -46.63, hot: true  }, // São Paulo
      { lat: -22.90, lng: -43.17, hot: true  }, // Rio de Janeiro
      { lat:  -3.73, lng: -38.52, hot: false }, // Fortaleza
      { lat:  -1.46, lng: -48.50, hot: false }, // Belém
      { lat: -19.92, lng: -43.93, hot: true  }, // Belo Horizonte
      { lat: -30.03, lng: -51.23, hot: false }, // Porto Alegre
      { lat: -15.78, lng: -47.93, hot: false }, // Brasília
      { lat:  -3.12, lng: -60.02, hot: false }, // Manaus
      { lat: -12.97, lng: -38.50, hot: false }, // Salvador
      { lat: -25.43, lng: -49.27, hot: false }, // Curitiba
    ];

    type PulseInfo = { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number };
    const pulses: PulseInfo[] = [];

    cities.forEach(({ lat, lng, hot }, i) => {
      const phi   = (90 - lat)  * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const r = 1.018;
      const x = -Math.sin(phi) * Math.cos(theta) * r;
      const y =  Math.cos(phi)                   * r;
      const z =  Math.sin(phi) * Math.sin(theta) * r;

      const color = hot ? 0xff7b6b : 0x00c8a0;

      // Dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.016, 8, 8),
        new THREE.MeshBasicMaterial({ color })
      );
      dot.position.set(x, y, z);
      earthGroup.add(dot);

      // Glow halo
      const glowMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.032, 10, 10),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25 })
      );
      glowMesh.position.set(x, y, z);
      earthGroup.add(glowMesh);

      // Expanding pulse ring
      const pulseMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, wireframe: true });
      const pulseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.025, 10, 10), pulseMat);
      pulseMesh.position.set(x, y, z);
      earthGroup.add(pulseMesh);
      pulses.push({ mesh: pulseMesh, mat: pulseMat, phase: i * 0.36 });
    });

    // ── Stars ─────────────────────────────────────────────
    const starPos = new Float32Array(2800 * 3);
    for (let i = 0; i < 2800; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(
      new THREE.Points(
        starsGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.4 })
      )
    );

    // ── Animation ─────────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId: number;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      earthGroup.rotation.y = t * 0.075;

      pulses.forEach(({ mesh, mat, phase }) => {
        const p = (t * 0.65 + phase) % 1;
        mesh.scale.setScalar(1 + p * 5);
        mat.opacity = Math.max(0, (1 - p) * 0.4);
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [size]);

  return <div ref={mountRef} style={{ width: size, height: size }} />;
}
