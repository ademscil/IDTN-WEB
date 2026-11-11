# Requirements Specification — Landing Page IDTN

**Status:** Draft for review  
**Owner:** IDTN  
**Scope:** Public single-page corporate landing page  
**Last updated:** 2026-10-12

## 1. Product objective

Membangun landing page yang menjelaskan kapabilitas PT Infinix Delapan Teknologi Nusantara (IDTN) di bidang fiber optic, optical networking, perangkat jaringan telekomunikasi, DWDM, data center interconnection, dan software/network orchestration.

Website harus:
1. Menjelaskan value proposition dengan cepat kepada pengunjung B2B.
2. Membangun kredibilitas tanpa klaim yang tidak terverifikasi.
3. Mengubah pengunjung yang relevan menjadi inquiry proyek.
4. Memberikan pengalaman visual light technical yang rapi dan tidak terasa seperti AI-generated template.
5. Tetap usable pada perangkat rendah daya, keyboard, screen reader, reduced-motion mode, dan ketika JavaScript gagal.

## 2. Reference and authority

- Struktur visual: file Figma IDTN yang diberikan user.
- Referensi storytelling/motion: `https://tkm.co.id`.
- Konten perusahaan: hanya data yang disetujui IDTN.
- Jika Figma, requirement, dan implementasi berbeda, urutan otoritas: requirement yang disetujui > keputusan brand terbaru > Figma > referensi TKM.

## 3. Personas and use cases

### Persona P1 — Network/telecom operator
Mencari partner deployment, optical transport, atau peningkatan kapasitas. Membutuhkan bukti kapabilitas, proses kerja, dan jalur konsultasi.

### Persona P2 — Data center/cloud operator
Mencari konektivitas antar-site yang reliable dan low-latency. Membutuhkan gambaran DCI, integrasi, dan support.

### Persona P3 — Enterprise decision maker
Tidak selalu memahami detail DWDM. Membutuhkan penjelasan yang sederhana, trust signal, dan CTA yang jelas.

### Persona P4 — Technical evaluator
Memvalidasi arsitektur, scope, testing, dan kemampuan delivery. Membutuhkan diagram, terminology yang akurat, dan proses end-to-end.

### Use cases
- Pengunjung memahami positioning IDTN dalam 10 detik pertama.
- Pengunjung membuka detail solusi tanpa kehilangan konteks halaman.
- Pengunjung melihat konsep DWDM melalui visual interaktif.
- Pengunjung mengirim inquiry dengan feedback yang jelas.
- Pengunjung menemukan alamat dan kontak resmi tanpa mencari di footer saja.

## 4. Information architecture

Urutan default halaman:
1. Header/navigation.
2. Hero/value proposition.
3. Company trust strip.
4. About IDTN.
5. Solutions.
6. DWDM technology explorer.
7. Work process.
8. Optional capabilities/projects/coverage.
9. Contact and inquiry form.
10. Footer.

Section optional tidak boleh menampilkan data fiktif. Jika materi tidak tersedia, section diganti dengan capability explanation atau tidak dirender.

## 5. Functional requirements

### FR-001 Navigation and deep linking
**WHEN** user memilih item navigasi **THEN** sistem harus memindahkan fokus dan viewport ke section target dengan offset sticky header yang benar.

- Link harus memakai anchor yang stabil dan unik.
- URL hash boleh diperbarui tanpa reload.
- Navigasi keyboard harus mencakup semua item.
- Mobile menu harus memiliki open, close, Escape, click-outside, focus trap, dan restore focus.
- Menu tidak boleh menutupi konten tanpa cara menutup yang jelas.

### FR-002 Header behavior
- Header default berada pada state `default`.
- Setelah threshold scroll, header berubah ke state `compact`.
- State compact tidak boleh mengubah layout secara mendadak atau menyebabkan CLS.
- Header harus tetap terbaca di atas background terang.
- CTA header harus memiliki target yang sama dengan CTA contact utama.

### FR-003 Hero
- Hero harus memiliki tepat satu H1.
- H1 harus menyampaikan IDTN sebagai penyedia solusi jaringan optik/telekomunikasi.
- Hero harus memiliki supporting copy maksimum dua paragraf pendek.
- Harus tersedia primary CTA untuk konsultasi/inquiry dan secondary CTA menuju solusi.
- Visual hero harus menggambarkan network/fiber optic, bukan ilustrasi abstrak generik.
- Copy dan CTA penting harus tersedia pada server-rendered/static HTML.

