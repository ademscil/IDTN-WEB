# Implementation Plan Documentation (IPD) — IDTN Landing Page
**ID Dokumen:** IDTN-WEB-IPD-006  
**Versi:** 2.0.0 (SDLC Multi-Role Audit Standard)  
**Status:** Approved for Implementation  
**Klasifikasi:** Engineering Execution & Release Roadmap  

---

## 1. Roadmap & Tahapan Eksekusi Bertahap

Pengerjaan landing page dibagi menjadi 8 fase terstruktur dengan kontrol kualitas ketat:

```text
Phase 1: Inisialisasi Workspace & Tooling Anti-AI-Slop
  │
Phase 2: Definisi Skema Zod & Pembuatan Datasets Local CMS (src/data/*.json)
  │
Phase 3: Komponen Fondasi (Header, Mobile Drawer, Skip Link, Footer)
  │
Phase 4: Section Korporat (Hero, Trust Metrics, About Us Visi-Misi ala TKM)
  │
Phase 5: Section Teknis (Solutions Catalog & DWDM Slide Deck ala T8.ru)
  │
Phase 6: Section Bukti & Portofolio (Legalitas & Audit, Projects, Gallery, Clients)
  │
Phase 7: Integrasi Formulir Inquiry B2B, Honeypot & Handler Edge
  │
Phase 8: Audit SDLC Multi-Role v2.0 Menyeluruh, E2E Testing & Rilis Produksi
```

---

## 2. Rincian Task List & Exit Criteria

Notasi Prioritas:
- `[P0]`: *Release Blocker* (Wajib selesai sebelum rilis MVP).
- `[P1]`: *Core Enhancement* (Penyempurnaan interaksi).
- `[P2]`: *Post-MVP Polish* (Optimalisasi lanjutan).

### Fase 1 — Inisialisasi Workspace & Standar Kualitas Kode
- [ ] **TSK-101 [P0]**: Inisialisasi project Vite 6 + React 19 + TypeScript 5.8 dengan mode strict.
- [ ] **TSK-102 [P0]**: Konfigurasi Tailwind CSS v4 dengan token kustom di `src/styles/tokens.css`.
- [ ] **TSK-103 [P0]**: Konfigurasi ESLint 9 flat config + Prettier dengan aturan pelarangan tipe `any` dan enforce React hooks dependencies.
- [ ] **TSK-104 [P0]**: Setup Vitest untuk pengujian unit dan Playwright untuk pengujian browser headless.
- [ ] **TSK-105 [P0]**: Konfigurasi `.env.example` dan perlindungan secret pada `.gitignore`.
- *Exit Criteria Fase 1*: `npm run lint` dan `npx tsc --noEmit` lolos bersih tanpa peringatan.

### Fase 2 — Skema Zod & Content Datasets (Local CMS)
- [ ] **TSK-201 [P0]**: Implementasikan skema validasi Zod di `src/schemas/` (`compliance`, `dwdm`, `inquiry`, `company`).
- [ ] **TSK-202 [P0]**: Buat data terstruktur di `src/data/company.json` memuat visi, misi, dan kontak resmi IDTN (Cikini Raya No. 79).
- [ ] **TSK-203 [P0]**: Buat data legalitas, izin Kominfo, sertifikat ISO, dan audit di `src/data/compliance.json`.
- [ ] **TSK-204 [P0]**: Buat data spesifikasi teknis DWDM di `src/data/dwdm-tech.json` (ala T8.ru).
- [ ] **TSK-205 [P0]**: Buat data solusi di `src/data/solutions.json`, proyek di `src/data/projects.json`, dan galeri di `src/data/gallery.json`.
- [ ] **TSK-206 [P0]**: Tulis unit test untuk memverifikasi seluruh file JSON lolos parsing Zod 100%.
- *Exit Criteria Fase 2*: Seluruh dataset valid dan terikat tipe TypeScript kuat tanpa error.

