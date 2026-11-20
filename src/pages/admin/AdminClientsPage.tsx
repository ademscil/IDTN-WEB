import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCmsData } from '../../context/CmsDataContext';
import { CmsClient } from '../../types/cms';

export const AdminClientsPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { reloadContent } = useCmsData();

  const [clients, setClients] = useState<CmsClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<'create' | 'edit' | null>(null);
  const [editingClient, setEditingClient] = useState<Partial<CmsClient>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

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

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

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
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
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

  const confirmDelete = (id: number) => {
    setDeleteTargetId(id);
    deleteDialogRef.current?.showModal();
  };

  const executeDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/clients.php?id=${deleteTargetId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'Mitra berhasil dihapus.' });
        deleteDialogRef.current?.close();
        setDeleteTargetId(null);
        await fetchClients();
        await reloadContent();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menghapus mitra.' });
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
            Mitra Strategis & Klien
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola daftar logo operator telekomunikasi, ISP, dan data center yang ditampilkan di landing page.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openModal('create')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
        >
          <span>＋ Tambah Mitra Baru</span>
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

      {/* Clients Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-400">
            <div className="w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Memuat mitra...
          </div>
        ) : clients.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Belum ada mitra/klien yang ditambahkan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-5 py-3">Urutan</th>
                  <th scope="col" className="px-5 py-3">Logo</th>
                  <th scope="col" className="px-5 py-3">Nama Mitra / Klien</th>
                  <th scope="col" className="px-5 py-3">Kategori</th>
                  <th scope="col" className="px-5 py-3">Verified Partner</th>
                  <th scope="col" className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.map((cli) => (
                  <tr key={cli.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-slate-400 font-bold">#{cli.sort_order}</td>
                    <td className="px-5 py-3.5">
                      <div className="w-10 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center p-1 overflow-hidden">
                        {cli.logo_url ? (
                          <img src={cli.logo_url} alt={cli.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <span className="text-[10px] text-slate-400">No logo</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{cli.name}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-600">{cli.category}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        cli.is_partner
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {cli.is_partner ? '✓ Verified' : 'Standard'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => openModal('edit', cli)}
                        className="px-2.5 py-1 text-xs font-semibold text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-md transition-colors mr-1"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => confirmDelete(cli.id)}
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

      {/* Modal Native Dialog for Client */}
      <dialog
        ref={dialogRef}
        aria-labelledby="client-dialog-title"
        className="w-full max-w-md rounded-2xl p-0 bg-white shadow-2xl backdrop:bg-slate-950/70 border border-slate-200"
        style={{ overscrollBehavior: 'contain' }}
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 id="client-dialog-title" className="text-base font-bold text-slate-900">
            {activeModal === 'create' ? 'Tambah Mitra / Klien Baru' : 'Edit Mitra'}
          </h2>
          <button
            type="button"
            onClick={closeModal}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

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
              {saving ? 'Menyimpan...' : 'Simpan Mitra'}
            </button>
          </div>
        </form>
      </dialog>

      {/* Delete Confirmation Dialog */}
      <dialog
        ref={deleteDialogRef}
        aria-labelledby="delete-client-dialog-title"
        className="w-full max-w-sm rounded-2xl p-6 bg-white shadow-2xl backdrop:bg-slate-950/70 border border-slate-200"
        style={{ overscrollBehavior: 'contain' }}
      >
        <h3 id="delete-client-dialog-title" className="text-base font-bold text-slate-900">
          Konfirmasi Hapus Mitra
        </h3>
        <p className="text-xs text-slate-600 mt-2">
          Apakah Anda yakin ingin menghapus logo mitra ini?
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
