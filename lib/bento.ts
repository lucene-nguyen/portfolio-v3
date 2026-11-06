/** Keeps a saved order valid: drops unknown ids, appends new ones in default order. */
export function sanitizeOrder(saved: unknown, ids: readonly string[]): string[] {
  const valid = Array.isArray(saved)
    ? saved.filter((x): x is string => ids.includes(x as string))
    : [];
  const unique = [...new Set(valid)];
  return [...unique, ...ids.filter((id) => !unique.includes(id))];
}

/** Moves `id` by `delta` positions, clamped to the ends. */
export function move(order: readonly string[], id: string, delta: number): string[] {
  const from = order.indexOf(id);
  if (from < 0) return [...order];
  const to = Math.max(0, Math.min(order.length - 1, from + delta));
  const next = order.filter((x) => x !== id);
  next.splice(to, 0, id);
  return next;
}

/** Moves `id` to where `target` is (drag and drop). */
export function moveTo(order: readonly string[], id: string, target: string): string[] {
  return move(order, id, order.indexOf(target) - order.indexOf(id));
}
