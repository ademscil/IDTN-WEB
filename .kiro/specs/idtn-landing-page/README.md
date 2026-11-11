# IDTN Landing Page — SDLC Specification Portal
**Standar Spesifikasi:** SDLC Multi-Role Audit Standard v2.0 & Vibe Coding 6-Document Framework  
**Pemilik Proyek:** PT Infinix Delapan Teknologi Nusantara (IDTN)  
**Terakhir Diperbarui:** 2026-11-11  

---

## 1. Ikhtisar Dokumentasi

Spesifikasi perancangan dan implementasi landing page resmi PT Infinix Delapan Teknologi Nusantara (IDTN) disusun dalam **6 Dokumen Standar Vibe Coding** yang terhubung secara sistematis:

| No | Dokumen | Nama & Deskripsi | Otoritas / Referensi Utama |
| :---: | :--- | :--- | :--- |
| **01** | [**01-PRD.md**](./01-PRD.md) | **Product Requirement Documentation**<br>Menentukan tujuan produk, 5 persona pengguna, 12 section arsitektur informasi, 11 kebutuhan fungsional (FR), batasan non-fungsional, dan release gate. | Dokumen Korporat IDTN, Arahan Pak Andik (`tkm.co.id`), T8 DWDM (`t8.ru/en`) |
| **02** | [**02-TRD.md**](./02-TRD.md) | **Technical Requirement Documentation**<br>Arsitektur sistem Vite 6 + React 19 + TypeScript + Tailwind v4 + Swiper/GSAP, integrasi 11 Peran Audit SDLC v2.0, verifikasi MDN, dan panduan anti-AI-slop. | Standar SDLC v2.0, OWASP Top 10, WCAG 2.2 AA |
| **03** | [**03-AFD.md**](./03-AFD.md) | **App Flow Documentation**<br>Diagram perjalanan pengguna (User Journeys), siklus hidup state (Header, Drawer, Slide DWDM, Modal Legalitas), mekanisme swipe/keyboard, dan penanganan edge cases. | Standar UX Interaksi Telekomunikasi |
| **04** | [**04-DBD.md**](./04-DBD.md) | **Design Brief Documentation**<br>Filosofi desain *Light Technical Precision*, design tokens (warna, font Inter & JetBrains Mono, spacing), spesifikasi visual DWDM Explorer, dan kartu sertifikasi. | Desain Industri Bersih & Terang |
| **05** | [**05-BSD.md**](./05-BSD.md) | **Backend Schema Documentation**<br>Arsitektur Decoupled Local JSON CMS (`src/data/*.json`), validasi skema runtime Zod v3, kontrak endpoint `POST /api/inquiries`, anti-spam honeypot, dan privasi PII. | Data Governance & Keamanan Edge |
| **06** | [**06-IPD.md**](./06-IPD.md) | **Implementation Plan Documentation**<br>Rencana kerja bertahap (Fase 1–8), checklist task engineering dengan prioritas P0/P1, matriks ketertelusuran, dan Definition of Done (DoD). | Agile Engineering & QA Gates |

---

## 2. Arsip Spesifikasi Awal (.legacy)
Spesifikasi draf awal yang sebelumnya digunakan telah diarsipkan secara aman di folder [`.legacy/`](./.legacy/):
- [`.legacy/requirements.md`](./.legacy/requirements.md)
- [`.legacy/design.md`](./.legacy/design.md)
- [`.legacy/tasks.md`](./.legacy/tasks.md)

---

## 3. Protokol Verifikasi Mandatori (SDLC Multi-Role v2.0)

Sebelum merilis perubahan ke branch utama (*main*), seluruh verification commands berikut wajib dijalankan dengan hasil **0 error**:

```bash
# 1. Linting & Formatting Check
npm run lint

# 2. Strict Type Invariant Check
npx tsc --noEmit

# 3. Unit Test Suite Execution
npm test -- --coverage

# 4. Production Build Verification
npm run build

# 5. Dependency Vulnerability Security Scan
npm audit --audit-level=high
```

---

## 4. Kebijakan Anti-Halusinasi & Tata Kelola Konten
1. Seluruh data metrik, sertifikat, laporan audit, kontak, dan logo klien wajib berstatus `approved` dalam skema Zod sebelum ditampilkan ke publik.
2. Jika dokumen atau izin resmi masih dalam proses pengurusan oleh manajemen IDTN, komponen wajib menampilkan status badge *Dalam Proses Verifikasi Resmi* atau teks kapabilitas normatif tanpa nomor registrasi fiktif.
