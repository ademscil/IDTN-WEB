import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { CmsInquiry } from '../../types/cms';

export const AdminInquiriesPage: React.FC = () => {
  const { token } = useAdminAuth();

  const [inquiries, setInquiries] = useState<CmsInquiry[]>([]);
  const [counts, setCounts] = useState({ total: 0, unread: 0, contacted: 0, archived: 0 });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<CmsInquiry | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const detailDialogRef = useRef<HTMLDialogElement>(null);

  const fetchInquiries = useCallback(async (statusFilter?: string) => {
    setLoading(true);
    try {
      const query = statusFilter && statusFilter !== 'all' ? `?status=${statusFilter}` : '';
      const res = await fetch(`/api/admin/inquiries.php${query}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setInquiries(json.inquiries || []);
          if (json.counts) {
            setCounts(json.counts);
          }
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal memuat pesan masuk.' });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchInquiries(filterStatus);
  }, [fetchInquiries, filterStatus]);

  const openDetail = (inq: CmsInquiry) => {
    setSelectedInquiry(inq);
    detailDialogRef.current?.showModal();
  };

  const closeDetail = () => {
    detailDialogRef.current?.close();
    setSelectedInquiry(null);
  };

  const updateStatus = async (id: number, newStatus: 'unread' | 'contacted' | 'archived') => {
    try {
      const res = await fetch('/api/admin/inquiries.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: `Status pesan diperbarui menjadi '${newStatus}'.` });
        closeDetail();
        await fetchInquiries(filterStatus);
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal mengubah status pesan.' });
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pesan ini?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries.php?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'Pesan berhasil dihapus.' });
        closeDetail();
        await fetchInquiries(filterStatus);
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal menghapus pesan.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Kotak Masuk Pesan Konsultasi (Inquiries)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Daftar permintaan konsultasi proyek dan formulir kontak yang dikirim oleh pengunjung landing page.
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

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilterStatus('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filterStatus === 'all'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Semua ({counts.total})
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus('unread')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filterStatus === 'unread'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Belum Dibaca ({counts.unread})
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus('contacted')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filterStatus === 'contacted'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Sudah Dihubungi ({counts.contacted})
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus('archived')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filterStatus === 'archived'
              ? 'bg-slate-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Arsip ({counts.archived})
        </button>
      </div>

      {/* Table of Inquiries */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-400">
            <div className="w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Memuat kotak masuk...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Tidak ada pesan pada filter ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-5 py-3">Status</th>
                  <th scope="col" className="px-5 py-3">Nama Pengirim</th>
                  <th scope="col" className="px-5 py-3">Perusahaan</th>
                  <th scope="col" className="px-5 py-3">Kontak</th>
                  <th scope="col" className="px-5 py-3">Minat Solusi</th>
                  <th scope="col" className="px-5 py-3">Tanggal</th>
                  <th scope="col" className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      inq.status === 'unread' ? 'bg-red-50/20 font-medium' : ''
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        inq.status === 'unread'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : inq.status === 'contacted'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {inq.status === 'unread' ? '● Baru' : inq.status === 'contacted' ? '✓ Dihubungi' : 'Arsip'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-900">{inq.full_name}</td>
                    <td className="px-5 py-3.5 text-slate-600">{inq.company}</td>
                    <td className="px-5 py-3.5 text-xs">
                      <div className="text-slate-900">{inq.work_email}</div>
                      <div className="text-slate-500 font-mono text-[11px]">{inq.phone}</div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-700">{inq.solution_interest}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(inq.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => openDetail(inq)}
                        className="px-3 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-md text-xs font-semibold transition-colors"
                      >
                        Buka Pesan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Native Dialog Modal */}
      <dialog
        ref={detailDialogRef}
        aria-labelledby="inquiry-detail-title"
        className="w-full max-w-lg rounded-2xl p-0 bg-white shadow-2xl backdrop:bg-slate-950/70 border border-slate-200"
        style={{ overscrollBehavior: 'contain' }}
      >
        {selectedInquiry && (
          <div>
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pesan Masuk ID #{selectedInquiry.id}</span>
                <h2 id="inquiry-detail-title" className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedInquiry.full_name} — {selectedInquiry.company}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDetail}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-400 block font-semibold uppercase">Email</span>
                  <a href={`mailto:${selectedInquiry.work_email}`} className="text-sky-600 font-medium hover:underline">
                    {selectedInquiry.work_email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase">Telepon / WhatsApp</span>
                  <a href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-600 font-medium hover:underline">
                    {selectedInquiry.phone} ↗
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase">Minat Solusi</span>
                  <span className="text-slate-800 font-semibold">{selectedInquiry.solution_interest}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase">Waktu Kirim</span>
                  <span className="text-slate-800">{new Date(selectedInquiry.created_at).toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Uraian Kebutuhan Proyek / Pesan:
                </label>
                <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-lg text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.project_summary}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => deleteInquiry(selectedInquiry.id)}
                className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              >
                Hapus Pesan
              </button>

              <div className="flex items-center gap-2">
                {selectedInquiry.status !== 'contacted' && (
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedInquiry.id, 'contacted')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    ✓ Tandai Sudah Dihubungi
                  </button>
                )}
                {selectedInquiry.status !== 'archived' && (
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedInquiry.id, 'archived')}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Arsipkan
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeDetail}
                  autoFocus
                  className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};