### Fase 3 — Komponen Fondasi & Navigasi
- [ ] **TSK-301 [P0]**: Buat komponen `SkipLink.tsx` untuk aksesibilitas keyboard pembaca layar.
- [ ] **TSK-302 [P0]**: Buat komponen `Header.tsx` dengan transisi scroll ke compact state tanpa memicu CLS.
- [ ] **TSK-303 [P0]**: Buat komponen `MobileDrawer.tsx` lengkap dengan *focus trap*, penutupan `Escape`, dan pengembalian fokus.
- [ ] **TSK-304 [P0]**: Buat komponen `Footer.tsx` memuat alamat legal, kontak resmi, tautan kebijakan privasi, dan navigasi.
- *Exit Criteria Fase 3*: Navigasi keyboard penuh dapat menelusuri header dan footer dengan kontras visual tinggi.

### Fase 4 — Section Korporat & Kepercayaan (ala TKM.co.id)
- [ ] **TSK-401 [P0]**: Implementasikan `HeroSection.tsx` dengan tag `<h1>` tunggal, copy pendukung, tombol RFP primary, dan visual optik ringan.
- [ ] **TSK-402 [P0]**: Implementasikan `TrustStripSection.tsx` yang menampilkan ringkasan metrik korporat IDTN.
- [ ] **TSK-403 [P0]**: Implementasikan `AboutUsSection.tsx` memuat visi, misi, dan pilar integritas perusahaan.
- *Exit Criteria Fase 4*: First paint tampil dalam < 1.0 detik; layout stabil tanpa layout shift.

### Fase 5 — Section Teknis & DWDM Modular Slide Deck (ala T8.ru)
- [ ] **TSK-501 [P0]**: Implementasikan `SolutionsSection.tsx` menampilkan 4 pilar kartu solusi jaringan dengan hover & keyboard active state.
- [ ] **TSK-502 [P0]**: Integrasikan Swiper 11 / GSAP untuk `DwdmExplorerSection.tsx` membentuk slide deck presentasi interaktif (MUX -> EDFA -> DEMUX -> Services).
- [ ] **TSK-503 [P0]**: Tambahkan kontrol slide: tombol navigasi panah, gesture swipe sentuh, dan penomoran dinamis `01 / 04`.
- [ ] **TSK-504 [P0]**: Buat fallback mode statis saat pengguna mengaktifkan `prefers-reduced-motion` atau JavaScript dinonaktifkan.
- *Exit Criteria Fase 5*: Slide berpindah mulus di mobile & desktop; ramah performa (60 FPS, tanpa jank).

### Fase 6 — Section Kredibilitas, Proyek & Galeri
- [ ] **TSK-601 [P0]**: Implementasikan `ComplianceSection.tsx` menampilkan kartu sertifikasi ISO, NIB, izin Kominfo, dan laporan audit.
- [ ] **TSK-602 [P0]**: Buat komponen `Modal.tsx` untuk menampilkan ringkasan dokumen legalitas/audit saat kartu diklik.
- [ ] **TSK-603 [P1]**: Implementasikan `ProjectsSection.tsx` dalam format slide showcase proyek implementasi jaringan optik.
- [ ] **TSK-604 [P1]**: Implementasikan `GallerySection.tsx` menampilkan dokumentasi instalasi rak, uji OTDR, dan splicing kabel optik dengan atribut `alt` deskriptif.
- [ ] **TSK-605 [P1]**: Implementasikan `ClientsSection.tsx` menampilkan logo mitra operator telekomunikasi & data center.
- *Exit Criteria Fase 6*: Modal dapat dioperasikan penuh via keyboard; seluruh gambar memiliki dimensi eksplisit (`aspect-ratio`).

### Fase 7 — Formulir Inquiry B2B & Keamanan Edge
- [ ] **TSK-701 [P0]**: Implementasikan `InquiryFormSection.tsx` terikat validasi Zod secara real-time.
- [ ] **TSK-702 [P0]**: Tanamkan proteksi honeypot `_gotcha` dan kunci tombol saat state `submitting` (mencegah klik ganda).
- [ ] **TSK-703 [P0]**: Implementasikan adapter endpoint `/api/inquiries` dengan respon sukses memuat nomor referensi inquiry.
- [ ] **TSK-704 [P0]**: Terapkan pesan kesalahan inline yang terhubung melalui atribut `aria-describedby` untuk pembaca layar.
- *Exit Criteria Fase 7*: Pengiriman formulir sukses diuji; bot spam honeypot terdeteksi dan diabaikan.

