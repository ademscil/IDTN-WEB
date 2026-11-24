import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCmsData } from '../../context/CmsDataContext';
import { CmsMediaFile } from '../../types/cms';

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

  const deleteFile = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus file ini dari server?')) return;
    try {
      const res = await fetch(`/api/admin/upload.php?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'File berhasil dihapus.' });
        await fetchFiles();
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal menghapus file.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Media & Dokumen Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pusat penyimpanan dan pengelolaan file presentasi Company Profile (PPTX/PDF), datasheet produk, logo klien, dan materi publikasi IDTN.
          </p>
        </div>
      </div>

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
              Klik tombol <strong>"★ Jadikan Company Profile"</strong> pada file PPTX/PDF. Tautan tombol unduh di halaman <code>/about</code> akan otomatis diperbarui seketika.
            </p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700">
              <span className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center text-[11px]">2</span>
              <span>Datasheet Produk T8</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Unggah PDF spesifikasi perangkat, klik <strong>"Salin URL"</strong>, lalu tempelkan ke kolom <em>Datasheet URL</em> pada menu <strong>Perangkat & Produk</strong>.
            </p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700">
              <span className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center text-[11px]">3</span>
              <span>Logo & Ilustrasi Halaman</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Unggah gambar PNG/SVG/WEBP, klik <strong>"Salin URL"</strong>, lalu gunakan di formulir <strong>Klien & Mitra</strong> atau pengaturan banner halaman.
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

      {/* Upload Zone */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-2">Unggah File Baru</h2>
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

      {/* Files List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Daftar File Media & Dokumen ({files.length})</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-slate-400">
            <div className="w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Memuat daftar file...
          </div>
        ) : files.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Belum ada file yang diunggah ke server. Silakan unggah file presentasi atau dokumen di atas.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-5 py-3">Tipe</th>
                  <th scope="col" className="px-5 py-3">Nama & Alur File</th>
                  <th scope="col" className="px-5 py-3">Ukuran</th>
                  <th scope="col" className="px-5 py-3">Tanggal Unggah</th>
                  <th scope="col" className="px-5 py-3 text-right">Aksi & Integrasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {files.map((file) => {
                  const isActiveProfile = activeProfileUrl === file.file_path;
                  const isDocument = ['pdf', 'pptx'].includes(file.file_type.toLowerCase());
                  return (
                    <tr key={file.id} className={`hover:bg-slate-50/80 transition-colors ${isActiveProfile ? 'bg-sky-50/40' : ''}`}>
                      <td className="px-5 py-3.5 align-middle">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isDocument ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {file.file_type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 align-middle">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 truncate max-w-xs">{file.original_name}</span>
                          {isActiveProfile && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <span>★</span>
                              <span>Company Profile Aktif</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{file.file_path}</div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-500 align-middle">
                        {(file.file_size / 1024 / 1024).toFixed(2)} MB
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap align-middle">
                        {new Date(file.uploaded_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-2 align-middle">
                        {isDocument && (
                          <button
                            type="button"
                            disabled={isActiveProfile || settingProfileId === file.id}
                            onClick={() => setAsCompanyProfile(file)}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                              isActiveProfile
                                ? 'bg-emerald-600 text-white cursor-default'
                                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                            }`}
                            title="Tetapkan file ini sebagai tombol unduh Company Profile pada halaman /about"
                          >
                            {settingProfileId === file.id ? 'Menyimpan...' : isActiveProfile ? '✓ Aktif sbg Profile' : '★ Jadikan Company Profile'}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => copyToClipboard(file.file_path, file.id)}
                          className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                            copiedId === file.id
                              ? 'bg-emerald-600 text-white'
                              : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                          }`}
                        >
                          {copiedId === file.id ? '✓ Disalin!' : 'Salin URL'}
                        </button>
                        <a
                          href={file.file_path}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 rounded-md border border-slate-200"
                        >
                          Buka
                        </a>
                        <button
                          type="button"
                          onClick={() => deleteFile(file.id)}
                          className="px-2 py-1 text-xs text-red-600 hover:text-red-800"
                          title="Hapus file"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
