import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCmsData } from '../../context/CmsDataContext';

type LangKey = 'id' | 'en';

interface FooterFormData {
  company_summary_id?: string;
  company_summary_en?: string;
  philosophy_quote_id?: string;
  philosophy_quote_en?: string;
  address_id?: string;
  address_en?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  linkedin_url?: string;
  sdppi_status_id?: string;
  sdppi_status_en?: string;
  copyright_id?: string;
  copyright_en?: string;
}

export const AdminFooterPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { reloadContent } = useCmsData();

  const [activeLang, setActiveLang] = useState<LangKey>('id');
  const [formData, setFormData] = useState<FooterFormData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/footer.php', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.footer) {
            setFormData(json.footer);
          }
        }
      } catch {
        setMessage({ type: 'error', text: 'Gagal memuat pengaturan footer.' });
      } finally {
        setLoading(false);
      }
    };

    fetchFooter();
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/footer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'Pengaturan footer berhasil disimpan dan disinkronisasi!' });
        await reloadContent();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menyimpan pengaturan footer.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Pengaturan Footer (Dual Language)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Kelola ringkasan profil perusahaan di footer, kutipan filosofi IDTN, teks hak cipta, kepatuhan SDPPI & OSS, serta detail kontak resmi.
        </p>
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

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-400">
            <div className="w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Memuat data footer...
          </div>
        ) : (
          <form onSubmit={handleSave} className="p-5 sm:p-7 space-y-6">
            {/* Language Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pilih Bahasa Konten Teks Footer:</span>
              <div role="tablist" aria-label="Pilih Bahasa Footer" className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
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

            {/* Bilingual Content */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>📝</span>
                <span>Teks Profil & Filosofi — {activeLang === 'id' ? 'Bahasa Indonesia' : 'English'}</span>
              </h2>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Ringkasan Perusahaan di Footer (di bawah logo)
                </label>
                <textarea
                  rows={2}
                  value={activeLang === 'id' ? (formData.company_summary_id || '') : (formData.company_summary_en || '')}
                  onChange={(e) => updateField(activeLang === 'id' ? 'company_summary_id' : 'company_summary_en', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="Deskripsi singkat layanan DWDM IDTN..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Kutipan Filosofi IDTN (Cetak Miring)
                </label>
                <textarea
                  rows={2}
                  value={activeLang === 'id' ? (formData.philosophy_quote_id || '') : (formData.philosophy_quote_en || '')}
                  onChange={(e) => updateField(activeLang === 'id' ? 'philosophy_quote_id' : 'philosophy_quote_en', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 italic focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="Contoh: Bagaikan sungai yang bermuara ke lautan..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Teks Hak Cipta (Copyright Notice)
                </label>
                <input
                  type="text"
                  value={activeLang === 'id' ? (formData.copyright_id || '') : (formData.copyright_en || '')}
                  onChange={(e) => updateField(activeLang === 'id' ? 'copyright_id' : 'copyright_en', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="© 2026 PT Infinix Delapan Teknologi Nusantara..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Label Kepatuhan Regulasi (SDPPI & OSS)
                </label>
                <input
                  type="text"
                  value={activeLang === 'id' ? (formData.sdppi_status_id || '') : (formData.sdppi_status_en || '')}
                  onChange={(e) => updateField(activeLang === 'id' ? 'sdppi_status_id' : 'sdppi_status_en', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="SDPPI & OSS Compliant"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Alamat Kantor Resmi
                </label>
                <textarea
                  rows={2}
                  value={activeLang === 'id' ? (formData.address_id || '') : (formData.address_en || '')}
                  onChange={(e) => updateField(activeLang === 'id' ? 'address_id' : 'address_en', e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="Fatmawati City Center, Ruko Soho Botany Garden..."
                />
              </div>
            </div>

            {/* General Contacts (Global) */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>📞</span>
                <span>Detail Kontak & Link Resmi (Global)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Email Resmi
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    placeholder="info@idtn.co.id"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Telepon Kantor
                  </label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    placeholder="+62 21 3192 8888"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    WhatsApp Resmi
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp || ''}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    placeholder="+62 811 8888 8888"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    URL LinkedIn Resmi
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin_url || ''}
                    onChange={(e) => updateField('linkedin_url', e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    placeholder="https://linkedin.com/company/idtn"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
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
                  '💾 Simpan Pengaturan Footer'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
