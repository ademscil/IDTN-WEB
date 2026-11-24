import React, { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCmsData } from '../../context/CmsDataContext';
import { PhilosophyPillar, EtymologyCard, BusinessPillar, StrategicSegment, CmsSectionValue } from '../../types/cms';

type PageKey = 'home' | 'about' | 'product' | 'client' | 'contact';
type LangKey = 'id' | 'en';

interface PageFormData {
  seo_title_id?: string;
  seo_title_en?: string;
  seo_description_id?: string;
  seo_description_en?: string;
  seo_keywords_id?: string;
  seo_keywords_en?: string;
  hero_data_id?: Record<string, string>;
  hero_data_en?: Record<string, string>;
  sections_data_id?: Record<string, CmsSectionValue>;
  sections_data_en?: Record<string, CmsSectionValue>;
}

export const AdminPagesSeoPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { reloadContent } = useCmsData();

  const [activePage, setActivePage] = useState<PageKey>('home');
  const [activeLang, setActiveLang] = useState<LangKey>('id');
  const [formData, setFormData] = useState<PageFormData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const profileFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch page data
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      setMessage(null);
      try {
        const res = await fetch(`/api/admin/pages.php?page=${activePage}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.page) {
            setFormData(json.page);
          }
        }
      } catch {
        setMessage({ type: 'error', text: 'Gagal memuat data dari server.' });
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [activePage, token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/pages.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          page_key: activePage,
          seo_title_id: formData.seo_title_id || '',
          seo_title_en: formData.seo_title_en || '',
          seo_description_id: formData.seo_description_id || '',
          seo_description_en: formData.seo_description_en || '',
          seo_keywords_id: formData.seo_keywords_id || '',
          seo_keywords_en: formData.seo_keywords_en || '',
          hero_data_id: formData.hero_data_id || {},
          hero_data_en: formData.hero_data_en || {},
          sections_data_id: formData.sections_data_id || {},
          sections_data_en: formData.sections_data_en || {}
        })
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: `Pengaturan halaman '${pageNames[activePage]}' dan SEO berhasil disimpan!` });
        await reloadContent();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menyimpan perubahan.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    } finally {
      setSaving(false);
    }
  };

  const pageNames: Record<PageKey, string> = {
    home: 'Home (Beranda)',
    about: 'About Us (Tentang Kami)',
    product: 'Product & Equipment (Produk)',
    client: 'Client & Partner (Mitra)',
    contact: 'Contact Us (Kontak)'
  };

  // Helper updater
  const updateField = (field: string, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const updateHeroField = (key: string, val: string) => {
    const heroKey = activeLang === 'id' ? 'hero_data_id' : 'hero_data_en';
    setFormData(prev => ({
      ...prev,
      [heroKey]: {
        ...(prev[heroKey] || {}),
        [key]: val
      }
    }));
  };

  const updateSectionField = (key: string, val: CmsSectionValue) => {
    const secKey = activeLang === 'id' ? 'sections_data_id' : 'sections_data_en';
    setFormData(prev => ({
      ...prev,
      [secKey]: {
        ...(prev[secKey] || {}),
        [key]: val
      }
    }));
  };

  // Upload Company Profile direct from About CMS
  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingProfile(true);
    setMessage(null);

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/admin/upload.php', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      const json = await res.json();
      if (res.ok && json.success && json.file) {
        const publicUrl = json.file.url;
        // Update hero_data_id and hero_data_en with this URL
        setFormData(prev => ({
          ...prev,
          hero_data_id: {
            ...(prev.hero_data_id || {}),
            company_profile_url: publicUrl,
            company_profile_label: prev.hero_data_id?.company_profile_label || (file.name.endsWith('.pdf') ? 'Unduh Profil Perusahaan (PDF)' : 'Unduh Profil Perusahaan (PPTX)')
          },
          hero_data_en: {
            ...(prev.hero_data_en || {}),
            company_profile_url: publicUrl,
            company_profile_label: prev.hero_data_en?.company_profile_label || (file.name.endsWith('.pdf') ? 'Download Company Profile (PDF)' : 'Download Company Profile (PPTX)')
          }
        }));
        setMessage({
          type: 'success',
          text: `File '${file.name}' berhasil diunggah dan ditautkan sebagai Company Profile aktif!`
        });
        if (profileFileInputRef.current) profileFileInputRef.current.value = '';
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal mengunggah file Company Profile.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan saat mengunggah.' });
    } finally {
      setUploadingProfile(false);
    }
  };

  const currentHero = ((activeLang === 'id' ? formData.hero_data_id : formData.hero_data_en) || {}) as Record<string, string>;
  const currentSections = ((activeLang === 'id' ? formData.sections_data_id : formData.sections_data_en) || {}) as Record<string, unknown>;

  const secStr = (key: string, fallback: string = ''): string => {
    const v = currentSections[key];
    return typeof v === 'string' ? v : (typeof v === 'number' ? String(v) : fallback);
  };

  // Helpers for structured arrays in About Us
  const philosophyPillars: PhilosophyPillar[] = Array.isArray(currentSections.philosophy_pillars) && currentSections.philosophy_pillars.length > 0
    ? (currentSections.philosophy_pillars as PhilosophyPillar[])
    : [
        { title: 'Bridge', desc: activeLang === 'id' ? 'Menjembatani keunggulan teknologi optik global dengan kebutuhan riil infrastruktur Indonesia.' : 'Bridging global optical excellence with practical Indonesian infrastructure needs.' },
        { title: 'Intermediary', desc: activeLang === 'id' ? 'Menghubungkan prinsipal teknologi, mitra integrator, dan pelanggan secara transparan dan terpercaya.' : 'Connecting technology principals, system integrators, and telco clients transparently.' },
        { title: 'Pathway', desc: activeLang === 'id' ? 'Membuka akses pita lebar agar data dan informasi strategis dapat mengalir bebas tanpa hambatan kapasitas.' : 'Opening high-bandwidth access so strategic data and information flows without bottlenecks.' },
        { title: 'Connector', desc: activeLang === 'id' ? 'Menyatukan simpul jaringan dari pusat kota metropolitan hingga wilayah kepulauan terluar menuju panggung global.' : 'Uniting transport nodes from metropolitan centers to outer archipelagic islands to the global stage.' }
      ];

  const updatePillar = (index: number, field: 'title' | 'desc', val: string) => {
    const updated = [...philosophyPillars];
    updated[index] = { ...updated[index], [field]: val };
    updateSectionField('philosophy_pillars', updated);
  };

  const etymologyCards: EtymologyCard[] = Array.isArray(currentSections.etymology_cards) && currentSections.etymology_cards.length > 0
    ? (currentSections.etymology_cards as EtymologyCard[])
    : [
        { word: 'Infinix', meaning: activeLang === 'id' ? 'Terinspirasi dari \'infinity\': semangat tanpa batas untuk terus berinovasi dan melayani ekosistem digital nasional.' : 'Inspired by "infinity": boundless spirit to continually innovate and empower the nation\'s digital ecosystem.' },
        { word: activeLang === 'id' ? 'Delapan' : 'Delapan (Eight)', meaning: activeLang === 'id' ? 'Angka 8 yang merefleksikan simbol tak terhingga (∞), melambangkan kesinambungan dan ketangguhan yang tiada henti.' : 'The number 8 symbolizes infinity (∞), reflecting uninterrupted continuity, resilience, and growth.' },
        { word: activeLang === 'id' ? 'Teknologi' : 'Teknologi (Technology)', meaning: activeLang === 'id' ? 'Teknologi transmisi telekomunikasi kelas dunia yang dikembangkan dan diadaptasi khusus untuk Indonesia.' : 'World-class optical telecommunications transmission technology adapted specifically for Indonesian topology.' },
        { word: 'Nusantara', meaning: activeLang === 'id' ? 'Berakar kuat di kepulauan Indonesia, menjadi jangkar kebanggaan yang menghubungkan tanah air ke pasar global.' : 'Deeply anchored in the Indonesian archipelago, serving as a proud anchor connecting our nation to global markets.' }
      ];

  const updateEtymology = (index: number, field: 'word' | 'meaning', val: string) => {
    const updated = [...etymologyCards];
    updated[index] = { ...updated[index], [field]: val };
    updateSectionField('etymology_cards', updated);
  };

  const twoPillars: BusinessPillar[] = Array.isArray(currentSections.two_pillars) && currentSections.two_pillars.length > 0
    ? (currentSections.two_pillars as BusinessPillar[])
    : [
        {
          title: 'DWDM Equipment Developer',
          desc: activeLang === 'id' ? 'Mengembangkan dan mengadaptasi perangkat DWDM agar memenuhi regulasi nasional, kondisi geografis Indonesia, dan kebutuhan ekspansi operator.' : 'Developing and adapting DWDM equipment to meet national regulations, Indonesian geographic conditions, and operator expansion needs.',
          points: activeLang === 'id' ? [
            'Adaptasi perangkat sesuai standar SDPPI Kominfo',
            'R&D terintegrasi bersama talenta rekayasa Indonesia',
            'Alih teknologi nyata ke mitra dan operator lokal'
          ] : [
            'Equipment adaptation aligned with SDPPI Kominfo standards',
            'Integrated R&D with top Indonesian engineering talent',
            'Real technology transfer to local operators & partners'
          ]
        },
        {
          title: 'DWDM Infrastructure Service Provider',
          desc: activeLang === 'id' ? 'Merancang, menggelar, menguji, dan memelihara infrastruktur jaringan transmisi optik untuk koridor transportasi dan interkoneksi data center.' : 'Designing, deploying, testing, and maintaining long-haul optical fiber links for transportation corridors and data center interconnects.',
          points: activeLang === 'id' ? [
            'Perencanaan & survei link serat optik jarak jauh',
            'Instalasi, integrasi, dan commissioning end-to-end',
            'Pemantauan performa dan pemeliharaan preventif 24/7'
          ] : [
            'Planning & long-haul optical link route surveys',
            'Turnkey end-to-end installation, integration & commissioning',
            '24/7 proactive link performance monitoring & preventive maintenance'
          ]
        }
      ];

  const updateBusinessPillar = (index: number, field: 'title' | 'desc', val: string) => {
    const updated = [...twoPillars];
    updated[index] = { ...updated[index], [field]: val };
    updateSectionField('two_pillars', updated);
  };

  const updateBusinessPillarPoint = (pillarIndex: number, pointIndex: number, val: string) => {
    const updated = [...twoPillars];
    const newPoints = [...(updated[pillarIndex].points || [])];
    newPoints[pointIndex] = val;
    updated[pillarIndex] = { ...updated[pillarIndex], points: newPoints };
    updateSectionField('two_pillars', updated);
  };

  const missionPoints: string[] = Array.isArray(currentSections.mission_points) && currentSections.mission_points.length > 0
    ? (currentSections.mission_points as string[])
    : (activeLang === 'id' ? [
        'Membangun jalur transmisi data dan informasi berkapasitas tinggi bagi infrastruktur vital nasional (transportasi dan data center).',
        'Mengembangkan dan mengadaptasi teknologi DWDM bersama talenta terbaik Indonesia demi kemandirian teknologi bangsa.',
        'Melakukan alih teknologi dan pengetahuan rekayasa telekomunikasi secara berkelanjutan kepada mitra dan generasi penerus.'
      ] : [
        'Accelerate the deployment of multi-terabit optical fiber networks in transportation and data center sectors.',
        'Deliver carrier-grade reliability with 99.999% SLA and high-speed protection switching.',
        'Foster indigenous technology capability in collaboration with global partners like T8 Systems.'
      ]);

  const updateMissionPoint = (index: number, val: string) => {
    const updated = [...missionPoints];
    updated[index] = val;
    updateSectionField('mission_points', updated);
  };

  // Helpers for Strategic Segments when in client page
  const strategicSegments: StrategicSegment[] = Array.isArray(currentSections.strategic_segments) && currentSections.strategic_segments.length > 0
    ? (currentSections.strategic_segments as StrategicSegment[])
    : [
        {
          id: 'partner-t8',
          name: 'T8 LLC',
          category: 'Global Technology Principal',
          role: activeLang === 'id' ? 'Prinsipal Manufaktur & Riset Perangkat DWDM' : 'DWDM Equipment R&D & Manufacturing Principal',
          description: activeLang === 'id' ? 'Pengembang teknologi sistem transmisi optik DWDM Volga dan pemantauan kabel OTDR Ramenka kelas dunia.' : 'Developer of world-class Volga DWDM optical transport platforms and Ramenka fiber line monitoring systems.',
          status_badge: activeLang === 'id' ? 'Mitra Terverifikasi' : 'Verified Strategic Partner',
          is_partner: true
        },
        {
          id: 'sector-telco',
          name: 'National Telecom Operators',
          category: 'Target Clients',
          role: activeLang === 'id' ? 'Operator Jaringan Telekomunikasi & Seluler' : 'Telecom Network & Mobile Operators',
          description: activeLang === 'id' ? 'Penyediaan perangkat DWDM backbone dan peningkatan kapasitas link transmisi antar-kota di Indonesia.' : 'Backbone DWDM systems deployment and inter-city long-haul optical transmission capacity upgrades across Indonesia.',
          status_badge: activeLang === 'id' ? 'Mitra Terverifikasi' : 'Verified Strategic Partner',
          is_partner: true
        },
        {
          id: 'sector-dci',
          name: 'Hyperscale Cloud & Data Centers',
          category: 'Target Clients',
          role: activeLang === 'id' ? 'Penyedia Fasilitas Pusat Data & Cloud' : 'Data Center & Cloud Infrastructure Providers',
          description: activeLang === 'id' ? 'Interkoneksi antar-data center (DCI) berkecepatan tinggi dengan latensi deterministik terendah.' : 'High-density Data Center Interconnect (DCI) optical platforms with lowest deterministic latency.',
          status_badge: activeLang === 'id' ? 'Mitra Terverifikasi' : 'Verified Strategic Partner',
          is_partner: true
        },
        {
          id: 'sector-transport',
          name: 'National Transportation Authorities',
          category: 'Target Clients',
          role: activeLang === 'id' ? 'Otoritas Transportasi Udara, Kereta Api & Pelabuhan' : 'Aviation, Railway & Port Transportation Authorities',
          description: activeLang === 'id' ? 'Infrastruktur komunikasi optik berkeandalan 99.999% untuk mendukung sistem persinyalan dan operasional vital.' : 'Mission-critical 99.999% optical communication infrastructure supporting vital signaling and operations.',
          status_badge: activeLang === 'id' ? 'Mitra Terverifikasi' : 'Verified Strategic Partner',
          is_partner: true
        }
      ];

  const updateStratSegmentInPage = (index: number, field: keyof StrategicSegment, val: string) => {
    const updated = [...strategicSegments];
    updated[index] = { ...updated[index], [field]: val };
    updateSectionField('strategic_segments', updated);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Manajemen Halaman & SEO (Dual Language)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola judul, teks utama, tombol, serta Meta Title & Keywords SEO untuk setiap halaman dalam Bahasa Indonesia dan English.
          </p>
        </div>
      </div>

      {message && (
        <div
          role="alert"
          className={`p-4 rounded-xl text-sm flex items-start gap-3 border ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-red-50 border-red-300 text-red-800'
          }`}
        >
          <span>{message.type === 'success' ? '✅' : '⚠️'}</span>
          <span>{message.text}</span>
        </div>
      )}

      {/* Modern Web Guidance: Accessible Page Selector Tabs with Underline */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div role="tablist" aria-label="Pilih Halaman Website" className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/50">
          {(Object.keys(pageNames) as PageKey[]).map((key) => {
            const isSelected = activePage === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActivePage(key)}
                className={`relative px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors focus:outline-none ${
                  isSelected
                    ? 'text-sky-600 bg-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {pageNames[key]}
                {isSelected && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-sky-600" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-slate-400">
            <div className="w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Memuat konfigurasi halaman...
          </div>
        ) : (
          <form onSubmit={handleSave} className="p-5 sm:p-7 space-y-7">
            {/* Dual Language Switcher Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pilih Bahasa yang Diedit:</span>
              </div>
              <div role="tablist" aria-label="Pilih Bahasa Konten" className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLang === 'id'}
                  onClick={() => setActiveLang('id')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                    activeLang === 'id'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🇮🇩</span>
                  <span>Bahasa Indonesia</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLang === 'en'}
                  onClick={() => setActiveLang('en')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                    activeLang === 'en'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>
              </div>
            </div>

            {/* Section 1: Search Engine Optimization (SEO) */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-sky-100 text-sky-700 rounded-md text-xs font-bold">SEO</span>
                <h2 className="text-sm font-bold text-slate-900">
                  Search Engine Optimization (Meta Tags) — {activeLang === 'id' ? 'Bahasa Indonesia' : 'English'}
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Pengaturan ini langsung memengaruhi peringkat di Google search, preview judul di tab browser, dan meta deskripsi.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Meta Title (Judul Tab Browser & Google)
                </label>
                <input
                  type="text"
                  required
                  value={activeLang === 'id' ? (formData.seo_title_id || '') : (formData.seo_title_en || '')}
                  onChange={(e) => updateField(activeLang === 'id' ? 'seo_title_id' : 'seo_title_en', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="Contoh: IDTN — Solusi Infrastruktur DWDM Indonesia"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Meta Description (Ringkasan Cuplikan Hasil Pencarian Google)
                </label>
                <textarea
                  rows={2}
                  required
                  value={activeLang === 'id' ? (formData.seo_description_id || '') : (formData.seo_description_en || '')}
                  onChange={(e) => updateField(activeLang === 'id' ? 'seo_description_id' : 'seo_description_en', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="Tulis deskripsi 1-2 kalimat (sekitar 150-160 karakter) yang menarik minat klik..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Meta Keywords (Kata Kunci Utama untuk Pencarian & DWDM)
                </label>
                <input
                  type="text"
                  value={activeLang === 'id' ? (formData.seo_keywords_id || '') : (formData.seo_keywords_en || '')}
                  onChange={(e) => updateField(activeLang === 'id' ? 'seo_keywords_id' : 'seo_keywords_en', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="Pisahkan dengan koma: dwdm, transmisi optik, t8 systems, infrastruktur telekomunikasi..."
                />
              </div>
            </div>

            {/* Section 2: Hero Section & Headlines */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>🎯</span>
                <span>Teks Header Utama (Hero Section) — {activeLang === 'id' ? 'Bahasa Indonesia' : 'English'}</span>
              </h2>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Badge Pill / Kategori Atas
                </label>
                <input
                  type="text"
                  value={currentHero.badge || currentHero.tag || ''}
                  onChange={(e) => updateHeroField(activePage === 'home' ? 'badge' : 'tag', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="Badge kecil di atas judul..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Headline Utama (H1)
                </label>
                <input
                  type="text"
                  required
                  value={currentHero.headline || currentHero.title || ''}
                  onChange={(e) => updateHeroField(activePage === 'home' ? 'headline' : 'title', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="Judul besar utama..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Subheadline / Deskripsi Penjelas
                </label>
                <textarea
                  rows={3}
                  value={currentHero.subtitle || ''}
                  onChange={(e) => updateHeroField('subtitle', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="Paragraf penjelasan di bawah judul utama..."
                />
              </div>

              {activePage === 'home' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Teks Tombol CTA Utama
                    </label>
                    <input
                      type="text"
                      value={currentHero.cta_primary || ''}
                      onChange={(e) => updateHeroField('cta_primary', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="Konsultasi Proyek"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Teks Tombol CTA Kedua
                    </label>
                    <input
                      type="text"
                      value={currentHero.cta_secondary || ''}
                      onChange={(e) => updateHeroField('cta_secondary', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="Lihat Katalog Produk"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Page Specific Sections */}
            {activePage === 'home' && (
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Banner CTA Bagian Bawah (Bottom CTA Banner)
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Badge Banner Bawah
                    </label>
                    <input
                      type="text"
                      value={secStr('bottom_cta_badge')}
                      onChange={(e) => updateSectionField('bottom_cta_badge', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Judul Banner Bawah
                    </label>
                    <input
                      type="text"
                      value={secStr('bottom_cta_title')}
                      onChange={(e) => updateSectionField('bottom_cta_title', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Deskripsi Banner Bawah
                    </label>
                    <textarea
                      rows={2}
                      value={secStr('bottom_cta_desc')}
                      onChange={(e) => updateSectionField('bottom_cta_desc', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activePage === 'about' && (
              <div className="space-y-6">
                {/* 1. Company Profile Download Configuration */}
                <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50/50 p-5 rounded-2xl border border-sky-200 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-sky-600 text-white rounded-lg text-xs font-bold">📄</span>
                      <h3 className="text-sm font-bold text-slate-900">
                        1. Tautan & Berkas Unduh Company Profile ({activeLang === 'id' ? 'Bahasa Indonesia' : 'English'})
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">
                    File presentasi atau dokumen profil resmi IDTN yang diunduh pengunjung saat mengklik tombol di bawah header halaman <code>/about</code>.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        URL File Company Profile (PPTX / PDF)
                      </label>
                      <input
                        type="text"
                        value={currentHero.company_profile_url || ''}
                        onChange={(e) => updateHeroField('company_profile_url', e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        placeholder="/assets/docs/IDTN-Company-Profile-2026.pptx atau /uploads/..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Teks Tombol Unduh
                      </label>
                      <input
                        type="text"
                        value={currentHero.company_profile_label || ''}
                        onChange={(e) => updateHeroField('company_profile_label', e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        placeholder={activeLang === 'id' ? 'Unduh Profil Perusahaan (PPTX)' : 'Download Company Profile (PPTX)'}
                      />
                    </div>
                  </div>

                  {/* Direct File Uploader for Company Profile */}
                  <div className="bg-white p-3.5 rounded-xl border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-slate-600">
                      <span>Unggah file Company Profile baru langsung dari komputer:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        ref={profileFileInputRef}
                        type="file"
                        accept=".pptx,.pdf"
                        onChange={handleProfileUpload}
                        disabled={uploadingProfile}
                        className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                      />
                      {uploadingProfile && (
                        <span className="text-xs font-semibold text-sky-600 animate-pulse">Mengunggah...</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Intro Sub-badge & Description Banner */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold">🏷️</span>
                    <h3 className="text-sm font-bold text-slate-900">
                      2. Banner Pengantar Sub-Badge & Lead Deskripsi ({activeLang === 'id' ? 'Bahasa Indonesia' : 'English'})
                    </h3>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Sub-Badge / Pill Title
                    </label>
                    <input
                      type="text"
                      value={secStr('intro_lead')}
                      onChange={(e) => updateSectionField('intro_lead', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="FULL-CYCLE DWDM OPTICAL NETWORK INTEGRATION PROVIDER"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Deskripsi Pengantar Utama
                    </label>
                    <textarea
                      rows={3}
                      value={secStr('intro_desc')}
                      onChange={(e) => updateSectionField('intro_desc', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 leading-relaxed focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="PT Infinix Delapan Teknologi Nusantara (IDTN) adalah pengembang..."
                    />
                  </div>
                </div>

                {/* 3. 3-Column Metric Blocks (8,514.22 km, 800 Gbps, R&D & Training) */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold">📊</span>
                    <h3 className="text-sm font-bold text-slate-900">
                      3. Blok 3 Kolom Metrik Strategis ({activeLang === 'id' ? 'Bahasa Indonesia' : 'English'})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Ubah angka, satuan, judul, dan deskripsi untuk 3 kolom metrik khas IDTN (t8-style).
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    {/* Metric 1 */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                      <span className="text-xs font-bold text-indigo-700 block border-b pb-1">Kolom 1 (Jangkauan Jaringan)</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-slate-500">Angka / Nilai</label>
                          <input
                            type="text"
                            value={secStr('metric1_val', activeLang === 'id' ? '8.514,22' : '8,514.22')}
                            onChange={(e) => updateSectionField('metric1_val', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-slate-500">Satuan</label>
                          <input
                            type="text"
                            value={secStr('metric1_unit', 'km')}
                            onChange={(e) => updateSectionField('metric1_unit', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-semibold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Judul Metrik</label>
                        <input
                          type="text"
                          value={secStr('metric1_title')}
                          onChange={(e) => updateSectionField('metric1_title', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Deskripsi</label>
                        <textarea
                          rows={2}
                          value={secStr('metric1_desc')}
                          onChange={(e) => updateSectionField('metric1_desc', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                      <span className="text-xs font-bold text-indigo-700 block border-b pb-1">Kolom 2 (Kapasitas Optik)</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-slate-500">Angka / Nilai</label>
                          <input
                            type="text"
                            value={secStr('metric2_val', '800')}
                            onChange={(e) => updateSectionField('metric2_val', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-slate-500">Satuan</label>
                          <input
                            type="text"
                            value={secStr('metric2_unit', 'Gbps')}
                            onChange={(e) => updateSectionField('metric2_unit', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-semibold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Judul Metrik</label>
                        <input
                          type="text"
                          value={secStr('metric2_title')}
                          onChange={(e) => updateSectionField('metric2_title', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Deskripsi</label>
                        <textarea
                          rows={2}
                          value={secStr('metric2_desc')}
                          onChange={(e) => updateSectionField('metric2_desc', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                      <span className="text-xs font-bold text-rose-700 block border-b pb-1">Kolom 3 (R&D & Alih Teknologi)</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-slate-500">Teks Nilai</label>
                          <input
                            type="text"
                            value={secStr('metric3_val', activeLang === 'id' ? 'R&D & Pelatihan' : 'R&D & Training')}
                            onChange={(e) => updateSectionField('metric3_val', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-bold text-rose-700"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-slate-500">Satuan (Opsional)</label>
                          <input
                            type="text"
                            value={secStr('metric3_unit')}
                            onChange={(e) => updateSectionField('metric3_unit', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-semibold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Judul Metrik</label>
                        <input
                          type="text"
                          value={secStr('metric3_title')}
                          onChange={(e) => updateSectionField('metric3_title', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Deskripsi</label>
                        <textarea
                          rows={2}
                          value={secStr('metric3_desc')}
                          onChange={(e) => updateSectionField('metric3_desc', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Corporate Philosophy (Blok Hitam) */}
                <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-sky-500 text-slate-900 rounded-lg text-xs font-bold">✨</span>
                    <h3 className="text-sm font-bold text-white">
                      4. Filosofi Perusahaan (Corporate Philosophy - Blok Hitam) ({activeLang === 'id' ? 'Bahasa Indonesia' : 'English'})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-sky-300 mb-1">
                        Tag / Kategori Filosofi
                      </label>
                      <input
                        type="text"
                        value={secStr('philo_tag')}
                        onChange={(e) => updateSectionField('philo_tag', e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
                        placeholder="FILOSOFI PERUSAHAAN"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-sky-300 mb-1">
                        Headline Quote Filosofi
                      </label>
                      <input
                        type="text"
                        value={secStr('philo_headline')}
                        onChange={(e) => updateSectionField('philo_headline', e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white font-semibold focus:ring-2 focus:ring-sky-400 focus:outline-none"
                        placeholder="Bagaikan sungai yang bermuara ke lautan..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Subheadline Penjelas
                    </label>
                    <textarea
                      rows={2}
                      value={secStr('philo_subheadline')}
                      onChange={(e) => updateSectionField('philo_subheadline', e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 leading-relaxed focus:ring-2 focus:ring-sky-400 focus:outline-none"
                      placeholder="Sebagaimana sungai-sungai yang bermuara di lautan..."
                    />
                  </div>

                  {/* 4 Philosophy Pillars */}
                  <div className="pt-2">
                    <span className="text-xs font-bold text-sky-300 block mb-2">4 Pilar Filosofi (Bridge, Intermediary, Pathway, Connector):</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {philosophyPillars.map((p, idx) => (
                        <div key={idx} className="bg-slate-800/90 p-3 rounded-xl border border-slate-700/80 space-y-1.5">
                          <label className="block text-[10px] font-semibold uppercase text-sky-300">Pilar #{idx + 1} Judul</label>
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => updatePillar(idx, 'title', e.target.value)}
                            className="w-full px-2.5 py-1 bg-slate-700 border border-slate-600 rounded text-xs text-white font-bold"
                          />
                          <label className="block text-[10px] font-semibold uppercase text-slate-400">Deskripsi</label>
                          <textarea
                            rows={2}
                            value={p.desc}
                            onChange={(e) => updatePillar(idx, 'desc', e.target.value)}
                            className="w-full px-2.5 py-1 bg-slate-700 border border-slate-600 rounded text-xs text-slate-200"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. The Meaning Behind IDTN (4 Etymology Cards) */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold">🔤</span>
                    <h3 className="text-sm font-bold text-slate-900">
                      5. Makna di Balik Nama IDTN (4 Kartu Terstruktur) ({activeLang === 'id' ? 'Bahasa Indonesia' : 'English'})
                    </h3>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Judul Bagian Etimologi
                    </label>
                    <input
                      type="text"
                      value={secStr('etymology_title')}
                      onChange={(e) => updateSectionField('etymology_title', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="Makna di Balik Nama IDTN / The Meaning Behind IDTN"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {etymologyCards.map((card, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#9f1b32]">Kartu #{idx + 1}</span>
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-slate-500">Kata / Unsur Nama</label>
                          <input
                            type="text"
                            value={card.word}
                            onChange={(e) => updateEtymology(idx, 'word', e.target.value)}
                            className="w-full px-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs font-bold text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-slate-500">Uraian Makna</label>
                          <textarea
                            rows={3}
                            value={card.meaning}
                            onChange={(e) => updateEtymology(idx, 'meaning', e.target.value)}
                            className="w-full px-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-700 leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Strategic Business Focus (Two Pillars) */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-[#9f1b32] text-white rounded-lg text-xs font-bold">🏛️</span>
                    <h3 className="text-sm font-bold text-slate-900">
                      6. Fokus Bisnis Strategis (Two Business Pillars) ({activeLang === 'id' ? 'Bahasa Indonesia' : 'English'})
                    </h3>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Judul Bagian Fokus Bisnis
                    </label>
                    <input
                      type="text"
                      value={secStr('focus_title')}
                      onChange={(e) => updateSectionField('focus_title', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="FOKUS BISNIS STRATEGIS / STRATEGIC BUSINESS FOCUS"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {twoPillars.map((p, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
                        <span className="text-xs font-mono font-bold text-sky-700 block border-b pb-1">Pilar 0{idx + 1}</span>
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-slate-500">Judul Pilar</label>
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => updateBusinessPillar(idx, 'title', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-bold text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-slate-500">Deskripsi</label>
                          <textarea
                            rows={2}
                            value={p.desc}
                            onChange={(e) => updateBusinessPillar(idx, 'desc', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-700 leading-relaxed"
                          />
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <label className="block text-[10px] font-semibold uppercase text-slate-500">3 Poin Keunggulan Utama</label>
                          {(p.points || ['', '', '']).slice(0, 3).map((pt, ptIdx) => (
                            <input
                              key={ptIdx}
                              type="text"
                              value={pt}
                              onChange={(e) => updateBusinessPillarPoint(idx, ptIdx, e.target.value)}
                              className="w-full px-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800"
                              placeholder={`Poin ${ptIdx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. IDTN Vision & Mission */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold">🎯</span>
                    <h3 className="text-sm font-bold text-slate-900">
                      7. Visi & Misi Strategis IDTN ({activeLang === 'id' ? 'Bahasa Indonesia' : 'English'})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Vision */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                      <span className="text-xs font-bold text-sky-700 block border-b pb-1">Visi Perusahaan</span>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Judul Kartu Visi</label>
                        <input
                          type="text"
                          value={secStr('vision_title')}
                          onChange={(e) => updateSectionField('vision_title', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-bold text-slate-900"
                          placeholder="Visi Kami / Our Vision"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Pernyataan Visi</label>
                        <textarea
                          rows={4}
                          value={secStr('vision_statement')}
                          onChange={(e) => updateSectionField('vision_statement', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-700 leading-relaxed italic"
                          placeholder="Menjadi arus utama yang menyatukan Nusantara dengan dunia..."
                        />
                      </div>
                    </div>

                    {/* Mission */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                      <span className="text-xs font-bold text-slate-800 block border-b pb-1">Misi Strategis</span>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Judul Kartu Misi</label>
                        <input
                          type="text"
                          value={secStr('mission_title')}
                          onChange={(e) => updateSectionField('mission_title', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-bold text-slate-900"
                          placeholder="Misi Strategis / Strategic Mission"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">3 Butir Misi Perusahaan</label>
                        {missionPoints.slice(0, 3).map((m, mIdx) => (
                          <textarea
                            key={mIdx}
                            rows={2}
                            value={m}
                            onChange={(e) => updateMissionPoint(mIdx, e.target.value)}
                            className="w-full px-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800"
                            placeholder={`Butir Misi ${mIdx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Strategic Segments in Client Page */}
            {activePage === 'client' && (
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-sky-600 text-white rounded-lg text-xs font-bold">🏢</span>
                  <h3 className="text-sm font-bold text-slate-900">
                    Segmen Industri Strategis ({activeLang === 'id' ? 'Bahasa Indonesia' : 'English'})
                  </h3>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Judul Bagian Segmen Industri
                  </label>
                  <input
                    type="text"
                    value={secStr('section_title')}
                    onChange={(e) => updateSectionField('section_title', e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    placeholder="Segmen Industri Strategis / Strategic Industry Segments"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {strategicSegments.map((seg, idx) => (
                    <div key={seg.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between border-b pb-1">
                        <span className="text-xs font-bold text-sky-700">Kartu #{idx + 1} ({seg.id})</span>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Kategori Tag</label>
                        <input
                          type="text"
                          value={seg.category}
                          onChange={(e) => updateStratSegmentInPage(idx, 'category', e.target.value)}
                          className="w-full px-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Nama Entitas</label>
                        <input
                          type="text"
                          value={seg.name}
                          onChange={(e) => updateStratSegmentInPage(idx, 'name', e.target.value)}
                          className="w-full px-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Peran / Role</label>
                        <input
                          type="text"
                          value={seg.role}
                          onChange={(e) => updateStratSegmentInPage(idx, 'role', e.target.value)}
                          className="w-full px-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Deskripsi</label>
                        <textarea
                          rows={3}
                          value={seg.description}
                          onChange={(e) => updateStratSegmentInPage(idx, 'description', e.target.value)}
                          className="w-full px-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-700 leading-relaxed"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-slate-500">Badge Status</label>
                        <input
                          type="text"
                          value={seg.status_badge || ''}
                          onChange={(e) => updateStratSegmentInPage(idx, 'status_badge', e.target.value)}
                          className="w-full px-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePage === 'contact' && (
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Label Jam Layanan Operasional Kantor
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Label Jam Operasional
                    </label>
                    <input
                      type="text"
                      value={secStr('hours_label')}
                      onChange={(e) => updateSectionField('hours_label', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Nilai Jam Operasional
                    </label>
                    <input
                      type="text"
                      value={secStr('hours_val')}
                      onChange={(e) => updateSectionField('hours_val', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-semibold shadow-xs disabled:opacity-50 transition-colors"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <span>💾 Simpan Pengaturan {pageNames[activePage]}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
