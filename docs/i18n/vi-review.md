# Vietnamese copy review (LEARNING-168)

**Status: Approved by the owner (2026-11-06).** Merged with LEARNING-168.

## Decisions (confirmed by the owner)
1. Name: `Nguyễn Mạnh Cường`. The logo stays "Cuong Nguyen" in both languages. The LinkedIn URL is correct.
2. English tech terms are kept (fullstack, API, production, case study, starter kit, freelance, rate limiter…).
3. The case studies, the terminal and the Experience bullets stay English (`/vi` reuses the English experience; only its headings are Vietnamese).
4. Vietnamese number grouping in prose and stats ("2.500").
5. Wording fixes applied (round 3):
   - `workWithMe.services[0].name`
   - `hero.lead`
   - `skills.secondary.name`
   - `contact.title` and `contact.subline`
   - `experience.title`
   - `hero.stats[0].label`
   - `kits.items[3].description`
   - `workWithMe.services[3].description` and `.cta`
   - `profile.avatarCaption`

Added after approval, for the owner's next look: `labels.resume` "Tải CV", `labels.newTab` "(mở trong thẻ mới)", and `experience.certificationsTitle` "Chứng chỉ".

## All strings

<!-- generated from content/en/home.ts and content/vi/home.ts -->
_513 strings: 267 translated, 246 identical in both languages ("= EN": names, technologies, links, codes, and the English experience)._

### profile

| Key | EN | VI |
|---|---|---|
| `profile.name` | Nguyen Manh Cuong | Nguyễn Mạnh Cường |
| `profile.handle` | cuong | = EN |
| `profile.logo` | Cuong Nguyen | = EN |
| `profile.title` | Fullstack Software Engineer | Kỹ sư phần mềm Fullstack |
| `profile.siteDescription` | Fullstack Software Engineer building web apps end to end: React and Next.js, Node.js and NestJS, PostgreSQL, MongoDB, Redis and AWS. | Kỹ sư phần mềm Fullstack xây dựng ứng dụng web trọn vẹn: React và Next.js, Node.js và NestJS, PostgreSQL, MongoDB, Redis và AWS. |
| `profile.email` | manhcuongmvc@gmail.com | = EN |
| `profile.github` | https://github.com/lucene-nguyen | = EN |
| `profile.githubLabel` | github.com/lucene-nguyen | = EN |
| `profile.linkedin` | https://www.linkedin.com/in/cuong-m-nguyen/ | = EN |
| `profile.resumeUrl` | https://drive.google.com/file/d/1Cnr0omhnu2RNk_s8fV_rvQoCOqVWIdTX/view?usp=drive_link | = EN |
| `profile.avatar.src` | /avatar.jpg | = EN |
| `profile.avatar.alt` | Nguyen Manh Cuong smiling on a hiking trail | Nguyễn Mạnh Cường mỉm cười trên một cung đường leo núi |
| `profile.avatarCaption` | // off-duty: on a trail | // ngoài giờ: leo núi |
| `profile.status` | open to work | sẵn sàng nhận việc |

### language

| Key | EN | VI |
|---|---|---|
| `language.label` | Tiếng Việt | English |
| `language.hrefLang` | vi | en |
| `language.href` | /vi | / |
| `language.ariaLabel` | Xem trang bằng tiếng Việt | View this page in English |

### labels

| Key | EN | VI |
|---|---|---|
| `labels.theme` | Theme | Giao diện |
| `labels.themeChanged(…)` | Theme: TableTap | Giao diện: TableTap |
| `labels.mainNav` | Main | Điều hướng chính |
| `labels.skip` | Skip to content | Bỏ qua đến nội dung |
| `labels.menu` | Menu | = EN |
| `labels.viewWork` | View case studies | Xem các case study |
| `labels.seeExperience` | See my experience | Xem kinh nghiệm của tôi |
| `labels.workWithMe` | Work with me | Hợp tác với tôi |
| `labels.viewRepo` | View on GitHub | Xem trên GitHub |
| `labels.readCaseStudy` | Read case study | Đọc case study |
| `labels.technologies` | Technologies | Công nghệ |
| `labels.intro` | Introduction | Giới thiệu |
| `labels.github` | GitHub | = EN |
| `labels.linkedin` | LinkedIn | = EN |
| `labels.resume` | Download CV | Tải CV |
| `labels.newTab` | (opens in a new tab) | (mở trong thẻ mới) |

### nav

| Key | EN | VI |
|---|---|---|
| `nav[0].href` | /#skills | /vi#skills |
| `nav[0].label` | Skills | Kỹ năng |
| `nav[1].href` | /#experience | /vi#experience |
| `nav[1].label` | Experience | Kinh nghiệm |
| `nav[2].href` | /#kits | /vi#kits |
| `nav[2].label` | Starter kits | Starter kit |
| `nav[3].href` | /#work-with-me | /vi#work-with-me |
| `nav[3].label` | Work with me | Hợp tác |
| `nav[4].href` | /#contact | /vi#contact |
| `nav[4].label` | Contact | Liên hệ |

### hero

| Key | EN | VI |
|---|---|---|
| `hero.eyebrow` | > whoami — Nguyen Manh Cuong | > whoami — Nguyễn Mạnh Cường |
| `hero.headline` | I build web products that bring real value to users and businesses. | Tôi xây dựng những sản phẩm web mang lại giá trị thật cho người dùng và doanh nghiệp. |
| `hero.subline` | My goal is to become an expert in web development, so I keep learning and improving every day. | Mục tiêu của tôi là trở thành chuyên gia về phát triển web, vì vậy tôi không ngừng học hỏi và cải thiện mỗi ngày. |
| `hero.lead` | Fullstack Software Engineer with 5+ years building web apps end to end — React and Next.js on the front end, Node.js and NestJS APIs on the back end, PostgreSQL, MongoDB and Redis for data, and AWS to run it in production. | Kỹ sư phần mềm Fullstack với hơn 5 năm xây dựng ứng dụng web từ đầu đến cuối — React và Next.js cho front end, API Node.js và NestJS cho back end, PostgreSQL, MongoDB và Redis cho dữ liệu, và AWS để vận hành trên môi trường production. |
| `hero.workWithMeHref` | #work-with-me | = EN |
| `hero.stats[0].value` | 5+ yrs | 5+ năm |
| `hero.stats[0].label` | building production backends | xây dựng hệ thống backend thực tế |
| `hero.stats[1].value` | 2,500+ | 2.500+ |
| `hero.stats[1].label` | stores on services I shipped | cửa hàng dùng dịch vụ tôi phát triển |
| `hero.stats[2].value` | 300→20ms | = EN |
| `hero.stats[2].label` | inventory API latency | độ trễ API tồn kho |
| `hero.stats[3].value` | AWS | = EN |
| `hero.stats[3].label` | Certified Developer – Associate | = EN |

### work

