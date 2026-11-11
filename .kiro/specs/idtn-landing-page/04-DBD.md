# Design Brief Documentation (DBD) — IDTN Landing Page
**ID Dokumen:** IDTN-WEB-DBD-004  
**Versi:** 2.0.0 (SDLC Multi-Role Audit Standard)  
**Status:** Approved for Implementation  
**Klasifikasi:** Visual & Design System Specification  
**Arah Desain:** Light Technical Precision & Industrial Elegance  

---

## 1. Design Philosophy & Mood

Desain landing page IDTN mengusung tema **"Light Technical Precision"** — menggabungkan ketelitian rekayasa optik modern dengan wibawa korporat B2B telekomunikasi.

### Pilar Desain:
1. **Light by Default**: Minimal 70% area permukaan menggunakan palet putih, off-white, dan ice blue. Warna gelap (navy) hanya digunakan sebagai aksen teks berbobot, kontainer diagram tertentu, dan penutup footer.
2. **Industrial Clarity (ala T8.ru)**: Menampilkan spesifikasi perangkat, kartu modular, diagram alir DWDM, dan metrik kapasitas jaringan dengan tata letak bersih dan presisi tinggi tanpa ornamen "AI slop" yang berlebihan (dilarang menggunakan blob gradient ungu/pink generik atau neon glow artifisial).
3. **Corporate Credibility (ala TKM.co.id)**: Tata letak sertifikasi ISO, perizinan berusaha, portofolio proyek, dan galeri kerja lapangan dirancang formal, meyakinkan bagi pengambil keputusan dan auditor pengadaan.

---

## 2. Design Tokens System

Semua nilai visual diimplementasikan melalui CSS Custom Properties di `src/styles/tokens.css` dan dikonsumsi oleh Tailwind CSS v4 `@theme`.

```css
:root {
  /* Surface Tokens (Light Dominant) */
  --surface-base: #ffffff;
  --surface-subtle: #f8fafc;        /* Slate 50 */
  --surface-muted: #f1f5f9;         /* Slate 100 */
  --surface-ice-blue: #f0f9ff;      /* Sky 50 */
  --surface-border: #e2e8f0;        /* Slate 200 */
  --surface-border-strong: #cbd5e1; /* Slate 300 */
  
  /* Brand & Telecom Semantic Tokens */
  --brand-primary: #0284c7;         /* Sky 600 - Telecom Cyan Primary */
  --brand-primary-hover: #0369a1;   /* Sky 700 */
  --brand-primary-light: #e0f2fe;   /* Sky 100 */
  --brand-navy: #0f172a;            /* Slate 900 - Tech Dark Accent */
  --brand-navy-surface: #1e293b;    /* Slate 800 - Footer / Panel Surface */
  
  /* Status / Feedback Semantic Tokens */
  --semantic-success: #16a34a;      /* Green 600 */
  --semantic-success-light: #f0fdf4;/* Green 50 */
  --semantic-warning: #d97706;      /* Amber 600 */
  --semantic-danger: #dc2626;       /* Red 600 */
  --semantic-danger-light: #fef2f2; /* Red 50 */

  /* Text & Typography Tokens */
  --text-main: #0f172a;             /* Slate 900 - High Contrast Body */
  --text-secondary: #475569;        /* Slate 600 - Supporting Copy */
  --text-tertiary: #64748b;         /* Slate 500 - Metadata & Captions */
  --text-inverse: #ffffff;          /* White on Dark Surfaces */

  /* Spacing Scale */
  --space-2xs: 0.25rem;  /* 4px */
  --space-xs:  0.5rem;   /* 8px */
  --space-sm:  0.75rem;  /* 12px */
  --space-md:  1rem;     /* 16px */
  --space-lg:  1.5rem;   /* 24px */
  --space-xl:  2rem;     /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */
  --space-4xl: 6rem;     /* 96px */

  /* Radius Tokens */
  --radius-sm: 0.375rem; /* 6px */
  --radius-md: 0.5rem;   /* 8px */
  --radius-lg: 0.75rem;  /* 12px */
  --radius-xl: 1rem;     /* 16px */
  --radius-full: 9999px;

  /* Shadows (Subtle, Clean Elevation) */
  --shadow-card: 0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05);
  --shadow-card-hover: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04);
  --shadow-floating: 0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06);

  /* Focus Ring */
  --focus-ring: 0 0 0 3px rgba(2, 132, 199, 0.35);
}
```

---

## 3. Typography System

Menggunakan kombinasi dua keluarga font berlisensi bebas (Google Fonts / Self-hosted):
1. **Primary UI & Headings**: `Plus Jakarta Sans` atau `Inter` — font sans-serif geometris yang tajam, sangat mudah dibaca (*high legibility*) pada layar resolusi tinggi maupun perangkat mobile.
2. **Technical Specifications & Parameters**: `JetBrains Mono` — font monospace modern untuk frekuensi spektrum optik, panjang gelombang (*wavelength* nm), throughput (*Gbps/Tbps*), dan nomor sertifikat.

