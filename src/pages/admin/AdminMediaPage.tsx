import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { CmsMediaFile } from '../../types/cms';

export const AdminMediaPage: React.FC = () => {
  const { token } = useAdminAuth();

  const [files, setFiles] = useState<CmsMediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
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
            Unggah file presentasi Company Profile (PPTX/PDF), datasheet produk, atau logo untuk digunakan pada website.
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
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-900">Daftar File di Server ({files.length})</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-slate-400">
            <div className="w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Memuat daftar file...
          </div>
        ) : files.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Belum ada file yang diunggah.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-5 py-3">Tipe</th>
                  <th scope="col" className="px-5 py-3">Nama File Asli</th>
                  <th scope="col" className="px-5 py-3">Ukuran</th>
                  <th scope="col" className="px-5 py-3">Tanggal Unggah</th>
                  <th scope="col" className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {file.file_type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-slate-900 truncate max-w-xs">{file.original_name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{file.file_path}</div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">
                      {(file.file_size / 1024 / 1024).toFixed(2)} MB
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(file.uploaded_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-2">
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