### FR-004 Company profile and trust
- Profil singkat harus menyebut bidang usaha yang disetujui.
- Alamat yang tersedia: Jalan Cikini Raya No. 79, Jakarta Pusat, DKI Jakarta 10330, Indonesia.
- Nama legal, logo, contact, tahun berdiri, SLA, kapasitas, jumlah project, dan coverage harus memiliki status data `approved` sebelum dirender sebagai fakta.
- Data `draft`, `placeholder`, atau `unverified` tidak boleh masuk production build.

### FR-005 Solutions catalogue
Minimal empat solution card:
1. Fiber Optic & Optical Networking.
2. Peralatan jaringan untuk operator telekomunikasi.
3. Software manajemen dan otomasi jaringan.
4. Konektivitas data center, cloud, dan enterprise.

Setiap card wajib memiliki ID, nomor/label, judul, ringkasan, detail/value, dan CTA atau affordance yang jelas.

- Hover bukan satu-satunya cara membuka detail.
- Keyboard focus harus memiliki behavior setara hover.
- Mobile boleh menggunakan accordion, dialog, atau inline expansion.
- Membuka satu detail tidak boleh menggeser pengguna secara tidak terduga.

### FR-006 DWDM explorer
- Visual wajib menjelaskan hubungan input channels, MUX, single fiber, DEMUX, dan output channels.
- Desktop boleh menggunakan scroll-driven animation dengan state deterministik.
- Mobile harus menyediakan stepper/tab/button yang dapat dioperasikan tanpa scroll gesture.
- State final harus tetap tampil ketika motion dinonaktifkan atau JavaScript gagal.
- Angka wavelength, bitrate, SLA, dan kapasitas hanya boleh ditampilkan jika disetujui secara teknis.
- Teknologi harus dijelaskan dalam bahasa yang bisa dipahami persona non-teknis, dengan detail teknis progresif.

### FR-007 Work process
Tahapan minimal:
1. Survei dan kebutuhan.
2. Desain arsitektur.
3. Instalasi dan integrasi.
4. Testing dan commissioning.
5. Operasi dan dukungan.

- User dapat membaca semua tahap tanpa animasi.
- Tahap aktif diberi visual state yang membedakan.
- Jika timeline memakai scroll, user tetap bisa memilih tahap langsung.

### FR-008 Optional project/capability content
- Project, client, coverage, dan achievement hanya ditampilkan jika asset dan permission tersedia.
- Tidak boleh mengarang logo client, lokasi, jumlah project, atau case study.
- Empty state harus berupa capability diagram atau section yang dihapus dari build.

### FR-009 Contact information
- Tampilkan alamat yang telah disetujui.
- Telepon, WhatsApp, email, jam kerja, social media, dan map URL harus configurable.
- Contact link harus menggunakan format valid dan aman.
- Tidak boleh ada nomor contoh yang dapat diklik di production.

### FR-010 Inquiry form
Field minimum:
- Nama lengkap, wajib.
- Nama perusahaan, wajib.
- Email kantor, wajib dan valid.
- Nomor telepon/WhatsApp, wajib dan valid sesuai rule yang disepakati.
- Pilihan solusi, wajib.
- Pesan/kebutuhan proyek, wajib dengan batas panjang.
- Consent/privacy notice jika diwajibkan oleh endpoint/policy.

State:
`idle → validating → submitting → success | error`.

- Submit ganda harus dicegah saat submitting.
- Error harus inline per field atau summary yang dapat difokuskan.
- Success harus memiliki confirmation message dan opsi kembali mengisi form.
- Error network/server harus memiliki retry tanpa menghapus input.
- Data form tidak boleh dikirim ke pihak ketiga yang belum disetujui.
- Honeypot/rate limit/anti-spam harus digunakan sesuai kemampuan endpoint.

### FR-011 Footer
- Logo, navigasi, alamat, contact yang approved, dan copyright.
- Social links hanya jika resmi.
- Semua link eksternal menggunakan `rel` yang sesuai jika membuka tab baru.

## 6. Visual and brand requirements

- Light theme adalah keputusan wajib.
- Minimal 70% surface halaman adalah putih/off-white/light blue.
- Navy dominan untuk teks/diagram/footer, bukan background utama.
- Cyan digunakan untuk CTA, active state, focus, status, dan fiber path.
- Tidak boleh ada neon glow, blob gradient generik, emoji sebagai icon, atau dekorasi yang tidak menjelaskan bisnis.
- Grid, spacing, border radius, dan elevation harus tokenized.
- Teks tidak boleh terpotong demi menjaga tinggi card seragam.
- Visual harus memiliki hierarchy antara marketing copy dan technical metadata.

