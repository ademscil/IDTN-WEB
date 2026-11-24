import React, { useState, useEffect, useRef, useCallback } from 'react';
import { UploadCloud } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCmsData } from '../../context/CmsDataContext';
import { CmsMediaFile } from '../../types/cms';
import {
  AdminPageHeader,
  AdminActionButton,
  AdminActionGroup,
  AdminTable,
  AdminTableHead,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
  AdminBadge,
  AdminAlert,
  AdminConfirmDialog
} from '../../components/admin/ui';

export const AdminMediaPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { reloadContent } = useCmsData();

  const [files, setFiles] = useState<CmsMediaFile[]>([]);
  const [activeProfileUrl, setActiveProfileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [settingProfileId, setSettingProfileId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modern Web Guidance: Standardized confirm state for file deletion
  const [deleteTargetFile, setDeleteTargetFile] = useState<CmsMediaFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/upload.php', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setFiles(json.files || []);
          if (json.active_company_profile_url) {
            setActiveProfileUrl(json.active_company_profile_url);
          }
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal memuat daftar file media.' });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const res = await fetch('/api/admin/upload.php', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: `File '${uploadedFile.name}' berhasil diunggah!` });
        if (fileInputRef.current) fileInputRef.current.value = '';
        await fetchFiles();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal mengunggah file.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat mengunggah.' });
    } finally {
      setUploading(false);
    }
  };

  const setAsCompanyProfile = async (file: CmsMediaFile) => {
    setSettingProfileId(file.id);
    setMessage(null);
    try {
      const isPdf = file.file_type.toLowerCase() === 'pdf';
      const labelId = isPdf ? 'Unduh Profil Perusahaan (PDF)' : 'Unduh Profil Perusahaan (PPTX)';
      const labelEn = isPdf ? 'Download Company Profile (PDF)' : 'Download Company Profile (PPTX)';

      const res = await fetch('/api/admin/upload.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          action: 'set_company_profile',
          file_url: file.file_path,
          company_profile_label: labelId,
          company_profile_label_en: labelEn
        })
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setActiveProfileUrl(file.file_path);
        setMessage({
          type: 'success',
          text: `File '${file.original_name}' berhasil dijadikan Company Profile aktif! Tombol unduh di halaman Tentang Kami (/about) langsung terhubung.`
        });
        await reloadContent();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal memperbarui Company Profile.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan saat menetapkan Company Profile.' });
    } finally {
      setSettingProfileId(null);
    }
  };

  const copyToClipboard = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const confirmDeleteFile = (file: CmsMediaFile) => {
    setDeleteTargetFile(file);
  };

  const executeDeleteFile = async () => {
    if (!deleteTargetFile) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/upload.php?id=${deleteTargetFile.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: `File '${deleteTargetFile.original_name}' berhasil dihapus dari server.` });
        setDeleteTargetFile(null);
        await fetchFiles();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menghapus file.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal menghapus file.' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Standardized Page Header */}
      <AdminPageHeader
        title="Media & Dokumen Manager"
        description="Pusat penyimpanan dan pengelolaan file presentasi Company Profile (PPTX/PDF), datasheet produk, logo klien, dan materi publikasi IDTN."
        badge={
          <AdminBadge variant="info" withDot>
            {files.length} File Tersimpan
          </AdminBadge>
        }
      />

      {/* Integration Workflow Guidance Card */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50/40 p-5 rounded-2xl border border-sky-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
          <span>💡</span>
          <span>Panduan Penggunaan & Alur Kerja File Media di Website IDTN</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700">
              <span className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center text-[11px]">1</span>
              <span>Company Profile Aktif</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Klik tombol <strong>"Jadikan Profile"</strong> pada file PPTX/PDF. Tautan tombol unduh di halaman <code>/about</code> akan otomatis diperbarui seketika.
            </p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700">
              <span className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center text-[11px]">2</span>
              <span>Datasheet Produk T8</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Unggah PDF spesifikasi perangkat, klik <strong>"Salin URL"</strong>, lalu tempelkan ke kolom <em>Datasheet URL</em> pada menu <strong>Produk T8 & Specs</strong>.
            </p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700">
              <span className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center text-[11px]">3</span>
              <span>Logo & Ilustrasi Halaman</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Unggah gambar PNG/SVG/WEBP, klik <strong>"Salin URL"</strong>, lalu gunakan di formulir <strong>Mitra & Klien</strong> atau pengaturan banner halaman.
            </p>
          </div>
        </div>
      </div>

      {/* Active Company Profile Status Card */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Status Company Profile Halaman Tentang Kami (/about):
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <code className="text-xs sm:text-sm font-mono font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
              {activeProfileUrl || '/assets/docs/IDTN-Company-Profile-2026.pptx'}
            </code>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={activeProfileUrl || '/assets/docs/IDTN-Company-Profile-2026.pptx'}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-2xs"
          >
            Pratinjau File Aktif
          </a>
        </div>
      </div>

      {/* Standardized Alert Banner */}
      {message && (
        <AdminAlert
          variant={message.type}
          onDismiss={() => setMessage(null)}
        >
          {message.text}
        </AdminAlert>
      )}

      {/* Upload Zone */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <UploadCloud className="w-4 h-4 text-sky-600" />
          <h2 className="text-sm font-bold text-slate-900">Unggah File Baru</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Format yang didukung: <strong>PDF, PPTX, PNG, JPG, WEBP, SVG</strong> (Maksimum 25MB per file).
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            accept=".pdf,.pptx,.png,.jpg,.jpeg,.webp,.svg"
            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
          />
          {uploading && (
            <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold shrink-0">
              <span className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></span>
              <span>Mengunggah...</span>
            </div>
          )}
        </div>
      </div>

      {/* Standardized Files List Table */}
      <AdminTable
        isLoading={loading}
        loadingText="Memuat data file media..."
        isEmpty={files.length === 0}
        emptyTitle="Belum Ada File Diunggah"
        emptyDescription="Belum ada file presentasi atau dokumen yang diunggah ke server. Silakan unggah file pertama Anda pada kotak di atas."
      >
        <AdminTableHead>
          <AdminTableCell isHeader className="w-20">Tipe</AdminTableCell>
          <AdminTableCell isHeader>Nama & Alur File</AdminTableCell>
          <AdminTableCell isHeader className="w-28">Ukuran</AdminTableCell>
          <AdminTableCell isHeader className="w-36">Tanggal Unggah</AdminTableCell>
          <AdminTableCell isHeader align="right">Aksi & Integrasi</AdminTableCell>
        </AdminTableHead>
        <AdminTableBody>
          {files.map((file) => {
            const isActiveProfile = activeProfileUrl === file.file_path;
            const isDocument = ['pdf', 'pptx'].includes(file.file_type.toLowerCase());
            return (
              <AdminTableRow key={file.id} className={isActiveProfile ? 'bg-sky-50/40' : undefined}>
                <AdminTableCell>
                  <AdminBadge variant={isDocument ? 'warning' : 'neutral'}>
                    {file.file_type.toUpperCase()}
                  </AdminBadge>
                </AdminTableCell>
                <AdminTableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 truncate max-w-xs">{file.original_name}</span>
                    {isActiveProfile && (
                      <AdminBadge variant="success" withDot>
                        Company Profile Aktif
                      </AdminBadge>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{file.file_path}</div>
                </AdminTableCell>
                <AdminTableCell>
                  <span className="text-xs font-mono text-slate-600">
                    {(file.file_size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </AdminTableCell>
                <AdminTableCell>
                  <span className="text-xs text-slate-500">
                    {new Date(file.uploaded_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </AdminTableCell>
                <AdminTableCell align="right" className="whitespace-nowrap">
                  <AdminActionGroup align="right">
                    {isDocument && (
                      <AdminActionButton
                        variant="star"
                        label={settingProfileId === file.id ? 'Menyimpan...' : isActiveProfile ? 'Profil Aktif' : 'Jadikan Profile'}
                        disabled={isActiveProfile || settingProfileId === file.id}
                        onClick={() => setAsCompanyProfile(file)}
                        className={isActiveProfile ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700' : ''}
                      />
                    )}
                    <AdminActionButton
                      variant="copy"
                      label={copiedId === file.id ? 'Tersalin!' : 'Salin URL'}
                      onClick={() => copyToClipboard(file.file_path, file.id)}
                      className={copiedId === file.id ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700' : ''}
                    />
                    <a
                      href={file.file_path}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 transition-colors shadow-2xs"
                      title="Buka file di tab baru"
                    >
                      Buka
                    </a>
                    <AdminActionButton
                      variant="delete"
                      label="Hapus"
                      onClick={() => confirmDeleteFile(file)}
                    />
                  </AdminActionGroup>
                </AdminTableCell>
              </AdminTableRow>
            );
          })}
        </AdminTableBody>
      </AdminTable>

      {/* Standardized Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={deleteTargetFile !== null}
        title="Konfirmasi Hapus File Media"
        message={
          deleteTargetFile
            ? `Apakah Anda yakin ingin menghapus file '${deleteTargetFile.original_name}' dari server? Tindakan ini permanen dan file tidak dapat dipulihkan.`
            : 'Apakah Anda yakin ingin menghapus file ini?'
        }
        confirmLabel="Ya, Hapus File"
        cancelLabel="Batal"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={executeDeleteFile}
        onCancel={() => setDeleteTargetFile(null)}
      />
    </div>
  );
};