| Key | EN | VI |
|---|---|---|
| `work.eyebrow` | 00 / selected work | 00 / dự án tiêu biểu |
| `work.title` | Case studies | Case study |
| `work.backLabel` | All case studies | Tất cả case study |
| `work.intro` | Problem, constraints, architecture and the trade-offs behind each decision. Client details are generalized where NDAs apply. | Vấn đề, ràng buộc, kiến trúc và những đánh đổi đằng sau mỗi quyết định. Thông tin khách hàng được khái quát hóa theo thỏa thuận bảo mật (NDA). |
| `work.items[0].slug` | pharmacy-inventory | = EN |
| `work.items[0].meta` | Pharmacy retail · FPT | Bán lẻ dược phẩm · FPT |
| `work.items[0].period` | 2024–2025 | = EN |
| `work.items[0].title` | Cutting inventory latency 15× for 2,500+ pharmacy stores | Giảm độ trễ tồn kho 15 lần cho hơn 2.500 nhà thuốc |
| `work.items[0].summary` | Redis-backed inventory services in a NestJS microservice platform serving millions of users, plus a dedicated worker service for reports and large Excel imports. | Dịch vụ tồn kho dùng Redis trong nền tảng microservice NestJS phục vụ hàng triệu người dùng, cùng một worker service riêng cho báo cáo và nhập file Excel lớn. |
| `work.items[0].metrics[0].value` | 20ms | = EN |
| `work.items[0].metrics[0].label` | from 300ms avg | từ mức trung bình 300ms |
| `work.items[0].metrics[1].value` | −40% | = EN |
| `work.items[0].metrics[1].label` | database load | tải cơ sở dữ liệu |
| `work.items[0].tags[0]` | NestJS | = EN |
| `work.items[0].tags[1]` | Redis | = EN |
| `work.items[0].tags[2]` | Elasticsearch | = EN |
| `work.items[0].tags[3]` | Worker Threads | = EN |
| `work.items[1].slug` | ai-image-pipeline | = EN |
| `work.items[1].meta` | AI · Japanese client | AI · Khách hàng Nhật Bản |
| `work.items[1].period` | 2025 | = EN |
| `work.items[1].title` | A non-blocking AI image pipeline on Databricks | Pipeline xử lý ảnh AI không chặn trên Databricks |
| `work.items[1].summary` | Streaming uploads that return a job ID instantly, Worker Thread preprocessing, retries and dead-letter queues before Model Serving, and live results over WebSocket. | Upload dạng stream trả về job ID ngay lập tức, tiền xử lý bằng Worker Thread, retry và dead-letter queue trước Model Serving, và kết quả trả về trực tiếp qua WebSocket. |
| `work.items[1].metrics[0].value` | 0 OOM | = EN |
| `work.items[1].metrics[0].label` | on large uploads | khi upload file lớn |
| `work.items[1].tags[0]` | Node.js streams | = EN |
| `work.items[1].tags[1]` | Databricks | = EN |
| `work.items[1].tags[2]` | PostgreSQL | = EN |
| `work.items[1].tags[3]` | WebSocket | = EN |
| `work.items[2].slug` | aws-file-ingestion | = EN |
| `work.items[2].meta` | Data platform · Australian client | Nền tảng dữ liệu · Khách hàng Úc |
| `work.items[2].period` | 2026 | = EN |
| `work.items[2].title` | Hands-off file ingestion on AWS S3 and Lambda | Tự động nạp file trên AWS S3 và Lambda |
| `work.items[2].summary` | Scheduled Lambdas aggregate CSV drops into one JSON dataset every five minutes; NestJS serves it downstream, with async large-file handling and SES alerts. | Lambda chạy theo lịch gộp các file CSV thành một bộ dữ liệu JSON mỗi năm phút; NestJS cung cấp dữ liệu cho hệ thống phía sau, xử lý file lớn bất đồng bộ và cảnh báo qua SES. |
| `work.items[2].metrics[0].value` | 5 min | 5 phút |
| `work.items[2].metrics[0].label` | refresh cycle | chu kỳ cập nhật |
| `work.items[2].tags[0]` | AWS Lambda | = EN |
| `work.items[2].tags[1]` | S3 | = EN |
| `work.items[2].tags[2]` | SES | = EN |
| `work.items[2].tags[3]` | NestJS | = EN |

### systemMap

| Key | EN | VI |
|---|---|---|
| `systemMap.eyebrow` | 00 / system map | 00 / sơ đồ hệ thống |
| `systemMap.title` | System map | Sơ đồ hệ thống |
| `systemMap.intro` | Each node is a role or my starter kits. Hover or focus a node for the details; select it to jump to that section. | Mỗi nút là một vị trí công việc hoặc các starter kit của tôi. Di chuột hoặc focus vào nút để xem chi tiết; chọn nút để đến phần đó. |
| `systemMap.listToggle` | View as list | Xem dạng danh sách |

### achievementsCopy

| Key | EN | VI |
|---|---|---|
| `achievementsCopy.button` | Achievements | Thành tích |
| `achievementsCopy.title` | Achievements | Thành tích |
| `achievementsCopy.unlocked` | Achievement unlocked | Đã mở khóa thành tích |
| `achievementsCopy.statusUnlocked` | Unlocked | Đã mở khóa |
| `achievementsCopy.statusLocked` | Locked | Chưa mở khóa |
| `achievementsCopy.sound` | Sound effects | Hiệu ứng âm thanh |
| `achievementsCopy.close` | Close | Đóng |
| `achievementsCopy.items.reader.name` | Bookworm | Mọt sách |
| `achievementsCopy.items.reader.hint` | Open a case study. | Mở một case study. |
| `achievementsCopy.items.rate-limited.name` | Slow down! | Chậm lại nào! |
| `achievementsCopy.items.rate-limited.hint` | Trigger a 429 in the live lab. | Gây ra lỗi 429 trong lab trực tiếp. |
| `achievementsCopy.items.explorer.name` | Explorer | Nhà thám hiểm |
| `achievementsCopy.items.explorer.hint` | Try every theme. | Thử tất cả các giao diện. |

### hudCopy

| Key | EN | VI |
|---|---|---|
| `hudCopy.client` | CLIENT | = EN |
| `hudCopy.firewall` | FIREWALL | = EN |
| `hudCopy.server` | /api/ping | = EN |
| `hudCopy.packet` | PKT | = EN |
| `hudCopy.blocked` | BLOCKED | = EN |

### readingCopy

| Key | EN | VI |
|---|---|---|
| `readingCopy.progress` | Reading progress | Tiến độ đọc |
| `readingCopy.readTime(…)` | 5 min read | 5 phút đọc |
| `readingCopy.textSize` | Text size | Cỡ chữ |
| `readingCopy.sizes.s` | Small | Nhỏ |
| `readingCopy.sizes.m` | Medium | Vừa |
| `readingCopy.sizes.l` | Large | Lớn |
| `readingCopy.toc` | On this page | Trên trang này |

### docsCopy