## 7. Motion requirements

- Hero line reveal, section reveal, fiber path draw, solution hover/focus, process progress, dan DWDM interaction adalah motion candidates.
- Motion harus progressive enhancement, bukan dependency untuk memahami konten.
- Gunakan transform/opacity/stroke properties yang aman untuk compositor.
- Tidak ada autoplay audio/video.
- Tidak ada perpetual animation yang mengganggu kecuali marquee yang dapat dihentikan.
- Semua motion harus memiliki reduced-motion branch.
- Mobile menghilangkan custom cursor, tilt, heavy pin, dan hover-only interactions.

## 8. Accessibility requirements

- Semantic landmarks: header, nav, main, section, footer.
- Satu H1, heading order valid, skip link tersedia.
- Semua form control memiliki visible label dan error association.
- Focus indicator kontras dan tidak dihapus.
- Modal/drawer memiliki focus management.
- SVG decorative `aria-hidden`; SVG informative memiliki accessible name/description.
- Status form diumumkan dengan `aria-live`.
- Kontras teks dan control memenuhi WCAG 2.2 AA.
- Target pointer minimum mengikuti standar platform dan tidak terlalu berdekatan.
- Semua fungsi dapat digunakan dengan keyboard.
- `prefers-reduced-motion` wajib diuji.

## 9. SEO, analytics, and sharing

- Title, meta description, canonical, lang, viewport, robots policy, favicon.
- Open Graph title/description/image/url dan Twitter card.
- JSON-LD Organization/LocalBusiness hanya dengan data yang benar-benar disetujui.
- Sitemap/robots pada deployment final.
- Event analytics yang direncanakan: primary CTA, solution interaction, form start, form success, WhatsApp click, email click.
- Analytics tidak boleh berjalan sebelum consent/policy yang diperlukan.
- Jangan mengirim isi pesan inquiry atau PII ke analytics.

## 10. Security and privacy

- Endpoint form menggunakan HTTPS.
- Secret/API key tidak boleh berada di client bundle.
- Validasi dilakukan di client dan server.
- Sanitize output/notifikasi untuk mencegah injection.
- Terapkan rate limit dan anti-spam di server/endpoint.
- Jangan menyimpan PII di localStorage tanpa persetujuan.
- External scripts dibatasi dan ditinjau; gunakan CSP jika hosting memungkinkan.
- Privacy notice/link harus tersedia bila form menyimpan atau meneruskan data.

## 11. Performance and reliability budgets

- LCP target < 2.5s pada mobile test profile.
- CLS < 0.1.
- INP < 200ms sebagai target.
- Lighthouse Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95.
- Hero image/visual memiliki ukuran dan aspect ratio yang ditentukan agar tidak layout shift.
- Non-critical image lazy loaded; hero tidak lazy loaded.
- Hindari loading library yang tidak digunakan.
- Animasi harus fail-safe ke static state.
- Tidak ada uncaught console error pada smoke path.

## 12. Browser and device support

- Latest two major versions Chrome, Edge, Firefox, Safari.
- iOS Safari dan Android Chrome pada viewport mobile umum.
- Desktop keyboard/mouse, touch device, reduced-motion, slow network, dan no-JS smoke test.
- WebGL tidak boleh menjadi dependency utama.

## 13. Content governance

Setiap content item harus memiliki status: `draft`, `review`, `approved`, atau `deprecated`. Hanya `approved` yang boleh dirender production.

Pemilik IDTN wajib menyetujui:
- Nama legal dan positioning.
- Contact details.
- Technical claims.
- Client/project assets.
- Bahasa final.
- Privacy/contact processing.

## 14. Acceptance criteria and release gates

Release hanya boleh dilakukan jika:
- Semua P0 requirements lulus.
- Tidak ada placeholder, fake claim, fake contact, atau asset tanpa permission.
- Semua CTA, anchor, drawer, form, dan external links diuji.
- Keyboard, screen reader basics, contrast, reduced motion, dan mobile lulus.
- Production build, lint/check, dan smoke test lulus.
- Performance budgets diketahui hasilnya dan tidak ada regression kritis.
- Stakeholder menyetujui visual terhadap Figma dan light-theme constraint.
