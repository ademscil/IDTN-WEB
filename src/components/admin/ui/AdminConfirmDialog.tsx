import React, { useEffect, useRef } from 'react';
import { AlertTriangle, LogOut, Info, Trash2, X } from 'lucide-react';
import { AdminButton } from './AdminButton';

export interface AdminConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary' | 'logout';
  isLoading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export const AdminConfirmDialog: React.FC<AdminConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Batal',
  variant = 'danger',
  isLoading = false,
  onConfirm,
  onCancel
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync open state with native HTML dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle native cancel (Escape key pressed)
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onCancel();
    }
  };

  // Handle light dismiss (clicking on the native dialog backdrop)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || isLoading) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      onCancel();
    }
  };

  const icons: Record<string, React.ReactNode> = {
    danger: (
      <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-600 flex items-center justify-center shrink-0">
        <Trash2 className="w-5 h-5" />
      </div>
    ),
    warning: (
      <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center shrink-0">
        <AlertTriangle className="w-5 h-5" />
      </div>
    ),
    logout: (
      <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-600 flex items-center justify-center shrink-0">
        <LogOut className="w-5 h-5" />
      </div>
    ),
    primary: (
      <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200/80 text-sky-600 flex items-center justify-center shrink-0">
        <Info className="w-5 h-5" />
      </div>
    )
  };

  const defaultConfirmText: Record<string, string> = {
    danger: 'Ya, Hapus Data',
    warning: 'Lanjutkan',
    logout: 'Ya, Keluar Akun',
    primary: 'Konfirmasi'
  };

  const confirmBtnVariant =
    variant === 'danger' || variant === 'logout' ? 'danger-solid' : 'primary';

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
      className="w-full max-w-md rounded-2xl p-0 bg-white shadow-2xl backdrop:bg-slate-950/70 border border-slate-200 m-auto focus:outline-none"
      style={{ overscrollBehavior: 'contain' }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            {icons[variant]}
            <div className="pt-0.5">
              <h2
                id="confirm-dialog-title"
                className="text-base font-bold text-slate-900 leading-snug"
              >
                {title}
              </h2>
              <div
                id="confirm-dialog-desc"
                className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5"
              >
                {message}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 disabled:opacity-40"
            aria-label="Tutup dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <AdminButton
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </AdminButton>
          <AdminButton
            type="button"
            variant={confirmBtnVariant}
            size="sm"
            isLoading={isLoading}
            onClick={onConfirm}
          >
            {confirmLabel || defaultConfirmText[variant]}
          </AdminButton>
        </div>
      </div>
    </dialog>
  );
};
