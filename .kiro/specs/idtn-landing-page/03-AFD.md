# App Flow Documentation (AFD) — IDTN Landing Page
**ID Dokumen:** IDTN-WEB-AFD-003  
**Versi:** 2.0.0 (SDLC Multi-Role Audit Standard)  
**Status:** Approved for Implementation  
**Klasifikasi:** Interaction & State Architecture  

---

## 1. Overview & Flow Principles

Dokumen ini memetakan seluruh interaksi pengguna (*user journeys*), siklus hidup *state*, transisi antar section, serta mekanisme penanganan kegagalan (*edge cases*) pada landing page IDTN.

Prinsip Utama Alur Interaksi:
1. **Zero Friction Navigation**: Pengunjung dapat berpindah ke informasi inti tanpa harus melewati rintangan interaksi yang rumit.
2. **Deterministic State Transition**: Setiap animasi dan transisi slide memiliki *state* yang dapat diprediksi secara matematis.
3. **Graceful Error Recovery**: Setiap kegagalan jaringan atau input yang salah memberikan panduan perbaikan yang jelas tanpa menghapus isian pengguna.

---

## 2. User Journey Maps

```mermaid
journey
    title Perjalanan Calon Klien B2B Telekomunikasi di Landing Page IDTN
    section Discovery
      Buka URL Landing Page: 5: Pengunjung
      Melihat Hero & Value Proposition (10 detik): 5: Pengunjung
      Mengecek Trust Metrics Strip: 4: Pengunjung
    section Evaluation
      Membaca Visi Misi & Profil (ala TKM): 4: Pengunjung
      Eksplorasi Katalog Solusi: 5: Pengunjung
      Menelusuri Slide Interaktif DWDM (ala T8): 5: Pengunjung
    section Verification
      Melihat Sertifikasi ISO & Laporan Audit: 5: Pengunjung
      Mengecek Portofolio Proyek & Foto Lapangan: 4: Pengunjung
      Melihat Daftar Klien & Mitra Operator: 5: Pengunjung
    section Conversion
      Mengisi Formulir Permintaan Penawaran / RFP: 5: Pengunjung
      Menerima Konfirmasi & Nomor Referensi: 5: Pengunjung
```

---

## 3. State Transition Diagrams

### 3.1 Siklus Hidup Header Sticky
```mermaid
stateDiagram-v2
    [*] --> TopDefault: Pengunjung di posisi paling atas (ScrollY = 0)
    TopDefault --> ScrolledCompact: ScrollY > 60px
    ScrolledCompact --> TopDefault: ScrollY <= 60px
    TopDefault --> MobileMenuOpen: Klik Hamburger (Viewport < 1024px)
    ScrolledCompact --> MobileMenuOpen: Klik Hamburger (Viewport < 1024px)
    MobileMenuOpen --> TopDefault: Tutup Menu / Tekan Escape
    MobileMenuOpen --> ScrolledCompact: Klik Tautan Navigasi (Auto Scroll)
```

### 3.2 Siklus Slide Interaktif DWDM & Peralatan (ala T8.ru)
```mermaid
stateDiagram-v2
    [*] --> Slide1_MUX: Initial Load (State: 01 / 04)
    Slide1_MUX --> Slide2_Amplifier: Klik Next / Geser Kiri / Panah Kanan
    Slide2_Amplifier --> Slide3_DEMUX: Klik Next / Geser Kiri / Panah Kanan
    Slide3_DEMUX --> Slide4_Services: Klik Next / Geser Kiri / Panah Kanan
    Slide4_Services --> Slide1_MUX: Klik Next (Loop Carousel)
    
    Slide4_Services --> Slide3_DEMUX: Klik Prev / Geser Kanan / Panah Kiri
    Slide3_DEMUX --> Slide2_Amplifier: Klik Prev / Geser Kanan / Panah Kiri
    Slide2_Amplifier --> Slide1_MUX: Klik Prev / Geser Kanan / Panah Kiri

    note right of Slide1_MUX
      Reduced Motion Mode:
      Animasi slide dilewati,
      langsung render state konten.
    end note
```

### 3.3 Siklus Hidup Formulir Inquiry B2B
```mermaid
stateDiagram-v2
    [*] --> Idle: Formulir Siap Diisi
    Idle --> Typing: Pengguna Memasukkan Data
    Typing --> ClientValidating: Pengguna Klik "Kirim Permintaan"
    
    ClientValidating --> FieldError: Validasi Gagal (Email salah, field kosong)
    FieldError --> Typing: Pengguna Memperbaiki Input (Preserve state)
    
    ClientValidating --> Submitting: Validasi Lolos (Lock tombol, anti-double click)
    
    Submitting --> SuccessModal: Respon API 200 OK (Tampilkan ID Referensi)
    Submitting --> NetworkError: Respon API 5xx / Gagal Jaringan (Tampilkan tombol coba lagi)
    Submitting --> RateLimited: Respon API 429 Too Many Requests
    
    SuccessModal --> Idle: Pengguna Klik "Kirim Pesan Lain"
    NetworkError --> Submitting: Pengguna Klik "Coba Kirim Ulang" (Data tetap ada)
```

