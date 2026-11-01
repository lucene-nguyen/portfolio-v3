// Three.js scene: procedural geometry only (no model/texture assets). Loaded only by the 3D world theme.
import * as THREE from "three";
import { keyToDir, step, zoneAt, zones, type Input, type Zone } from "@/lib/world";

export interface SceneHandle {
  press: (dir: keyof Input, down: boolean) => void;
  dispose: () => void;
}

const css = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export function createScene(
  host: HTMLElement,
  opts: {
    onEnter: (zone: Zone) => void;
    onFrame: (fps: number, labels: { id: Zone["id"]; x: number; y: number }[]) => void;
  },
): SceneHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(css("--bg") || "#0F1626");
  scene.fog = new THREE.Fog(scene.background, 14, 30);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x223355, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.position.set(5, 10, 4);
  scene.add(sun);

  const disposables: { dispose: () => void }[] = [];
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material) => {
    disposables.push(g, m);
    return new THREE.Mesh(g, m);
  };

  const ground = mesh(
    new THREE.CircleGeometry(12, 48),
    new THREE.MeshLambertMaterial({ color: css("--surface") || "#172036" }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  const grid = new THREE.GridHelper(
    24,
    24,
    css("--border-strong") || "#8C9BBA",
    css("--border") || "#2A3754",
  );
  disposables.push(grid.geometry, grid.material as THREE.Material);
  scene.add(grid);

  const accent = new THREE.Color(css("--accent") || "#FFB547");
  const pads = zones.map((z, i) => {
    const pad = mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 0.3, 24),
      new THREE.MeshLambertMaterial({ color: accent, emissive: accent, emissiveIntensity: 0.25 }),
    );
    pad.position.set(z.x, 0.15, z.z);
    scene.add(pad);
    const pillar = mesh(
      new THREE.BoxGeometry(0.6, 1.6 + i * 0.3, 0.6),
      new THREE.MeshLambertMaterial({ color: css("--text-muted") || "#A9B5CC" }),
    );
    pillar.position.set(z.x * 1.25, 0.8 + i * 0.15, z.z * 1.25);
    scene.add(pillar);
    return pad;
  });

  const player = mesh(
    new THREE.ConeGeometry(0.45, 1.2, 16),
    new THREE.MeshLambertMaterial({ color: css("--text") || "#EEF2FA" }),
  );
  scene.add(player);

  let pos = { x: 0, z: 0 };
  const input: Input = { forward: false, back: false, left: false, right: false };
  let entered: Zone | undefined;

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = host;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  const onKey = (e: KeyboardEvent, down: boolean) => {
    const dir = keyToDir(e.key);
    if (!dir) return;
    e.preventDefault();
    input[dir] = down;
  };
  const kd = (e: KeyboardEvent) => onKey(e, true);
  const ku = (e: KeyboardEvent) => onKey(e, false);
  host.addEventListener("keydown", kd);
  host.addEventListener("keyup", ku);
  // A keyup that lands elsewhere (Alt-Tab, focus moved) must not leave the player walking.
  const release = () => {
    input.forward = input.back = input.left = input.right = false;
  };
  host.addEventListener("blur", release);
  window.addEventListener("blur", release);

  const tmp = new THREE.Vector3();
  let last = performance.now();
  let frames = 0;
  let fpsAt = last;
  let fps = 0;
  let raf = 0;
  const loop = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    pos = step(pos, input, dt);
    player.position.set(pos.x, 0.9, pos.z);
    pads.forEach((p, i) => (p.rotation.y = now / 1000 + i));
    camera.position.set(pos.x, 7, pos.z + 9);
    camera.lookAt(pos.x, 0, pos.z - 1);
    renderer.render(scene, camera);

    const zone = zoneAt(pos);
    if (zone && zone !== entered) opts.onEnter(zone);
    entered = zone;

    frames++;
    if (now - fpsAt >= 1000) {
      fps = Math.round((frames * 1000) / (now - fpsAt));
      frames = 0;
      fpsAt = now;
    }
    const labels = zones.map((z) => {
      tmp.set(z.x, 1.2, z.z).project(camera);
      // z > 1: behind the camera (projection would mirror it) → park off-screen.
      if (tmp.z > 1) return { id: z.id, x: -100, y: -100 };
      return { id: z.id, x: (tmp.x * 0.5 + 0.5) * 100, y: (-tmp.y * 0.5 + 0.5) * 100 };
    });
    opts.onFrame(fps, labels);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return {
    press: (dir, down) => {
      input[dir] = down;
    },
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("keydown", kd);
      host.removeEventListener("keyup", ku);
      host.removeEventListener("blur", release);
      window.removeEventListener("blur", release);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
