import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCmsData } from '../../context/CmsDataContext';
import { defaultPages } from '../../data/defaultCmsData';
import { CmsClient, StrategicSegment } from '../../types/cms';
import {
  AdminPageHeader,
  AdminButton,
  AdminActionButton,
  AdminActionGroup,
  AdminTable,
  AdminTableHead,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
  AdminBadge,
  AdminAlert,
  AdminConfirmDialog,
  AdminModal
} from '../../components/admin/ui';

export const AdminClientsPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { reloadContent } = useCmsData();

  // Active top-level tab: strategic segments vs client roster
  const [activeTab, setActiveTab] = useState<'strategic' | 'portfolio'>('strategic');

  // Client roster state
  const [clients, setClients] = useState<CmsClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<'create' | 'edit' | null>(null);
  const [editingClient, setEditingClient] = useState<Partial<CmsClient>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Strategic Industry Segments state
  const [stratLang, setStratLang] = useState<'id' | 'en'>('id');
  const [stratTitleId, setStratTitleId] = useState('Segmen Industri Strategis');
  const [stratTitleEn, setStratTitleEn] = useState('Strategic Industry Segments');
  const [stratSegmentsId, setStratSegmentsId] = useState<StrategicSegment[]>([
    {
      id: 'partner-t8',
      name: 'T8 LLC',
      category: 'Global Technology Principal',
      role: 'Prinsipal Manufaktur & Riset Perangkat DWDM',
      description: 'Pengembang teknologi sistem transmisi optik DWDM Volga dan pemantauan kabel OTDR Ramenka kelas dunia.',
      status_badge: 'Mitra Terverifikasi',
      is_partner: true
    },
    {
      id: 'sector-telco',
      name: 'National Telecom Operators',
      category: 'Target Clients',
      role: 'Operator Jaringan Telekomunikasi & Seluler',
      description: 'Penyediaan perangkat DWDM backbone dan peningkatan kapasitas link transmisi antar-kota di Indonesia.',
      status_badge: 'Mitra Terverifikasi',
      is_partner: true
    },
    {
      id: 'sector-dci',
      name: 'Hyperscale Cloud & Data Centers',
      category: 'Target Clients',
      role: 'Penyedia Fasilitas Pusat Data & Cloud',
      description: 'Interkoneksi antar-data center (DCI) berkecepatan tinggi dengan latensi deterministik terendah.',
      status_badge: 'Mitra Terverifikasi',
      is_partner: true
    },
    {
      id: 'sector-transport',
      name: 'National Transportation Authorities',
      category: 'Target Clients',
      role: 'Otoritas Transportasi Udara, Kereta Api & Pelabuhan',
      description: 'Infrastruktur komunikasi optik berkeandalan 99.999% untuk mendukung sistem persinyalan dan operasional vital.',
      status_badge: 'Mitra Terverifikasi',
      is_partner: true
    }
  ]);
  const [stratSegmentsEn, setStratSegmentsEn] = useState<StrategicSegment[]>([
    {
      id: 'partner-t8',
      name: 'T8 LLC',
      category: 'Global Technology Principal',
      role: 'DWDM Equipment R&D & Manufacturing Principal',
      description: 'Developer of world-class Volga DWDM optical transport platforms and Ramenka fiber line monitoring systems.',
      status_badge: 'Verified Strategic Partner',
      is_partner: true
    },
    {
      id: 'sector-telco',
      name: 'National Telecom Operators',
      category: 'Target Clients',
      role: 'Telecom Network & Mobile Operators',
      description: 'Backbone DWDM systems deployment and inter-city long-haul optical transmission capacity upgrades across Indonesia.',
      status_badge: 'Verified Strategic Partner',
      is_partner: true
    },
    {
      id: 'sector-dci',
      name: 'Hyperscale Cloud & Data Centers',
      category: 'Target Clients',
      role: 'Data Center & Cloud Infrastructure Providers',
      description: 'High-density Data Center Interconnect (DCI) optical platforms with lowest deterministic latency.',
      status_badge: 'Verified Strategic Partner',
      is_partner: true
    },
    {
      id: 'sector-transport',
      name: 'National Transportation Authorities',
      category: 'Target Clients',
      role: 'Aviation, Railway & Port Transportation Authorities',
      description: 'Mission-critical 99.999% optical communication infrastructure supporting vital signaling and operations.',
      status_badge: 'Verified Strategic Partner',
      is_partner: true
    }
  ]);
  const [clientPageSeoData, setClientPageSeoData] = useState<Record<string, unknown>>({});
  const [savingStrat, setSavingStrat] = useState(false);

  // Modern Web Guidance: Standardized modal & confirm state
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/clients.php', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setClients(json.clients || []);
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal memuat daftar mitra/klien.' });
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchClientPageData = useCallback(async () => {
    const defClient = defaultPages.client;
    try {
      const res = await fetch('/api/admin/pages.php?page=client', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.page) {
          setClientPageSeoData(json.page);
          const secId = (json.page.sections_data_id && !Array.isArray(json.page.sections_data_id)) ? json.page.sections_data_id : {};
          const secEn = (json.page.sections_data_en && !Array.isArray(json.page.sections_data_en)) ? json.page.sections_data_en : {};

          setStratTitleId(secId.section_title || (defClient.sections.id.section_title as string) || 'Segmen Industri Strategis');
          setStratTitleEn(secEn.section_title || (defClient.sections.en.section_title as string) || 'Strategic Industry Segments');

          if (Array.isArray(secId.strategic_segments) && secId.strategic_segments.length > 0) {
            setStratSegmentsId(secId.strategic_segments);
          } else if (Array.isArray(defClient.sections.id.strategic_segments)) {
            setStratSegmentsId(defClient.sections.id.strategic_segments as StrategicSegment[]);
          }
          if (Array.isArray(secEn.strategic_segments) && secEn.strategic_segments.length > 0) {
            setStratSegmentsEn(secEn.strategic_segments);
          } else if (Array.isArray(defClient.sections.en.strategic_segments)) {
            setStratSegmentsEn(defClient.sections.en.strategic_segments as StrategicSegment[]);
          }
        }
      }
    } catch {
      // Keep fallbacks
    }
  }, [token]);

  useEffect(() => {
    fetchClients();
    fetchClientPageData();
  }, [fetchClients, fetchClientPageData]);

  const openModal = (type: 'create' | 'edit', client?: CmsClient) => {
    setActiveModal(type);
    if (type === 'edit' && client) {
      setEditingClient({ ...client });
    } else {
      setEditingClient({
        name: '',
        category: 'Telecommunication Operator',
        logo_url: '',
        is_partner: true,
        sort_order: clients.length + 1,
        is_active: true
      });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const url = '/api/admin/clients.php';
      const method = activeModal === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingClient)
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: json.message || 'Mitra/Klien berhasil disimpan.' });
        closeModal();
        await fetchClients();
        await reloadContent();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menyimpan data mitra.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStrategicSegments = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingStrat(true);
    setMessage(null);

    try {
      const defClient = defaultPages.client;
      const clientSecId = (clientPageSeoData.sections_data_id && !Array.isArray(clientPageSeoData.sections_data_id))
        ? (clientPageSeoData.sections_data_id as Record<string, unknown>)
        : ((defClient.sections.id || {}) as Record<string, unknown>);
      const clientSecEn = (clientPageSeoData.sections_data_en && !Array.isArray(clientPageSeoData.sections_data_en))
        ? (clientPageSeoData.sections_data_en as Record<string, unknown>)
        : ((defClient.sections.en || {}) as Record<string, unknown>);

      const payload = {
        page_key: 'client',
        seo_title_id: clientPageSeoData.seo_title_id || defClient.seo.id.title,
        seo_title_en: clientPageSeoData.seo_title_en || defClient.seo.en.title,
        seo_description_id: clientPageSeoData.seo_description_id || defClient.seo.id.description,
        seo_description_en: clientPageSeoData.seo_description_en || defClient.seo.en.description,
        seo_keywords_id: clientPageSeoData.seo_keywords_id || defClient.seo.id.keywords,
        seo_keywords_en: clientPageSeoData.seo_keywords_en || defClient.seo.en.keywords,
        hero_data_id: (clientPageSeoData.hero_data_id && Object.keys(clientPageSeoData.hero_data_id).length > 0)
          ? clientPageSeoData.hero_data_id
          : defClient.hero.id,
        hero_data_en: (clientPageSeoData.hero_data_en && Object.keys(clientPageSeoData.hero_data_en).length > 0)
          ? clientPageSeoData.hero_data_en
          : defClient.hero.en,
        sections_data_id: {
          ...clientSecId,
          section_title: stratTitleId,
          strategic_segments: stratSegmentsId
        },
        sections_data_en: {
          ...clientSecEn,
          section_title: stratTitleEn,
          strategic_segments: stratSegmentsEn
        }
      };

      const res = await fetch('/api/admin/pages.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'Segmen Industri Strategis berhasil disimpan! Halaman Klien & Mitra telah diperbarui secara live.' });
        await reloadContent();
        await fetchClientPageData();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menyimpan Segmen Industri.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    } finally {
      setSavingStrat(false);
    }
  };

  const updateSegment = (langKey: 'id' | 'en', index: number, field: keyof StrategicSegment, value: string) => {
    if (langKey === 'id') {
      const updated = [...stratSegmentsId];
      updated[index] = { ...updated[index], [field]: value };
      setStratSegmentsId(updated);
    } else {
      const updated = [...stratSegmentsEn];
      updated[index] = { ...updated[index], [field]: value };
      setStratSegmentsEn(updated);
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteTargetId(id);
  };

  const executeDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/clients.php?id=${deleteTargetId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'Mitra berhasil dihapus.' });
        setDeleteTargetId(null);
        await fetchClients();
        await reloadContent();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menghapus mitra.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal menghubungi server.' });
    } finally {
      setIsDeleting(false);
    }
  };

  const currentSegments = stratLang === 'id' ? stratSegmentsId : stratSegmentsEn;

  return (
    <div className="space-y-6">
      {/* Standardized Page Header */}
      <AdminPageHeader
        title="Manajemen Klien & Mitra (Clients & Partners CMS)"
        description="Kelola 4 kartu Segmen Industri Strategis (T8 LLC, Operator Telekomunikasi, Data Center, Otoritas Transportasi) serta daftar logo portofolio mitra enterprise IDTN."
        badge={
          <AdminBadge variant="info" withDot>
            {clients.length} Mitra Terdaftar
          </AdminBadge>
        }
        action={
          activeTab === 'portfolio' ? (
            <AdminButton
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => openModal('create')}
            >
              Tambah Mitra Baru
            </AdminButton>
          ) : undefined
        }
      />

      {/* Standardized Alert Banner */}
      {message && (
        <AdminAlert
          variant={message.type}
          onDismiss={() => setMessage(null)}
        >
          {message.text}
        </AdminAlert>
      )}

      {/* Modern Web Guidance: Accessible Tablist */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div role="tablist" aria-label="Kategori Pengelolaan Klien" className="flex border-b border-slate-200 bg-slate-50/60 overflow-x-auto">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'strategic'}
            onClick={() => setActiveTab('strategic')}
            className={`relative px-5 py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors focus:outline-none ${
              activeTab === 'strategic'
                ? 'text-sky-600 bg-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            🏢 Segmen Industri Strategis (4 Kartu Utama)
            {activeTab === 'strategic' && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-sky-600" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'portfolio'}
            onClick={() => setActiveTab('portfolio')}
            className={`relative px-5 py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors focus:outline-none ${
              activeTab === 'portfolio'
                ? 'text-sky-600 bg-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            🌐 Portofolio Mitra & Klien Enterprise ({clients.length})
            {activeTab === 'portfolio' && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-sky-600" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* TAB 1: Strategic Industry Segments CMS */}
        {activeTab === 'strategic' && (
          <form onSubmit={handleSaveStrategicSegments} className="p-5 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Pengaturan 4 Segmen Industri Strategis
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Teks dan rincian pada setiap kartu dapat disesuaikan untuk Bahasa Indonesia dan English secara independen.
                </p>
              </div>

              {/* Dual Language Switcher */}
              <div role="tablist" aria-label="Pilih Bahasa Konten" className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={stratLang === 'id'}
                  onClick={() => setStratLang('id')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    stratLang === 'id'
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
                  aria-selected={stratLang === 'en'}
                  onClick={() => setStratLang('en')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    stratLang === 'en'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>
              </div>
            </div>

            {/* Section Heading */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Judul Bagian Segmen Industri ({stratLang === 'id' ? 'Bahasa Indonesia' : 'English'})
              </label>
              <input
                type="text"
                required
                value={stratLang === 'id' ? stratTitleId : stratTitleEn}
                onChange={(e) => stratLang === 'id' ? setStratTitleId(e.target.value) : setStratTitleEn(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="Segmen Industri Strategis / Strategic Industry Segments"
              />
            </div>

            {/* 4 Cards Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {currentSegments.map((seg, idx) => (
                <div key={seg.id || idx} className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-mono font-bold text-sky-700">
                      Kartu #{idx + 1} — {seg.name || `Segmen ${idx + 1}`}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                      ID: {seg.id}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Kategori Atas (Category Tag)
                    </label>
                    <input
                      type="text"
                      required
                      value={seg.category || ''}
                      onChange={(e) => updateSegment(stratLang, idx, 'category', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="Global Technology Principal / Target Clients"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Nama Segmen / Entitas (Name)
                    </label>
                    <input
                      type="text"
                      required
                      value={seg.name || ''}
                      onChange={(e) => updateSegment(stratLang, idx, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="T8 LLC / National Telecom Operators"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Peran & Tanggung Jawab (Role / Subtitle)
                    </label>
                    <input
                      type="text"
                      required
                      value={seg.role || ''}
                      onChange={(e) => updateSegment(stratLang, idx, 'role', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="Prinsipal Manufaktur & Riset Perangkat DWDM"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Deskripsi Ringkas (Description)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={seg.description || ''}
                      onChange={(e) => updateSegment(stratLang, idx, 'description', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 leading-relaxed focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="Uraian peran dan layanan dalam arsitektur transmisi DWDM..."
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Teks Badge Status Bawah
                    </label>
                    <input
                      type="text"
                      value={seg.status_badge || ''}
                      onChange={(e) => updateSegment(stratLang, idx, 'status_badge', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="Mitra Terverifikasi / Verified Strategic Partner"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button for Strategic Segments */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
              <button
                type="submit"
                disabled={savingStrat}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-semibold shadow-xs disabled:opacity-50 transition-colors"
              >
                {savingStrat ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Menyimpan Segmen Industri...</span>
                  </>
                ) : (
                  <>
                    <span>💾 Simpan Perubahan Segmen Industri</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: Enterprise Client & Partner Portfolio Roster */}
        {activeTab === 'portfolio' && (
          <div className="p-0">
            <AdminTable
              isLoading={loading}
              loadingText="Memuat data mitra & klien enterprise..."
              isEmpty={clients.length === 0}
              emptyTitle="Belum Ada Mitra Terdaftar"
              emptyDescription="Daftar mitra dan klien masih kosong. Klik tombol 'Tambah Mitra Baru' untuk menambahkan mitra pertama."
              emptyActionLabel="Tambah Mitra Baru"
              onEmptyAction={() => openModal('create')}
            >
              <AdminTableHead>
                <AdminTableCell isHeader className="w-16">Urutan</AdminTableCell>
                <AdminTableCell isHeader className="w-24">Logo</AdminTableCell>
                <AdminTableCell isHeader>Nama Mitra / Klien</AdminTableCell>
                <AdminTableCell isHeader>Kategori Industri</AdminTableCell>
                <AdminTableCell isHeader>Status Verifikasi</AdminTableCell>
                <AdminTableCell isHeader align="right">Aksi</AdminTableCell>
              </AdminTableHead>
              <AdminTableBody>
                {clients.map((cli) => (
                  <AdminTableRow key={cli.id}>
                    <AdminTableCell>
                      <span className="font-mono font-bold text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                        #{cli.sort_order}
                      </span>
                    </AdminTableCell>
                    <AdminTableCell>
                      <div className="w-12 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1 overflow-hidden shadow-2xs">
                        {cli.logo_url ? (
                          <img src={cli.logo_url} alt={cli.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <span className="text-[10px] text-slate-400">No logo</span>
                        )}
                      </div>
                    </AdminTableCell>
                    <AdminTableCell>
                      <span className="font-bold text-slate-900">{cli.name}</span>
                    </AdminTableCell>
                    <AdminTableCell>
                      <AdminBadge variant="neutral">{cli.category}</AdminBadge>
                    </AdminTableCell>
                    <AdminTableCell>
                      {cli.is_partner ? (
                        <AdminBadge variant="success" withDot>
                          Verified Partner
                        </AdminBadge>
                      ) : (
                        <AdminBadge variant="neutral">
                          Standard
                        </AdminBadge>
                      )}
                    </AdminTableCell>
                    <AdminTableCell align="right" className="whitespace-nowrap">
                      <AdminActionGroup align="right">
                        <AdminActionButton
                          variant="edit"
                          label="Edit"
                          onClick={() => openModal('edit', cli)}
                        />
                        <AdminActionButton
                          variant="delete"
                          label="Hapus"
                          onClick={() => confirmDelete(cli.id)}
                        />
                      </AdminActionGroup>
                    </AdminTableCell>
                  </AdminTableRow>
                ))}
              </AdminTableBody>
            </AdminTable>
          </div>
        )}
      </div>

      {/* Standardized AdminModal for Client */}
      <AdminModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={activeModal === 'create' ? 'Tambah Mitra / Klien Baru' : 'Edit Mitra'}
        description="Kelola profil partner, nama korporasi, logo resmi, dan status verifikasi."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Nama Mitra / Perusahaan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={editingClient.name || ''}
              onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="PT Telekomunikasi Indonesia"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Kategori Mitra
            </label>
            <input
              type="text"
              value={editingClient.category || ''}
              onChange={(e) => setEditingClient({ ...editingClient, category: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="Telecommunication Operator / Data Center"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              URL Logo (SVG / PNG) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={editingClient.logo_url || ''}
              onChange={(e) => setEditingClient({ ...editingClient, logo_url: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="/assets/clients/telkom.svg atau URL upload"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Bisa mengunggah file logo di menu Media & Dokumen lalu tempelkan URL-nya di sini.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Urutan Tampilan
              </label>
              <input
                type="number"
                value={editingClient.sort_order ?? 1}
                onChange={(e) => setEditingClient({ ...editingClient, sort_order: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={!!editingClient.is_partner}
                  onChange={(e) => setEditingClient({ ...editingClient, is_partner: e.target.checked })}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Verified Partner</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <AdminButton
              variant="secondary"
              onClick={closeModal}
            >
              Batal
            </AdminButton>
            <AdminButton
              type="submit"
              variant="primary"
              isLoading={saving}
            >
              Simpan Mitra
            </AdminButton>
          </div>
        </form>
      </AdminModal>

      {/* Standardized Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Konfirmasi Hapus Mitra"
        message="Apakah Anda yakin ingin menghapus data dan logo mitra ini? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Ya, Hapus Mitra"
        cancelLabel="Batal"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={executeDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
