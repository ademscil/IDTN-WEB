import React, { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminUser } from '../../types/cms';

export const AdminUsersPage: React.FC = () => {
  const { token, user: currentUser } = useAdminAuth();

  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New admin state
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [addingAdmin, setAddingAdmin] = useState(false);

  // Change password state
  const [myFullName, setMyFullName] = useState(currentUser?.full_name || '');
  const [myEmail, setMyEmail] = useState(currentUser?.email || '');
  const [myNewPassword, setMyNewPassword] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/admins.php', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setAdmins(json.admins || []);
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal memuat daftar admin.' });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  useEffect(() => {
    if (currentUser) {
      setMyFullName(currentUser.full_name);
      setMyEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingAdmin(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/admins.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
          full_name: newFullName,
          password: newPassword
        })
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'Administrator baru berhasil ditambahkan.' });
        setNewUsername('');
        setNewEmail('');
        setNewFullName('');
        setNewPassword('');
        await fetchAdmins();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menambahkan admin.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    } finally {
      setAddingAdmin(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setUpdatingProfile(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/admins.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: currentUser.id,
          full_name: myFullName,
          email: myEmail,
          new_password: myNewPassword
        })
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'Profil dan password Anda berhasil diperbarui.' });
        setMyNewPassword('');
        await fetchAdmins();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal memperbarui profil.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleDeleteAdmin = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus akun admin ini?')) return;
    try {
      const res = await fetch(`/api/auth/admins.php?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: 'Admin berhasil dihapus.' });
        await fetchAdmins();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menghapus admin.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal menghubungi server.' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Manajemen Akun Administrator & Keamanan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Kelola hak akses admin website, ubah password akun Anda, atau tambahkan staf admin baru.
        </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form 1: Ubah Password Akun Sendiri */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">Profil & Password Akun Anda</h2>
          <p className="text-xs text-slate-500 mb-5">
            Perbarui nama lengkap atau ganti kata sandi login Anda.
          </p>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={myFullName}
                onChange={(e) => setMyFullName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Email Akun
              </label>
              <input
                type="email"
                required
                value={myEmail}
                onChange={(e) => setMyEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Password Baru (Kosongkan jika tidak ingin mengubah)
              </label>
              <input
                type="password"
                value={myNewPassword}
                onChange={(e) => setMyNewPassword(e.target.value)}
                placeholder="Minimal 8 karakter..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={updatingProfile}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 transition-colors"
              >
                {updatingProfile ? 'Memperbarui...' : 'Simpan Perubahan Akun'}
              </button>
            </div>
          </form>
        </div>

        {/* Form 2: Tambah Admin Baru */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">Tambah Administrator Baru</h2>
          <p className="text-xs text-slate-500 mb-5">
            Berikan akses login CMS ke anggota tim IDTN lainnya.
          </p>

          <form onSubmit={handleAddAdmin} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="admin2"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="Budi Santoso"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Alamat Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="budi@idtn.co.id"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Password Awal <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 8 karakter..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={addingAdmin}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 transition-colors"
              >
                {addingAdmin ? 'Menambahkan...' : '＋ Tambah Admin'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Admin Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-900">Daftar Akun Administrator ({admins.length})</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-slate-400">Memuat daftar admin...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-5 py-3">Username</th>
                  <th scope="col" className="px-5 py-3">Nama Lengkap</th>
                  <th scope="col" className="px-5 py-3">Email</th>
                  <th scope="col" className="px-5 py-3">Login Terakhir</th>
                  <th scope="col" className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map((adm) => (
                  <tr key={adm.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-sky-700 font-bold">
                      {adm.username}
                      {adm.id === currentUser?.id && (
                        <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-sky-100 text-sky-800 font-sans font-semibold">
                          Anda
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-900">{adm.full_name}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-600">{adm.email}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-400">
                      {adm.last_login ? new Date(adm.last_login).toLocaleString('id-ID') : 'Belum pernah login'}
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      {adm.id !== currentUser?.id && (
                        <button
                          type="button"
                          onClick={() => handleDeleteAdmin(adm.id)}
                          className="px-2.5 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md font-semibold"
                        >
                          Hapus
                        </button>
                      )}
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
