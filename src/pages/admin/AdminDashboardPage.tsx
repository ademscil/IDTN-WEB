import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCmsData } from '../../context/CmsDataContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { CmsInquiry } from '../../types/cms';
import {
  AdminTable,
  AdminTableHead,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
  AdminBadge
} from '../../components/admin/ui';

export const AdminDashboardPage: React.FC = () => {
  const { products, clients } = useCmsData();
  const { token, user } = useAdminAuth();

  const [inquiriesCount, setInquiriesCount] = useState({ total: 0, unread: 0, contacted: 0 });
  const [recentInquiries, setRecentInquiries] = useState<CmsInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch('/api/admin/inquiries.php', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setInquiriesCount(json.counts || { total: 0, unread: 0, contacted: 0 });
            setRecentInquiries((json.inquiries || []).slice(0, 5));
          }
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [token]);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-sm border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30 mb-2">
            IDTN Control Center
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Selamat Datang, {user?.full_name || 'Admin IDTN'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Seluruh konten website, produk T8, profil per halaman (ID & EN), dan pesan formulir dapat Anda kendalikan di sini.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/admin/pages"
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            Edit Halaman & SEO
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-slate-700/80 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-600"
          >
            Buka Web
          </a>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Katalog Produk T8</span>
            <span className="p-2 bg-sky-50 text-sky-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{products.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Produk & sistem aktif</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mitra & Klien</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{clients.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Operator & Enterprise</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Pesan Masuk</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">{inquiriesCount.total}</p>
          <p className="text-[11px] text-slate-500 mt-1">Dari formulir konsultasi</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pesan Belum Dibaca</span>
            <span className="p-2 bg-red-50 text-red-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold text-red-600 mt-2">{inquiriesCount.unread}</p>
          <p className="text-[11px] text-slate-500 mt-1">Perlu ditindaklanjuti</p>
        </div>
      </div>

      {/* Recent Inquiries Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pesan Konsultasi Masuk Terbaru</h2>
            <p className="text-xs text-slate-500 mt-0.5">Pengunjung yang mengisi formulir kontak di landing page</p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
          >
            Lihat Semua Pesan →
          </Link>
        </div>

        <AdminTable
          isLoading={loading}
          loadingText="Memuat data pesan konsultasi..."
          isEmpty={recentInquiries.length === 0}
          emptyTitle="Belum Ada Pesan Masuk"
          emptyDescription="Belum ada pesan kontak dari formulir konsultasi."
        >
          <AdminTableHead>
            <AdminTableCell isHeader>Nama Pengirim</AdminTableCell>
            <AdminTableCell isHeader>Perusahaan</AdminTableCell>
            <AdminTableCell isHeader>Email & Telepon</AdminTableCell>
            <AdminTableCell isHeader>Solusi Minat</AdminTableCell>
            <AdminTableCell isHeader>Status</AdminTableCell>
            <AdminTableCell isHeader align="right">Tanggal</AdminTableCell>
          </AdminTableHead>
          <AdminTableBody>
            {recentInquiries.map((inq) => (
              <AdminTableRow
                key={inq.id}
                className={inq.status === 'unread' ? 'bg-rose-50/20 font-medium' : undefined}
              >
                <AdminTableCell>
                  <span className="font-bold text-slate-900">{inq.full_name}</span>
                </AdminTableCell>
                <AdminTableCell>
                  <span className="text-xs text-slate-600">{inq.company || '-'}</span>
                </AdminTableCell>
                <AdminTableCell>
                  <div className="text-xs font-semibold text-slate-900">{inq.work_email}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{inq.phone}</div>
                </AdminTableCell>
                <AdminTableCell>
                  <AdminBadge variant="purple">{inq.solution_interest}</AdminBadge>
                </AdminTableCell>
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
                <AdminTableCell align="right">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {new Date(inq.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTableBody>
        </AdminTable>
      </div>
    </div>
  );
};
