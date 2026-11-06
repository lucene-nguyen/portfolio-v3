import {
  Bell,
  Clock,
  Cpu,
  Database,
  FileSpreadsheet,
  HardDrive,
  Layers,
  type LucideIcon,
  Radio,
  Search,
  Server,
  Sparkles,
  Store,
  Upload,
  Users,
} from "lucide-react";
import { shown } from "@/lib/placeholder";

// Generic technology icons (Lucide ships no brand logos).
const ICONS = {
  clients: Users,
  stores: Store,
  upload: Upload,
  service: Server,
  cache: Layers,
  database: Database,
  search: Search,
  worker: Cpu,
  file: FileSpreadsheet,
  storage: HardDrive,
  schedule: Clock,
  model: Sparkles,
  realtime: Radio,
  alert: Bell,
} satisfies Record<string, LucideIcon>;

export interface DiagramNode {
  label: string;
  tech: string;
  icon: keyof typeof ICONS;
}

/**
 * A left-to-right flow (wraps on small screens) plus optional side services.
 * Rendered as an ordered list so the architecture is readable without the visuals.
 */
export function ArchitectureDiagram({
  title,
  flow,
  side = [],
}: {
  title: string;
  flow: DiagramNode[];
  side?: DiagramNode[];
}) {
  return (
    <figure className="my-8 rounded-2xl border border-border bg-surface p-5 sm:p-7">
      <ol className="flex flex-wrap items-stretch gap-3" aria-label={`${title}: request flow`}>
        {flow.map((n, i) => (
          <li key={n.label} className="flex items-center gap-3">
            <Node node={n} />
            {i < flow.length - 1 && (
              <span aria-hidden className="font-mono text-text-subtle">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      {side.length > 0 && (
        <ul
          className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4"
          aria-label={`${title}: supporting services`}
        >
          {side.map((n) => (
            <li key={n.label}>
              <Node node={n} />
            </li>
          ))}
        </ul>
      )}
      <figcaption className="mt-4 font-mono text-xs text-text-muted">{title}</figcaption>
    </figure>
  );
}

function Node({ node }: { node: DiagramNode }) {
  const Icon = ICONS[node.icon];
  return (
    <div className="flex min-w-[150px] items-center gap-3 rounded-[10px] border border-border-strong bg-bg px-3 py-2.5">
      <Icon size={20} aria-hidden className="shrink-0 text-accent" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-text">{node.label}</span>
        {shown(node.tech) && <span className="font-mono text-xs text-text-muted">{node.tech}</span>}
      </div>
    </div>
  );
}
