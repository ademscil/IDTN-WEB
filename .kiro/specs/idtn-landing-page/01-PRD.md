# Product Requirement Documentation (PRD) — IDTN Landing Page
**ID Proyek:** IDTN-WEB-PRD-001  
**Versi:** 2.0.0 (SDLC Multi-Role Audit Standard)  
**Status:** Approved for Implementation  
**Klasifikasi:** Internal / B2B Commercial  
**Pemilik Proyek:** PT Infinix Delapan Teknologi Nusantara (IDTN)  
**Target Rilis:** Production MVP  

---

## 1. Executive Summary & Objective

### 1.1 Latar Belakang
PT Infinix Delapan Teknologi Nusantara (IDTN) merupakan perusahaan penyedia solusi infrastruktur jaringan telekomunikasi berkecepatan tinggi, transmisi serat optik (*fiber optic*), sistem DWDM (*Dense Wavelength Division Multiplexing*), *Data Center Interconnect* (DCI), serta *network orchestration & software management*.

Untuk memperluas penetrasi pasar B2B (Operator Telekomunikasi, Penyedia Cloud, Pengelola Data Center, dan Korporasi Enterprise), IDTN membutuhkan landing page korporat resmi yang merefleksikan keunggulan teknologi mutakhir, kepatuhan legalitas/audit, serta portofolio proyek yang solid.

### 1.2 Tujuan Produk
1. **Penyampaian Nilai Cepat (Quick Value Proposition)**: Memastikan pengambil keputusan B2B memahami kapabilitas inti IDTN dalam 10 detik pertama interaksi.
2. **Kredibilitas Korporat & Kepatuhan Audit (Trust & Compliance)**: Menampilkan legalitas resmi (NIB, Izin Kominfo), sertifikasi standar industri (ISO 9001/27001), laporan audit, dan mitra resmi tanpa klaim fiktif (*anti-hallucination governance*).
3. **Edukasi Teknologi Interaktif (High-Tech Engagement)**: Menyajikan sistem DWDM dan transmisi optik melalui visualisasi interaktif bergaya *modular slide deck* (terinspirasi dari platform manufaktur DWDM global `t8.ru`), sehingga arsitektur kompleks mudah dipahami lintas persona.
4. **Konversi Inquiry Efektif**: Menyediakan jalur konsultasi dan penawaran proyek (*Request for Proposal / Inquiry*) yang terverifikasi, aman dari spam/bot, dan responsif.
5. **Inklusivitas & Aksesibilitas Tinggi**: Memastikan landing page beroperasi mulus pada mode *light theme*, hemat daya (*low-end mobile*), pembaca layar (*screen reader*), navigasi keyboard penuh, serta mode *prefers-reduced-motion*.

---

## 2. Stakeholder & Dokumen Otoritas

### 2.1 Hierarki Referensi & Otoritas Keputusan
Apabila terdapat pertentangan format atau konten selama perancangan dan implementasi, urutan otoritas tertinggi adalah:
1. **Dokumen Kebijakan & Persetujuan Legal IDTN**: Data hukum, legalitas, izin resmi, dan kontak valid.
2. **Arahan Struktur Kredibilitas Pak Andik (`https://tkm.co.id/`)**: Struktur alur korporasi telekomunikasi (Visi-Misi, Legalitas, Audit, Sertifikasi, Portofolio Proyek, Galeri Lapangan, Klien).
3. **Arah Desain & Interaksi Teknologi (`https://t8.ru/en/`)**: Presentasi sistem DWDM interaktif, slide modular, transisi mulus, dan kartu spesifikasi perangkat.
4. **Spesifikasi Teknis UI/UX**: Format *Light Theme*, token visual konsisten, dan standar WCAG 2.2 Level AA.

---

## 3. Personas & Skenario Penggunaan

