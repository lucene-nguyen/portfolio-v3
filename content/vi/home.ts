// Vietnamese copy (LEARNING-168). Drafted by the implementer; every string is listed in
// docs/i18n/vi-review.md for the owner's approval. Facts (names, dates, numbers, links, technologies)
// are identical to content/en/home.ts (checked by content/locales.test.ts).
import { features } from "@/lib/features";
import * as en from "../en/home";
import type { CollabType } from "../collab";
import { shown } from "@/lib/placeholder";

export const profile = {
  name: "Nguyễn Mạnh Cường",
  handle: "cuong",
  logo: "Cuong Nguyen",
  title: "Kỹ sư phần mềm Fullstack",
  siteDescription:
    "Kỹ sư phần mềm Fullstack xây dựng ứng dụng web trọn vẹn: React và Next.js, Node.js và NestJS, PostgreSQL, MongoDB, Redis và AWS.",
  email: "manhcuongmvc@gmail.com",
  github: "https://github.com/lucene-nguyen",
  githubLabel: "github.com/lucene-nguyen",
  linkedin: "https://www.linkedin.com/in/cuong-m-nguyen/",
  resumeUrl: en.profile.resumeUrl,
  avatar: { src: "/avatar.jpg", alt: "Nguyễn Mạnh Cường mỉm cười trên một cung đường leo núi" },
  avatarCaption: "// ngoài giờ: leo núi",
  status: "sẵn sàng nhận việc",
};

// Language switcher (LEARNING-168): links to the other locale.
export const language = {
  label: "English",
  hrefLang: "en",
  href: "/",
  ariaLabel: "View this page in English",
};

export const labels = {
  theme: "Giao diện",
  themeChanged: (name: string) => `Giao diện: ${name}`,
  mainNav: "Điều hướng chính",
  skip: "Bỏ qua đến nội dung",
  menu: "Menu",
  viewWork: "Xem các case study",
  seeExperience: "Xem kinh nghiệm của tôi",
  workWithMe: "Hợp tác với tôi",
  viewRepo: "Xem trên GitHub",
  readCaseStudy: "Đọc case study",
  technologies: "Công nghệ",
  intro: "Giới thiệu",
  github: "GitHub",
  linkedin: "LinkedIn",
  resume: "Tải CV",
  newTab: "(mở trong thẻ mới)",
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
  { href: "/vi#skills", label: "Kỹ năng" },
  { href: "/vi#experience", label: "Kinh nghiệm" },
  ...(features.caseStudies ? [{ href: "/vi#work", label: "Dự án" }] : []),
  ...(features.lab ? [{ href: "/vi#lab", label: "Lab trực tiếp" }] : []),
  { href: "/vi#kits", label: "Starter kit" },
  { href: "/vi#work-with-me", label: "Hợp tác" },
  { href: "/vi#contact", label: "Liên hệ" },
];

