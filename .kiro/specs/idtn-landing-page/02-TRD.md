# Technical Requirement Documentation (TRD) — IDTN Landing Page
**ID Dokumen:** IDTN-WEB-TRD-002  
**Versi:** 2.0.0 (SDLC Multi-Role Audit Standard)  
**Status:** Approved for Implementation  
**Klasifikasi:** Engineering Specification  
**Arsitektur Target:** Jamstack / Modern Component Architecture  

---

## 1. System Architecture & Tech Stack

Aplikasi dirancang menggunakan arsitektur frontend modern berkinerja tinggi, berorientasi komponen, dan bebas dari dependensi lawas (*no jQuery, no legacy CSS frameworks*).

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        IDTN Corporate Landing Page                     │
├────────────────────────────────────────────────────────────────────────┤
│ Presentation Layer (React 19 + TypeScript 5.8 + Tailwind CSS v4)      │
│ ├─ Atomic Components (Header, Hero, Cards, Modals, Footer)             │
│ ├─ Slide Presentation Engine (Swiper 11 + GSAP 3.12 Scroll/Timelines)  │
│ └─ Accessibility & Motion Layer (prefers-reduced-motion, ARIA trap)    │
├────────────────────────────────────────────────────────────────────────┤
│ Data & State Layer                                                     │
│ ├─ Decoupled Local CMS (Structured JSON at src/data/*.json)            │
│ ├─ Runtime Validation & Type Invariant (Zod v3)                        │
│ └─ UI State Controller (Zustand / React Context for Modal & Slides)   │
├────────────────────────────────────────────────────────────────────────┤
│ Integration & Edge Layer                                               │
│ ├─ Inquiry Form Handler (Serverless API Route / Netlify/Vercel Edge)   │
│ ├─ Anti-Spam (Honeypot + Rate Limiter Guard)                          │
│ └─ Security Headers & CSP Enforcement                                  │
└────────────────────────────────────────────────────────────────────────┘
```

### 1.1 Spesifikasi Dependensi Produksi
- **Runtime & Bundler**: Vite 6.x dengan ESBuild / Rollup pipeline.
- **UI Framework**: React 19.x + TypeScript 5.8 (Strict Type Checking).
- **Styling Engine**: Tailwind CSS v4 (native `@theme` tokens, tanpa CDN, dikompilasi saat build).
- **Interactive Slide & Motion Engine**:
  - `swiper` v11.x (Modular touch-enabled slide deck untuk Equipment & Gallery ala T8.ru).
  - `gsap` v3.12.x + `@gsap/shockingly` ScrollTrigger (Hardware-accelerated micro-animations).
- **Data Validation**: `zod` v3.x (Type-safe runtime validator untuk form input dan local JSON).
- **Iconography**: `lucide-react` (SVG icons berbasis tree-shaking).

---

## 2. Directory Structure & Modular Separation

Struktur folder mengadopsi prinsip *Separation of Concerns (SoC)*:

```text
idtn-landing-page/
├── .github/
│   └── workflows/
│       └── audit-and-build.yml       # CI/CD Gate SDLC Audit v2.0
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/
│       ├── brand/                    # Logo resmi IDTN (SVG, PNG)
│       ├── certificates/             # Dokumen sertifikat & audit
│       └── images/                   # Foto operasional & perangkat
├── src/
│   ├── components/                   # Komponen Presentasi UI
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── SkipLink.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MobileDrawer.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── TrustStripSection.tsx
│   │       ├── AboutUsSection.tsx
│   │       ├── SolutionsSection.tsx
│   │       ├── DwdmExplorerSection.tsx  # Interactive slide deck ala T8
│   │       ├── ComplianceSection.tsx    # Legalitas & Audit ala TKM
│   │       ├── ProjectsSection.tsx      # Slide carousel proyek
│   │       ├── GallerySection.tsx       # Grid & lightbox operasional
│   │       ├── ClientsSection.tsx
│   │       └── InquiryFormSection.tsx
│   ├── data/                         # Local CMS (JSON Decoupled)
│   │   ├── company.json
│   │   ├── compliance.json
│   │   ├── solutions.json
│   │   ├── dwdm-tech.json
│   │   ├── projects.json
│   │   ├── gallery.json
│   │   └── clients.json
│   ├── lib/                          # Utilities & Helpers
│   │   ├── motion.ts                 # GSAP & Reduced motion branch
│   │   ├── sanitizer.ts              # XSS defense & input cleaner
│   │   ├── analytics.ts              # Privacy-first event tracker
│   │   └── api.ts                    # Form submission fetch wrapper
│   ├── schemas/                      # Zod Schemas
│   │   ├── compliance.schema.ts
│   │   ├── dwdm.schema.ts
│   │   └── inquiry.schema.ts
│   ├── styles/
│   │   ├── tokens.css                # Custom CSS Variables
│   │   └── global.css                # Tailwind directives
│   ├── types/
│   │   └── index.ts                  # Shared TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── eslint.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 3. Integrasi 11 Peran SDLC Multi-Role Audit v2.0

### Peran 0 — Discovery & Project Governance
- Menggunakan konvensi strict TypeScript (`"strict": true`, `"noImplicitAny": true`, `"noUnusedLocals": true`).
- Konfigurasi environment terisolasi (`.env.example` terdokumentasi rapi, tidak ada hardcoded secret).

### Peran 1 — Business / Systems Analyst
- Seluruh 12 section yang didefinisikan pada PRD dipetakan 1-to-1 ke komponen React di folder `src/components/sections/`.
- Tidak ada fitur yang "menggantung" tanpa status verifikasi (`approved` / `pending_verification`).

### Peran 2 — UI/UX Design System
- Responsif penuh pada 4 breakpoint standar:
  - Mobile: `375px` s.d. `639px` (1 kolom, swipe carousel aktif).
  - Tablet: `640px` s.d. `1023px` (2 kolom grid).
  - Desktop: `1024px` s.d. `1279px` (12-column grid, sticky interactive slide).
  - Wide: `≥ 1280px` (Max container `80rem` / `1280px`).
- Mematuhi filosofi visual *Light Theme*: minimal 70% latar belakang adalah putih/off-white, navy gelap hanya sebagai aksen teks dan kontainer footer.

### Peran 3 — Software Architecture
- *Single Responsibility Principle (SRP)*: Komponen presentasi hanya menerima data dari props/hooks tanpa menanamkan logika bisnis keras.
- *Zero Circular Dependencies*: Struktur impor searah (Types/Schemas -> Data -> Lib -> Components -> App). Dicek melalui tooling arsitektur `madge` / `dependency-cruiser`.

### Peran 4 — Database & Data Layer (Local Headless CMS)
- Seluruh konten bisnis dikelola terpusat di `src/data/*.json`.
- Setiap berkas JSON divalidasi saat kompilasi/runtime menggunakan skema Zod untuk mencegah anomali tipe data (misal: format URL, nomor sertifikat, atau status approval yang salah).
- Mencegah operasi write yang tidak tervalidasi.

### Peran 5 — Backend & API Contract
- Formulir inquiry diarahkan ke endpoint `/api/inquiries`.
- Mendukung proteksi idempotency dan rate-limiting (maksimal 5 request per 15 menit per client IP).
- Format respon JSON konsisten:
  - Sukses: `200 OK` `{ "success": true, "inquiryId": "IDTN-INQ-XXXX", "message": "Permintaan berhasil dikirim" }`
  - Gagal Validasi: `400 Bad Request` `{ "success": false, "errors": { "email": "Format email korporat tidak valid" } }`
  - Rate Limited: `429 Too Many Requests` `{ "success": false, "message": "Terlalu banyak permintaan. Silakan coba 15 menit lagi." }`

### Peran 6 — Frontend & Code Quality
- Larangan keras penggunaan tipe `any` tanpa justifikasi tertulis.
- Hooks correctness: Setiap `useEffect` wajib mendeklarasikan array dependensi lengkap dan menyediakan fungsi *cleanup* (khususnya untuk event listener, Swiper instance, dan GSAP ScrollTrigger).
- Deteksi *dead code* dan duplikasi logika.

### Peran 7 — Security & AppSec Review (OWASP Top 10)
- **Injection (XSS & Command)**: Menggunakan encoding bawaan React JSX dan modul sanitasi input (`src/lib/sanitizer.ts`). Dilarang menggunakan `dangerouslySetInnerHTML`.
- **Sensitive Data Exposure**: Dilarang memasukkan Private Key, Webhook Token rahasia, atau kredensial internal ke dalam repositori atau client bundle.
- **Honeypot Anti-Bot**: Input tersembunyi `_gotcha` yang wajib kosong. Jika terisi, serverless handler mengabaikan submission secara diam-diam.
- **Security Headers**:
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.idtn.co.id;
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  ```

### Peran 8 — Performance Engineering
- Menggunakan format gambar modern (`.webp` / `.avif`) dengan atribut `width`, `height`, dan `loading="lazy"` (kecuali gambar Hero yang dimuat *eager* dengan `fetchpriority="high"`).
- Dynamic import (*code-splitting*) untuk komponen berat (Modal Viewer Sertifikasi dan Swiper Interactive Slide).
- Bundle budget: Total bundle gzipped < 250 KB.

### Peran 9 — Testing & QA Engineer
- Unit Testing dengan **Vitest**: Memvalidasi skema Zod, sanitasi XSS, formatter mata uang/angka, dan state reducer.
- E2E Testing dengan **Playwright**: Menjalankan pengujian fungsional form submit, drawer navigasi, perpindahan slide DWDM, dan mode *reduced motion*.
- Target coverage: ≥ 80% pada folder `src/lib/` dan `src/schemas/`.

### Peran 10 — Bug Hunter & Defensive Engineering
- Penanganan khusus untuk:
  - *Race condition* pada pengiriman formulir ganda (tombol dinonaktifkan seketika saat submit pertama).
  - *Memory leak*: Penghancuran objek `Swiper.destroy()` dan `ScrollTrigger.kill()` pada saat unmount komponen.
  - *Graceful degradation*: Tampilan tetap dapat dibaca dan difungsikan secara lengkap jika JavaScript dinonaktifkan di browser pengguna.

### Peran 11 — DevOps & Deployment Pipeline
- Setup pipeline otomatis pada `.github/workflows/audit-and-build.yml` yang menjalankan tahapan bertingkat:
  `Lint -> Type Check -> Test -> Security Audit -> Production Build`.
- Target hosting: Static Web Hosting berkecepatan tinggi (Cloudflare Pages / Vercel / Netlify) dengan CDN global terdistribusi.

---

## 4. Verification Commands (Wajib Dijalankan Sebelum Rilis)

Setiap pengembang atau agent yang mengerjakan implementasi WAJIB mengeksekusi rangkaian perintah ini dan melampirkan hasil keluaran terminalnya:

```bash
# 1. Analisis statis & aturan gaya kode
npm run lint

# 2. Pemeriksaan tipe data statis strict
npx tsc --noEmit

# 3. Eksekusi pengujian unit & kalkulasi coverage
npm test -- --coverage

# 4. Pengujian build produksi (memastikan zero build warnings)
npm run build

# 5. Audit keamanan dependensi open-source
npm audit --audit-level=high

# 6. Pemeriksaan circular dependency
npx madge --circular src/
```

---

## 5. MDN Web Standards Compliance Matrix

| Fitur / Pola Kode | Standar MDN | Implementasi pada IDTN Web | Referensi Resmi |
| :--- | :--- | :--- | :--- |
| **Landmark Semantik** | HTML5 Semantic Elements | Menggunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` secara hierarkis. | [MDN: Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) |
| **Form Accessibility** | Form Controls & ARIA | Setiap input memiliki `<label for="...">`, error terhubung via `aria-describedby`, status kirim via `aria-live`. | [MDN: Form Accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML#accessible_forms) |
| **Responsive Images** | `<picture>` & `srcset` | Memberikan alternatif format WebP dan ukuran layar berbeda guna menghemat bandwidth mobile. | [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) |
| **Motion Accessibility** | CSS Media Queries Level 5 | `@media (prefers-reduced-motion: reduce)` menonaktifkan translasi ekstrem dan beralih ke transisi instan. | [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) |
| **Scroll Driven Behavior** | Intersection Observer API | Mendeteksi posisi scroll untuk header compact dan reveal konten tanpa membebani main thread. | [MDN: IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) |

---

## 6. Riset Repositori & Tooling Rekomendasi (Anti-AI-Slop & Quality)

Berdasarkan kurasi teknologi terkini untuk menjamin kode berstandar *senior engineer*:

1. **`mattpocock/skills`**: Framework skill coding modular untuk menjamin output kode berstandar enterprise.
2. **`unslop` (UI DNA)**: Linter dan aturan desain untuk mencegah pola UI "AI-slop" (seperti gradien ungu berlebihan, neon glow murahan, atau layout membosankan).
3. **`ghost-qa`**: Headless testing harness untuk pengujian UI otomatis tanpa browser GUI berat.
4. **`vibe-shield`**: Scanner keamanan otomatis untuk mendeteksi kerentanan OWASP dan kebocoran credential pada repositori proyek.
5. **`ui-ux-pro-max-skill` & `taste-skill`**: Panduan kurasi tipografi, rasio spasi, dan hierarki mikro untuk menciptakan impresi desain bernilai tinggi.
6. **`dependency-cruiser` / `madge`**: Alat pemeriksa batas arsitektur untuk memvalidasi ketiadaan circular dependency pada source code.

---

## 7. Scope Disclaimer: "Zero Bug" & "Zero Warning"

1. Klaim "Zero Warning / Zero Bug" dalam dokumen ini diartikan sebagai: **Tidak ada isu yang diketahui (*known issues*) yang tidak dilaporkan atau dibiarkan tanpa mitigasi dalam batasan scope pengujian**.
2. Setiap temuan pada saat audit kode harus diklasifikasikan berdasarkan tingkat keparahan (*Critical, High, Medium, Low, Info*) beserta langkah reproduksi dan rekomendasi perbaikannya.
