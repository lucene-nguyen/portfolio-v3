// Source: the owner's approved home page mockup ("Cuong Nguyen Portfolio" canvas, 2026-10-31).
// Unknown values stay [PLACEHOLDER]; never fill them in without the owner. They don't render (lib/placeholder).
import { features } from "@/lib/features";
import { shown } from "@/lib/placeholder";

export const profile = {
  name: "Nguyen Manh Cuong",
  handle: "cuong",
  logo: "Cuong Nguyen",
  title: "Fullstack Software Engineer",
  siteDescription:
    "Fullstack Software Engineer building web apps end to end: React and Next.js, Node.js and NestJS, PostgreSQL, MongoDB, Redis and AWS.",
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
  menu: "Menu",
  viewWork: "View case studies",
  seeExperience: "See my experience",
  workWithMe: "Work with me",
  viewRepo: "View on GitHub",
  readCaseStudy: "Read case study",
  technologies: "Technologies",
  intro: "Introduction",
  github: "GitHub",
  linkedin: "LinkedIn",
  resume: "resume.pdf",
};

// Home section order (LEARNING-164); eyebrow numbers follow it, so parked sections leave no gaps.
const sections = [
  "skills",
  "experience",
  ...(features.caseStudies ? ["work"] : []),
  ...(features.lab ? ["lab"] : []),
  "kits",
  "work-with-me",
  "contact",
];
const no = (id: string) => String(sections.indexOf(id) + 1).padStart(2, "0");

export const nav = [
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  ...(features.caseStudies ? [{ href: "/#work", label: "Work" }] : []),
  ...(features.lab ? [{ href: "/#lab", label: "Live lab" }] : []),
  { href: "/#kits", label: "Starter kits" },
  { href: "/#work-with-me", label: "Work with me" },
  { href: "/#contact", label: "Contact" },
];

export const hero = {
  eyebrow: `> whoami — ${profile.name}`,
  headline: "I build web products that bring real value to users and businesses.",
  subline:
    "My goal is to become an expert in web development, so I keep learning and improving every day.",
  lead: "Fullstack Software Engineer with 5+ years building web apps end to end — React and Next.js on the front end, Node.js and NestJS APIs on the back end, PostgreSQL, MongoDB and Redis for data, and AWS to run it in production.",
  workWithMeHref: "#work-with-me",
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
  eyebrow: `${no("work")} / selected work`,
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

/** Case studies linked from anywhere on the site: none while the section is parked (lib/features). */
export const publicStudies = features.caseStudies ? work.items : [];

export const systemMap = {
  eyebrow: "00 / system map",
  title: "System map",
  intro: features.caseStudies
    ? "Each node is a project. Hover or focus a node for its stack and impact; select it to open the case study."
    : "Each node is a role or my starter kits. Hover or focus a node for the details; select it to jump to that section.",
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
  menu: "Pages",
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
  entryTitle: "Explore in 3D",
  instructions:
    "Walk with the arrow keys or W A S D (or the on-screen pad). Step onto a glowing pad to open that section.",
  canvasLabel: "3D world. Use arrow keys or W A S D to walk; reaching a pad opens its section.",
  skip: "Skip to content",
  enter: "Enter 3D world",
  zonesLabel: "Go directly to",
  zones: {
    experience: "Experience",
    work: "Work",
    lab: "Live lab",
    kits: "Starter kits",
    contact: "Contact",
  },
  pad: { forward: "Walk forward", back: "Walk back", left: "Walk left", right: "Walk right" },
  loading: "Loading the world…",
  failed: "3D is not available on this device. Showing the standard page.",
  padLabel: "Movement pad",
};

export const swissCopy = { showGrid: "Show grid" };

export const lab = {
  eyebrow: `${no("lab")} / live lab`,
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
  eyebrow: `${no("kits")} / side projects`,
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
/** Collaboration types (LEARNING-166/167): Work with me CTAs preselect one in the Contact form. */
export const collabTypes = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "freelance", label: "Freelance project" },
  { id: "consulting", label: "Consulting" },
] as const;
export type CollabType = (typeof collabTypes)[number]["id"];

// Service names and steps from the owner; one-line copy via design:ux-copy (no claims, no prices).
export const workWithMe = {
  eyebrow: `${no("work-with-me")} / work with me`,
  title: "Work with me",
  intro:
    "Need a web app built, a backend scaled, or a second opinion on your architecture? Here's how I can help.",
  services: [
    {
      name: "End-to-end web apps",
      description: "I design and build the whole app: front end, API, database and deployment.",
      cta: "Discuss a web app",
      type: "freelance",
    },
    {
      name: "Backend, API and AWS",
      description:
        "APIs, background jobs and data pipelines in Node.js and NestJS, running on AWS.",
      cta: "Discuss a backend",
      type: "freelance",
    },
    {
      name: "Industry starter kits",
      description:
        "Foundations for restaurant ordering (TableTap), appointment booking and a small-team CRM, tailored to your business.",
      cta: "Ask about a kit",
      type: "freelance",
      kits: ["TableTap", "Booking kit", "CRM kit"],
    },
    {
      name: "Architecture consulting",
      description: "A second pair of eyes on your architecture, performance and scaling decisions.",
      cta: "Request a review",
      type: "consulting",
    },
  ] satisfies {
    name: string;
    description: string;
    cta: string;
    type: CollabType;
    kits?: string[];
  }[],
  stepsTitle: "How I work",
  stepLabel: (n: number) => `Step ${n}`,
  steps: [
    { name: "Discuss", description: "We talk through your goals, users and constraints." },
    { name: "Proposal", description: "You get a written scope and plan to agree on." },
    {
      name: "Build",
      description: "Spec → code → test → review, in small steps you can follow.",
    },
    {
      name: "Hand-over and support",
      description: "You get the code and docs, with support during the hand-over.",
    },
  ],
};

// Owner-provided (LEARNING-165). Icons: components/home/skill-icon.tsx.
export const skills = {
  eyebrow: `${no("skills")} / skills`,
  title: "Skills",
  groups: [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"] },
    { name: "Backend", items: ["Node.js", "NestJS", "GraphQL", "REST", "WebSocket"] },
    {
      name: "Data & messaging",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "RabbitMQ", "Kafka"],
    },
    { name: "Cloud & DevOps", items: ["AWS", "Docker", "GitHub Actions", "Grafana"] },
  ],
  secondary: { name: "Also familiar with", items: ["Go", "Python"] },
};

export const experience = {
  eyebrow: `${no("experience")} / experience`,
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
};

export const contact = {
  eyebrow: `${no("contact")} / contact`,
  title: "Have a system that needs to scale? Let's talk.",
  footer: [`© 2026 ${profile.name}`, "built with Next.js · deployed on Vercel"],
};
