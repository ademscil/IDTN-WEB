import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCmsData } from '../../context/CmsDataContext';

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
  sections_data_id?: Record<string, string>;
  sections_data_en?: Record<string, string>;
}

export const AdminPagesSeoPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { reloadContent } = useCmsData();

  const [activePage, setActivePage] = useState<PageKey>('home');
  const [activeLang, setActiveLang] = useState<LangKey>('id');
  const [formData, setFormData] = useState<PageFormData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const updateSectionField = (key: string, val: string) => {
    const secKey = activeLang === 'id' ? 'sections_data_id' : 'sections_data_en';
    setFormData(prev => ({
      ...prev,
      [secKey]: {
        ...(prev[secKey] || {}),
        [key]: val
      }
    }));
  };

  const currentHero = (activeLang === 'id' ? formData.hero_data_id : formData.hero_data_en) || {};
  const currentSections = (activeLang === 'id' ? formData.sections_data_id : formData.sections_data_en) || {};

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
                      value={currentSections.bottom_cta_badge || ''}
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
                      value={currentSections.bottom_cta_title || ''}
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
                      value={currentSections.bottom_cta_desc || ''}
                      onChange={(e) => updateSectionField('bottom_cta_desc', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activePage === 'about' && (
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Bagian Etimologi & Makna Nama IDTN
                </h3>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Judul Etimologi
                  </label>
                  <input
                    type="text"
                    value={currentSections.etymology_title || ''}
                    onChange={(e) => updateSectionField('etymology_title', e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Uraian Makna Infinix Delapan Teknologi Nusantara
                  </label>
                  <textarea
                    rows={3}
                    value={currentSections.etymology_desc || ''}
                    onChange={(e) => updateSectionField('etymology_desc', e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
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
                      value={currentSections.hours_label || ''}
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
                      value={currentSections.hours_val || ''}
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