### Skala Tipografi:
- **Display / Hero H1**: `clamp(2.25rem, 5vw, 3.75rem)` (36px s.d. 60px), bobot 800 (ExtraBold), line-height 1.1.
- **Section Heading H2**: `clamp(1.75rem, 3.5vw, 2.5rem)` (28px s.d. 40px), bobot 700 (Bold), line-height 1.2.
- **Card Title H3**: `1.25rem` (20px), bobot 600 (SemiBold), line-height 1.4.
- **Body Large**: `1.125rem` (18px), bobot 400, line-height 1.6.
- **Body Regular**: `1.0rem` (16px), bobot 400, line-height 1.5.
- **Technical Label / Eyebrow**: `0.8125rem` (13px), bobot 700, uppercase, letter-spacing `0.05em`, warna `--brand-primary`.

---

## 4. Spesifikasi Desain Komponen Slide Modular (ala T8.ru)

Komponen slide interaktif pada DWDM Explorer dan Portofolio Proyek dirancang menyerupai *slide deck presentasi eksekutif*:

### 4.1 Card Slide Container
- **Latar Belakang**: Putih murni (`#ffffff`) dengan garis tepi halus (`border: 1px solid var(--surface-border)`).
- **Rasio Aspek**: Kartu presentasi proporsional dengan padding lega (`padding: 2rem` di desktop, `1.25rem` di mobile).
- **Header Slide**: Memuat penomoran urut teknis besar bergaya industrial monokrom (contoh: teks `01`, `02` berukuran `2.5rem` dengan warna pudar `text-slate-300`) bersanding dengan judul modul.
- **Komposisi Dua Kolom Desktop**:
  - Kolom Kiri (50%): Deskripsi arsitektur, parameter teknis (C-Band, Wavelength grid 50GHz/100GHz), dan keunggulan.
  - Kolom Kanan (50%): Diagram skematik visual atau foto perangkat berresolusi tinggi dengan efek bayangan presisi.

### 4.2 Bar Navigasi Slide
- **Slide Counter**: `01 / 04` dengan font monospace `JetBrains Mono`, teks kontras tinggi.
- **Tombol Navigasi**: Lingkaran berdiameter `44px` dengan ikon panah tipis `lucide-react` (`ArrowLeft`, `ArrowRight`). Memiliki state hover dengan latar belakang `--surface-ice-blue` dan garis tepi `--brand-primary`.

---

## 5. Visualisasi DWDM Explorer & Transmisi Optik

Komponen DWDM Explorer merepresentasikan prinsip kerja fisika transmisi *multiplexing* optik:
- **Input Channels**: 4 hingga 8 berkas cahaya dengan kode warna spektrum berbeda (Cyan, Biru, Hijau, Amber) yang merepresentasikan kanal panjang gelombang independen (misal: $\lambda_1, \lambda_2, \lambda_3, \dots$).
- **Optical Multiplexer (MUX)**: Modul agregasi yang menyatukan seluruh kanal ke dalam 1 serat optik tunggal (*single core fiber*).
- **Single Core Transmission**: Garis optik dengan animasi denyut cahaya (*traveling light pulse*) teratur menggunakan SVG stroke dasharray.
- **Optical Demultiplexer (DEMUX)**: Modul pengurai di ujung penerima yang memisahkan kembali berkas cahaya ke interface penerima masing-masing tanpa interferensi.

---

## 6. Desain Section Kredibilitas: Legalitas, Sertifikasi & Laporan Audit (ala TKM)

Bagian ini menjadi jangkar kepercayaan korporat telekomunikasi:
- **Kartu Sertifikasi**: Grid 3 atau 4 kolom. Setiap kartu memuat:
  1. Ikon lencana resmi (*Shield Check* / *Award*).
  2. Nama Sertifikasi (ISO 9001:2015, ISO 27001:2022, Izin Penyelenggaraan Jaringan Tetap Tertutup Kominfo, NIB OSS-RBA).
  3. Nomor Registrasi Resmi & Instansi Penerbit.
  4. Status Badge hijau: `Terverifikasi Resmi`.
  5. Tombol Aksi: *"Buka Ringkasan Legalitas"*.
- **Modal Preview Dokumen**:
  - Modal mengambang dengan latar belakang semi-transparan ber-blur (`backdrop-blur-md`).
  - Menampilkan ringkasan cakupan izin/sertifikat, masa berlaku, dan opsi unduh lembar konfirmasi resmi.

---

## 7. Desain Galeri Lapangan & Portofolio Proyek

- **Gallery Aspect Ratio**: Rasio baku `16:9` untuk lanskap pemasangan kabel optik dan `4:3` untuk penataan rak server/ODF.
- **Badge Kategori**: Pill badge kecil di pojok kiri atas foto (misal: `#Splicing`, `#OTDR-Testing`, `#Datacenter-DCI`, `#Sub-rack`).
- **Efek Hover**: Perbesaran halus gambar (*scale 1.03*) dengan transisi durasi `300ms` `cubic-bezier(0.16, 1, 0.3, 1)` tanpa membuat teks di sekitarnya bergeser.

---

## 8. Panduan Motion & Mikro-Interaksi

1. **Durasi Standar**:
   - Transisi hover / focus tombol: `150ms`.
   - Buka/tutup modal & mobile drawer: `250ms`.
   - Transisi antar slide carousel: `400ms`.
2. **Timing Function**: `cubic-bezier(0.16, 1, 0.3, 1)` (efek ease-out modern yang responsif).
3. **Pemberitahuan Aksesibilitas Motion**:
   - Jika `window.matchMedia('(prefers-reduced-motion: reduce)').matches` bernilai `true`, maka seluruh durasi transisi diubah menjadi `0.01ms` dan efek pergerakan lateral dimatikan total.