| Persona ID | Peran / Jabatan | Kebutuhan Utama | Kriteria Sukses Interaksi |
| :--- | :--- | :--- | :--- |
| **P1** | **Telecom Operator Network Planner** | Mencari mitra pengadaan DWDM, transmisi optik jarak jauh (*long-haul*), dan upgrade kapasitas link multi-terabit. | Menemukan spesifikasi teknis DWDM, kapasitas bitrate per wavelength, dan mengajukan formulir RFP teknis. |
| **P2** | **Data Center & Cloud Infrastructure Manager** | Membutuhkan interkoneksi antar *data center* (DCI) berlatensi ultra-rendah dan proteksi redundansi link. | Memahami skema proteksi redundansi optik dan mengirim permintaan konsultasi latensi/rute. |
| **P3** | **Enterprise C-Level / Decision Maker** | Mengevaluasi reputasi perusahaan, legitimasi hukum, dan kesiapan finansial/operasional vendor. | Melihat sertifikasi ISO, laporan audit independen, legalitas perusahaan, dan daftar mitra terkemuka. |
| **P4** | **Auditor & Procurement Specialist** | Memverifikasi nomor perizinan berusaha, sertifikat keaslian, kepatuhan TKDN, dan rekam jejak audit. | Dapat mengunduh/melihat dokumen legalitas, ringkasan audit, dan sertifikasi resmi secara transparan. |
| **P5** | **Field Engineer & Technical Evaluator** | Memeriksa dokumentasi kualitas kerja lapangan, standarisasi pengujian kabel optik, dan penataan rak. | Menelusuri galeri operasional lapangan, pengujian OTDR, dan penyambungan *fusion splicing*. |

---

## 4. Information Architecture (IA) Terintegrasi

Halaman disusun dalam 12 section terintegrasi secara modular:

```text
[01] Sticky Header & Navigation (Logo, Quick Links, Language, Hotline CTA)
  │
[02] Hero Section (Headline H1, Supporting Copy, Dual CTA, Optical Animation Visual)
  │
[03] Company Trust & Key Metrics Strip (Kapasitas Jaringan, Cakupan Link, Komitmen SLA)
  │
[04] About Us & Visi Misi (Sejarah, Visi, Misi, Nilai Integritas Korporat ala TKM)
  │
[05] Optical Solutions Catalog (4 Pilar Solusi Telekomunikasi & Jaringan IDTN)
  │
[06] DWDM Technology Explorer (Interactive Slide Deck ala T8.ru: MUX, DEMUX, C+L Band)
  │
[07] Legalitas, Sertifikasi & Laporan Audit (ISO 9001/27001, NIB, Izin Kominfo, Audit)
  │
[08] Featured Projects & Case Studies (Slide Showcase Implementasi Backbone & DCI)
  │
[09] Gallery & Field Operations (Dokumentasi Lapangan, Rack Cabling, Uji OTDR)
  │
[10] Strategic Clients & Partners (Grid Logo Mitra Operator & Enterprise)
  │
[11] Contact & Inquiry Request Form (Formulir B2B, Honeypot Anti-Spam, Validasi Zod)
  │
[12] Corporate Footer (Legal Address, Kontak Resmi, Navigasi, Hak Cipta)
```

---

## 5. Functional Requirements (FR)

### FR-001: Header & Navigasi Responsif
- **GIVEN** pengguna berada di viewport desktop (≥1024px) atau mobile (<1024px).
- **WHEN** halaman digulir melampaui offset 60px.
- **THEN** header harus bertransisi secara mulus dari state `default` (transparan/putih penuh) ke state `compact` dengan bayangan lembut tanpa memicu Cumulative Layout Shift (CLS < 0.05).
- **WHEN** pengguna mobile menekan tombol hamburger menu.
- **THEN** menu drawer harus terbuka dengan focus trap, dapat ditutup melalui tombol Escape, tombol silang, atau klik di luar area, serta mengembalikan fokus ke tombol pemicu.

### FR-002: Hero & Value Proposition
- **GIVEN** first paint selesai dimuat.
- **THEN** hero section wajib menampilkan tepat satu tag `<h1>` yang memuat nilai inti IDTN sebagai penyedia infrastruktur jaringan optik & telekomunikasi.
- **THEN** tersedia dua CTA: Primary CTA mengarahkan ke form inquiry (`#contact`) dan Secondary CTA menuju katalog solusi (`#solutions`).
- **THEN** visual optik harus memiliki fallback SVG statis jika WebGL/animasi dinonaktifkan atau JavaScript gagal dimuat.