| Key | EN | VI |
|---|---|---|
| `docsCopy.sidebar` | Docs | Tài liệu |
| `docsCopy.home` | Home | Trang chủ |
| `docsCopy.menu` | Pages | Các trang |
| `docsCopy.close` | Close | Đóng |
| `docsCopy.search` | Search | Tìm kiếm |
| `docsCopy.searchHint` | / or Ctrl/⌘ K | / hoặc Ctrl/⌘ K |
| `docsCopy.searchLabel` | Search the site | Tìm kiếm trên website |
| `docsCopy.placeholder` | Search case studies, stack, experience… | Tìm kỹ năng, kinh nghiệm, starter kit… |
| `docsCopy.results(…)` | 3 results | 3 kết quả |
| `docsCopy.noResults` | No results. Try: Redis, Lambda, NestJS, Databricks. | Không có kết quả. Thử: Redis, NestJS, AWS, React. |
| `docsCopy.searching` | Searching… | Đang tìm… |
| `docsCopy.loadFailed` | Search is unavailable right now. Close and try again. | Tính năng tìm kiếm tạm thời không khả dụng. Hãy đóng và thử lại. |
| `docsCopy.breadcrumb` | Breadcrumb | Đường dẫn |

### dashboardCopy

| Key | EN | VI |
|---|---|---|
| `dashboardCopy.eyebrow` | 00 / observability | 00 / giám sát |
| `dashboardCopy.title` | Dashboard | Bảng điều khiển |
| `dashboardCopy.sourceLabel` | Source | Nguồn |
| `dashboardCopy.unavailable` | Unavailable right now — showing the last known values, if any. | Hiện không khả dụng — đang hiển thị giá trị gần nhất, nếu có. |
| `dashboardCopy.traffic.title` | Live lab traffic (all visitors) | Lưu lượng lab trực tiếp (mọi khách truy cập) |
| `dashboardCopy.traffic.source` | /api/ping outcomes across all visitors, last 60 s, refreshed every 5 s | Kết quả /api/ping của mọi khách truy cập, 60 giây gần nhất, cập nhật mỗi 5 giây |
| `dashboardCopy.traffic.rps` | req/s (last 10 s avg) | req/s (trung bình 10 giây gần nhất) |
| `dashboardCopy.traffic.ok` | 200 OK | = EN |
| `dashboardCopy.traffic.limited` | 429 Too Many Requests | = EN |
| `dashboardCopy.traffic.ratio` | blocked share | tỷ lệ bị chặn |
| `dashboardCopy.traffic.chart` | Requests per second over the last 60 seconds: 200 responses as a solid line, 429 as a dashed line. | Số request mỗi giây trong 60 giây gần nhất: phản hồi 200 là đường liền, 429 là đường đứt nét. |
| `dashboardCopy.github.title` | GitHub activity | Hoạt động GitHub |
| `dashboardCopy.github.source` | GitHub REST API, public data, cached 1 h | GitHub REST API, dữ liệu công khai, lưu cache 1 giờ |
| `dashboardCopy.github.repos` | public repos | repo công khai |
| `dashboardCopy.github.events` | recent public events | hoạt động công khai gần đây |
| `dashboardCopy.career.title` | Career uptime | Thời gian hoạt động sự nghiệp |
| `dashboardCopy.career.source` | Experience section | Phần Kinh nghiệm |
| `dashboardCopy.career.since(…)` | since 01/2021 | từ 01/2021 |
| `dashboardCopy.career.years` | years shipping | năm làm sản phẩm |
| `dashboardCopy.stack.title` | Stack usage | Mức độ dùng công nghệ |
| `dashboardCopy.stack.source` | Technology tags of the case studies | Thẻ công nghệ của các case study |
| `dashboardCopy.stack.caption` | case studies using each technology | số case study dùng mỗi công nghệ |
| `dashboardCopy.timeline.title` | Timeline | Dòng thời gian |
| `dashboardCopy.timeline.source` | Experience section | Phần Kinh nghiệm |

### ideCopy

| Key | EN | VI |
|---|---|---|
| `ideCopy.project` | portfolio-v3 | = EN |
| `ideCopy.explorer` | Explorer | = EN |
| `ideCopy.openEditors` | Open editors | Tệp đang mở |
| `ideCopy.editor` | Editor | Trình soạn thảo |
| `ideCopy.close(…)` | Close TableTap | Đóng TableTap |
| `ideCopy.palette` | Go to file | Đi đến tệp |
| `ideCopy.paletteHint` | Ctrl/⌘ K | = EN |
| `ideCopy.placeholder` | Type a file name… | Nhập tên tệp… |
| `ideCopy.noMatch` | No matching file. | Không có tệp phù hợp. |
| `ideCopy.closeDrawer` | Close | Đóng |

### bentoCopy

| Key | EN | VI |
|---|---|---|
| `bentoCopy.title` | At a glance | Tổng quan |
| `bentoCopy.hint` | Drag tiles or use the arrows to rearrange. Your layout is saved in this browser. | Kéo các ô hoặc dùng mũi tên để sắp xếp lại. Bố cục được lưu trong trình duyệt này. |
| `bentoCopy.reset` | Reset layout | Đặt lại bố cục |
| `bentoCopy.moveUp(…)` | Move TableTap earlier | Đưa TableTap lên trước |
| `bentoCopy.moveDown(…)` | Move TableTap later | Đưa TableTap ra sau |
| `bentoCopy.moved(…)` | TableTap moved to position 2 of 9. | Đã chuyển TableTap đến vị trí 2 trên 9. |
| `bentoCopy.resetDone` | Layout reset. | Đã đặt lại bố cục. |
| `bentoCopy.tiles.about` | About | Giới thiệu |
| `bentoCopy.tiles.photo` | Photo | Ảnh |
| `bentoCopy.tiles.stats` | Key numbers | Con số chính |
| `bentoCopy.tiles.stack` | Stack | Công nghệ |
| `bentoCopy.tiles.lab` | Live lab | Lab trực tiếp |
| `bentoCopy.tiles.contact` | Contact | Liên hệ |
| `bentoCopy.labCta` | Try the rate limiter | Thử rate limiter |

### stickerCopy

| Key | EN | VI |
|---|---|---|
| `stickerCopy.title` | Sticker board | Bảng sticker |
| `stickerCopy.hint` | Drag the stickers around. Select one to see the projects that use it. | Kéo các sticker tùy ý. Chọn một sticker để xem các dự án dùng công nghệ đó. |
| `stickerCopy.listLabel` | Filter projects by skill | Lọc dự án theo kỹ năng |
| `stickerCopy.clear` | Show all | Hiện tất cả |
| `stickerCopy.results(…)` | 3 projects using Redis | 3 dự án dùng Redis |
| `stickerCopy.all(…)` | All 3 projects | Tất cả 3 dự án |

### mangaCopy

