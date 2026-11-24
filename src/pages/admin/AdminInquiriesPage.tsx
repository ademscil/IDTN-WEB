import React, { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { CmsInquiry } from '../../types/cms';
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

export const AdminInquiriesPage: React.FC = () => {
  const { token } = useAdminAuth();

  const [inquiries, setInquiries] = useState<CmsInquiry[]>([]);
  const [counts, setCounts] = useState({ total: 0, unread: 0, contacted: 0, archived: 0 });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<CmsInquiry | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modern Web Guidance: Standardized delete confirmation modal state
  const [deleteTargetInquiry, setDeleteTargetInquiry] = useState<CmsInquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
  };

  const closeDetail = () => {
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

  const confirmDeleteInquiry = (inq: CmsInquiry) => {
    setDeleteTargetInquiry(inq);
  };

  const executeDeleteInquiry = async () => {
    if (!deleteTargetInquiry) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/inquiries.php?id=${deleteTargetInquiry.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'Pesan berhasil dihapus.' });
        if (selectedInquiry?.id === deleteTargetInquiry.id) {
          closeDetail();
        }
        setDeleteTargetInquiry(null);
        await fetchInquiries(filterStatus);
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menghapus pesan.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal menghapus pesan.' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Standardized Page Header */}
      <AdminPageHeader
        title="Kotak Masuk Pesan Konsultasi (Inquiries)"
        description="Daftar permintaan konsultasi proyek dan formulir kontak yang dikirim oleh pengunjung landing page."
        badge={
          counts.unread > 0 ? (
            <AdminBadge variant="danger" withDot>
              {counts.unread} Belum Dibaca
            </AdminBadge>
          ) : (
            <AdminBadge variant="success">Semua Terbaca</AdminBadge>
          )
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

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilterStatus('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
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
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            filterStatus === 'unread'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Belum Dibaca ({counts.unread})
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus('contacted')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
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
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            filterStatus === 'archived'
              ? 'bg-slate-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Arsip ({counts.archived})
        </button>
      </div>

      {/* Standardized Table of Inquiries */}
      <AdminTable
        isLoading={loading}
        loadingText="Memuat kotak masuk pesan..."
        isEmpty={inquiries.length === 0}
        emptyTitle="Tidak Ada Pesan Masuk"
        emptyDescription="Tidak ada pesan konsultasi yang sesuai dengan status filter saat ini."
      >
        <AdminTableHead>
          <AdminTableCell isHeader className="w-28">Status</AdminTableCell>
          <AdminTableCell isHeader>Nama Pengirim</AdminTableCell>
          <AdminTableCell isHeader>Perusahaan</AdminTableCell>
          <AdminTableCell isHeader>Kontak</AdminTableCell>
          <AdminTableCell isHeader>Minat Solusi</AdminTableCell>
          <AdminTableCell isHeader className="w-36">Tanggal</AdminTableCell>
          <AdminTableCell isHeader align="right">Aksi</AdminTableCell>
        </AdminTableHead>
        <AdminTableBody>
          {inquiries.map((inq) => (
            <AdminTableRow
              key={inq.id}
              className={inq.status === 'unread' ? 'bg-rose-50/20 font-medium' : undefined}
            >
              <AdminTableCell>
                <AdminBadge
                  variant={
                    inq.status === 'unread'
                      ? 'danger'
                      : inq.status === 'contacted'
                      ? 'success'
                      : 'neutral'
                  }
                  withDot={inq.status === 'unread'}
                >
                  {inq.status === 'unread' ? 'Baru' : inq.status === 'contacted' ? 'Dihubungi' : 'Arsip'}
                </AdminBadge>
              </AdminTableCell>
              <AdminTableCell>
                <span className="font-bold text-slate-900">{inq.full_name}</span>
              </AdminTableCell>
              <AdminTableCell>
                <span className="text-xs text-slate-600">{inq.company || '-'}</span>
              </AdminTableCell>
              <AdminTableCell>
                <div className="text-xs font-semibold text-slate-800">{inq.work_email}</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">{inq.phone}</div>
              </AdminTableCell>
              <AdminTableCell>
                <AdminBadge variant="purple">{inq.solution_interest}</AdminBadge>
              </AdminTableCell>
              <AdminTableCell>
                <span className="text-xs text-slate-500">
                  {new Date(inq.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </AdminTableCell>
              <AdminTableCell align="right" className="whitespace-nowrap">
                <AdminActionGroup align="right">
                  <AdminActionButton
                    variant="view"
                    label="Detail"
                    onClick={() => openDetail(inq)}
                  />
                  <AdminActionButton
                    variant="delete"
                    label="Hapus"
                    onClick={() => confirmDeleteInquiry(inq)}
                  />
                </AdminActionGroup>
              </AdminTableCell>
            </AdminTableRow>
          ))}
        </AdminTableBody>
      </AdminTable>

      {/* Standardized Detail Modal */}
      <AdminModal
        isOpen={selectedInquiry !== null}
        onClose={closeDetail}
        title={selectedInquiry ? `Pesan dari ${selectedInquiry.full_name}` : 'Detail Pesan Konsultasi'}
        description={selectedInquiry ? `${selectedInquiry.company || 'Perusahaan tidak dicantumkan'} • ID #${selectedInquiry.id}` : undefined}
        badge={
          selectedInquiry && (
            <AdminBadge
              variant={
                selectedInquiry.status === 'unread'
                  ? 'danger'
                  : selectedInquiry.status === 'contacted'
                  ? 'success'
                  : 'neutral'
              }
              withDot={selectedInquiry.status === 'unread'}
            >
              {selectedInquiry.status === 'unread' ? 'Baru' : selectedInquiry.status === 'contacted' ? 'Dihubungi' : 'Arsip'}
            </AdminBadge>
          )
        }
        maxWidth="2xl"
      >
        {selectedInquiry && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Email Kerja</span>
                <a href={`mailto:${selectedInquiry.work_email}`} className="text-sky-600 font-semibold hover:underline text-xs mt-0.5 inline-block">
                  {selectedInquiry.work_email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Telepon / WhatsApp</span>
                <a href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-600 font-semibold hover:underline text-xs mt-0.5 inline-flex items-center gap-1">
                  {selectedInquiry.phone} ↗
                </a>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Minat Solusi</span>
                <span className="text-slate-800 font-bold text-xs mt-0.5 block">{selectedInquiry.solution_interest}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Waktu Kirim</span>
                <span className="text-slate-700 text-xs mt-0.5 block">{new Date(selectedInquiry.created_at).toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Uraian Kebutuhan Proyek / Pesan:
              </label>
              <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-xl text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
                {selectedInquiry.project_summary}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <AdminButton
                variant="danger"
                size="sm"
                onClick={() => confirmDeleteInquiry(selectedInquiry)}
              >
                Hapus Pesan
              </AdminButton>

              <div className="flex items-center gap-2">
                {selectedInquiry.status !== 'contacted' && (
                  <AdminButton
                    variant="success"
                    size="sm"
                    onClick={() => updateStatus(selectedInquiry.id, 'contacted')}
                  >
                    ✓ Tandai Sudah Dihubungi
                  </AdminButton>
                )}
                {selectedInquiry.status !== 'archived' && (
                  <AdminButton
                    variant="secondary"
                    size="sm"
                    onClick={() => updateStatus(selectedInquiry.id, 'archived')}
                  >
                    Arsipkan
                  </AdminButton>
                )}
                <AdminButton
                  variant="outline"
                  size="sm"
                  onClick={closeDetail}
                >
                  Tutup
                </AdminButton>
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Standardized Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={deleteTargetInquiry !== null}
        title="Konfirmasi Hapus Pesan Konsultasi"
        message={
          deleteTargetInquiry
            ? `Apakah Anda yakin ingin menghapus pesan dari '${deleteTargetInquiry.full_name}' (${deleteTargetInquiry.company})? Tindakan ini permanen.`
            : 'Apakah Anda yakin ingin menghapus pesan ini?'
        }
        confirmLabel="Ya, Hapus Pesan"
        cancelLabel="Batal"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={executeDeleteInquiry}
        onCancel={() => setDeleteTargetInquiry(null)}
      />
    </div>
  );
};