### FR-003: Profil Perusahaan, Visi & Misi
- **GIVEN** pengunjung menavigasi ke section `#about`.
- **THEN** sistem menampilkan profil resmi IDTN, visi, misi, dan pilar keunggulan sesuai standar dokumen profil korporat telekomunikasi.
- **THEN** data metrik perusahaan (jumlah link, kapasitas, jam operasional) hanya dirender dari data terkonfigurasi pada file konten `approved`.

### FR-004: Solusi Jaringan Optik & Telekomunikasi
- **GIVEN** pengunjung melihat katalog solusi.
- **THEN** sistem menampilkan minimal 4 domain spesialisasi:
  1. *Fiber Optic Cable Infrastructure & Turnkey Deployment*.
  2. *High-Capacity DWDM & Optical Transport Systems*.
  3. *Data Center Interconnect (DCI) & Metro Networks*.
  4. *Network Management Software, OTDR Monitoring & Automation*.
- **THEN** setiap kartu solusi menyediakan affordance interaktif (hover, focus keyboard, dan klik) untuk membuka detail teknis tanpa merusak flow halaman.

### FR-005: DWDM Interactive Technology Deck (ala T8.ru)
- **GIVEN** pengunjung mencapai section DWDM Explorer.
- **THEN** sistem menyajikan presentasi interaktif bergaya *PowerPoint slide deck*:
  - **Slide 1**: *Channel Aggregation (Transponder & MUX)*.
  - **Slide 2**: *Optical Amplification & Single Fiber Transmission (EDFA & Raman)*.
  - **Slide 3**: *Demultiplexing & ROADM Routing (DEMUX)*.
  - **Slide 4**: *Multi-Service Handover & Client Interfaces (100G/400G/800G)*.
- **THEN** setiap slide dilengkapi indikator penomoran aktif (`01 / 04`), kontrol navigasi (Previous / Next), dukungan sapuan sentuh (*swipe gesture*), dan navigasi panah keyboard.
- **THEN** jika pengguna mengaktifkan mode `prefers-reduced-motion`, animasi transisi diganti dengan perpindahan langsung (*instant state change*).

### FR-006: Legalitas, Sertifikasi & Laporan Audit (Trust Engine)
- **GIVEN** calon klien atau auditor membuka section `#compliance`.
- **THEN** sistem menampilkan kartu sertifikasi (ISO 9001, ISO 27001, Izin Jasa Jaringan Kominfo, NIB OSS, dan Opini Laporan Audit Keuangan).
- **THEN** kartu menyediakan tombol aksi untuk membuka ringkasan dokumen melalui modal preview terverifikasi.
- **THEN** dokumen yang belum berstatus `approved` tidak boleh menampilkan nomor registrasi fiktif, melainkan menampilkan badge status *Dalam Proses Verifikasi Resmi*.

### FR-007: Portofolio Proyek (Featured Projects Showcase)
- **GIVEN** pengguna berada di section `#projects`.
- **THEN** proyek disajikan dalam format slide carousel horizontal yang memuat nama proyek, lingkup instalasi, kategori (Backbone / Metro / DCI), dan metrik pencapaian (misal total panjang kilometer optik atau kapasitas terpasang).
- **THEN** carousel memiliki navigasi mandiri yang tidak bergantung pada scroll wheel vertikal halaman.

### FR-008: Galeri Operasional Lapangan (Field Operations)
- **GIVEN** pengunjung membuka galeri operasional.
- **THEN** foto dokumentasi lapangan (uji redaman OTDR, terminasi ODF, instalasi sub-rack DWDM, dan penyambungan kabel optik) ditampilkan dalam grid responsif dengan rasio gambar terstandarisasi (16:9 atau 4:3).
- **THEN** setiap gambar wajib memiliki atribut `alt` deskriptif yang informatif untuk pembaca layar (*screen reader*).

### FR-009: Logo Klien & Mitra Strategis
- **GIVEN** section klien dimuat.
- **THEN** logo mitra/klien ditampilkan dalam format monokrom/skala abu-abu yang berubah ke warna asli saat di-hover/focus.
- **THEN** jika persetujuan publikasi logo mitra tertentu belum diterbitkan, logo tersebut disembunyikan secara otomatis melalui filter konfigurasi konten.