### Fase 8 — Audit SDLC Multi-Role v2.0 & Verifikasi Rilis
- [ ] **TSK-801 [P0]**: Eksekusi seluruh rangkaian Verification Commands (`lint`, `tsc`, `test`, `build`, `audit`).
- [ ] **TSK-802 [P0]**: Pengujian browser Chromium & Firefox via Playwright: verifikasi Zero Unhandled Console Errors.
- [ ] **TSK-803 [P0]**: Audit Aksesibilitas via Lighthouse & Axe-Core: Target skor Aksesibilitas = 100.
- [ ] **TSK-804 [P0]**: Verifikasi Checklist Keamanan OWASP Top 10 (XSS, CSP, secret leakage, clickjacking).
- [ ] **TSK-805 [P0]**: Setup GitHub Actions workflow `.github/workflows/audit-and-build.yml`.
- *Exit Criteria Fase 8*: Seluruh gate rilis terpenuhi, laporan audit final bertanda tangan hijau.

---

## 3. Matriks Ketertelusuran (Traceability Matrix)

| Kebutuhan Produk (PRD) | Komponen Teknis (TRD / BSD) | Kode Komponen UI | Pengujian QA / Verifikasi |
| :--- | :--- | :--- | :--- |
| **FR-001 (Header & Nav)** | TRD Sec 3.2, 3.6 | `src/components/layout/Header.tsx` | Vitest: responsive render; Playwright: drawer focus trap |
| **FR-002 (Hero Section)** | TRD Sec 3.2, DBD Sec 3 | `src/components/sections/HeroSection.tsx` | Lighthouse LCP < 2.0s; H1 tag counter = 1 |
| **FR-003 (Visi Misi TKM)**| BSD Sec 2.1 (`company.json`) | `src/components/sections/AboutUsSection.tsx` | Zod schema parse test; visual audit alignment |
| **FR-004 (Solutions)** | BSD Sec 2.3 (`solutions.json`)| `src/components/sections/SolutionsSection.tsx` | Keyboard tab navigation; hover state contrast test |
| **FR-005 (DWDM Deck T8)** | TRD Sec 1.1, DBD Sec 4 | `src/components/sections/DwdmExplorerSection.tsx`| Playwright swipe test; reduced-motion branch test |
| **FR-006 (Compliance)**| BSD Sec 2.2 (`compliance.json`)| `src/components/sections/ComplianceSection.tsx` | Modal keyboard trap test; Escape key close test |
| **FR-007 (Projects)** | BSD Sec 2.5 (`projects.json`)| `src/components/sections/ProjectsSection.tsx` | Swiper pagination index counter test |
| **FR-008 (Gallery)** | BSD Sec 2.5 (`gallery.json`) | `src/components/sections/GallerySection.tsx` | Axe-core img-alt test; aspect ratio CLS test |
| **FR-009 (Clients)** | BSD Sec 2.5 (`clients.json`) | `src/components/sections/ClientsSection.tsx` | Grayscale CSS filter hover verification |
| **FR-010 (Inquiry Form)**| BSD Sec 3.2, TRD Sec 3.7 | `src/components/sections/InquiryFormSection.tsx`| Vitest Zod validator; Playwright honeypot & submit |
| **FR-011 (Footer)** | TRD Sec 3.2, 3.7 | `src/components/layout/Footer.tsx` | Link rel="noopener" security test |

---

## 4. Definition of Done (DoD) & Release Gates

Sebuah task atau modul dinyatakan **SELESAI (DONE)** hanya bila memenuhi syarat:
1. Kode sumber telah ditulis sesuai kaidah strict TypeScript tanpa tipe `any`.
2. Komponen telah diuji secara responsif pada ukuran Mobile (375px), Tablet (768px), dan Desktop (1280px).
3. Pengujian aksesibilitas lolos (kontras warna ≥ 4.5:1, keyboard navigasi bekerja, atribut ARIA lengkap).
4. Tidak memicu peringatan (*warning*) atau error pada konsol browser.
5. Unit test terkait telah dibuat dan berstatus lulus (*PASS*).
6. Hasil eksekusi `npm run build` berhasil menghasilkan bundle siap produksi.