| Key | EN | VI |
|---|---|---|
| `mangaCopy.title` | The story so far | Câu chuyện đến nay |
| `mangaCopy.intro` | Career as a short manga strip: one panel per role, oldest first. | Sự nghiệp kể bằng một dải manga ngắn: mỗi khung là một vị trí, theo thứ tự thời gian. |
| `mangaCopy.textToggle` | Read the story as plain text | Đọc câu chuyện dạng văn bản |
| `mangaCopy.chapter(…)` | Chapter 3 | Chương 3 |
| `mangaCopy.artNote` | [PLACEHOLDER: commissioned artwork] Abstract placeholder panels; no characters. | = EN |
| `mangaCopy.panelAlt(…)` | Abstract manga panel for NEOX (08/2022 – 03/2024): radiating speed lines and halftone dots around a laptop icon. No characters. | Khung manga trừu tượng cho NEOX (08/2022 – 03/2024): các đường tốc độ tỏa ra và chấm halftone quanh biểu tượng laptop. Không có nhân vật. |

### worldCopy

| Key | EN | VI |
|---|---|---|
| `worldCopy.title` | 3D world | Thế giới 3D |
| `worldCopy.entryTitle` | Explore in 3D | Khám phá trong 3D |
| `worldCopy.instructions` | Walk with the arrow keys or W A S D (or the on-screen pad). Step onto a glowing pad to open that section. | Di chuyển bằng phím mũi tên hoặc W A S D (hoặc bàn điều khiển trên màn hình). Bước lên một ô phát sáng để mở phần đó. |
| `worldCopy.canvasLabel` | 3D world. Use arrow keys or W A S D to walk; reaching a pad opens its section. | Thế giới 3D. Dùng phím mũi tên hoặc W A S D để di chuyển; đến một ô sẽ mở phần tương ứng. |
| `worldCopy.skip` | Skip to content | Bỏ qua đến nội dung |
| `worldCopy.enter` | Enter 3D world | Vào thế giới 3D |
| `worldCopy.zonesLabel` | Go directly to | Đi thẳng đến |
| `worldCopy.zones.experience` | Experience | Kinh nghiệm |
| `worldCopy.zones.work` | Work | Dự án |
| `worldCopy.zones.lab` | Live lab | Lab trực tiếp |
| `worldCopy.zones.kits` | Starter kits | Starter kit |
| `worldCopy.zones.contact` | Contact | Liên hệ |
| `worldCopy.pad.forward` | Walk forward | Đi tới |
| `worldCopy.pad.back` | Walk back | Đi lùi |
| `worldCopy.pad.left` | Walk left | Sang trái |
| `worldCopy.pad.right` | Walk right | Sang phải |
| `worldCopy.loading` | Loading the world… | Đang tải thế giới… |
| `worldCopy.failed` | 3D is not available on this device. Showing the standard page. | Thiết bị này không hỗ trợ 3D. Đang hiển thị trang tiêu chuẩn. |
| `worldCopy.padLabel` | Movement pad | Bàn điều khiển di chuyển |

### swissCopy

| Key | EN | VI |
|---|---|---|
| `swissCopy.showGrid` | Show grid | Hiện lưới |

### lab

| Key | EN | VI |
|---|---|---|
| `lab.eyebrow` | 00 / live lab | 00 / lab trực tiếp |
| `lab.title` | Try to break my rate limiter | Thử làm sập rate limiter của tôi |
| `lab.intro` | Hit the endpoint as fast as you like. Watch how token bucket and fixed window treat the same burst differently — the same trade-off I work through in | Gọi endpoint nhanh nhất có thể. Xem token bucket và fixed window xử lý cùng một đợt request khác nhau thế nào — cũng chính là đánh đổi tôi phân tích trong |
| `lab.repo.label` | rate-limiting-lab | = EN |
| `lab.repo.href` | https://github.com/lucene-nguyen/rate-limiting-lab | = EN |
| `lab.ui.algorithm` | Algorithm | Thuật toán |
| `lab.ui.token` | Token bucket | = EN |
| `lab.ui.window` | Fixed window | = EN |
| `lab.ui.tokensLabel` | tokens in bucket | token trong bucket |
| `lab.ui.windowLabel` | requests left in window | request còn lại trong cửa sổ |
| `lab.ui.send` | Send request | Gửi request |
| `lab.ui.burst` | Burst × 10 | Gửi dồn × 10 |
| `lab.ui.reset` | Reset | Đặt lại |
| `lab.ui.resetDone` | Limiter and log reset. | Đã đặt lại limiter và log. |
| `lab.ui.resetFailed` | Reset failed, try again. | Đặt lại thất bại, hãy thử lại. |
| `lab.ui.resetsIn(…)` | resets in 12s | đặt lại sau 12 giây |
| `lab.ui.meterText(…)` | 3 of 5 requests left | còn 3 trên 5 request |
| `lab.ui.sent(…)` | 3 sent: 8 × 200, 2 × 429. | Đã gửi 3: 8 × 200, 2 × 429. |
| `lab.ui.ok` | OK | = EN |
| `lab.ui.tooMany` | Too Many Requests | = EN |
| `lab.ui.error` | Error | Lỗi |
| `lab.ui.networkError` | Network error | Lỗi mạng |
| `lab.ui.counters` | Response counts | Số phản hồi |
| `lab.ui.logLabel` | Request log, newest first | Log request, mới nhất trước |
| `lab.ui.empty` | $ waiting for requests… | $ đang chờ request… |
| `lab.facts[0]` | Capacity: 5 requests | Dung lượng: 5 request |
| `lab.facts[1]` | Token bucket refills 1 token / second | Token bucket nạp lại 1 token / giây |
| `lab.facts[2]` | Fixed window resets every 5 seconds | Fixed window đặt lại mỗi 5 giây |

### kits

| Key | EN | VI |
|---|---|---|
| `kits.eyebrow` | 03 / side projects | 03 / dự án cá nhân |
| `kits.title` | Starter kits & labs | Starter kit & lab |
| `kits.items[0].name` | TableTap | = EN |
| `kits.items[0].status` | in progress | đang phát triển |
| `kits.items[0].state` | active | = EN |
| `kits.items[0].description` | QR-code table ordering starter kit for restaurants and cafés. | Starter kit gọi món tại bàn bằng mã QR cho nhà hàng và quán cà phê. |
| `kits.items[0].stack` | Next.js · NestJS · PostgreSQL | = EN |
| `kits.items[0].href` | [PLACEHOLDER] | = EN |
| `kits.items[1].name` | Booking kit | = EN |
| `kits.items[1].status` | planned | dự kiến |
| `kits.items[1].state` | planned | = EN |
| `kits.items[1].description` | Appointment booking starter for clinics, salons and studios. | Starter kit đặt lịch hẹn cho phòng khám, salon và studio. |
| `kits.items[1].stack` | [PLACEHOLDER] | = EN |
| `kits.items[1].href` | [PLACEHOLDER] | = EN |
| `kits.items[2].name` | CRM kit | = EN |
| `kits.items[2].status` | planned | dự kiến |
| `kits.items[2].state` | planned | = EN |
| `kits.items[2].description` | Lightweight CRM foundation for small sales teams. | Nền tảng CRM gọn nhẹ cho các đội bán hàng nhỏ. |
| `kits.items[2].stack` | [PLACEHOLDER] | = EN |
| `kits.items[2].href` | [PLACEHOLDER] | = EN |
| `kits.items[3].name` | rate-limiting-lab | = EN |
| `kits.items[3].status` | public repo | repo công khai |
| `kits.items[3].state` | active | = EN |
| `kits.items[3].description` | Production rate-limiting strategies and their failure modes, tested hands-on. | Thực hành các chiến lược rate limiting trên production và những lỗi thường gặp. |
| `kits.items[3].stack` | Node.js · Redis | = EN |
| `kits.items[3].href` | https://github.com/lucene-nguyen/rate-limiting-lab | = EN |