export const hero = {
  eyebrow: `> whoami — ${profile.name}`,
  headline: "Tôi xây dựng những sản phẩm web mang lại giá trị thật cho người dùng và doanh nghiệp.",
  subline:
    "Mục tiêu của tôi là trở thành chuyên gia về phát triển web, vì vậy tôi không ngừng học hỏi và cải thiện mỗi ngày.",
  lead: "Kỹ sư phần mềm Fullstack với hơn 5 năm xây dựng ứng dụng web từ đầu đến cuối — React và Next.js cho front end, API Node.js và NestJS cho back end, PostgreSQL, MongoDB và Redis cho dữ liệu, và AWS để vận hành trên môi trường production.",
  workWithMeHref: "#work-with-me",
  stats: [
    { value: "5+ năm", label: "xây dựng hệ thống backend thực tế" },
    { value: "2.500+", label: "cửa hàng dùng dịch vụ tôi phát triển" },
    { value: "300→20ms", label: "độ trễ API tồn kho", highlight: true },
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
  eyebrow: `${no("work")} / dự án tiêu biểu`,
  title: "Case study",
  backLabel: "Tất cả case study",
  intro:
    "Vấn đề, ràng buộc, kiến trúc và những đánh đổi đằng sau mỗi quyết định. Thông tin khách hàng được khái quát hóa theo thỏa thuận bảo mật (NDA).",
  items: [
    {
      slug: "pharmacy-inventory",
      meta: "Bán lẻ dược phẩm · FPT",
      period: "2024–2025",
      title: "Giảm độ trễ tồn kho 15 lần cho hơn 2.500 nhà thuốc",
      summary:
        "Dịch vụ tồn kho dùng Redis trong nền tảng microservice NestJS phục vụ hàng triệu người dùng, cùng một worker service riêng cho báo cáo và nhập file Excel lớn.",
      metrics: [
        { value: "20ms", label: "từ mức trung bình 300ms" },
        { value: "−40%", label: "tải cơ sở dữ liệu" },
      ],
      tags: ["NestJS", "Redis", "Elasticsearch", "Worker Threads"],
    },
    {
      slug: "ai-image-pipeline",
      meta: "AI · Khách hàng Nhật Bản",
      period: "2025",
      title: "Pipeline xử lý ảnh AI không chặn trên Databricks",
      summary:
        "Upload dạng stream trả về job ID ngay lập tức, tiền xử lý bằng Worker Thread, retry và dead-letter queue trước Model Serving, và kết quả trả về trực tiếp qua WebSocket.",
      metrics: [
        { value: "0 OOM", label: "khi upload file lớn" },
        { value: "[PLACEHOLDER]", label: "độ trễ job p95" },
      ],
      tags: ["Node.js streams", "Databricks", "PostgreSQL", "WebSocket"],
    },
    {
      slug: "aws-file-ingestion",
      meta: "Nền tảng dữ liệu · Khách hàng Úc",
      period: "2026",
      title: "Tự động nạp file trên AWS S3 và Lambda",
      summary:
        "Lambda chạy theo lịch gộp các file CSV thành một bộ dữ liệu JSON mỗi năm phút; NestJS cung cấp dữ liệu cho hệ thống phía sau, xử lý file lớn bất đồng bộ và cảnh báo qua SES.",
      metrics: [
        { value: "5 phút", label: "chu kỳ cập nhật" },
        { value: "[PLACEHOLDER]", label: "giờ làm thủ công tiết kiệm / tuần" },
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
  eyebrow: "00 / sơ đồ hệ thống",
  title: "Sơ đồ hệ thống",
  intro: features.caseStudies
    ? "Mỗi nút là một dự án. Di chuột hoặc focus vào nút để xem công nghệ và kết quả; chọn nút để mở case study."
    : "Mỗi nút là một vị trí công việc hoặc các starter kit của tôi. Di chuột hoặc focus vào nút để xem chi tiết; chọn nút để đến phần đó.",
  listToggle: "Xem dạng danh sách",
};

export const achievementsCopy = {
  button: "Thành tích",
  title: "Thành tích",
  unlocked: "Đã mở khóa thành tích",
  statusUnlocked: "Đã mở khóa",
  statusLocked: "Chưa mở khóa",
  sound: "Hiệu ứng âm thanh",
  close: "Đóng",
  items: {
    reader: { name: "Mọt sách", hint: "Mở một case study." },
    "rate-limited": { name: "Chậm lại nào!", hint: "Gây ra lỗi 429 trong lab trực tiếp." },
    explorer: { name: "Nhà thám hiểm", hint: "Thử tất cả các giao diện." },
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
  progress: "Tiến độ đọc",
  readTime: (min: number) => `${min} phút đọc`,
  textSize: "Cỡ chữ",
  sizes: { s: "Nhỏ", m: "Vừa", l: "Lớn" },
  toc: "Trên trang này",
};

export const docsCopy = {
  sidebar: "Tài liệu",
  home: "Trang chủ",
  menu: "Các trang",
  close: "Đóng",
  search: "Tìm kiếm",
  searchHint: "/ hoặc Ctrl/⌘ K",
  searchLabel: "Tìm kiếm trên website",
  placeholder: "Tìm kỹ năng, kinh nghiệm, starter kit…",
  results: (n: number) => `${n} kết quả`,
  noResults: "Không có kết quả. Thử: Redis, NestJS, AWS, React.",
  searching: "Đang tìm…",
  loadFailed: "Tính năng tìm kiếm tạm thời không khả dụng. Hãy đóng và thử lại.",
  breadcrumb: "Đường dẫn",
};

export const dashboardCopy = {
  eyebrow: "00 / giám sát",
  title: "Bảng điều khiển",
  sourceLabel: "Nguồn",
  unavailable: "Hiện không khả dụng — đang hiển thị giá trị gần nhất, nếu có.",
  traffic: {
    title: "Lưu lượng lab trực tiếp (mọi khách truy cập)",
    source: "Kết quả /api/ping của mọi khách truy cập, 60 giây gần nhất, cập nhật mỗi 5 giây",
    rps: "req/s (trung bình 10 giây gần nhất)",
    ok: "200 OK",
    limited: "429 Too Many Requests",
    ratio: "tỷ lệ bị chặn",
    chart:
      "Số request mỗi giây trong 60 giây gần nhất: phản hồi 200 là đường liền, 429 là đường đứt nét.",
  },
  github: {
    title: "Hoạt động GitHub",
    source: "GitHub REST API, dữ liệu công khai, lưu cache 1 giờ",
    repos: "repo công khai",
    events: "hoạt động công khai gần đây",
  },
  career: {
    title: "Thời gian hoạt động sự nghiệp",
    source: "Phần Kinh nghiệm",
    since: (d: string) => `từ ${d}`,
    years: "năm làm sản phẩm",
  },
  stack: {
    title: "Mức độ dùng công nghệ",
    source: "Thẻ công nghệ của các case study",
    caption: "số case study dùng mỗi công nghệ",
  },
  timeline: { title: "Dòng thời gian", source: "Phần Kinh nghiệm" },
};

export const ideCopy = {
  project: "portfolio-v3",
  explorer: "Explorer",
  openEditors: "Tệp đang mở",
  editor: "Trình soạn thảo",
  close: (name: string) => `Đóng ${name}`,
  palette: "Đi đến tệp",
  paletteHint: "Ctrl/⌘ K",
  placeholder: "Nhập tên tệp…",
  noMatch: "Không có tệp phù hợp.",
  closeDrawer: "Đóng",
};

export const bentoCopy = {
  title: "Tổng quan",
  hint: "Kéo các ô hoặc dùng mũi tên để sắp xếp lại. Bố cục được lưu trong trình duyệt này.",
  reset: "Đặt lại bố cục",
  moveUp: (name: string) => `Đưa ${name} lên trước`,
  moveDown: (name: string) => `Đưa ${name} ra sau`,
  moved: (name: string, pos: number, total: number) =>
    `Đã chuyển ${name} đến vị trí ${pos} trên ${total}.`,
  resetDone: "Đã đặt lại bố cục.",
  tiles: {
    about: "Giới thiệu",
    photo: "Ảnh",
    stats: "Con số chính",
    stack: "Công nghệ",
    lab: "Lab trực tiếp",
    contact: "Liên hệ",
  },
  labCta: "Thử rate limiter",
};

export const stickerCopy = {
  title: "Bảng sticker",
  hint: "Kéo các sticker tùy ý. Chọn một sticker để xem các dự án dùng công nghệ đó.",
  listLabel: "Lọc dự án theo kỹ năng",
  clear: "Hiện tất cả",
  results: (skill: string, n: number) => `${n} dự án dùng ${skill}`,
  all: (n: number) => `Tất cả ${n} dự án`,
};

export const mangaCopy = {
  title: "Câu chuyện đến nay",
  intro: "Sự nghiệp kể bằng một dải manga ngắn: mỗi khung là một vị trí, theo thứ tự thời gian.",
  textToggle: "Đọc câu chuyện dạng văn bản",
  chapter: (n: number) => `Chương ${n}`,
  artNote: "[PLACEHOLDER: commissioned artwork] Abstract placeholder panels; no characters.",
  panelAlt: (company: string, period: string) =>
    `Khung manga trừu tượng cho ${company} (${period}): các đường tốc độ tỏa ra và chấm halftone quanh biểu tượng laptop. Không có nhân vật.`,
};

export const worldCopy = {
  title: "Thế giới 3D",
  entryTitle: "Khám phá trong 3D",
  instructions:
    "Di chuyển bằng phím mũi tên hoặc W A S D (hoặc bàn điều khiển trên màn hình). Bước lên một ô phát sáng để mở phần đó.",
  canvasLabel:
    "Thế giới 3D. Dùng phím mũi tên hoặc W A S D để di chuyển; đến một ô sẽ mở phần tương ứng.",
  skip: "Bỏ qua đến nội dung",
  enter: "Vào thế giới 3D",
  zonesLabel: "Đi thẳng đến",
  zones: {
    experience: "Kinh nghiệm",
    work: "Dự án",
    lab: "Lab trực tiếp",
    kits: "Starter kit",
    contact: "Liên hệ",
  },
  pad: { forward: "Đi tới", back: "Đi lùi", left: "Sang trái", right: "Sang phải" },
  loading: "Đang tải thế giới…",
  failed: "Thiết bị này không hỗ trợ 3D. Đang hiển thị trang tiêu chuẩn.",
  padLabel: "Bàn điều khiển di chuyển",
};

export const swissCopy = { showGrid: "Hiện lưới" };

export const lab = {
  eyebrow: `${no("lab")} / lab trực tiếp`,
  title: "Thử làm sập rate limiter của tôi",
  intro:
    "Gọi endpoint nhanh nhất có thể. Xem token bucket và fixed window xử lý cùng một đợt request khác nhau thế nào — cũng chính là đánh đổi tôi phân tích trong",
  repo: { label: "rate-limiting-lab", href: "https://github.com/lucene-nguyen/rate-limiting-lab" },
  ui: {
    algorithm: "Thuật toán",
    token: "Token bucket",
    window: "Fixed window",
    tokensLabel: "token trong bucket",
    windowLabel: "request còn lại trong cửa sổ",
    send: "Gửi request",
    burst: "Gửi dồn × 10",
    reset: "Đặt lại",
    resetDone: "Đã đặt lại limiter và log.",
    resetFailed: "Đặt lại thất bại, hãy thử lại.",
    resetsIn: (s: number) => `đặt lại sau ${s} giây`,
    meterText: (n: number, max: number) => `còn ${n} trên ${max} request`,
    sent: (n: number, ok: number, blocked: number) => `Đã gửi ${n}: ${ok} × 200, ${blocked} × 429.`,
    ok: "OK",
    tooMany: "Too Many Requests",
    error: "Lỗi",
    networkError: "Lỗi mạng",
    counters: "Số phản hồi",
    logLabel: "Log request, mới nhất trước",
    empty: "$ đang chờ request…",
  },
  facts: [
    "Dung lượng: 5 request",
    "Token bucket nạp lại 1 token / giây",
    "Fixed window đặt lại mỗi 5 giây",
  ],
};

export const kits = {
  eyebrow: `${no("kits")} / dự án cá nhân`,
  title: "Starter kit & lab",
  items: [
    {
      name: "TableTap",
      status: "đang phát triển",
      state: "active",
      description: "Starter kit gọi món tại bàn bằng mã QR cho nhà hàng và quán cà phê.",
      stack: "Next.js · NestJS · PostgreSQL",
      href: "[PLACEHOLDER]",
    },
    {
      name: "Booking kit",
      status: "dự kiến",
      state: "planned",
      description: "Starter kit đặt lịch hẹn cho phòng khám, salon và studio.",
      stack: "[PLACEHOLDER]",
      href: "[PLACEHOLDER]",
    },
    {
      name: "CRM kit",
      status: "dự kiến",
      state: "planned",
      description: "Nền tảng CRM gọn nhẹ cho các đội bán hàng nhỏ.",
      stack: "[PLACEHOLDER]",
      href: "[PLACEHOLDER]",
    },
    {
      name: "rate-limiting-lab",
      status: "repo công khai",
      state: "active",
      description:
        "Thực hành các chiến lược rate limiting trên production và những lỗi thường gặp.",
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
  { id: "full-time", label: "Toàn thời gian" },
  { id: "part-time", label: "Bán thời gian" },
  { id: "freelance", label: "Dự án freelance" },
  { id: "consulting", label: "Tư vấn" },
];

// Service names and steps from the owner; one-line copy via design:ux-copy (no claims, no prices).
export const workWithMe = {
  eyebrow: `${no("work-with-me")} / hợp tác`,
  title: "Hợp tác với tôi",
  intro:
    "Bạn cần xây dựng một ứng dụng web, mở rộng backend, hay cần thêm góc nhìn về kiến trúc hệ thống? Đây là cách tôi có thể giúp.",
  services: [
    {
      name: "Ứng dụng web trọn gói",
      description:
        "Tôi thiết kế và xây dựng toàn bộ ứng dụng: front end, API, cơ sở dữ liệu và triển khai.",
      cta: "Trao đổi về ứng dụng web",
      type: "freelance",
    },
    {
      name: "Backend, API và AWS",
      description: "API, tác vụ nền và pipeline dữ liệu bằng Node.js và NestJS, chạy trên AWS.",
      cta: "Trao đổi về backend",
      type: "freelance",
    },
    {
      name: "Starter kit theo ngành",
      description:
        "Nền tảng cho gọi món nhà hàng (TableTap), đặt lịch hẹn và CRM cho đội nhỏ, tùy chỉnh theo doanh nghiệp của bạn.",
      cta: "Hỏi về starter kit",
      type: "freelance",
      kits: ["TableTap", "Booking kit", "CRM kit"],
    },
    {
      name: "Tư vấn kiến trúc",
      description:
        "Góc nhìn độc lập cho các quyết định về kiến trúc, hiệu năng và khả năng mở rộng.",
      cta: "Trao đổi về kiến trúc",
      type: "consulting",
    },
  ] satisfies {
    name: string;
    description: string;
    cta: string;
    type: CollabType;
    kits?: string[];
  }[],
  stepsTitle: "Cách tôi làm việc",
  stepLabel: (n: number) => `Bước ${n}`,
  steps: [
    {
      name: "Trao đổi",
      description: "Chúng ta cùng làm rõ mục tiêu, người dùng và các ràng buộc.",
    },
    {
      name: "Đề xuất",
      description: "Bạn nhận phạm vi công việc và kế hoạch bằng văn bản để thống nhất.",
    },
    {
      name: "Xây dựng",
      description: "Spec → code → test → review, theo từng bước nhỏ để bạn dễ theo dõi.",
    },
    {
      name: "Bàn giao và hỗ trợ",
      description: "Bạn nhận mã nguồn và tài liệu, kèm hỗ trợ trong quá trình bàn giao.",
    },
  ],
};

// Owner-provided (LEARNING-165). Icons: components/home/skill-icon.tsx.
export const skills = {
  eyebrow: `${no("skills")} / kỹ năng`,
  title: "Kỹ năng",
  groups: [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"] },
    { name: "Backend", items: ["Node.js", "NestJS", "GraphQL", "REST", "WebSocket"] },
    {
      name: "Dữ liệu & messaging",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "RabbitMQ", "Kafka"],
    },
    { name: "Cloud & DevOps", items: ["AWS", "Docker", "GitHub Actions", "Grafana"] },
  ],
  secondary: { name: "Kỹ năng bổ trợ", items: ["Go", "Python"] },
};

// Experience stays English on /vi (owner, LEARNING-183): only the headings are Vietnamese.
export const experience = {
  ...en.experience,
  eyebrow: `${no("experience")} / kinh nghiệm`,
  title: "Những nơi tôi đã làm việc",
  certificationsTitle: "Chứng chỉ",
};

export const contact = {
  eyebrow: `${no("contact")} / liên hệ`,
  title:
    "Bạn cần một kỹ sư fullstack cho đội ngũ, toàn thời gian hoặc bán thời gian? Hãy cùng trao đổi nhé.",
  subline: "Hay bạn có dự án ứng dụng web? Gửi tôi vài dòng mô tả nhé.",
  zalo: { label: "Zalo 0339696831", href: "https://zalo.me/0339696831" },
  footer: [`© 2026 ${profile.name}`, "xây dựng bằng Next.js · triển khai trên Vercel"],
};

// Form copy written with design:ux-copy: labels say what to enter; errors say what's wrong and how to fix it.
export const contactCopy = {
  formTitle: "Gửi tin nhắn",
  name: "Họ và tên",
  email: "Email",
  type: "Bạn muốn hợp tác theo hình thức nào?",
  message: "Bạn cần gì, và cần khi nào?",
  messageHint: "Mô tả ngắn về vị trí hoặc dự án, kèm mốc thời gian của bạn.",
  phone: "Số điện thoại hoặc Zalo (không bắt buộc)",
  submit: "Gửi tin nhắn",
  sending: "Đang gửi…",
  honeypot: "Để trống ô này",
  summary: (n: number) =>
    `Vui lòng kiểm tra ${n === 1 ? "ô được đánh dấu" : `${n} ô được đánh dấu`}.`,
  sent: "Cảm ơn bạn, tin nhắn đã được gửi.",
  limited: (minutes: number) =>
    `Có quá nhiều tin nhắn từ kết nối của bạn. Hãy đợi ${minutes} phút rồi thử lại, hoặc email cho tôi tại ${profile.email}.`,
  failed: `Chưa gửi được tin nhắn. Hãy thử lại, hoặc email cho tôi tại ${profile.email}.`,
  errors: {
    nameRequired: "Vui lòng nhập họ và tên.",
    nameLong: "Họ và tên cần ít hơn 100 ký tự.",
    nameInvalid: "Vui lòng nhập họ và tên trên một dòng.",
    emailRequired: "Vui lòng nhập địa chỉ email.",
    emailInvalid: "Vui lòng nhập email đúng dạng, ví dụ ten@example.com.",
    typeRequired: "Vui lòng chọn hình thức hợp tác.",
    messageRequired: "Hãy cho tôi biết bạn cần gì và mốc thời gian.",
    messageShort: "Hãy thêm chi tiết (ít nhất 20 ký tự).",
    messageLong: "Vui lòng viết dưới 4.000 ký tự.",
    phoneInvalid:
      "Vui lòng nhập số điện thoại hoặc Zalo bằng chữ số (được dùng khoảng trắng, + và dấu gạch).",
  },
};
