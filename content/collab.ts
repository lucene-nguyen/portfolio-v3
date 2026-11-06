/** Collaboration type ids (LEARNING-166/167); labels live in content/<locale>/. */
export const COLLAB_TYPE_IDS = ["full-time", "part-time", "freelance", "consulting"] as const;
export type CollabType = (typeof COLLAB_TYPE_IDS)[number];
