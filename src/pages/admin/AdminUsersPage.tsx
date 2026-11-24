import React, { useState, useEffect, useCallback } from 'react';
import { KeyRound, UserPlus } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminUser } from '../../types/cms';
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
  AdminConfirmDialog
} from '../../components/admin/ui';

export const AdminUsersPage: React.FC = () => {
  const { token, user: currentUser } = useAdminAuth();

  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modern Web Guidance: Standardized delete confirmation modal state
  const [deleteTargetAdmin, setDeleteTargetAdmin] = useState<AdminUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const confirmDeleteAdmin = (adm: AdminUser) => {
    setDeleteTargetAdmin(adm);
  };

  const executeDeleteAdmin = async () => {
    if (!deleteTargetAdmin) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/auth/admins.php?id=${deleteTargetAdmin.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessage({ type: 'success', text: `Akun admin '${deleteTargetAdmin.username}' berhasil dihapus.` });
        setDeleteTargetAdmin(null);
        await fetchAdmins();
      } else {
        setMessage({ type: 'error', text: json.error || 'Gagal menghapus admin.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Gagal menghubungi server.' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Standardized Page Header */}
      <AdminPageHeader
        title="Manajemen Akun Administrator & Keamanan"
        description="Kelola hak akses admin website, ubah password akun Anda, atau daftarkan staf administrator baru."
        badge={
          <AdminBadge variant="info" withDot>
            {admins.length} Akun Aktif
          </AdminBadge>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form 1: Ubah Password Akun Sendiri */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <KeyRound className="w-4 h-4 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">Profil & Password Akun Anda</h2>
          </div>
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
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <AdminButton
                type="submit"
                variant="primary"
                isLoading={updatingProfile}
              >
                Simpan Perubahan Akun
              </AdminButton>
            </div>
          </form>
        </div>

        {/* Form 2: Tambah Admin Baru */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <UserPlus className="w-4 h-4 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">Tambah Administrator Baru</h2>
          </div>
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
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <AdminButton
                type="submit"
                variant="primary"
                isLoading={addingAdmin}
              >
                Tambah Admin Baru
              </AdminButton>
            </div>
          </form>
        </div>
      </div>

      {/* Standardized Admin Users Table */}
      <AdminTable
        isLoading={loading}
        loadingText="Memuat daftar administrator..."
        isEmpty={admins.length === 0}
        emptyTitle="Belum Ada Admin Terdaftar"
        emptyDescription="Daftar administrator masih kosong."
      >
        <AdminTableHead>
          <AdminTableCell isHeader>Username</AdminTableCell>
          <AdminTableCell isHeader>Nama Lengkap</AdminTableCell>
          <AdminTableCell isHeader>Email</AdminTableCell>
          <AdminTableCell isHeader>Login Terakhir</AdminTableCell>
          <AdminTableCell isHeader align="right">Aksi</AdminTableCell>
        </AdminTableHead>
        <AdminTableBody>
          {admins.map((adm) => (
            <AdminTableRow key={adm.id}>
              <AdminTableCell>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-sky-700">
                    {adm.username}
                  </span>
                  {adm.id === currentUser?.id && (
                    <AdminBadge variant="info">
                      Anda
                    </AdminBadge>
                  )}
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <span className="font-bold text-slate-900">{adm.full_name}</span>
              </AdminTableCell>
              <AdminTableCell>
                <span className="text-xs text-slate-600">{adm.email}</span>
              </AdminTableCell>
              <AdminTableCell>
                <span className="text-xs text-slate-500">
                  {adm.last_login
                    ? new Date(adm.last_login).toLocaleString('id-ID')
                    : 'Belum pernah login'}
                </span>
              </AdminTableCell>
              <AdminTableCell align="right" className="whitespace-nowrap">
                {adm.id !== currentUser?.id && (
                  <AdminActionGroup align="right">
                    <AdminActionButton
                      variant="delete"
                      label="Hapus"
                      onClick={() => confirmDeleteAdmin(adm)}
                    />
                  </AdminActionGroup>
                )}
              </AdminTableCell>
            </AdminTableRow>
          ))}
        </AdminTableBody>
      </AdminTable>

      {/* Standardized Delete Confirmation Dialog */}
      <AdminConfirmDialog
        isOpen={deleteTargetAdmin !== null}
        title="Konfirmasi Hapus Akun Administrator"
        message={
          deleteTargetAdmin
            ? `Apakah Anda yakin ingin menghapus akun admin '${deleteTargetAdmin.username}' (${deleteTargetAdmin.full_name})? Akun ini tidak akan dapat login lagi ke portal CMS.`
            : 'Apakah Anda yakin ingin menghapus admin ini?'
        }
        confirmLabel="Ya, Hapus Admin"
        cancelLabel="Batal"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={executeDeleteAdmin}
        onCancel={() => setDeleteTargetAdmin(null)}
      />
    </div>
  );
};
