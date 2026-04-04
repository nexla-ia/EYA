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
    // Low ambient so the dark side stays dark
    scene.add(new THREE.AmbientLight(0x223344, 1.2));

    // Main sun — positioned to upper-left to show the globe dramatically
    const sun = new THREE.DirectionalLight(0xfff8f0, 2.8);
    sun.position.set(-4, 2, 4);
    scene.add(sun);

    // Soft fill light from the right (acts like Earth-shine)
    const fill = new THREE.DirectionalLight(0x1a4466, 0.4);
    fill.position.set(4, -1, -3);
    scene.add(fill);

    // ── Earth group (rotates together) ────────────────────
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Load real Earth texture (NASA Blue Marble, in /public)
    const loader = new THREE.TextureLoader();
    const earthTex = loader.load('/earth.jpg');
    earthTex.colorSpace = THREE.SRGBColorSpace;

    // Earth sphere with texture
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({
        map: earthTex,
        specular: new THREE.Color(0x224466),
        shininess: 18,
        // Slight bump simulation via emissive for subtle depth
      })
    );
    earthGroup.add(earth);

    // ── Atmosphere (Fresnel shader) ───────────────────────
    const makeAtm = (
      radius: number,
      power: number,
      col: [number, number, number],
      intensity: number
    ) =>
      new THREE.Mesh(
        new THREE.SphereGeometry(radius, 48, 48),
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

    // Inner blue atmosphere glow
    scene.add(makeAtm(1.16, 2.2, [0.15, 0.55, 0.9], 1.4));
    // Outer softer halo
    scene.add(makeAtm(1.36, 4.0, [0.05, 0.25, 0.6], 0.55));

    // ── Thin cloud layer ──────────────────────────────────
    // Subtle semi-transparent white sphere just above the surface
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(1.008, 48, 48),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      })
    );
    earthGroup.add(clouds);

    // ── City emission markers (Brazilian cities) ──────────
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

      const color = hot ? 0xff7060 : 0x00d4a0;

      // Core dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 8, 8),
        new THREE.MeshBasicMaterial({ color })
      );
      dot.position.set(x, y, z);
      earthGroup.add(dot);

      // Soft glow halo
      const glowMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 10, 10),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22 })
      );
      glowMesh.position.set(x, y, z);
      earthGroup.add(glowMesh);

      // Expanding pulse
      const pulseMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, wireframe: true });
      const pulseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.024, 10, 10), pulseMat);
      pulseMesh.position.set(x, y, z);
      earthGroup.add(pulseMesh);
      pulses.push({ mesh: pulseMesh, mat: pulseMat, phase: i * 0.36 });
    });

    // ── Stars ─────────────────────────────────────────────
    const starPos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 140;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 140;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 140;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(
      new THREE.Points(
        starsGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.38 })
      )
    );

    // ── Animation ─────────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId: number;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow natural Earth rotation (west → east)
      earthGroup.rotation.y = t * 0.07;

      // Cloud layer rotates slightly faster (realistic)
      clouds.rotation.y = t * 0.075;

      // Pulse animations
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
