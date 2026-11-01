// Pure rules for the 3D world (positions on the ground plane, x/z).

export interface Zone {
  id: "work" | "lab" | "kits" | "contact";
  x: number;
  z: number;
}

export const ZONE_RADIUS = 1.6;
export const WORLD_RADIUS = 11;

export const zones: Zone[] = [
  { id: "work", x: 0, z: -7 },
  { id: "lab", x: 7, z: 0 },
  { id: "kits", x: 0, z: 7 },
  { id: "contact", x: -7, z: 0 },
];

export interface Input {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
}

/** Moves the player (units per second × dt), kept inside the world circle. */
export function step(p: { x: number; z: number }, input: Input, dt: number, speed = 6) {
  let dx = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  let dz = (input.back ? 1 : 0) - (input.forward ? 1 : 0);
  const len = Math.hypot(dx, dz);
  if (!len) return p;
  dx /= len;
  dz /= len;
  let x = p.x + dx * speed * dt;
  let z = p.z + dz * speed * dt;
  const r = Math.hypot(x, z);
  if (r > WORLD_RADIUS) {
    x = (x / r) * WORLD_RADIUS;
    z = (z / r) * WORLD_RADIUS;
  }
  return { x, z };
}

export function zoneAt(p: { x: number; z: number }): Zone | undefined {
  return zones.find((zn) => Math.hypot(zn.x - p.x, zn.z - p.z) <= ZONE_RADIUS);
}

/** Maps a key to an input direction (arrows and WASD). */
export function keyToDir(key: string): keyof Input | undefined {
  return (
    {
      ArrowUp: "forward",
      w: "forward",
      W: "forward",
      ArrowDown: "back",
      s: "back",
      S: "back",
      ArrowLeft: "left",
      a: "left",
      A: "left",
      ArrowRight: "right",
      d: "right",
      D: "right",
    } as const
  )[key];
}