### collabTypes

| Key | EN | VI |
|---|---|---|
| `collabTypes[0].id` | full-time | = EN |
| `collabTypes[0].label` | Full-time | Toàn thời gian |
| `collabTypes[1].id` | part-time | = EN |
| `collabTypes[1].label` | Part-time | Bán thời gian |
| `collabTypes[2].id` | freelance | = EN |
| `collabTypes[2].label` | Freelance project | Dự án freelance |
| `collabTypes[3].id` | consulting | = EN |
| `collabTypes[3].label` | Consulting | Tư vấn |

### workWithMe

| Key | EN | VI |
|---|---|---|
| `workWithMe.eyebrow` | 04 / work with me | 04 / hợp tác |
| `workWithMe.title` | Work with me | Hợp tác với tôi |
| `workWithMe.intro` | Need a web app built, a backend scaled, or a second opinion on your architecture? Here's how I can help. | Bạn cần xây dựng một ứng dụng web, mở rộng backend, hay cần thêm góc nhìn về kiến trúc hệ thống? Đây là cách tôi có thể giúp. |
| `workWithMe.services[0].name` | End-to-end web apps | Ứng dụng web trọn gói |
| `workWithMe.services[0].description` | I design and build the whole app: front end, API, database and deployment. | Tôi thiết kế và xây dựng toàn bộ ứng dụng: front end, API, cơ sở dữ liệu và triển khai. |
| `workWithMe.services[0].cta` | Discuss a web app | Trao đổi về ứng dụng web |
| `workWithMe.services[0].type` | freelance | = EN |
| `workWithMe.services[1].name` | Backend, API and AWS | Backend, API và AWS |
| `workWithMe.services[1].description` | APIs, background jobs and data pipelines in Node.js and NestJS, running on AWS. | API, tác vụ nền và pipeline dữ liệu bằng Node.js và NestJS, chạy trên AWS. |
| `workWithMe.services[1].cta` | Discuss a backend | Trao đổi về backend |
| `workWithMe.services[1].type` | freelance | = EN |
| `workWithMe.services[2].name` | Industry starter kits | Starter kit theo ngành |
| `workWithMe.services[2].description` | Foundations for restaurant ordering (TableTap), appointment booking and a small-team CRM, tailored to your business. | Nền tảng cho gọi món nhà hàng (TableTap), đặt lịch hẹn và CRM cho đội nhỏ, tùy chỉnh theo doanh nghiệp của bạn. |
| `workWithMe.services[2].cta` | Ask about a kit | Hỏi về starter kit |
| `workWithMe.services[2].type` | freelance | = EN |
| `workWithMe.services[2].kits[0]` | TableTap | = EN |
| `workWithMe.services[2].kits[1]` | Booking kit | = EN |
| `workWithMe.services[2].kits[2]` | CRM kit | = EN |
| `workWithMe.services[3].name` | Architecture consulting | Tư vấn kiến trúc |
| `workWithMe.services[3].description` | A second pair of eyes on your architecture, performance and scaling decisions. | Góc nhìn độc lập cho các quyết định về kiến trúc, hiệu năng và khả năng mở rộng. |
| `workWithMe.services[3].cta` | Request a review | Trao đổi về kiến trúc |
| `workWithMe.services[3].type` | consulting | = EN |
| `workWithMe.stepsTitle` | How I work | Cách tôi làm việc |
| `workWithMe.stepLabel(…)` | Step 3 | Bước 3 |
| `workWithMe.steps[0].name` | Discuss | Trao đổi |
| `workWithMe.steps[0].description` | We talk through your goals, users and constraints. | Chúng ta cùng làm rõ mục tiêu, người dùng và các ràng buộc. |
| `workWithMe.steps[1].name` | Proposal | Đề xuất |
| `workWithMe.steps[1].description` | You get a written scope and plan to agree on. | Bạn nhận phạm vi công việc và kế hoạch bằng văn bản để thống nhất. |
| `workWithMe.steps[2].name` | Build | Xây dựng |
| `workWithMe.steps[2].description` | Spec → code → test → review, in small steps you can follow. | Spec → code → test → review, theo từng bước nhỏ để bạn dễ theo dõi. |
| `workWithMe.steps[3].name` | Hand-over and support | Bàn giao và hỗ trợ |
| `workWithMe.steps[3].description` | You get the code and docs, with support during the hand-over. | Bạn nhận mã nguồn và tài liệu, kèm hỗ trợ trong quá trình bàn giao. |

### skills

| Key | EN | VI |
|---|---|---|
| `skills.eyebrow` | 01 / skills | 01 / kỹ năng |
| `skills.title` | Skills | Kỹ năng |
| `skills.groups[0].name` | Frontend | = EN |
| `skills.groups[0].items[0]` | React | = EN |
| `skills.groups[0].items[1]` | Next.js | = EN |
| `skills.groups[0].items[2]` | TypeScript | = EN |
| `skills.groups[0].items[3]` | JavaScript | = EN |
| `skills.groups[0].items[4]` | Tailwind CSS | = EN |
| `skills.groups[1].name` | Backend | = EN |
| `skills.groups[1].items[0]` | Node.js | = EN |
| `skills.groups[1].items[1]` | NestJS | = EN |
| `skills.groups[1].items[2]` | GraphQL | = EN |
| `skills.groups[1].items[3]` | REST | = EN |
| `skills.groups[1].items[4]` | WebSocket | = EN |
| `skills.groups[2].name` | Data & messaging | Dữ liệu & messaging |
| `skills.groups[2].items[0]` | PostgreSQL | = EN |
| `skills.groups[2].items[1]` | MySQL | = EN |
| `skills.groups[2].items[2]` | MongoDB | = EN |
| `skills.groups[2].items[3]` | Redis | = EN |
| `skills.groups[2].items[4]` | Elasticsearch | = EN |
| `skills.groups[2].items[5]` | RabbitMQ | = EN |
| `skills.groups[2].items[6]` | Kafka | = EN |
| `skills.groups[3].name` | Cloud & DevOps | = EN |
| `skills.groups[3].items[0]` | AWS | = EN |
| `skills.groups[3].items[1]` | Docker | = EN |
| `skills.groups[3].items[2]` | GitHub Actions | = EN |
| `skills.groups[3].items[3]` | Grafana | = EN |
| `skills.secondary.name` | Also familiar with | Kỹ năng bổ trợ |
| `skills.secondary.items[0]` | Go | = EN |
| `skills.secondary.items[1]` | Python | = EN |

### experience

