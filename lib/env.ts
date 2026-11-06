// Production guards for server env (pre-deploy hardening). Dev, test and preview keep safe defaults.
const isProduction = () => process.env.VERCEL_ENV === "production";

/** Secret salt for hashing visitor IPs. Required in production: a public default would make hashes guessable. */
export function rlSalt(): string {
  const salt = process.env.RL_SALT;
  if (salt) return salt;
  if (isProduction()) throw new Error("RL_SALT is required in production (see docs/deploy.md)");
  return "dev-salt";
}

const PREFIXES = ["prod", "preview", "dev"] as const;

/**
 * Namespace for every Redis key, so Production and Preview can share one Upstash database.
 * Required in production (and must be "prod"); "dev" by default elsewhere.
 */
export function redisKeyPrefix(): (typeof PREFIXES)[number] {
  const p = process.env.REDIS_KEY_PREFIX;
  if (!p) {
    if (isProduction()) throw new Error('REDIS_KEY_PREFIX is required in production ("prod")');
    return "dev";
  }
  if (!(PREFIXES as readonly string[]).includes(p))
    throw new Error(`REDIS_KEY_PREFIX must be one of ${PREFIXES.join(", ")} (got "${p}")`);
  if (isProduction() && p !== "prod")
    throw new Error(`REDIS_KEY_PREFIX must be "prod" in production (got "${p}")`);
  return p as (typeof PREFIXES)[number];
}

export const redisKey = (key: string) => `${redisKeyPrefix()}:${key}`;
