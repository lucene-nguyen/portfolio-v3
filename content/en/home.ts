// Source: the owner's approved home page mockup ("Cuong Nguyen Portfolio" canvas, 2026-10-31).
// Unknown values stay [PLACEHOLDER]; never fill them in without the owner. They don't render (lib/placeholder).
import { features } from "@/lib/features";
import type { CollabType } from "../collab";
import { shown } from "@/lib/placeholder";

// Certificate URLs from docs/resume/resume-source.txt (hero stats + Education & Certifications).
export const certificates = {
  aws: "https://www.credly.com/badges/ceb07f06-52f7-4067-850c-83162dc7ee60",
  udacity: "https://www.udacity.com/certificate/e/5448d244-6532-11ef-bdfa-8b8c4cf38908",
};

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
  resumeUrl:
    "https://drive.google.com/file/d/1Cnr0omhnu2RNk_s8fV_rvQoCOqVWIdTX/view?usp=drive_link",
  avatar: { src: "/avatar.jpg", alt: "Nguyen Manh Cuong smiling on a hiking trail" },
  avatarCaption: "// off-duty: on a trail",
  status: "open to work",
};

// Language switcher (LEARNING-168): links to the other locale.
export const language = {
  label: "Tiếng Việt",
  hrefLang: "vi",
  href: "/vi",
  ariaLabel: "Xem trang bằng tiếng Việt",
};

export const labels = {
  theme: "Theme",
  themeChanged: (name: string) => `Theme: ${name}`,
  mainNav: "Main",
  skip: "Skip to content",
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
  resume: "View CV",
  contactMe: "Contact me",
  newTab: "(opens in a new tab)",
};

// Home section order (LEARNING-164); eyebrow numbers follow it, so parked sections leave no gaps.
const sections = [
  "skills",
  "experience",
  ...(features.caseStudies ? ["work"] : []),
  ...(features.lab ? ["lab"] : []),
  "kits",
  ...(features.workWithMe ? ["work-with-me"] : []),
  "contact",
];
const no = (id: string) => String(sections.indexOf(id) + 1).padStart(2, "0");