| Key | EN | VI |
|---|---|---|
| `experience.eyebrow` | 02 / experience | 02 / kinh nghiệm |
| `experience.title` | Where I've shipped | Những nơi tôi đã làm việc |
| `experience.roles[0].period` | 03/2024 – 07/2026 | = EN |
| `experience.roles[0].company` | FPT Software | = EN |
| `experience.roles[0].summary` | Software Engineer — Long Châu Pharmacy platform, AI image processing (Japan), AWS data workflows (Australia). Mentored junior engineers. | = EN |
| `experience.roles[0].entries[0].title` | Software Engineer | = EN |
| `experience.roles[0].entries[0].period` | 01/2026 – 07/2026 | = EN |
| `experience.roles[0].entries[0].context` | Australian clients (data processing on AWS) | = EN |
| `experience.roles[0].entries[0].tags[0]` | NestJS | = EN |
| `experience.roles[0].entries[0].tags[1]` | AWS S3 | = EN |
| `experience.roles[0].entries[0].tags[2]` | AWS Lambda | = EN |
| `experience.roles[0].entries[0].tags[3]` | Python | = EN |
| `experience.roles[0].entries[0].tags[4]` | Node.js | = EN |
| `experience.roles[0].entries[0].tags[5]` | AWS SES | = EN |
| `experience.roles[0].entries[0].bullets[0].text` | Worked directly with Australian clients to gather and clarify business requirements through regular meetings and technical discussions. | = EN |
| `experience.roles[0].entries[0].bullets[0].result` | Translated client requirements into practical backend solutions and aligned implementation with business needs. | = EN |
| `experience.roles[0].entries[0].bullets[1].text` | Built NestJS services for a file-driven data processing workflow on top of AWS S3. | = EN |
| `experience.roles[0].entries[0].bullets[1].result` | Centralized JSON-based data access for downstream systems and improved consistency across transformations. | = EN |
| `experience.roles[0].entries[0].bullets[2].text` | Implemented scheduled AWS Lambda jobs in Python, Node.js to scan S3 buckets every five minutes and aggregate multiple CSV files into a single JSON dataset. | = EN |
| `experience.roles[0].entries[0].bullets[2].result` | Persisted the processed output automatically. | = EN |
| `experience.roles[0].entries[0].bullets[3].text` | Designed asynchronous large-file processing and integrated AWS SES notifications. | = EN |
| `experience.roles[0].entries[0].bullets[3].result` | Improved throughput and reduced manual intervention in data transformation workflows. | = EN |
| `experience.roles[0].entries[0].bullets[4].text` | Structured the workflow around automated file ingestion, transformation, and notification steps. | = EN |
| `experience.roles[0].entries[0].bullets[4].result` | Enabled recurring data updates to run reliably with minimal operator involvement. | = EN |
| `experience.roles[0].entries[0].bullets[5].text` | Collaborated with backend and DevOps engineers to integrate NestJS, Lambda, S3, and SES into a stable distributed workflow. | = EN |
| `experience.roles[0].entries[0].bullets[5].result` | Ensured reliable service-to-service communication. | = EN |
| `experience.roles[0].entries[1].title` | Software Engineer | = EN |
| `experience.roles[0].entries[1].period` | 09/2025 – 12/2025 | = EN |
| `experience.roles[0].entries[1].context` | Japanese clients (AI, Databricks) | = EN |
| `experience.roles[0].entries[1].tags[0]` | Databricks | = EN |
| `experience.roles[0].entries[1].tags[1]` | REST APIs | = EN |
| `experience.roles[0].entries[1].tags[2]` | Node.js | = EN |
| `experience.roles[0].entries[1].tags[3]` | Worker Threads | = EN |
| `experience.roles[0].entries[1].tags[4]` | PostgreSQL | = EN |
| `experience.roles[0].entries[1].tags[5]` | TypeORM | = EN |
| `experience.roles[0].entries[1].tags[6]` | WebSocket | = EN |
| `experience.roles[0].entries[1].bullets[0].text` | Worked directly with Japanese clients to gather and clarify business requirements through regular meetings and technical discussions. | = EN |
| `experience.roles[0].entries[1].bullets[0].result` | Translated client requirements into practical backend solutions and aligned implementation with business needs. | = EN |
| `experience.roles[0].entries[1].bullets[1].text` | Owned backend development from architecture design to production deployment, researching the Databricks platform. | = EN |
| `experience.roles[0].entries[1].bullets[1].result` | Designed a production-ready solution on Databricks Apps. | = EN |
| `experience.roles[0].entries[1].bullets[2].text` | Designed streaming-based REST APIs for large image uploads, returning job IDs immediately while processing requests asynchronously. | = EN |
| `experience.roles[0].entries[1].bullets[2].result` | Avoided blocking the Node.js event loop and prevented out-of-memory issues. | = EN |
| `experience.roles[0].entries[1].bullets[3].text` | Designed an event-driven processing pipeline using Worker Threads, job queues, retry policies, and dead-letter queues. | = EN |
| `experience.roles[0].entries[1].bullets[3].result` | Enabled resilient image preprocessing and AI inference. | = EN |
| `experience.roles[0].entries[1].bullets[4].text` | Implemented CPU-intensive preprocessing with Worker Threads before dispatching jobs to Databricks Model Serving. | = EN |
| `experience.roles[0].entries[1].bullets[4].result` | Kept backend APIs responsive under heavy workloads. | = EN |
| `experience.roles[0].entries[1].bullets[5].text` | Designed PostgreSQL data models with TypeORM, foreign keys, unique constraints, and cascading relationships. | = EN |
| `experience.roles[0].entries[1].bullets[5].result` | Ensured data integrity and supported reliable, scalable AI processing workflows. | = EN |
| `experience.roles[0].entries[1].bullets[6].text` | Designed real-time job tracking where AI workers persisted results and published completion events. | = EN |
| `experience.roles[0].entries[1].bullets[6].result` | Enabled the backend to deliver live status updates and inference results to the frontend through WebSocket. | = EN |
| `experience.roles[0].entries[1].bullets[7].text` | Implemented secure application-level and user-level authorization for Databricks Apps. | = EN |
| `experience.roles[0].entries[1].bullets[7].result` | Protected shared AI workspaces and customer-facing services. | = EN |
| `experience.roles[0].entries[2].title` | Software Engineer – FPT Retail – Long Châu Pharmacy | = EN |
| `experience.roles[0].entries[2].period` | 03/2024 – 09/2025 | = EN |
| `experience.roles[0].entries[2].context` |  | = EN |
| `experience.roles[0].entries[2].tags[0]` | Node.js | = EN |
| `experience.roles[0].entries[2].tags[1]` | NestJS | = EN |
| `experience.roles[0].entries[2].tags[2]` | TypeScript | = EN |
| `experience.roles[0].entries[2].tags[3]` | Worker Threads | = EN |
| `experience.roles[0].entries[2].tags[4]` | Redis | = EN |
| `experience.roles[0].entries[2].tags[5]` | Elasticsearch | = EN |
| `experience.roles[0].entries[2].tags[6]` | AWS S3 | = EN |
| `experience.roles[0].entries[2].bullets[0].text` | Developed and enhanced backend microservices for Long Châu’s pharmacy retail platform, supporting more than 2,500 stores and millions of users, while mentoring junior engineers. | = EN |
| `experience.roles[0].entries[2].bullets[0].result` | Consistently delivered complex backend features on schedule under tight business deadlines. | = EN |
| `experience.roles[0].entries[2].bullets[1].text` | Designed and implemented scalable RESTful APIs using Node.js, NestJS, and TypeScript, applying SOLID principles and Clean Architecture. | = EN |
| `experience.roles[0].entries[2].bullets[1].result` | Built maintainable, extensible, and production-ready backend services. | = EN |
| `experience.roles[0].entries[2].bullets[2].text` | Designed, implemented, and owned a dedicated Worker Service responsible for document generation and large-file processing using Worker Threads and asynchronous processing. | = EN |
| `experience.roles[0].entries[2].bullets[2].result` | Generated Word reports and handled Excel import/export workflows while keeping APIs responsive under heavy workloads. Published job completion events and delivered generated files through a real-time notification system. | = EN |
| `experience.roles[0].entries[2].bullets[3].text` | Designed and implemented Redis-backed inventory services. | = EN |
| `experience.roles[0].entries[2].bullets[3].result` | Reduced average API response time from 300 ms to 20 ms, lowered database load by approximately 40%, and optimized infrastructure costs for high-traffic inventory operations. | = EN |
| `experience.roles[0].entries[2].bullets[4].text` | Built Elasticsearch-powered search services and secure AWS S3 file upload/download workflows using Presigned URLs. | = EN |
| `experience.roles[0].entries[2].bullets[4].result` | Improved search performance, secure file handling, and operational efficiency across multiple business domains. | = EN |
| `experience.roles[0].entries[2].bullets[5].text` | Migrated legacy services to a modern NestJS-based microservice architecture while adopting standardized engineering practices. | = EN |
| `experience.roles[0].entries[2].bullets[5].result` | Improved maintainability, modularity, production reliability, and long-term scalability. | = EN |
| `experience.roles[0].entries[2].bullets[6].text` | Collaborated closely with backend engineers across multiple microservices, product managers, QA engineers, and cross-functional teams to design scalable technical solutions and define service contracts. | = EN |
| `experience.roles[0].entries[2].bullets[6].result` | Ensured seamless integration between distributed services. | = EN |
| `experience.roles[0].entries[2].bullets[7].text` | Partnered with the DevOps team to optimize Node.js production environments, including application configuration, resource utilization, deployment strategies, and runtime performance. | = EN |
| `experience.roles[0].entries[2].bullets[7].result` | Improved service stability and operational efficiency. | = EN |
| `experience.roles[0].entries[2].bullets[8].text` | Supported production operations by monitoring application health, troubleshooting incidents, optimizing system performance, and resolving production issues. | = EN |
| `experience.roles[0].entries[2].bullets[8].result` | Ensured reliable service delivery. | = EN |
| `experience.roles[1].period` | 08/2022 – 03/2024 | = EN |
| `experience.roles[1].company` | NEOX | = EN |
| `experience.roles[1].summary` | Software Engineer, fintech — GraphQL & REST APIs, NiFi pipelines MongoDB → PostgreSQL, CI/CD with SonarQube. | = EN |
| `experience.roles[1].entries[0].title` | Software Engineer | = EN |
| `experience.roles[1].entries[0].period` | 08/2022 – 03/2024 | = EN |
| `experience.roles[1].entries[0].context` | Fintech | = EN |
| `experience.roles[1].entries[0].tags[0]` | NestJS | = EN |
| `experience.roles[1].entries[0].tags[1]` | Apollo Server | = EN |
| `experience.roles[1].entries[0].tags[2]` | TypeScript | = EN |
| `experience.roles[1].entries[0].tags[3]` | GraphQL | = EN |
| `experience.roles[1].entries[0].tags[4]` | Apache NiFi | = EN |
| `experience.roles[1].entries[0].tags[5]` | MongoDB | = EN |
| `experience.roles[1].entries[0].tags[6]` | PostgreSQL | = EN |
| `experience.roles[1].entries[0].tags[7]` | SonarQube | = EN |
| `experience.roles[1].entries[0].tags[8]` | ESLint | = EN |
| `experience.roles[1].entries[0].tags[9]` | Node.js | = EN |
| `experience.roles[1].entries[0].tags[10]` | Cloudflare | = EN |
| `experience.roles[1].entries[0].tags[11]` | Mailjet | = EN |
| `experience.roles[1].entries[0].bullets[0].text` | Developed RESTful APIs for internal service communication and GraphQL APIs for frontend applications using NestJS, Apollo Server, and TypeScript. | = EN |
| `experience.roles[1].entries[0].bullets[0].result` | Provided efficient and flexible data access across fintech platforms. | = EN |
| `experience.roles[1].entries[0].bullets[1].text` | Designed and implemented Apache NiFi data pipelines to continuously synchronize operational data from MongoDB to PostgreSQL. | = EN |
| `experience.roles[1].entries[0].bullets[1].result` | Enabled complex SQL-based reporting and business analytics without impacting production workloads. | = EN |
| `experience.roles[1].entries[0].bullets[2].text` | Improved software quality and deployment reliability by enhancing CI/CD pipelines, integrating SonarQube, ESLint, and automated testing. | = EN |
| `experience.roles[1].entries[0].bullets[2].result` | Modernized legacy Node.js services to improve maintainability and code quality. | = EN |
| `experience.roles[1].entries[0].bullets[3].text` | Researched, integrated, and deployed Cloudflare for document uploads and Mailjet for email notifications within the microservice platform. | = EN |
| `experience.roles[1].entries[0].bullets[3].result` | Enabled secure file upload workflows and reliable email delivery while reducing infrastructure complexity and operational overhead. | = EN |
| `experience.roles[1].entries[0].bullets[4].text` | Collaborated closely with backend engineers, product managers, QA engineers, and business stakeholders to design microservice and event-driven solutions and define API contracts. | = EN |
| `experience.roles[1].entries[0].bullets[4].result` | Delivered scalable backend architectures aligned with business requirements. | = EN |
| `experience.roles[2].period` | 01/2021 – 08/2022 | = EN |
| `experience.roles[2].company` | Faboshop | = EN |
| `experience.roles[2].summary` | Founding engineer, social commerce — picked the stack, Redis auth & token rotation, APIs for web, iOS and Android. | = EN |
| `experience.roles[2].entries[0].title` | Software Engineer | = EN |
| `experience.roles[2].entries[0].period` | 01/2021 – 08/2022 | = EN |
| `experience.roles[2].entries[0].context` | E-commerce | = EN |
| `experience.roles[2].entries[0].tags[0]` | NestJS | = EN |
| `experience.roles[2].entries[0].tags[1]` | MongoDB | = EN |
| `experience.roles[2].entries[0].tags[2]` | PostgreSQL | = EN |
| `experience.roles[2].entries[0].tags[3]` | Node.js | = EN |
| `experience.roles[2].entries[0].tags[4]` | TypeScript | = EN |
| `experience.roles[2].entries[0].tags[5]` | Redis | = EN |
| `experience.roles[2].entries[0].tags[6]` | Firebase Cloud Messaging | = EN |
| `experience.roles[2].entries[0].tags[7]` | Google Cloud Storage | = EN |
| `experience.roles[2].entries[0].tags[8]` | Facebook APIs | = EN |
| `experience.roles[2].entries[0].bullets[0].text` | Joined the founding engineering team and played a key role in evaluating and selecting the technology stack, including NestJS and supporting libraries. | = EN |
| `experience.roles[2].entries[0].bullets[0].result` | Contributed to backend architecture, database schema design, and engineering standards for a social commerce platform built on MongoDB and PostgreSQL. | = EN |
| `experience.roles[2].entries[0].bullets[1].text` | Designed and developed scalable backend APIs using Node.js, NestJS, and TypeScript, supporting Web, Android, iOS, and internal administration systems. | = EN |
| `experience.roles[2].entries[0].bullets[1].result` | Ensured consistent business logic across multiple client applications. | = EN |
| `experience.roles[2].entries[0].bullets[2].text` | Developed internal administration modules for order management, product management, and operational workflows. | = EN |
| `experience.roles[2].entries[0].bullets[2].result` | Improved efficiency through centralized business operations. | = EN |
| `experience.roles[2].entries[0].bullets[3].text` | Designed and implemented Redis-based authentication, session management, refresh token rotation, token blacklisting, and caching strategies. | = EN |
| `experience.roles[2].entries[0].bullets[3].result` | Improved API performance and strengthened application security. | = EN |
| `experience.roles[2].entries[0].bullets[4].text` | Integrated Firebase Cloud Messaging (FCM) and Google Cloud Storage to deliver reliable push notifications and centralized media management. | = EN |
| `experience.roles[2].entries[0].bullets[4].result` | Improved user engagement and scalable file handling. | = EN |
| `experience.roles[2].entries[0].bullets[5].text` | Researched and integrated Facebook APIs into the platform to support social commerce features while implementing secure file upload services. | = EN |
| `experience.roles[2].entries[0].bullets[5].result` | Enhanced platform capabilities and user experience. | = EN |
| `experience.certificationsTitle` | Certifications | Chứng chỉ |
| `experience.certifications[0].name` | Cloud Developer Certificate | = EN |
| `experience.certifications[0].url` | https://www.udacity.com/certificate/e/5448d244-6532-11ef-bdfa-8b8c4cf38908 | = EN |
| `experience.certifications[1].name` | AWS Certified Developer – Associate (DVA-C02) | = EN |
| `experience.certifications[1].url` | https://www.credly.com/badges/ceb07f06-52f7-4067-850c-83162dc7ee60 | = EN |

