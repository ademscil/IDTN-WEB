# Backend Schema Documentation (BSD) — IDTN Landing Page
**ID Dokumen:** IDTN-WEB-BSD-005  
**Versi:** 2.0.0 (SDLC Multi-Role Audit Standard)  
**Status:** Approved for Implementation  
**Klasifikasi:** Data Architecture & API Contract  
**Pola Data:** Decoupled Local JSON CMS + Edge Serverless Form Route  

---

## 1. Data Architecture Overview

Untuk memastikan performa instan (*zero database latency*), biaya operasional minimal, serta ketiadaan kerentanan injeksi SQL, Landing Page IDTN mengadopsi arsitektur data **Decoupled Local JSON CMS**.

```text
┌──────────────────────────────────────────────────────────────┐
│                    Content & Data Sources                    │
│ ┌──────────────────────┐          ┌────────────────────────┐ │
│ │  Local JSON Datasets │          │   Zod Schema Invariant │ │
│ │  (src/data/*.json)   │─────────>│  (Strict Type Checking)│ │
│ └──────────────────────┘          └────────────────────────┘ │
└──────────────────────────────┬───────────────────────────────┘
                               │ Validated Read
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                  Client Application Engine                   │
│   React 19 Components Render Verified Content Automatically  │
└──────────────────────────────┬───────────────────────────────┘
                               │ Submit Inquiry (Write)
                               ▼
┌──────────────────────────────────────────────────────────────┐
│               Edge API Route (/api/inquiries)                │
│ ┌──────────────────────┐          ┌────────────────────────┐ │
│ │ Rate Limiter (5/15m) │─────────>│ Honeypot Sanitizer     │ │
│ └──────────────────────┘          └───────────┬────────────┘ │
│                                               │              │
│ ┌──────────────────────┐          ┌───────────▼────────────┐ │
│ │ Webhook / Resend API │<─────────│ Invariant Verification │ │
│ └──────────────────────┘          └────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

Seluruh berkas data disimpan dalam folder `src/data/`, divalidasi dengan pustaka `zod`, dan dikonsumsi oleh komponen React secara strongly-typed.

---

## 2. Skema Zod & Definisi TypeScript

### 2.1 Skema Profil Perusahaan & Visi-Misi (`company.json`)
```typescript
import { z } from 'zod';

export const CompanyProfileSchema = z.object({
  legalName: z.string().min(3),
  brandName: z.string().default('IDTN'),
  tagline: z.string(),
  description: z.string(),
  establishedYear: z.number().int().min(2000),
  headquarters: z.object({
    address: z.string(),
    city: z.string(),
    province: z.string(),
    postalCode: z.string(),
    country: z.string().default('Indonesia'),
    googleMapsUrl: z.string().url().optional(),
  }),
  contact: z.object({
    officialEmail: z.string().email(),
    supportEmail: z.string().email().optional(),
    phoneOffice: z.string(),
    whatsappHotline: z.string(),
    workingHours: z.string(),
  }),
  vision: z.string(),
  mission: z.array(z.string().min(10)),
  coreValues: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      iconName: z.string(),
    })
  ),
  approvalStatus: z.enum(['draft', 'pending_verification', 'approved']),
});

export type CompanyProfile = z.infer<typeof CompanyProfileSchema>;
```

### 2.2 Skema Legalitas, Sertifikasi & Audit (`compliance.json`)
```typescript
export const ComplianceItemSchema = z.object({
  id: z.string(),
  category: z.enum(['legalitas', 'sertifikasi', 'laporan_audit', 'izin_khusus']),
  title: z.string(),
  issuingBody: z.string(),
  registrationNumber: z.string(),
  validFrom: z.string(),
  validUntil: z.string().nullable(), // null = berlaku seumur hidup / aktif berjalan
  summary: z.string(),
  documentUrl: z.string().optional(),
  badgeLabel: z.string().default('Terverifikasi Resmi'),
  isFeatured: z.boolean().default(true),
  verificationStatus: z.enum(['draft', 'pending_verification', 'approved']),
});

export const ComplianceDatasetSchema = z.array(ComplianceItemSchema);
export type ComplianceItem = z.infer<typeof ComplianceItemSchema>;
```

### 2.3 Skema Katalog Solusi Jaringan Optik (`solutions.json`)
```typescript
export const SolutionItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  orderNumber: z.string(), // contoh: "01", "02"
  title: z.string(),
  subtitle: z.string(),
  shortDescription: z.string(),
  detailedFeatures: z.array(z.string()),
  technicalSpecs: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  iconName: z.string(),
  heroImageUrl: z.string().optional(),
  ctaText: z.string().default('Konsultasi Solusi Ini'),
});

export const SolutionsDatasetSchema = z.array(SolutionItemSchema);
export type SolutionItem = z.infer<typeof SolutionItemSchema>;
```

### 2.4 Skema DWDM Interactive Slide Deck (`dwdm-tech.json`)
```typescript
export const DwdmSlideSchema = z.object({
  stepIndex: z.number().int().min(1).max(4),
  stepCode: z.string(), // "01 / 04"
  title: z.string(),
  category: z.string(),
  summary: z.string(),
  architectureDetail: z.string(),
  opticalParameters: z.object({
    wavelengthBand: z.string(), // "C-Band / L-Band"
    spacing: z.string(),       // "50 GHz / 100 GHz ITU Grid"
    maxCapacity: z.string(),   // "Up to 38.4 Tbps"
    reachDistance: z.string(), // "Long-Haul > 1,500 km"
  }),
  diagramType: z.enum(['mux_aggregation', 'optical_amplifier', 'demux_distribution', 'client_services']),
  svgIllustrationId: z.string(),
});