export const nav = [
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  ...(features.caseStudies ? [{ href: "/#work", label: "Work" }] : []),
  ...(features.lab ? [{ href: "/#lab", label: "Live lab" }] : []),
  { href: "/#kits", label: "Starter kits" },
  ...(features.workWithMe ? [{ href: "/#work-with-me", label: "Work with me" }] : []),
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
    { value: "5+ yrs", label: "building production backends", href: "" },
    { value: "AWS", label: "Certified Developer – Associate (DVA-C02)", href: certificates.aws },
    { value: "Udacity", label: "Cloud Developer", href: certificates.udacity },
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
  ] satisfies {
    name: string;
    status: string;
    state: "active" | "planned";
    description: string;
    stack: string;
    href: string;
  }[],
};
/** Collaboration types (LEARNING-166/167): Work with me CTAs preselect one in the Contact form. */
export const collabTypes: { id: CollabType; label: string }[] = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "freelance", label: "Freelance project" },
  { id: "consulting", label: "Consulting" },
];

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
  // Verbatim from docs/resume/resume-source.txt (LEARNING-183): only the owner-listed typo fixes are applied.
  // Tags list only words that appear in that entry's bullets (checked by content/experience.test.ts).
  roles: [
    {
      period: "03/2024 – 07/2026",
      company: "FPT Software",
      summary:
        "Software Engineer — Long Châu Pharmacy platform, AI image processing (Japan), AWS data workflows (Australia). Mentored junior engineers.",
      entries: [
        {
          title: "Software Engineer",
          period: "01/2026 – 07/2026",
          context: "Australian clients (data processing on AWS)",
          tags: ["NestJS", "AWS S3", "AWS Lambda", "Python", "Node.js", "AWS SES"],
          bullets: [
            {
              text: "Worked directly with Australian clients to gather and clarify business requirements through regular meetings and technical discussions.",
              result:
                "Translated client requirements into practical backend solutions and aligned implementation with business needs.",
            },
            {
              text: "Built NestJS services for a file-driven data processing workflow on top of AWS S3.",
              result:
                "Centralized JSON-based data access for downstream systems and improved consistency across transformations.",
            },
            {
              text: "Implemented scheduled AWS Lambda jobs in Python, Node.js to scan S3 buckets every five minutes and aggregate multiple CSV files into a single JSON dataset.",
              result: "Persisted the processed output automatically.",
            },
            {
              text: "Designed asynchronous large-file processing and integrated AWS SES notifications.",
              result:
                "Improved throughput and reduced manual intervention in data transformation workflows.",
            },
            {
              text: "Structured the workflow around automated file ingestion, transformation, and notification steps.",
              result:
                "Enabled recurring data updates to run reliably with minimal operator involvement.",
            },
            {
              text: "Collaborated with backend and DevOps engineers to integrate NestJS, Lambda, S3, and SES into a stable distributed workflow.",
              result: "Ensured reliable service-to-service communication.",
            },
          ],
        },
        {
          title: "Software Engineer",
          period: "09/2025 – 12/2025",
          context: "Japanese clients (AI, Databricks)",
          tags: [
            "Databricks",
            "REST APIs",
            "Node.js",
            "Worker Threads",
            "PostgreSQL",
            "TypeORM",
            "WebSocket",
          ],
          bullets: [
            {
              text: "Worked directly with Japanese clients to gather and clarify business requirements through regular meetings and technical discussions.",
              result:
                "Translated client requirements into practical backend solutions and aligned implementation with business needs.",
            },
            {
              text: "Owned backend development from architecture design to production deployment, researching the Databricks platform.",
              result: "Designed a production-ready solution on Databricks Apps.",
            },
            {
              text: "Designed streaming-based REST APIs for large image uploads, returning job IDs immediately while processing requests asynchronously.",
              result: "Avoided blocking the Node.js event loop and prevented out-of-memory issues.",
            },
            {
              text: "Designed an event-driven processing pipeline using Worker Threads, job queues, retry policies, and dead-letter queues.",
              result: "Enabled resilient image preprocessing and AI inference.",
            },
            {
              text: "Implemented CPU-intensive preprocessing with Worker Threads before dispatching jobs to Databricks Model Serving.",
              result: "Kept backend APIs responsive under heavy workloads.",
            },
            {
              text: "Designed PostgreSQL data models with TypeORM, foreign keys, unique constraints, and cascading relationships.",
              result:
                "Ensured data integrity and supported reliable, scalable AI processing workflows.",
            },
            {
              text: "Designed real-time job tracking where AI workers persisted results and published completion events.",
              result:
                "Enabled the backend to deliver live status updates and inference results to the frontend through WebSocket.",
            },
            {
              text: "Implemented secure application-level and user-level authorization for Databricks Apps.",
              result: "Protected shared AI workspaces and customer-facing services.",
            },
          ],
        },
        {
          title: "Software Engineer – FPT Retail – Long Châu Pharmacy",
          period: "03/2024 – 09/2025",
          context: "",
          tags: [
            "Node.js",
            "NestJS",
            "TypeScript",
            "Worker Threads",
            "Redis",
            "Elasticsearch",
            "AWS S3",
          ],
          bullets: [
            {
              text: "Developed and enhanced backend microservices for Long Châu’s pharmacy retail platform, supporting more than 2,500 stores and millions of users, while mentoring junior engineers.",
              result:
                "Consistently delivered complex backend features on schedule under tight business deadlines.",
            },
            {
              text: "Designed and implemented scalable RESTful APIs using Node.js, NestJS, and TypeScript, applying SOLID principles and Clean Architecture.",
              result: "Built maintainable, extensible, and production-ready backend services.",
            },
            {
              text: "Designed, implemented, and owned a dedicated Worker Service responsible for document generation and large-file processing using Worker Threads and asynchronous processing.",
              result:
                "Generated Word reports and handled Excel import/export workflows while keeping APIs responsive under heavy workloads. Published job completion events and delivered generated files through a real-time notification system.",
            },
            {
              text: "Designed and implemented Redis-backed inventory services.",
              result:
                "Reduced average API response time from 300 ms to 20 ms, lowered database load by approximately 40%, and optimized infrastructure costs for high-traffic inventory operations.",
            },
            {
              text: "Built Elasticsearch-powered search services and secure AWS S3 file upload/download workflows using Presigned URLs.",
              result:
                "Improved search performance, secure file handling, and operational efficiency across multiple business domains.",
            },
            {
              text: "Migrated legacy services to a modern NestJS-based microservice architecture while adopting standardized engineering practices.",
              result:
                "Improved maintainability, modularity, production reliability, and long-term scalability.",
            },
            {
              text: "Collaborated closely with backend engineers across multiple microservices, product managers, QA engineers, and cross-functional teams to design scalable technical solutions and define service contracts.",
              result: "Ensured seamless integration between distributed services.",
            },
            {
              text: "Partnered with the DevOps team to optimize Node.js production environments, including application configuration, resource utilization, deployment strategies, and runtime performance.",
              result: "Improved service stability and operational efficiency.",
            },
            {
              text: "Supported production operations by monitoring application health, troubleshooting incidents, optimizing system performance, and resolving production issues.",
              result: "Ensured reliable service delivery.",
            },
          ],
        },
      ],
    },
    {
      period: "08/2022 – 03/2024",
      company: "NEOX",
      summary:
        "Software Engineer, fintech — GraphQL & REST APIs, NiFi pipelines MongoDB → PostgreSQL, CI/CD with SonarQube.",
      entries: [
        {
          title: "Software Engineer",
          period: "08/2022 – 03/2024",
          context: "Fintech",
          tags: [
            "NestJS",
            "Apollo Server",
            "TypeScript",
            "GraphQL",
            "Apache NiFi",
            "MongoDB",
            "PostgreSQL",
            "SonarQube",
            "ESLint",
            "Node.js",
            "Cloudflare",
            "Mailjet",
          ],
          bullets: [
            {
              text: "Developed RESTful APIs for internal service communication and GraphQL APIs for frontend applications using NestJS, Apollo Server, and TypeScript.",
              result: "Provided efficient and flexible data access across fintech platforms.",
            },
            {
              text: "Designed and implemented Apache NiFi data pipelines to continuously synchronize operational data from MongoDB to PostgreSQL.",
              result:
                "Enabled complex SQL-based reporting and business analytics without impacting production workloads.",
            },
            {
              text: "Improved software quality and deployment reliability by enhancing CI/CD pipelines, integrating SonarQube, ESLint, and automated testing.",
              result:
                "Modernized legacy Node.js services to improve maintainability and code quality.",
            },
            {
              text: "Researched, integrated, and deployed Cloudflare for document uploads and Mailjet for email notifications within the microservice platform.",
              result:
                "Enabled secure file upload workflows and reliable email delivery while reducing infrastructure complexity and operational overhead.",
            },
            {
              text: "Collaborated closely with backend engineers, product managers, QA engineers, and business stakeholders to design microservice and event-driven solutions and define API contracts.",
              result:
                "Delivered scalable backend architectures aligned with business requirements.",
            },
          ],
        },
      ],
    },
    {
      period: "01/2021 – 08/2022",
      company: "Faboshop",
      summary:
        "Founding engineer, social commerce — picked the stack, Redis auth & token rotation, APIs for web, iOS and Android.",
      entries: [
        {
          title: "Software Engineer",
          period: "01/2021 – 08/2022",
          context: "E-commerce",
          tags: [
            "NestJS",
            "MongoDB",
            "PostgreSQL",
            "Node.js",
            "TypeScript",
            "Redis",
            "Firebase Cloud Messaging",
            "Google Cloud Storage",
            "Facebook APIs",
          ],
          bullets: [
            {
              text: "Joined the founding engineering team and played a key role in evaluating and selecting the technology stack, including NestJS and supporting libraries.",
              result:
                "Contributed to backend architecture, database schema design, and engineering standards for a social commerce platform built on MongoDB and PostgreSQL.",
            },
            {
              text: "Designed and developed scalable backend APIs using Node.js, NestJS, and TypeScript, supporting Web, Android, iOS, and internal administration systems.",
              result: "Ensured consistent business logic across multiple client applications.",
            },
            {
              text: "Developed internal administration modules for order management, product management, and operational workflows.",
              result: "Improved efficiency through centralized business operations.",
            },
            {
              text: "Designed and implemented Redis-based authentication, session management, refresh token rotation, token blacklisting, and caching strategies.",
              result: "Improved API performance and strengthened application security.",
            },
            {
              text: "Integrated Firebase Cloud Messaging (FCM) and Google Cloud Storage to deliver reliable push notifications and centralized media management.",
              result: "Improved user engagement and scalable file handling.",
            },
            {
              text: "Researched and integrated Facebook APIs into the platform to support social commerce features while implementing secure file upload services.",
              result: "Enhanced platform capabilities and user experience.",
            },
          ],
        },
      ],
    },
  ],
  certificationsTitle: "Education & Certifications",
  education:
    "University of Information Technology (UIT) – VNU-HCM · Information Technology · 2025 – Present",
  certifications: [
    {
      name: "Cloud Developer Certificate",
      url: certificates.udacity,
    },
    {
      name: "AWS Certified Developer – Associate (DVA-C02)",
      url: certificates.aws,
    },
  ],
};