### contact

| Key | EN | VI |
|---|---|---|
| `contact.eyebrow` | 05 / contact | 05 / liên hệ |
| `contact.title` | Need a fullstack engineer on your team, full-time or part-time? I'd love to hear about it. | Bạn cần một kỹ sư fullstack cho đội ngũ, toàn thời gian hoặc bán thời gian? Hãy cùng trao đổi nhé. |
| `contact.subline` | Have a web app project instead? Send me a brief. | Hay bạn có dự án ứng dụng web? Gửi tôi vài dòng mô tả nhé. |
| `contact.zalo.label` | Zalo 0339696831 | = EN |
| `contact.zalo.href` | https://zalo.me/0339696831 | = EN |
| `contact.footer[0]` | © 2026 Nguyen Manh Cuong | © 2026 Nguyễn Mạnh Cường |
| `contact.footer[1]` | built with Next.js · deployed on Vercel | xây dựng bằng Next.js · triển khai trên Vercel |

### contactCopy

| Key | EN | VI |
|---|---|---|
| `contactCopy.formTitle` | Send a message | Gửi tin nhắn |
| `contactCopy.name` | Name | Họ và tên |
| `contactCopy.email` | Email | = EN |
| `contactCopy.type` | How would you like to work together? | Bạn muốn hợp tác theo hình thức nào? |
| `contactCopy.message` | What do you need, and by when? | Bạn cần gì, và cần khi nào? |
| `contactCopy.messageHint` | A short description of the role or project, plus your timeline. | Mô tả ngắn về vị trí hoặc dự án, kèm mốc thời gian của bạn. |
| `contactCopy.phone` | Phone or Zalo (optional) | Số điện thoại hoặc Zalo (không bắt buộc) |
| `contactCopy.submit` | Send message | Gửi tin nhắn |
| `contactCopy.sending` | Sending… | Đang gửi… |
| `contactCopy.honeypot` | Leave this field empty | Để trống ô này |
| `contactCopy.summary(…)` | Check the 3 highlighted fields. | Vui lòng kiểm tra 3 ô được đánh dấu. |
| `contactCopy.sent` | Thanks, your message was sent. | Cảm ơn bạn, tin nhắn đã được gửi. |
| `contactCopy.limited(…)` | Too many messages from your connection. Wait 10 minutes and try again, or email manhcuongmvc@gmail.com. | Có quá nhiều tin nhắn từ kết nối của bạn. Hãy đợi 10 phút rồi thử lại, hoặc email cho tôi tại manhcuongmvc@gmail.com. |
| `contactCopy.failed` | Your message couldn't be sent. Try again, or email manhcuongmvc@gmail.com. | Chưa gửi được tin nhắn. Hãy thử lại, hoặc email cho tôi tại manhcuongmvc@gmail.com. |
| `contactCopy.errors.nameRequired` | Enter your name. | Vui lòng nhập họ và tên. |
| `contactCopy.errors.nameLong` | Keep your name under 100 characters. | Họ và tên cần ít hơn 100 ký tự. |
| `contactCopy.errors.nameInvalid` | Enter your name on one line. | Vui lòng nhập họ và tên trên một dòng. |
| `contactCopy.errors.emailRequired` | Enter your email address. | Vui lòng nhập địa chỉ email. |
| `contactCopy.errors.emailInvalid` | Enter an email address like name@example.com. | Vui lòng nhập email đúng dạng, ví dụ ten@example.com. |
| `contactCopy.errors.typeRequired` | Choose how you'd like to work together. | Vui lòng chọn hình thức hợp tác. |
| `contactCopy.errors.messageRequired` | Tell me what you need and your timeline. | Hãy cho tôi biết bạn cần gì và mốc thời gian. |
| `contactCopy.errors.messageShort` | Add a bit more detail (at least 20 characters). | Hãy thêm chi tiết (ít nhất 20 ký tự). |
| `contactCopy.errors.messageLong` | Keep it under 4,000 characters. | Vui lòng viết dưới 4.000 ký tự. |
| `contactCopy.errors.phoneInvalid` | Enter a phone or Zalo number using digits (spaces, + and dashes are fine). | Vui lòng nhập số điện thoại hoặc Zalo bằng chữ số (được dùng khoảng trắng, + và dấu gạch). |
