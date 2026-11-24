import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Server, Cpu, Activity, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCmsData } from '../../context/CmsDataContext';
import { CmsProduct } from '../../types/cms';
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

export const AdminProductsPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { reloadContent } = useCmsData();

  const [products, setProducts] = useState<CmsProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<'create' | 'edit' | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<CmsProduct>>({});
  const [activeLang, setActiveLang] = useState<'id' | 'en'>('id');
  const [specsList, setSpecsList] = useState<Array<{ key: string; value: string }>>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modern Web Guidance: Confirmation dialog state for deletion
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products.php', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setProducts(json.products || []);
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal memuat produk.' });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle open dialog
  const openModal = (type: 'create' | 'edit', product?: CmsProduct) => {
    setActiveModal(type);
    if (type === 'edit' && product) {
      setEditingProduct({ ...product });
      const currentSpecs = product.specs || {};
      setSpecsList(Object.entries(currentSpecs).map(([key, value]) => ({ key, value: String(value) })));
    } else {
      setEditingProduct({
        name: '',
        slug: '',
        category: 'Modular Telecom Platform',
        form_factor: '1U Chassis',
        capacity: '',
        description: { id: '', en: '' },
        datasheet_url: '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
        sort_order: products.length + 1,
        is_active: true
      });
      setSpecsList([
        { key: 'Wavelength Range', value: 'C-Band 96 Channels' },
        { key: 'Channel Data Rates', value: '100G / 200G / 400G / 800G' }
      ]);
    }
    setActiveLang('id');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleAddSpecRow = () => {
    setSpecsList([...specsList, { key: '', value: '' }]);
  };

  const handleRemoveSpecRow = (index: number) => {
    setSpecsList(specsList.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specsList];
    updated[index][field] = val;
    setSpecsList(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    // Convert specsList to record
    const specsRecord: Record<string, string> = {};
    specsList.forEach(item => {
      if (item.key.trim()) {
        specsRecord[item.key.trim()] = item.value.trim();
      }
    });

    const payload = {
      ...editingProduct,
      specs: specsRecord,
      description_id: editingProduct.description?.id || '',
      description_en: editingProduct.description?.en || ''
    };

    try {
      const url = '/api/admin/products.php';
      const method = activeModal === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: json.message || 'Produk berhasil disimpan.' });
        closeModal();
        await fetchProducts();
        await reloadContent();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menyimpan produk.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteTargetId(id);
  };

  const executeDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products.php?id=${deleteTargetId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'Produk berhasil dihapus.' });
        setDeleteTargetId(null);
        await fetchProducts();
        await reloadContent();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menghapus produk.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal menghubungi server.' });
    } finally {
      setIsDeleting(false);
    }
  };

  const getProductIcon = (slug?: string) => {
    if (!slug) return <Cpu className="w-5 h-5 text-sky-600" />;
    if (slug.includes('telecom')) return <Server className="w-5 h-5 text-sky-600" />;
    if (slug.includes('dci')) return <Cpu className="w-5 h-5 text-sky-600" />;
    if (slug.includes('otdr') || slug.includes('ramenka')) return <Activity className="w-5 h-5 text-emerald-600" />;
    if (slug.includes('nms') || slug.includes('titan')) return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
    return <Cpu className="w-5 h-5 text-sky-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Standardized Page Header */}
      <AdminPageHeader
        title="Katalog Produk T8 & Spesifikasi Teknis"
        description="Kelola perangkat keras transmisi optik DWDM resmi T8 (Volga I, DCI, OTDR Ramenka, NMS) beserta parameter teknis dan link unduh datasheet."
        badge={
          <AdminBadge variant="info" withDot>
            {products.length} Perangkat Terdaftar
          </AdminBadge>
        }
        actions={
          <AdminButton
            type="button"
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => openModal('create')}
          >
            Tambah Produk Baru
          </AdminButton>
        }
      />

      {/* Standardized Alert Message */}
      {message && (
        <AdminAlert
          type={message.type}
          message={message.text}
          onDismiss={() => setMessage(null)}
        />
      )}

      {/* Standardized Modern Data Table */}
      <AdminTable
        isLoading={loading}
        loadingText="Memuat data produk T8..."
        isEmpty={products.length === 0}
        emptyTitle="Belum Ada Produk T8"
        emptyDescription="Katalog produk masih kosong. Klik tombol 'Tambah Produk Baru' untuk menambahkan perangkat pertama."
        emptyActionLabel="Tambah Produk Baru"
        onEmptyAction={() => openModal('create')}
      >
        <AdminTableHead>
          <AdminTableCell isHeader className="w-16">Urutan</AdminTableCell>
          <AdminTableCell isHeader>Nama Perangkat</AdminTableCell>
          <AdminTableCell isHeader>Kategori Platform</AdminTableCell>
          <AdminTableCell isHeader>Form Factor & Kapasitas</AdminTableCell>
          <AdminTableCell isHeader>Spesifikasi</AdminTableCell>
          <AdminTableCell isHeader align="right">Aksi</AdminTableCell>
        </AdminTableHead>
        <AdminTableBody>
          {products.map((prod) => (
            <AdminTableRow key={prod.id}>
              <AdminTableCell>
                <span className="font-mono font-bold text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                  #{prod.sort_order}
                </span>
              </AdminTableCell>
              <AdminTableCell>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    {getProductIcon(prod.slug)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 leading-snug">{prod.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">slug: {prod.slug}</div>
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <AdminBadge variant="neutral">{prod.category}</AdminBadge>
              </AdminTableCell>
              <AdminTableCell>
                <div className="text-xs font-semibold text-slate-800">{prod.form_factor}</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">{prod.capacity}</div>
              </AdminTableCell>
              <AdminTableCell>
                <AdminBadge variant="purple">
                  {Object.keys(prod.specs || {}).length} Parameter
                </AdminBadge>
              </AdminTableCell>
              <AdminTableCell align="right" className="whitespace-nowrap">
                <AdminActionGroup align="right">
                  <AdminActionButton
                    variant="edit"
                    label="Edit"
                    onClick={() => openModal('edit', prod)}
                  />
                  <AdminActionButton
                    variant="delete"
                    label="Hapus"
                    onClick={() => confirmDelete(prod.id)}
                  />
                </AdminActionGroup>
              </AdminTableCell>
            </AdminTableRow>
          ))}
        </AdminTableBody>
      </AdminTable>

      {/* Standardized AdminModal for Product Form */}
      <AdminModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={activeModal === 'create' ? 'Tambah Produk T8 Baru' : 'Edit Perangkat T8'}
        description="Lengkapi detail spesifikasi teknis dan platform perangkat transmisi DWDM."
        maxWidth="3xl"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Dual Language Switcher in Modal */}
          <div className="flex items-center justify-between p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              role="tab"
              aria-selected={activeLang === 'id'}
              onClick={() => setActiveLang('id')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                activeLang === 'id' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              🇮🇩 Bahasa Indonesia
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeLang === 'en'}
              onClick={() => setActiveLang('en')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                activeLang === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              🇬🇧 English
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={editingProduct.name || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="DWDM System Volga I Telecom"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Slug (URL Identifier)
              </label>
              <input
                type="text"
                value={editingProduct.slug || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="volga-telecom"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Kategori Produk
              </label>
              <input
                type="text"
                value={editingProduct.category || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="Modular Telecom Platform"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Form Factor / Chassis
              </label>
              <input
                type="text"
                value={editingProduct.form_factor || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, form_factor: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="1U / 3U / 6U / 10U"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Kapasitas Transmisi
              </label>
              <input
                type="text"
                value={editingProduct.capacity || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, capacity: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="Up to 27.2 Tbps"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Deskripsi Produk ({activeLang === 'id' ? 'Bahasa Indonesia' : 'English'})
            </label>
            <textarea
              rows={3}
              value={activeLang === 'id' ? (editingProduct.description?.id || '') : (editingProduct.description?.en || '')}
              onChange={(e) => {
                const val = e.target.value;
                setEditingProduct(prev => ({
                  ...prev,
                  description: {
                    id: activeLang === 'id' ? val : (prev.description?.id || ''),
                    en: activeLang === 'en' ? val : (prev.description?.en || '')
                  }
                }));
              }}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="Jelaskan keunggulan dan skenario penerapan perangkat..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Link File Datasheet PDF
            </label>
            <input
              type="text"
              value={editingProduct.datasheet_url || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct, datasheet_url: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Bisa mengunggah file baru di menu Media & Dokumen lalu tempelkan URL-nya di sini.
            </p>
          </div>

          {/* Dynamic Technical Specs Editor */}
          <div className="border-t border-slate-200 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Spesifikasi Teknis Dinamis ({specsList.length})
              </span>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700"
              >
                ＋ Tambah Baris Spesifikasi
              </button>
            </div>

            <div className="space-y-2">
              {specsList.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    placeholder="Parameter (misal: Wavelength Range)"
                    className="w-1/3 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 focus:ring-1 focus:ring-sky-500"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    placeholder="Nilai (misal: C-Band 96 Channels)"
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecRow(idx)}
                    className="text-rose-500 hover:text-rose-700 p-1 text-xs"
                    title="Hapus baris"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sort order */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Urutan Tampilan
              </label>
              <input
                type="number"
                value={editingProduct.sort_order ?? 1}
                onChange={(e) => setEditingProduct({ ...editingProduct, sort_order: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Dialog Actions */}
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
              Simpan Produk
            </AdminButton>
          </div>
        </form>
      </AdminModal>

      {/* Standardized Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={deleteTargetId !== null}
        title="Konfirmasi Hapus Produk T8"
        message="Apakah Anda yakin ingin menghapus produk ini dari katalog? Tindakan ini tidak dapat dibatalkan dan akan menghapus spesifikasi teknis terkait."
        confirmLabel="Ya, Hapus Produk"
        cancelLabel="Batal"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={executeDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