export const contact = {
  eyebrow: `${no("contact")} / contact`,
  // Owner-provided (LEARNING-167).
  title:
    "Need a fullstack engineer on your team, full-time or part-time? I'd love to hear about it.",
  subline: "Have a web app project instead? Send me a brief.",
  zalo: { label: "Zalo 0339696831", href: "https://zalo.me/0339696831" },
  footer: [`© 2026 ${profile.name}`, "built with Next.js · deployed on Vercel"],
};

// Form copy written with design:ux-copy: labels say what to enter; errors say what's wrong and how to fix it.
export const contactCopy = {
  formTitle: "Send a message",
  name: "Name",
  email: "Email",
  type: "How would you like to work together?",
  message: "What do you need, and by when?",
  messageHint: "A short description of the role or project, plus your timeline.",
  phone: "Phone or Zalo (optional)",
  submit: "Send message",
  sending: "Sending…",
  honeypot: "Leave this field empty",
  summary: (n: number) => `Check the ${n === 1 ? "highlighted field" : `${n} highlighted fields`}.`,
  sent: "Thanks, your message was sent.",
  limited: (minutes: number) =>
    `Too many messages from your connection. Wait ${minutes} minutes and try again, or email ${profile.email}.`,
  failed: `Your message couldn't be sent. Try again, or email ${profile.email}.`,
  errors: {
    nameRequired: "Enter your name.",
    nameLong: "Keep your name under 100 characters.",
    nameInvalid: "Enter your name on one line.",
    emailRequired: "Enter your email address.",
    emailInvalid: "Enter an email address like name@example.com.",
    typeRequired: "Choose how you'd like to work together.",
    messageRequired: "Tell me what you need and your timeline.",
    messageShort: "Add a bit more detail (at least 20 characters).",
    messageLong: "Keep it under 4,000 characters.",
    phoneInvalid: "Enter a phone or Zalo number using digits (spaces, + and dashes are fine).",
  },
};
