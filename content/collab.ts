/** Collaboration type ids (LEARNING-166/167); labels live in content/<locale>/. */
export const COLLAB_TYPE_IDS = ["full-time", "part-time", "freelance", "consulting"] as const;
export type CollabType = (typeof COLLAB_TYPE_IDS)[number];

/** A starter kit or lab: optional links, shown as buttons on the card (fix/kits-cards). */
export interface Kit {
  name: string;
  status: string;
  state: "active" | "planned";
  description: string;
  stack: string;
  repo?: string;
  demo?: string;
}
