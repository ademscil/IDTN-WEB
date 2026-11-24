import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export interface AdminAlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message?: string | React.ReactNode;
  children?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export const AdminAlert: React.FC<AdminAlertProps> = ({
  type,
  variant,
  title,
  message,
  children,
  onDismiss,
  className = ''
}) => {
  const alertType = variant || type || 'info';
  const content = children || message;
  const configs = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
    },
    error: {
      bg: 'bg-rose-50 border-rose-200 text-rose-900',
      icon: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
    },
    info: {
      bg: 'bg-sky-50 border-sky-200 text-sky-900',
      icon: <Info className="w-4 h-4 text-sky-600 shrink-0" />
    }
  };

  const config = configs[alertType];

  return (
    <div
      role="alert"
      className={`p-3.5 sm:p-4 rounded-xl border flex items-start justify-between gap-3 text-xs sm:text-sm font-medium ${config.bg} ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5">{config.icon}</span>
        <div>
          {title && <div className="font-bold mb-0.5">{title}</div>}
          <div className="leading-relaxed">{content}</div>
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded-md hover:bg-black/5 text-current opacity-70 hover:opacity-100 transition-opacity cursor-pointer shrink-0"
          aria-label="Tutup pesan"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
