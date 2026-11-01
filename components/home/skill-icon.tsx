import { ArrowLeftRight, Braces, Cloud, type LucideIcon } from "lucide-react";
import {
  siApachekafka,
  siDocker,
  siElasticsearch,
  siGithubactions,
  siGo,
  siGrafana,
  siGraphql,
  siJavascript,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siRabbitmq,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

// Simple Icons (CC0), imported per icon so only these ship. Monochrome: they take the theme's text colour.
const brand: Record<string, SimpleIcon> = {
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  NestJS: siNestjs,
  GraphQL: siGraphql,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Redis: siRedis,
  Elasticsearch: siElasticsearch,
  RabbitMQ: siRabbitmq,
  Kafka: siApachekafka,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  Grafana: siGrafana,
  Go: siGo,
  Python: siPython,
};

// No brand icon available (or none that fits): a neutral one.
const generic: Record<string, LucideIcon> = {
  AWS: Cloud,
  REST: Braces,
  WebSocket: ArrowLeftRight,
};

export const hasSkillIcon = (name: string) => name in brand || name in generic;

/** Decorative: the skill's name is always shown next to it. */
export function SkillIcon({ name, size = 16 }: { name: string; size?: number }) {
  const icon = brand[name];
  if (icon)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        data-icon="brand"
      >
        <path d={icon.path} />
      </svg>
    );
  const Generic = generic[name];
  return Generic ? <Generic size={size} aria-hidden data-icon="generic" /> : null;
}