export const DwdmDatasetSchema = z.array(DwdmSlideSchema);
export type DwdmSlide = z.infer<typeof DwdmSlideSchema>;
```

### 2.5 Skema Portofolio Proyek & Galeri Lapangan (`projects.json` & `gallery.json`)
```typescript
export const ProjectItemSchema = z.object({
  id: z.string(),
  projectName: z.string(),
  clientIndustry: z.string(),
  scopeCategory: z.enum(['DWDM Transport', 'Metro Fiber Loop', 'Data Center Interconnect', 'Turnkey OSP']),
  year: z.number().int(),
  summary: z.string(),
  keyMetrics: z.array(
    z.object({
      metricLabel: z.string(),
      metricValue: z.string(),
    })
  ),
  coverImageUrl: z.string(),
  approvalStatus: z.enum(['draft', 'pending_verification', 'approved']),
});

export const GalleryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(['fusion_splicing', 'otdr_testing', 'rack_installation', 'dci_fiber']),
  location: z.string(),
  imageUrl: z.string(),
  thumbnailUrl: z.string().optional(),
  aspectRatio: z.enum(['16/9', '4/3', '1/1']).default('16/9'),
  altText: z.string().min(10), // Wajib deskriptif untuk aksesibilitas WCAG
});
```

---

## 3. Kontrak API Formulir Inquiry (`POST /api/inquiries`)

### 3.1 Endpoint Specification
- **Method**: `POST`
- **Path**: `/api/inquiries`
- **Content-Type**: `application/json`
- **Authentication**: Public with Anti-Bot & Rate Limit Guard

### 3.2 Request Payload Schema & Validasi Zod
```typescript
export const InquiryRequestSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Nama lengkap minimal 3 karakter')
    .max(100, 'Nama terlalu panjang')
    .regex(/^[a-zA-Z\s.,'-]+$/, 'Nama hanya boleh memuat huruf dan karakter tanda baca standar'),
  companyName: z
    .string()
    .min(2, 'Nama perusahaan wajib diisi')
    .max(100, 'Nama perusahaan terlalu panjang'),
  corporateEmail: z
    .string()
    .email('Alamat email korporat tidak valid')
    .refine((email) => !email.endsWith('@example.com'), {
      message: 'Harap gunakan alamat email aktif perusahaan',
    }),
  phoneNumber: z
    .string()
    .min(10, 'Nomor telepon minimal 10 digit')
    .max(16, 'Nomor telepon maksimal 16 digit')
    .regex(/^\+?[0-9\s-]{10,16}$/, 'Format nomor telepon/WhatsApp tidak valid'),
  solutionTopic: z.enum([
    'dwdm_optical_systems',
    'fiber_infrastructure',
    'datacenter_interconnect',
    'network_orchestration',
    'audit_and_partnership',
    'other',
  ]),
  message: z
    .string()
    .min(10, 'Pesan deskripsi kebutuhan minimal 10 karakter')
    .max(1000, 'Pesan maksimal 1000 karakter'),
  _gotcha: z.string().max(0, 'Spam detected').optional(), // Honeypot Field: wajib kosong
  clientTimestamp: z.number().int(),
});

export type InquiryRequest = z.infer<typeof InquiryRequestSchema>;
```

### 3.3 Response Envelope Contract

#### 200 OK — Sukses
```json
{
  "success": true,
  "inquiryId": "IDTN-INQ-202611-7891",
  "receivedAt": "2026-11-11T13:45:00.000Z",
  "message": "Terima kasih. Permintaan konsultasi Anda telah diterima. Tim teknis IDTN akan menghubungi Anda dalam waktu 1x24 jam kerja."
}
```

#### 400 Bad Request — Gagal Validasi Input
```json
{
  "success": false,
  "errorCode": "VALIDATION_ERROR",
  "message": "Terdapat kesalahan pengisian formulir.",
  "errors": {
    "corporateEmail": "Alamat email korporat tidak valid",
    "phoneNumber": "Nomor telepon minimal 10 digit"
  }
}
```

#### 429 Too Many Requests — Terkena Batas Rate Limit
```json
{
  "success": false,
  "errorCode": "RATE_LIMIT_EXCEEDED",
  "message": "Anda telah mengirim formulir beberapa kali. Harap tunggu 15 menit sebelum mengirim kembali.",
  "retryAfterSeconds": 900
}
```

#### 500 Internal Server Error — Gangguan Jaringan / Server
```json
{
  "success": false,
  "errorCode": "INTERNAL_ERROR",
  "message": "Maaf, terjadi gangguan teknis sementara pada server kami. Silakan hubungi kami via WhatsApp resmi di +62-811-XXXX-XXXX."
}
```

---

## 4. Kebijakan Privasi Data & Anti-Penyimpanan PII

1. **Zero Client PII Storage**: Data pribadi pengunjung (nama, email, nomor HP) tidak boleh disimpan di `localStorage`, `sessionStorage`, atau cookie peramban.
2. **Serverless Logging Sanitization**: Log pada cloud function hanya mencatat `inquiryId`, timestamp, dan `solutionTopic`. Alamat email dan isi pesan tidak boleh dicetak ke log publik guna mematuhi prinsip perlindungan data pribadi (UU PDP).
