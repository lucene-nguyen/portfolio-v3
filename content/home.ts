// Source: the owner's approved home page mockup ("Cuong Nguyen Portfolio" canvas, 2026-10-31).
// Unknown values stay [PLACEHOLDER]; never fill them in without the owner.

export const profile = {
  name: "Nguyen Manh Cuong",
  handle: "cuong",
  title: "Fullstack Software Engineer",
  email: "manhcuongmvc@gmail.com",
  github: "https://github.com/lucene-nguyen",
  githubLabel: "github.com/lucene-nguyen",
  linkedin: "[PLACEHOLDER]",
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
  ] satisfies CaseStudySummary[],
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

/** True for values the owner still has to provide. */
export const isPlaceholder = (v: string) => v.includes("[PLACEHOLDER]");