### FR-010: Formulir Kontak & Inquiry B2B
- **GIVEN** pengguna mengisi formulir pada `#contact`.
- **THEN** sistem memvalidasi field wajib:
  - Nama Lengkap (string, minimal 3 karakter, sanitasi XSS).
  - Nama Perusahaan / Instansi (string, wajib).
  - Alamat Email Korporat (email valid dengan regex RFC 5322).
  - Nomor Telepon / WhatsApp (angka 10–15 digit dengan format internasional/nasional).
  - Topik Kebutuhan Proyek (dropdown/pilihan topik).
  - Pesan / Rincian Scope (teks, batas minimal 10 karakter, maksimal 1000 karakter).
  - Hidden Honeypot Field (`_gotcha`) untuk memblokir bot spam secara otomatis.
- **WHEN** formulir sedang dikirim.
- **THEN** tombol submit berubah ke state *loading*, menonaktifkan klik ganda (*duplicate submission lock*), dan mengumumkan status kepada pembaca layar melalui `aria-live="polite"`.
- **WHEN** submission berhasil.
- **THEN** sistem menampilkan pesan konfirmasi sukses dengan nomor referensi inquiry dan menyediakan tombol untuk mereset formulir.

### FR-011: Footer Korporat & Aksesibilitas
- **GIVEN** footer halaman dimuat.
- **THEN** memuat alamat operasional resmi: *Jalan Cikini Raya No. 79, Jakarta Pusat, DKI Jakarta 10330, Indonesia*.
- **THEN** tautan eksternal resmi (Email, WhatsApp, Peta) dibuka dengan atribut pengaman `rel="noopener noreferrer"`.
- **THEN** memuat hak cipta resmi dan tautan ke kebijakan privasi.

---

## 6. Aturan Non-Fungsional (NFR) & Standar SDLC Audit v2.0

### 6.1 Kinerja (Performance Budget)
- **Largest Contentful Paint (LCP)**: < 2.0 detik pada jaringan 4G/profil mobile standar.
- **Cumulative Layout Shift (CLS)**: < 0.05 pada seluruh siklus interaksi.
- **Interaction to Next Paint (INP)**: < 150 ms.
- **Target Skor Lighthouse**: Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO = 100.
- **Beban Total JavaScript**: < 200 KB gzipped untuk initial bundle.

### 6.2 Keamanan Aplikasi (AppSec / OWASP Top 10)
- **Cross-Site Scripting (XSS)**: Seluruh input pengguna disanitasi sebelum diproses atau dirender kembali.
- **Anti-Spam & Honeypot**: Menggunakan field perangkap tak terlihat dan rate limiting (maksimal 5 submission per 15 menit per IP).
- **Keamanan Secret / Token**: Tidak ada credential, token rahasia, atau API key backend yang tertinggal dalam bundle client.
- **HTTP Security Headers**: Konfigurasi deployment wajib mengaktifkan `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, dan `Referrer-Policy: strict-origin-when-cross-origin`.

### 6.3 Standar Aksesibilitas (WCAG 2.2 AA)
- Rasio kontras teks terhadap latar belakang minimal 4.5:1 untuk teks normal dan 3:1 untuk teks besar/komponen UI aktif.
- Seluruh elemen interaktif dapat dioperasikan secara penuh menggunakan tombol keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, `ArrowKeys`, `Escape`).
- Indikator fokus keyboard (*focus visible*) wajib kontras dan tidak boleh dihilangkan (`outline: none` tanpa pengganti dilarang keras).
- Menyediakan *Skip to main content* link di awal dokumen HTML.

---

## 7. Kriteria Penerimaan & Release Gate

Peluncuran ke fase *Production* hanya disetujui jika:
1. Seluruh functional requirements (FR-001 s.d. FR-011) lulus pengujian fungsional.
2. Tidak terdapat data fiktif, logo tanpa izin, atau nomor kontak contoh (*anti-hallucination sign-off*).
3. Pengujian browser berjalan bersih: **Zero Console Errors / Unhandled Rejections** pada Chromium, Firefox, dan WebKit.
4. Lolos audit perintah verifikasi:
   - `npm run lint` (0 error, 0 warning).
   - `tsc --noEmit` (0 type error).
   - `npm test` (seluruh unit test lulus 100%).
   - `npm run build` (build sukses tanpa peringatan).
   - `npm audit` (0 kerentanan tingkat High atau Critical).
