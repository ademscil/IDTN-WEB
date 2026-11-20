import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCmsData } from '../../context/CmsDataContext';
import { CmsProduct } from '../../types/cms';

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

  // Modern Web Guidance: Native <dialog> ref
  const dialogRef = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

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
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
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
    deleteDialogRef.current?.showModal();
  };

  const executeDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/products.php?id=${deleteTargetId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'Produk berhasil dihapus.' });
        deleteDialogRef.current?.close();
        setDeleteTargetId(null);
        await fetchProducts();
        await reloadContent();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menghapus produk.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal menghubungi server.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Katalog Produk T8 & Spesifikasi Teknis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tambah, edit, atau sesuaikan spesifikasi perangkat transmisi DWDM (Volga I, DCI, OTDR Ramenka, NMS).
          </p>
        </div>
        <button
          type="button"
          onClick={() => openModal('create')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
        >
          <span>＋ Tambah Produk Baru</span>
        </button>
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

      {/* Modern Web Guidance: Responsive Table with horizontal scroll */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-400">
            <div className="w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Memuat produk...
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Belum ada produk yang ditambahkan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-5 py-3">Urutan</th>
                  <th scope="col" className="px-5 py-3">Nama Produk</th>
                  <th scope="col" className="px-5 py-3">Kategori</th>
                  <th scope="col" className="px-5 py-3">Form Factor & Kapasitas</th>
                  <th scope="col" className="px-5 py-3">Spesifikasi</th>
                  <th scope="col" className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-slate-400 font-bold">#{prod.sort_order}</td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-slate-900">{prod.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">slug: {prod.slug}</div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-600">{prod.category}</td>
                    <td className="px-5 py-3.5">
                      <div className="text-xs font-medium text-slate-800">{prod.form_factor}</div>
                      <div className="text-[11px] text-slate-500">{prod.capacity}</div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">
                      {Object.keys(prod.specs || {}).length} parameter teknis
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => openModal('edit', prod)}
                        className="px-2.5 py-1 text-xs font-semibold text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-md transition-colors mr-1"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => confirmDelete(prod.id)}
                        className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modern Web Guidance: Native <dialog> Modal for Product Form */}
      <dialog
        ref={dialogRef}
        aria-labelledby="product-dialog-title"
        className="w-full max-w-2xl rounded-2xl p-0 bg-white shadow-2xl backdrop:bg-slate-950/70 border border-slate-200"
        style={{ overscrollBehavior: 'contain' }}
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 id="product-dialog-title" className="text-base font-bold text-slate-900">
            {activeModal === 'create' ? 'Tambah Produk T8 Baru' : 'Edit Perangkat T8'}
          </h2>
          <button
            type="button"
            onClick={closeModal}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
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
                    className="text-red-500 hover:text-red-700 p-1 text-xs"
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
            <button
              type="button"
              onClick={closeModal}
              autoFocus
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 transition-colors"
            >
              {saving ? 'Menyimpan...' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </dialog>

      {/* Delete Confirmation Native Dialog */}
      <dialog
        ref={deleteDialogRef}
        aria-labelledby="delete-dialog-title"
        className="w-full max-w-sm rounded-2xl p-6 bg-white shadow-2xl backdrop:bg-slate-950/70 border border-slate-200"
        style={{ overscrollBehavior: 'contain' }}
      >
        <h3 id="delete-dialog-title" className="text-base font-bold text-slate-900">
          Konfirmasi Hapus Produk
        </h3>
        <p className="text-xs text-slate-600 mt-2">
          Apakah Anda yakin ingin menghapus produk ini dari katalog? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => deleteDialogRef.current?.close()}
            autoFocus
            className="px-3.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={executeDelete}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold"
          >
            Ya, Hapus
          </button>
        </div>
      </dialog>
    </div>
  );
};
