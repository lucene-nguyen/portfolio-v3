export interface TerminalContext {
  projects: { slug: string; title: string }[];
  themes: { id: string; name: string }[];
  resume: string[];
}

export type Line = { kind: "out" | "err"; text: string };

export type Action =
  { type: "navigate"; href: string } | { type: "theme"; id: string } | { type: "clear" };

export interface Result {
  lines: Line[];
  action?: Action;
}

export const COMMANDS = ["help", "ls", "cat", "open", "theme", "contact", "clear"] as const;

const HELP = [
  "help              list commands",
  "ls projects       list case studies",
  "cat resume        print a short resume",
  "open <slug>       open a case study",
  "theme [id]        list themes or switch to one",
  "contact           go to the contact section",
  "clear             clear the screen",
];

const out = (...text: string[]): Line[] => text.map((t) => ({ kind: "out", text: t }));
const err = (text: string): Line[] => [{ kind: "err", text: `error: ${text}` }];

// Without public case studies (LEARNING-164) the project commands don't exist;
// with a single theme (LEARNING-184) there is nothing to switch to.
const PROJECT_COMMANDS = ["ls", "open"];
const available = (ctx: TerminalContext) =>
  COMMANDS.filter(
    (c) =>
      (ctx.projects.length > 0 || !PROJECT_COMMANDS.includes(c)) &&
      (c !== "theme" || ctx.themes.length > 1),
  );

export function run(input: string, ctx: TerminalContext): Result {
  const [first = "", ...args] = input.trim().split(/\s+/);
  const cmd = first && !available(ctx).some((c) => c === first) ? `?${first}` : first;
  const arg = args.join(" ");

  switch (cmd) {
    case "":
      return { lines: [] };
    case "help":
      return {
        lines: out(...HELP.filter((h) => available(ctx).some((c) => h.startsWith(`${c} `)))),
      };
    case "clear":
      return { lines: [], action: { type: "clear" } };
    case "ls":
      if (arg !== "projects") return { lines: err("usage: ls projects") };
      return { lines: out(...ctx.projects.map((p) => `${p.slug.padEnd(20)} ${p.title}`)) };
    case "cat":
      if (arg !== "resume") return { lines: err("usage: cat resume") };
      return { lines: out(...ctx.resume) };
    case "open": {
      const p = ctx.projects.find((x) => x.slug === arg);
      if (!p) return { lines: err(`no case study "${arg}". Try: ls projects`) };
      return {
        lines: out(`opening ${p.slug}…`),
        action: { type: "navigate", href: `/work/${p.slug}` },
      };
    }
    case "theme": {
      if (!arg) return { lines: out(...ctx.themes.map((t) => `${t.id.padEnd(20)} ${t.name}`)) };
      const t = ctx.themes.find((x) => x.id === arg);
      if (!t) return { lines: err(`unknown theme "${arg}". Try: theme`) };
      return { lines: out(`theme set to ${t.name}`), action: { type: "theme", id: t.id } };
    }
    case "contact":
      return { lines: [], action: { type: "navigate", href: "/#contact" } };
    default:
      return { lines: err(`command not found: ${first}. Try: help`) };
  }
}

/** Tab completion: completes the command, then its argument. Returns the input unchanged when ambiguous. */
export function complete(input: string, ctx: TerminalContext): string {
  const parts = input.trimStart().split(/\s+/);
  if (parts.length === 1)
    return uniqueCompletion(parts[0], available(ctx), (c) => `${c} `) ?? input;

  const [cmd, partial = ""] = parts;
  const options: Record<string, string[]> = {
    ls: ["projects"],
    cat: ["resume"],
    open: ctx.projects.map((p) => p.slug),
    theme: ctx.themes.map((t) => t.id),
  };
  const candidates = options[cmd];
  if (!candidates || parts.length > 2) return input;
  return uniqueCompletion(partial, candidates, (c) => `${cmd} ${c}`) ?? input;
}

function uniqueCompletion(prefix: string, all: string[], format: (c: string) => string) {
  const matches = all.filter((c) => c.startsWith(prefix));
  return matches.length === 1 ? format(matches[0]) : undefined;
}
