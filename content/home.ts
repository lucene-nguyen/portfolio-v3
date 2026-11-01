// Source: the owner's approved home page mockup ("Cuong Nguyen Portfolio" canvas, 2026-10-31).
// Unknown values stay [PLACEHOLDER]; never fill them in without the owner. They don't render (lib/placeholder).
import { shown } from "@/lib/placeholder";

export const profile = {
  name: "Nguyen Manh Cuong",
  handle: "cuong",
  title: "Fullstack Software Engineer",
  siteDescription: "Case studies, a live rate-limiting lab, and starter kits.",
  email: "manhcuongmvc@gmail.com",
  github: "https://github.com/lucene-nguyen",
  githubLabel: "github.com/lucene-nguyen",
  linkedin: "https://www.linkedin.com/in/cuong-m-nguyen/",
  resumeUrl: "[PLACEHOLDER]",
  avatar: { src: "/avatar.jpg", alt: "Nguyen Manh Cuong smiling on a hiking trail" },
  avatarCaption: "// off-duty: on a trail",
  status: "open to work",
};

export const labels = {
  viewWork: "View case studies",
  readCaseStudy: "Read case study",
  technologies: "Technologies",
  intro: "Introduction",
  github: "GitHub",
  linkedin: "LinkedIn",
  resume: "resume.pdf",
};

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#lab", label: "Live lab" },
  { href: "/#kits", label: "Starter kits" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export const hero = {
  eyebrow: `> whoami — ${profile.name}`,
  headline: "I build backends that stay fast when traffic doesn't stay calm.",
  lead: "Fullstack Software Engineer with 5+ years in Node.js, NestJS, TypeScript and AWS. I design event-driven services, async processing pipelines and the production operations that keep them healthy — across pharmacy retail, fintech, e-commerce and AI.",
  stats: [
    { value: "5+ yrs", label: "building production backends" },
    { value: "2,500+", label: "stores on services I shipped" },
    { value: "300→20ms", label: "inventory API latency", highlight: true },
    { value: "AWS", label: "Certified Developer – Associate" },
  ],
};

export interface CaseStudySummary {
  slug: string;
  meta: string;
  period: string;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  tags: string[];
}

export const work = {
  eyebrow: "01 / selected work",
  title: "Case studies",
  backLabel: "All case studies",
  intro:
    "Problem, constraints, architecture and the trade-offs behind each decision. Client details are generalized where NDAs apply.",
  items: [
    {
      slug: "pharmacy-inventory",
      meta: "Pharmacy retail · FPT",
      period: "2024–2025",
      title: "Cutting inventory latency 15× for 2,500+ pharmacy stores",
      summary:
        "Redis-backed inventory services in a NestJS microservice platform serving millions of users, plus a dedicated worker service for reports and large Excel imports.",
      metrics: [
        { value: "20ms", label: "from 300ms avg" },
        { value: "−40%", label: "database load" },
      ],
      tags: ["NestJS", "Redis", "Elasticsearch", "Worker Threads"],
    },
    {
      slug: "ai-image-pipeline",
      meta: "AI · Japanese client",
      period: "2025",
      title: "A non-blocking AI image pipeline on Databricks",
      summary:
        "Streaming uploads that return a job ID instantly, Worker Thread preprocessing, retries and dead-letter queues before Model Serving, and live results over WebSocket.",
      metrics: [
        { value: "0 OOM", label: "on large uploads" },
        { value: "[PLACEHOLDER]", label: "p95 job latency" },
      ],
      tags: ["Node.js streams", "Databricks", "PostgreSQL", "WebSocket"],
    },
    {
      slug: "aws-file-ingestion",
      meta: "Data platform · Australian client",
      period: "2026",
      title: "Hands-off file ingestion on AWS S3 and Lambda",
      summary:
        "Scheduled Lambdas aggregate CSV drops into one JSON dataset every five minutes; NestJS serves it downstream, with async large-file handling and SES alerts.",
      metrics: [
        { value: "5 min", label: "refresh cycle" },
        { value: "[PLACEHOLDER]", label: "manual work saved / wk" },
      ],
      tags: ["AWS Lambda", "S3", "SES", "NestJS"],
    },
  ].map((c) => ({
    ...c,
    metrics: c.metrics.filter((m) => shown(m.value)),
  })) satisfies CaseStudySummary[],
};

export const systemMap = {
  eyebrow: "00 / system map",
  title: "System map",
  intro:
    "Each node is a project. Hover or focus a node for its stack and impact; select it to open the case study.",
  listToggle: "View as list",
};

export const achievementsCopy = {
  button: "Achievements",
  title: "Achievements",
  unlocked: "Achievement unlocked",
  statusUnlocked: "Unlocked",
  statusLocked: "Locked",
  sound: "Sound effects",
  close: "Close",
  items: {
    reader: { name: "Bookworm", hint: "Open a case study." },
    "rate-limited": { name: "Slow down!", hint: "Trigger a 429 in the live lab." },
    explorer: { name: "Explorer", hint: "Try every theme." },
  },
};

export const hudCopy = {
  client: "CLIENT",
  firewall: "FIREWALL",
  server: "/api/ping",
  packet: "PKT",
  blocked: "BLOCKED",
};

export const readingCopy = {
  progress: "Reading progress",
  readTime: (min: number) => `${min} min read`,
  textSize: "Text size",
  sizes: { s: "Small", m: "Medium", l: "Large" },
  toc: "On this page",
};

export const docsCopy = {
  sidebar: "Docs",
  home: "Home",
  menu: "Menu",
  close: "Close",
  search: "Search",
  searchHint: "/ or Ctrl/⌘ K",
  searchLabel: "Search the site",
  placeholder: "Search case studies, stack, experience…",
  results: (n: number) => `${n} result${n === 1 ? "" : "s"}`,
  noResults: "No results. Try: Redis, Lambda, NestJS, Databricks.",
  searching: "Searching…",
  loadFailed: "Search is unavailable right now. Close and try again.",
  breadcrumb: "Breadcrumb",
};

export const dashboardCopy = {
  eyebrow: "00 / observability",
  title: "Dashboard",
  sourceLabel: "Source",
  unavailable: "Unavailable right now — showing the last known values, if any.",
  traffic: {
    title: "Live lab traffic (all visitors)",
    source: "/api/ping outcomes across all visitors, last 60 s, refreshed every 5 s",
    rps: "req/s (last 10 s avg)",
    ok: "200 OK",
    limited: "429 Too Many Requests",
    ratio: "blocked share",
    chart:
      "Requests per second over the last 60 seconds: 200 responses as a solid line, 429 as a dashed line.",
  },
  github: {
    title: "GitHub activity",
    source: "GitHub REST API, public data, cached 1 h",
    repos: "public repos",
    events: "recent public events",
  },
  career: {
    title: "Career uptime",
    source: "Experience section",
    since: (d: string) => `since ${d}`,
    years: "years shipping",
  },
  stack: {
    title: "Stack usage",
    source: "Technology tags of the case studies",
    caption: "case studies using each technology",
  },
  timeline: { title: "Timeline", source: "Experience section" },
};

export const ideCopy = {
  project: "portfolio-v3",
  explorer: "Explorer",
  openEditors: "Open editors",
  editor: "Editor",
  close: (name: string) => `Close ${name}`,
  palette: "Go to file",
  paletteHint: "Ctrl/⌘ K",
  placeholder: "Type a file name…",
  noMatch: "No matching file.",
  closeDrawer: "Close",
};

export const bentoCopy = {
  title: "At a glance",
  hint: "Drag tiles or use the arrows to rearrange. Your layout is saved in this browser.",
  reset: "Reset layout",
  moveUp: (name: string) => `Move ${name} earlier`,
  moveDown: (name: string) => `Move ${name} later`,
  moved: (name: string, pos: number, total: number) =>
    `${name} moved to position ${pos} of ${total}.`,
  resetDone: "Layout reset.",
  tiles: {
    about: "About",
    photo: "Photo",
    stats: "Key numbers",
    stack: "Stack",
    lab: "Live lab",
    contact: "Contact",
  },
  labCta: "Try the rate limiter",
};

export const stickerCopy = {
  title: "Sticker board",
  hint: "Drag the stickers around. Select one to see the projects that use it.",
  listLabel: "Filter projects by skill",
  clear: "Show all",
  results: (skill: string, n: number) => `${n} project${n === 1 ? "" : "s"} using ${skill}`,
  all: (n: number) => `All ${n} projects`,
};

export const mangaCopy = {
  title: "The story so far",
  intro: "Career as a short manga strip: one panel per role, oldest first.",
  textToggle: "Read the story as plain text",
  chapter: (n: number) => `Chapter ${n}`,
  artNote: "[PLACEHOLDER: commissioned artwork] Abstract placeholder panels; no characters.",
  panelAlt: (company: string, period: string) =>
    `Abstract manga panel for ${company} (${period}): radiating speed lines and halftone dots around a laptop icon. No characters.`,
};

export const worldCopy = {
  title: "3D world",
  instructions:
    "Walk with the arrow keys or W A S D (or the on-screen pad). Step onto a glowing pad to open that section.",
  canvasLabel: "3D world. Use arrow keys or W A S D to walk; reaching a pad opens its section.",
  skip: "Skip to content",
  enter: "Enter 3D world",
  zonesLabel: "Go directly to",
  zones: { work: "Work", lab: "Live lab", kits: "Starter kits", contact: "Contact" },
  pad: { forward: "Walk forward", back: "Walk back", left: "Walk left", right: "Walk right" },
  loading: "Loading the world…",
  failed: "3D is not available on this device. Showing the standard page.",
  padLabel: "Movement pad",
};

export const lab = {
  eyebrow: "02 / live lab",
  title: "Try to break my rate limiter",
  intro:
    "Hit the endpoint as fast as you like. Watch how token bucket and fixed window treat the same burst differently — the same trade-off I work through in",
  repo: { label: "rate-limiting-lab", href: "https://github.com/lucene-nguyen/rate-limiting-lab" },
  ui: {
    algorithm: "Algorithm",
    token: "Token bucket",
    window: "Fixed window",
    tokensLabel: "tokens in bucket",
    windowLabel: "requests left in window",
    send: "Send request",
    burst: "Burst × 10",
    reset: "Reset",
    resetDone: "Limiter and log reset.",
    resetFailed: "Reset failed, try again.",
    resetsIn: (s: number) => `resets in ${s}s`,
    meterText: (n: number, max: number) => `${n} of ${max} requests left`,
    sent: (n: number, ok: number, blocked: number) => `${n} sent: ${ok} × 200, ${blocked} × 429.`,
    ok: "OK",
    tooMany: "Too Many Requests",
    error: "Error",
    networkError: "Network error",
    counters: "Response counts",
    logLabel: "Request log, newest first",
    empty: "$ waiting for requests…",
  },
  facts: [
    "Capacity: 5 requests",
    "Token bucket refills 1 token / second",
    "Fixed window resets every 5 seconds",
  ],
};

export const kits = {
  eyebrow: "03 / side projects",
  title: "Starter kits & labs",
  items: [
    {
      name: "TableTap",
      status: "in progress",
      state: "active",
      description: "QR-code table ordering starter kit for restaurants and cafés.",
      stack: "Next.js · NestJS · PostgreSQL",
      href: "[PLACEHOLDER]",
    },
    {
      name: "Booking kit",
      status: "planned",
      state: "planned",
      description: "Appointment booking starter for clinics, salons and studios.",
      stack: "[PLACEHOLDER]",
      href: "[PLACEHOLDER]",
    },
    {
      name: "CRM kit",
      status: "planned",
      state: "planned",
      description: "Lightweight CRM foundation for small sales teams.",
      stack: "[PLACEHOLDER]",
      href: "[PLACEHOLDER]",
    },
    {
      name: "rate-limiting-lab",
      status: "public repo",
      state: "active",
      description: "Production rate-limiting strategies and their failure modes, tested hands-on.",
      stack: "Node.js · Redis",
      href: "https://github.com/lucene-nguyen/rate-limiting-lab",
    },
  ] as const,
};

export const experience = {
  eyebrow: "04 / experience",
  title: "Where I've shipped",
  roles: [
    {
      period: "03/2024 – 07/2026",
      company: "FPT Software",
      summary:
        "Software Engineer — Long Châu Pharmacy platform, AI image processing (Japan), AWS data workflows (Australia). Mentored junior engineers.",
    },
    {
      period: "08/2022 – 03/2024",
      company: "NEOX",
      summary:
        "Software Engineer, fintech — GraphQL & REST APIs, NiFi pipelines MongoDB → PostgreSQL, CI/CD with SonarQube.",
    },
    {
      period: "01/2021 – 08/2022",
      company: "Faboshop",
      summary:
        "Founding engineer, social commerce — picked the stack, Redis auth & token rotation, APIs for web, iOS and Android.",
    },
  ],
  stackLabel: "stack.json",
  stack: [
    {
      name: "Backend",
      items: [
        "Node.js",
        "NestJS",
        "TypeScript",
        "GraphQL",
        "WebSocket",
        "RabbitMQ",
        "Kafka",
        "NATS",
      ],
    },
    { name: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch"] },
    {
      name: "Cloud & DevOps",
      items: [
        "AWS Lambda",
        "ECS",
        "EC2",
        "S3",
        "CloudWatch",
        "Docker",
        "GitHub Actions",
        "Grafana",
      ],
    },
    { name: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { name: "Architecture", items: ["Microservices", "Event-driven", "Clean Architecture"] },
  ],
};

export const contact = {
  eyebrow: "05 / contact",
  title: "Have a system that needs to scale? Let's talk.",
  footer: [`© 2026 ${profile.name}`, "built with Next.js · deployed on Vercel"],
};