---

## 4. Mekanisme Detail Interaksi Slide ala T8.ru

Section DWDM Explorer dan Portofolio Proyek mengadopsi pola *PowerPoint-like Slide Deck* dengan rincian teknis sebagai berikut:

### 4.1 Kontrol Navigasi
1. **Tombol Navigasi Visual**: Tombol panah kiri (*Previous*) dan kanan (*Next*) berukuran `44x44px` (memenuhi standar target sentuh WCAG 2.2).
2. **Indikator Progres Numerik**: Menampilkan penomoran dinamis dalam format `XX / Total` (contoh: `01 / 04`, `02 / 04`) yang berubah secara sinkron dengan perpindahan slide.
3. **Gesture Sentuh (Touch / Swipe)**:
   - Threshold sapuan: `50px` jarak minimum usapan horizontal.
   - Deteksi kecepatan: Usapan cepat (*flick*) berpindah 1 slide terdekat.
   - Hambatan vertikal: Sapuan diagonal tidak menghambat scroll vertikal halaman (menggunakan CSS `touch-action: pan-y`).
4. **Navigasi Keyboard**:
   - Saat container slide mendapatkan fokus (`:focus-within`), tombol panah kiri (`ArrowLeft`) memicu slide sebelumnya dan panah kanan (`ArrowRight`) memicu slide berikutnya.
   - Tombol `Home` kembali ke slide 1, tombol `End` lompat ke slide terakhir.

### 4.2 Accessibility & Fallback
- Setiap kartu slide memiliki atribut `aria-roledescription="slide"` dan `aria-label="Slide X dari Total"`.
- Jika JavaScript gagal dimuat, container slide bertransisi otomatis ke layout flex vertikal (*stacked list*) sehingga seluruh konten tetap dapat dibaca secara utuh.

---

## 5. Alur Modal Sertifikasi & Laporan Audit (ala TKM)

1. **Pemicu (Trigger)**: Pengguna mengklik tombol "Lihat Dokumen Legalitas" atau "Ringkasan Audit" pada kartu sertifikat.
2. **Aktivasi Modal**:
   - Scrollbar halaman utama dikunci (`overflow: hidden` pada `<body>`).
   - Fokus keyboard langsung dipindahkan ke judul modal (`aria-labelledby`).
   - *Focus Trap* aktif di dalam modal (menekan `Tab` berulang hanya berpindah di antara elemen interaktif di dalam modal).
3. **Penutupan Modal**:
   - Menekan tombol `Escape`.
   - Mengklik tombol silang penutup (`aria-label="Tutup jendela"`).
   - Mengklik area *backdrop* luar modal.
   - Saat tertutup, fokus keyboard dikembalikan ke tombol pemicu semula (*restore focus*).

---

## 6. Penanganan Edge Cases & Failure Recovery

| Skenario Kegagalan | Dampak | Mekanisme Mitigasi & Pemulihan |
| :--- | :--- | :--- |
| **Koneksi Terputus (Offline)** | Formulir tidak dapat dikirim | Banner info offline muncul di bagian atas formulir; isian pengguna tetap tersimpan di memori; tombol submit menampilkan pesan "Menunggu koneksi internet...". |
| **Jaringan Sangat Lambat (Slow 3G)** | Aset gambar galeri lambat tampil | Menampilkan *blur-up placeholder* atau skeleton loading dengan rasio dimensi tetap (`aspect-ratio: 16/9`) untuk mencegah layout shifting (CLS). |
| **JavaScript Dimatikan / Gagal** | Animasi dan slider tidak berfungsi | CSS Native Fallback: Slider berubah menjadi layout grid statis; tombol CTA telepon/email langsung membuka URI protokol native (`tel:+6221...` dan `mailto:...`). |
| **Submission Spam oleh Bot** | Beban server & inbox spam | Field honeypot `_gotcha` yang tersembunyi secara visual. Jika field ini terisi saat form disubmit, respon sukses palsu diberikan tanpa memproses payload ke backend (*silent drop*). |
| **Pengguna Mengklik Submit Berkali-kali** | Duplikasi tiket inquiry | State tombol submit langsung berubah menjadi disabled dengan animasi spinner seketika pada klik pertama. |
